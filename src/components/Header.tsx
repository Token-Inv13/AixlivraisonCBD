import { navItems } from '../data/siteContent'

type HeaderProps = {
  whatsappHref: string
}

export function Header({ whatsappHref }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#07100e]/82 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#accueil" className="flex items-center gap-3 text-[#f4efe1]">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/18 bg-emerald-300/10 text-sm font-semibold tracking-[0.18em] text-emerald-100">
            A
          </span>
          <span>
            <span className="block text-sm uppercase tracking-[0.24em] text-emerald-100/60">
              Aix livraison CBD
            </span>
            <span className="block text-sm text-white/56">
              Service local indépendant
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-2 xl:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-white/68 transition hover:bg-white/6 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#demander"
            className="hidden rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 sm:inline-flex"
          >
            Demander une livraison
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#d4b06a] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#e2bf7a]"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8 xl:hidden">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  )
}

