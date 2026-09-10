"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type PressableProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "bare";
};

/** Button with the shared hover / focus / active / disabled behaviour. */
export function Pressable({
  children,
  variant = "primary",
  className,
  type = "button",
  ...rest
}: PressableProps) {
  const variantClass =
    variant === "primary"
      ? "btn btn-primary"
      : variant === "secondary"
        ? "btn btn-secondary"
        : variant === "tertiary"
          ? "btn btn-tertiary"
          : "";

  return (
    <button type={type} className={`${variantClass} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
