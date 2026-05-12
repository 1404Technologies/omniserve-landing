import clsx from "clsx";

export default function Marquee({ children, reverse = false, pauseOnHover = true, speed = 40, className }) {
  const duration = `${speed}s`;
  const items = Array.isArray(children) ? children : [children];

  return (
    <div
      className={clsx(
        "marquee group relative w-full overflow-hidden",
        "[--marquee-duration:var(--d)]",
        className
      )}
      style={{ "--d": duration }}
    >
      <div
        className={clsx(
          "marquee__track flex w-max gap-3 will-change-transform",
          reverse ? "marquee__track--reverse" : "",
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        )}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-3" aria-hidden={copy === 1}>
            {items}
          </div>
        ))}
      </div>
    </div>
  );
}
