/*
  DESIGN: "Warm Editorial"
  Menu/Cardápio — accordion sanfonado com spring animations
  Layout editorial: imagem à esquerda (desktop), accordion à direita
  Mobile-first com ícones e descrições elegantes
*/

import { cardapio, type MenuCategory } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Salad, ChefHat, Wheat, Cake, Wine } from "lucide-react";

const FLORAL_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663032352338/AQpd5VvaiwiMHbCR2RvJQA/floral-detail-Ygu6NrrefDyjwYo3F4o734.webp";

const iconMap: Record<string, React.ReactNode> = {
  salad: <Salad size={18} strokeWidth={1.6} />,
  "chef-hat": <ChefHat size={18} strokeWidth={1.6} />,
  wheat: <Wheat size={18} strokeWidth={1.6} />,
  cake: <Cake size={18} strokeWidth={1.6} />,
  wine: <Wine size={18} strokeWidth={1.6} />,
};

function MenuAccordionItem({
  category,
  isOpen,
  onToggle,
  index,
}: {
  category: MenuCategory;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="border-b last:border-b-0"
      style={{ borderColor: "oklch(0.60 0.08 55 / 0.10)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 sm:py-[22px] text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5">
          <span
            className="transition-colors duration-300"
            style={{ color: isOpen ? "oklch(0.60 0.08 55)" : "oklch(0.60 0.08 55 / 0.55)" }}
          >
            {iconMap[category.icon] || <Salad size={18} />}
          </span>
          <h3
            className="text-[1.05rem] sm:text-lg font-medium transition-colors duration-300"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: isOpen ? "oklch(0.60 0.08 55)" : "oklch(0.30 0.01 60)",
            }}
          >
            {category.titulo}
          </h3>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full transition-colors duration-300"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              background: isOpen ? "oklch(0.60 0.08 55 / 0.10)" : "oklch(0.90 0.01 85)",
              color: "oklch(0.55 0.02 60)",
            }}
          >
            {category.items.length}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ color: "oklch(0.60 0.08 55 / 0.45)" }}
        >
          <ChevronDown size={17} strokeWidth={1.8} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-[34px] sm:pl-9 space-y-3.5">
              {category.items.map((item, i) => (
                <motion.div
                  key={item.nome}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.28 }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0"
                      style={{ background: "oklch(0.76 0.12 85 / 0.6)" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium leading-snug"
                        style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.30 0.01 60)" }}
                      >
                        {item.nome}
                      </p>
                      {item.descricao && (
                        <p
                          className="text-xs mt-0.5 leading-relaxed"
                          style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.55 0.02 60)" }}
                        >
                          {item.descricao}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MenuSection() {
  const [openId, setOpenId] = useState<string | null>("pratos-principais");
  const { ref: titleRef, isInView: titleVisible } = useInView();

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="cardapio" className="py-16 sm:py-24" style={{ background: "oklch(0.99 0.003 85)" }}>
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
            Gastronomia
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[2.2rem] sm:text-4xl md:text-5xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.01 60)" }}
          >
            O Cardápio
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-10 h-px mx-auto mt-4 origin-center"
            style={{ background: "oklch(0.76 0.12 85 / 0.5)" }}
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 items-start">
          {/* Floral image — editorial accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block lg:col-span-2 sticky top-28"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 8px 48px rgba(60,40,20,0.10)" }}
            >
              <img
                src={FLORAL_IMAGE}
                alt="Arranjo floral — Restaurante Vignoli"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <p
              className="text-center text-xs mt-4 italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.55 0.02 60)", fontSize: "0.82rem" }}
            >
              Restaurante Vignoli — Meireles, Fortaleza
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="lg:col-span-3">
            <div
              className="bg-white rounded-2xl px-5 sm:px-7 py-1"
              style={{ boxShadow: "0 4px 32px rgba(60,40,20,0.06), 0 1px 4px rgba(60,40,20,0.03)" }}
            >
              {cardapio.map((category, index) => (
                <MenuAccordionItem
                  key={category.id}
                  category={category}
                  isOpen={openId === category.id}
                  onToggle={() => toggle(category.id)}
                  index={index}
                />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-5 italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "oklch(0.60 0.02 60 / 0.6)",
                fontSize: "0.82rem",
              }}
            >
              * O cardápio pode sofrer pequenas alterações sazonais
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
