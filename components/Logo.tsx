export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-5xl",
  };

  return (
    <div className="flex flex-col items-center leading-none">
      <span
        className={`font-display tracking-wide text-white ${sizes[size]}`}
      >
        THE <span className="text-bear-primary">BEAR</span>
      </span>
    </div>
  );
}
