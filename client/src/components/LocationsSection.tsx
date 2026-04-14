/*
  DESIGN: "Warm Editorial"
  Locations — cards com mapa embutido (OpenStreetMap via iframe) e botões de navegação
  Mobile-first, dois cards em grid no desktop
*/

import { cronograma } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

// Coordenadas aproximadas dos locais em Fortaleza
const mapCoords: Record<string, { lat: number; lng: number }> = {
  cerimonia: { lat: -3.7244, lng: -38.4928 },  // Cartório Mucuripe
  recepcao: { lat: -3.7262, lng: -38.5003 },    // Restaurante Vignoli
};

function LocationCard({ event, index }: { event: typeof cronograma[0]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.12 });
  const coords = mapCoords[event.id];

  // OpenStreetMap embed (sem necessidade de API key)
  const osmSrc = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.008},${coords.lat - 0.006},${coords.lng + 0.008},${coords.lat + 0.006}&layer=mapnik&marker=${coords.lat},${coords.lng}`
    : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 4px 32px rgba(60,40,20,0.07), 0 1px 4px rgba(60,40,20,0.04)" }}
    >
      {/* Map */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
        {osmSrc ? (
          <iframe
            src={osmSrc}
            className="w-full h-full border-0"
            title={`Mapa — ${event.local}`}
            loading="lazy"
            style={{ filter: "sepia(15%) saturate(0.85)" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <MapPin size={32} style={{ color: "oklch(0.60 0.08 55 / 0.4)" }} />
          </div>
        )}
        {/* Gradient overlay at bottom for readability */}
        <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.5), transparent)" }} />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Event label */}
        <p
          className="text-[10px] tracking-[0.22em] uppercase mb-2"
          style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.60 0.08 55 / 0.75)" }}
        >
          {event.hora} — {event.titulo}
        </p>

        {/* Local name */}
        <h3
          className="text-xl sm:text-2xl font-semibold mb-1 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.01 60)" }}
        >
          {event.local}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-2 mb-5">
          <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "oklch(0.60 0.08 55 / 0.6)" }} strokeWidth={1.8} />
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.55 0.02 60)" }}
          >
            {event.endereco}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 hover:opacity-85 hover:shadow-md active:scale-95"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              background: "oklch(0.60 0.08 55)",
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
  );
}

export default function LocationsSection() {
  const { ref: titleRef, isInView: titleVisible } = useInView();

  return (
    <section id="locais" className="py-16 sm:py-24" style={{ background: "oklch(0.97 0.01 85)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.32em] uppercase mb-3"
            style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.60 0.08 55 / 0.75)" }}
          >
            Como Chegar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[2.2rem] sm:text-4xl md:text-5xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.01 60)" }}
          >
            Os Locais
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-10 h-px mx-auto mt-4 origin-center"
            style={{ background: "oklch(0.76 0.12 85 / 0.5)" }}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cronograma.map((event, index) => (
            <LocationCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* Tip */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 italic"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "oklch(0.55 0.02 60 / 0.7)",
            fontSize: "0.88rem",
          }}
        >
          Os dois locais ficam a menos de 10 minutos de distância entre si
        </motion.p>
      </div>
    </section>
  );
}
