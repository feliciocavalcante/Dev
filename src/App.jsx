import React, { useState, useEffect } from 'react';
import { Code, Laptop } from 'lucide-react';

import './App.css';
import Header from './component/Header';
import Perfil from './component/Perfil';
import IaGeneration from './component/IaGeneration';
import Button from './component/Button';
import Footer from './component/Footer';

export default function App() {
  // Estados da Aplicação
  const [apiKey, setApiKey] = useState("AIzaSyCTpj5DfVrRBWEGUZdYoa0oC6e6nWLPiYU");
  const [userApiKey, setUserApiKey] = useState("");
  const [businessInput, setBusinessInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { text: string, image: string | null }
  const [error, setError] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Verifica se a chave foi configurada inicialmente
  useEffect(() => {
    if (!apiKey) {
      setShowKeyInput(true);
    }
  }, [apiKey]);

  // Função para setar nicho rápido
  const handleNicheClick = (niche) => {
    setBusinessInput(niche);
  };

  // Função para copiar texto
  const handleCopyText = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text);
      alert("Texto copiado para a área de transferência!");
    }
  };

  // Função Principal de Geração
  const generateConcept = async () => {
    const finalKey = apiKey || userApiKey;

    if (!businessInput.trim()) {
      setError("Por favor, digite um ramo de atuação.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!finalKey) {
      setError("Chave de API necessária. Configure abaixo.");
      setShowKeyInput(true);
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    // Prompts
    const textPrompt = `Aja como um consultor de desenvolvimento web experiente. Um cliente deseja um site para "${businessInput}".
    Crie uma breve proposta conceitual (máximo 40 palavras).
    Não use frases como "Como IA". Use linguagem direta e profissional.
    Exemplo: "Para uma ${businessInput}, sugiro um design minimalista com agendamento online integrado e galeria de fotos de alta resolução para aumentar a conversão."`;

    const imagePrompt = `Modern professional website landing page design for a ${businessInput}, UI/UX design, dark theme, high quality, 4k, trending on dribbble, web interface, minimal`;

    try {
      // 1. Chamada de Texto (Gemini Flash)
      const textResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${finalKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: textPrompt }] }] })
      });

      // 2. Chamada de Imagem (Imagen)
      const imageResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${finalKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: imagePrompt }],
          parameters: { sampleCount: 1, aspectRatio: "16:9" }
        })
      });

      const [textData, imageData] = await Promise.all([
        textResponse.json(),
        imageResponse.json()
      ]);

      let generatedText = "Não foi possível gerar a análise textual.";
      let generatedImage = null;
      let imageErrorMsg = null;

      // Processar Texto
      if (textData.candidates && textData.candidates[0].content) {
        generatedText = textData.candidates[0].content.parts[0].text;
      }

      // Processar Imagem (com tratamento de erro safe)
      if (imageData.predictions && imageData.predictions[0].bytesBase64Encoded) {
        generatedImage = imageData.predictions[0].bytesBase64Encoded;
      } else if (imageData.error) {
        // Verifica se é erro de faturamento
        if (imageData.error.message?.includes('billed')) {
          imageErrorMsg = "Prévia visual requer upgrade de conta (Billing).";
        } else {
          imageErrorMsg = "Imagem indisponível na simulação.";
        }
      }

      setResult({
        text: generatedText,
        image: generatedImage,
        imageError: imageErrorMsg
      });

    } catch (err) {
      console.error(err);
      setError("Erro de conexão. Verifique sua internet ou a Chave de API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8 md:py-12 relative overflow-hidden font-sans text-slate-100 bg-slate-900">

      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-aurora -z-20"></div>
      <div className="fixed top-10 left-10 text-slate-800 opacity-20 anim-float -z-10" style={{ animationDelay: '0s' }}>
        <Code size={120} />
      </div>
      <div className="fixed bottom-10 right-10 text-slate-800 opacity-20 anim-float -z-10" style={{ animationDelay: '2s' }}>
        <Laptop size={120} />
      </div>

      {/* Card Principal */}
      <div className="glass-card w-full max-w-md rounded-2xl p-6 md:p-8 text-center relative z-10 transition-all duration-300">

        <Header />

        < Perfil />

        <IaGeneration />

        <Button />
        
        <Footer />

      </div>
    </div>
  );
}