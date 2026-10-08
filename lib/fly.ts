/**
 * Arc a small seed from one point to another. Used when a choice "goes"
 * somewhere: a mood to the table, a product to the cart.
 * Resolves when it lands. No-ops (resolves immediately) for reduced motion.
 */
export function flySeed(
  from: { x: number; y: number },
  to: { x: number; y: number },
  opts: { color?: string; className?: string; duration?: number } = {},
): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();

  const dot = document.createElement("div");
  Object.assign(dot.style, {
    position: "fixed",
    left: `${from.x}px`,
    top: `${from.y}px`,
    width: "16px",
    height: "20px",
    borderRadius: "50% 50% 50% 50% / 58% 58% 42% 42%",
    background: opts.color ?? "var(--yolk)",
    pointerEvents: "none",
    zIndex: "90",
  } satisfies Partial<CSSStyleDeclaration>);
  if (opts.className) dot.className = opts.className;
  document.body.appendChild(dot);

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const lift = Math.min(-60, dy * 0.4 - 50);

  return dot
    .animate(
      [
        { transform: "translate(-50%, -50%) scale(0.5)", opacity: 0 },
        {
          transform: `translate(calc(-50% + ${dx * 0.45}px), calc(-50% + ${lift}px)) scale(1.1)`,
          opacity: 1,
          offset: 0.45,
        },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.35)`, opacity: 0.85 },
      ],
      { duration: opts.duration ?? 650, easing: "cubic-bezier(0.5, 0, 0.3, 1)" },
    )
    .finished.then(() => dot.remove())
    .catch(() => dot.remove());
}

export function centerOf(el: Element) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}
