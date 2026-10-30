import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import {
  heroFrames,
  heroImageDuration,
  heroMinFilmDuration,
  heroPushDuration,
  heroVideo,
  heroVideoPoster,
  heroVideoWebm,
} from "@/data/hero";

type Slide = { kind: "video" } | { kind: "image"; index: number };

/** Respect data-saver / very slow connections — the film is a few megabytes. */
function connectionIsConstrained(): boolean {
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  return connection.effectiveType === "slow-2g" || connection.effectiveType === "2g";
}

/**
 * Cinematic hero backdrop: the school film plays first, then the hero slides
 * through still frames — each new picture sweeps in diagonally from the
 * top-left corner towards the bottom-right over the one it replaces — and loops
 * back to the film.
 *
 * The film is only abandoned when it genuinely cannot be played — a media error
 * on the video element itself, a 404/5xx for the file, or nothing downloaded at
 * all after a long grace period. A failed alternative <source> must never count
 * as a film failure, so sources are rendered only when they are configured and
 * error handling ignores events that do not originate from the video element.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  const [videoUsable, setVideoUsable] = useState(() => !connectionIsConstrained());
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(0);
  /** Index of the frame currently being covered by the incoming picture. */
  const [leaving, setLeaving] = useState<number | null>(null);
  /** Mirrors `active` so the timers always advance from the picture on screen. */
  const activeIndex = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Guards against re-advancing when the same media is on screen. */
  const advancedFor = useRef<string | null>(null);
  /** Milliseconds of the film actually watched during this showing. */
  const filmWatchedMs = useRef(0);
  const lastFilmTime = useRef(0);
  /** Ensures the "retry on first interaction" listeners are only added once. */
  const retryQueued = useRef(false);

  const slides: Slide[] = videoUsable
    ? [{ kind: "video" }, ...heroFrames.map((_, index) => ({ kind: "image" as const, index }))]
    : heroFrames.map((_, index) => ({ kind: "image" as const, index }));

  const current = slides[Math.min(active, slides.length - 1)];
  const currentKind = current?.kind;
  const currentImage = current?.kind === "image" ? current.index : -1;
  const leavingSlide = leaving === null ? null : slides[Math.min(leaving, slides.length - 1)];

  /** Move to the next frame, holding the one on screen while it is covered. */
  function pushNext() {
    if (slides.length < 2) return;
    const from = activeIndex.current;
    const next = (from + 1) % slides.length;
    activeIndex.current = next;
    setLeaving(from);
    setActive(next);
  }

  /** Jump back to the first frame (used when the film turns out to be unusable). */
  function resetToFirstFrame() {
    activeIndex.current = 0;
    setLeaving(null);
    setActive(0);
  }

  // Once the incoming picture covers the hero, the old frame is parked off-screen
  // again and the leaving marker can be cleared.
  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), heroPushDuration + 60);
    return () => window.clearTimeout(timer);
  }, [leaving, active]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  // Honour data-saver / very slow connections: show the still frames only.
  useEffect(() => {
    if (!connectionIsConstrained()) return;
    setVideoUsable(false);
    resetToFirstFrame();
  }, []);

  // Only fall back when the film genuinely cannot be used. A slow start must
  // never cut the film short, so this only runs on a real 404/5xx or when
  // nothing at all has arrived after a generous grace period.
  useEffect(() => {
    if (!videoUsable) return;
    let cancelled = false;
    const fallBack = () => {
      if (!cancelled) setVideoUsable(false);
    };
    if (typeof window.fetch === "function") {
      window
        .fetch(heroVideo, { method: "HEAD" })
        .then((response) => {
          if (response.status === 404 || response.status >= 500) fallBack();
        })
        .catch(() => undefined); // a refused request is not proof the film is missing
    }
    const timer = window.setTimeout(() => {
      const video = videoRef.current;
      // readyState 0 means nothing at all downloaded — treat that as unusable.
      if (video && video.readyState === 0) fallBack();
    }, 30000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [videoUsable]);

  /** Called each time the film reports a new playback position. */
  function trackFilmTime() {
    const video = videoRef.current;
    if (!video) return;
    const position = video.currentTime;
    const delta = position - lastFilmTime.current;
    // Ignore the jump back to zero when the film restarts or loops.
    if (delta > 0 && delta < 5) filmWatchedMs.current += delta * 1000;
    lastFilmTime.current = position;
  }

  /**
   * Start the film, coping with autoplay restrictions: if the browser blocks
   * playback, try again on the visitor's first interaction rather than
   * abandoning the film.
   */
  function attemptPlay() {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    const attempt = video.play();
    if (!attempt || typeof attempt.catch !== "function") return;
    attempt.catch(() => {
      if (retryQueued.current) return;
      retryQueued.current = true;
      const retry = () => {
        retryQueued.current = false;
        const element = videoRef.current;
        if (!element) return;
        const again = element.play();
        if (again && typeof again.catch === "function") again.catch(() => undefined);
      };
      window.addEventListener("pointerdown", retry, { once: true, passive: true });
      window.addEventListener("keydown", retry, { once: true });
      window.addEventListener("touchstart", retry, { once: true, passive: true });
    });
  }

  /**
   * The film advances the hero only once it has been watched for the minimum
   * duration; a shorter clip repeats instead of cutting the sequence short.
   */
  function handleFilmEnded() {
    const video = videoRef.current;
    if (!video) return;
    trackFilmTime();
    if (!reducedMotion && filmWatchedMs.current < heroMinFilmDuration) {
      lastFilmTime.current = 0;
      video.currentTime = 0;
      attemptPlay();
      return;
    }
    if (current) advance(current);
  }

  /** Resume if the film stalls (flaky connections, media proxies). */
  function handleFilmWaiting() {
    const video = videoRef.current;
    if (!video) return;
    window.setTimeout(() => {
      if (video.paused && currentKind === "video") attemptPlay();
    }, 1500);
  }

  /** Only a failure of the video element itself means the film is unusable. */
  function handleFilmError(event: React.SyntheticEvent<HTMLVideoElement>) {
    if (event.target !== event.currentTarget) return;
    setVideoUsable(false);
    resetToFirstFrame();
  }

  function advance(from: Slide) {
    const key = from.kind === "video" ? "video" : `image-${from.index}`;
    if (advancedFor.current === key) return;
    advancedFor.current = key;
    pushNext();
  }

  // Still frames advance on a timer; the film drives its own advance on "ended".
  useEffect(() => {
    if (reducedMotion || currentKind !== "image") return;
    const key = `image-${currentImage}`;
    if (advancedFor.current === null) advancedFor.current = key;
    const timer = window.setTimeout(() => {
      advancedFor.current = key;
      pushNext();
    }, heroImageDuration);
    return () => window.clearTimeout(timer);
  }, [currentKind, currentImage, reducedMotion, slides.length]);

  // Keep the film in step: play while it is the active slide, restart on replay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUsable) return;
    if (currentKind !== "video") {
      video.pause();
      return;
    }
    video.currentTime = 0;
    filmWatchedMs.current = 0;
    lastFilmTime.current = 0;
    attemptPlay();
    // Some browsers block autoplay without throwing; nudge the film once it is
    // buffered enough to start, so the hero is never left on a frozen frame.
    const nudge = window.setTimeout(() => {
      const element = videoRef.current;
      if (element && element.paused && element.currentTime === 0 && element.readyState >= 2) {
        attemptPlay();
      }
    }, 2500);
    return () => window.clearTimeout(nudge);
    // attemptPlay only reads refs and state from this render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKind, reducedMotion, videoUsable]);

  return (
    <div className={cn("hero-backdrop hero-visual absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {videoUsable && (
        <div
          className={cn(
            "hero-frame",
            current?.kind === "video" && "is-active",
            leavingSlide?.kind === "video" && "is-leaving",
          )}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={heroVideoPoster}
            muted
            playsInline
            preload="auto"
            onEnded={handleFilmEnded}
            onTimeUpdate={trackFilmTime}
            onWaiting={handleFilmWaiting}
            onPlaying={() => setVideoReady(true)}
            onError={handleFilmError}
          >
            {heroVideoWebm && <source src={heroVideoWebm} type="video/webm" />}
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {heroFrames.map((frame, index) => (
        <div
          key={frame.src}
          className={cn(
            "hero-frame",
            current?.kind === "image" && current.index === index && "is-active",
            leavingSlide?.kind === "image" && leavingSlide.index === index && "is-leaving",
          )}
        >
          <img
            src={frame.src}
            alt=""
            style={frame.position ? { objectPosition: frame.position } : undefined}
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-green-900 via-brand-green-900/70 to-brand-green-900/30" />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-brand-green-900 transition-opacity duration-700",
          videoUsable && !videoReady && !reducedMotion ? "opacity-40" : "opacity-0",
        )}
      />
    </div>
  );
}
