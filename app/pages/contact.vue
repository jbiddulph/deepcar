<script setup lang="ts">
import { business } from '~/data/business'

useSeoMeta({
  title: 'Contact | Deepcar Animal Supplies Sheffield',
  description:
    'Contact Deepcar Animal Supplies in Sheffield for animal feed, horse supplies, livestock feed, hay, bedding and pet products.',
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function submit() {
  status.value = 'sending'
  try {
    await $fetch('/api/enquiry', {
      method: 'POST',
      body: {
        ...form,
        fulfilment: 'collection',
        deliveryNotes: '',
        items: [],
        subtotal: 0,
        contactOnly: true,
      },
    })
    status.value = 'sent'
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="section">
    <div class="container contact">
      <div>
        <p class="section__eyebrow">Get in touch</p>
        <h1 class="section__title">Contact {{ business.shortName }}</h1>
        <p class="section__lead">
          Questions about stock, collection or delivery? Send a message or call us during opening
          hours.
        </p>

        <div class="blocks">
          <div>
            <h2>Address</h2>
            <p v-for="line in business.addressLines" :key="line">{{ line }}</p>
          </div>
          <div>
            <h2>Opening hours</h2>
            <p v-for="row in business.hours" :key="row.day">
              <strong>{{ row.day }}</strong><br />{{ row.time }}
            </p>
          </div>
          <div>
            <h2>Call & email</h2>
            <p>
              <a :href="`tel:${business.phone.replace(/\s/g, '')}`">{{ business.phone }}</a>
            </p>
            <p>
              <a :href="`mailto:${business.email}`">{{ business.email }}</a>
            </p>
            <p class="social">
              <a :href="business.social.facebook" target="_blank" rel="noopener">Facebook</a>
              ·
              <a :href="business.social.instagram" target="_blank" rel="noopener">Instagram</a>
            </p>
          </div>
        </div>

        <div class="map">
          <iframe
            title="Map showing Deepcar, Sheffield"
            :src="business.mapEmbedUrl"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div class="panel">
        <h2>Send a message</h2>
        <form v-if="status !== 'sent'" class="form" @submit.prevent="submit">
          <label>
            Name
            <input v-model="form.name" required type="text" autocomplete="name" />
          </label>
          <label>
            Email
            <input v-model="form.email" required type="email" autocomplete="email" />
          </label>
          <label>
            Phone
            <input v-model="form.phone" type="tel" autocomplete="tel" />
          </label>
          <label>
            Message
            <textarea v-model="form.message" required rows="5" />
          </label>
          <p v-if="status === 'error'" class="error">
            Could not send just now. Please email {{ business.email }} or call us.
          </p>
          <button class="btn" type="submit" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Sending…' : 'Send message' }}
          </button>
        </form>
        <p v-else class="ok">Thanks — your message is with us. We will reply soon.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  gap: 2rem;
}

.blocks {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
}

.blocks h2 {
  font-size: 1.35rem;
  margin-bottom: 0.45rem;
}

.blocks p {
  color: var(--ink-soft);
}

.social a {
  font-weight: 600;
  color: var(--forest);
}

.map {
  margin-top: 1.75rem;
  min-height: 16rem;
  border: 1px solid var(--line);
  overflow: hidden;
  background: #d7ddd4;
}

.map iframe {
  width: 100%;
  min-height: 16rem;
  border: 0;
}

.panel {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid var(--line);
  padding: 1.25rem;
  align-self: start;
}

.panel h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.form {
  display: grid;
  gap: 0.85rem;
}

.form label {
  display: grid;
  gap: 0.35rem;
  font-weight: 600;
}

.form input,
.form textarea {
  font-weight: 400;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 0.7rem 0.8rem;
  background: #fff;
}

.error {
  color: #7a1f1f;
}

.ok {
  color: var(--forest-mid);
  font-weight: 600;
}

@media (min-width: 700px) {
  .blocks {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 960px) {
  .contact {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
  }
}
</style>
