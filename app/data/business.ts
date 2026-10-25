export const business = {
  name: 'Deepcar Animal Supplies',
  shortName: 'Deepcar',
  tagline: 'Feed, bedding and supplies for farms, stables and pets across Sheffield.',
  location: 'Deepcar, Sheffield',
  addressLines: [
    'Deepcar Animal Supplies',
    'Manchester Road',
    'Deepcar, Sheffield',
    'S36 2UA',
  ],
  phone: '0114 000 0000',
  email: 'orders@deepcaranimalsupplies.co.uk',
  hours: [
    { day: 'Monday – Friday', time: '8:00am – 5:30pm' },
    { day: 'Saturday', time: '8:00am – 4:00pm' },
    { day: 'Sunday', time: 'Closed' },
  ],
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=-1.58%2C53.45%2C-1.54%2C53.48&layer=mapnik&marker=53.465%2C-1.56',
  mapLink: 'https://www.openstreetmap.org/?mlat=53.465&mlon=-1.56#map=14/53.465/-1.56',
  seoKeywords: [
    'animal feed Sheffield',
    'horse supplies Deepcar',
    'livestock feed Sheffield',
    'pet supplies Sheffield',
    'hay and straw Sheffield',
  ],
} as const
