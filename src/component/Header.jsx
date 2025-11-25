export default function Header() {
    return(
        <div className="mb-6">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-300 text-[10px] md:text-xs font-bold tracking-wider mb-3 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            DESENVOLVIMENTO WEB PREMIUM
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2">
            Eleve o nível do <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-glow ">
              Seu Negócio
            </span>
          </h1>
        </div>
    );
}