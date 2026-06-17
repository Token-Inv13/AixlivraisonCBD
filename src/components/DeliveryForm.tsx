import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Product } from '../data/products'
import { deliveryDayTypes, deliveryZones } from '../data/siteContent'

type DeliveryFormProps = {
  products: Product[]
  initialProductId: string
  initialFormatLabel: string
  whatsappBaseUrl: string
  emailAddress: string
}

type FormState = {
  firstName: string
  phone: string
  address: string
  neighborhood: string
  slot: string
  deliveryDayType: string
  deliveryZone: string
  deliveryUrgency: string
  productId: string
  formatLabel: string
  additionalProduct: string
  contactMethod: 'WhatsApp' | 'SMS' | 'Telegram'
  message: string
}

type DeliveryEstimate = {
  amount: number | null
  label: string
  exact: boolean
  detail: string
}

const defaultState: FormState = {
  firstName: '',
  phone: '',
  address: '',
  neighborhood: '',
  slot: 'Journée',
  deliveryDayType: 'Semaine',
  deliveryZone: 'Aix centre',
  deliveryUrgency: 'Standard',
  productId: '',
  formatLabel: '',
  additionalProduct: '',
  contactMethod: 'WhatsApp',
  message: '',
}

const deliveryPrices = {
  Semaine: {
    'Aix centre': { Journée: 6, Soirée: 10, Nuit: 15 },
    'Quartiers proches': { Journée: 8, Soirée: 12, Nuit: 18 },
  },
  'Week-end': {
    'Aix centre': { Journée: 8, Soirée: 13, Nuit: 20 },
    'Quartiers proches': { Journée: 10, Soirée: 15, Nuit: 23 },
  },
} as const

const urgentSupplement = 5

function formatEuro(value: number) {
  return `${value} €`
}

function getDeliveryEstimate(
  deliveryDayType: string,
  deliveryZone: string,
  slot: string,
  deliveryUrgency: string,
): DeliveryEstimate {
  if (deliveryZone === 'Hors Aix proche') {
    return {
      amount: null,
      label: 'Sur estimation',
      exact: false,
      detail: 'Zone hors Aix proche: tarif confirmé manuellement avant validation',
    }
  }

  const dayTable =
    deliveryPrices[deliveryDayType as keyof typeof deliveryPrices] ?? null
  const zoneTable = dayTable?.[deliveryZone as 'Aix centre' | 'Quartiers proches']
  const basePrice = zoneTable?.[slot as 'Journée' | 'Soirée' | 'Nuit'] ?? null

  if (basePrice == null) {
    return {
      amount: null,
      label: 'À confirmer',
      exact: false,
      detail: 'Sélection tarifaire incomplète',
    }
  }

  const total = basePrice + (deliveryUrgency === 'Urgente' ? urgentSupplement : 0)

  return {
    amount: total,
    label: formatEuro(total),
    exact: true,
    detail:
      deliveryUrgency === 'Urgente'
        ? `${formatEuro(basePrice)} + urgence ${formatEuro(urgentSupplement)}`
        : `${formatEuro(basePrice)}`,
  }
}

export function DeliveryForm({
  products,
  initialProductId,
  initialFormatLabel,
  whatsappBaseUrl,
  emailAddress,
}: DeliveryFormProps) {
  const [form, setForm] = useState<FormState>(() => ({
    ...defaultState,
    productId: initialProductId,
    formatLabel: initialFormatLabel,
  }))
  const [submittedMessage, setSubmittedMessage] = useState('')

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === form.productId) ?? null,
    [form.productId, products],
  )

  const availableFormats = selectedProduct?.formats ?? []
  const currentFormat = availableFormats.find(
    (item) => item.label === form.formatLabel,
  )

  const effectiveFormatLabel =
    availableFormats.find((item) => item.label === form.formatLabel)?.label ??
    availableFormats[0]?.label ??
    form.formatLabel

  const productPrice = currentFormat?.price ?? null
  const deliveryEstimate = getDeliveryEstimate(
    form.deliveryDayType,
    form.deliveryZone,
    form.slot,
    form.deliveryUrgency,
  )
  const totalEstimate =
    productPrice != null && deliveryEstimate.amount != null
      ? productPrice + deliveryEstimate.amount
      : null

  const productPriceLabel =
    productPrice != null ? formatEuro(productPrice) : 'À confirmer'
  const deliveryCostLabel = deliveryEstimate.label
  const totalEstimateLabel =
    totalEstimate != null ? formatEuro(totalEstimate) : 'À confirmer'

  const generateMessage = () => {
    const lines = [
      'Demande de livraison CBD',
      `Prénom: ${form.firstName || 'à compléter'}`,
      `Téléphone: ${form.phone || 'à compléter'}`,
      `Adresse: ${form.address || 'à compléter'}`,
      `Quartier: ${form.neighborhood || 'à compléter'}`,
      `Zone de livraison: ${form.deliveryZone}`,
      `Créneau souhaité: ${form.slot}`,
      `Type de créneau: ${form.deliveryDayType}`,
      `Livraison urgente: ${form.deliveryUrgency}`,
      `Produit souhaité: ${selectedProduct?.name || form.productId || 'à choisir'}`,
      `Format souhaité: ${currentFormat?.label || effectiveFormatLabel || 'à choisir'}`,
      `Produit supplémentaire: ${form.additionalProduct || 'aucun'}`,
      `Mode de contact préféré: ${form.contactMethod}`,
      `Message complémentaire: ${form.message || 'aucun'}`,
      `Prix produit: ${productPriceLabel}`,
      `Coût livraison: ${deliveryCostLabel}`,
      `Total estimé: ${totalEstimateLabel}`,
      '',
      'Note: disponibilité et prix final à confirmer manuellement avant validation.',
    ]

    return lines.join('\n')
  }

  const whatsappHref = `${whatsappBaseUrl}?text=${encodeURIComponent(generateMessage())}`
  const mailtoHref = `mailto:${emailAddress}?subject=${encodeURIComponent(
    'Demande de livraison CBD',
  )}&body=${encodeURIComponent(generateMessage())}`

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmittedMessage(
      'Demande enregistrée localement. Aucune commande automatique n’a été envoyée.',
    )
  }

  return (
    <section id="demander" className="border-b border-white/8 bg-[#081311]">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/55">
              Demander une livraison
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#f4efe1] sm:text-4xl">
              Préparer une demande, pas une commande automatique
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
              Le formulaire prépare un message de confirmation local avec les
              informations utiles. Le prix du produit, le coût de livraison et
              le total estimé s’adaptent aux sélections avant validation.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-[30px] border border-white/10 bg-white/6 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Prénom"
                  value={form.firstName}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, firstName: value }))
                  }
                />
                <Field
                  label="Téléphone"
                  value={form.phone}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, phone: value }))
                  }
                />
                <Field
                  label="Adresse de livraison"
                  value={form.address}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, address: value }))
                  }
                  fullWidth
                />
                <Field
                  label="Quartier"
                  value={form.neighborhood}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, neighborhood: value }))
                  }
                />
                <SelectField
                  label="Zone de livraison"
                  value={form.deliveryZone}
                  options={deliveryZones}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, deliveryZone: value }))
                  }
                />
                <SelectField
                  label="Créneau souhaité"
                  value={form.slot}
                  options={['Journée', 'Soirée', 'Nuit']}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, slot: value }))
                  }
                />
                <SelectField
                  label="Type de créneau"
                  value={form.deliveryDayType}
                  options={deliveryDayTypes}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, deliveryDayType: value }))
                  }
                />
                <SelectField
                  label="Livraison urgente"
                  value={form.deliveryUrgency}
                  options={['Standard', 'Urgente']}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, deliveryUrgency: value }))
                  }
                />
                <SelectField
                  label="Produit souhaité"
                  value={form.productId}
                  options={products.map((product) => ({
                    label: product.name,
                    value: product.id,
                  }))}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      productId: value,
                      formatLabel: '',
                    }))
                  }
                />
                <SelectField
                  label="Format souhaité"
                  value={effectiveFormatLabel}
                  options={availableFormats.map((item) => ({
                    label: `${item.label} - ${item.price} €`,
                    value: item.label,
                  }))}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, formatLabel: value }))
                  }
                />
                <Field
                  label="Produit supplémentaire"
                  value={form.additionalProduct}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      additionalProduct: value,
                    }))
                  }
                />
                <SelectField
                  label="Mode de contact préféré"
                  value={form.contactMethod}
                  options={['WhatsApp', 'SMS', 'Telegram']}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      contactMethod: value as FormState['contactMethod'],
                    }))
                  }
                />
                <TextareaField
                  label="Message complémentaire"
                  value={form.message}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, message: value }))
                  }
                  fullWidth
                />
              </div>

              <div className="mt-5 rounded-[28px] border border-white/8 bg-slate-950/25 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                  Estimation immédiate
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <PriceTile label="Prix produit" value={productPriceLabel} />
                  <PriceTile label="Coût livraison" value={deliveryCostLabel} />
                  <PriceTile label="Total estimé" value={totalEstimateLabel} />
                </div>
                <p className="mt-3 text-xs leading-5 text-white/52">
                  {deliveryEstimate.detail}. La disponibilité et le tarif final
                  restent confirmés avant validation.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#d4b06a] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e2bf7a]"
                >
                  Générer la confirmation locale
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-300/18 bg-emerald-300/10 px-5 py-3 text-sm font-medium text-emerald-50 transition hover:bg-emerald-300/15"
                >
                  Ouvrir WhatsApp
                </a>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Ouvrir un mail
                </a>
              </div>

              {submittedMessage ? (
                <div className="mt-5 rounded-2xl border border-emerald-300/18 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-50">
                  {submittedMessage}
                </div>
              ) : null}
            </form>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                Aperçu de la demande
              </p>
              <div className="mt-3 space-y-3 text-sm text-white/72">
                <Row label="Produit" value={selectedProduct?.name ?? 'À choisir'} />
                <Row
                  label="Format"
                  value={currentFormat?.label ?? effectiveFormatLabel ?? 'À confirmer'}
                />
                <Row label="Prix produit" value={productPriceLabel} />
                <Row label="Coût livraison" value={deliveryCostLabel} />
                <Row label="Total estimé" value={totalEstimateLabel} />
                <Row label="Zone" value={form.deliveryZone} />
                <Row label="Urgence" value={form.deliveryUrgency} />
                <Row label="Mode" value={form.contactMethod} />
                <Row label="Créneau" value={form.slot} />
                <Row label="Jour" value={form.deliveryDayType} />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,_rgba(18,41,32,0.95),_rgba(8,17,15,0.96))] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-100/55">
                Confirmation locale
              </p>
              <p className="mt-3 text-lg font-semibold text-[#f7f3e8]">
                Aucun envoi réel n’est effectué automatiquement.
              </p>
              <p className="mt-2 text-sm leading-6 text-white/68">
                Le site prépare un message prérempli pour WhatsApp et un mailto
                de simulation afin de présenter le flux au fournisseur
                potentiel.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                Récapitulatif auto-généré
              </p>
              <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded-2xl border border-white/8 bg-slate-950/35 p-4 text-xs leading-6 text-white/62">
                {generateMessage()}
              </pre>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function PriceTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#f7f3e8]">{value}</p>
    </div>
  )
}

type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  fullWidth?: boolean
}

function Field({ label, value, onChange, fullWidth }: FieldProps) {
  return (
    <label className={fullWidth ? 'sm:col-span-2' : ''}>
      <span className="mb-2 block text-sm text-white/68">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-[#f4efe1] outline-none transition placeholder:text-white/28 focus:border-emerald-300/30 focus:bg-slate-950/40"
      />
    </label>
  )
}

type SelectFieldProps = {
  label: string
  value: string
  options: Array<string | { label: string; value: string }>
  onChange: (value: string) => void
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label>
      <span className="mb-2 block text-sm text-white/68">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-[#f4efe1] outline-none transition focus:border-emerald-300/30 focus:bg-slate-950/40"
      >
        <option value="">Sélectionner</option>
        {options.map((option) => {
          const item =
            typeof option === 'string'
              ? { label: option, value: option }
              : option
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
    </label>
  )
}

type TextareaFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  fullWidth?: boolean
}

function TextareaField({ label, value, onChange, fullWidth }: TextareaFieldProps) {
  return (
    <label className={fullWidth ? 'sm:col-span-2' : ''}>
      <span className="mb-2 block text-sm text-white/68">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-[#f4efe1] outline-none transition placeholder:text-white/28 focus:border-emerald-300/30 focus:bg-slate-950/40"
      />
    </label>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-slate-950/25 px-4 py-3">
      <span className="text-white/48">{label}</span>
      <span className="text-right font-medium text-[#f7f3e8]">{value}</span>
    </div>
  )
}
