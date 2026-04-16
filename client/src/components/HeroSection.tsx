/*
  DESIGN: "Warm Editorial"
  Hero — full-bleed image com overlay dourado, contagem regressiva em cards de vidro
  Tipografia: Cormorant Garamond display, Nunito Sans body
  Otimizado para mobile-first
*/

import { useCountdown } from "@/hooks/useCountdown";
import { WEDDING_DATE, COUPLE_NAMES } from "@/lib/data";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032352338/AQpd5VvaiwiMHbCR2RvJQA/hero-wedding-5JtCTZXJrbvc5bEQAiyrcd.webp";

function FlipUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[68px] h-[76px] sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-xl border border-white/20 flex items-center justify-center overflow-hidden"
        style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}
      >
        <span
          className="text-[2.2rem] sm:text-4xl md:text-5xl font-light text-white tabular-nums leading-none"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="mt-2 text-[9px] sm:text-[11px] tracking-[0.22em] uppercase text-white/60 font-medium"
        style={{ fontFamily: "'Nunito Sans', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="text-xl sm:text-2xl text-white/30 font-light pb-6 select-none"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      :
    </span>
  );
}

export default function HeroSection() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(WEDDING_DATE);

  const scrollToTimeline = () => {
    const el = document.getElementById("cronograma");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />

      {/* Layered overlay: warm golden tint + dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(30,15,5,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto w-full">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="w-14 h-px mx-auto mb-6 origin-center"
          style={{ background: "oklch(0.76 0.12 85 / 0.7)" }}
        />

        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[11px] sm:text-xs tracking-[0.32em] uppercase text-white/65 mb-5"
          style={{ fontFamily: "'Nunito Sans', sans-serif" }}
        >
          Estamos nos casando
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="text-[3.4rem] sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {COUPLE_NAMES.partner2} &amp; {COUPLE_NAMES.partner1}
        </motion.h1>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="text-base sm:text-xl text-white/75 font-light mb-1.5"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          27 de Junho de 2026
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-white/40 mb-12 sm:mb-14"
          style={{ fontFamily: "'Nunito Sans', sans-serif" }}
        >
          Fortaleza, Ceará
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
        >
          {isExpired ? (
            <p
              className="text-2xl sm:text-3xl text-white font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Hoje é o grande dia! 🎉
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <FlipUnit value={days} label="Dias" />
              <Separator />
              <FlipUnit value={hours} label="Horas" />
              <Separator />
              <FlipUnit value={minutes} label="Min" />
              <Separator />
              <FlipUnit value={seconds} label="Seg" />
            </div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToTimeline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors duration-300"
        aria-label="Ver cronograma"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ChevronDown size={26} strokeWidth={1.2} />
        </motion.div>
      </motion.button>
    </section>
  );
}
