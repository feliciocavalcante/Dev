import { SiHtml5, SiCss3, SiJavascript, SiReact, SiMongodb } from "react-icons/si";

export default function Footer() {
    return(
        <div className="mt-6 border-t border-slate-800 pt-4">
          <div className="flex justify-center gap-6 text-slate-600 mb-3">
            <SiHtml5 className="w-5 h-5 hover:text-orange-500 transition-colors cursor-pointer" title="HTML5" />
            <SiCss3 className="w-5 h-5 hover:text-blue-500 transition-colors cursor-pointer" title="CSS3/Tailwind" />
            <SiJavascript className="w-5 h-5 hover:text-yellow-400 transition-colors cursor-pointer" title="JavaScript" />
            <SiReact className="w-5 h-5 hover:text-cyan-400 transition-colors cursor-pointer" title="React" />
            <SiMongodb className="w-5 h-5 hover:text-cyan-400 transition-colors cursor-pointer" title="React" />
          </div>
          <p className="text-slate-600 text-[12px]">© 2024 Felicio Cavalcante. Todos os direitos reservados.</p>
        </div>
    )
}