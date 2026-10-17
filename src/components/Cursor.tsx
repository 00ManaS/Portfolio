"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/* Only for a real mouse, and never when the visitor has asked for less motion. */
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label';

// The ring trails the pointer on a spring: stiff enough to feel attached,
// damped enough that it settles without wobbling.
const STIFFNESS = 380;
const DAMPING = 34;
const MASS = 0.5;

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * A dot that sits on the pointer and a ring that follows it, growing over
 * anything clickable. It decorates the native cursor rather than replacing it,
 * so nothing about pointing or clicking changes.
 */
export default function Cursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const layerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !layer || !dot || !ring) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    let frame = 0;
    let last = 0;

    const step = (now: number) => {
      // Fixed substeps keep the spring stable when frames arrive late.
      let remaining = Math.min((now - last) / 1000, 0.1);
      last = now;
      while (remaining > 0) {
        const dt = Math.min(remaining, 1 / 120);
        for (const axis of ["x", "y"] as const) {
          const force = -STIFFNESS * (pos[axis] - target[axis]) - DAMPING * vel[axis];
          vel[axis] += (force / MASS) * dt;
          pos[axis] += vel[axis] * dt;
        }
        remaining -= dt;
      }
      ring.style.translate = `${pos.x}px ${pos.y}px`;

      const settled =
        Math.abs(pos.x - target.x) < 0.1 &&
        Math.abs(pos.y - target.y) < 0.1 &&
        Math.abs(vel.x) < 0.1 &&
        Math.abs(vel.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      target.x = event.clientX;
      target.y = event.clientY;
      dot.style.translate = `${target.x}px ${target.y}px`;

      // Arriving from outside the window: start the ring under the pointer
      // instead of sweeping in from wherever it was left.
      if (layer.dataset.visible !== "true") {
        pos.x = target.x;
        pos.y = target.y;
        vel.x = vel.y = 0;
        ring.style.translate = `${pos.x}px ${pos.y}px`;
        layer.dataset.visible = "true";
      }

      const hovered = event.target instanceof Element && event.target.closest(INTERACTIVE);
      layer.dataset.active = String(Boolean(hovered));

      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    };

    // relatedTarget is null only when the pointer leaves the window itself.
    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) layer.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={layerRef} className="cursor-layer" aria-hidden="true">
      <span ref={ringRef} className="cursor-ring" />
      <span ref={dotRef} className="cursor-dot" />
    </div>
  );
}
