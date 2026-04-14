/*
  DESIGN: "Warm Editorial"
  Data layer — cronograma, cardápio e informações do casamento
*/

export const WEDDING_DATE = new Date("2026-06-27T11:00:00-03:00");

export const COUPLE_NAMES = {
  partner1: "Noivo",
  partner2: "Noiva",
};

export interface TimelineEvent {
  id: string;
  hora: string;
  titulo: string;
  descricao: string;
  local: string;
  endereco: string;
  icon: string;
  mapsUrl: string;
  wazeUrl: string;
}

export const cronograma: TimelineEvent[] = [
  {
    id: "cerimonia",
    hora: "11:00",
    titulo: "Cerimônia Civil",
    descricao: "O momento em que diremos sim! Venha celebrar conosco este marco tão especial.",
    local: "Cartório Mucuripe",
    endereco: "Av. da Abolição, 3220 — Mucuripe, Fortaleza",
    icon: "rings",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+da+Abolição,+3220+-+Mucuripe,+Fortaleza",
    wazeUrl: "https://waze.com/ul?q=Av.+da+Abolição,+3220+-+Mucuripe,+Fortaleza&navigate=yes",
  },
  {
    id: "recepcao",
    hora: "12:00",
    titulo: "Recepção e Almoço",
    descricao: "Hora de celebrar com boa comida, boa companhia e muita alegria!",
    local: "Restaurante Vignoli",
    endereco: "Rua Silva Jatahy, 529 — Meireles, Fortaleza",
    icon: "utensils",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rua+Silva+Jatahy,+529+-+Meireles,+Fortaleza",
    wazeUrl: "https://waze.com/ul?q=Rua+Silva+Jatahy,+529+-+Meireles,+Fortaleza&navigate=yes",
  },
];

export interface MenuItem {
  nome: string;
  descricao?: string;
}

export interface MenuCategory {
  id: string;
  titulo: string;
  icon: string;
  items: MenuItem[];
}

export const cardapio: MenuCategory[] = [
  {
    id: "entradas",
    titulo: "Entradas",
    icon: "salad",
    items: [
      { nome: "Bolinho de Macaxeira com Carne de Sol", descricao: "Crocante por fora, macio por dentro, servido com molho de pimenta" },
      { nome: "Bruschetta de Tomate Seco e Manjericão", descricao: "Pão italiano tostado com tomate seco, queijo e manjericão fresco" },
      { nome: "Carpaccio de Carne com Rúcula e Parmesão", descricao: "Finas fatias de carne com rúcula selvagem e lascas de parmesão" },
    ],
  },
  {
    id: "pratos-principais",
    titulo: "Pratos Principais",
    icon: "chef-hat",
    items: [
      { nome: "Risoto de Carne de Sol", descricao: "Arroz arbóreo cremoso com carne de sol desfiada e queijo coalho" },
      { nome: "Filé ao Molho Madeira", descricao: "Filé mignon grelhado ao ponto com molho madeira e cogumelos" },
      { nome: "Salmão Grelhado com Legumes", descricao: "Salmão fresco grelhado com legumes da estação ao azeite" },
      { nome: "Pizza Individual Artesanal", descricao: "Massa fina e crocante com opções variadas de sabores" },
    ],
  },
  {
    id: "acompanhamentos",
    titulo: "Acompanhamentos",
    icon: "wheat",
    items: [
      { nome: "Arroz Branco Aromático" },
      { nome: "Feijão Verde Temperado" },
      { nome: "Farofa Crocante com Bacon" },
      { nome: "Salada Mista com Vinagrete" },
    ],
  },
  {
    id: "sobremesas",
    titulo: "Sobremesas",
    icon: "cake",
    items: [
      { nome: "Petit Gâteau com Sorvete", descricao: "Bolo quente de chocolate com centro cremoso e sorvete de baunilha" },
      { nome: "Pudim de Leite Condensado", descricao: "Receita tradicional com calda de caramelo" },
      { nome: "Frutas da Estação", descricao: "Seleção de frutas frescas e tropicais" },
    ],
  },
  {
    id: "bebidas",
    titulo: "Bebidas",
    icon: "wine",
    items: [
      { nome: "Água Mineral e Refrigerantes" },
      { nome: "Sucos Naturais Variados" },
      { nome: "Cerveja Artesanal e Chopp" },
      { nome: "Vinho Tinto e Branco Selecionados" },
      { nome: "Espumante para o Brinde" },
    ],
  },
];

export const navItems = [
  { id: "inicio", label: "Início" },
  { id: "cronograma", label: "Cronograma" },
  { id: "cardapio", label: "Cardápio" },
  { id: "locais", label: "Locais" },
  { id: "rsvp", label: "Confirme sua Presença" },
];
