<script setup lang="ts">
import { categories, products } from '~/data/products'

useSeoMeta({
  title: 'Products | Deepcar Animal Supplies Sheffield',
  description:
    'Browse animal feed, equine and livestock products, hay and straw, bedding, dairy hygiene and pet supplies in Sheffield.',
})
</script>

<template>
  <div class="section">
    <div class="container">
      <p class="section__eyebrow">Catalogue</p>
      <h1 class="section__title">Products & categories</h1>
      <p class="section__lead">
        Explore our ranges, then add items to an order enquiry for collection or delivery.
      </p>

      <div class="category-grid">
        <CategoryCard v-for="category in categories" :key="category.slug" :category="category" />
      </div>

      <h2 class="all-title">All products</h2>
      <div class="product-grid">
        <ProductCard v-for="product in products" :key="product.slug" :product="product" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-grid,
.product-grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}

.all-title {
  margin-top: 3.5rem;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
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

  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
