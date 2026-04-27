/*
  DESIGN: "Warm Editorial"
  GallerySection — grade masonry com lightbox interativo
  Paleta: cream (#FAF7F2), terracota (#C4714A), dourado (#B8965A), grafite (#3D3530)
  Tipografia: Cormorant Garamond (títulos) + Nunito Sans (corpo)

  Para adicionar/trocar fotos: edite o array galleryPhotos em client/src/lib/data.ts
*/

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryPhotos, COUPLE_NAMES, type GalleryPhoto } from "@/lib/data";

/* ─── Lightbox ──────────────────────────────────────────────────────────── */
function Lightbox({
  photos,
  index,
  onClose,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const photo = photos[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(30, 22, 18, 0.96)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
        style={{ color: "#FAF7F2", background: "rgba(255,255,255,0.1)" }}
        aria-label="Fechar"
      >
        <X size={22} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 md:left-6 z-10 p-2 rounded-full transition-colors"
        style={{ color: "#FAF7F2", background: "rgba(255,255,255,0.1)" }}
        aria-label="Anterior"
      >
        <ChevronLeft size={26} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center px-14 md:px-20 max-h-screen"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
          {photo.caption && (
            <p
              className="mt-4 text-sm tracking-widest uppercase"
              style={{ color: "rgba(250,247,242,0.6)", fontFamily: "'Nunito Sans', sans-serif" }}
            >
              {photo.caption}
            </p>
          )}
          <p
            className="mt-1 text-xs"
            style={{ color: "rgba(250,247,242,0.35)", fontFamily: "'Nunito Sans', sans-serif" }}
          >
            {current + 1} / {photos.length}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 md:right-6 z-10 p-2 rounded-full transition-colors"
        style={{ color: "#FAF7F2", background: "rgba(255,255,255,0.1)" }}
        aria-label="Próxima"
      >
        <ChevronRight size={26} />
      </button>
    </motion.div>
  );
}

/* ─── Gallery Card ───────────────────────────────────────────────────────── */
function GalleryCard({
  photo,
  index,
  onClick,
}: {
  photo: GalleryPhoto;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer overflow-hidden rounded-lg"
      style={{
        gridRow: photo.aspect === "portrait" ? "span 2" : "span 1",
        boxShadow: "0 4px 20px rgba(61,53,48,0.12)",
      }}
      onClick={onClick}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ minHeight: photo.aspect === "portrait" ? "320px" : "200px" }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(61,53,48,0.45)" }}
      >
        <ZoomIn size={28} style={{ color: "#FAF7F2" }} />
        {photo.caption && (
          <p
            className="mt-2 text-sm tracking-widest uppercase text-center px-3"
            style={{ color: "#FAF7F2", fontFamily: "'Nunito Sans', sans-serif" }}
          >
            {photo.caption}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="galeria"
      className="py-20 md:py-28"
      style={{ background: "#FAF7F2" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#C4714A", fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Momentos
          </p>
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ color: "#3D3530", fontFamily: "'Cormorant Garamond', serif" }}
          >
            Nossa Galeria
          </h2>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16" style={{ background: "#B8965A" }} />
            <span style={{ color: "#B8965A", fontSize: "1.2rem" }}>✦</span>
            <div className="h-px w-16" style={{ background: "#B8965A" }} />
          </div>
          <p
            className="text-base max-w-md mx-auto"
            style={{ color: "#7A6A60", fontFamily: "'Nunito Sans', sans-serif", lineHeight: 1.7 }}
          >
            Cada imagem conta um pedaço da nossa história, ainda há muito para a ser escrito, ainda há muitos ladrilhos a serem fixados no nosso caminho, suspeito que estamos no caminho correto.{" "}
            <span style={{ color: "#C4714A" }}>
              {COUPLE_NAMES.partner2} &amp; {COUPLE_NAMES.partner1}
            </span>
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          className="grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gridAutoRows: "200px",
            gridAutoFlow: "dense",
          }}
        >
          {galleryPhotos.map((photo, i) => (
            <GalleryCard
              key={photo.id}
              photo={photo}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        {/* Hint */}
        <p
          className="text-center text-xs mt-8 tracking-widest uppercase"
          style={{ color: "#B8965A", fontFamily: "'Nunito Sans', sans-serif" }}
        >
          Clique em qualquer foto para ampliar
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={galleryPhotos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
