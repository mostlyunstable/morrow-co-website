interface BrandMarkProps {
  className?: string;
  color?: string;
  accentColor?: string;
}

export function BrandMark({
  className = "h-5 w-5",
  color = "#FFFFFF",
  accentColor,
}: BrandMarkProps) {
  const bottomColor = accentColor ?? color;

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Upper rising solar dome */}
      <path
        d="M4.78 18.5A11.5 11.5 0 1 1 27.22 18.5Q16 12.2 4.78 18.5Z"
        fill={color}
      />
      {/* Lower horizon arc */}
      <path
        d="M6.07 21.8Q16 16.2 25.93 21.8A11.5 11.5 0 0 1 6.07 21.8Z"
        fill={bottomColor}
      />
    </svg>
  );
}
