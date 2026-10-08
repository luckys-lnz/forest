import { Leaf } from "./Leaf";

export function Bowls() {
  return (
    <g>
      <path d="M70 250 h150 a75 72 0 0 1 -150 0 Z" fill="#000" />
      <ellipse cx="145" cy="250" rx="75" ry="14" fill="#2e2b27" />
      <path d="M180 282 h150 a75 72 0 0 1 -150 0 Z" fill="#EEEAE2" stroke="#000" strokeWidth="2" />
      <ellipse cx="255" cy="282" rx="75" ry="14" fill="#000" />
    </g>
  );
}

export function Rests() {
  return (
    <g>
      <line x1="80" y1="300" x2="340" y2="250" stroke="#7a5b3a" strokeWidth="7" strokeLinecap="round" />
      <line x1="82" y1="322" x2="342" y2="272" stroke="#7a5b3a" strokeWidth="7" strokeLinecap="round" />
      {[
        [130, 325],
        [280, 300],
      ].map(([x, y]) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <ellipse cx="0" cy="0" rx="46" ry="30" fill="#000" />
          <ellipse cx="-12" cy="-4" rx="4" ry="5.5" fill="#EEEAE2" />
          <ellipse cx="10" cy="-4" rx="4" ry="5.5" fill="#EEEAE2" />
          <Leaf x={30} y={-40} s={1.1} />
        </g>
      ))}
    </g>
  );
}
