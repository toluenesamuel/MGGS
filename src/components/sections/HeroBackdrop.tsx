import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import {
  heroFrames,
  heroImageDuration,
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

  // If the film cannot be loaded (missing file, unsupported codec), fall back
  // to the still-frame sequence rather than showing an empty hero.
  useEffect(() => {
    let cancelled = false;
    const fallBack = () => {
      if (cancelled) return;
      setVideoUsable(false);
      setActive(0);
    };
    // A dev/preview server may answer a missing file with an HTML page, which
    // the <video> element will not report as an error — so check it up front.
    if (connectionIsConstrained()) {
      fallBack();
      return;
    }
    if (typeof window.fetch === "function") {
      window
        .fetch(heroVideo, { method: "HEAD" })
        .then((response) => {
          const type = response.headers.get("content-type") ?? "";
          if (!response.ok || !type.startsWith("video/")) fallBack();
        })
        .catch(fallBack);
    }
    const timer = window.setTimeout(() => {
      const video = videoRef.current;
      if (video && video.readyState < 2) fallBack();
    }, 6000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const current = slides[Math.min(active, slides.length - 1)];
  const currentKind = current?.kind;
  const currentImage = current?.kind === "image" ? current.index : -1;

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
            preload="metadata"
            onEnded={() => current && advance(current)}
            onError={() => {
              setVideoUsable(false);
              setActive(0);
            }}
            onPlaying={() => setVideoReady(true)}
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
