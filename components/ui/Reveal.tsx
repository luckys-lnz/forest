"use client";

import { createElement, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/lib/hooks/motion";

type Props = {
  as?: "div" | "section" | "li" | "p" | "h2" | "figure" | "article" | "span";
  /** Stagger index; each step adds 70ms of delay. */
  index?: number;
  className?: string;
  children: ReactNode;
  id?: string;
};

/** Fades and lifts content in the first time it scrolls into view. */
export function Reveal({ as = "div", index = 0, className, children, id }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      id,
      className,
      "data-reveal": inView ? "in" : "",
      style: { "--i": index } as CSSProperties,
    },
    children,
  );
}
