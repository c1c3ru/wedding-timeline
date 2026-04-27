/*
  DESIGN: "Warm Editorial"
  Timeline — vertical line with animated event cards
  Cards com imagem, horário em overlay, botões de mapa
  Mobile-first, elegante e funcional
*/

import { cronograma, type TimelineEvent } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, ExternalLink } from "lucide-react";

function RingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="12" r="5.5" />
      <circle cx="15.5" cy="12" r="5.5" />
    </svg>
  );
}

function UtensilsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const image = event.imagem;
  const isLast = index === cronograma.length - 1;

  return (
    <div ref={ref} className="relative pl-14 sm:pl-16 pb-10 sm:pb-14 last:pb-0">
      {/* Connecting line */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute left-[19px] sm:left-[21px] top-11 bottom-0 w-px origin-top"
          style={{ background: "linear-gradient(to bottom, oklch(0.60 0.08 55 / 0.25), oklch(0.60 0.08 55 / 0.06))" }}
        />
      )}

      {/* Node circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, type: "spring", stiffness: 220, delay: 0.05 }}
        className="absolute left-0 top-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center"
        style={{
          background: "oklch(0.97 0.01 85)",
          border: "1.5px solid oklch(0.60 0.08 55 / 0.35)",
          color: "oklch(0.60 0.08 55)",
        }}
      >
        {event.icon === "rings" ? <RingsIcon /> : <UtensilsIcon />}
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 4px 32px rgba(60,40,20,0.07), 0 1px 4px rgba(60,40,20,0.04)" }}
      >
        {/* Image with time overlay */}
        {image && (
          <div className="relative h-44 sm:h-52 overflow-hidden">
            <img
              src={image}
              alt={event.titulo}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            {/* Time badge */}
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
              <Clock size={13} className="text-white/70" strokeWidth={1.5} />
              <span
                className="text-[1.9rem] sm:text-4xl font-light text-white tracking-tight leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {event.hora}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3
            className="text-[1.4rem] sm:text-2xl font-semibold mb-2 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.01 60)" }}
          >
            {event.titulo}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.55 0.02 60)" }}
          >
            {event.descricao}
          </p>

          {/* Location */}
          <div className="flex items-start gap-2.5 mb-5">
            <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "oklch(0.60 0.08 55 / 0.65)" }} strokeWidth={1.8} />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.30 0.01 60)" }}
              >
                {event.local}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.55 0.02 60)" }}
              >
                {event.endereco}
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-2">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 hover:opacity-85 hover:shadow-md active:scale-95"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                background: "oklch(0.30 0.01 60)",
                color: "white",
                letterSpacing: "0.1em",
              }}
            >
              <Navigation size={12} strokeWidth={2} />
              Google Maps
            </a>
            <a
              href={event.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 hover:opacity-80 active:scale-95"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                color: "oklch(0.30 0.01 60)",
                border: "1.5px solid oklch(0.30 0.01 60 / 0.18)",
                letterSpacing: "0.1em",
              }}
            >
              <ExternalLink size={12} strokeWidth={2} />
              Waze
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TimelineSection() {
  const { ref: titleRef, isInView: titleVisible } = useInView();

  return (
    <section id="cronograma" className="py-16 sm:py-24" style={{ background: "oklch(0.97 0.01 85)" }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.32em] uppercase mb-3"
            style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.60 0.08 55 / 0.75)" }}
          >
            O Cronograma
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[2.2rem] sm:text-4xl md:text-5xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.01 60)" }}
          >
            Nosso Dia
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-10 h-px mx-auto mt-4 origin-center"
            style={{ background: "oklch(0.76 0.12 85 / 0.5)" }}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {cronograma.map((event, index) => (
            <TimelineCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
