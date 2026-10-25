// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      { name: 'Instrument Serif', provider: 'google', weights: [400] },
      { name: 'Figtree', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en-GB' },
      title: 'Deepcar Animal Supplies | Animal Feed & Pet Supplies Sheffield',
      meta: [
        {
          name: 'description',
          content:
            'Deepcar Animal Supplies in Sheffield — animal feed, equine and livestock products, hay and straw, bedding, dairy hygiene and pet supplies. Order enquiry with collection or delivery.',
        },
        { name: 'theme-color', content: '#1B3D32' },
        { property: 'og:site_name', content: 'Deepcar Animal Supplies' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_GB' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  runtimeConfig: {
    enquiryEmailTo: process.env.NUXT_ENQUIRY_EMAIL_TO || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://deepcaranimalsupplies.co.uk',
    },
  },
})
