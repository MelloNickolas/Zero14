export default function Footer() {
  return (
    <footer className="textura-giz relative overflow-hidden bg-azul px-6 py-6 text-white">
      <div className="relative z-[1] mx-auto flex max-w-[1240px] flex-nowrap items-center justify-center gap-6 max-[560px]:gap-3.5">
        <div className="text-right text-[13px] leading-snug text-white/90 max-[560px]:text-[11px]">
          <strong className="block font-display text-base text-white max-[560px]:text-[13px]">© 2026 Grupo Zero 14</strong>
          Todos os direitos reservados
        </div>
        <div className="h-[42px] w-0.5 shrink-0 bg-white/35 max-[560px]:h-[34px]" aria-hidden="true" />
        <div className="flex items-center gap-3">
          <img src="/assets/nebula-web.png" alt="Nebula" className="h-12 w-auto shrink-0 max-[560px]:h-[38px]" />
          <div className="text-[13px] leading-snug text-white/90 max-[560px]:text-[11px]">
            Desenvolvido por
            <strong className="block font-display text-lg text-white max-[560px]:text-[13px]">Nebula</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
