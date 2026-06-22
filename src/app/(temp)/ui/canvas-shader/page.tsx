/** biome-ignore-all lint/performance/noImgElement: ui component */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  ASCII_COLS,
  CELL_APPEAR_MS,
  CHARS,
  DEFAULT_ASCII_IMAGE_CONFIG,
  DPR,
  FONT_SIZE,
  getASCIIMetrics,
  REVEAL_DELAY_MS,
  SCRAMBLE_COUNT,
  SCRAMBLE_SPEED_MS,
  startEffect,
} from "./utils";
import "./styles.css";

type ASCIIImageProps = {
  src: string;
  delay?: number;
  chars?: string;
  dpr?: number;
  fontSize?: number;
  asciiCols?: number;
  scrambleCount?: number;
  scrambleSpeedMs?: number;
  cellAppearMs?: number;
  revealDelayMs?: number;
};

function ASCIIImage({
  src,
  delay = 0,
  chars = CHARS,
  dpr = DPR,
  fontSize = FONT_SIZE,
  asciiCols = ASCII_COLS,
  scrambleCount = SCRAMBLE_COUNT,
  scrambleSpeedMs = SCRAMBLE_SPEED_MS,
  cellAppearMs = CELL_APPEAR_MS,
  revealDelayMs = REVEAL_DELAY_MS,
}: ASCIIImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [metrics, setMetrics] = useState({
    ASCII_ROWS: 0,
    CHAR_WIDTH: 0,
    CHAR_HEIGHT: 0,
  });

  useEffect(() => {
    const updateBox = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      setBox({
        width: rect.width,
        height: rect.height,
      });
    };

    updateBox();

    const wrapper = wrapperRef.current;
    if (!wrapper || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateBox);
      return () => {
        window.removeEventListener("resize", updateBox);
      };
    }

    const observer = new ResizeObserver(updateBox);
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setMetrics(getASCIIMetrics(box.width, box.height, fontSize, asciiCols));
  }, [asciiCols, box.height, box.width, fontSize]);

  useEffect(() => {
    const img = imageRef.current;
    const canvas = canvasRef.current;

    if (
      !img ||
      !canvas ||
      !box.width ||
      !box.height ||
      !metrics.ASCII_ROWS ||
      !metrics.CHAR_WIDTH ||
      !metrics.CHAR_HEIGHT
    ) {
      return;
    }

    const start = () => {
      startEffect(
        img,
        canvas,
        box.width,
        box.height,
        delay,
        metrics.ASCII_ROWS,
        metrics.CHAR_WIDTH,
        metrics.CHAR_HEIGHT,
        {
          ...DEFAULT_ASCII_IMAGE_CONFIG,
          chars,
          dpr,
          fontSize,
          asciiCols,
          scrambleCount,
          scrambleSpeedMs,
          cellAppearMs,
          revealDelayMs,
        },
      );
    };

    if (img.complete && img.naturalWidth) {
      start();
      return;
    }

    img.addEventListener("load", start);

    return () => {
      img.removeEventListener("load", start);
    };
  }, [
    asciiCols,
    box.height,
    box.width,
    cellAppearMs,
    chars,
    delay,
    dpr,
    fontSize,
    metrics.ASCII_ROWS,
    metrics.CHAR_WIDTH,
    metrics.CHAR_HEIGHT,
    revealDelayMs,
    scrambleCount,
    scrambleSpeedMs,
  ]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="img" ref={wrapperRef}>
        <img ref={imageRef} src={src} alt="" className="ascii-source" />
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <ASCIIImage
        src="\images\members\Bala Aditya.jpeg"
        delay={0}
        scrambleCount={SCRAMBLE_COUNT}
        scrambleSpeedMs={SCRAMBLE_SPEED_MS}
        cellAppearMs={CELL_APPEAR_MS}
        revealDelayMs={REVEAL_DELAY_MS}
      />
    </main>
  );
}
