/*
  DESIGN: "Warm Editorial"
  RSVP Section — formulário de confirmação de presença
  Integrado ao Google Forms real: https://forms.gle/ApYfkTEhe4viRJtz9

  Mapeamento de campos (extraído do FB_PUBLIC_LOAD_DATA_):
  - Nome Completo        → entry.775120435   (texto)
  - Quantas pessoas      → entry.1821605010  (radio: "1 pessoa (Somente eu)" | "2 pessoas" | "3 pessoas" | "4 ou mais pessoas")
  - Restrição Alimentar  → entry.1259217677  (checkbox: "Nenhuma" | "Vegetariano(a)" | "Vegano(a)" | "Sem Glúten" | "Sem Lactose" | "Outra (Por favor, especifique na Mensagem)")
  - Mensagem             → entry.1819073637  (textarea)
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { CheckCircle2, Loader2, Heart, Users } from "lucide-react";

// ─── CONFIGURAÇÃO DO GOOGLE FORMS ──────────────────────────────────────────
const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfaLEiwIcIVPp5Dl7cKpwPGnm4VQoJjS3SB_V6t6tKRWRdSGQ/formResponse";

const FIELD_IDS = {
  nome: "entry.775120435",
  acompanhantes: "entry.1821605010",
  restricao: "entry.1259217677",
  mensagem: "entry.1819073637",
};

const OPCOES_PESSOAS = [
  "1 pessoa (Somente eu)",
  "2 pessoas",
  "3 pessoas",
  "4 ou mais pessoas",
];

const OPCOES_RESTRICAO = [
  "Nenhuma",
  "Vegetariano(a)",
  "Vegano(a)",
  "Sem Glúten",
  "Sem Lactose",
  "Outra (Por favor, especifique na Mensagem)",
];
// ───────────────────────────────────────────────────────────────────────────

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  nome: string;
  acompanhantes: string;
  restricoes: string[];
  mensagem: string;
}

const initialData: FormData = {
  nome: "",
  acompanhantes: "1 pessoa (Somente eu)",
  restricoes: [],
  mensagem: "",
};

export default function RSVPSection() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [formState, setFormState] = useState<FormState>("idle");
  const { ref: titleRef, isInView: titleVisible } = useInView();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRestricaoToggle = (opcao: string) => {
    setFormData((prev) => {
      const already = prev.restricoes.includes(opcao);
      if (already) {
        return { ...prev, restricoes: prev.restricoes.filter((r) => r !== opcao) };
      }
      // Se selecionar "Nenhuma", limpar as outras; se selecionar outra, remover "Nenhuma"
      if (opcao === "Nenhuma") {
        return { ...prev, restricoes: ["Nenhuma"] };
      }
      return {
        ...prev,
        restricoes: [...prev.restricoes.filter((r) => r !== "Nenhuma"), opcao],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const body = new FormData();
      body.append(FIELD_IDS.nome, formData.nome);
      body.append(FIELD_IDS.acompanhantes, formData.acompanhantes);
      // Checkboxes: cada seleção é um append separado com o mesmo key
      const restricoesParaEnviar = formData.restricoes.length > 0
        ? formData.restricoes
        : ["Nenhuma"];
      for (const r of restricoesParaEnviar) {
        body.append(FIELD_IDS.restricao, r);
      }
      body.append(FIELD_IDS.mensagem, formData.mensagem);

      // Google Forms não retorna CORS-friendly response, mas o envio ocorre com no-cors.
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setFormState("idle");
  };

  const inputBase: React.CSSProperties = {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: "0.875rem",
    color: "oklch(0.30 0.01 60)",
    background: "oklch(0.97 0.01 85)",
    border: "1.5px solid oklch(0.60 0.08 55 / 0.18)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelBase: React.CSSProperties = {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "oklch(0.55 0.02 60)",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <section
      id="rsvp"
      className="py-16 sm:py-24"
      style={{ background: "oklch(0.99 0.003 85)" }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.32em] uppercase mb-3"
            style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.60 0.08 55 / 0.75)" }}
          >
            Confirmação de Presença
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[2.2rem] sm:text-4xl md:text-5xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.01 60)" }}
          >
            Confirme sua Presença
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-10 h-px mx-auto mt-4 origin-center"
            style={{ background: "oklch(0.76 0.12 85 / 0.5)" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.50 0.02 60)", fontStyle: "italic" }}
          >
            Confirme sua presença até o dia 20 de junho de 2026
          </motion.p>
        </div>

        {/* Card do formulário */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 4px 40px rgba(60,40,20,0.08), 0 1px 4px rgba(60,40,20,0.04)" }}
        >
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              /* ── Estado de sucesso ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center py-16 px-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle2
                    size={52}
                    strokeWidth={1.4}
                    style={{ color: "oklch(0.60 0.08 55)" }}
                  />
                </motion.div>
                <h3
                  className="mt-5 text-2xl sm:text-3xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.30 0.01 60)" }}
                >
                  Presença confirmada!
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed max-w-xs"
                  style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.55 0.02 60)" }}
                >
                  Ficamos muito felizes em saber que você estará conosco neste dia especial.
                </p>
                <Heart
                  size={20}
                  className="mt-5"
                  fill="currentColor"
                  style={{ color: "oklch(0.76 0.12 85 / 0.7)" }}
                />
                <button
                  onClick={handleReset}
                  className="mt-8 text-xs tracking-wider uppercase transition-opacity hover:opacity-60"
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    color: "oklch(0.55 0.02 60)",
                    letterSpacing: "0.14em",
                  }}
                >
                  Confirmar outro convidado
                </button>
              </motion.div>
            ) : (
              /* ── Formulário ── */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 space-y-6"
              >
                {/* Nome */}
                <div>
                  <label htmlFor="nome" style={labelBase}>
                    Nome completo *
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    style={inputBase}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.60 0.08 55 / 0.55)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(0.60 0.08 55 / 0.18)")}
                  />
                </div>

                {/* Quantas pessoas */}
                <div>
                  <label style={labelBase}>
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={11} />
                      Quantas pessoas estarão presentes? *
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {OPCOES_PESSOAS.map((opcao) => (
                      <label
                        key={opcao}
                        className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl cursor-pointer transition-all duration-200"
                        style={{
                          border: `1.5px solid ${formData.acompanhantes === opcao ? "oklch(0.60 0.08 55 / 0.55)" : "oklch(0.60 0.08 55 / 0.18)"}`,
                          background: formData.acompanhantes === opcao ? "oklch(0.60 0.08 55 / 0.07)" : "oklch(0.97 0.01 85)",
                        }}
                      >
                        <input
                          type="radio"
                          name="acompanhantes"
                          value={opcao}
                          checked={formData.acompanhantes === opcao}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                          style={{
                            borderColor: formData.acompanhantes === opcao ? "oklch(0.60 0.08 55)" : "oklch(0.60 0.08 55 / 0.35)",
                          }}
                        >
                          {formData.acompanhantes === opcao && (
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: "oklch(0.60 0.08 55)" }}
                            />
                          )}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontSize: "0.8rem",
                            color: "oklch(0.35 0.01 60)",
                          }}
                        >
                          {opcao}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Restrição alimentar */}
                <div>
                  <label style={labelBase}>
                    Restrição alimentar
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {OPCOES_RESTRICAO.map((opcao) => {
                      const selected = formData.restricoes.includes(opcao);
                      return (
                        <button
                          key={opcao}
                          type="button"
                          onClick={() => handleRestricaoToggle(opcao)}
                          className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                          style={{
                            fontFamily: "'Nunito Sans', sans-serif",
                            fontWeight: selected ? 600 : 400,
                            border: `1.5px solid ${selected ? "oklch(0.60 0.08 55)" : "oklch(0.60 0.08 55 / 0.25)"}`,
                            background: selected ? "oklch(0.60 0.08 55 / 0.10)" : "transparent",
                            color: selected ? "oklch(0.40 0.06 55)" : "oklch(0.55 0.02 60)",
                          }}
                        >
                          {opcao}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mensagem */}
                <div>
                  <label htmlFor="mensagem" style={labelBase}>
                    Mensagem para os noivos
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={3}
                    placeholder="Comentários,mensagem para os noivos ou perguntas"
                    value={formData.mensagem}
                    onChange={handleChange}
                    style={{ ...inputBase, resize: "none" }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.60 0.08 55 / 0.55)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(0.60 0.08 55 / 0.18)")}
                  />
                </div>

                {/* Erro */}
                {formState === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-center"
                    style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.55 0.22 25)" }}
                  >
                    Ocorreu um erro ao enviar. Tente novamente ou entre em contato diretamente.
                  </motion.p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold tracking-wider uppercase transition-all duration-300 hover:opacity-88 hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.14em",
                    background: "oklch(0.60 0.08 55)",
                    color: "white",
                  }}
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Confirmando…
                    </>
                  ) : (
                    <>
                      <Heart size={14} strokeWidth={2} />
                      Confirmar Presença
                    </>
                  )}
                </button>

                <p
                  className="text-center text-xs"
                  style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.65 0.01 60 / 0.7)" }}
                >
                  Suas respostas serão salvas com segurança via Google Forms
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
