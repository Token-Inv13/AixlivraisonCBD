import { deliverySlots, pricingRows } from '../data/siteContent'

export function PricingTable() {
  return (
    <section
      id="tarifs"
      className="border-b border-white/8 bg-[linear-gradient(180deg,_rgba(5,10,9,0.96),_rgba(8,18,16,0.98))]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/55">
              Tarifs
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#f4efe1] sm:text-4xl">
              Frais de livraison séparés du prix des produits
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/68">
              Les frais de livraison sont séparés du prix des produits. Le
              tarif final est confirmé avant validation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {deliverySlots.map((slot) => (
                <div
                  key={slot.label}
                  className="rounded-[24px] border border-white/8 bg-white/6 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-white/42">
                    Créneau
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[#f7f3e8]">
                    {slot.label}
                  </p>
                  <p className="mt-1 text-sm text-white/60">{slot.hours}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/6">
            <div className="grid grid-cols-[1.15fr_0.7fr_0.65fr] border-b border-white/8 px-5 py-4 text-sm text-white/58">
              <span>Zone</span>
              <span>Créneau</span>
              <span>Prix</span>
            </div>
            <div className="divide-y divide-white/8">
              {pricingRows.map((row) => (
                <div
                  key={`${row.group}-${row.label}`}
                  className="grid grid-cols-[1.15fr_0.7fr_0.65fr] items-center gap-4 px-5 py-4"
                >
                  <span className="text-sm text-white/78">{row.group}</span>
                  <span className="text-sm text-white/68">{row.label}</span>
                  <span className="text-sm font-semibold text-[#f7f3e8]">
                    {row.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
