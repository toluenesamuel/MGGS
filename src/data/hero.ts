// Hero media for Marvellous Greatness Group of Schools.
//
// The hero plays a short school film first, then slides through a sequence
// of still frames and loops. To use the school's own video:
//
//   1. Save the file as `public/media/mggs-hero.mp4` (H.264/MP4 is the most
//      widely supported format; WebM also works via `heroVideoWebm`).
//   2. Nothing else needs to change — the hero picks it up automatically and
//      advances to the still frames when the video ends.
//
// If the file is absent (or the browser cannot play it), the hero simply runs
// the still-frame sequence on its own, so the section is never blank.

export interface HeroFrame {
  src: string;
  /** Describes the picture for assistive technology. Decorative frames use "". */
  alt: string;
  /** Optional focal point, e.g. "center 40%". */
  position?: string;
}

export const heroVideo = "/media/mggs-hero.mp4";
/**
 * Optional WebM version. Leave as `null` unless the file really exists in
 * public/media — a missing alternative source can make the browser abandon the
 * film before it ever tries the MP4.
 */
export const heroVideoWebm: string | null = null;
/** Shown while the video loads, and used as the backdrop if the video fails. */
export const heroVideoPoster = "/media/mggs-hero-poster.jpg";
/** How long each still frame stays on screen (milliseconds). */
export const heroImageDuration = 7000;

/**
 * Length of the slide between frames (milliseconds) — each new picture sweeps in
 * from the top-left corner towards the bottom-right. Keep in step with
 * `--hero-push-duration` in `src/index.css`.
 */
export const heroPushDuration = 1000;

/**
 * The film must be watched for at least this long before the hero moves on to
 * the still frames. If a shorter clip is supplied (or the film is replaced by a
 * brief loop), it simply repeats until this much footage has played.
 */
export const heroMinFilmDuration = 10000;

export const heroFrames: HeroFrame[] = [
  {
    src: "/images/hero-campus.jpg",
    alt: "The school building framed by trees and open grounds.",
    position: "center 45%",
  },
  {
    src: "/images/students-collaborating.jpg",
    alt: "Pupils working together on a task in class.",
  },
  {
    src: "/images/classroom-science.jpg",
    alt: "Pupils and a teacher during a hands-on classroom activity.",
  },
  {
    src: "/images/campus-courtyard.jpg",
    alt: "A quiet, leafy school courtyard.",
    position: "center 55%",
  },
  {
    src: "/images/student-life-sports.jpg",
    alt: "Pupils taking part in a group activity outdoors.",
  },
];
