# AuraForm Quote Requests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the unfinished Scotty B's LED's site into AuraForm, which collects priced sign and logo quote requests. Each request is saved in a database, emailed, and managed on a password-protected admin page.

**Architecture:**
- Next.js 14 App Router.
- Pure modules in `src/lib`: pricing, validation, sign options.
- Server modules in `src/server`, built around one `createRequest` service with injected dependencies:
  - db (Prisma on Neon)
  - storage (Vercel Blob)
  - email (Resend)
- Thin route handlers and pages that call into those modules.
- Admin auth: an HMAC-signed cookie checked in middleware, using Web Crypto so it runs on the edge.

**Tech Stack:** Next.js 14.2, TypeScript, Prisma 5 + Neon Postgres, `@vercel/blob`, Resend, zod, html-to-image, Vitest, Tailwind.

**Spec:** `docs/superpowers/specs/2026-10-02-auraform-quote-requests-design.md`

## Global Constraints

- The brand is **AuraForm**. The strings "Scotty B", "SB LED", "Light My Logo" and "ligt" must not appear in any rendered page, metadata or email.
  - The final check is `grep -rniE "scotty|sbled|light my logo" src` returning nothing.
- Node: `"engines": { "node": "24.x" }`.
- Reference numbers look like `AF-<n>` and come from the Postgres sequence `quote_ref_seq START 1001`.
- Rate limits:
  - Submissions: **5 per IP-hash per hour**. The 6th gets HTTP **429**.
  - Failed admin logins: **10 per IP-hash per hour**.
- Uploads:
  - Sign preview: `image/png` only.
  - Logo file: `image/png`, `image/jpeg`, `image/svg+xml` or `application/pdf`.
  - Both have a maximum of **10 MB**.
- Sign text: 1–3 lines, at most **60 characters** in total once newlines are excluded and the text is trimmed.
- Customer notes: at most **500** characters.
- Quote promise copy: "We'll email your quote within 24 hours." It lives in `src/config/site.ts`.
- Status values are exactly `new | quoted | won | lost`.
- The server always recomputes the price. The browser's price is never read.
- An email failure never fails a request. The row is saved and `emailError` is set.
- Customer confirmation emails are sent only when `RESEND_FROM` is set.
- Secrets never go in git. `.env` and `.env*.local` are gitignored, and `.env.example` lists the variable names.
- Every task ends with `npm test` and `npx tsc --noEmit` passing.

## Review Focus

1. **Preview image fonts.** A preview captured with `html-to-image` must use the font the customer chose, not a fallback. Cross-origin `@import` Google Fonts can't be embedded. Task 8 loads the builder fonts with `next/font/google` (same origin) and has a manual check.
2. **Double submission.** Double-clicking "Request this sign" or "Send request" must create one request, not two. Task 8 and Task 9 disable the button while the request is in flight, and tests assert `fetch` is called once.
3. **Missing client IP.** With no `x-forwarded-for` header, as in local dev, a submission must still work and still be rate-limited, using the key `"unknown"`. Task 4 tests this.
4. **Local admin login.** Admin login over plain `http://localhost` must work, so the `Secure` cookie flag is set only when `NODE_ENV === "production"`. Task 6 tests this.
5. **Unknown or honeypot reference.** `/request/<unknown-ref>` and the honeypot's fake success must show a generic "Request received" page. They must not 404, and they must not reveal whether a reference exists. Task 10 tests this.

---

## File Structure

```
src/config/site.ts            brand, support email, turnaround copy
src/config/pricing.ts         rate table (spec values)
src/config/signOptions.ts     FONTS, GLOW_COLORS, TUBE_COLORS, BACKINGS, LOCATIONS, PRESET_SIZES, heightForWidth()
src/config/fonts.ts           next/font/google loaders for the 13 builder fonts
src/lib/pricing.ts            calculatePrice()
src/lib/validation.ts         zod schemas + validateUpload()
src/server/db.ts              Prisma singleton
src/server/requestStore.ts    nextRef, insertRequest, countRecentByIp, setEmailError, getRequest, listRequests, updateRequest, login-attempt helpers
src/server/storage.ts         uploadRequestFile()
src/server/email.ts           renderOwnerEmail/renderCustomerEmail (pure) + send functions
src/server/ip.ts              clientIp(headers), hashIp(ip)
src/server/createRequest.ts   the submission service
src/server/adminSession.ts    signSession, verifySession, checkPassword (Web Crypto)
src/middleware.ts             /admin guard
src/app/api/requests/sign/route.ts, src/app/api/requests/logo/route.ts
src/app/design/**             sign builder (moved from CustomSign)
src/app/logo/page.tsx         logo form (moved from CustomLogo)
src/app/request/[ref]/page.tsx confirmation
src/app/admin/**              login, list, detail, actions
prisma/schema.prisma, prisma/migrations/0001_init/migration.sql
```

---

### Task 1: Tooling, config and pricing

**Files:**
- Modify: `package.json`, `.gitignore`, `next.config.mjs`
- Create: `vitest.config.ts`, `.env.example`, `src/config/site.ts`, `src/config/pricing.ts`, `src/config/signOptions.ts`, `src/lib/pricing.ts`
- Test: `src/lib/pricing.test.ts`, `src/config/signOptions.test.ts`

**Interfaces:**
- Produces:
  - `siteConfig = { name: 'AuraForm', supportEmail: string, quotePromise: "We'll email your quote within 24 hours." }`
  - `pricing` (the shape exactly as in the spec)
  - `type Font`, `GlowColor`, `TubeColor`, `Backing`, `Location`
  - `FONTS: readonly Font[]`: the 13 values `Allura, Cookie, Lobster, Monoton, Pacifico, Parisienne, Playball, Ranchers, Righteous, Sacramento, Satisfy, Tangerine, Yellowtail`
  - `GLOW_COLORS: readonly { name: GlowColor; hex: string | null }[]`: the 13 colors from `ColorSelector.jsx`, plus `{ name: 'RGB', hex: null }`
  - `TUBE_COLORS = ['White', 'Color Matching']`
  - `BACKINGS = ['Cut to Shape', 'Full Board', 'Hollow-Out', 'Stand']`
  - `LOCATIONS = ['inside', 'outside']`
  - `PRESET_SIZES = [{ label: 'Small', width: 10, height: 3 }, { label: 'Medium', width: 13, height: 4 }, { label: 'Large', width: 21, height: 6 }]`
  - `heightForWidth(width: number): number`
  - `type SignSpec = { text: string; font: Font; glowColor: GlowColor; tubeColor: TubeColor; size: { width: number; height: number }; backing: Backing; location: Location }`
  - `calculatePrice(spec: Pick<SignSpec, 'size' | 'backing' | 'location' | 'glowColor'>, rates = pricing): number`. Returns dollars rounded to cents.

- [ ] **Step 1: Set up Vitest and the project files**
  - `npm i -D vitest @vitest/coverage-v8`.
  - Add `"test": "vitest run"` to the scripts.
  - Add `"engines": { "node": "24.x" }`.
  - `vitest.config.ts` uses the `@` alias for `./src` and `environment: 'node'`.
  - Add `.env` to `.gitignore`.
  - `.env.example` lists every variable in the spec's Configuration table, with empty values.

- [ ] **Step 2: Write the failing tests**

```ts
// src/config/signOptions.test.ts
expect(heightForWidth(10)).toBe(3);
expect(heightForWidth(13)).toBe(4);
expect(heightForWidth(118)).toBe(37);   // 3 + floor(108/3) = 39 → clamped to 37
expect(heightForWidth(5)).toBe(3);      // clamped low

// src/lib/pricing.test.ts
const base = { backing: 'Full Board', location: 'inside', glowColor: 'Red' } as const;
expect(calculatePrice({ ...base, size: { width: 10, height: 3 } })).toBe(18);
expect(calculatePrice({ ...base, location: 'outside', size: { width: 10, height: 3 } })).toBe(19.8);
expect(calculatePrice({ ...base, size: { width: 21, height: 6 } })).toBe(75.6);
expect(calculatePrice({ ...base, location: 'outside', size: { width: 21, height: 6 } })).toBe(83.16);
expect(calculatePrice({ ...base, size: { width: 118, height: 37 } })).toBe(2619.6);
const rates = { ...pricing, backing: { ...pricing.backing, Stand: 25 }, rgbSurcharge: 15, minimumPrice: 50 };
expect(calculatePrice({ ...base, backing: 'Stand', glowColor: 'RGB', size: { width: 10, height: 3 } }, rates)).toBe(58); // 18+25+15
expect(calculatePrice({ ...base, size: { width: 10, height: 3 } }, rates)).toBe(50);   // minimum floor
expect(calculatePrice({ ...base, size: { width: 11, height: 3 } })).toBe(19.8);        // 33*0.6, no float drift
```

- [ ] **Step 3: Run the tests**

Run: `npm test`. Expected: FAIL, because the modules don't exist yet.

- [ ] **Step 4: Implement the config files and `calculatePrice`**
  - `calculatePrice` computes:
    1. area × `perSquareInch`
    2. × `outsideMultiplier` if the location is outside
    3. \+ `backing[backing]`
    4. \+ `rgbSurcharge` if the glow color is RGB
    5. `max(minimumPrice)`
    6. `Math.round(x * 100) / 100`
  - `heightForWidth` = `min(max(3 + floor((w − 10) / 3), 3), 37)`.

- [ ] **Step 5: Run the tests**

Run: `npm test && npx tsc --noEmit`. Expected: PASS.

- [ ] **Step 6: Commit**

`git commit -m "Add pricing config, sign options and Vitest"`

---

### Task 2: Validation

**Files:**
- Create: `src/lib/validation.ts`
- Test: `src/lib/validation.test.ts`

**Interfaces:**
- Consumes: the option constants from Task 1.
- Produces:
  - `contactSchema`: `name` 1–100 chars (trimmed), `email` (zod email), `phone` optional ≤30, `notes` optional ≤500.
  - `signRequestSchema = contactSchema.extend({ spec: signSpecSchema })`. In `signSpecSchema`:
    - `text`: trimmed, 1–3 lines, ≤60 non-newline characters
    - `font`, `glowColor`, `tubeColor`, `backing`, `location` as enums of the Task 1 constants
    - `size.width`: integer 10–118
    - `size.height`: integer 3–37
  - `logoRequestSchema`:
    - `customerType`: `individual` or `business`
    - `description`: 1–2000
    - `size`: `sm`, `md` or `lg`
    - `quantity`: coerced integer 1–1000
    - `deadline`: optional ISO date string
    - `firstName`, `lastName`: 1–50 each
    - `email`; `phone` optional ≤30
    - `promotions`, `smsNotifications`: coerced booleans
    - `termsAccepted`: literal `true`
  - `type SignRequestInput`, `LogoRequestInput` (`z.infer`).
  - `validateUpload(file: { type: string; size: number }, kind: 'preview' | 'logo'): string | null`. Returns an error message, or null when the file is OK.

- [ ] **Step 1: Write the failing tests**

```ts
const goodSign = { name: 'Ana', email: 'ana@x.com', spec: { text: 'Open Late', font: 'Pacifico', glowColor: 'Pink', tubeColor: 'White', size: { width: 13, height: 4 }, backing: 'Cut to Shape', location: 'inside' } };
expect(signRequestSchema.safeParse(goodSign).success).toBe(true);
expect(signRequestSchema.safeParse({ ...goodSign, email: 'nope' }).success).toBe(false);
expect(signRequestSchema.safeParse({ ...goodSign, spec: { ...goodSign.spec, text: '   ' } }).success).toBe(false);
expect(signRequestSchema.safeParse({ ...goodSign, spec: { ...goodSign.spec, text: 'a\nb\nc\nd' } }).success).toBe(false);
expect(signRequestSchema.safeParse({ ...goodSign, spec: { ...goodSign.spec, text: 'x'.repeat(61) } }).success).toBe(false);
expect(signRequestSchema.safeParse({ ...goodSign, spec: { ...goodSign.spec, text: 'x'.repeat(30) + '\n' + 'y'.repeat(30) } }).success).toBe(true);
expect(signRequestSchema.safeParse({ ...goodSign, spec: { ...goodSign.spec, font: 'Comic Sans' } }).success).toBe(false);
expect(signRequestSchema.safeParse({ ...goodSign, spec: { ...goodSign.spec, size: { width: 200, height: 4 } } }).success).toBe(false);
expect(signRequestSchema.safeParse({ ...goodSign, notes: 'n'.repeat(501) }).success).toBe(false);
expect(logoRequestSchema.safeParse({ ...goodLogo, termsAccepted: false }).success).toBe(false);
expect(logoRequestSchema.safeParse({ ...goodLogo, quantity: '3' }).data?.quantity).toBe(3);
expect(validateUpload({ type: 'image/png', size: 1000 }, 'preview')).toBeNull();
expect(validateUpload({ type: 'image/jpeg', size: 1000 }, 'preview')).not.toBeNull();
expect(validateUpload({ type: 'application/pdf', size: 1000 }, 'logo')).toBeNull();
expect(validateUpload({ type: 'image/gif', size: 1000 }, 'logo')).not.toBeNull();
expect(validateUpload({ type: 'image/png', size: 10 * 1024 * 1024 + 1 }, 'logo')).not.toBeNull();
```

(`goodLogo` is a complete valid logo payload with `termsAccepted: true`.)

- [ ] **Step 2: Run the tests**

Run `npm test`. Expected: FAIL.

- [ ] **Step 3: Implement `src/lib/validation.ts`**

- [ ] **Step 4: Run the tests**

Run `npm test`. Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -m "Add request validation schemas"`

---

### Task 3: Database schema and request store

**Files:**
- Create: `prisma/schema.prisma`, `prisma/migrations/0001_init/migration.sql`, `prisma/migrations/migration_lock.toml`, `src/server/db.ts`, `src/server/requestStore.ts`
- Modify: `package.json`. Set the build script to `prisma generate && prisma migrate deploy && next build`, and add `"postinstall": "prisma generate"`.
- Test: `src/server/requestStore.test.ts`

**Interfaces:**
- Produces:
  - `QuoteRequest` model, exactly as in the spec.
  - `LoginAttempt { id Int @id @default(autoincrement()), ipHash String, createdAt DateTime @default(now()), @@index([ipHash, createdAt]) }`. This records failed admin logins.
  - The datasource uses `url = env("DATABASE_URL")` and `directUrl = env("DATABASE_URL_UNPOOLED")`.
  - `prisma` (singleton from `src/server/db.ts`).
  - `formatRef(n: number | bigint): string` → `"AF-" + n`.
  - `nextRef(): Promise<string>`, from `SELECT nextval('quote_ref_seq')`.
  - `insertRequest(row: NewRequestRow): Promise<QuoteRequest>`, where `NewRequestRow` = every QuoteRequest field except `id`, `status`, `adminNote`, `emailError`, `createdAt` and `updatedAt`.
  - `countRecentByIp(ipHash: string, since: Date): Promise<number>`
  - `setEmailError(ref: string, message: string): Promise<void>`
  - `getRequest(ref: string): Promise<QuoteRequest | null>`
  - `listRequests(opts: { status?: Status; page: number }): Promise<{ items: QuoteRequest[]; total: number }>`: 50 per page, `createdAt desc`.
  - `updateRequest(ref: string, data: { status: Status; adminNote: string | null }): Promise<void>`
  - `countRecentFailedLogins(ipHash, since): Promise<number>`, `recordFailedLogin(ipHash): Promise<void>`
  - `type Status = 'new' | 'quoted' | 'won' | 'lost'`, `STATUSES`.

- [ ] **Step 1: Write the failing test**

`expect(formatRef(1001)).toBe('AF-1001'); expect(formatRef(1042n)).toBe('AF-1042');`

The store's query functions are thin Prisma calls. They're covered by the mocked service tests in Task 4 and by the preview check in Task 12.

- [ ] **Step 2: Run the test**

Run `npm test`. Expected: FAIL.

- [ ] **Step 3: Write the schema and migration**
  - Write `schema.prisma` and `npm i @vercel/blob resend html-to-image`.
  - Generate the migration SQL without a database: `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0001_init/migration.sql`.
  - Append `CREATE SEQUENCE quote_ref_seq START 1001;` to that file.
  - Write `migration_lock.toml` with `provider = "postgresql"`.

- [ ] **Step 4: Implement `db.ts`**

Use a global singleton in dev.

- [ ] **Step 5: Implement `requestStore.ts`**

`nextRef` uses `prisma.$queryRaw<{ nextval: bigint }[]>`.

- [ ] **Step 6: Run the checks**

Run `npm test && npx prisma validate && npx tsc --noEmit`. Expected: PASS.

- [ ] **Step 7: Commit**

`git commit -m "Add QuoteRequest schema, migration and request store"`

---

### Task 4: Submission service, storage and email

**Files:**
- Create: `src/server/ip.ts`, `src/server/storage.ts`, `src/server/email.ts`, `src/server/createRequest.ts`
- Test: `src/server/createRequest.test.ts`, `src/server/email.test.ts`, `src/server/ip.test.ts`

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces:
  - `clientIp(headers: Headers): string`: the first entry of `x-forwarded-for`, trimmed, or `"unknown"`.
  - `hashIp(ip: string, secret = process.env.IP_HASH_SECRET ?? ''): string`: sha256 hex of `ip + secret`.
  - `uploadRequestFile(ref: string, file: File): Promise<string>`: `put(\`requests/${ref}/${file.name}\`, file, { access: 'public', addRandomSuffix: true })` returning the url.
  - `renderOwnerEmail(req: QuoteRequest, adminUrl: string): { subject: string; html: string }`
    - The subject is exactly `New sign request AF-1042: $219.60`, or `New logo request AF-1042` for logos.
    - The html includes every detail field, the image, and a link to `${adminUrl}/admin/requests/<ref>`.
  - `renderCustomerEmail(req): { subject: string; html: string }`
    - The subject is `We got your request AF-1042`.
    - The html includes the summary, the price for signs, and `siteConfig.quotePromise`.
  - `sendOwnerNotification(req)`: sends to `NOTIFY_EMAIL`, from `RESEND_FROM ?? 'AuraForm <onboarding@resend.dev>'`.
  - `sendCustomerConfirmation(req)`: does nothing when `RESEND_FROM` is unset.
  - `type RequestDeps = { nextRef; insertRequest; countRecentByIp; setEmailError; uploadFile: (ref, file) => Promise<string>; notifyOwner: (req) => Promise<void>; confirmCustomer: (req) => Promise<void>; now: () => Date }`
  - `type SubmitInput = { kind: 'sign'; data: SignRequestInput; file: File } | { kind: 'logo'; data: LogoRequestInput; file: File | null }`
  - `createRequest(input: SubmitInput, ipHash: string, deps: RequestDeps): Promise<{ ok: true; ref: string } | { ok: false; status: 429 }>`
  - `defaultDeps: RequestDeps`, wired to the real modules.

  Field mapping for logo requests:
  - `name` = `firstName + ' ' + lastName`
  - `notes` = `description`
  - `details` = the remaining logo fields

  For signs: `details` = `spec`, and `priceCents = Math.round(calculatePrice(spec) * 100)`.

- [ ] **Step 1: Write the failing tests**

They use in-memory fake deps:

```ts
it('saves a valid sign request and returns its ref', ...)            // expect ok, ref 'AF-1001', insertRequest called once with priceCents 1800 for 10x3 inside
it('ignores a client-sent price', ...)                                 // data includes price: 1 → stored priceCents still 1800
it('saves even when the owner email throws', ...)                      // notifyOwner rejects → ok true, setEmailError('AF-1001', message)
it('returns 429 on the 6th submission in an hour', ...)                // countRecentByIp resolves 5 → { ok:false, status:429 }, insertRequest not called
it('counts the rate limit from now minus one hour', ...)               // countRecentByIp called with since = now - 3600_000
it('uploads before inserting and stores the url', ...)                 // uploadFile called with ('AF-1001', file); row.imageUrl === returned url
it('saves a logo request without a file', ...)                         // file null → uploadFile not called, imageUrl null, name 'Ana Ruiz'
// ip.test.ts
expect(clientIp(new Headers({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' }))).toBe('1.2.3.4');
expect(clientIp(new Headers())).toBe('unknown');
expect(hashIp('unknown', 's')).toMatch(/^[0-9a-f]{64}$/);
// email.test.ts
expect(renderOwnerEmail(signReq, 'https://x').subject).toBe('New sign request AF-1042: $219.60');
expect(renderOwnerEmail(signReq, 'https://x').html).toContain('https://x/admin/requests/AF-1042');
expect(renderCustomerEmail(signReq).html).toContain("We'll email your quote within 24 hours.");
expect(renderCustomerEmail(signReq).html).not.toMatch(/scotty|light my logo/i);
```

- [ ] **Step 2: Run the tests**

Run `npm test`. Expected: FAIL.

- [ ] **Step 3: Implement the modules**
  - `ip.ts`, `storage.ts` and `email.ts`.
  - Escape every customer string in the email HTML with a small `escapeHtml`.

- [ ] **Step 4: Implement `createRequest`**

The order is:
1. rate check
2. `nextRef`
3. upload
4. insert
5. owner email, and customer email when `RESEND_FROM` is set, each in its own try/catch → `setEmailError`
6. return the ref

- [ ] **Step 5: Run the tests**

Run `npm test && npx tsc --noEmit`. Expected: PASS.

- [ ] **Step 6: Commit**

`git commit -m "Add request submission service with storage and email"`

---

### Task 5: Submit API routes

**Files:**
- Create: `src/app/api/requests/sign/route.ts`, `src/app/api/requests/logo/route.ts`, `src/app/api/requests/parse.ts`
- Test: `src/app/api/requests/routes.test.ts`

**Interfaces:**
- Consumes: `createRequest`, `defaultDeps`, the schemas, `validateUpload`, `clientIp`, `hashIp`.
- Produces: `POST` multipart endpoints.
  - **Sign:** fields `payload` (JSON string of `SignRequestInput`) and `preview` (a PNG file).
  - **Logo:** the form fields themselves, plus an optional `design` file.
  - **Both:** honour `company_website` (honeypot).
  - **Responses:**
    - `200 { ref: string | null }`
    - `400 { errors: Record<string, string[]> }` (from zod `flatten().fieldErrors`, plus `file` for upload errors)
    - `429 { error: 'Too many requests. Please try again later.' }`
  - Both routes set `export const runtime = 'nodejs'`.
  - Each route exports `handleSign(req, deps)` / `handleLogo(req, deps)` from `parse.ts` so it can be tested. `POST` calls them with `defaultDeps`.

- [ ] **Step 1: Write the failing tests**

They build `Request` objects with `FormData`:

```ts
it('returns 200 with ref for a valid sign request')
it('returns 200 { ref: null } and saves nothing when company_website is filled')
it('returns 400 with field errors for an invalid email')
it('returns 400 { errors: { file } } for a JPEG preview')
it('returns 429 when createRequest reports the limit')
it('accepts a logo request with no design file')
```

- [ ] **Step 2: Run the tests**

Run `npm test`. Expected: FAIL.

- [ ] **Step 3: Implement `parse.ts` and the two thin route files**

- [ ] **Step 4: Run the tests**

Run `npm test && npx tsc --noEmit`. Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -m "Add sign and logo request API routes"`

---

### Task 6: Admin session, login and middleware

**Files:**
- Create: `src/server/adminSession.ts`, `src/middleware.ts`, `src/app/admin/login/page.tsx`, `src/app/admin/login/actions.ts`
- Test: `src/server/adminSession.test.ts`

**Interfaces:**
- Produces:
  - `SESSION_COOKIE = 'af_admin'`, `SESSION_TTL_MS = 7 * 24 * 3600_000`
  - `signSession(expiresAt: number, secret: string): Promise<string>`. The token format is `${expiresAt}.${base64url(HMAC-SHA256(secret, String(expiresAt)))}`, computed with `crypto.subtle`.
  - `verifySession(token: string | undefined, now: number, secret: string): Promise<boolean>`
  - `checkPassword(input: string, expected: string): Promise<boolean>`. Compares SHA-256 digests with a constant-time byte loop.
  - `sessionCookieOptions(): { httpOnly: true; sameSite: 'lax'; secure: boolean; path: '/'; maxAge: number }`, where `secure = process.env.NODE_ENV === 'production'`.
  - `requireAdmin(): Promise<void>`. For server components and actions: it reads the cookie and calls `redirect('/admin/login')` if the session is invalid.
  - `login(formData)` server action:
    - On a correct password: set the cookie, then `redirect('/admin')`.
    - On a wrong password: `recordFailedLogin`, then return `{ error: 'Wrong password' }`.
    - If 10 or more failed logins in the last hour: return `{ error: 'Too many attempts. Try again later.' }` without checking the password.
  - The middleware `matcher: ['/admin/:path*']` skips `/admin/login`. If the session is invalid, it redirects to `/admin/login`.

- [ ] **Step 1: Write the failing tests**

```ts
const t = await signSession(Date.now() + 1000, 's');
expect(await verifySession(t, Date.now(), 's')).toBe(true);
expect(await verifySession(t, Date.now() + 2000, 's')).toBe(false);          // expired
expect(await verifySession(t.replace(/.$/, 'x'), Date.now(), 's')).toBe(false); // tampered
expect(await verifySession(t, Date.now(), 'other')).toBe(false);
expect(await verifySession(undefined, Date.now(), 's')).toBe(false);
expect(await checkPassword('hunter2', 'hunter2')).toBe(true);
expect(await checkPassword('hunter3', 'hunter2')).toBe(false);
vi.stubEnv('NODE_ENV', 'development'); expect(sessionCookieOptions().secure).toBe(false);
vi.stubEnv('NODE_ENV', 'production');  expect(sessionCookieOptions().secure).toBe(true);
```

- [ ] **Step 2: Run the tests**

Run `npm test`. Expected: FAIL.

- [ ] **Step 3: Implement the session code, middleware and login**
  - Implement `adminSession.ts`, the middleware, and the login page and action.
  - The login page has one password field and shows the action's error inline.

- [ ] **Step 4: Run the checks**

Run `npm test && npx tsc --noEmit`. Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -m "Add admin password login and session middleware"`

---

### Task 7: Admin list and detail

**Files:**
- Create: `src/app/admin/page.tsx`, `src/app/admin/requests/[ref]/page.tsx`, `src/app/admin/requests/[ref]/actions.ts`, `src/app/admin/format.ts`
- Test: `src/app/admin/format.test.ts`

**Interfaces:**
- Consumes: `listRequests`, `getRequest`, `updateRequest`, `STATUSES`, `requireAdmin`.
- Produces:
  - `formatPrice(cents: number | null): string`: `'$219.60'`, or `'—'` when null.
  - `summarize(req: QuoteRequest): string`. For a sign: `"Open Late" · Pacifico · Pink · 13×4 in · Cut to Shape · inside`. For a logo: `Logo · business · md · qty 2`.
  - `saveRequest(ref, formData)` server action. It calls `requireAdmin()`, validates the status against `STATUSES` and the note at ≤2000 characters, calls `updateRequest`, then `revalidatePath`.

- [ ] **Step 1: Write the failing tests**

Cover both `formatPrice` cases (number and null), `summarize` for a sign row and a logo row, and confirm `summarize` output never includes the email or phone.

- [ ] **Step 2: Run the tests**

Run `npm test`. Expected: FAIL.

- [ ] **Step 3: Implement the format helpers and both pages**
  - **List** (`?status=&page=`): status filter links, the columns from the spec, and 50 per page with prev and next links.
  - **Detail:** all fields, `<img src={imageUrl}>` (or a download link for PDF and SVG logos), the `emailError` banner when set, and a form with a status `<select>`, a note `<textarea>` and Save.

- [ ] **Step 4: Run the checks**

Run `npm test && npx tsc --noEmit`. Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -m "Add admin request list and detail pages"`

---

### Task 8: Sign builder at /design

**Files:**
- Move: `git mv src/app/CustomSign src/app/design`
- Modify: `src/app/design/page.tsx`, `src/app/design/components/{TextInput,TextDisplay,PresetSizeSelector,CustomSizeSelector,LocationSelector,Footer}.jsx`, `next.config.mjs` (redirects)
- Create: `src/config/fonts.ts`, `src/app/design/RequestForm.tsx`, `src/app/design/submitSign.ts`
- Delete: `src/app/design/components/AddToCartButton.jsx`
- Test: `src/app/design/submitSign.test.ts`

**Interfaces:**
- Consumes: `SignSpec`, the options, `calculatePrice`, `heightForWidth`, `siteConfig`.
- Produces:
  - `builderFonts: Record<Font, { className: string; style: { fontFamily: string } }>`: `next/font/google` loaders, `display: 'swap'`.
  - `submitSign(input: { contact: ContactFields; spec: SignSpec; preview: Blob; honeypot: string }, fetchFn = fetch): Promise<{ ok: true; ref: string | null } | { ok: false; errors: Record<string, string[]> | null; message: string }>`

**State and component behavior:**
- **Page state:** a single `spec: SignSpec`, defaulting to `{ text: '', font: 'Pacifico', glowColor: 'Pink', tubeColor: 'White', size: PRESET_SIZES[0] dims, backing: 'Cut to Shape', location: 'inside' }`.
- **Sizes:** a preset sets `size`. The custom width input sets `{ width, height: heightForWidth(width) }`.
- **Text:**
  - `TextInput` becomes a `<textarea rows={3}>`. It blocks a 4th line and shows a `n/60` counter.
  - `TextDisplay` renders the lines, uses `builderFonts[font].style.fontFamily`, and defaults the glow to on.
- **Price:** `Footer` shows `calculatePrice(spec)` and a **Request this sign** button that opens `RequestForm`.
- **`RequestForm`** has:
  - name, email, phone and notes fields
  - a hidden `company_website` input, positioned off-screen with `tabIndex={-1}` and `autoComplete="off"`
  - on submit: disable the button, then `toBlob(previewNode, { pixelRatio: 2 })` from html-to-image, then `submitSign`
  - on success: `router.push('/request/' + (ref ?? 'received'))`
  - on error: show the errors inline
- **Redirects:** in `next.config.mjs`, `/CustomSign` → `/design` and `/CustomLogo` → `/logo`, both `permanent: true`.

- [ ] **Step 1: Write the failing tests**

```ts
it('posts multipart with payload JSON and preview to /api/requests/sign')   // inspect FormData: payload parses to {name,email,spec}, preview is the Blob, no price key
it('returns ok with ref on 200')
it('returns field errors on 400')
it('returns a rate-limit message on 429')
it('only calls fetch once when invoked twice concurrently with the same in-flight guard') // submitSign is wrapped by a once-in-flight guard exported as createSubmitter()
```

(`createSubmitter(fn)` returns a function that resolves pending calls to the same promise while one is in flight. Both `RequestForm` and the logo form use it.)

- [ ] **Step 2: Run the tests**

Run `npm test`. Expected: FAIL.

- [ ] **Step 3: Implement the builder**
  - `fonts.ts`, `submitSign.ts` and `createSubmitter` (in `src/lib/createSubmitter.ts`).
  - The builder component changes and the redirects.
  - Remove the `@import` lines in `globals.css` for the 13 builder fonts. Keep only the fonts still used elsewhere.

- [ ] **Step 4: Run the checks**

Run `npm test && npx tsc --noEmit`. Expected: PASS.

- [ ] **Step 5: Manual check**

Run `npm run dev`. Then:
1. Open `/design`, type two lines, and choose Monoton, Outside and Large. The footer should show `$83.16`.
2. Visit `/CustomSign`. It should redirect to `/design`.
3. Open the request form and check that the preview Blob, logged in dev, shows Monoton and not a fallback font.

- [ ] **Step 6: Commit**

`git commit -m "Rebuild sign builder at /design with quote request form"`

---

### Task 9: Logo request at /logo

**Files:**
- Move: `git mv src/app/CustomLogo src/app/logo`
- Modify: `src/app/logo/page.tsx`
- Create: `src/app/logo/submitLogo.ts`
- Test: `src/app/logo/submitLogo.test.ts`

**Interfaces:**
- Consumes: `createSubmitter`, the `logoRequestSchema` field names.
- Produces: `submitLogo(form: FormData, fetchFn = fetch)`, with the same result type as `submitSign`. It posts to `/api/requests/logo`.

- [ ] **Step 1: Write the failing tests**

```ts
it('posts the FormData as-is to /api/requests/logo')
it('returns field errors on 400')
it('returns ok with ref on 200')
```

- [ ] **Step 2: Run the tests**

Run `npm test`. Expected: FAIL.

- [ ] **Step 3: Implement the logo form**
  - Replace EmailJS. Rename the inputs to the schema names: `customerType` (hidden input from the Individual/Business toggle), `description`, `size`, `quantity`, `deadline`, `firstName`, `lastName`, `email`, `phone`, `promotions`, `smsNotifications`, `termsAccepted`.
  - Add the `design` file input with `accept=".png,.jpg,.jpeg,.svg,.pdf"`, the honeypot, the in-flight guard, inline errors, and a redirect to `/request/<ref>` on success.

- [ ] **Step 4: Run the checks**

Run `npm test && npx tsc --noEmit`. Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -m "Move logo form to /logo and submit to the request API"`

---

### Task 10: Confirmation page

**Files:**
- Create: `src/app/request/[ref]/page.tsx`, `src/app/request/[ref]/confirmation.ts`
- Test: `src/app/request/[ref]/confirmation.test.ts`

**Interfaces:**
- Consumes: `getRequest`, `summarize`, `formatPrice`, `siteConfig`.
- Produces: `confirmationView(req: QuoteRequest | null, ref: string): { heading: string; summary: string | null; price: string | null; promise: string }`
  - **With a request:** the heading is `Request ${ref} received`, plus the summary and the price. The price is null for logos.
  - **With null:** the heading is `Request received`, and both summary and price are null.

- [ ] **Step 1: Write the failing tests**

```ts
expect(confirmationView(signReq, 'AF-1042')).toEqual({ heading: 'Request AF-1042 received', summary: expect.stringContaining('Open Late'), price: '$219.60', promise: "We'll email your quote within 24 hours." });
expect(confirmationView(null, 'AF-9999').heading).toBe('Request received');
expect(confirmationView(null, 'received').summary).toBeNull();
expect(JSON.stringify(confirmationView(signReq, 'AF-1042'))).not.toContain(signReq.email);
```

- [ ] **Step 2: Run the tests**

Run `npm test`. Expected: FAIL.

- [ ] **Step 3: Implement the confirmation view and page**

The page calls `getRequest` only when the ref matches `/^AF-\d+$/`.

- [ ] **Step 4: Run the checks**

Run `npm test && npx tsc --noEmit`. Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -m "Add request confirmation page"`

---

### Task 11: Rebrand and remove old code

**Files:**
- Modify: `src/app/layout.tsx`, `src/components/Header.tsx`, `src/components/MainFooter.tsx`, `src/components/ui/HamburgerMenu.js`, `src/app/page.tsx`, `src/components/{HeroSection,CallToActionSection,DigitalSignsSection,WhyChooseUsSection,BenefitsSection,TestimonialSection,CustomerTestimonials}.tsx/jsx`, `src/app/About/**`, the five policy pages, `README.md`, `package.json`
- Delete: `src/components/{Cart.tsx,Checkout.tsx,CheckoutForm.jsx,PhotoCarousel.jsx}`, `src/hooks/useCart.ts`, `public/pictures/`, `public/videos/`, `public/logo/SBLEDSLogo.png`
- Test: `src/brand.test.ts`

**Requirements:**
- **Layout and metadata:**
  - The layout metadata is `title: 'AuraForm | Custom LED Neon Signs'`, with a description about custom LED neon signs and lit logos.
  - The layout renders `Header`/`MainFooter` once. Remove the extra `<Header />` in pages.
- **Header and footer:**
  - The header is a text wordmark "AuraForm" (gradient as today), with nav links Home, Design a Sign (`/design`), Logo Quote (`/logo`) and About.
  - Remove the footer's Scotty social links and logo.
- **Home and images:**
  - The home page hero has CTAs to `/design` and `/logo`.
  - The sections drop every `/pictures` and `/videos` reference and use CSS glow text instead.
  - Remove the testimonials. They were Scotty's customers.
- **Placeholder copy:** the About and policy pages say AuraForm. Business-specific statements become `TODO(Octavio): …` paragraphs. Don't invent team members, history, refund windows or shipping times.
- **Packages:**
  - Uninstall each listed package after `grep` confirms nothing imports it: `@stripe/react-stripe-js`, `@stripe/stripe-js`, `stripe`, `react-router-dom`, `bcryptjs`, `jsonwebtoken`, `@emailjs/browser`, `axios`, `zustand`, `flowbite`, `html2canvas`.
  - Uninstall their `@types/*` packages too.

- [ ] **Step 1: Write the failing test**

`src/brand.test.ts` walks `src/` and fails if any file matches `/scotty|sbled|light my logo/i`. It skips `*.test.ts`.

- [ ] **Step 2: Run the test**

Run `npm test`. Expected: FAIL, listing the files that still mention the old brand.

- [ ] **Step 3: Rebrand and remove**

Apply the requirements above.

- [ ] **Step 4: Run the checks**

Run `npm test && npx tsc --noEmit && npx next lint && npm run build`. Expected: PASS. The build can run without a database if `prisma migrate deploy` is skipped locally, so run `npx prisma generate && npx next build`.

- [ ] **Step 5: Commit**

`git commit -m "Rebrand to AuraForm and remove cart, checkout and old photos"`

---

### Task 12: Preview deploy and end-to-end check

**Steps:**
- [ ] **Step 1: Push the branch and open a draft PR**

Push `feat/auraform-quote-requests` and open a draft PR. The description lists the setup steps for Octavio.

- [ ] **Step 2: Octavio sets up the services**

Octavio, with Claude's step-by-step help:
1. Reconnect the Vercel Git integration to `OctavioWebDev/ligt-my-logo`.
2. Add Neon and Blob to the project from Storage.
3. Set `RESEND_API_KEY`, `NOTIFY_EMAIL` (his Resend account email), `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` and `IP_HASH_SECRET` for Preview and Production. Claude generates the two secrets with `openssl rand -hex 32`.

- [ ] **Step 3: Confirm the preview build**

Check that the preview deployment is READY. `prisma migrate deploy` must have created the table and the sequence.

- [ ] **Step 4: Run the checklist on the preview URL**
  1. Submit a sign. The page redirects to `/request/AF-1001`.
  2. Octavio receives the email with the preview image.
  3. The admin list shows the request, and the detail page shows the image. Change the status to Quoted and add a note, then reload: both persist.
  4. Submit a logo request with a PDF. You get `AF-1002`, and the admin page has a download link.
  5. Submit a 6th request within the hour. The form shows the rate-limit message.
  6. Visit `/admin` in a private window. It redirects to the login page.

- [ ] **Step 5: Hand back to Octavio**

Mark the PR ready. Octavio merges, and the post-launch rename to `auraform` is a separate follow-up.
