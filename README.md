# 🚀 FC Consultancy & Consultor Web 

Um cartão de visita digital interativo que utiliza Inteligência Artificial para gerar conceitos de sites instantâneos e converter visitantes em clientes.

---

## 💡 Sobre o projeto

Este projeto não é apenas um portfólio: é uma ferramenta de conversão. Desenvolvido por **Felicio Cavalcante**, funciona como um cartão digital "Premium" onde o potencial cliente interage e recebe, em tempo real, uma proposta comercial e um mockup visual do site, gerados por IA.

A funcionalidade principal — **Consultoria Automática** — permite que o usuário informe o ramo do negócio (ex: `Pizzaria`) e receba:

- Uma proposta comercial persuasiva e personalizada (texto).
- Um layout visual (imagem) demonstrando como poderia ser o site do cliente.

---

## ✨ Funcionalidades

- ⚡ **Cartão Digital Interativo**: links rápidos, design moderno e animações (Glassmorphism).
- 🤖 **Consultoria**:
  - Geração de Texto com `gemini-2.5-flash`.
  - Geração de Imagem (mockup) com `imagen-4.0`.
- 📱 **Totalmente Responsivo**: adaptado para celulares, tablets e desktops.
- 💬 **CTA Inteligente**: botão de WhatsApp que inicia a conversa já com o contexto do orçamento.
- 🎨 **UI/UX Premium**: tipografia Inter, efeitos visuais, ícones Lucide.

---

## 🛠️ Tecnologias

- React.js (Vite)
- Tailwind CSS
- Google Generative AI API (Gemini + Imagen)
- Lucide React (ícones)

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js (v16+ recomendado)
- Chave de API do Google AI Studio (veja observação abaixo sobre faturamento para imagens)

### Passos

```bash
# clone o repositório (substitua pelo seu repositório real)
git clone https://github.com/seu-usuario/flyer-digital-ia.git
cd flyer-digital-ia

# instale dependências
npm install

# rode em modo desenvolvimento
npm run dev

src/
├── App.jsx                # Componente Principal (Layout)
├── App.css                # Estilos globais e animações
└── components/
    ├── Header.jsx         # Título e Boas-vindas
    ├── Profile.jsx        # Foto e Resumo do Dev
    ├── IaGeneration.jsx   # Lógica da IA (Texto + Imagem)
    ├── Button.jsx         # Botão CTA (WhatsApp)
    └── Footer.jsx         # Rodapé e Ícones Tech






