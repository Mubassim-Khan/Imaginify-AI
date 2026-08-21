"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

const vertexShader = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShader = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform float uDistance;
uniform vec3 uColor;
uniform vec2 uResolution;

out vec4 fragColor;

void main() {
  vec2 point = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float opacity = 0.0;

  const int threadCount = 15;

  for (int index = 0; index < threadCount; index++) {
    float thread = float(index);
    float position = thread / float(threadCount - 1) - 0.5;
    float phase = thread * 0.83;
    float edgeFade = 1.0 - abs(position) * 0.34;

    float wave = sin(point.x * 1.55 + uTime * 0.92 + phase) * 0.105;
    wave += sin(point.x * 3.4 - uTime * 0.53 + phase * 1.47) * 0.036;
    wave += sin(point.x * 0.72 + uTime * 0.31 - phase * 0.54) * 0.025;

    float center = position * uDistance * 2.0 + wave * uAmplitude * edgeFade;
    float lineDistance = abs(point.y - center);
    float width = mix(0.0038, 0.0022, abs(position) * 2.0);
    float shimmer = 0.76 + 0.24 * sin(point.x * 4.8 - uTime * 1.35 + phase);

    float core = 1.0 - smoothstep(width, width * 2.35, lineDistance);
    float halo = exp(-lineDistance * 52.0) * 0.105;
    opacity += (core * 0.56 + halo) * shimmer;
  }

  float horizontalFade = 1.0 - smoothstep(0.72, 1.65, abs(point.x));
  float verticalFade = 1.0 - smoothstep(0.44, 0.72, abs(point.y));
  opacity = clamp(opacity * horizontalFade * verticalFade, 0.0, 0.78);

  fragColor = vec4(uColor * opacity, opacity);
}`;

export type ThreadsProps = {
  /** RGB channels can be supplied in either the 0-1 or 0-255 range. */
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  speed?: number;
  className?: string;
};

type ThreadSettings = Required<
  Pick<ThreadsProps, "color" | "amplitude" | "distance" | "speed">
>;

const normalizeColor = (color: [number, number, number]) =>
  color.map((channel) =>
    Math.min(1, Math.max(0, channel > 1 ? channel / 255 : channel)),
  );

// A lightweight, React Bits-inspired flowing-threads background.
export default function Threads({
  color = [22, 111, 136],
  amplitude = 1,
  distance = 0.28,
  speed = 1,
  className = "",
}: ThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<ThreadSettings>({
    color,
    amplitude,
    distance,
    speed,
  });
  const renderStaticFrameRef = useRef<(() => void) | null>(null);
  const [red, green, blue] = color;

  useEffect(() => {
    settingsRef.current = {
      color: [red, green, blue],
      amplitude,
      distance,
      speed,
    };
    renderStaticFrameRef.current?.();
  }, [amplitude, blue, distance, green, red, speed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
      premultipliedAlpha: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.display = "block";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const initialSettings = settingsRef.current;
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 1.15 },
        uAmplitude: { value: initialSettings.amplitude },
        uDistance: { value: initialSettings.distance },
        uColor: { value: normalizeColor(initialSettings.color) },
        uResolution: { value: [1, 1] },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let reducedMotion = motionQuery.matches;
    let intersectsViewport = true;
    let pageVisible = !document.hidden;
    let animationFrame: number | null = null;
    let elapsedMilliseconds = 1150;
    let previousTimestamp = 0;

    const applySettings = () => {
      const settings = settingsRef.current;
      program.uniforms.uAmplitude.value = Math.max(0, settings.amplitude);
      program.uniforms.uDistance.value = Math.max(0.04, settings.distance);
      program.uniforms.uColor.value = normalizeColor(settings.color);
    };

    const renderFrame = () => {
      applySettings();
      program.uniforms.uTime.value = elapsedMilliseconds * 0.001;
      renderer.render({ scene: mesh });
    };

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
      renderFrame();
    };

    const stopAnimation = () => {
      if (animationFrame === null) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
      previousTimestamp = 0;
    };

    const animate = (timestamp: number) => {
      if (reducedMotion || !intersectsViewport || !pageVisible) {
        stopAnimation();
        return;
      }

      if (previousTimestamp > 0) {
        const delta = Math.min(timestamp - previousTimestamp, 50);
        elapsedMilliseconds += delta * Math.max(0, settingsRef.current.speed);
      }
      previousTimestamp = timestamp;
      renderFrame();
      animationFrame = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (
        reducedMotion ||
        !intersectsViewport ||
        !pageVisible ||
        animationFrame !== null
      ) {
        return;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      if (reducedMotion) {
        stopAnimation();
        renderFrame();
      } else if (intersectsViewport && pageVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        intersectsViewport = entry.isIntersecting;
        syncAnimation();
      },
      { rootMargin: "120px" },
    );

    const resizeObserver = new ResizeObserver(resize);
    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      syncAnimation();
    };
    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      syncAnimation();
    };

    renderStaticFrameRef.current = () => {
      if (reducedMotion) renderFrame();
    };

    intersectionObserver.observe(container);
    resizeObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);
    resize();
    syncAnimation();

    return () => {
      renderStaticFrameRef.current = null;
      stopAnimation();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full overflow-hidden ${className}`}
    />
  );
}
