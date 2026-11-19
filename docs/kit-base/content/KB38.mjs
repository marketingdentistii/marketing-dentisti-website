export default {
  id: 'KB38',
  area: 'F',
  areaName: 'Social',
  title: 'Storie: sondaggi, quiz, Q&A e countdown',
  format: 'gslides',
  size: 'story',
  pages: null,
  words: null,
  printable: false,
  noteBox: null,
  footerLine: 'contenuti',
  slides: [
    // 1 · Sondaggio
    {
      kind: 'story',
      title: 'Come preferisce i promemoria?',
      subtitle: 'Il canale lo decidiamo con lei',
      body: ['Voti con un tocco.', 'Useremo il canale più votato.'],
      badge: 'Sondaggio',
      options: ['WhatsApp', 'Telefono'],
      footer: '[NOME STUDIO]',
    },
    // 2 · Quiz
    {
      kind: 'story',
      title: 'Come si prenota una visita?',
      subtitle: 'Quiz dello studio',
      body: ['Tocchi la risposta corretta.', 'La spiegazione compare dopo il voto.'],
      badge: 'Quiz',
      options: ['Telefono o WhatsApp', 'Solo di persona'],
      answer: 'Telefono o WhatsApp: al [TELEFONO] o su WhatsApp, negli orari [ORARI].',
      footer: '[NOME STUDIO]',
    },
    // 3 · Q&A
    {
      kind: 'story',
      title: 'Ci faccia una domanda',
      subtitle: 'Rispondiamo nelle prossime storie',
      body: ['Esempio: «Posso spostare', 'un appuntamento il giorno stesso?»', 'Sì: ci avvisi al [TELEFONO].'],
      badge: 'Q&A',
      footer: '[NOME STUDIO]',
    },
    // 4 · Sondaggio
    {
      kind: 'story',
      title: 'Quando preferisce gli appuntamenti?',
      subtitle: 'Così organizziamo meglio l\'agenda',
      body: ['Voti con un tocco.'],
      badge: 'Sondaggio',
      options: ['Mattina', 'Pomeriggio'],
      footer: '[NOME STUDIO]',
    },
    // 5 · Countdown di apertura
    {
      kind: 'story',
      title: 'Riapriamo [DATA]',
      subtitle: 'Countdown alla riapertura dopo le ferie',
      body: ['Lo studio riapre [DATA]', 'con gli orari [ORARI].', 'Prenotazioni: [TELEFONO].'],
      badge: 'Countdown',
      footer: '[NOME STUDIO]',
    },
    // 6 · Quiz
    {
      kind: 'story',
      title: 'Cosa portare alla prima visita?',
      subtitle: 'Quiz dello studio',
      body: ['Tocchi la risposta corretta.', 'La spiegazione compare dopo il voto.'],
      badge: 'Quiz',
      options: ['Documenti ed esami recenti', 'Solo la tessera sanitaria'],
      answer: 'Documenti ed esami recenti: documento, tessera sanitaria ed eventuali radiografie già fatte.',
      footer: '[NOME STUDIO]',
    },
    // 7 · Q&A
    {
      kind: 'story',
      title: 'Le domande più frequenti',
      subtitle: 'Ce ne mandi una: rispondiamo qui',
      body: ['Esempio: «Come funziona', 'la lista d\'attesa?» Se si libera', 'uno slot, chiamiamo chi è in lista.'],
      badge: 'Q&A',
      footer: '[NOME STUDIO]',
    },
    // 8 · Sondaggio
    {
      kind: 'story',
      title: 'Di cosa parliamo nei prossimi post?',
      subtitle: 'Scelga l\'argomento che le interessa',
      body: ['Voti con un tocco.'],
      badge: 'Sondaggio',
      options: ['Vita dello studio', 'Domande dei pazienti'],
      footer: '[NOME STUDIO]',
    },
    // 9 · Quiz
    {
      kind: 'story',
      title: 'Se deve disdire un appuntamento?',
      subtitle: 'Quiz dello studio',
      body: ['Tocchi la risposta corretta.', 'La spiegazione compare dopo il voto.'],
      badge: 'Quiz',
      options: ['Avvisare appena possibile', 'Disdire il giorno dopo'],
      answer: 'Avvisare appena possibile: al [TELEFONO]. Lo slot può così andare a chi è in lista d\'attesa.',
      footer: '[NOME STUDIO]',
    },
    // 10 · Countdown nuovo orario
    {
      kind: 'story',
      title: 'Nuovo orario dal [DATA]',
      subtitle: 'Countdown al cambio di orario',
      body: ['Da [DATA] lo studio apre', 'con i nuovi orari: [ORARI].', 'Info: [TELEFONO].'],
      badge: 'Countdown',
      footer: '[NOME STUDIO]',
    },
  ],
};
