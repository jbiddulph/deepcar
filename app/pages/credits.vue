<script setup lang="ts">
type Credit = {
  key: string
  file: string
  license: string
  artist: string
  source: string
  local: string
  foreign_landing_url?: string
}

const { data: credits } = await useFetch<Credit[]>('/images/attributions.json')

useSeoMeta({
  title: 'Photo credits | Deepcar Animal Supplies',
  description: 'Creative Commons and public-domain image attributions used on this website.',
})
</script>

<template>
  <div class="section">
    <div class="container">
      <p class="section__eyebrow">Attribution</p>
      <h1 class="section__title">Photo credits</h1>
      <p class="section__lead">
        Product and category photography on this site uses Creative Commons and public-domain images
        from Wikimedia Commons and Openverse (the same family of reusable licences surfaced by
        Google Images’ Creative Commons filter). Replace these with your own product photos when
        ready.
      </p>

      <ul class="list">
        <li v-for="credit in credits || []" :key="credit.key">
          <img :src="credit.local" :alt="credit.file" width="160" height="120" loading="lazy" />
          <div>
            <strong>{{ credit.key }}</strong>
            <p>{{ credit.file }}</p>
            <p>
              {{ credit.license }}
              <span v-if="credit.artist"> · {{ credit.artist }}</span>
              · {{ credit.source }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  display: grid;
  gap: 1rem;
}

.list li {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1rem;
  padding: 0.85rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid var(--line);
}

.list img {
  width: 7rem;
  height: 5rem;
  object-fit: cover;
}

.list p {
  color: var(--ink-soft);
  font-size: 0.92rem;
}
</style>
