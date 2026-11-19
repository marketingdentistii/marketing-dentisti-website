// @ts-nocheck
/**
 * Test isolato per verificare il comportamento della logica
 * findLancio37Coupon rispetto al coupon esaurito.
 *
 * Simula i dati che Stripe restituisce (campi `valid` e `times_redeemed`):
 *   1. Coupon valido con redemption disponibili → restituisce l'id
 *   2. Coupon esaurito (times_redeemed >= max_redemptions) → restituisce null
 *   3. Coupon non valido (valid === false, es. scaduto o disattivato) → restituisce null
 *
 * Esegui con: npx ts-node test/coupon-exhaustion.test.ts
 */

type CouponLike = {
  id: string;
  name: string | null;
  valid?: boolean;
  max_redemptions?: number | null;
  times_redeemed?: number;
};

/** Copia fedele della logica presente in route.ts */
function findLancio37Coupon(coupons: CouponLike[]): { id: string } | null {
  for (const coupon of coupons) {
    if (coupon.name !== 'LANCIO37') continue;
    if (coupon.valid === false) continue;

    const maxRedemptions = coupon.max_redemptions ?? null;
    const timesRedeemed = coupon.times_redeemed ?? 0;
    if (maxRedemptions !== null && timesRedeemed >= maxRedemptions) continue;

    return { id: coupon.id };
  }

  return null;
}

// ─── TESTS ──────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(label: string, expected: { id: string } | null, actual: { id: string } | null) {
  const expStr = expected ? JSON.stringify(expected) : 'null';
  const actStr = actual ? JSON.stringify(actual) : 'null';
  if (JSON.stringify(expected) === JSON.stringify(actual)) {
    console.log(`✅ ${label}: ${expStr}`);
    passed++;
  } else {
    console.log(`❌ ${label}: atteso ${expStr}, ottenuto ${actStr}`);
    failed++;
  }
}

// Scenario 1: coupon valido, 0 usi su 10 → deve essere trovato (caso reale LANCIO37)
assert(
  'Scenario 1 — Coupon valido, 0 usi su 10',
  { id: 'cpo_valido_1' },
  findLancio37Coupon([
    { id: 'cpo_valido_1', name: 'LANCIO37', valid: true, max_redemptions: 10, times_redeemed: 0 },
  ])
);

// Scenario 2: coupon esaurito, 10 usi su 10 → NULL
assert(
  'Scenario 2 — Coupon esaurito (10/10)',
  null,
  findLancio37Coupon([
    { id: 'cpo_esaurito_1', name: 'LANCIO37', valid: true, max_redemptions: 10, times_redeemed: 10 },
  ])
);

// Scenario 3: coupon non valido → NULL
assert(
  'Scenario 3 — Coupon non valido (valid false)',
  null,
  findLancio37Coupon([
    { id: 'cpo_disabled', name: 'LANCIO37', valid: false, max_redemptions: 10, times_redeemed: 0 },
  ])
);

// Scenario 4: max_redemptions null (illimitato) → trovato
assert(
  'Scenario 4 — Max redemptions null (illimitato)',
  { id: 'cpo_illimitato' },
  findLancio37Coupon([
    { id: 'cpo_illimitato', name: 'LANCIO37', valid: true, max_redemptions: null, times_redeemed: 42 },
  ])
);

// Scenario 5: quasi esaurito (9/10) → trovato
assert(
  'Scenario 5 — Quasi esaurito (9/10)',
  { id: 'cpo_quasi' },
  findLancio37Coupon([
    { id: 'cpo_quasi', name: 'LANCIO37', valid: true, max_redemptions: 10, times_redeemed: 9 },
  ])
);

// Scenario 6: superato il tetto (11/10) → NULL
assert(
  'Scenario 6 — Oltre il tetto (11/10)',
  null,
  findLancio37Coupon([
    { id: 'cpo_oltre', name: 'LANCIO37', valid: true, max_redemptions: 10, times_redeemed: 11 },
  ])
);

// Scenario 7: nessun coupon LANCIO37 nel sistema → NULL
assert(
  'Scenario 7 — Nessun coupon esistente',
  null,
  findLancio37Coupon([{ id: 'altro', name: 'ALTROCOUPON', valid: true }])
);

// Scenario 8: più coupon, solo LANCIO37 valido → trova quello giusto
assert(
  'Scenario 8 — Più coupon, uno valido',
  { id: 'cpo_lancio37' },
  findLancio37Coupon([
    { id: 'cpo_old', name: 'VecchioSconto', valid: true, max_redemptions: 10, times_redeemed: 5 },
    { id: 'cpo_lancio37', name: 'LANCIO37', valid: true, max_redemptions: 10, times_redeemed: 3 },
    { id: 'cpo_expired', name: 'LANCIO37', valid: false, max_redemptions: 5, times_redeemed: 5 },
  ])
);

// ─── OUTPUT ─────────────────────────────────────────────
console.log(`\n${passed}/${passed + failed} test passati.`);
if (failed > 0) process.exitCode = 1;
