export type Category = {
  slug: string
  name: string
  description: string
  image: string
  imageAlt: string
}

export type Product = {
  slug: string
  category: string
  name: string
  description: string
  price: number
  unit: string
  image: string
  imageAlt: string
  featured?: boolean
}

export const categories: Category[] = [
  {
    slug: 'animal-feed',
    name: 'Animal Feed',
    description: 'Bags and bulk options for horses, livestock, poultry and smallholders.',
    image: '/images/category-feed.jpg',
    imageAlt: 'Sacks of grain stacked in a warehouse',
  },
  {
    slug: 'equine',
    name: 'Equine',
    description: 'Everyday horse and pony feed, plus stable essentials.',
    image: '/images/category-equine.jpg',
    imageAlt: 'Horses grazing in a green paddock',
  },
  {
    slug: 'livestock',
    name: 'Livestock',
    description: 'Practical feed and supplies for cattle, sheep and farm stock.',
    image: '/images/category-livestock.jpg',
    imageAlt: 'Sheep flock on a farm pasture',
  },
  {
    slug: 'hay-straw',
    name: 'Hay & Straw',
    description: 'Quality hay and straw for feeding and bedding.',
    image: '/images/category-hay.jpg',
    imageAlt: 'Large stack of straw bales on a farm',
  },
  {
    slug: 'bedding',
    name: 'Bedding & Shavings',
    description: 'Clean wood shavings and bedding for stables and kennels.',
    image: '/images/category-bedding.jpg',
    imageAlt: 'Pile of wood chips and shavings',
  },
  {
    slug: 'dairy-hygiene',
    name: 'Dairy Hygiene',
    description: 'Hygiene products for dairy routines and clean milk production.',
    image: '/images/category-dairy.jpg',
    imageAlt: 'Dairy milking parlour equipment',
  },
  {
    slug: 'pets',
    name: 'Pet Supplies',
    description: 'Food and everyday essentials for dogs, cats and small pets.',
    image: '/images/category-pets.jpg',
    imageAlt: 'Pet shop window with cat and dog products',
  },
]

export const products: Product[] = [
  {
    slug: 'horse-and-pony-nuts',
    category: 'equine',
    name: 'Horse & Pony Nuts',
    description: 'A balanced everyday nut for horses and ponies in light to medium work.',
    price: 14.5,
    unit: '20kg bag',
    image: '/images/product-horse-nuts.jpg',
    imageAlt: 'Horse eating from a feed bucket in a paddock',
    featured: true,
  },
  {
    slug: 'layers-pellets',
    category: 'animal-feed',
    name: 'Layers Pellets',
    description: 'Complete pellet feed to support healthy laying birds.',
    price: 12.95,
    unit: '20kg bag',
    image: '/images/product-layers-pellets.jpg',
    imageAlt: 'Free-range chickens on a farm',
    featured: true,
  },
  {
    slug: 'sheep-nuts',
    category: 'livestock',
    name: 'Sheep Nuts',
    description: 'Nutritious sheep feed suitable for maintenance and general flock use.',
    price: 13.75,
    unit: '20kg bag',
    image: '/images/product-sheep-nuts.jpg',
    imageAlt: 'Flock of sheep in pasture',
    featured: true,
  },
  {
    slug: 'meadow-hay-bale',
    category: 'hay-straw',
    name: 'Meadow Hay Bale',
    description: 'Traditional meadow hay — ideal for horses, smallholders and pets.',
    price: 8.5,
    unit: 'bale',
    image: '/images/hero-farm.jpg',
    imageAlt: 'Hay bales in a harvested field',
    featured: true,
  },
  {
    slug: 'wheat-straw-bale',
    category: 'hay-straw',
    name: 'Wheat Straw Bale',
    description: 'Dry wheat straw for bedding yards, stables and livestock housing.',
    price: 5.5,
    unit: 'bale',
    image: '/images/category-hay.jpg',
    imageAlt: 'Stack of straw bales',
  },
  {
    slug: 'pine-shavings',
    category: 'bedding',
    name: 'Pine Shavings',
    description: 'Absorbent wood shavings for comfortable, clean bedding.',
    price: 9.95,
    unit: 'bale',
    image: '/images/product-shavings.jpg',
    imageAlt: 'Wood chips and shavings',
    featured: true,
  },
  {
    slug: 'dairy-acid-cleaner',
    category: 'dairy-hygiene',
    name: 'Dairy Acid Cleaner',
    description: 'Acid cleaner for milking equipment and dairy hygiene routines.',
    price: 18.0,
    unit: '5L',
    image: '/images/category-dairy.jpg',
    imageAlt: 'Dairy milking equipment',
  },
  {
    slug: 'complete-dog-food',
    category: 'pets',
    name: 'Complete Adult Dog Food',
    description: 'Everyday complete dry food for adult dogs.',
    price: 16.5,
    unit: '12kg bag',
    image: '/images/product-dog-complete.jpg',
    imageAlt: 'Happy dog outdoors',
    featured: true,
  },
  {
    slug: 'clumping-cat-litter',
    category: 'pets',
    name: 'Clumping Cat Litter',
    description: 'Low-dust clumping litter for everyday cat care.',
    price: 7.95,
    unit: '10L',
    image: '/images/product-cat-litter.jpg',
    imageAlt: 'Cat resting indoors',
  },
  {
    slug: 'cattle-rearing-nuts',
    category: 'livestock',
    name: 'Cattle Rearing Nuts',
    description: 'Energy-rich nuts to support growing cattle.',
    price: 15.25,
    unit: '25kg bag',
    image: '/images/category-livestock.jpg',
    imageAlt: 'Livestock on pasture',
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getProduct(categorySlug: string, productSlug: string) {
  return products.find((p) => p.category === categorySlug && p.slug === productSlug)
}

export function productsInCategory(categorySlug: string) {
  return products.filter((p) => p.category === categorySlug)
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value)
}
