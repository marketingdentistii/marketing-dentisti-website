# SPEC — Kit Base (29 elementi, 8 aree)

Fonte unica dei confini. Ogni elemento deve rispettare BRAND-VOICE.md e DESIGN-SYSTEM.md.

## Mappa formati
- **11 Testo** (sezioni nel master PDF): KB06, KB07, KB08, KB12, KB15, KB17, KB20, KB23, KB40, KB43, KB45
- **6 Stampabili** (PDF al loro formato, mergeati nel master): KB11 (A4, 15pg), KB25 (A4, 10pg), KB27 (A4, 2pg), KB47 (A4, 8pg), KB49 (A4, 2pg), KB57 (A4, 5pg)
- **12 File Google** (link dal master): Docs KB04, KB26, KB51 · Slides KB31, KB37, KB38, KB46, KB50, KB55, KB61 · Sheets KB29, KB36

Totale: 11 + 6 + 12 = **29**.

## Confini anti-duplicazione (vincolanti)
- **KB25 = solo PREVENZIONE del no-show.** Timing 48h/24h/2h, canali, script reminder, policy di studio, fallback telefonata preventiva. Non contiene mai script di recupero post-assenza.
- **KB12 = solo RECUPERO post-assenza.** 3 step (1h / 24h / 3gg), script telefonata, passaggio a lista d'attesa. Non contiene mai reminder preventivi.
- **KB27 = mappa decisionale** che collega KB25 → KB12: quando scrivere, quando chiamare, quando chiudere. Rimanda ai due moduli, non li riscrive.
- **KB15 + KB20 = UN unico playbook multicanale coordinato**, con cross-reference espliciti:
  email D+1 (KB20) → WhatsApp D+2 (KB15) → email D+3 (KB20) → WhatsApp D+5 (KB15) → email D+7 (KB20).
  KB15 contiene i 2 messaggi WA e la tabella di coordinamento; KB20 contiene le 3 email e la stessa tabella. Nessuno dei due è un seguito autonomo dell'altro.
- **Regola anti-Gratis**: KB17 e KB49 devono avere ≥3 varianti oppure ≥3× la profondità dei corrispettivi del kit gratuito (Template 4 "Email di benvenuto" e Template 7 "Mini-guida 5 step" in `docs/kit-content.md`). KB17: 3 varianti complete (igiene/cura/chirurgia) + token + ramo follow-up. KB49: 5 step con hook e link a ogni template del kit + legenda, contro la pagina singola del Gratis.

---

## A — Segreteria

### KB04 · Anagrafica paziente e consensi — Google Docs, 2 pagine
Anagrafica completa (dati personali, contatti, referente, origine del paziente, note anamnestiche come campo vuoto).
**Consensi DISTINTI**, ciascuno con propria casella e propria firma:
1. trattamento dei dati sanitari (art. 9 GDPR) — necessario all'erogazione;
2. marketing/comunicazioni promozionali — facoltativo;
3. foto/video per uso interno o divulgativo — facoltativo;
4. comunicazioni via WhatsApp per servizio (conferme, reminder, spostamenti) — facoltativo e separato dal marketing.
Informativa breve (chi è il titolare, perché si raccolgono i dati, per quanto tempo, diritti dell'interessato, dove leggere l'informativa completa).
Disclaimer: "far validare dal proprio consulente".
Footer-line: setup → Avvio Studio.

### KB06 · Paziente difficile — Testo ~2000 parole
5 scenari: (1) arrabbiato per l'attesa, (2) ritardo del paziente, (3) richiesta di sconto, (4) confronto prezzi con altro studio, (5) contesta il preventivo.
Per ognuno: **obiettivo**, **parole da usare**, **parole da evitare**, **script completo**, **variante breve** (da telefono, 3 frasi).
Nessuna promessa di rimborso o sconto decisa dalla segreteria.

### KB07 · Presentazione del preventivo — Testo ~2500 parole
Flow in 5 fasi (preparazione → apertura → presentazione del piano → gestione obiezioni → chiusura e prossimo passo).
Obiezioni trattate: costo, tempo, paura.
Chiusura con due date concrete, mai "ci pensi".
2 esempi completi: implantologia e ortodonzia (importi come `[IMPORTO]`, nessuna cifra inventata).
Note sul tono: cosa dire a voce e cosa mettere per iscritto.

### KB08 · Recall pazienti dormienti — Testo ~800 parole
3 messaggi per 6 / 9 / 12 mesi dall'ultima visita, in versione WhatsApp/SMS, più una variante email per ciascun intervallo.
Timing e note sul consenso (richiamo di cura ≠ promozione; verificare la base giuridica prima dell'invio).

## B — WhatsApp

### KB11 · Guida setup WhatsApp Business — PDF A4, 15 pagine, STAMPABILE
Setup account, profilo, etichette, messaggio di benvenuto, messaggio di assenza, catalogo, risposte rapide.
Diagrammi di step originali (SVG generati dal build), nessuno screenshot proprietario.
Note privacy: consenso WhatsApp separato, cosa non scrivere in chat, dati sanitari.
**NOTE-BOX Avvio** (una delle 4).

### KB12 · Recupero no-show — Testo ~1000 parole
Solo post-assenza. 3 step: entro 1 ora, entro 24 ore, entro 3 giorni.
Script completo della telefonata di recupero.
Passaggio a lista d'attesa (collegamento a KB29).
Rimando a KB27 per la scelta del canale.

### KB15 · Follow-up preventivo su WhatsApp — Testo ~600 parole
2 messaggi: D+2 e D+5, coordinati con KB20.
Tabella di coordinamento del playbook unico (email D+1 → WA D+2 → email D+3 → WA D+5 → email D+7).
Cross-reference esplicito a KB20.

## C — Email

### KB17 · Benvenuto post-visita — Testo ~1200 parole
3 varianti complete: igiene, cura conservativa, chirurgia.
Token di personalizzazione elencati e spiegati.
Ramo follow-up: cosa succede se il paziente non risponde, e quando fermarsi.
≥3 varianti = rispetto della regola anti-Gratis.
Nessun P.S. (email transazionale).

### KB20 · Follow-up preventivo via email — Testo ~1200 parole
3 email: D+1, D+3, D+7, coordinate con KB15.
Stessa tabella di coordinamento di KB15.
Oggetto + corpo + criterio di stop.

### KB23 · Cosa portare alla prima visita — Testo ~500 parole
Documenti, abbigliamento, arrivo e parcheggio, cosa aspettarsi, durata.
Tono rassicurante senza enfasi. Placeholder `[INDIRIZZO]`, `[ORARI]`, `[TELEFONO]`.

## D — Agenda

### KB25 · Protocollo anti-no-show — PDF A4, 10 pagine, STAMPABILE
Solo PREVENZIONE. Timing 48h / 24h / 2h, scelta del canale per fascia, script reminder pronti, policy di studio (come si comunica la policy, cosa fare in caso di disdetta tardiva), fallback con telefonata preventiva.
**NOTE-BOX Avvio** (una delle 4).

### KB26 · Agenda settimanale + checklist giornaliera — Google Docs, 5 pagine
Layout lunedì–venerdì con slot da 30 minuti.
Checklist di apertura, di chiusura, e procedura di backup.
Footer-line: setup → Avvio Studio.

### KB27 · Flowchart recupero no-show — PDF A4, 2 pagine, STAMPABILE
Diagramma decisionale originale: quando scrivere, quando chiamare, quando passare in lista d'attesa, quando chiudere.
Collega esplicitamente KB25 (prevenzione) → KB12 (recupero).

### KB29 · Lista d'attesa — Google Sheets
Colonne: nome, telefono, email, trattamento, urgenza, data inserimento, note, contattato.
Formula per i giorni di attesa. Conditional formatting sull'urgenza.
Foglio istruzioni.
Footer-line: setup → Avvio Studio.

## E — Recensioni

### KB31 · Card QR recensione — Google Slides A6, STAMPABILE
Frame QR **vuoto** (riquadro segnaposto, nessun QR generato con dati inventati).
Testo della card, istruzioni di stampa, guida "crea il suo QR in 2 minuti" con link alle recensioni Google Business e a un generatore QR gratuito.
Footer-line.

## F — Social (sistema visivo coordinato: stessa palette su KB37/38/46/61)

### KB36 · Calendario contenuti — Google Sheets, 4 tab
1. **Calendario 30 giorni**: data, tipo, caption, asset, hashtag, status.
2. **Banca idee**: almeno 50 idee.
3. **Hashtag**: set per categoria.
4. **Metriche**: colonne e istruzioni di compilazione.
Estendibile dal cliente. **NOTE-BOX Gestione** (una delle 4).

### KB37 · Post — Google Slides, 20 slide 1080×1080
5 educational, 5 team, 5 promo (senza sconti/urgenza), 5 engagement.
Placeholder brand, footer Gestione.

### KB38 · Storie — Google Slides, 10 slide 1080×1920
Sondaggi, quiz, Q&A, countdown (countdown di apertura/agenda, mai countdown di offerta).
Stessa palette di KB37.

### KB61 · Copertine Highlights — Google Slides, 6 slide 1080×1080 circle-safe
Servizi, Team, Recensioni, FAQ, Promo, Contatti. Stessa palette.

### KB40 · Reel e TikTok — Testo ~2000 parole
10 script da 15–30 secondi: hook + corpo + CTA.
Istruzioni di ripresa con il telefono: luce, inquadratura, audio, durata.

### KB43 · Bio e profilo — Testo ~500 parole
3 varianti × Instagram / Facebook / TikTok.
Emoji, hashtag fissi, link in bio.

### KB45 · FAQ → post — Testo ~2500 parole
10 domande reali dei pazienti + risposta + caption pronta + hashtag.

### KB46 · Grafiche di servizio — Google Slides, 10 slide 1080×1080
Ferie, nuovo orario, nuovo servizio, emergenza, traguardo. Footer Gestione. Stessa palette.

### KB47 · Foto, repost e consenso — PDF A4, 8 pagine, STAMPABILE
Script verbale per chiedere il consenso, modulo scritto (con sezione minori), come fare le foto con il telefono, regole di repost, note GDPR, disclaimer.

## G — Percorso

### KB49 · Mappa del percorso paziente — PDF A4, 2 pagine, STAMPABILE
5 step, ognuno con hook e link al template del kit corrispondente. Legenda.
≥3× la mini-guida del kit gratuito.

### KB50 · Booklet di benvenuto — Google Slides A5, 8 pagine, STAMPABILE
Copertina, team, servizi, come funziona, FAQ, contatti, retro con QR.
**NOTE-BOX Avvio** (una delle 4).

### KB51 · Istruzioni post-trattamento — Google Docs, 8 pagine
4 schede: igiene, estrazione, impianto, sbiancamento.
Ogni scheda = struttura + comunicazione al paziente + timing, **pronti all'uso**.
I bullet clinici sono `[DA VALIDARE A CURA DEL CLINICO]`. Disclaimer in testa.
**Non fornire contenuto clinico definitivo.**
Footer-line: contenuti → Gestione Totale.

### KB55 · Bambini — Google Slides, STAMPABILE
Scheda da colorare A4, line-art originale.
Attestato "piccolo coraggioso" A5 personalizzabile.
Footer-line.

## H — Bonus

### KB57 · Quick-start — PDF A4, 5 pagine, STAMPABILE
Ordine di implementazione, checklist dei primi 7 giorni, come sostituire i token, come condividere con la segreteria, KPI semplici (definizioni, non promesse).
**Unico punto del kit con il confronto a due colonne**: "Fai-da-te ~6 ore / controllo completo" vs "Delegato: Avvio Studio pronto in 14 giorni, zero configurazione", più una riga Gestione Totale per il continuativo.

---

## Strato upsell (vincoli rigidi)

### NOTE-BOX — esattamente 4 in tutto il kit
| Elemento | Pacchetto |
|---|---|
| KB11 | Avvio Studio |
| KB25 | Avvio Studio |
| KB36 | Gestione Totale |
| KB50 | Avvio Studio |

Formula esatta (variare solo X e il nome pacchetto):
> Questo modulo richiede ~X min di configurazione. Preferisce averlo già pronto sul suo studio? È incluso in [pacchetto].

Tono fattuale. Zero hype. Zero urgenza.

### Footer-line (solo file Google, uniforme)
- file di setup → `Versione già configurata sul suo studio: Avvio Studio`
- file di contenuti → `Gestione continuativa: Gestione Totale`

Assegnazione: KB04, KB26, KB29, KB31 → setup. KB37, KB38, KB46, KB51, KB55, KB61 → contenuti. KB50 → setup (coerente con la sua note-box).

### Confronto fai-da-te / delegato
Solo in KB57. In nessun altro elemento.

### Divieti
- Nessuna menzione upsell fuori dalle 4 note-box, dalle footer-line e da KB57.
- Nessun P.S. nelle email transazionali.
- Il conteggio va verificato e riportato nel report finale.
