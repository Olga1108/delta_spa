import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./Container.module.css";

/** Mobile-first: base padding for small screens, scales up at 768px and 1280px. */
type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  /** Use full viewport width (no max-width); only horizontal padding applied */
  fullWidth?: boolean;
};

export function Container({
  children,
  fullWidth = false,
  className = "",
  ...rest
}: ContainerProps) {
  const containerClass = fullWidth
    ? `${styles.root} ${styles.fullWidth}`
    : styles.root;
  return (
    <div className={`${containerClass} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
