"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { geist } from "@components/fonts/typography";

interface ImageSliderProps {
  images: string[];
  captions?: string[];
  interval?: number;
  autoPlay?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  captions,
  interval = 3000,
  autoPlay = true,
}) => {
  // Clone last slide at start, first slide at end
  const slides = [images[images.length - 1], ...images, images[0]];

  const [currentIndex, setCurrentIndex] = useState(1); // start on real first slide
  const [withTransition, setWithTransition] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isTransitioningRef = useRef(isTransitioning);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // real (dot) index, wrapping clones back to their real counterpart
  const realIndex =
    (((currentIndex - 1) % images.length) + images.length) % images.length;

  const currentCaption = captions?.[realIndex];

  const [displayedCaption, setDisplayedCaption] = useState(captions?.[0]);
  const [incomingCaption, setIncomingCaption] = useState<string | undefined>(
    undefined,
  );

  const realIndexRef = useRef(realIndex);
  useEffect(() => {
    realIndexRef.current = realIndex;
  }, [realIndex]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    if (images.length <= 1) return; // No need to go next if there's only one image
    if (isTransitioningRef.current) return; // prevent rapid clicks
    const nextReal = (realIndexRef.current + 1) % images.length;
    setIncomingCaption(captions?.[nextReal]);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [images.length, captions]);

  const goToPrev = useCallback(() => {
    if (images.length <= 1) return; // No need to go prev if there's only one image
    if (isTransitioningRef.current) return; // prevent rapid clicks
    const nextReal = (realIndexRef.current - 1 + images.length) % images.length;
    setIncomingCaption(captions?.[nextReal]);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [images.length, captions]);

  const goToRealIndex = (idx: number) => {
    setWithTransition(true);
    setCurrentIndex(idx + 1);
  };

  // auto-rotate
  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(goToNext, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, interval, goToNext]);

  const pause = () => timerRef.current && clearInterval(timerRef.current);
  const resume = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoPlay) timerRef.current = setInterval(goToNext, interval);
  };

  // Snap silently when hitting a clone
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    setDisplayedCaption((prev) => incomingCaption ?? prev);
    setIncomingCaption(undefined);

    if (currentIndex === slides.length - 1) {
      setWithTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setWithTransition(false);
      setCurrentIndex(slides.length - 2);
    }
  };

  // Re-enable transition on next tick after a silent snap
  useEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  if (images.length === 0) return null;

  return (
    <>
      <div
        className="relative w-full max-w-8xl max-xl:aspect-9/16 aspect-4/3 overflow-hidden select-none border border-[#2f2f2f]"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          className={`flex h-full ${
            withTransition
              ? "transition-transform duration-500 ease-in-out"
              : ""
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`slide-${idx}`}
              className="w-full h-full object-cover shrink-0"
              draggable={false}
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              disabled={isTransitioning}
              onClick={goToPrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white text-lg hover:bg-black/60 transition-colors"
            >
              <ChevronLeft />
            </button>
            <button
              disabled={isTransitioning}
              onClick={goToNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white text-lg hover:bg-black/60 transition-colors"
            >
              <ChevronRight />
            </button>
          </>
        )}

        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.length > 1 &&
            images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => goToRealIndex(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                  idx === realIndex ? "bg-white" : "bg-white/10"
                }`}
              />
            ))}
        </div>
      </div>
      {currentCaption && (
        <div className="mt-4 text-center max-sm:text-sm max-md:text-md text-lg text-white/80">
          <p
            className={`${geist.className} transition-opacity duration-200 ease-in-out ${
              incomingCaption ? "opacity-0" : "opacity-100"
            }`}
          >
            {displayedCaption}
          </p>
        </div>
      )}
    </>
  );
};
