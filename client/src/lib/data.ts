/*
  DESIGN: "Warm Editorial"
  Data layer — cronograma, cardápio e informações do casamento
*/

export const WEDDING_DATE = new Date("2026-06-27T11:00:00-03:00");

export const COUPLE_NAMES = {
  partner1: "Cícero",
  partner2: "Ilana",
};

/*
  GALERIA DE FOTOS
  Para adicionar ou trocar fotos, edite o array galleryPhotos abaixo.
  Cada item precisa de: src (URL da imagem), alt (descrição), caption (legenda opcional) e aspect ("portrait" | "landscape").
  Imagens geradas por IA — substitua pelas fotos reais do casal quando disponíveis.
*/
export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  aspect: "portrait" | "landscape";
}

import g1 from "../../assests/fotos/g1.jpeg";
import g2 from "../../assests/fotos/g2.jpeg";
import g3 from "../../assests/fotos/g3.jpeg";
import g4 from "../../assests/fotos/g4.jpeg";
import g5 from "../../assests/fotos/g5.jpeg";
import g6 from "../../assests/fotos/g6.jpeg";
import g7 from "../../assests/fotos/g7.jpeg";
import g8 from "../../assests/fotos/g8.jpeg";

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "g1",
    src: g1,
    alt: "Cícero e Ilana na praia",
    caption: "Dias de sol e mar",
    aspect: "portrait",
  },
  {
    id: "g2",
    src: g2,
    alt: "Cícero e Ilana de kimono no jiu-jitsu",
    caption: "Amamos estar juntos no tatame",
    aspect: "portrait",
  },
  {
    id: "g3",
    src: g3,
    alt: "Cícero e Ilana sorrindo à noite",
    caption: "Dia de pagode na praça",
    aspect: "portrait",
  },
  {
    id: "g4",
    src: g4,
    alt: "Cícero e Ilana na igreja",
    caption: "Celebrando a união de amigos",
    aspect: "portrait",
  },
  {
    id: "g5",
    src: g5,
    alt: "Cícero e Ilana juntos em momento descontraído",
    caption: "Alegria de estar junto",
    aspect: "portrait",
  },
  {
    id: "g6",
    src: g6,
    alt: "Cícero e Ilana mergulhando com peixes",
    caption: "Na praia, pausa para fotos com os peixinhos",
    aspect: "portrait",
  },
  {
    id: "g7",
    src: g7,
    alt: "Cícero e Ilana sentados no tatame",
    caption: "Minha parceira de treino e da vida, pra ela 'rala de descanso' :)",
    aspect: "portrait",
  },
  {
    id: "g8",
    src: g8,
    alt: "Cícero e Ilana sorrindo em um restaurante",
    caption: "Por aí em algum lugar...",
    aspect: "portrait",
  },
];

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
  imagem?: string;
}

import vignoliImg from "../../assests/fotos/vignoli.jpg";

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
    imagem: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032352338/AQpd5VvaiwiMHbCR2RvJQA/ceremony-rings-QdFEtTHGoELKH4PxQGtNuB.webp",
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
    imagem: vignoliImg,
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
      { nome: "Mini Casquinha do Chef" },
      { nome: "Mini Casquinha de Calabresa" },
      { nome: "Mini Arancini" },
    ],
  },
  {
    id: "pratos-principais",
    titulo: "Prato Principal",
    icon: "chef-hat",
    items: [
      { nome: "Salada Caesar com Frango" },
      { nome: "Espaguete Carbonara" },
      { nome: "Frango Parmegiana" },
      { nome: "Frango com Legumes" },
      { nome: "Risoto de Carne de Sol" },
      { nome: "Pizza Individual", descricao: "Marguerita, Marguerita ao pesto, Portuguesa, Vignoli ou Frango Catupiry" },
    ],
  },
  {
    id: "sobremesas-cafe",
    titulo: "Sobremesa ou Café",
    icon: "cake",
    items: [
      { nome: "Sorvete" },
      { nome: "Mini Churros" },
    ],
  },
];

export const navItems = [
  { id: "inicio", label: "Início" },
  { id: "cronograma", label: "Cronograma" },
  { id: "cardapio", label: "Cardápio" },
  { id: "galeria", label: "Galeria" },
  { id: "locais", label: "Locais" },
  { id: "rsvp", label: "Confirme sua Presença" },
];
