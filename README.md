# Forest

Forest helps couples decide what to eat together. Each person picks a mood. Forest finds the dinner in the middle, using what other couples actually ate and loved.

This repository is the Forest website and product: discovery, shop, cart and checkout, the Journal, and contact.

## Run it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Structure

The rule: no file over 100 lines. Logic lives in `lib/` and hooks. Components handle layout and presentation.

```
app/                    Routes (App Router), metadata, API routes, global styles
  styles/               tokens.css (palette, type, space, motion), themes, base, utilities
components/
  discover/             The matchmaker: useMatchmaker hook, pipVoice, stage, cards, filters
  home/                 Home sections: story/ (scroll story), crowd/, fortwo/, meet/
  shop/                 Cards, art/ (packaging renders), catalog/, detail/, purchase/
  cart/  checkout/      Cart state (CartProvider + useCartStorage), views, totals
  contact/  journal/    Contact flow, article parts
  forms/useForm.ts      Shared form state, validation, focus and submit states
  pip/                  Pip: anatomy, eyes, six moods, blink
  ui/                   Button, Field, Section, Reveal, FoodImage, JsonLd
lib/
  types.ts              Branded Cents/Slug, Result, assertNever, isOneOf
  data/                 Moods, discoveries, products, articles, notes (typed, split by topic)
  discover/             Ranking engine and URL state
  cart/  checkout.ts    Pure cart maths and server-side re-pricing
  crowd.ts  shop.ts     Community boards and catalog queries
  server/forward.ts     Webhook delivery for forms
```

## Data honesty

Forest is in beta. Couple counts, repeat rates and weekly saves come from a preview dataset in `lib/data/discoveries/`. While `site.previewData` is `true`, every place that shows those numbers says so.

There are no invented testimonials or reviews. `lib/data/notes.ts` only takes real, consented notes. Until it has some, the home page asks couples for theirs. Product reviews show an honest empty state.

## Integrations

Set these in `.env.local`:

| Variable | What it does | If it's not set |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph | Uses `http://localhost:3000` |
| `CONTACT_WEBHOOK_URL` | Contact form messages are forwarded here | Messages are logged on the server |
| `NEWSLETTER_WEBHOOK_URL` | Newsletter sign-ups are forwarded here | Sign-ups are logged on the server |
| `CHECKOUT_MODE` | `preview` gives a confirmation with no payment. `live` is reserved for a payment provider and returns 503 until one is wired in `app/api/checkout/route.ts`. | `preview` |

Checkout always re-prices the cart on the server and rejects sold-out items. Prices are integer cents (`Cents`) everywhere.

## Imagery

Food photography is hotlinked from Unsplash (free licence). Products are shown as SVG packaging renders in `components/shop/art/` until there's a real product shoot. To use real photography, swap the image paths in `lib/data/`.

## Motion

Motion tells the story:

- the hero strikes out "What do you want to eat?"
- moods fly to Pip as seeds and the match card deals in
- the home page has a pinned, scroll-driven story
- couple scenarios play out as a conversation
- values light up word by word as you read
- products fly to the cart

All of it respects `prefers-reduced-motion`.
