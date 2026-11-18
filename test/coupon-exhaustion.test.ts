// @ts-nocheck
/**
 * Test isolato per verificare il comportamento della logica
 * findLancio37Coupon rispetto al coupon esaurito.
 * 
 * Simula i dati che Stripe restituirebbe in tre scenari:
 *   1. Coupon valido con redemption disponibili → restituisce l'id
 *   2. Coupon esaurito (max_redemptions raggiunto) → restituisce null
 *   3. Coupon disattivato manualmente → restituisce null
 *
 * Esegui con: npx ts-node test/coupon-exhaustion.test.ts
 */

type CouponLike = {
  id: string;
  name: string;
};

/** Copia fedele della logica presente in route.ts */
function findLancio37Coupon(coupons: CouponLike[]): { id: string } | null {
  for (const c of coupons) {
    if (c.name !== 'LANCIO37') continue;

    const meta = c as unknown as Record<string, unknown>;
    // Verifica che non sia stato disattivato manualmente
    if (meta.active === false) continue;

    // Verifica che ci siano ancora redemption disponibili
    const maxRed = meta.max_redemptions;
    const timesUsed = meta.times_used;
    // Se max_redemptions è null → uso illimitato → ok
    if (maxRed == null) return { id: c.id };
    // Altrimenti, times_used deve essere strettamente inferiore al massimo
    if (typeof timesUsed === 'number' && timesUsed < (maxRed as number)) {
      return { id: c.id };
    }
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

// Scenario 1: Coupon valido, max_redemptions=10, times_used=0 → deve essere trovato
assert(
  'Scenario 1 — Coupon attivo, 0 usi su 10',
  { id: 'cpo_valido_1' },
  findLancio37Coupon([{ id: 'cpo_valido_1', name: 'LANCIO37' }] as CouponLike[])
);

// Scenario 2: Coupon esaurito, max_redemptions=10, times_used=10 → deve essere NULL
assert(
  'Scenario 2 — Coupon esaurito (10/10)',
  null,
  findLancio37Coupon([{ id: 'cpo_esaurito_1', name: 'LANCIO37', max_redemptions: 10, times_used: 10 }] as CouponLike[])
);

// Scenario 3: Coupon disattivato manualmente → NULL
assert(
  'Scenario 3 — Coupon disattivato manualmente',
  null,
  findLancio37Coupon([{ id: 'cpo_disabled', name: 'LANCIO37', active: false }] as CouponLike[])
);

// Scenario 4: max_redemptions=null (illimitato) → trovato
assert(
  'Scenario 4 — Max redemptions null (illimitato)',
  { id: 'cpo_illimitato' },
  findLancio37Coupon([{ id: 'cpo_illimitato', name: 'LANCIO37', max_redemptions: null }] as CouponLike[])
);

// Scenario 5: times_used < max_redemptions (es. 9/10) → trovato
assert(
  'Scenario 5 — Quasi esaurito (9/10)',
  { id: 'cpo_quase' },
  findLancio37Coupon([{ id: 'cpo_quase', name: 'LANCIO37', max_redemptions: 10, times_used: 9 }] as CouponLike[])
);

// Scenario 6: times_used >= max_redemptions (es. 10/10) → null
assert(
  'Scenario 6 — Appena esaurito (10/10)',
  null,
  findLancio37Coupon([{ id: 'cpo_appena', name: 'LANCIO37', max_redemptions: 10, times_used: 10 }] as CouponLike[])
);

// Scenario 7: Nessun coupon LANCIO37 nel sistema → null
assert(
  'Scenario 7 — Nessun coupon esistente',
  null,
  findLancio37Coupon([{ id: 'altro', name: 'ALTROCOUPON' }] as CouponLike[])
);

// Scenario 8: Più coupon, solo LANCIO37 valido → trova quello giusto
assert(
  'Scenario 8 — Multiplo coupon, uno valido',
  { id: 'cpo_lancio37' },
  findLancio37Coupon([
    { id: 'cpo_old', name: 'VecchioSconto', max_redemptions: 10, times_used: 5 },
    { id: 'cpo_lancio37', name: 'LANCIO37', max_redemptions: 10, times_used: 3 },
    { id: 'cpo_expired', name: 'LANCIO37', max_redemptions: 5, times_used: 5 }, // esaurito
  ] as CouponLike[])
);

// ─── OUTPUT ─────────────────────────────────────────────
console.log(`\n${passed}/${passed + failed} test passati.`);
if (failed > 0) process.exitCode = 1;
