import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1'
const TO = 'derek@otomatislabs.com'

const BodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2).max(120),
  comments: z.string().trim().min(5).max(1000),
  submissionId: z.string().trim().min(3).max(64),
})

function b64url(s: string) {
  return btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function buildRaw(data: z.infer<typeof BodySchema>) {
  const subject = `[Otomatis Labs] Nuevo contacto · ${data.company} (${data.submissionId})`
  const subjectEncoded = `=?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`
  const text = [
    `Nuevo formulario de contacto`,
    ``,
    `ID: ${data.submissionId}`,
    `Nombre: ${data.name}`,
    `Empresa: ${data.company}`,
    ``,
    `Comentarios:`,
    data.comments,
  ].join('\r\n')
  const msg = [
    `To: ${TO}`,
    `Subject: ${subjectEncoded}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `MIME-Version: 1.0`,
    ``,
    text,
  ].join('\r\n')
  return b64url(msg)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const GOOGLE_MAIL_API_KEY = Deno.env.get('GOOGLE_MAIL_API_KEY')
    if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email connector not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const raw = buildRaw(parsed.data)
    const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
      },
      body: JSON.stringify({ raw }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Gmail send failed', res.status, errText)
      return new Response(JSON.stringify({ error: 'Send failed', status: res.status, details: errText }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const data = await res.json()
    return new Response(JSON.stringify({ ok: true, id: data.id ?? null }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})