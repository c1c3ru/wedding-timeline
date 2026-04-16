/*
  DESIGN: "Warm Editorial"
  Footer — dark graphite background, elegant minimal layout
  Monograma "&", mensagem, data, dica de PWA
*/

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Heart } from "lucide-react";
import { COUPLE_NAMES } from "@/lib/data";

export default function Footer() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <footer
      ref={ref}
      className="py-16 sm:py-20"
      style={{ background: "oklch(0.25 0.01 60)" }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative line */}
          <div
            className="w-10 h-px mx-auto mb-8"
            style={{ background: "oklch(0.76 0.12 85 / 0.35)" }}
          />

          {/* Ampersand monogram */}
          <p
            className="text-5xl sm:text-6xl font-light mb-5"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "oklch(0.76 0.12 85 / 0.55)",
            }}
          >
            &amp;
          </p>

          {/* Names */}
          <p
            className="text-2xl sm:text-3xl font-light mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(255,255,255,0.88)",
            }}
          >
            {COUPLE_NAMES.partner2} &amp; {COUPLE_NAMES.partner1}
          </p>

          {/* Message */}
          <p
            className="text-base sm:text-lg font-light italic mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Sua presença é o nosso maior presente
          </p>

          {/* Date & city */}
          <p
            className="text-sm mb-10"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.06em",
            }}
          >
            27 de Junho de 2026 — Fortaleza, CE
          </p>

          {/* Divider */}
          <div
            className="w-8 h-px mx-auto mb-8"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />

          {/* PWA hint */}
          <p
            className="text-xs mb-6 leading-relaxed max-w-xs mx-auto"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            Adicione este site à tela inicial do seu celular para acesso rápido no dia do evento
          </p>

          {/* Made with love */}
          <div
            className="flex items-center justify-center gap-1.5 text-xs"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: "rgba(255,255,255,0.18)",
            }}
          >
            <span>Feito com</span>
            <Heart
              size={11}
              fill="currentColor"
              style={{ color: "oklch(0.60 0.08 55 / 0.6)" }}
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
