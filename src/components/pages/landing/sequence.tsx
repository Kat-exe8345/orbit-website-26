"use client";

import { JSX, useCallback, useEffect, useRef, useState } from "react";
import TypingText from "./typing";

interface Line {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  cursorClassName?: string;
  cursorColor?: string;
  cursorChar?: string;
  typingSpeed?: number;
  hideCursorOnComplete?: boolean;
  pauseBefore?: number;
  as?: keyof JSX.IntrinsicElements;
}

interface TypedSequenceProps {
  lines: Line[];
  /** ms per character when erasing during the loop-back. Defaults to 35. */
  eraseSpeed?: number;
  /** ms to hold the fully-typed sequence before erasing starts. Defaults to 1400. */
  holdPause?: number;
  /** ms to wait on blank before retyping starts. Defaults to 500. */
  restartPause?: number;
  /** if true, once all lines are typed, erase them (last line first) then retype forever */
  loopSequence?: boolean;
  onAllComplete?: () => void;
}

type Mode = "typing" | "holding" | "erasing";

export default function TypedSequence({
  lines,
  eraseSpeed = 35,
  holdPause = 1400,
  restartPause = 500,
  loopSequence = false,
  onAllComplete,
}: TypedSequenceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("typing");
  const [frozenText, setFrozenText] = useState<Record<number, string>>({});

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPending = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // a line finished typing forward
  const handleLineTyped = useCallback(
    (index: number, text: string) => {
      setFrozenText((prev) => ({ ...prev, [index]: text }));

      if (index < lines.length - 1) {
        setActiveIndex(index + 1);
        return;
      }

      // last line just finished
      onAllComplete?.();
      if (loopSequence) {
        setMode("holding");
        clearPending();
        timeoutRef.current = setTimeout(() => {
          setMode("erasing");
          setActiveIndex(lines.length - 1); // start erasing from the last line
        }, holdPause);
      }
    },
    [lines.length, loopSequence, holdPause, onAllComplete],
  );

  // a line finished erasing backward
  const handleLineErased = useCallback(
    (index: number) => {
      setFrozenText((prev) => ({ ...prev, [index]: "" }));

      if (index > 0) {
        setActiveIndex(index - 1);
        return;
      }

      // fully erased back to the start — restart the whole cycle
      clearPending();
      timeoutRef.current = setTimeout(() => {
        setFrozenText({});
        setMode("typing");
        setActiveIndex(0);
      }, restartPause);
    },
    [restartPause],
  );

  useEffect(() => () => clearPending(), []);

  return (
    <>
      {lines.map((line, i) => {
        const Tag = (line.as ?? "div") as React.ElementType;

        if (mode === "typing") {
          if (i > activeIndex) return null; // not started yet
          if (i < activeIndex) {
            return (
              <Tag key={i} className={line.className} style={line.style}>
                {frozenText[i] ?? line.text}
              </Tag>
            );
          }
          // i === activeIndex: currently typing this one
          return (
            <Tag key={i} className={line.className} style={line.style}>
              <TypingLine line={line} index={i} onDone={handleLineTyped} />
            </Tag>
          );
        }

        // mode === 'holding' or 'erasing'
        if (i > activeIndex) {
          // already erased (or never reached yet on the way down)
          return (
            <Tag key={i} className={line.className} style={line.style}>
              {mode === "holding" ? (frozenText[i] ?? line.text) : ""}
            </Tag>
          );
        }
        if (i < activeIndex || mode === "holding") {
          // not yet being erased — show full frozen text
          return (
            <Tag key={i} className={line.className} style={line.style}>
              {frozenText[i] ?? line.text}
            </Tag>
          );
        }
        // i === activeIndex && mode === 'erasing': currently erasing this one
        return (
          <Tag key={i} className={line.className} style={line.style}>
            <ErasingLine
              text={frozenText[i] ?? line.text}
              speed={eraseSpeed}
              cursorChar={line.cursorChar}
              cursorColor={line.cursorColor}
              cursorClassName={line.cursorClassName}
              index={i}
              onDone={handleLineErased}
            />
          </Tag>
        );
      })}
    </>
  );
}

// Forward-typing phase, wraps TypingText with a stable onComplete identity.
function TypingLine({
  line,
  index,
  onDone,
}: {
  line: Line;
  index: number;
  onDone: (index: number, text: string) => void;
}) {
  const handleComplete = useCallback(
    () => onDone(index, line.text),
    [onDone, index, line.text],
  );

  return (
    <TypingText
      text={line.text}
      typingSpeed={line.typingSpeed}
      startDelay={line.pauseBefore ?? 0}
      cursorChar={line.cursorChar}
      cursorClassName={line.cursorClassName}
      cursorColor={line.cursorColor}
      hideCursorOnComplete={line.hideCursorOnComplete ?? true}
      onComplete={handleComplete}
    />
  );
}

// Backward-erasing phase: starts full, deletes down to empty, no typing.
function ErasingLine({
  text,
  speed,
  cursorChar,
  cursorColor,
  cursorClassName,
  index,
  onDone,
}: {
  text: string;
  speed: number;
  cursorChar?: string;
  cursorColor?: string;
  cursorClassName?: string;
  index: number;
  onDone: (index: number) => void;
}) {
  const [displayed, setDisplayed] = useState(text);
  const indexRef = useRef(text.length);

  useEffect(() => {
    indexRef.current = text.length;
    setDisplayed(text);

    const id = setInterval(() => {
      indexRef.current -= 1;
      setDisplayed(text.slice(0, Math.max(indexRef.current, 0)));
      if (indexRef.current <= 0) {
        clearInterval(id);
        onDone(index);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed, index, onDone]);

  return (
    <span>
      {displayed}
      <span
        className={cursorClassName}
        style={{ color: cursorColor, animation: "blink 1s step-end infinite" }}
      >
        {cursorChar ?? "_"}
      </span>
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
