import { FaWhatsapp } from "react-icons/fa";


export default function Button() {
  return (
    <a
      href={`https://wa.me/5585996876161?text=${encodeURIComponent("Olá, gostei do seu portfólio e gostaria de um orçamento!")}`}
      target="_blank"
      rel="noreferrer"
      className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl p-4 shadow-lg shadow-green-900/30 transition-all transform hover:scale-[1.02] active:scale-95 group relative overflow-hidden">
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
      <div className="flex items-center justify-center gap-3 relative z-10">
        <FaWhatsapp className="w-6 h-6 fill-white" />
        <div className="text-left">
          <p className="text-[15px] uppercase font-bold text-green-100 opacity-100">Solicitar Orçamento Real</p>
        </div>
      </div>
    </a>
  )
}