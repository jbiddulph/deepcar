<script setup lang="ts">
import { business } from '~/data/business'

const { count } = useBasket()
const open = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
  { to: '/basket', label: 'Order enquiry' },
]
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink to="/" class="brand" aria-label="Deepcar Animal Supplies home">
        <span class="brand__mark" aria-hidden="true">DAS</span>
        <span class="brand__text">
          <span class="brand__name">{{ business.name }}</span>
          <span class="brand__place">{{ business.location }}</span>
        </span>
      </NuxtLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="site-nav"
        @click="open = !open"
      >
        <span class="visually-hidden">Menu</span>
        <span aria-hidden="true">{{ open ? 'Close' : 'Menu' }}</span>
      </button>

      <nav id="site-nav" class="nav" :class="{ 'nav--open': open }" aria-label="Primary">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav__link"
          :class="{ 'nav__link--basket': link.to === '/basket' }"
        >
          {{ link.label }}
          <span v-if="link.to === '/basket' && count" class="nav__count">{{ count }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(12px);
  background: rgba(238, 242, 236, 0.86);
  border-bottom: 1px solid var(--line);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4.25rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  min-width: 0;
}

.brand__mark {
  flex: none;
  width: 2.6rem;
  height: 2.6rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--forest);
  color: #f4f7f3;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.brand__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.brand__name {
  font-family: var(--font-display);
  font-size: 1.2rem;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand__place {
  font-size: 0.78rem;
  color: var(--ink-soft);
}

.menu-toggle {
  display: inline-flex;
  border: 1px solid var(--line);
  background: #fff;
  border-radius: var(--radius);
  padding: 0.55rem 0.8rem;
  cursor: pointer;
}

.nav {
  display: none;
  gap: 0.35rem;
}

.nav--open {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 1rem;
  right: 1rem;
  top: calc(100% + 0.35rem);
  padding: 0.75rem;
  background: #f7f9f5;
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.nav__link {
  text-decoration: none;
  padding: 0.65rem 0.8rem;
  border-radius: var(--radius);
  font-weight: 600;
  color: var(--ink-soft);
}

.nav__link:hover,
.nav__link.router-link-active {
  color: var(--forest);
  background: rgba(27, 61, 50, 0.06);
}

.nav__link--basket {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.nav__count {
  display: inline-grid;
  place-items: center;
  min-width: 1.35rem;
  height: 1.35rem;
  padding: 0 0.3rem;
  border-radius: 999px;
  background: var(--straw);
  color: var(--ink);
  font-size: 0.75rem;
  font-weight: 700;
}

@media (min-width: 860px) {
  .menu-toggle {
    display: none;
  }

  .nav,
  .nav--open {
    display: flex;
    flex-direction: row;
    position: static;
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
  }
}
</style>
