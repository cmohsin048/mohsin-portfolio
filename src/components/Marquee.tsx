/** Infinite text marquee. Pure CSS, respects reduced motion. */
export function Marquee({
  items,
  reverse = false,
  speed = 40,
  className = "",
  separator = "✦",
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
  className?: string;
  separator?: string;
}) {
  const row = (hidden = false) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={`${it}-${i}`} className="flex items-center">
          <span className="px-6">{it}</span>
          <span className="text-lime">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`marquee-track ${reverse ? "reverse" : ""}`} style={{ ["--marquee-speed" as string]: `${speed}s` }}>
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
