/** Pip's leaf, the one recurring mark on every package. */
export function Leaf({ x, y, s = 1, fill = "#8DB07A" }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 10 C 4 0 18 -1 24 5 C 17 12 7 13 0 10 Z"
      fill={fill}
    />
  );
}
