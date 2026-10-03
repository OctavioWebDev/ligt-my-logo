# AuraForm: sign builder and quote requests

Date: 2026-10-02
Status: approved in conversation, awaiting review of this written spec

## Purpose

Turn the unfinished Scotty B's LED's site into **AuraForm**, a site Octavio runs himself for custom LED neon signs and lit logos.

There is no sign maker or cost basis yet, so the site collects complete quote requests instead of taking payment. Octavio replies to each request with a final price. Online payment is a later project, once a supplier and real costs exist.

**Success means:**
- A customer can design a sign and see its price.
- The customer can submit the sign or a logo request.
- Octavio receives everything needed to quote and fulfill it, without losing any request.

### What Octavio decided

- **Brand:** AuraForm. "Scotty B's LED's" and "Light My Logo" belong to his friend and must not appear on the site. The friend's profit share for the idea is a private arrangement and does not appear on the site.
- **Flow:** quote requests only. No cart, checkout or payment.
- **Delivery:** each request is emailed to Octavio, confirmed by email to the customer, and saved to a database Octavio can browse on a private admin page.
- **Price:** the builder shows an exact price, computed from rates in one config file.
- **Stack:** Neon Postgres and Vercel Blob, added through the Vercel dashboard, with Resend for email.
- **Photos:** remove all of Scotty B's photos and the promo video for now.

### Assumptions

- **Domain:** auraformsigns.com is the likely domain but is not bought yet. Until a domain is verified in Resend, only notification emails to Octavio can be sent.
- **Turnaround:** the promised quote turnaround is "within 24 hours".

## Pages

| Route | Replaces | Content |
|---|---|---|
| `/` | home | AuraForm hero with two calls to action, "Design your sign" (`/design`) and "Light up your logo" (`/logo`). Glowing text drawn with CSS instead of photos. |
| `/design` | `/CustomSign` | The sign builder (below). |
| `/logo` | `/CustomLogo` | The logo request form (below). |
| `/request/[ref]` | (new) | Confirmation: "Request AF-1042 received. We'll email your quote within 24 hours." Shows a summary of the request. |
| `/admin` | (new) | Password-protected list and detail of requests (below). |
| `/About` and the policy pages | same | Rebranded to AuraForm. Any statement about the previous business (team bios, brand story, shipping, refund and return terms) is replaced with a clearly marked `TODO(Octavio)` placeholder instead of invented facts. |

The old routes `/CustomSign` and `/CustomLogo` permanently redirect (308) to `/design` and `/logo`.

The header logo `SBLEDSLogo.png` is replaced by a text wordmark "AuraForm". Everything in `public/pictures/` and `public/videos/`, and every component that renders them, is removed: `PhotoCarousel`, plus the image use in `HeroSection`, `CallToActionSection`, `DigitalSignsSection` and `WhyChooseUsSection`.

**Removed code and dependencies:**
- **Components:** `Cart.tsx`, `Checkout.tsx`, `CheckoutForm.jsx`, `useCart.ts`, `AddToCartButton.jsx`.
- **Packages:** Stripe, `react-router-dom`, `bcryptjs`, `jsonwebtoken`, `@emailjs/browser`, `axios`, `zustand`, `flowbite` and `html2canvas`. `html2canvas` is replaced, as described in the sign builder section.
- Each package is removed only if nothing else imports it.
- All of this stays in git history for when payment is added.

## Sign builder (`/design`)

The existing selectors stay, with the same option values:
- **Text:** 1 to 3 lines, 60 characters maximum in total.
- **Font:** the 13 current Google fonts, Allura through Yellowtail.
- **Glow color:** the 13 current colors plus RGB.
- **Tube color:** White, or Color Matching.
- **Size:**
  - Presets: Small 10×3, Medium 13×4 and Large 21×6 inches.
  - Custom: width 10 to 118 inches. Height is derived from width as today: `3 + floor((width − 10) / 3)`, clamped to 3–37 inches.
- **Backing:** Cut to Shape, Full Board, Hollow-Out or Stand.
- **Location:** inside or outside.

Existing bugs fixed along the way:
- The page defaults location to `indoor`, but the selector uses `inside` and `outside`. Standardize on `inside` and `outside`.
- The preset size and the custom size are two separate states, so it's unclear which one is priced. Make it a single `size` state: choosing a preset sets it, and editing the custom fields overrides it.

### Pricing

Pricing lives in `src/config/pricing.ts`:

```ts
export const pricing = {
  perSquareInch: 0.6,          // USD, applied to width × height in inches
  outsideMultiplier: 1.1,      // +10% for outdoor signs
  backing: { 'Cut to Shape': 0, 'Full Board': 0, 'Hollow-Out': 0, 'Stand': 0 }, // flat USD add-ons
  rgbSurcharge: 0,             // flat USD add-on when glow color is RGB
  minimumPrice: 0,             // floor in USD
};
```

`calculatePrice(spec): number` is a pure function in `src/lib/pricing.ts`:
- It rounds to cents and is used by both the page and the server.
- It replaces the two duplicated calculations in `page.tsx` and `Footer.jsx`.
- The server **always recomputes** the price and stores its own value. It never trusts the price the browser sends.

### Submitting a sign

1. **Request this sign** opens a contact form: name, email, optional phone, and optional notes (500 characters maximum).
2. The browser renders the preview to a PNG with `html-to-image`, which replaces `html2canvas`.
3. It sends the PNG and the design in a multipart `POST` to `/api/requests/sign`.

## Logo request (`/logo`)

The existing fields stay: individual or business, project description, size (sm, md or lg), quantity, deadline, first and last name, email, phone, the promotions and SMS opt-ins, and terms acceptance.

The design file upload is now actually sent:
- **Accepted types:** PNG, JPG, SVG or PDF.
- **Maximum size:** 10 MB.
- **Required?** No, because the description can stand alone.

The form posts multipart to `/api/requests/logo`, not EmailJS. The SMS opt-in is stored but not acted on yet.

## Server flow (both request types)

Both routes are in `src/app/api/requests/{sign,logo}/route.ts` and run on the Node runtime.

1. **Spam checks.** If the hidden honeypot field `company_website` is filled in, return a fake success without saving anything. Then apply rate limiting: at most 5 submissions per IP per hour. The limit is counted in the database by `ip_hash` and `created_at`, so it needs no extra service.
2. **Validation.** Validate with zod; the schemas live in `src/lib/validation.ts`. A failure returns 400 with field errors, which the form shows inline.
3. **Images.** Upload the image or file to Vercel Blob under `requests/<ref>/…` with a random suffix. Blob URLs are unguessable, but the admin page is the only place that links to them.
4. **Save.** Insert the row and generate the reference number `AF-<n>` from a database sequence starting at 1001.
5. **Emails.** Send them through Resend, after the save. A failed email is logged on the row (`email_error`) and never fails the request.
   - **To `NOTIFY_EMAIL`:** subject "New sign request AF-1042: $219.60", with every field, the image and a link to `/admin/requests/AF-1042`.
   - **To the customer:** sent only when `RESEND_FROM` is set to an address on a verified domain. It contains the request summary, the price (for signs) and the 24-hour promise.
6. **Response.** Return `{ ref }`, and the client navigates to `/request/<ref>`.

The confirmation page reads the request by `ref`. It shows only non-sensitive fields: type, summary and price. It does not show the email or phone.

## Data

The database is accessed with Prisma, which is already a dependency. There is one table:

```prisma
model QuoteRequest {
  id          Int      @id @default(autoincrement())
  ref         String   @unique            // "AF-1001"
  type        String                      // "sign" | "logo"
  status      String   @default("new")    // new | quoted | won | lost
  name        String
  email       String
  phone       String?
  notes       String?                     // customer notes / project description
  details     Json                        // sign spec or logo fields
  priceCents  Int?                        // signs only, server-computed
  imageUrl    String?                     // sign preview or uploaded logo
  adminNote   String?
  emailError  String?
  ipHash      String                      // sha256(ip + secret), for rate limiting
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@index([createdAt])
  @@index([ipHash, createdAt])
}
```

`ref` comes from a Postgres sequence. A migration creates the sequence `quote_ref_seq START 1001`.

## Admin (`/admin`)

- **Login** (`/admin/login`) is one password field, checked against `ADMIN_PASSWORD` in constant time.
  - **On success:** set an httpOnly, Secure, SameSite=Lax cookie holding an HMAC-signed expiry timestamp (signed with `ADMIN_SESSION_SECRET`), valid for 7 days.
  - **Protection:** middleware blocks every `/admin` route except `/admin/login`.
  - **Brute force:** login attempts are rate-limited per IP, the same way as submissions.
- **List** (`/admin`): newest first, 50 per page, filterable by status. Columns: ref, type, name, price, created date and status.
- **Detail** (`/admin/requests/[ref]`): every field, the image, a status dropdown, the private note, and any email error. Changes save through a server action that re-checks the session.

## Configuration

| Variable | Purpose | Set by |
|---|---|---|
| `DATABASE_URL`, `DATABASE_URL_UNPOOLED` | Neon | Neon integration |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob | Blob integration |
| `RESEND_API_KEY` | email | Octavio |
| `NOTIFY_EMAIL` | where request notifications go. Before a domain is verified, it must be the email address of the Resend account, because Resend's test sender only delivers there | Octavio |
| `RESEND_FROM` | sender for customer confirmations. Unset means customer emails are off and notifications use `onboarding@resend.dev` | Octavio, after verifying the domain |
| `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `IP_HASH_SECRET` | admin login and hashing | Octavio (Claude generates suggested values) |

Brand text, the support email and the turnaround promise live in `src/config/site.ts`.

`.env.example` lists every variable. Real values never go in git.

## Deployment and housekeeping

- Pin `"engines": { "node": "24.x" }` in `package.json`, because Vercel discontinued Node 20.
- Octavio reconnects the Vercel project's Git setting to `OctavioWebDev/ligt-my-logo`. The API refused to change it (403).
- After launch, rename the repo and the Vercel project to `auraform`.
- Octavio adds Neon and Blob from the Vercel **Storage** tab, and the Resend variables in Project Settings. Prisma migrations run with `prisma migrate deploy` in the build command.

## Testing

Use Vitest, and keep tests next to the code they test.
- **`calculatePrice`:**
  - preset sizes
  - custom sizes
  - outside multiplier
  - backing and RGB add-ons
  - minimum price
  - rounding
- **Validation schemas:**
  - required fields
  - bad email
  - text length limits
  - file type and size
- **Submit routes**, with Prisma, Blob and Resend mocked:
  - a valid submission saves and returns `ref`
  - a failed email still saves the row and records `emailError`
  - the honeypot returns success and saves nothing
  - the 6th submission in an hour returns 429
  - the price the browser sends is ignored
- **Admin session:**
  - correct and wrong password
  - expired or tampered cookie is rejected
  - middleware redirects requests without a session
- **`next build`** passes, including type checks and lint.

Before merging, on a Vercel preview, submit one real sign request and one real logo request. Then check:
- the database row
- the Blob image
- the notification email
- the admin list, detail and status change

## Out of scope

- Payment and checkout.
- Customer accounts.
- SMS.
- A photo gallery.
- Buying the domain.
- Writing real About and policy text, which is left as marked placeholders.
