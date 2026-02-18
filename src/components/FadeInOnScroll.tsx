import React, { useRef, useEffect, useState, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Root margin for IntersectionObserver. Default expands bottom by 120px so content triggers earlier. */
  rootMargin?: string;
  /** 0–1 threshold to trigger (default 0.1 = 10% visible) */
  threshold?: number;
};

type ScrollRevealContainerProps = FadeInProps & {
  /** Each direct child will fade in on scroll. Wrap your page content once and pass sections as direct children. */
  children: ReactNode;
};

/** Wraps content so it fades in and slides up when it enters the viewport (or near it). Use on any page section. */
export function FadeInOnScroll({
  children,
  className = "",
  rootMargin = "0px 0px 120px 0px",
  threshold = 0.1,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Alias for FadeInOnScroll. Use for page sections that should reveal on scroll. */
export const PageSection = FadeInOnScroll;

/**
 * Wrap once; each direct child will reveal on scroll. Use as the main wrapper for a page
 * and pass each section/block as a direct child.
 */
export function ScrollRevealContainer({
  children,
  className = "",
  rootMargin = "0px 0px 120px 0px",
  threshold = 0.1,
}: ScrollRevealContainerProps) {
  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement
  );
  return (
    <div className={className}>
      {validChildren.map((child, index) => (
        <FadeInOnScroll
          key={React.isValidElement(child) && child.key != null ? child.key : index}
          rootMargin={rootMargin}
          threshold={threshold}
        >
          {child}
        </FadeInOnScroll>
      ))}
    </div>
  );
}
