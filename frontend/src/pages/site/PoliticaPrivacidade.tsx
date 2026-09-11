import { Link } from 'react-router-dom';
import Footer from '../../components/site/Footer';
import Seo from '../../components/site/Seo';

export default function PoliticaPrivacidade() {
  const h2 = 'mt-9 font-display text-[clamp(22px,3.5vw,30px)] uppercase leading-tight text-azul';
  const p = 'mt-3 leading-relaxed text-[15.5px] text-tinta/85';
  const li = 'leading-relaxed text-[15.5px] text-tinta/85';

  return (
    <div className="min-h-dvh bg-creme">
      <Seo title="Política de Privacidade — Grupo Zero 14" description="Saiba como o Grupo Zero 14 trata seus dados pessoais neste site, de acordo com a LGPD." path="/politica-de-privacidade" />

      {/* topbar simples */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b-[3px] border-tinta bg-[#faf8f2] px-6 py-3.5">
        <Link to="/" aria-label="Grupo Zero 14 - início"><img src="/assets/logo-preta-nav.png" alt="Grupo Zero 14" className="h-9 w-auto md:h-11" /></Link>
        <Link to="/" className="inline-flex items-center gap-2 rounded-[12px_18px_12px_16px] border-2 border-tinta px-4 py-2 text-sm font-semibold text-tinta transition hover:-translate-y-0.5 hover:bg-amarelo">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Voltar ao site
        </Link>
      </header>

      <main className="mx-auto max-w-[820px] px-6 pb-24 pt-12">
        <span className="text-xs font-semibold uppercase tracking-[3px] text-vermelho">Grupo Zero 14</span>
        <h1 className="mt-1.5 font-display text-[clamp(34px,7vw,60px)] uppercase leading-[.95] text-tinta">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-tinta/60">Última atualização: 10 de setembro de 2026</p>

        <p className={p}>
          Esta Política de Privacidade explica como o site do <strong>Grupo Zero 14</strong> (“nós”) coleta,
          usa e protege as informações dos visitantes (“você”), em conformidade com a
          <strong> Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)</strong>.
        </p>

        <h2 className={h2}>1. Quais dados coletamos</h2>
        <p className={p}>Coletamos apenas o mínimo necessário para o funcionamento do site:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li className={li}><strong>Recados/feedbacks:</strong> quando você envia um recado, coletamos o <strong>nome</strong> e a <strong>mensagem</strong> que você escreve. Esses recados podem ser exibidos publicamente no site após aprovação.</li>
          <li className={li}><strong>Contato:</strong> se você nos chamar por WhatsApp, e-mail ou redes sociais, os dados que você compartilhar nessas conversas.</li>
          <li className={li}><strong>Dados técnicos:</strong> informações básicas de navegação geradas automaticamente pelos serviços de hospedagem (como endereço IP e tipo de navegador), usadas para segurança e bom funcionamento.</li>
        </ul>
        <p className={p}>Não solicitamos dados sensíveis e não é necessário criar conta para navegar no site.</p>

        <h2 className={h2}>2. Como usamos seus dados</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li className={li}>Exibir os recados aprovados no mural do site;</li>
          <li className={li}>Responder ao seu contato e organizar shows/contratações;</li>
          <li className={li}>Manter o site seguro, estável e funcionando.</li>
        </ul>

        <h2 className={h2}>3. Serviços de terceiros</h2>
        <p className={p}>Para funcionar, o site utiliza serviços de terceiros que podem processar dados em seus próprios ambientes:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li className={li}><strong>Vercel</strong> e <strong>Render</strong> (hospedagem do site e da aplicação);</li>
          <li className={li}><strong>Neon</strong> (banco de dados);</li>
          <li className={li}><strong>Cloudinary</strong> (armazenamento das imagens);</li>
          <li className={li}><strong>YouTube</strong> (player de vídeos), <strong>Instagram</strong>, <strong>Spotify</strong> e <strong>WhatsApp</strong> (links e conteúdos incorporados) — ao interagir, você fica sujeito às políticas de privacidade dessas plataformas.</li>
        </ul>

        <h2 className={h2}>4. Cookies e Google Analytics</h2>
        <p className={p}>
          Usamos o <strong>Google Analytics (GA4)</strong> para entender, de forma agregada e anônima, como o site é usado
          (páginas mais visitadas, dispositivos e origem do tráfego), o que nos ajuda a melhorá-lo. O Google Analytics
          <strong> só é ativado após o seu consentimento</strong> no banner de cookies exibido ao entrar no site — você pode
          <strong> Aceitar</strong> ou <strong>Recusar</strong>. Se recusar, nenhum cookie de análise é criado.
        </p>
        <p className={p}>
          Também usamos o armazenamento local do navegador para lembrar sua escolha de cookies e para o funcionamento do
          <strong> painel administrativo</strong> (login do administrador). Serviços incorporados, como o YouTube, podem
          definir seus próprios cookies ao serem reproduzidos. Para alterar sua escolha, basta limpar os dados do site no seu navegador.
        </p>

        <h2 className={h2}>5. Seus direitos (LGPD)</h2>
        <p className={p}>Você pode, a qualquer momento, solicitar:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li className={li}>Confirmar se tratamos seus dados e acessá-los;</li>
          <li className={li}>Corrigir dados incompletos ou desatualizados;</li>
          <li className={li}>Solicitar a <strong>exclusão</strong> de um recado ou de dados enviados;</li>
          <li className={li}>Revogar o consentimento.</li>
        </ul>

        <h2 className={h2}>6. Segurança</h2>
        <p className={p}>
          Adotamos medidas técnicas razoáveis para proteger os dados (conexões via HTTPS, senha de administrador com
          criptografia). Nenhum sistema é 100% infalível, mas trabalhamos para manter suas informações seguras.
        </p>

        <h2 className={h2}>7. Alterações nesta política</h2>
        <p className={p}>
          Podemos atualizar esta política periodicamente. A data da última atualização estará sempre indicada no topo desta página.
        </p>

        <h2 className={h2}>8. Contato</h2>
        <p className={p}>
          Para exercer seus direitos ou tirar dúvidas sobre privacidade, fale com a gente pela seção
          <Link to="/#contato" className="font-semibold text-azul hover:underline"> Contato</Link> do site ou pelo e-mail
          <a href="mailto:shows@grupozero14.com.br" className="font-semibold text-azul hover:underline"> shows@grupozero14.com.br</a>.
        </p>
      </main>

      <Footer />
    </div>
  );
}
