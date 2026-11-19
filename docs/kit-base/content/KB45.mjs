export default {
  id: 'KB45',
  area: 'F',
  areaName: 'Social',
  title: 'FAQ dei pazienti, trasformate in post',
  format: 'text',
  size: 'A4',
  pages: null,
  words: 2500,
  printable: false,
  noteBox: null,
  footerLine: null,
  blocks: [
    { t: 'p', x: "Dieci domande che i pazienti fanno davvero, al telefono o in poltrona. Per ognuna trova la risposta da dare al paziente, una caption pronta per il post e gli hashtag. Le risposte sono modelli: il contenuto clinico lo completa e lo valida il medico dello studio." },
    { t: 'h2', x: 'Come si usa' },
    { t: 'ol', items: [
      'Sostituisca i campi tra parentesi quadre con i dati del suo studio.',
      'Porti le risposte al medico: dove trova [DA VALIDARE A CURA DEL CLINICO], il contenuto clinico va scritto o approvato da lui.',
      'Adatti le risposte organizzative, come tempi e documenti, a come funziona davvero il suo studio.',
      'Pubblichi una domanda alla volta, con la caption indicata. Le grafiche le prende da KB37 e KB46, il calendario da KB36.',
      'Quando un paziente fa la stessa domanda nei commenti o in chat, risponda con questo testo, registro Lei.',
    ] },
    { t: 'h2', x: 'Le dieci domande' },
    { t: 'p', x: "Le domande sono in ordine di frequenza al telefono: paura e dolore, tempi, igiene, bambini, costi, urgenze. Ogni risposta è scritta per essere letta ad alta voce o copiata in una chat, senza adattamenti. Dove il contenuto è clinico, il segnaposto indica che la frase definitiva la scrive il medico." },

    { t: 'h3', x: '1. La visita fa male?' },
    { t: 'p', x: "La prima visita è un controllo: il medico guarda, ascolta e, se serve, fa radiografie. Di norma non è una seduta dolorosa. Se ha paura del dolore, ce lo dica quando prenota: lo segnamo e il medico ne tiene conto. Durante la visita può dirci in ogni momento che cosa sente. Se una manovra le dà fastidio, ci fermiamo e le spieghiamo le alternative. Anche una breve pausa può bastare per riprendere fiato." },
    { t: 'p', x: "Per le cure che richiedono anestesia, il medico le spiega prima che cosa userà e come agirà: [DA VALIDARE A CURA DEL CLINICO]. La regola dello studio è semplice: nessuna procedura inizia senza che lei sappia che cosa stiamo per fare. Se ha avuto esperienze negative in passato, ce le racconti: ci aiuta a impostare la visita nel modo giusto per lei. Porti con sé le sue domande, anche scritte su un foglio: le rispondiamo una per una." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'La visita fa male? Rispondiamo prima che ce lo chieda.',
      'La prima visita è un controllo. Se ha paura del dolore, ce lo dica quando prenota: ne teniamo conto. E può fermarci in ogni momento.',
      '#dentista #[CITTÀ] #pauradeldentista',
    ] },

    { t: 'h3', x: '2. Quanto dura una seduta?' },
    { t: 'p', x: "Dipende dal tipo di appuntamento. La prima visita dura circa [DURATA VISITA]: il tempo di parlare con lei, visitare e, se serve, fare radiografie. Una seduta di igiene dura circa [DURATA IGIENE]. Le cure hanno tempi diversi a seconda del trattamento: il medico glielo dice quando le presenta il piano, prima di fissare gli appuntamenti." },
    { t: 'p', x: "Quando prenota, le diamo una durata indicativa e le chiediamo di arrivare [MINUTI] minuti prima per l'accettazione. Le diciamo anche che cosa portare, se serve qualcosa di particolare. Se ha impegni subito dopo, ce lo dica: cerchiamo di collocare l'appuntamento in modo che lei possa organizzarsi. Se una seduta richiede più tempo del previsto, glielo diciamo durante la visita, non alla fine. Per gli appuntamenti lunghi prevediamo pause: basta chiederle. Se deve spostare l'appuntamento, ce lo comunichi appena può: troviamo un altro momento." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'Quanto dura una seduta? Dipende dall\'appuntamento.',
      'Prima visita: [DURATA VISITA]. Igiene: [DURATA IGIENE]. Per le cure, il medico le indica i tempi prima di fissare gli appuntamenti. Se ha impegni dopo, ce lo dica quando prenota.',
      '#dentista #[CITTÀ] #primavisita',
    ] },

    { t: 'h3', x: '3. Ogni quanto devo fare l\'igiene?' },
    { t: 'p', x: "Non c'è una scadenza uguale per tutti. L'intervallo giusto dipende dalla sua situazione: quanto tartaro tende a formare, la salute delle gengive, eventuali trattamenti in corso. Per questo lo decide il medico dopo averla visitata, e glielo diciamo alla fine della seduta. Come indicazione generale: [DA VALIDARE A CURA DEL CLINICO]." },
    { t: 'p', x: "Quello che possiamo dirle fin da ora è che l'igiene professionale e la pulizia quotidiana a casa lavorano insieme: spazzolino e filo o scovolino tutti i giorni, l'igienista secondo il calendario che le diamo. Se nota sanguinamento quando spazzola, alito cattivo persistente o gengive gonfie, ce lo segnali al [TELEFONO]: il medico valuterà se anticipare il controllo. Non aspetti la scadenza se qualcosa è cambiato. Alla fine di ogni seduta le proponiamo la data del controllo successivo, così non deve ricordarsela da solo." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'Ogni quanto fare l\'igiene? Dipende dalla sua bocca.',
      'L\'intervallo lo indica il medico dopo la visita, in base alla sua situazione. A casa, spazzolino e filo tutti i giorni. Se qualcosa cambia, ce lo segnali: valutiamo se anticipare.',
      '#dentista #[CITTÀ] #igienedentale',
    ] },

    { t: 'h3', x: '4. Quando porto i bambini per la prima visita?' },
    { t: 'p', x: "L'età giusta per la prima visita la indica il medico in base allo sviluppo del bambino: [DA VALIDARE A CURA DEL CLINICO]. Da parte nostra, le raccontiamo come funziona la prima visita dei piccoli in [NOME STUDIO]. Il bambino resta con il genitore per tutto il tempo. La prima volta serve soprattutto a conoscersi: il medico mostra la poltrona, gli strumenti, conta i denti con uno specchietto." },
    { t: 'p', x: "Le chiediamo di preparare il bambino a casa con parole semplici, evitando racconti di esperienze negative o parole che spaventano. Se il bambino è molto piccolo o ha avuto esperienze mediche difficili, ce lo dica quando prenota: organizziamo l'appuntamento in un momento tranquillo della giornata. Dopo la visita, il medico le dà indicazioni su spazzolino e abitudini quotidiane: [DA VALIDARE A CURA DEL CLINICO]." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'Bambini: la prima visita si prepara a casa.',
      'Parole semplici, niente racconti che spaventano. In studio il genitore resta con il bambino per tutto il tempo: la prima visita serve a conoscersi. Per fissarla, chiami il [TELEFONO].',
      '#dentista #[CITTÀ] #dentistabambini',
    ] },

    { t: 'h3', x: '5. Ho paura del dentista e dell\'anestesia. Come funziona da voi?' },
    { t: 'p', x: "La paura del dentista è comune, e non c'è nulla di cui vergognarsi. Ce lo dica quando prenota: lo scriviamo in agenda e il medico lo sa prima di incontrarla. In studio usiamo un segnale concordato, di solito la mano alzata: quando lo fa, ci fermiamo. Prima di ogni manovra le spieghiamo che cosa stiamo per fare e perché." },
    { t: 'p', x: "Per l'anestesia, il medico le descrive il prodotto e la tecnica che userà nel suo caso: [DA VALIDARE A CURA DEL CLINICO]. Se ha avuto reazioni o esperienze negative con l'anestesia in passato, ce le riferisca prima della visita: sono informazioni importanti. Possiamo prevedere appuntamenti più brevi e pause frequenti. L'obiettivo è che lei sappia sempre che cosa succede e possa fermarci quando vuole. Se preferisce, la prima volta può essere solo un colloquio, senza salire in poltrona." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'Paura del dentista? Ce lo dica quando prenota.',
      'Lo scriviamo in agenda. Concordiamo un segnale per fermarci, le spieghiamo ogni manovra prima di farla. Se vuole, la prima volta è solo un colloquio. Scriva al [NUMERO WHATSAPP].',
      '#dentista #[CITTÀ] #pauradeldentista',
    ] },

    { t: 'h3', x: '6. Quanto costa una cura? Posso avere un preventivo?' },
    { t: 'p', x: "Il costo dipende dal trattamento che serve a lei, quindi non possiamo dare una cifra senza averla visitata. Il nostro metodo è questo: dopo la visita, il medico le presenta un preventivo scritto con le voci di spesa, le alternative possibili e i tempi. Lei decide con calma, senza impegno. Se il piano prevede più fasi, le spieghiamo quali sono prioritarie e quali possono essere programmate." },
    { t: 'p', x: "Prima di iniziare qualsiasi cura, lei ha in mano il preventivo e lo ha approvato. Se durante la cura emerge qualcosa di non previsto, ci fermiamo, glielo spieghiamo e aggiorniamo il preventivo prima di procedere. Per domande su pagamenti e rate, la segreteria le dà tutte le informazioni al [TELEFONO]. Se ha un fondo sanitario o un'assicurazione, ce lo dica: verifichiamo insieme come procedere." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'Quanto costa? Prima la visita, poi il preventivo scritto.',
      'Ogni cura ha un costo diverso: per questo il preventivo arriva dopo la visita, con voci, alternative e tempi. Lei decide senza impegno. Per informazioni, chiami il [TELEFONO].',
      '#dentista #[CITTÀ] #preventivodentistico',
    ] },

    { t: 'h3', x: '7. Ho un\'urgenza: che cosa devo fare?' },
    { t: 'p', x: "Chiami subito il [TELEFONO] negli orari [ORARI]. Alla segreteria dica che cosa è successo, da quanto tempo e che cosa sente: dolore, gonfiore, un trauma, una corona saltata. In base a quello che ci racconta, le diamo un appuntamento di urgenza e le diciamo che cosa fare nell'attesa. Le indicazioni cliniche per l'attesa gliele dà il medico al telefono: [DA VALIDARE A CURA DEL CLINICO]." },
    { t: 'p', x: "Non assuma farmaci di sua iniziativa e non applichi rimedi trovati online senza averci sentito. Se l'urgenza avviene fuori orario: [GESTIONE URGENZE FUORI ORARIO]. In caso di trauma con sanguinamento importante, difficoltà a respirare o a deglutire, si rivolga al pronto soccorso. Porti con sé l'elenco dei farmaci che assume. Se è già paziente dello studio, lo dica: abbiamo la sua storia clinica." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'Urgenza dentale? Il primo passo è una telefonata.',
      'Chiami il [TELEFONO] negli orari [ORARI]: dica che cosa è successo e che cosa sente. Le diciamo noi che cosa fare nell\'attesa. Per le urgenze fuori orario: [GESTIONE URGENZE FUORI ORARIO].',
      '#dentista #[CITTÀ] #urgenzadentale',
    ] },

    { t: 'h3', x: '8. L\'apparecchio si può mettere da adulti?' },
    { t: 'p', x: "È una domanda che sentiamo spesso. La risposta dipende dalla salute dei suoi denti e delle gengive, quindi la valutazione va fatta in visita: [DA VALIDARE A CURA DEL CLINICO]. In studio le spieghiamo quali opzioni esistono per il suo caso, compresi gli allineatori trasparenti, e quali differenze ci sono in termini di tempi, manutenzione e costo." },
    { t: 'p', x: "Le mostriamo che cosa è realistico aspettarsi dal trattamento e quali sono i limiti: [DA VALIDARE A CURA DEL CLINICO]. Prima di qualsiasi proposta, lei riceve un preventivo scritto e decide senza impegno. Se ha già fatto ortodonzia da ragazzo e i denti si sono spostati, ce lo dica: è una situazione che vediamo spesso e che si può valutare. Per prenotare la visita ortodontica, chiami il [TELEFONO] o usi il link in bio." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'Apparecchio da adulti? Si valuta in visita.',
      'Conta la salute di denti e gengive. In visita le spieghiamo le opzioni, i tempi e i costi, con un preventivo scritto. Prenoti dal link in bio o al [TELEFONO].',
      '#dentista #[CITTÀ] #ortodonziaadulti',
    ] },

    { t: 'h3', x: '9. Lo sbiancamento fa male? Rovina i denti?' },
    { t: 'p', x: "Le domande sullo sbiancamento sono quasi sempre queste due. La risposta dipende dal prodotto, dalla tecnica e dalla sua situazione di partenza: per questo se ne parla in visita. Il medico valuta smalto e gengive e le dice se il trattamento è indicato per lei: [DA VALIDARE A CURA DEL CLINICO]." },
    { t: 'p', x: "Durante il trattamento può comparire sensibilità: il medico le spiega come viene gestita e che cosa può fare a casa: [DA VALIDARE A CURA DEL CLINICO]. Prima di usare prodotti sbiancanti comprati online o in profumeria, ne parli con il medico: il fai-da-te senza controllo può creare problemi che poi richiedono cure. In studio le mostriamo che cosa è realistico aspettarsi nel suo caso, prima di iniziare. Se ha già fatto sbiancamenti in passato, ce lo dica: il medico ne tiene conto nella valutazione. Per informazioni, chiami il [TELEFONO]." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'Sbiancamento: fa male? Rovina i denti?',
      'Dipende dal prodotto e dalla sua situazione di partenza. Per questo si valuta in visita: il medico le dice se è indicato per lei e che cosa aspettarsi. Chiami il [TELEFONO].',
      '#dentista #[CITTÀ] #sbiancamento',
    ] },

    { t: 'h3', x: '10. Che cosa devo portare alla prima visita?' },
    { t: 'p', x: "Un documento di identità e la tessera sanitaria. Se ha già fatto radiografie o esami recenti, li porti: va bene anche il formato digitale sul telefono. L'elenco dei farmaci che assume, con i dosaggi: se preferisce, porti direttamente le confezioni. Se ha un fondo sanitario o un'assicurazione, la tessera o il riferimento della pratica. Se è stato inviato da un altro medico, il nome del collega o la lettera di invio." },
    { t: 'p', x: "Le chiediamo di arrivare [MINUTI] minuti prima dell'orario, il tempo di compilare i moduli di accettazione e i consensi. Se ha difficoltà a stare sdraiato a lungo o altre esigenze, ce lo segnali quando conferma: troviamo una soluzione. Alla fine della visita, il medico le spiega che cosa ha rilevato e le opzioni possibili, con i costi. Trova tutti i dettagli nella pagina che le inviamo con la conferma dell'appuntamento." },
    { t: 'script', label: 'CAPTION PRONTA', lines: [
      'Prima visita? Ecco che cosa portare.',
      'Documento e tessera sanitaria, esami recenti se li ha, elenco dei farmaci. Arrivi [MINUTI] minuti prima per l\'accettazione. Le inviamo tutti i dettagli con la conferma dell\'appuntamento.',
      '#dentista #[CITTÀ] #primavisita',
    ] },

    { t: 'h2', x: 'Una FAQ, più contenuti' },
    { t: 'p', x: "Ogni domanda di questo modulo può diventare più uscite, senza riscrivere nulla. Il post con la caption indicata è il primo. Nelle storie, riprenda la domanda con il box domande (KB38) e risponda il giorno dopo. Se la domanda si presta a un video, usi lo script corrispondente di KB40: la paura, i bambini, l'urgenza e la prenotazione hanno già uno script dedicato. Le domande più utili le raccolga nelle highlights FAQ, con la copertina di KB61." },
    { t: 'p', x: "Quando un paziente fa una domanda nuova che si ripete, la aggiunga a questo elenco: la risposta la scrive con il medico, con la stessa struttura. Domanda, risposta validata, caption, hashtag. Il calendario contenuti (KB36) le dice quando pubblicarla. Se una risposta cambia, aggiorni anche la caption e il post già pubblicato: quello che legge online deve corrispondere a quello che sente in studio." },
    { t: 'h2', x: 'Note' },
    { t: 'ul', items: [
      'Le risposte cliniche definitive le scrive il medico: questo modulo fornisce la struttura e il tono, non il contenuto clinico.',
      'Niente promesse di risultato e niente cifre inventate: tempi e costi vivono nei placeholder.',
      'Nei commenti risponda con registro Lei. Se la domanda è clinica e personale, inviti a chiamare lo studio: niente consigli clinici in pubblico.',
      'Il primo rigo della caption deve funzionare anche da solo: è quello che si legge nell\'anteprima. Gli hashtag restano in fondo, mai nel corpo.',
      'Ogni caption è pensata per stare nei limiti dei canali: se la allunga, ricontrolli che il testo non venga tagliato nell\'anteprima.',
    ] },
  ],
};