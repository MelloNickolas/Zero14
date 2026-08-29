export default function Footer() {
  return (
    <footer className="textura-giz relative overflow-hidden bg-azul px-6 py-6 text-white">
      <div className="relative z-[1] mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-6">
        <div className="text-right text-[13px] leading-snug text-white/90">
          <strong className="block font-display text-base text-white">© 2026 Grupo Zero 14</strong>
          Todos os direitos reservados
        </div>
        <div className="h-[42px] w-0.5 bg-white/35" aria-hidden="true" />
        <div className="flex items-center gap-3">
          <img src="/assets/nebula-web.png" alt="Nebula" className="h-12 w-auto" />
          <div className="text-[13px] leading-snug text-white/90">
            Desenvolvido por
            <strong className="block font-display text-lg text-white">Nebula</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
