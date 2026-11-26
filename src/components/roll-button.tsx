"use client";

import Link from "next/link";

interface RollButtonProps {
  href?: string;
  onClick?: () => void;
  children: string;
  variant?: "primary" | "white" | "outline-dark" | "outline-light";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function RollButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}: RollButtonProps) {
  const variantStyles = {
    primary:
      "bg-[#4483e8] text-white hover:bg-[#3472d8] border border-transparent",
    white:
      "bg-white text-black hover:bg-zinc-200 border border-transparent",
    "outline-dark":
      "bg-black/45 text-white border border-white/20 hover:border-white/45 hover:bg-white/[0.06]",
    "outline-light":
      "bg-white text-black border border-black/15 hover:border-black/40 hover:bg-zinc-50",
  }[variant];

  const sizeStyles = {
    sm: "min-h-[38px] px-4 py-2 text-[13px] rounded-[3px]",
    md: "min-h-[42px] px-5 py-2.5 text-[13.5px] rounded-[3px]",
    lg: "min-h-[46px] px-6 py-3 text-[14px] rounded-[3px]",
  }[size];

  const content = (
    <span className="roll__inner">
      <span className="roll__track" aria-hidden="true">
        {children.split("").map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className="roll__ch"
            data-ch={ch === " " ? "\u00A0" : ch}
            style={{ ["--i" as string]: i }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );

  const classes = `roll font-medium tracking-[-0.01em] transition-[colors,transform] duration-200 active:scale-[0.98] ${variantStyles} ${sizeStyles} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
