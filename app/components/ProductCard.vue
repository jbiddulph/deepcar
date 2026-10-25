<script setup lang="ts">
import type { Product } from '~/data/products'
import { formatPrice } from '~/data/products'

const props = defineProps<{ product: Product }>()
const { addProduct } = useBasket()
const added = ref(false)

function add() {
  addProduct(props.product)
  added.value = true
  setTimeout(() => {
    added.value = false
  }, 1400)
}
</script>

<template>
  <article class="card">
    <NuxtLink :to="`/products/${product.category}/${product.slug}`" class="card__media">
      <img :src="product.image" :alt="product.imageAlt" loading="lazy" width="640" height="480" />
    </NuxtLink>
    <div class="card__body">
      <h3>
        <NuxtLink :to="`/products/${product.category}/${product.slug}`">{{ product.name }}</NuxtLink>
      </h3>
      <p>{{ product.description }}</p>
      <div class="card__meta">
        <strong>{{ formatPrice(product.price) }}</strong>
        <span>/ {{ product.unit }}</span>
      </div>
      <button class="btn" type="button" @click="add">
        {{ added ? 'Added to enquiry' : 'Add to enquiry' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid var(--line);
  overflow: hidden;
}

.card__media {
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #d7ddd4;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 420ms ease;
}

.card:hover .card__media img {
  transform: scale(1.04);
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.15rem 1.15rem 1.3rem;
  flex: 1;
}

.card__body h3 {
  font-size: 1.45rem;
}

.card__body h3 a {
  text-decoration: none;
}

.card__body p {
  color: var(--ink-soft);
  font-size: 0.95rem;
  flex: 1;
}

.card__meta {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.card__meta span {
  color: var(--ink-soft);
  font-size: 0.9rem;
}

.btn {
  width: 100%;
}
</style>
