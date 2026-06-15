export type ProductFormat = {
  label: string
  price: number
}

export type Product = {
  id: string
  name: string
  category: string
  gamme: string
  summary: string
  formats: ProductFormat[]
  note: string
  imageLabel: string
}

export const products: Product[] = [
  {
    id: 'lemon-larry-og',
    name: 'Lemon Larry OG',
    category: 'Fleur CBD premium',
    gamme: 'Californienne',
    summary:
      'Produit premium positionné sur une qualité supérieure. Disponibilité à confirmer.',
    formats: [
      { label: '2g', price: 16 },
      { label: '5g', price: 40 },
      { label: '10g', price: 80 },
      { label: '25g', price: 175 },
    ],
    note: 'Disponibilité et prix final confirmés avant validation',
    imageLabel: 'Fleur premium',
  },
  {
    id: 'king-2-small-bud',
    name: 'King #2 Small Bud',
    category: 'Fleur CBD',
    gamme: 'Strong',
    summary:
      'Produit accessible avec bon rapport quantité/prix. Produit puissant, déconseillé aux débutants.',
    formats: [
      { label: '2g', price: 12 },
      { label: '5g', price: 30 },
      { label: '10g', price: 60 },
      { label: '25g', price: 125 },
    ],
    note: 'Disponibilité et prix final confirmés avant validation',
    imageLabel: 'Fleur strong',
  },
  {
    id: 'king-4-frozen',
    name: 'King #4 Frozen',
    category: 'Résine CBD / premium',
    gamme: 'Strong',
    summary:
      'Produit premium au profil plus intense. Produit puissant, déconseillé aux débutants.',
    formats: [
      { label: '2g', price: 20 },
      { label: '5g', price: 50 },
      { label: '10g', price: 100 },
      { label: '25g', price: 225 },
    ],
    note: 'Disponibilité et prix final confirmés avant validation',
    imageLabel: 'Résine premium',
  },
  {
    id: 'ice-o-lator',
    name: 'Ice O Lator',
    category: 'Résine CBD',
    gamme: 'Soft',
    summary:
      'Résine plus douce et accessible, adaptée à une demande plus légère.',
    formats: [
      { label: '2g', price: 10 },
      { label: '5g', price: 25 },
      { label: '10g', price: 50 },
      { label: '25g', price: 125 },
    ],
    note: 'Disponibilité et prix final confirmés avant validation',
    imageLabel: 'Résine soft',
  },
  {
    id: 'aimant-raw',
    name: 'Aimant RAW',
    category: 'Accessoire',
    gamme: 'Accessoire',
    summary:
      'Accessoire simple pouvant être ajouté à une demande de livraison.',
    formats: [{ label: '1 unité', price: 4 }],
    note: 'Disponibilité et prix final confirmés avant validation',
    imageLabel: 'Accessoire',
  },
]

