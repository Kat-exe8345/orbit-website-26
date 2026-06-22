/** biome-ignore-all lint/performance/noImgElement: ui component */
"use client";

import { useEffect, useRef, useState } from "react";
import { getASCIIMetrics, startEffect } from "./utils";
import "./styles.css";

type ASCIIImageProps = {
  src: string;
  scrambleCount?: number;
  scrambleSpeedMs?: number;
  cellAppearMs?: number;
  staggerDelay?: number;
};

function ASCIIImage({
  src,
  scrambleCount = 5,
  scrambleSpeedMs = 100,
  cellAppearMs = 1.25,
  staggerDelay = 0,
}: ASCIIImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const { asciiRows, charWidth, charHeight } = getASCIIMetrics(
    box.width,
    box.height,
  );

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
    const img = imageRef.current;
    const canvas = canvasRef.current;

    if (
      !img ||
      !canvas ||
      !box.width ||
      !box.height ||
      !asciiRows ||
      !charWidth ||
      !charHeight
    ) {
      return;
    }

    const start = () => {
      startEffect(
        img,
        canvas,
        box.width,
        box.height,
        staggerDelay,
        scrambleCount,
        scrambleSpeedMs,
        cellAppearMs,
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
    box.height,
    box.width,
    cellAppearMs,
    scrambleCount,
    scrambleSpeedMs,
    staggerDelay,
    asciiRows,
    charWidth,
    charHeight,
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
    <main className="h-screen w-full grid grid-cols-3 gap-10">
      <ASCIIImage
        src="\images\misc\SpaceX.jpg"
        scrambleCount={5}
        scrambleSpeedMs={100}
        cellAppearMs={1.25}
        staggerDelay={0}
      />
      <ASCIIImage
        src="\images\members\Parth Dinil.jpg"
        scrambleCount={5}
        scrambleSpeedMs={100}
        cellAppearMs={1.25}
        staggerDelay={0}
      />
      <ASCIIImage
        src="\images\members\Bala Guru Prasaad.jpg"
        scrambleCount={5}
        scrambleSpeedMs={100}
        cellAppearMs={1.25}
        staggerDelay={0}
      />
      <ASCIIImage
        src="\images\members\Giridhar Ajith.jpg"
        scrambleCount={5}
        scrambleSpeedMs={100}
        cellAppearMs={1.25}
        staggerDelay={0}
      />
      <ASCIIImage
        src="\images\members\Nikita Soni.jpg"
        scrambleCount={5}
        scrambleSpeedMs={100}
        cellAppearMs={1.25}
        staggerDelay={0}
      />
      <ASCIIImage
        src="\images\members\Vaishnav S.jpg"
        scrambleCount={5}
        scrambleSpeedMs={100}
        cellAppearMs={1.25}
        staggerDelay={0}
      />
    </main>
  );
}
