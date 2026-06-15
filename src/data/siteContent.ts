export const isDemoContact = true

export const navItems = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Produits', href: '#produits' },
  { label: 'Demande', href: '#demander' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Zone desservie', href: '#zone' },
  { label: 'Conditions', href: '#conditions' },
  { label: 'Contact', href: '#contact' },
]

export const deliverySlots = [
  { label: 'Journée', hours: '11h–19h' },
  { label: 'Soirée', hours: '19h–00h' },
  { label: 'Nuit', hours: '00h–03h' },
]

export const pricingRows = [
  { group: 'Aix centre', label: 'Journée', price: '6 €' },
  { group: 'Aix centre', label: 'Soirée', price: '10 €' },
  { group: 'Aix centre', label: 'Nuit', price: '15 €' },
  { group: 'Quartiers proches', label: 'Journée', price: '8 €' },
  { group: 'Quartiers proches', label: 'Soirée', price: '12 €' },
  { group: 'Quartiers proches', label: 'Nuit', price: '18 €' },
  { group: 'Hors Aix proche', label: 'Estimation', price: 'sur estimation' },
  { group: 'Suppléments', label: 'Livraison urgente', price: '+5 €' },
  { group: 'Suppléments', label: 'Commande minimum indicative', price: '20 €' },
]

export const conditions = [
  'Service réservé aux personnes majeures.',
  'Une pièce d’identité peut être demandée à la livraison.',
  'Seuls les produits CBD conformes à la réglementation française peuvent être livrés.',
  'Aucune commande n’est validée automatiquement.',
  'Les prix produits sont indicatifs.',
  'La disponibilité est confirmée manuellement auprès de la boutique partenaire envisagée.',
  'Les frais de livraison sont séparés du prix des produits.',
  'Aix livraison CBD est un service indépendant.',
  'Aucun produit non conforme ou stupéfiant ne sera accepté.',
  'Aucune allégation médicale ou thérapeutique ne doit être faite.',
]

export const serviceAreas = [
  'Aix-centre',
  'Quartiers proches sur validation',
  'Hors Aix proche sur estimation',
]

export const contactLabels = {
  whatsapp: 'numéro à définir',
  email: 'contact à définir',
}
