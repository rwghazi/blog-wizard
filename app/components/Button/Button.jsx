"use client";

import clsx from "clsx";
import styles from "./Button.module.css";

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}) {
  const variantClass = {
    primary: styles.primary,
    secondary: styles.secondary,
  }[variant];

  return (
    <button
      className={clsx(styles.base, variantClass, className)} 
      {...props}
    >
      {children}
    </button>
  );
}
