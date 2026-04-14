/*
  DESIGN: "Warm Editorial"
  Gallery — grid de fotos com efeito hover, lightbox para visualização ampliada
  Tipografia: Cormorant Garamond display, Nunito Sans body
  Otimizado para mobile-first
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Dados de exemplo - substitua com URLs reais das fotos
const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032352338/AQpd5VvaiwiMHbCR2RvJQA/hero-wedding-5JtCTZXJrbvc5bEQAiyrcd.webp",
    alt: "Ilana e Cícero - Foto 1",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    alt: "Ilana e Cícero - Foto 2",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Ilana e Cícero - Foto 3",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1469371670267-496523562274?w=800&q=80",
    alt: "Ilana e Cícero - Foto 4",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    alt: "Ilana e Cícero - Foto 5",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    alt: "Ilana e Cícero - Foto 6",
  },
];

function GalleryImage({ image, onClick }: { image: typeof GALLERY_IMAGES[0]; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

function Lightbox({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onPrevious, 
  onNext 
}: {
  images: typeof GALLERY_IMAGES;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={24} strokeWidth={1.5} />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.1 }}
            className="absolute left-4 text-white/80 hover:text-white transition-colors p-2 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            disabled={currentIndex === 0}
            aria-label="Anterior"
          >
            <ChevronLeft size={28} strokeWidth={1.5} />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.1 }}
            className="absolute right-4 text-white/80 hover:text-white transition-colors p-2 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={currentIndex === images.length - 1}
            aria-label="Próxima"
          >
            <ChevronRight size={28} strokeWidth={1.5} />
          </motion.button>

          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            {currentIndex + 1} / {images.length}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function GallerySection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < GALLERY_IMAGES.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <section id="galeria" className="py-20 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Decorative line */}
          <div className="w-14 h-px mx-auto mb-6" style={{ background: "oklch(0.76 0.12 85 / 0.7)" }} />

          {/* Section title */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.25 0.08 85)" }}
          >
            Nossos Momentos
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Uma seleção de fotos especiais que contam um pouco da nossa história de amor
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryImage
              key={image.id}
              image={image}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p
            className="text-sm text-gray-500 italic"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Clique em qualquer foto para ampliar
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={GALLERY_IMAGES}
        currentIndex={selectedImageIndex ?? 0}
        isOpen={selectedImageIndex !== null}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </section>
  );
}
