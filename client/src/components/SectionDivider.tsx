/*
  DESIGN: "Warm Editorial"
  Decorative divider — thin lines with optional "&" monogram
  Animates in on scroll
*/

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface SectionDividerProps {
  showMonogram?: boolean;
  light?: boolean;
}

export default function SectionDivider({ showMonogram = false, light = false }: SectionDividerProps) {
  const { ref, isInView } = useInView({ threshold: 0.5 });
  const bg = light ? "oklch(0.99 0.003 85)" : "oklch(0.97 0.01 85)";

  return (
    <div ref={ref} className="flex items-center justify-center py-6 sm:py-10" style={{ background: bg }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="h-px flex-1 max-w-[100px] origin-right"
        style={{ background: "linear-gradient(to left, oklch(0.60 0.08 55 / 0.22), transparent)" }}
      />
      {showMonogram ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-5 text-2xl sm:text-3xl font-light"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "oklch(0.76 0.12 85 / 0.55)",
          }}
        >
          &amp;
        </motion.span>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mx-5 w-1.5 h-1.5 rounded-full"
          style={{ background: "oklch(0.76 0.12 85 / 0.55)" }}
        />
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="h-px flex-1 max-w-[100px] origin-left"
        style={{ background: "linear-gradient(to right, oklch(0.60 0.08 55 / 0.22), transparent)" }}
      />
    </div>
  );
}
