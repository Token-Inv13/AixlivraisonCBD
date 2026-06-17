import type { Product } from '../data/products'

type ProductCardProps = {
  product: Product
  onRequestProduct: (productId: string, formatLabel: string) => void
}

export function ProductCard({ product, onRequestProduct }: ProductCardProps) {
  const cheapest = Math.min(...product.formats.map((item) => item.price))

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:border-emerald-300/20">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-24 w-24 shrink-0 flex-col justify-between rounded-[22px] border border-white/10 bg-[linear-gradient(160deg,_rgba(20,53,40,0.95),_rgba(12,19,17,0.95))] p-3">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-emerald-100/50">
              <span>Produit</span>
              <span className="h-2 w-2 rounded-full bg-[#d4b06a]" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-[#f7f3e8]">
                {product.imageLabel}
              </div>
              <div className="text-[11px] leading-4 text-white/50">
                Placeholder visuel propre
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/55">
              {product.category}
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#f4efe1]">
              {product.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/68">
              {product.summary}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-slate-950/25 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/42">
              Prix produit
            </p>
            <p className="mt-1 text-sm font-medium text-white/84">
              À partir de {cheapest} €
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-slate-950/25 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/42">
              Coût livraison
            </p>
            <p className="mt-1 text-sm font-medium text-white/84">
              Selon zone et créneau
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-white/8 bg-slate-950/20 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-white/42">
            Gamme
          </p>
          <p className="mt-1 text-sm font-medium text-white/84">
            {product.gamme}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.formats.map((format) => (
            <span
              key={format.label}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/76"
            >
              {format.label} {format.price} €
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onRequestProduct(product.id, product.formats[0].label)}
            className="inline-flex items-center justify-center rounded-full bg-[#d4b06a] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e2bf7a]"
          >
            Demander ce produit
          </button>
          <p className="text-xs leading-5 text-white/52">{product.note}</p>
        </div>
      </div>
    </article>
  )
}
