# Pacchetto low-cost — Decisione (17/11/2026)

> Documento di decisione con potere decisionale delegato dall'utente.
> Copre: prodotto, prezzo, pagamenti, fiscalità (da confermare), integrazione nel funnel, piano di build.
> Tutti i numeri "verificati" hanno fonte e data. Tutto il resto è scelta motivata o `[PARENTESI]`.

---

## 1. Verdetto in cinque righe

- **Prodotto**: "Kit Segreteria Completo" `[NOME DA CONFERMARE]` — 7 moduli a pagamento che coprono ciò che il kit gratuito non copre (pazienti che NON tornano: richiami, riattivazioni, preventivi, recensioni, referral). Stessa catena di produzione del gratuito: `.md` → pagina stampa → PDF/link riservato.
- **Prezzo**: **€97**, lancio a **€37 per i primi 10 studi** (verificabile dallo storico Stripe, non finto countdown).
- **Pagamenti**: **Stripe Payment Links** (fee 1,5% + 0,25 € carte SEE standard — verificato oggi su stripe.com/it/pricing). Niente Gumroad, niente Lemon Squeezy (motivi tabella §4).
- **Consegna**: link riservato con token (`/kit-completo/stampa?t=...`) inviato da n8n workflow **1J** (trigger Stripe) + pagina di conferma ordine. Il PDF del kit completo NON va in `public/`.
- **Fiscalità**: verifica fatta su fonti primarie (§5): per questo modello la P.IVA serve — l'attività è abituale/continua per costruzione. Regime e ATECO restano dal commercialista.

## 2. Perché un prodotto low-cost serve (e cosa deve fare davvero)

Funnel attuale: kit gratis → call → Setup €497 → retainer. Tra "gratis" ed "€497 con call" oggi non c'è nulla: chi non prenota resta fermo. Il prodotto a pagamento basso ha tre lavori, in ordine di importanza:

1. **Qualificare i compratori**: un iscritto che ha già aperto la carta è il lead più caldo per il Setup; alimenta la lista "Clienti" invece della sola lista email.
2. **Auto-pagarsi il traffico** quando partiranno le ads (self-liquidating offer).
3. **Entrate nei primi mesi**, quando la call converte poco perché non c'è ancora reputazione.

Non è il sostituto del Setup: differenziazione netta **kit = li applica lo studio da solo / Setup = lo implementiamo noi**. 1 vendita di Setup ≈ 5 vendite di kit (497/95,29 ≈ 5,2): il kit non deve cannibalizzare, deve reclutare.

## 3. Prezzo — la matematica (aritmetica, non previsioni)

Fee Stripe carte SEE standard: 1,5% + 0,25 € (fonte: stripe.com/it/pricing, consultato 17/11/2026).

| Prezzo | Fee Stripe | Netta per vendita |
|---|---|---|
| €37 | €0,81 | **€36,19** |
| €97 | €1,71 | **€95,29** |

Scenario obiettivo €2.000/mese di nettezza (ipotesi, non previsione):

| Prezzo | Vendite necessarie/mese |
|---|---|
| €37 | ~55 (≈ 1,9 al giorno) |
| €97 | ~21 |

**Perché €97 e non €37 come prezzo stabile**: l'utente aveva indicato €37 come "fonte principale". A €37 quel ruolo richiede un volume irrealistico senza budget ads (§ matematica). Il buyer è uno studio dentistico: per un medico €37 e €97 sono entrambi sotto la soglia di riflessione — il prezzo non è l'attrito, lo è la fiducia. Con la stessa frizione d'acquisto, €97 rende 2,6×. €197 aggiungerebbe una prima vera esitazione a freddo su un prodotto senza reputazione: rinviato a dopo i primi dati.

**Perché il lancio a €37 comunque**: onora l'intuizione dell'utente come prezzo fondatore (i primi 10 comprano a €37 — cifra verificabile), genera le prime vendite e le prime testimonianze `[DA RACCOGLIERE]` che poi reggono il prezzo a €97.

## 4. Pagamenti — confronto e scarto

| Opzione | Fee (verificato 17/11/2026) | Note decisive | Verdetto |
|---|---|---|---|
| **Stripe** (PSP, vendi tu) | 1,5% + 0,25 € carte SEE; Payment Links senza costi aggiuntivi; fattura auto post-pagamento 0,4% (max 2 USD); 0 canoni | N8n ha il trigger Stripe nativo; bonifici su IBAN IT; IVA/fatture elettroniche restano a carico mio + commercialista | ✅ **Scelto** |
| **Gumroad** (merchant of record) | 10% + 0,50 $ sui link diretti; **30%** sulle vendite da Discover (fonte: gumroad.com/pricing) | MoR = la ricevuta è emessa da Gumroad, non da me: per un cliente B2B italiano che chiede fattura elettronica è un impiccio, non un vantaggio; fee ~5× Stripe | ❌ |
| **Lemon Squeezy** (MoR) | 5% + 50¢ | **Non accetta più nuove registrazioni e chiuderà il 31/03/2027** (banner su lemonsqueezy.com/pricing) | ❌ chiuso fuori |
| **PayPal diretto** | non verificato oggi (pagina fees irraggiungibile) — `[DA VERIFICARE]` | Integrazione webhook + lista acquisti più fragloide via n8n rispetto a Stripe | ❌ per ora; attivabile come *metodo dentro Stripe* se un cliente lo chiede |

## 5. Fiscalità — Esito della verifica (fonti primarie, 17/11/2026)

**Non esiste una regola "fino a tot di guadagno senza P.IVA".** La confusione viene dalla franchigia di **5.000 €/anno** sui **contributi** INPS Gestione Separata (art. 2 c. 26 L. 335/1995): sotto quella cifra chi fa lavoro autonomo occasionale non paga contributi; sopra, scatta l'iscrizione alla Gestione Separata sull'eccedenza — ma nemmeno questo obbliga, di per sé, ad aprire P.IVA. Fonti: INPS, scheda "I contributi dei lavoratori autonomi occasionali"; INPS Circolare 27 del 30/01/2025 (aliquote Gestione Separata 2025).

**Quando serve la P.IVA (criterio qualitativo, non di importo)**: l'Agenzia delle Entrate (pagina "Informazioni per specifiche categorie di lavoratori", consultata 17/11/2026) distingue il lavoro autonomo **occasionale** — che si caratterizza per l'assenza di professionalità, abitualità, continuità e coordinazione (FiscoOggi, rivista dell'Agenzia) — dall'attività abituale/continua, per la quale scattano obbligo di P.IVA e relativi adempimenti. Il superamento dei 5.000 € di per sé non obbliga alla P.IVA (diversi commercialisti lo confermano), ma l'abitualità sì, a prescindere dall'importo.

**Applicato a questo business**: sito con listino prezzi, funnel che vende kit in modo continuativo, retainer mensili = attività abituale e continuativa per definizione. La prestazione occasionale può coprire l'una-tantum sporadica, non può essere la fonte principale di un'agenzia. Risposta onesta: **per operare come progettato serve P.IVA** (regime forfettario la strada più probabile, §5-bis).

**Stripe senza P.IVA — tecnicamente sì, giuridicamente irrilevante**: la pagina "Stripe in Italia" (support.stripe.com, consultata 17/11/2026) richiede, tra i dati: codice fiscale italiano, indirizzo, documento, "numero di partita IVA (se registrati ai fini IVA) **o** codice fiscale (se non registrati ai fini IVA)". Stripe quindi apre l'account anche a chi non ha P.IVA; questo non rende legale vendere in modo continuativo in regime occasionale — i requisiti di Stripe sono bancabili, non fiscali.

**Il problema pratico dello scontrino, non solo legale**: un dentista che compra a €97 è un cliente B2B e quasi sempre chiede **fattura elettronica**. Senza P.IVA non si può emettere fattura: si emette solo ricevuta per prestazione occasionale (con ritenuta d'acconto 20% se il committente è sostituto d'imposta, marca da bollo 2 € oltre 77,47 €). Vendere 20 kit/mese con 20 ricevute occasionali è anche esteticamente impossibile: il cliente Business non le accetta.

### 5-bis. Quanto costa davvero la P.IVA (numeri verificati 17/11/2026)

| Voce | Valore | Fonte |
|---|---|---|
| Apertura P.IVA libero professionista (modello AA9/12) | **€ 0** — nessuna Camera di Commercio, numero assegnato online | agenziaentrate.gov.it (scheda AA9/12); fiscozen.it guida aggiornata 06/2026 |
| Apertura ditta individuale (commercio) | € 88,50 diritti/bolli CCIAA + iscrizioni | fiscozen.it 06/2026 |
| Imposta sostitutiva forfettario | 5% per 5 anni (requisiti start-up: niente attività simile nei 3 anni precedenti, non mera prosecuzione di lavoro dipendente), poi 15%; tetto 85.000 €, uscita immediata oltre 100.000 € | L. 190/2014 art. 1 c. 54-89; fiscozen.it |
| Coefficiente di redditività | professioni 78%, commercio 40% | tabelle L. 190/2014 |
| INPS Gestione Separata (professionista senza cassa) | aliquota 26,07% (24% se pensionato o già iscritto ad altra forma); **minimale di reddito 2025 € 18.555 → contributo minimo ~€ 4.837/anno anche con reddito basso**, salvo esonero | INPS Circolare 27/30.01.2025 (sintesi ergonstp.it) |
| INPS commercianti (ditta) fissi 2026 | **€ 4.611,64/anno fissi anche a zero incassi** + variabile 24,48% oltre € 18.808; riduzione 35% per forfettari su domanda, o 50% primi 3 anni per nuove iscrizioni (requisiti da verificare) | fiscozen.it 06/2026; circolari INPS |
| Occasionale con committente-business | ritenuta d'acconto 20% operata dal committente → su € 97 lordi incassi € 77,60 netti; bollo € 2 su ricevuta > € 77,47 | leggeinchiaro.it (già verificato) |
| Account Stripe | apribile anche con solo codice fiscale se non registrati IVA — non è un permesso fiscale, è una regola bancaria | support.stripe.com "Stripe in Italia" |

**La distinzione che conta**: la P.IVA può essere a **costo proporzionale** (professionista in Gestione Separata: 26% di ciò che guadagni — con la questione del minimale ~€ 4,8k da chiarire in base alla posizione assicurativa: se hai un lavoro dipendente continuativo o sei pensionato, il minimale non c'è) oppure a **costo fisso** (ditta di commercio: ~€ 4,6k/anno di INPS anche se incassi zero). Con quale inquadramento si sta in piedi il nostro mix (consulenza + vendita file) è la domanda #1 per il commercialista, perché è lì che si decide tra queste due cifre.

### 5-ter. Da portare al commercialista (scelte residue, non verificabili da fonti)

- [ ] Forfettario: requisiti di accesso per nuova attività (5% primo quinquennio vs 15%), tetto 85.000 €, vincolo EX art. 50 c.1 L.335/1995 (dipendente? già altro reddito?).
- [ ] Inquadramento: **professionista** (consulenza marketing → INPS Gestione Separata ~26,07%) vs **impresa/ditta individuale** con e-commerce di file digitali (Camera di Commercio + INPS commercianti, contributi fissi ~minimale annuo). Il nostro mix (kit digitali + servizi di consulenza) va incasellato: il commercialista decide ATECO e forma giuridica.
- [ ] Fatturazione B2B di prodotto digitale: fattura elettronica SdI obbligatoria anche in forfettario; IVA esente con regime forfettario (una riga in fattura); eventualmente tool tipo Fatture in Cloud `[DA VERIFICARE costi]`.
- [ ] Diritto di recesso su contenuto digitale (la garanzia 14 giorni del §6 va scritta nei termini in modo conforme: rinuncia espressa al recesso dopo avvio download).
- [ ] Stripe: intestazione account con P.IVA appena aperta; IBAN di un conto dedicato (non necessariamente-business, ma separato — consiglio prassi).

### 5-quater. Percorsi alternativi SENZA P.IVA — valutati e scartati

| Strada | Perché non regge qui |
|---|---|
| Prestazione occasionale pura (ricevute, no Stripe) | Regge solo per 1-2 clienti l'anno, una-tantum, senza sito/listino. Con il funnel attivo è fittizia. E il B2B non accetta ricevute: non può scaricarle. |
| Occasionale + Stripe (account con solo CF) | Stripe lo permette, ma la sostanziale abituale = evasione/omissione, con i pagamenti tracciati per definizione (Stripe riporta tutti i dati). Peggior combinazione: massima esposizione, zero beneficio. |
| Altri al posto mio (MoR: Gumroad/Paddle) | Loro emettono la ricevuta/fattura, ma il mio compenso resta reddito da attività continuativa: obbligo P.IVA non sparisce, e abbiamo già scartato Gumroad al §4 per fee e B2B. |
| Vendere in nome di terzi (appoggio a società di altri) | Serve comunque un accordo e P.IVA di qualcuno; in pratica anticipa i costi senza eliminarli. |

### 5-quinquies. Piano di validazione a fasi — senza P.IVA finché il progetto non dimostra domanda (proposto 17/11/2026, da confermare con l'utente)

> **Aggiornamento decisione 17/11/2026 (sera)**: l'utente conferma il vincolo "senza P.IVA ora" ma sceglie per il prodotto a bottone la strada Stripe + listino pubblico, rimandando P.IVA e fatturazione alla fase di vendita diretta dei pacchetti ad alto valore (Setup €497, Retainer). Deriva e regole di contenimento in §5-septies; i principi legali restano quelli di §5/§5-sexies.

Requisito dell'utente: non aprire costi fissi prima di aver guadagnato e prima di vedere se il progetto scala. Le fasi sotto stanno in questo vincolo restando legali.

**Fase 0 — validazione a incasso zero (subito, niente P.IVA).** Il funnel live vende solo il kit gratuito: nessuna vendita, nessun prezzo con pulsante d'acquisto, nessun incasso = nessuna posizione IVA aperta, nessun obbligo. Si misura: lead/settimana, conversione pagina, call prenotate, e il segnale di disponibilità a pagare raccolto in call ("le serve il kit completo a €37?") senza chiedere denaro. Criterio di passaggio: `[SOGLIA DA DECIDERE INSIEME — proposta: 30 lead + 10 call + 5 sì espliciti al prezzo entro 60 giorni]`.

**Fase 1 — i primi euro, davvero occasionali (se serve, sempre niente P.IVA).** Se in call uno studio chiede il servizio subito: una singola prestazione concordata a voce, occasionale per definizione (una, non ripetuta), ricevuta con ritenuta d'acconto 20% che lo studio versa come sostituto, pagamento via bonifico. Su €97 lordi restano €77,60 netti prima delle imposte (poi conguaglio nel 730/quadro RL). Regola di confine: **niente listino pubblico, niente Stripe button, niente ripetizione** — il secondo cliente che bussa mentre il primo è ancora "occasionale" è già terzo cliente che si avvicina all'abitualità. A quel punto si apre la P.IVA, non prima. Limite pratico proposto: max 1-2 prestazioni per trimestre.

**Fase 2 — P.IVA e lancio a pagamento (quando triggerà la soglia della Fase 0).** Domanda dimostrata → apertura P.IVA forfettario (0 € di apertura), decisione commercialista professionista/GS vs ditta/INPS (determina se il costo è ~26% del guadagnato o ~4,8k fissi — tabella §5-bis), account Stripe intestato, workflow 1J, kit pubblico a €97/€37. A questo punto il costo della P.IVA è coperto dai ricavi che ne giustificano l'apertura.

**Perché NON la scorciatoia "funnel pubblico + Stripe senza P.IVA"**: listinare un prezzo e incassare ripetutamente è attività abituale a prescindere dall'importo (obbligo P.IVA senza soglie — §5), i clienti B2B pretendono fattura elettronica che senza P.IVA non esiste, e ogni transazione Stripe è tracciata per costruzione. Non sarebbe risparmio, sarebbe rischio senza vantaggio.

**Impatto sul piano §8**: #1-#5 invariate e immediate (i moduli del kit completo servono già in Fase 1 come materiale di consegna); #6-#8 e la pubblicazione del prezzo slittano al trigger di Fase 0, non al completamento della build. Priorità della settimana: funnel gratuito live (dominio + deploy + sessione hub).

### 5-sexies. Verifica specifica: "Stripe fattura via SdI col solo CF, poi metto tutto in P.IVA retroattivamente" (ipotesi utente, controllata 17/11/2026)

Ipotesi in due parti: (a) Stripe emette direttamente fattura elettronica verso i clienti anche senza P.IVA usando il codice fiscale e la sua "fatturazione interna"; (b) raggiungo il volume giusto, apro P.IVA e ci inserisco con retroattività le fatture già emesse da Stripe.

**Cosa è vero**: Stripe si attiva anche con il solo codice fiscale (FAQ Stripe Italia, sezione attivazione). Stripe Invoicing produce PDF/credenziali di fattura per le vendite. La dichiarazione di inizio attività può indicare una data retroattiva, ma fino a 30 giorni (art. 35 DPR 633/1972).

**Cosa non regge, con fonte**:

1. **La frase sul CF che "verrebbe utilizzato per la fatturazione elettronica" parla delle fatture DI Stripe A ME, non delle mie.** È la FAQ "Domande frequenti sui requisiti per la fatturazione elettronica con IVA in Italia" (support.stripe.com): Stripe dal 1° luglio 2025 ha una filiale italiana, addebita IVA 22% sulle commissioni e manda le proprie fatture-fee allo SdI; per questo chiede P.IVA o CF, PEC o codice destinatario del merchant. "Invieremo queste informazioni all'SDI in modo che possa consegnare la fattura elettronica alla tua destinazione preferita" = la fattura che ricevo io da Stripe, non quella che io emetto.
2. **Stripe non genera né trasmette file SdI per le mie vendite.** Documentazione ufficiale (docs.stripe.com/invoicing/e-invoicing, consultata 17/11/2026): "Stripe Invoicing crea registri di fattura ed espone i dati via API e webhook, ma non genera né trasmette di per sé file di fattura elettronica legalmente complianti". Per lo SdI serve un'app del marketplace Stripe (Billit, A-Cube) o un webhook verso un provider (Fatture in Cloud ecc.), e quei provider presuppongono anagrafiche aziendali (alla registrazione Stripe chiede anche RI/REA).
3. **Non esiste il "me le inserisco retroattivamente".** Regola primaria: le fatture non possono essere emesse per operazioni precedenti alla data di inizio dichiarata; i documenti emessi senza P.IVA sono irregolari e vanno riemessi/regolarizzati con il professionista (guida Fiscozen "apertura P.IVA retroattiva", agg. agosto 2026; art. 35 DPR 633/72). Oltre i 30 giorni di retroattività consentiti la dichiarazione è tardiva: sanzione amministrativa (art. 5 D.Lgs. 471/1997; letteratura corrente indica 500-2.000 € riducibile con ravvedimento — importi in riordino dal D.Lgs. 173/2024, da far confermare al commercialista) + IVA/dichiarazioni periodiche arretrate + contributi INPS dovuti dalla data di inizio reale.
4. **Il punto strutturale non cambia**: listino pubblico + payment link + incassi ripetuti = attività abituale a prescindere dal documento che esce dal gateway (Stripe stessa lo scrive nella sua risorsa per freelance italiani: nessuna soglia di fatturato sotto cui l'attività abituale è lecita senza P.IVA — §5). La forma del documento non legitima la sostanza.

**Contro-economia dell'ipotesi** (aritmetica, non previsioni): se l'attività viene riqualificata come abituale dal primo incasso, al dovuto su quel periodo si sommano sanzione tardiva + interessi + il minimale INPS che nel frattempo correva (≈4.837 €/anno GS senza esonero — §5-bis). Una vendita-pubblico-Stripe-fase-test da poche migliaia di euro si regolarizza a un costo superiore all'apertura puntuale della P.IVA al trigger. Il "piano B senza rischi" senza P.IVA resta il §5-quinquies: Fase 0 gratis, Fase 1 una-tantum con ricevuta e bonifico, P.IVA al trigger.

**Nota pratica per la Fase 2 (all'utente con P.IVA vale):** da luglio 2025 Stripe IT addebita IVA 22% sulle proprie commissioni (quindi fee effettiva ≈1,5%+0,25 € +22% sull'importo fee). In forfettario quell'IVA non si recupera, è puro costo.

### 5-septies. Decisione finale dell'utente (17/11/2026): bottone + Stripe senza P.IVA, rischio accettato

L'utente conosce §5-sexies e sceglie comunque: il kit a bottone (€37/€97) parte con Stripe e listino pubblico **senza P.IVA**; P.IVA e fatturazione si valutano quando si passerà alla vendita diretta dei pacchetti (call → Setup €497 → Retainer). Registrazione del fatto: non è un aggancio legittimo, è l'accettazione consapevole di un illecito amministrativo (attività d'impresa senza dichiarazione di inizio; art. 35 DPR 633/72) con volume contenuto. Questa sezione non rivaleggia con §5-sexies: lo incorpora come quadro dei rischi e aggiunge le regole di contenimento decise insieme.

**Regole di contenimento (da rispettare, non da negoziare in silenzio):**

1. **Piccolo e organico**: solo il funnel gratuito che porta al bottone. Niente ads a pagamento, niente outbound spinto su questo prodotto: servono a tenere la cosa configurabile come fase-test e a non moltiplicare le prove di abitualità.
2. **Anagrafica onesta su Stripe**: attivazione come persona fisica con solo CF (tipo entity corretto, niente finte intestazioni, niente "ditta" senza ditta). Stripe riporta comunque i dati all'Agenzia (§5-quater).
3. **Libro paga propio**: ogni vendita finisce nel foglio `Acquisti` (§7). Se un giorno servirà regolarizzare o spiegare, l'elenco incassi-date-importi è la base di partenza con il commercialista, e vale anche per il 730 (i compensi vanno dichiarati comunque, in attesa del parere su come: `[DA CHIEDERE AL COMMERCIALISTA]`).
4. **Riserva intoccabile**: accantonare ~1/3 del lordo incassato (stima per imposta sostitutiva/IRPEF + sanzione eventuale + fee non restituite). Il denaro per una regolarizzazione deve esserci prima della regolarizzazione.
5. **Trigger P.IVA anticipato rispetto al §5-quinquies**: se il bottone produce incassi continuativi — proposta: 2-3 mesi consecutivi con vendite, oppure cumulato oltre ~1.500 € — si apre la P.IVA con data inizio reale e si paga il dovuto sul pregresso col professionista (tardiva + ravvedimento, §5-sexies). La scorciatoia regge finché è piccola; il trigger esiste proprio per non farla diventare grande da incosciente.
6. **Confine di prodotto**: senza P.IVA si vende solo il kit digitale a ricevuta. I pacchetti €497/€1.500 sono consulenza B2B con partita IVA cliente che chiede fattura elettronica: lì l'apertura è prerequisito commerciale, non solo fiscale. Nessun listino pubblico di quei pacchetti con pagamento a bottone prima della P.IVA (le CTA attuali su /grazie portano a call, va bene così).

**Impatto sul piano §8**: #6 si sblocca subito (account Stripe con CF, Payment Link, webhook); #7-#9 tornano in build immediata dietro dominio+deploy. #8 si trasforma: dal "pacchetto di domande per aprire" a "pacchetto di domande per il trigger/regularizzazione".

## 6. Contenuto del kit completo (scope approvato con questa decisione)

Registro "Lei", tono e regole progetto (AGENTS.md) identici al kit gratuito. Nessun numero inventato: tutto ciò che non c'è va in `[PARENTESI]`.

Moduli (non si sovrappongono ai 7 del gratuito — il gratuito copre il percorso del *nuovo* paziente, questo copre **i pazienti che non tornano**):

1. **Richiamo periodico** (pulizia/contollo): cadenze, script segreteria, messaggio — `[DA COMPLETARE: quali richiami sono consentiti secondo protocollo dello studio]`
2. **Riattivazione pazienti inattivi**: come selezionare la lista, sequenza 3 messaggi
3. **Preventivi non accettati**: tempi e modi del follow-up senza sembrare insistenti
4. **Recensioni Google**: setup base profilo, richiesta conforme (estensione delle regole già usate nel Template 5), risposte modello a positive e negative
5. **Referral**: chiedere indicazioni di nuovi pazienti con garbo, tempi della richiesta
6. **Contatti senza appuntamento**: chiamate senza risposta, messaggi fuori orario, gestione della lista d'attesa
7. **Tracker mensile**: scheda di gestione del percorso pazienti (stampa + CSV da importare in Google Fogli)

**Garanzia proposta**: "Se entro 14 giorni non ti è utile, scrivi a `[EMAIL BRAND]` e ti rimborso senza domande." Rimborsi Stripe: la fee della transazione non viene restituita (costo ~1,7 € per vendita a €97, da considerare) — ma è il modo onesto di vendere un prodotto senza reputazione. Decisione confermabile/refusa bile in hub.

**Nome provvisorio**: "Kit Segreteria Completo" — `[DA DECIDERE IN HUB]`. Sottotitolo provvisorio: "7 moduli per i pazienti che non tornano da soli."

## 7. Architettura del sistema

```
Studio vede il kit gratis → lascia email → /grazie (kit gratuito + blocco "Kit Completo €97")
                                                        │
                                          Payment Link Stripe (no-code)
                                                        │
                                          /kit-completo/ordine-confermato (link riservato)
                                                        │
                         Stripe webhook → n8n 1J: verifica → foglio "Acquisti" → email consegna
                                                        │
                                          email con link /kit-completo/stampa?t=<TOKEN>
                                          + CTA call Setup €497 (Calendly)
```

Punti fermi:
- **Il PDF del kit completo non sta in `public/`**: il file è servito solo dalla pagina `/kit-completo/stampa` con token segreto (env `KIT_STAMP_TOKEN`, noindex, token sbagliato → 404). Il link riservato è revocabile cambiando l'env e redeployando.
- **Payment Link** (non checkout integrato nel sito): zero codice, pagina Stripe, success URL → pagina di conferma. Unico costo: URL di pagamento su dominio Stripe (dominio personalizzato = 10 USD/mese, non serve ora).
- **Foglio**: nuovo sheet `Acquisti` nello spreadsheet lead (data, nome, studio, email, importo, ID Stripe) — anagrafica compratori separata dai lead gratuiti, che alimenta i follow-up 1H/1I.
- **v1.1 dopo il lancio**: email "giorno 2" che propone il kit completo solo a chi NON ha comprato (filtro foglio Acquisti). Il rifiuto lo decide il filtro, non lo sappiamo ancora: prima misurare.

## 8. Piano di build (ordine, con blocchi)

| # | Cosa | Chi | Bloccato da |
|---|---|---|---|
| 1 | `docs/kit-completo-content.md` — scrittura 7 moduli | io | niente — **prossimo passo** |
| 2 | Pagina prodotto `/kit-completo` (sales page, prezzo, garanzia, bottone `[PAYMENT LINK]`) | io | niente |
| 3 | Pagina `/kit-completo/stampa?t=` con gate su env + PDF per review visiva | io | #1 |
| 4 | Pagina `/kit-completo/ordine-confermato` | io | #3 |
| 5 | CTA acquisto su `/grazie` + riga nel copy del kit completo | io | #2 |
| 6 | Account Stripe (Payment Link + webhook) | **utente** | niente — si sblocca con §5-septies: persona fisica con solo CF + IBAN |
| 7 | Workflow n8n 1J (trigger Stripe → Acquisti → email) | io | #6, dominio |
| 8 | Parere commercialista su inquadramento pre-trigger e pregresso (dichiarazione compensi, riserva) | **utente** | §5-septies (non più "pratica di apertura") |
| 9 | Pubblicazione pagine + link reale nel Payment Link | io | deploy |

Dipendenze dal funnel già note non cambiano: deploy/dominio e decisioni hub (nome agenzia, casella brand, Calendly) restano prerequisiti di #7 e #9.

## 9. Metriche da guardare (appena il sistema è live)

- % di chi apre il link prodotto dalla `/grazie` (baseline per capire se il pitch serve prima o dopo la consegna del gratis)
- conversione link → acquisto
- quanti tra gli acquirenti poi prenotano la call (il vero KPI: il kit che vende il Setup)
- MISSING oggi: volume lead/mese (funnel non live) — ogni previsione di ricavo è irrealistica finché non c'è quel numero.
