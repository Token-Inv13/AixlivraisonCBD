export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#07100e] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/55">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#f4efe1]">
            Présenter le projet à un fournisseur potentiel
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66">
            Cette maquette reste volontairement prudente: elle présente un
            service indépendant, des produits disponibles sur demande et une
            confirmation manuelle avant validation.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="https://wa.me/33600000000?text=Bonjour%2C%20je%20souhaite%20une%20livraison%20CBD%20%C3%A0%20Aix-en-Provence."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#d4b06a] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e2bf7a]"
          >
            Contacter par WhatsApp
          </a>
          <a
            href="mailto:contact@aixlivraisoncbd.fr"
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Envoyer un mail
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-4 border-t border-white/8 pt-6 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
        <span>Aix livraison CBD - maquette de présentation</span>
        <span>Service indépendant, sans paiement en ligne, sans commande automatique</span>
      </div>
    </footer>
  )
}

