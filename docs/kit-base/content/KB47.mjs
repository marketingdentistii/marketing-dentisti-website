export default {
  id: 'KB47',
  area: 'F',
  areaName: 'Social',
  title: 'Foto, video e repost: consenso e uso',
  format: 'print',
  size: 'A4',
  pages: 8,
  words: null,
  printable: true,
  noteBox: null,
  footerLine: null,
  blocks: [
    // ---- Pagina 1 · apertura + perché il consenso ----
    { t: 'p', x: "Una guida operativa per gestire foto, video e contenuti ripubblicati sui canali dello studio: come chiedere il consenso, come compilare il modulo, come scattare e che cosa controllare prima di pubblicare." },
    { t: 'h2', x: 'Come si usa' },
    { t: 'ol', items: [
      'Usi lo script verbale per chiedere il consenso al paziente, senza insistere se rifiuta.',
      'Compili e faccia firmare il modulo prima di scattare o pubblicare. Per i minori, raccolga il doppio consenso.',
      'Conservi il modulo con l\'anagrafica e controlli la checklist prima di ogni pubblicazione.',
    ] },
    { t: 'h2', x: '1. Perché serve un consenso scritto' },
    { t: 'p', x: "Un'immagine che rende riconoscibile una persona è un dato personale. Pubblicarla richiede una base giuridica: per foto e video di pazienti la via è il consenso, libero, specifico e documentato. Una firma su un modulo permette di provare che cosa il paziente ha autorizzato, dove e per quanto tempo." },
    { t: 'p', x: 'Il consenso alle foto è separato dal consenso alle cure e dal consenso marketing. Il paziente può dire di no alle foto e ricevere comunque la stessa assistenza.' },
    { t: 'h3', x: 'Che cosa deve coprire' },
    { t: 'ul', items: [
      'Quali immagini: foto, video, o entrambi.',
      'Dove si usano: canali social, sito, materiale informativo, uso interno.',
      'Per quanto tempo si usano e come si revoca il consenso.',
      'Chi è il titolare del trattamento e come contattare lo studio.',
    ] },
    { t: 'note', kind: 'warn', title: 'Prima di tutto', x: 'Non pubblichi mai immagini di pazienti senza consenso firmato. Il tag o il fatto che il paziente sia presente in studio non valgono come autorizzazione.' },

    { t: 'pagebreak' },

    // ---- Pagina 2 · script verbale ----
    { t: 'h2', x: '2. Script verbale per chiedere il consenso' },
    { t: 'p', x: 'Lo chieda a voce, con calma, prima di scattare. Se il paziente esita o rifiuta, non insista. Di seguito una traccia: la adatti al suo modo di parlare.' },
    { t: 'dialog', lines: [
      { who: 'Segreteria', x: 'Prima di salutarci, le chiedo una cosa. Vorremmo usare una foto per raccontare lo studio sui nostri canali. Le andrebbe?' },
      { who: 'Paziente', x: 'Che foto sarebbe? Si vedrebbe il mio viso?' },
      { who: 'Segreteria', x: 'Sì, la ritrarrebbe. Per questo serve il suo consenso scritto: le spieghiamo dove la usiamo, e lei firma solo se è d\'accordo.' },
      { who: 'Paziente', x: 'E se poi cambio idea?' },
      { who: 'Segreteria', x: 'Può revocare quando vuole. Ci scrive o ci chiama, e togliamo le immagini dove possiamo.' },
      { who: 'Paziente', x: 'Mi faccia pensare... onestamente, preferisco di no.' },
      { who: 'Segreteria', x: 'Va benissimo, non insisto. Non scattiamo e non pubblichiamo nulla che la riguarda.' },
      { who: 'Paziente', x: 'Questo non cambia niente per le mie cure, vero?' },
      { who: 'Segreteria', x: 'Assolutamente no. Il consenso alle foto è separato: l\'assistenza resta identica.' },
      { who: 'Paziente', x: 'Grazie, apprezzo che me l\'abbia chiesto con calma.' },
      { who: 'Segreteria', x: 'È normale. Se un giorno cambia idea, ce lo dica: raccogliamo il consenso prima di qualsiasi foto.' },
    ] },
    { t: 'note', kind: 'info', title: 'Dopo la risposta', x: 'Se il paziente dice di sì, passi al modulo e raccolga la firma prima di scattare. Se dice di no, chiuda il tema senza rilanciare.' },

    { t: 'pagebreak' },

    // ---- Pagina 3 · modulo di consenso (adulti + minori) ----
    { t: 'h2', x: '3. Modulo di consenso foto e video' },
    { t: 'p', x: 'Da compilare e firmare prima di scattare o pubblicare. Consegni una copia al paziente. Il consenso è facoltativo e separato dalle cure.' },
    { t: 'table', head: ['Campo', 'Valore'], rows: [
      ['Paziente (nome e cognome)', '[NOME PAZIENTE]'],
      ['Data di nascita', '[DATA DI NASCITA]'],
      ['Recapito', '[TELEFONO] / [EMAIL]'],
      ['Titolare del trattamento', '[NOME STUDIO] · [INDIRIZZO] · [EMAIL]'],
      ['Data della firma', '[DATA]'],
    ] },
    { t: 'h3', x: 'Ambito del consenso (caselle separate)' },
    { t: 'check', items: [
      'Uso interno allo studio (documentazione e formazione).',
      'Pubblicazione sui canali social dello studio.',
      'Pubblicazione sul sito dello studio.',
      'Materiale informativo dello studio.',
    ] },
    { t: 'p', x: 'Il paziente può barrare una o più caselle, oppure nessuna. Ogni ambito è separato: il consenso a un uso non vale per gli altri.' },
    { t: 'p', x: 'Firma del paziente: ____________________   Data: [DATA]' },
    { t: 'p', x: 'Operatore che raccoglie il consenso: ____________________' },
    { t: 'h3', x: 'Minori: doppio consenso' },
    { t: 'p', x: 'Se il paziente è minorenne, serve la firma di chi esercita la responsabilità genitoriale e, quando il minore è in grado di comprendere, anche il suo assenso. Li raccolga entrambi prima di scattare.' },
    { t: 'check', items: [
      'Consenso di chi esercita la responsabilità genitoriale.',
      'Assenso del minore, se in grado di esprimere una scelta consapevole.',
    ] },
    { t: 'p', x: 'Genitore / tutore: [NOME GENITORE] · Relazione con il minore: [RELAZIONE]' },
    { t: 'p', x: 'Firma di chi esercita la responsabilità genitoriale: ____________________' },
    { t: 'note', kind: 'warn', title: 'Situazioni particolari', x: 'Per genitori separati, tutela o altri casi, faccia verificare al consulente chi deve firmare. Non proceda se il consenso non è completo.' },

    { t: 'pagebreak' },

    // ---- Pagina 4 · foto con il telefono ----
    { t: 'h2', x: '4. Fare le foto con il telefono' },
    { t: 'p', x: 'Basta uno smartphone. Prima di tutto, il consenso: non scatti mai di nascosto e non pubblichi chi non ha firmato.' },
    { t: 'h3', x: 'Luce' },
    { t: 'ul', items: [
      'Preferisca luce naturale, da una finestra, di lato o di fronte al soggetto.',
      'Eviti il controluce: la finestra dietro il soggetto lo lascia in ombra.',
      'Spenga il flash se crea ombre dure; piuttosto si avvicini alla fonte di luce.',
    ] },
    { t: 'h3', x: 'Inquadratura e sfondo' },
    { t: 'ul', items: [
      'Tenga il telefono fermo, con gli appoggi stabili. Scatti più versioni e scelga dopo.',
      'Sfondo neutro e ordinato: una parete chiara, niente oggetti personali o disordine.',
      'Decida il formato prima: verticale per le storie, quadrato o orizzontale per i post.',
    ] },
    { t: 'h3', x: 'Cosa non inquadrare mai' },
    { t: 'ul', items: [
      'Cartelle cliniche, referti, radiografie e documenti.',
      'Schermi del gestionale o del computer con dati di pazienti.',
      'Altri pazienti, anche sfocati o di spalle, se riconoscibili.',
      'Nomi, targhe, badge o qualsiasi dato che identifichi una persona non consenziente.',
    ] },
    { t: 'note', kind: 'warn', title: 'Se compare un errore', x: "Se nell'immagine compare per errore un dato o una persona non consenziente, non la pubblichi: riscatti o scarti il file." },

    { t: 'pagebreak' },

    // ---- Pagina 5 · regole di repost ----
    { t: 'h2', x: '5. Regole di repost' },
    { t: 'p', x: "Ripubblicare un contenuto di altri (un paziente che tagga lo studio, un collega, una pagina) richiede permesso. Il tag non è un'autorizzazione." },
    { t: 'h3', x: 'Cosa si può ripubblicare' },
    { t: 'ul', items: [
      'Contenuti creati dallo studio, con consenso dei soggetti ritratti.',
      'Contenuti di terzi per cui ha ottenuto un permesso esplicito a ripubblicare.',
    ] },
    { t: 'h3', x: 'Come chiedere il permesso' },
    { t: 'ol', items: [
      "Contatti l'autore in privato (messaggio o email) e chieda se può ripubblicare il contenuto sui canali dello studio.",
      'Si faccia rispondere per iscritto e conservi la risposta: è la prova del permesso.',
      'Concordi come citarlo: tag, nome, o entrambe le cose.',
    ] },
    { t: 'h3', x: 'Come citare' },
    { t: 'ul', items: [
      "Menzioni l'autore nel modo concordato, con tag o credito visibile.",
      'Mantenga il credito anche se il contenuto viene ricondiviso.',
    ] },
    { t: 'h3', x: 'Cosa non fare' },
    { t: 'ul', items: [
      'Non ripubblicare senza permesso, nemmeno se lo studio è taggato.',
      "Non rimuovere né nascondere il credito dell'autore.",
      'Non ripubblicare contenuti con pazienti o terzi che non hanno dato consenso.',
      "Non alterare il contenuto in modo che cambi il senso o l'attribuzione.",
    ] },
    { t: 'note', kind: 'info', title: 'Pazienti che taggano lo studio', x: 'Se un paziente pubblica una foto che riguarda lo studio, chieda il permesso prima di ripubblicarla. Verifichi che eventuali persone ritratte abbiano dato il loro consenso.' },

    { t: 'pagebreak' },

    // ---- Pagina 6 · note GDPR ----
    { t: 'h2', x: '6. Note GDPR' },
    { t: 'p', x: "Indicazioni operative di massima. Le faccia validare dal consulente, che adatta il registro e l'informativa allo studio." },
    { t: 'h3', x: 'Base giuridica' },
    { t: 'p', x: "Per pubblicare immagini di pazienti riconoscibili la base è il consenso (art. 6 GDPR), libero, specifico, informato e revocabile. Se l'immagine rivela dati sanitari, serve un consenso esplicito (art. 9). Il consenso alle foto è distinto da quello alle cure e dal marketing." },
    { t: 'h3', x: 'Revoca del consenso' },
    { t: 'p', x: 'Il paziente può revocare in qualsiasi momento, con la stessa facilità con cui ha dato il consenso. Alla revoca, rimuova le immagini dove è possibile e registri la richiesta. La revoca non rende illecito l\'uso già avvenuto prima della revoca.' },
    { t: 'h3', x: 'Dove si conserva il modulo' },
    { t: 'p', x: "Archivi il modulo firmato con l'anagrafica e i consensi del paziente (KB04), in un archivio riservato ad accesso limitato. Conservi anche i permessi di repost e le eventuali revoche." },
    { t: 'h3', x: 'Per quanto tempo' },
    { t: 'p', x: 'Conservi il modulo almeno finché le immagini sono pubblicate, e oltre, per poter provare il consenso. Definisca una durata precisa nel registro dei trattamenti, concordandola con il consulente. Non tenga i moduli più del necessario.' },
    { t: 'note', kind: 'warn', title: 'Strumenti esterni', x: 'Non inserisca immagini di pazienti in strumenti o piattaforme esterne senza una base giuridica e senza informative adeguate. In caso di dubbio, chieda al consulente prima di pubblicare.' },

    { t: 'pagebreak' },

    // ---- Pagina 7 · checklist operativa ----
    { t: 'h2', x: '7. Checklist prima di pubblicare' },
    { t: 'p', x: 'La esegua per ogni contenuto, prima di metterlo online. Se una voce non è soddisfatta, non pubblichi.' },
    { t: 'check', items: [
      'Il consenso scritto del soggetto ritratto è firmato e archiviato.',
      'Il consenso copre il canale specifico che sta per usare (social, sito, materiale informativo).',
      'Per i minori: doppio consenso raccolto e firma di chi esercita la responsabilità genitoriale.',
      "Nell'immagine non compaiono cartelle cliniche, schermi, dati o altri pazienti non consenzienti.",
      "Se è un repost: il permesso dell'autore è agli atti e il credito è corretto.",
      'L\'eventuale revoca precedente è stata rispettata: il soggetto non ha chiesto di non comparire.',
      "Il testo che accompagna l'immagine non promette risultati clinici e non contiene dati sanitari.",
    ] },
    { t: 'h3', x: 'Se manca qualcosa' },
    { t: 'p', x: "Non pubblichi. Raccolga il consenso mancante, riscatti l'immagine o scelga un contenuto che non ritrae persone. In caso di dubbio, chieda al consulente." },
    { t: 'note', kind: 'info', title: 'Dove tenerla', x: 'Tenga la checklist a portata della segreteria e di chi gestisce i social. La stessa lista vale per foto, video e repost.' },

    { t: 'pagebreak' },

    // ---- Pagina 8 · disclaimer + campi ----
    { t: 'h2', x: '8. Validazione e campi da compilare' },
    { t: 'disclaimer', x: "Questo documento è un modello operativo. Non sostituisce una consulenza legale. Farlo validare dal proprio consulente prima dell'uso." },
    { t: 'p', x: "Le caselle, l'informativa e le durate di conservazione sono un punto di partenza: il consulente le adatta allo studio prima dell'uso." },
    { t: 'h3', x: 'Campi da compilare' },
    { t: 'tokens', items: [
      ['[NOME STUDIO]', 'Il nome dello studio, come appare nei consensi.'],
      ['[INDIRIZZO]', 'La sede dello studio, titolare del trattamento.'],
      ['[EMAIL]', 'Il contatto dello studio per esercitare i diritti o revocare.'],
      ['[TELEFONO]', 'Il recapito telefonico dello studio.'],
      ['[NOME PAZIENTE]', 'Nome e cognome del paziente che firma.'],
      ['[DATA DI NASCITA]', 'Data di nascita del paziente, per identificarlo.'],
      ['[DATA]', 'La data della firma.'],
      ['[NOME GENITORE]', 'Nome e cognome di chi esercita la responsabilità genitoriale.'],
      ['[RELAZIONE]', 'Il legame con il minore (genitore, tutore).'],
    ] },
    { t: 'note', kind: 'info', title: 'Promemoria', x: "Raccolga i consensi prima di scattare o pubblicare. Archivi i moduli con l'anagrafica (KB04) e registri revoche e permessi di repost." },
  ],
};