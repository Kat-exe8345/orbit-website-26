"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "typing" | "paused" | "deleting" | "done";

interface TypingTextProps {
  text: string;
  typingSpeed?: number; // ms per character while typing
  startDelay?: number; // ms before typing begins
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void; // fires when forward typing finishes (or full cycle if reverse is on)
  className?: string; // styles the typed text itself
  style?: React.CSSProperties; // inline styles for the typed text
  cursorClassName?: string; // styles just the cursor
  cursorColor?: string; // quick one-off cursor color without a whole class
  hideCursorOnComplete?: boolean; // remove the cursor once the whole sequence finishes

  // --- reverse / backspace effect, all optional ---
  reverse?: boolean; // if true, deletes the text back out after typing
  reverseSpeed?: number; // ms per character while deleting, defaults to typingSpeed
  reversePause?: number; // ms to wait at full text before deleting starts
  loop?: boolean; // if true (with reverse), retypes after deleting, indefinitely
  loopPause?: number; // ms to wait at empty before retyping starts, when looping
}

export default function TypingText({
  text,
  typingSpeed = 45,
  startDelay = 0,
  showCursor = true,
  cursorChar = "_",
  onComplete,
  className = "",
  style,
  cursorClassName = "",
  cursorColor,
  hideCursorOnComplete = false,
  reverse = false,
  reverseSpeed,
  reversePause = 900,
  loop = false,
  loopPause = 500,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const indexRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // reduced motion: just show final state, no animation, no reverse/loop
      setDisplayed(reverse && !loop ? "" : text);
      setPhase("done");
      onComplete?.();
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;
    let cancelled = false;

    const deleteSpeed = reverseSpeed ?? typingSpeed;

    const runTyping = () => {
      indexRef.current = 0;
      setPhase("typing");
      intervalId = setInterval(() => {
        if (cancelled) return;
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));

        if (indexRef.current >= text.length) {
          clearInterval(intervalId);
          if (reverse) {
            setPhase("paused");
            timeoutId = setTimeout(runDeleting, reversePause);
          } else {
            setPhase("done");
            onComplete?.();
          }
        }
      }, typingSpeed);
    };

    const runDeleting = () => {
      if (cancelled) return;
      setPhase("deleting");
      intervalId = setInterval(() => {
        if (cancelled) return;
        indexRef.current -= 1;
        setDisplayed(text.slice(0, indexRef.current));

        if (indexRef.current <= 0) {
          clearInterval(intervalId);
          if (loop) {
            timeoutId = setTimeout(runTyping, loopPause);
          } else {
            setPhase("done");
            onComplete?.();
          }
        }
      }, deleteSpeed);
    };

    timeoutId = setTimeout(runTyping, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [
    text,
    typingSpeed,
    startDelay,
    reverse,
    reverseSpeed,
    reversePause,
    loop,
    loopPause,
    onComplete,
  ]);

  const cursorHidden = hideCursorOnComplete && phase === "done";

  return (
    <span className={className} style={style}>
      {displayed}
      {showCursor && !cursorHidden && (
        <span
          className={cursorClassName}
          style={{
            color: cursorColor,
            opacity: phase === "done" ? undefined : 1,
            animation: phase === "done" ? "blink 1s step-end infinite" : "none",
          }}
        >
          {cursorChar}
        </span>
      )}
      <style jsx>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
