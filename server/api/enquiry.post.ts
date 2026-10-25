type EnquiryItem = {
  slug: string
  name: string
  quantity: number
  price: number
  unit: string
}

type EnquiryBody = {
  name?: string
  email?: string
  phone?: string
  fulfilment?: 'collection' | 'delivery'
  deliveryNotes?: string
  message?: string
  items?: EnquiryItem[]
  subtotal?: number
  contactOnly?: boolean
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<EnquiryBody>(event)

  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const phone = String(body?.phone || '').trim()
  const message = String(body?.message || '').trim()
  const fulfilment = body?.fulfilment === 'delivery' ? 'delivery' : 'collection'
  const deliveryNotes = String(body?.deliveryNotes || '').trim()
  const items = Array.isArray(body?.items) ? body.items : []
  const contactOnly = Boolean(body?.contactOnly)

  if (!name || !email || !isEmail(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid name and email.' })
  }

  if (!contactOnly && !phone) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a phone number.' })
  }

  if (!contactOnly && items.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Your enquiry basket is empty.' })
  }

  if (fulfilment === 'delivery' && !deliveryNotes && !contactOnly) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please include delivery address or notes.',
    })
  }

  if (contactOnly && !message) {
    throw createError({ statusCode: 400, statusMessage: 'Please include a message.' })
  }

  // Soft rate-limit signal via headers; hosting WAF/CDN adds real protection in production.
  setHeader(event, 'Cache-Control', 'no-store')

  const payload = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone,
    fulfilment,
    deliveryNotes,
    message,
    contactOnly,
    items,
    subtotal: Number(body?.subtotal || 0),
  }

  // In production, connect Resend/SMTP via env. For now we log securely server-side.
  console.info('[enquiry]', JSON.stringify(payload))

  return {
    ok: true,
    message: contactOnly
      ? 'Message received'
      : 'Order enquiry received. We will confirm stock and arrangements with you.',
  }
})
