<script setup lang="ts">
import { business } from '~/data/business'
import { categories, products } from '~/data/products'

const featured = products.filter((p) => p.featured).slice(0, 4)

useSeoMeta({
  title: 'Deepcar Animal Supplies | Animal Feed & Pet Supplies Sheffield',
  description: business.tagline,
  ogTitle: business.name,
  ogDescription: business.tagline,
  ogImage: '/images/hero-farm.jpg',
})
</script>

<template>
  <div>
    <section class="hero">
      <img
        class="hero__image"
        src="/images/hero-farm.jpg"
        alt="Hay bales across a harvested field near rolling countryside"
        width="1920"
        height="1080"
      />
      <div class="hero__shade" aria-hidden="true" />
      <div class="container hero__content">
        <p class="hero__brand">{{ business.name }}</p>
        <h1>Feed and supplies for Sheffield farms, stables and pets.</h1>
        <p class="hero__lead">
          Browse products, build an order enquiry, then choose collection in Deepcar or request
          delivery — we confirm stock and arrangements with you.
        </p>
        <div class="hero__actions">
          <NuxtLink class="btn btn--light" to="/products">Browse products</NuxtLink>
          <NuxtLink class="btn btn--ghost-light" to="/contact">Visit & contact</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="section__eyebrow">What we supply</p>
        <h2 class="section__title">Categories for everyday farm and pet needs</h2>
        <p class="section__lead">
          From animal feed and equine products to hay, bedding, dairy hygiene and pet supplies.
        </p>
        <div class="category-grid">
          <CategoryCard v-for="category in categories" :key="category.slug" :category="category" />
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <p class="section__eyebrow">Popular lines</p>
        <h2 class="section__title">Start an order enquiry</h2>
        <p class="section__lead">
          Add items to your basket. There are no online payments — we confirm availability and the
          final order with you.
        </p>
        <div class="product-grid">
          <ProductCard v-for="product in featured" :key="product.slug" :product="product" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container visit">
        <div class="visit__copy">
          <p class="section__eyebrow">Find us</p>
          <h2 class="section__title">Deepcar, Sheffield</h2>
          <p class="section__lead">
            Collect from the shop or ask us about delivery when you submit your enquiry.
          </p>
          <ul class="visit__list">
            <li v-for="line in business.addressLines" :key="line">{{ line }}</li>
          </ul>
          <ul class="visit__list">
            <li v-for="row in business.hours" :key="row.day">
              <strong>{{ row.day }}</strong> — {{ row.time }}
            </li>
          </ul>
          <div class="visit__actions">
            <a class="btn" :href="`tel:${business.phone.replace(/\s/g, '')}`">Call {{ business.phone }}</a>
            <NuxtLink class="btn btn--ghost" to="/contact">Contact page</NuxtLink>
          </div>
        </div>
        <div class="visit__map">
          <iframe
            title="Map showing Deepcar, Sheffield"
            :src="business.mapEmbedUrl"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
          <a class="map-link" :href="business.mapLink" target="_blank" rel="noopener">
            Open larger map
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: min(92vh, 52rem);
  display: grid;
  align-items: end;
  color: #f4f7f3;
  overflow: hidden;
}

.hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: fade-in 900ms ease both;
}

.hero__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(12, 24, 20, 0.72) 0%, rgba(12, 24, 20, 0.42) 48%, rgba(12, 24, 20, 0.2) 100%),
    linear-gradient(180deg, rgba(12, 24, 20, 0.2), rgba(12, 24, 20, 0.55));
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-block: 5.5rem 4rem;
  max-width: 42rem;
  margin-left: max(1rem, calc((100% - var(--max)) / 2));
  margin-right: auto;
  animation: rise-in 700ms ease 120ms both;
}

.hero__brand {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  line-height: 0.95;
  margin-bottom: 1rem;
  max-width: 12ch;
}

.hero h1 {
  font-family: var(--font-body);
  font-size: clamp(1.15rem, 2.2vw, 1.45rem);
  font-weight: 600;
  letter-spacing: 0;
  max-width: 28ch;
}

.hero__lead {
  margin-top: 1rem;
  max-width: 36ch;
  color: rgba(244, 247, 243, 0.9);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn--ghost-light {
  background: transparent;
  color: #f4f7f3;
  border-color: rgba(244, 247, 243, 0.45);
}

.btn--ghost-light:hover {
  background: rgba(244, 247, 243, 0.1);
}

.category-grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  grid-template-columns: 1fr;
}

.product-grid {
  display: grid;
  gap: 1.15rem;
  margin-top: 2rem;
}

.section--soft {
  background: rgba(255, 255, 255, 0.35);
  border-block: 1px solid var(--line);
}

.visit {
  display: grid;
  gap: 2rem;
}

.visit__list {
  list-style: none;
  padding: 0;
  margin: 1.25rem 0 0;
  color: var(--ink-soft);
}

.visit__list strong {
  color: var(--ink);
}

.visit__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.visit__map {
  min-height: 22rem;
  background: #d7ddd4;
  border: 1px solid var(--line);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.visit__map iframe {
  width: 100%;
  flex: 1;
  min-height: 20rem;
  border: 0;
}

.map-link {
  padding: 0.7rem 1rem;
  background: #f7f9f5;
  text-decoration: none;
  font-weight: 600;
}

@media (min-width: 700px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 980px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .category-grid > :first-child {
    grid-column: span 2;
    min-height: 20rem;
  }

  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .visit {
    grid-template-columns: 1fr 1.1fr;
    align-items: stretch;
  }
}
</style>
