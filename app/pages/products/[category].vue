<script setup lang="ts">
import { getCategory, productsInCategory } from '~/data/products'

const route = useRoute()
const category = computed(() => getCategory(String(route.params.category)))
const items = computed(() => productsInCategory(String(route.params.category)))

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' })
}

useSeoMeta({
  title: () => `${category.value?.name} | Deepcar Animal Supplies Sheffield`,
  description: () => category.value?.description,
  ogImage: () => category.value?.image,
})
</script>

<template>
  <div class="section">
    <div class="container">
      <p class="section__eyebrow">
        <NuxtLink to="/products">Products</NuxtLink>
      </p>
      <h1 class="section__title">{{ category?.name }}</h1>
      <p class="section__lead">{{ category?.description }}</p>

      <div v-if="items.length" class="product-grid">
        <ProductCard v-for="product in items" :key="product.slug" :product="product" />
      </div>
      <p v-else class="empty">More products for this category will appear here soon.</p>
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  gap: 1.15rem;
  margin-top: 2rem;
}

.empty {
  margin-top: 2rem;
  color: var(--ink-soft);
}

@media (min-width: 700px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 980px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
