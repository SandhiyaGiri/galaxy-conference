import { useState, useEffect, useRef } from "react";

export function useIdleTimer(timeoutMs: number) {
  const [isIdle, setIsIdle] = useState(true); // start idle so animation plays on load
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const reset = () => {
      setIsIdle(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setIsIdle(true), timeoutMs);
    };

    const events = ["mousemove", "mousedown", "keypress", "touchstart", "scroll", "click"];
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    // don't call reset() on mount — let animation play until first interaction

    return () => {
      clearTimeout(timer.current);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, [timeoutMs]);

  return isIdle;
}
