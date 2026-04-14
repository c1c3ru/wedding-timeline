# Brainstorm de Design - Site de Casamento

## Contexto
Site para cronograma interativo de casamento marcado para 27 de junho de 2026. Dois eventos principais: Cerimônia Civil no Cartório Mucuripe e Recepção/Almoço no Restaurante Vignoli. Paleta sugerida: tons de creme, dourado e preto. Público principal: convidados acessando pelo celular no dia do evento.

---

<response>
<text>

## Ideia 1: "Botanical Nouveau" — Art Nouveau Orgânico

**Design Movement**: Art Nouveau reimaginado com influências botânicas contemporâneas

**Core Principles**:
- Linhas orgânicas e curvas fluidas que remetem a ramos e folhagens
- Assimetria controlada com equilíbrio visual natural
- Texturas ricas com camadas de profundidade (papel envelhecido, linho, folha dourada)
- Hierarquia visual através de escala dramática

**Color Philosophy**: 
- Base em marfim quente (#FAF7F0) representando pureza e tradição
- Dourado antigo (#B8860B) como cor de destaque, evocando luxo atemporal
- Verde oliva escuro (#3D4A3C) para ancoragem e sofisticação terrena
- Preto suave (#1A1A1A) para tipografia e contraste
- A paleta evoca um jardim ao entardecer, elegante sem ser ostensivo

**Layout Paradigm**: 
- Layout de rolagem vertical com seções que se revelam como páginas de um livro
- Bordas decorativas com motivos florais em SVG
- Elementos que "crescem" da lateral da tela como trepadeiras
- Cards assimétricos posicionados alternadamente à esquerda e direita

**Signature Elements**:
- Ilustrações botânicas em lineart dourado como separadores de seção
- Molduras ornamentais com cantos arredondados orgânicos
- Textura de papel artesanal como fundo sutil

**Interaction Philosophy**: 
- Interações lentas e deliberadas, como folhear um convite físico
- Hover revela detalhes como pétalas se abrindo
- Transições suaves e orgânicas (ease-in-out com duração longa)

**Animation**:
- Elementos surgem com fade-in + translate suave de baixo para cima
- Linhas decorativas se "desenham" progressivamente ao scroll
- Ícones da timeline pulsam sutilmente quando em viewport
- Parallax sutil nos backgrounds botânicos

**Typography System**:
- Display: "Playfair Display" (serif elegante) para títulos
- Body: "Lora" (serif legível) para texto corrido
- Accent: "Cormorant Garamond" (serif refinada) para horários e destaques
- Hierarquia: títulos em peso bold com tracking amplo, corpo em regular

</text>
<probability>0.07</probability>
</response>

---

<response>
<text>

## Ideia 2: "Kinetic Minimalism" — Minimalismo Cinético Japonês

**Design Movement**: Wabi-sabi digital com influências do design editorial japonês

**Core Principles**:
- Espaço negativo como elemento principal de composição
- Imperfeição intencional — assimetria, texturas naturais, bordas suaves
- Movimento como narrativa — cada scroll conta uma parte da história
- Redução ao essencial com máximo impacto emocional

**Color Philosophy**:
- Fundo em off-white quente (#F5F0EB) como "papel washi" digital
- Preto carvão (#2C2C2C) para tipografia principal — autoridade silenciosa
- Dourado rosado (#C9A96E) como único acento — precioso por ser raro
- Cinza pedra (#8A8578) para elementos secundários
- A restrição cromática cria sofisticação — menos cores = mais impacto

**Layout Paradigm**:
- Full-screen sections com scroll-snap para experiência cinematográfica
- Tipografia oversized que ocupa 60%+ da viewport em momentos-chave
- Grid assimétrico com proporção áurea (1:1.618) para posicionamento
- Elementos flutuam no espaço com muito respiro entre si

**Signature Elements**:
- Linha vertical central fina que conecta toda a timeline como um fio de seda
- Números de horário em escala monumental (120px+) com opacidade reduzida
- Círculos imperfeitos desenhados à mão como marcadores de evento

**Interaction Philosophy**:
- Scroll-driven animations — conteúdo se revela conforme o usuário navega
- Micro-interações minimalistas — um leve tremor, uma mudança de opacidade
- Toque/click produz feedback tátil visual (ripple sutil)

**Animation**:
- Texto aparece caractere por caractere em momentos-chave
- Transições entre seções com cross-fade cinematográfico
- Elementos se movem em parallax com velocidades diferentes criando profundidade
- A linha da timeline se desenha progressivamente

**Typography System**:
- Display: "DM Serif Display" para momentos dramáticos
- Body: "DM Sans" para legibilidade limpa
- Accent: números em "Bodoni Moda" para horários (contraste fino/grosso)
- Hierarquia extrema: títulos 4x maiores que corpo

</text>
<probability>0.05</probability>
</response>

---

<response>
<text>

## Ideia 3: "Warm Editorial" — Editorial de Luxo Acessível

**Design Movement**: Design editorial contemporâneo inspirado em revistas de lifestyle premium (Kinfolk, Cereal Magazine)

**Core Principles**:
- Fotografia como protagonista com tipografia como coadjuvante elegante
- Grid editorial com colunas variáveis e breakpoints intencionais
- Warmth (calor humano) em cada detalhe — cores quentes, cantos suaves, sombras difusas
- Informação clara e acessível sem sacrificar a estética

**Color Philosophy**:
- Creme quente (#FBF8F1) como base — acolhedor como um convite impresso em papel texturizado
- Terracota suave (#A67B5B) como cor primária — calor, terra, celebração
- Dourado champagne (#D4AF37) para acentos e destaques — luxo discreto
- Grafite macio (#3A3A3A) para texto — legível sem ser duro
- Branco puro (#FFFFFF) para cards e áreas de respiro
- A paleta evoca um almoço ao ar livre em tarde dourada

**Layout Paradigm**:
- Seções alternando entre full-bleed images e conteúdo em container estreito
- Cards com sombras difusas e bordas suavíssimas (border-radius: 16px)
- Timeline lateral com cards que se expandem ao toque
- Sticky header transparente que se solidifica ao scroll

**Signature Elements**:
- Dividers decorativos com monograma do casal entre seções
- Ícones custom em estilo line-art fino para cada evento
- Gradiente dourado sutil como overlay em imagens hero

**Interaction Philosophy**:
- Tudo é tocável e responsivo — feedback imediato e satisfatório
- Accordion suave para o cardápio — expandir/colapsar com spring animation
- Botões com hover states ricos — scale up + shadow deepening
- Mapa abre em modal elegante ou redireciona com confirmação

**Animation**:
- Entrance animations com stagger — elementos aparecem em sequência
- Cards da timeline deslizam da lateral com spring physics
- Contagem regressiva com flip animation nos números
- Scroll-triggered reveals com intersection observer
- Parallax sutil apenas no hero — não exagerar

**Typography System**:
- Display: "Cormorant Garamond" (serif clássica) para títulos — elegância atemporal
- Body: "Nunito Sans" (sans-serif humanista) para texto — amigável e legível
- Accent: "Cormorant" italic para citações e detalhes românticos
- Hierarquia: títulos em 600 weight, corpo em 400, labels em 300 uppercase com letter-spacing

</text>
<probability>0.08</probability>
</response>

---

## Decisão: Ideia 3 — "Warm Editorial"

Escolho a abordagem "Warm Editorial" por ser a mais adequada ao contexto:
- Prioriza legibilidade e usabilidade mobile (essencial para convidados no dia)
- A paleta quente combina perfeitamente com o estilo do Restaurante Vignoli
- O layout editorial é sofisticado sem ser pretensioso
- As animações são elegantes mas não prejudicam a performance
- A estrutura de cards e accordion é perfeita para o cardápio e timeline
