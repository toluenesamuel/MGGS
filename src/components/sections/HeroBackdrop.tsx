import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import {
  heroFrames,
  heroImageDuration,
  heroMinFilmDuration,
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
 * Cinematic hero backdrop: the school film plays first, then the component
 * crossfades through still frames and loops back to the film. Every stage is
 * progressive enhancement — with reduced motion, or if the video is missing,
 * the section still renders a complete, static hero.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  const [videoUsable, setVideoUsable] = useState(() => !connectionIsConstrained());
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Guards against re-advancing when the same media is on screen. */
  const advancedFor = useRef<string | null>(null);
  /** Milliseconds of the film actually watched during this showing. */
  const filmWatchedMs = useRef(0);
  const lastFilmTime = useRef(0);

  const slides: Slide[] = videoUsable
    ? [{ kind: "video" }, ...heroFrames.map((_, index) => ({ kind: "image" as const, index }))]
    : heroFrames.map((_, index) => ({ kind: "image" as const, index }));

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  // Honour data-saver / very slow connections: show the still frames only.
  // (This is the one case where the film is deliberately skipped up front.)
  useEffect(() => {
    if (!connectionIsConstrained()) return;
    setVideoUsable(false);
    setActive(0);
  }, []);

  // Only fall back when the film genuinely cannot be used. A slow start must
  // never cut the film short, so this only runs on a real error or when nothing
  // at all has arrived after a generous grace period.
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
        .catch(() => undefined); // network/proxy refusal is not proof the film is missing
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

  const current = slides[Math.min(active, slides.length - 1)];
  const currentKind = current?.kind;
  const currentImage = current?.kind === "image" ? current.index : -1;

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
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => undefined);
      return;
    }
    if (current) advance(current);
  }

  /** Resume if the film stalls (flaky connections, media proxies). */
  function handleFilmWaiting() {
    const video = videoRef.current;
    if (!video) return;
    window.setTimeout(() => {
      if (video.paused && currentKind === "video") {
        const attempt = video.play();
        if (attempt && typeof attempt.catch === "function") attempt.catch(() => undefined);
      }
    }, 1500);
  }

  function advance(from: Slide) {
    const key = from.kind === "video" ? "video" : `image-${from.index}`;
    if (advancedFor.current === key) return;
    advancedFor.current = key;
    setActive((value) => (value + 1) % slides.length);
  }

  // Still frames advance on a timer; the film drives its own advance on "ended".
  useEffect(() => {
    if (reducedMotion || currentKind !== "image") return;
    const key = `image-${currentImage}`;
    if (advancedFor.current === null) advancedFor.current = key;
    const timer = window.setTimeout(() => {
      advancedFor.current = key;
      setActive((value) => (value + 1) % slides.length);
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
    if (!reducedMotion) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => undefined);
    }
  }, [currentKind, reducedMotion, videoUsable]);

  return (
    <div className={cn("hero-backdrop hero-visual absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {videoUsable && (
        <div className={cn("hero-frame", current?.kind === "video" && "is-active")}>
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
            onError={() => {
              setVideoUsable(false);
              setActive(0);
            }}
          >
            <source src={heroVideoWebm} type="video/webm" />
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {heroFrames.map((frame, index) => (
        <div
          key={frame.src}
          className={cn("hero-frame", current?.kind === "image" && current.index === index && "is-active")}
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
