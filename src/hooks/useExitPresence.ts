import { useEffect, useState } from "react";

/** Keep a closing overlay mounted briefly for its exit; interaction ends immediately. */
export function useExitPresence(open: boolean) {
  const [present, setPresent] = useState(open);
  useEffect(() => {
    if (open) { setPresent(true); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPresent(false); return; }
    const timer = window.setTimeout(() => setPresent(false), 240);
    return () => window.clearTimeout(timer);
  }, [open]);
  return open || present;
}
