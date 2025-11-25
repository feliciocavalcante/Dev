import React, { useState, useEffect } from "react";
import { Zap, ArrowRight, Copy, Image as ImageIcon, Key } from "lucide-react";

export default function IaGeneration() {

    const [apiKey, setApiKey] = useState("AIzaSyCTpj5DfVrRBWEGUZdYoa0oC6e6nWLPiYU"); 
    
    const [showKeyInput, setShowKeyInput] = useState(false);
    const [userApiKey, setUserApiKey] = useState("");
    const [businessInput, setBusinessInput] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Verifica se a chave existe ao carregar
    useEffect(() => {
        if (!apiKey) {
            setShowKeyInput(true);
        }
    }, [apiKey]);

    const handleNicheClick = (niche) => {
        setBusinessInput(niche);
    };

    const handleCopyText = () => {
        if (result?.text) {
            navigator.clipboard.writeText(result.text);
            alert("Texto copiado!");
        }
    };

    // LÓGICA REAL DA IA (Copiada do App.js para cá)
    const generateConcept = async () => {
        const finalKey = apiKey || userApiKey;

        if (!businessInput.trim()) {
            setError("Por favor, digite um ramo.");
            return;
        }

        if (!finalKey) {
            setError("Chave de API necessária.");
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
            // 1. Chamada de Texto
            const textResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${finalKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: textPrompt }] }] })
            });

            // 2. Chamada de Imagem
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

            // Processar Imagem
            if (imageData.predictions && imageData.predictions[0].bytesBase64Encoded) {
                generatedImage = imageData.predictions[0].bytesBase64Encoded;
            } else if (imageData.error) {
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
            setError("Erro de conexão. Verifique sua API Key.");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="bg-slate-900/80 border border-sky-400/20 rounded-xl p-5 text-left relative overflow-hidden shadow-lg mb-8 group hover:border-blue-500/40 transition-colors">
        
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm uppercase font-bold text-white flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" /> Consultoria Automática
                      </h3>
                      <p className="text-slate-400 text-[15px] mt-1">
                       Selecione ou digite seu nicho para ver uma prévia do que posso criar para você.
                      </p>
                    </div>
                  </div>
        
                  {/* Input API Key (Condicional) */}
                  {showKeyInput && (
                    <div className="mb-3 bg-slate-950/50 p-3 rounded border border-red-500/30 animate-in fade-in slide-in-from-top-2">
                      <label className="flex items-center gap-2 text-[10px] text-red-300 font-bold mb-1">
                        <Key className="w-3 h-3" /> CONFIGURAÇÃO (API KEY)
                      </label>
                      <input
                        type="password"
                        value={userApiKey}
                        onChange={(e) => setUserApiKey(e.target.value)}
                        placeholder="Cole sua Google AI Studio Key aqui..."
                        className="w-full bg-slate-900 text-slate-300 text-xs rounded p-2 border border-slate-700 focus:outline-none focus:border-red-400"
                      />
                    </div>
                  )}
        
                  {/* Quick Chips */}
                  <div className="flex flex-wrap gap-2 mb-3 ">
                    {['⚖️ Advocacia', '🛵 Delivery', '💅 Estética', '🏠 Imobiliária'].map((niche) => (
                      <button
                        key={niche}
                        onClick={() => handleNicheClick(niche)}
                        className="bg-slate-800/50 border border-slate-700 text-slate-300 text-[13px] px-3 py-1 rounded-full hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 hover:-translate-y-0.5 transition-all cursor-pointer"
                      >
                        {niche}
                      </button>
                    ))}
                  </div>
        
                  {/* Main Input */}
                  <div className="flex gap-2 mb-4 relative">
                    <input
                      type="text"
                      value={businessInput}
                      onChange={(e) => setBusinessInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && generateConcept()}
                      placeholder="Outro ramo..."
                      className={`flex-1 bg-slate-900 border ${error ? 'border-red-500' : 'border-slate-700'} text-white text-xs rounded-lg px-3 py-3 focus:outline-none focus:border-blue-500 placeholder-slate-600 transition-colors`}
                    />
                    <button
                      onClick={generateConcept}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 rounded-lg text-xs font-bold transition-all shadow-lg flex items-center gap-2"
                    >
                      {loading ? '...' : <><span className="hidden sm:inline">Analisar</span> <ArrowRight className="w-3 h-3" /></>}
                    </button>
                  </div>
        
                  {/* Result Display */}
                  {result && (
                    <div className="bg-slate-900/90 rounded-lg border border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                      <div className="bg-slate-800/50 px-3 py-2 border-b border-slate-700 flex justify-between items-center">
                        <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Conceito Sugerido</span>
                        <button onClick={handleCopyText} className="text-slate-500 hover:text-white transition-colors" title="Copiar">
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
        
                      <div className="p-3">
                        <p className="text-slate-300 text-xs leading-relaxed font-light">{result.text}</p>
                      </div>
        
                      <div className="border-t border-slate-800 relative min-h-[140px] bg-slate-950 flex items-center justify-center overflow-hidden">
                        {result.image ? (
                          <img src={`data:image/png;base64,${result.image}`} alt="Conceito Web" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4 text-center opacity-60">
                            <ImageIcon className="w-6 h-6 mb-2 text-slate-500" />
                            <p className="text-[10px] text-slate-500">{result.imageError || "Imagem carregando..."}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
        
                  {loading && (
                    <div className="text-center py-4">
                        {/* Simulação do typing indicator com CSS inline ou classe se tiver no css global */}
                        <p className="text-slate-500 text-[10px] mt-2">Processando análise de mercado...</p>
                    </div>
                  )}
        
                  {result && !loading && (
                    <p className="text-center text-[10px] text-slate-600 mt-2 italic">
                      *Proposta gerada automaticamente para fins de apresentação.
                    </p>
                  )}
                </div>
    )
}