import { useRef, useState } from 'react'
import { AgeGate } from './components/AgeGate'
import { DeliveryForm } from './components/DeliveryForm'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PricingTable } from './components/PricingTable'
import { ProductCard } from './components/ProductCard'
import { conditions, isDemoContact, serviceAreas } from './data/siteContent'
import { products } from './data/products'

const whatsappBaseUrl = 'https://wa.me/0000000000'
const emailAddress = 'contact@exemple.local'

function App() {
  const productsRef = useRef<HTMLElement | null>(null)
  const requestRef = useRef<HTMLDivElement | null>(null)
  const [selectedProductId, setSelectedProductId] = useState('')
  const [selectedFormatLabel, setSelectedFormatLabel] = useState('')

  const scrollTo = (element: HTMLElement | null) => {
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleRequest = (productId: string, formatLabel: string) => {
    setSelectedProductId(productId)
    setSelectedFormatLabel(formatLabel)
    scrollTo(requestRef.current)
  }

  return (
    <AgeGate>
      <div className="min-h-screen bg-[#07100e] text-[#f4efe1]">
        <Header
          whatsappHref={`${whatsappBaseUrl}?text=${encodeURIComponent(
            'Bonjour, je souhaite en savoir plus sur Aix livraison CBD.',
          )}`}
        />
        <main>
          <Hero
            onRequestDelivery={() => scrollTo(requestRef.current)}
            onSeeProducts={() => scrollTo(productsRef.current)}
            whatsappHref={`${whatsappBaseUrl}?text=${encodeURIComponent(
              'Bonjour, je souhaite une livraison CBD à Aix-en-Provence.',
            )}`}
          />

          <section className="border-b border-white/8 bg-[#081311]">
            <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/55">
                    Comment ça fonctionne
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#f4efe1] sm:text-4xl">
                    Un parcours simple, puis une confirmation humaine
                  </h2>
                </div>

                <div className="grid gap-4">
                  {[
                    'Le client envoie une demande',
                    'La disponibilité est vérifiée auprès de la boutique partenaire',
                    'Le tarif final et le créneau sont confirmés',
                    'Les produits sont récupérés',
                    'La livraison est effectuée à l’adresse indiquée',
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex gap-4 rounded-[26px] border border-white/10 bg-white/6 p-5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d4b06a]/20 bg-[#d4b06a]/10 text-sm font-semibold text-[#e7c88c]">
                        {index + 1}
                      </div>
                      <p className="pt-2 text-base text-white/76">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="produits" ref={productsRef} className="bg-[#081311]">
            <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/55">
                    Produits disponibles
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#f4efe1] sm:text-4xl">
                    Cartes produit avec disponibilité confirmée avant validation
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-white/64">
                  Chaque carte affiche une base de prix, les formats disponibles
                  et un bouton de demande directe. Les produits et tarifs
                  restent indicatifs avant confirmation.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onRequestProduct={handleRequest}
                  />
                ))}
              </div>
            </div>
          </section>

          <PricingTable />

          <section id="zone" className="border-b border-white/8 bg-[#081311]">
            <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/55">
                    Zone desservie
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#f4efe1] sm:text-4xl">
                    Couverture locale à Aix-en-Provence et alentours proches
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/68">
                    Le périmètre final est confirmé selon le quartier, le
                    créneau et la disponibilité du moment.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,_rgba(14,32,25,0.95),_rgba(7,14,12,0.96))] p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-white/8 bg-slate-950/25 p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/42">
                        Coeur de zone
                      </p>
                      <p className="mt-2 text-lg font-semibold text-[#f7f3e8]">
                        Aix centre
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        Tarif standard selon créneau.
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-white/8 bg-slate-950/25 p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/42">
                        Proche
                      </p>
                      <p className="mt-2 text-lg font-semibold text-[#f7f3e8]">
                        Quartiers proches
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        Confirmation manuelle avant départ.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-[24px] border border-[#d4b06a]/14 bg-[#d4b06a]/10 p-5">
                    <p className="text-sm text-[#f2d8a3]">
                      Hors Aix proche: devis sur estimation. Livraison urgente:
                      supplément +5 €.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="conditions" className="border-b border-white/8 bg-[#07100e]">
            <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/55">
                    Conditions
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#f4efe1] sm:text-4xl">
                    Des règles claires pour rester prudent et conforme
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {conditions.map((condition) => (
                    <div
                      key={condition}
                      className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-4 text-sm leading-6 text-white/74"
                    >
                      {condition}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-white/8 bg-[#081311]">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/55">
                  Projet de partenariat local
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#f4efe1] sm:text-3xl">
                  Présentation partenaire
                </h2>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-white/68">
                  Cette maquette présente un concept de service indépendant de
                  livraison locale. L’objectif est de tester la demande à
                  Aix-en-Provence avec une sélection limitée de produits, sans
                  imposer de gestion logistique complexe à la boutique
                  partenaire.
                </p>
                <p className="mt-4 text-sm text-emerald-100/60">
                  Coordonnées de maquette: {isDemoContact ? 'actives en mode démonstration' : 'à confirmer'}
                </p>
              </div>
            </div>
          </section>

          <div ref={requestRef}>
            <DeliveryForm
              key={`${selectedProductId}-${selectedFormatLabel}`}
              products={products}
              initialProductId={selectedProductId}
              initialFormatLabel={selectedFormatLabel}
              whatsappBaseUrl={whatsappBaseUrl}
              emailAddress={emailAddress}
            />
          </div>
        </main>
        <Footer />
      </div>
    </AgeGate>
  )
}

export default App
