<script setup lang="ts">
import type { Category } from '~/data/products'

defineProps<{ category: Category }>()
</script>

<template>
  <NuxtLink :to="`/products/${category.slug}`" class="cat">
    <img :src="category.image" :alt="category.imageAlt" loading="lazy" width="640" height="420" />
    <div class="cat__copy">
      <h3>{{ category.name }}</h3>
      <p>{{ category.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.cat {
  position: relative;
  display: block;
  min-height: 16rem;
  overflow: hidden;
  text-decoration: none;
  color: #f6f8f5;
  isolation: isolate;
}

.cat img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}

.cat::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 28, 24, 0.08), rgba(15, 28, 24, 0.78));
  z-index: 1;
}

.cat__copy {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.25rem;
}

.cat__copy h3 {
  font-size: 1.7rem;
  margin-bottom: 0.35rem;
}

.cat__copy p {
  max-width: 28ch;
  font-size: 0.95rem;
  color: rgba(246, 248, 245, 0.88);
}

.cat:hover img {
  transform: scale(1.05);
}
</style>
