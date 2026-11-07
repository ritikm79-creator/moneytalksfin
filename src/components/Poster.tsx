/** Static night-city poster (SVG). Used before 3D loads and as the no-WebGL / reduced-motion fallback. */
function rnd(seed: number) { return () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }; }
const r = rnd(9);
const layers = [0, 1, 2].map((l) =>
  Array.from({ length: 34 - l * 6 }, (_, i) => {
    const w = 18 + r() * 30, x = (i / (34 - l * 6)) * 1440 + r() * 20 - 10;
    const centre = Math.exp(-((x - 760) ** 2) / 90000);
    const h = 60 + r() * 120 + centre * 220 * r() + (2 - l) * 40 + (x < 320 && l === 2 ? 180 : 0);
    return { x, w, h };
  }),
);

export function Poster() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-sky">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <linearGradient id="pw" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--electric)" stopOpacity=".35" /><stop offset="1" stopColor="var(--night)" stopOpacity="1" />
          </linearGradient>
          <pattern id="win" width="7" height="9" patternUnits="userSpaceOnUse"><rect x="1.5" y="2" width="3" height="4" fill="var(--ice)" opacity=".55" /></pattern>
        </defs>
        {layers.map((L, li) => (
          <g key={li} opacity={0.35 + li * 0.3}>
            {L.map((b, i) => (
              <g key={i}>
                <rect x={b.x} y={640 - b.h} width={b.w} height={b.h} fill="var(--night)" />
                {li > 0 && <rect x={b.x} y={640 - b.h} width={b.w} height={b.h} fill="url(#win)" opacity={0.25 + (i % 3) * 0.12} />}
              </g>
            ))}
          </g>
        ))}
        <rect x="0" y="640" width="1440" height="260" fill="url(#pw)" />
        <g className="animate-breathe" fill="none" transform="rotate(-8 1000 420)">
          <ellipse cx="1000" cy="420" rx="420" ry="150" stroke="var(--cyan)" strokeWidth="10" opacity=".18" />
          <ellipse cx="1000" cy="420" rx="420" ry="150" stroke="var(--ice)" strokeWidth="2" />
        </g>
        <rect x="830" y="300" width="340" height="210" rx="6" fill="var(--electric)" fillOpacity=".08" stroke="var(--cyan)" strokeOpacity=".8" />
        <path d="M850 440 C920 400 960 460 1020 400 S1100 360 1140 380" stroke="var(--cyan)" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}
