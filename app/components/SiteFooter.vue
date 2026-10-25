<script setup lang="ts">
import { business } from '~/data/business'
</script>

<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div>
        <p class="footer__brand">{{ business.name }}</p>
        <p class="footer__copy">
          Animal feed, equine and livestock products, hay and straw, bedding, dairy hygiene and pet
          supplies in {{ business.location }}.
        </p>
      </div>

      <div>
        <p class="footer__label">Visit</p>
        <p v-for="line in business.addressLines.slice(1)" :key="line">{{ line }}</p>
        <p><a :href="`tel:${business.phone.replace(/\s/g, '')}`">{{ business.phone }}</a></p>
        <p><a :href="`mailto:${business.email}`">{{ business.email }}</a></p>
      </div>

      <div>
        <p class="footer__label">Explore</p>
        <p><NuxtLink to="/products">Products</NuxtLink></p>
        <p><NuxtLink to="/basket">Order enquiry</NuxtLink></p>
        <p><NuxtLink to="/contact">Contact</NuxtLink></p>
        <p><NuxtLink to="/credits">Photo credits</NuxtLink></p>
      </div>
    </div>
    <div class="container footer__base">
      <p>© {{ new Date().getFullYear() }} {{ business.name }}. Prices shown for enquiry only — no online payments.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 3rem;
  background: var(--forest);
  color: #e7eee9;
  padding: 3rem 0 1.5rem;
}

.footer__grid {
  display: grid;
  gap: 2rem;
}

.footer__brand {
  font-family: var(--font-display);
  font-size: 1.8rem;
  margin-bottom: 0.6rem;
}

.footer__copy,
.footer p {
  color: rgba(231, 238, 233, 0.86);
}

.footer__label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--straw-soft);
  margin-bottom: 0.7rem;
}

.footer a {
  color: #f4f7f3;
}

.footer__base {
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(244, 247, 243, 0.16);
  font-size: 0.9rem;
}

@media (min-width: 800px) {
  .footer__grid {
    grid-template-columns: 1.4fr 1fr 1fr;
  }
}
</style>
