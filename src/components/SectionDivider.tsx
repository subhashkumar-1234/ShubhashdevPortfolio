import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type DividerVariant = "wave" | "curve" | "zigzag" | "gradient";

interface SectionDividerProps {
  variant?: DividerVariant;
  flip?: boolean;
  className?: string;
}

const paths: Record<string, string> = {
  wave: "M0,64 C320,120 480,0 720,64 C960,128 1120,10 1440,64 L1440,0 L0,0 Z",
  curve: "M0,96 Q720,0 1440,96 L1440,0 L0,0 Z",
  zigzag: "M0,48 L120,80 L240,32 L360,80 L480,32 L600,80 L720,32 L840,80 L960,32 L1080,80 L1200,32 L1320,80 L1440,48 L1440,0 L0,0 Z",
};

export default function SectionDivider({ variant = "wave", flip = false, className = "" }: SectionDividerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  if (variant === "gradient") {
    return (
      <div ref={ref} className={`relative h-24 ${className}`}>
        <motion.div
          style={{ opacity }}
          className={`absolute inset-0 bg-gradient-to-b ${flip ? "from-transparent to-primary/5" : "from-primary/5 to-transparent"}`}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative -my-px ${className}`}>
      <motion.svg
        style={{ opacity }}
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        className={`w-full h-16 sm:h-20 block ${flip ? "rotate-180" : ""}`}
        fill="none"
      >
        <defs>
          <linearGradient id={`divider-grad-${variant}-${flip}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path d={paths[variant] || paths.wave} fill={`url(#divider-grad-${variant}-${flip})`} />
      </motion.svg>
    </div>
  );
}
