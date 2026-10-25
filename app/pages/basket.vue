<script setup lang="ts">
import { formatPrice } from '~/data/products'
import type { Fulfilment } from '~/composables/useBasket'

useSeoMeta({
  title: 'Order enquiry | Deepcar Animal Supplies',
  description:
    'Submit an order enquiry for collection in Deepcar or delivery. We confirm stock and final details with you.',
})

const { items, subtotal, setQuantity, remove, clear } = useBasket()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  fulfilment: 'collection' as Fulfilment,
  deliveryNotes: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorMessage = ref('')

async function submit() {
  if (!items.value.length) {
    errorMessage.value = 'Add at least one product before submitting an enquiry.'
    status.value = 'error'
    return
  }

  status.value = 'sending'
  errorMessage.value = ''

  try {
    await $fetch('/api/enquiry', {
      method: 'POST',
      body: {
        ...form,
        items: items.value,
        subtotal: subtotal.value,
      },
    })
    status.value = 'sent'
    clear()
  } catch (error: unknown) {
    status.value = 'error'
    const err = error as { data?: { statusMessage?: string }; statusMessage?: string }
    errorMessage.value =
      err?.data?.statusMessage || err?.statusMessage || 'Something went wrong. Please try again or call us.'
  }
}
</script>

<template>
  <div class="section">
    <div class="container">
      <p class="section__eyebrow">No online payments</p>
      <h1 class="section__title">Order enquiry</h1>
      <p class="section__lead">
        Review your basket, choose collection or delivery, and send your enquiry. We will contact
        you to confirm stock, arrangements and the final order.
      </p>

      <div v-if="status === 'sent'" class="notice notice--ok">
        <h2>Enquiry sent</h2>
        <p>
          Thank you. We have received your order enquiry and will be in touch shortly to confirm
          availability and next steps.
        </p>
        <NuxtLink class="btn" to="/products">Continue browsing</NuxtLink>
      </div>

      <div v-else class="layout">
        <section class="panel">
          <h2>Your basket</h2>
          <p v-if="!items.length" class="muted">Your enquiry basket is empty.</p>
          <ul v-else class="lines">
            <li v-for="item in items" :key="item.slug" class="line">
              <div>
                <strong>{{ item.name }}</strong>
                <p class="muted">{{ formatPrice(item.price) }} / {{ item.unit }}</p>
              </div>
              <div class="line__controls">
                <input
                  :value="item.quantity"
                  type="number"
                  min="1"
                  max="99"
                  :aria-label="`Quantity for ${item.name}`"
                  @change="setQuantity(item.slug, Number(($event.target as HTMLInputElement).value))"
                />
                <button class="text-btn" type="button" @click="remove(item.slug)">Remove</button>
              </div>
              <p class="line__total">{{ formatPrice(item.price * item.quantity) }}</p>
            </li>
          </ul>
          <p v-if="items.length" class="subtotal">
            Guide total: <strong>{{ formatPrice(subtotal) }}</strong>
          </p>
        </section>

        <section class="panel">
          <h2>Your details</h2>
          <form class="form" @submit.prevent="submit">
            <label>
              Name
              <input v-model="form.name" type="text" required autocomplete="name" />
            </label>
            <label>
              Email
              <input v-model="form.email" type="email" required autocomplete="email" />
            </label>
            <label>
              Phone
              <input v-model="form.phone" type="tel" required autocomplete="tel" />
            </label>

            <fieldset>
              <legend>Fulfilment</legend>
              <label class="radio">
                <input v-model="form.fulfilment" type="radio" value="collection" />
                Collection at the shop
              </label>
              <label class="radio">
                <input v-model="form.fulfilment" type="radio" value="delivery" />
                Request delivery
              </label>
            </fieldset>

            <label v-if="form.fulfilment === 'delivery'">
              Delivery address / notes
              <textarea v-model="form.deliveryNotes" rows="3" required />
            </label>

            <label>
              Message (optional)
              <textarea v-model="form.message" rows="3" />
            </label>

            <p v-if="status === 'error'" class="notice notice--error">{{ errorMessage }}</p>

            <button class="btn" type="submit" :disabled="status === 'sending'">
              {{ status === 'sending' ? 'Sending…' : 'Submit enquiry' }}
            </button>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 1.25rem;
  margin-top: 2rem;
}

.panel {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid var(--line);
  padding: 1.25rem;
}

.panel h2 {
  font-size: 1.7rem;
  margin-bottom: 1rem;
}

.muted {
  color: var(--ink-soft);
}

.lines {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.line {
  display: grid;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.line__controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.line__controls input {
  width: 4.25rem;
  min-height: 2.4rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.text-btn {
  border: 0;
  background: transparent;
  color: var(--forest);
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.subtotal {
  margin-top: 1rem;
  font-size: 1.05rem;
}

.form {
  display: grid;
  gap: 0.9rem;
}

.form label,
.form fieldset {
  display: grid;
  gap: 0.4rem;
  font-weight: 600;
}

.form input,
.form textarea {
  font-weight: 400;
  width: 100%;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 0.7rem 0.8rem;
  background: #fff;
}

.form fieldset {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 0.85rem;
}

.radio {
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.notice {
  margin-top: 1.5rem;
  padding: 1.25rem;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.7);
}

.notice--ok h2 {
  margin-bottom: 0.5rem;
}

.notice--ok .btn {
  margin-top: 1rem;
}

.notice--error {
  margin-top: 0;
  color: #7a1f1f;
  background: #f8ecec;
  border-color: #e2bdbd;
}

@media (min-width: 900px) {
  .layout {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }

  .line {
    grid-template-columns: 1fr auto auto;
    align-items: center;
  }
}
</style>
