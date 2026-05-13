## Sección Conversational Commerce

Replicar la sección homónima de bleett.com adaptada al estilo de Otomatis Labs (teal #2ea998 / navy #041424, Poppins/Archivo).

### Contenido

**Eyebrow:** "Conversational Commerce"
**Título:** "El ciclo del usuario es conversacional"
**Subtítulo:** Una frase corta sobre cómo unificamos marketing, ventas y atención en un solo canal conversacional.

**Bloque 1 — Ciclo conversacional (visual central)**
Diagrama circular/triádico con tres etapas conectadas:
- **Marketing** — campañas y captación que inician la conversación.
- **Commerce** — catálogo, asesoramiento IA, carrito y pago dentro del chat.
- **Care** — postventa, soporte y fidelización en el mismo hilo.

Cada etapa con icono (lucide: `Megaphone`, `ShoppingBag`, `HeartHandshake`), título y descripción breve. Líneas/flechas teal conectándolas para reforzar la idea de ciclo.

**Bloque 2 — Aspectos para usar WhatsApp como canal de ventas**
Subtítulo: "Aspectos a desarrollar para utilizar WhatsApp como canal de ventas"
Grid de 5 tarjetas (lg:grid-cols-5, md:grid-cols-2):
1. Funcionalidades del canal — `Layers`
2. Mensajería y publicidad — `MessageSquare`
3. Medición e integración — `BarChart3`
4. Estacionalidad y eventos — `CalendarRange`
5. Modelo de atribución — `Target`

Cada tarjeta: icono teal, título Poppins semibold, micro-descripción de 1 línea.

**CTA final (opcional, ligero):** botón "Hablemos de tu caso" → ancla a la sección de contacto / CTA existente.

### Detalles técnicos

- Nuevo archivo: `src/components/ConversationalCommerceSection.tsx`.
- Insertar en `src/pages/Index.tsx` entre `ServicesSection` y `ProcessSection` (encaja narrativamente: servicios → cómo se materializa → proceso).
- Usar `useScrollAnimation` y aplicar la clase `is-visible` (mismo patrón que `ProcessSection` recién corregido) para el stagger de hijos de `.container`.
- Tokens semánticos: `bg-background`, `text-foreground`, `text-primary`, `border-primary/30`, `bg-card`, `text-muted-foreground`. Sin colores hardcodeados.
- `id="conversational-commerce"` para anclaje desde el navbar (no se modifica el navbar en este plan, se puede añadir luego).
- Layout responsive: ciclo en columna en mobile, en fila/triángulo en `lg+`. Grid de aspectos colapsa a 2 cols en tablet y 1 col en mobile.
- Iconografía 100% lucide-react, sin imágenes externas.
- Reusar `Card`/utilidades existentes; no agregar dependencias.

### Layout esperado

```text
┌─────────────────────────────────────────────┐
│            CONVERSATIONAL COMMERCE          │
│   El ciclo del usuario es conversacional    │
│           [subtítulo corto]                 │
│                                             │
│    [Marketing] → [Commerce] → [Care]        │
│         ↑___________________________|       │
│                                             │
│  Aspectos para WhatsApp como canal de ventas│
│  [card] [card] [card] [card] [card]         │
└─────────────────────────────────────────────┘
```

### Fuera de alcance

- No se modifica el `Navbar` (se puede añadir el link en una iteración posterior si se desea).
- No se crean páginas/rutas nuevas ni backend.
- No se tocan otras secciones existentes.
