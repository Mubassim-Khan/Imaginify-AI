"use client";

import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

const clamp = (value: number, minimum: number, maximum: number) =>
  value < minimum ? minimum : value > maximum ? maximum : value;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const progress = clamp(
    (value - edge0) / (edge1 - edge0 || Number.EPSILON),
    0,
    1,
  );
  return progress * progress * (3 - 2 * progress);
};

type ConfigKey =
  | "startWidth"
  | "startHeight"
  | "startRadius"
  | "endRadius"
  | "mediaZoom"
  | "scrollDistance"
  | "holdDistance"
  | "smoothing"
  | "overlayScrim"
  | "useWindowScroll"
  | "enabled";

export interface ScrollExpandProps {
  src?: string;
  mediaType?: "image" | "video";
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function ScrollExpand({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  className = "",
  style,
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const propsRef = useRef<Required<Pick<ScrollExpandProps, ConfigKey>>>({
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  });

  useEffect(() => {
    propsRef.current = {
      startWidth,
      startHeight,
      startRadius,
      endRadius,
      mediaZoom,
      scrollDistance,
      holdDistance,
      smoothing,
      overlayScrim,
      useWindowScroll,
      enabled,
    };
  }, [
    enabled,
    endRadius,
    holdDistance,
    mediaZoom,
    overlayScrim,
    scrollDistance,
    smoothing,
    startHeight,
    startRadius,
    startWidth,
    useWindowScroll,
  ]);

  const setMediaRef = useCallback(
    (element: HTMLImageElement | HTMLVideoElement | null) => {
      mediaRef.current = element;
    },
    [],
  );

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;

    const config = propsRef.current;
    const eased = smoothstep(0, 1, progress);
    const width = config.startWidth + (100 - config.startWidth) * eased;
    const height = config.startHeight + (100 - config.startHeight) * eased;
    const insetX = Math.max(0, (100 - width) / 2);
    const insetY = Math.max(0, (100 - height) / 2);
    const radius =
      config.startRadius + (config.endRadius - config.startRadius) * eased;

    frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
    media.style.transform = `scale(${config.mediaZoom + (1 - config.mediaZoom) * eased})`;

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${config.overlayScrim * eased}`;
    }
    if (titleRef.current) {
      const exitProgress = smoothstep(0.4, 0.88, progress);
      titleRef.current.style.opacity = `${1 - exitProgress}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * exitProgress}px, 0) scale(${1 + 0.06 * exitProgress})`;
    }
    if (hintRef.current) {
      const hintProgress = smoothstep(0, 0.12, progress);
      hintRef.current.style.opacity = `${1 - hintProgress}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * hintProgress}px, 0)`;
    }
    if (overlayRef.current) {
      const enterProgress = smoothstep(0.68, 1, progress);
      overlayRef.current.style.opacity = `${enterProgress}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - enterProgress)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame = 0;
    let current = 0;
    let target = 0;
    let stageHeight = 0;
    let running = false;

    const measure = () => {
      const config = propsRef.current;
      stageHeight = config.useWindowScroll
        ? window.innerHeight
        : root.clientHeight;
      if (stageHeight <= 0) return;

      stage.style.height = `${stageHeight}px`;
      track.style.height = `${stageHeight * (1 + Math.max(0, config.scrollDistance) + Math.max(0, config.holdDistance))}px`;
      const width = root.clientWidth || stageHeight;
      stage.style.setProperty(
        "--scroll-expand-title-size",
        `${clamp(width * 0.075, 20, 84)}px`,
      );
    };

    const readProgress = () => {
      const config = propsRef.current;
      if (!config.enabled) return 1;
      const span = stageHeight * Math.max(0.01, config.scrollDistance);
      if (config.useWindowScroll) {
        return clamp(-track.getBoundingClientRect().top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const config = propsRef.current;
      const strength =
        config.smoothing <= 0
          ? 1
          : 1 - Math.exp(-1 / (60 * config.smoothing));
      current += (target - current) * strength;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      animationFrame = running ? requestAnimationFrame(tick) : 0;
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      if (running) return;
      running = true;
      animationFrame = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = reduceMotion ? 1 : target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(root);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  return (
    <div
      ref={rootRef}
      className={`relative h-full w-full ${
        useWindowScroll
          ? ""
          : "overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      } ${className}`.trim()}
      style={style}
    >
      <div ref={trackRef} className="relative w-full">
        <div
          ref={stageRef}
          className="sticky top-0 w-full overflow-hidden [--scroll-expand-title-size:4rem]"
        >
          <div
            ref={frameRef}
            className="absolute inset-0 [clip-path:inset(21%_29%_21%_29%_round_24px)] [will-change:clip-path]"
          >
            {mediaType === "video" ? (
              <video
                ref={setMediaRef}
                className="absolute inset-0 h-full w-full origin-center select-none object-cover [will-change:transform]"
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              // The source can be generated or user-provided at runtime, so a native image is intentional here.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={setMediaRef}
                className="absolute inset-0 h-full w-full origin-center select-none object-cover [will-change:transform]"
                src={src}
                alt={alt}
                draggable={false}
              />
            )}
            <div
              ref={scrimRef}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(7,15,33,.82),rgba(7,15,33,.08)_48%,rgba(7,15,33,.36))] opacity-0"
            />
            {children && (
              <div
                ref={overlayRef}
                className="absolute inset-0 flex flex-col items-center justify-center p-[6%] text-center opacity-0 [will-change:opacity,transform]"
              >
                {children}
              </div>
            )}
          </div>

          {title && (
            <div
              ref={titleRef}
              className="pointer-events-none absolute inset-0 m-0 flex items-center justify-center px-[6%] text-center font-bold leading-none tracking-[-0.04em] text-white [font-size:var(--scroll-expand-title-size)] [text-shadow:0_3px_28px_rgba(0,0,0,.5)] [will-change:opacity,transform]"
            >
              {title}
            </div>
          )}
          {scrollHint && (
            <div
              ref={hintRef}
              className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs tracking-[.04em] text-white/65 [will-change:opacity,transform]"
            >
              {scrollHint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
