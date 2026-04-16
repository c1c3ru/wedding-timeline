/*
  DESIGN: "Warm Editorial"
  Header — sticky, transparente no topo, sólido ao scroll
  Logo em Cormorant Garamond, nav em Nunito Sans uppercase
  Mobile: menu hamburguer com AnimatePresence
*/

import { useState, useEffect } from "react";
import { navItems, COUPLE_NAMES } from "@/lib/data";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const textColor = scrolled ? "oklch(0.30 0.01 60)" : "rgba(255,255,255,0.92)";
  const bgStyle = scrolled
    ? { background: "oklch(0.97 0.01 85 / 0.96)", backdropFilter: "blur(14px)", boxShadow: "0 1px 24px rgba(60,40,20,0.07)" }
    : { background: "transparent" };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={bgStyle}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo("inicio")}
            className="transition-colors duration-400"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.2rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: textColor,
            }}
          >
            {COUPLE_NAMES.partner2[0]}&amp;{COUPLE_NAMES.partner1[0]}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="transition-all duration-300 hover:opacity-60"
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: textColor,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 transition-colors duration-300"
            style={{ color: textColor }}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: "oklch(0.97 0.01 85 / 0.98)",
              backdropFilter: "blur(16px)",
              borderColor: "oklch(0.60 0.08 55 / 0.12)",
            }}
          >
            <nav className="flex flex-col py-4 px-6 gap-0.5">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.28 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-left py-3.5 transition-colors duration-200 hover:opacity-60"
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "oklch(0.30 0.01 60)",
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
