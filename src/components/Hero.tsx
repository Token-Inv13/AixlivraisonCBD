type HeroProps = {
  onRequestDelivery: () => void
  onSeeProducts: () => void
  whatsappHref: string
}

export function Hero({ onRequestDelivery, onSeeProducts, whatsappHref }: HeroProps) {
  return (
    <section id="accueil" className="relative overflow-hidden border-b border-white/8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,105,63,0.32),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(212,176,106,0.16),_transparent_26%),linear-gradient(180deg,_#07100e_0%,_#081412_100%)]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-84px)] w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/55">
            Service local indépendant
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#f4efe1] sm:text-5xl lg:text-7xl">
            Livraison CBD à Aix-en-Provence
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Service local indépendant de livraison CBD, disponible en journée,
            soirée et nuit. Les tarifs varient selon la zone, le créneau et le
            jour de livraison.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onRequestDelivery}
              className="inline-flex items-center justify-center rounded-full bg-[#d4b06a] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e2bf7a]"
            >
              Demander une livraison
            </button>
            <button
              type="button"
              onClick={onSeeProducts}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Voir les produits disponibles
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-emerald-300/18 bg-emerald-300/10 px-6 py-3 text-sm font-medium text-emerald-50 transition hover:bg-emerald-300/15"
            >
              Contacter par WhatsApp
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/8 bg-[#0d1715]/88 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Créneaux
              </p>
              <p className="mt-2 text-lg font-semibold text-[#f4efe1]">
                Journée, soirée, nuit
              </p>
              <p className="mt-1 text-sm text-white/58">
                Les tarifs varient selon la semaine ou le week-end.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-[#0d1715]/88 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Livraison
              </p>
              <p className="mt-2 text-lg font-semibold text-[#f4efe1]">
                À l’adresse indiquée
              </p>
              <p className="mt-1 text-sm text-white/58">
                Validation finale avant toute prise en charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
