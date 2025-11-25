import { Check } from "lucide-react";

export default function Perfil() {
    return (
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-right">
            <h2 className="text-lg font-bold text-white">Felicio Cavalcante</h2>
            <p className="text-xs text-slate-400 ">Full Stack Developer</p>
          </div>
          <div className="h-12 w-[1px] bg-slate-700"></div>
          <div className="text-left text-sm text-slate-3000 space-y-1 ">
            <p className="flex items-center"><Check className="w-3 h-3 text-green-400 mr-1" /> Sites Rápidos</p>
            <p className="flex items-center"><Check className="w-3 h-3 text-green-400 mr-1" /> Design Moderno</p>
            <p className="flex items-center"><Check className="w-3 h-3 text-green-400 mr-1" /> Suporte VIP</p>
          </div>
        </div>
    );
}