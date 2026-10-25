<script setup lang="ts">
import { formatPrice, getCategory, getProduct } from '~/data/products'

const route = useRoute()
const categorySlug = String(route.params.category)
const productSlug = String(route.params.slug)
const product = computed(() => getProduct(categorySlug, productSlug))
const category = computed(() => getCategory(categorySlug))
const { addProduct } = useBasket()
const qty = ref(1)
const added = ref(false)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

useSeoMeta({
  title: () => `${product.value?.name} | Deepcar Animal Supplies`,
  description: () => product.value?.description,
  ogImage: () => product.value?.image,
})

function add() {
  if (!product.value) return
  addProduct(product.value, qty.value)
  added.value = true
  setTimeout(() => {
    added.value = false
  }, 1600)
}
</script>

<template>
  <div class="section">
    <div v-if="product" class="container detail">
      <div class="detail__media">
        <img :src="product.image" :alt="product.imageAlt" width="960" height="720" />
      </div>
      <div class="detail__copy">
        <p class="section__eyebrow">
          <NuxtLink to="/products">Products</NuxtLink>
          <span aria-hidden="true"> / </span>
          <NuxtLink :to="`/products/${categorySlug}`">{{ category?.name }}</NuxtLink>
        </p>
        <h1 class="section__title">{{ product.name }}</h1>
        <p class="section__lead">{{ product.description }}</p>
        <p class="price">
          <strong>{{ formatPrice(product.price) }}</strong>
          <span>/ {{ product.unit }}</span>
        </p>
        <p class="note">
          Prices are guides for your enquiry. We confirm stock, delivery and the final order with
          you — no online payment required.
        </p>
        <div class="actions">
          <label>
            <span class="visually-hidden">Quantity</span>
            <input v-model.number="qty" type="number" min="1" max="99" />
          </label>
          <button class="btn" type="button" @click="add">
            {{ added ? 'Added to enquiry' : 'Add to enquiry' }}
          </button>
          <NuxtLink class="btn btn--ghost" to="/basket">View basket</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  display: grid;
  gap: 2rem;
}

.detail__media {
  overflow: hidden;
  border: 1px solid var(--line);
  background: #d7ddd4;
  min-height: 18rem;
}

.detail__media img {
  width: 100%;
  height: 100%;
  max-height: 34rem;
  object-fit: cover;
}

.price {
  margin-top: 1.25rem;
  font-size: 1.2rem;
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
}

.price span,
.note {
  color: var(--ink-soft);
}

.note {
  margin-top: 0.85rem;
  max-width: 38rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
  align-items: center;
}

.actions input {
  width: 4.5rem;
  min-height: 2.85rem;
  padding: 0.5rem 0.65rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
}

@media (min-width: 900px) {
  .detail {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
}
</style>
