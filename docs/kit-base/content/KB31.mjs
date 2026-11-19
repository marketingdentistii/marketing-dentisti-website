export default {
  id: 'KB31',
  area: 'E',
  areaName: 'Recensioni',
  title: 'Card QR per la recensione',
  format: 'gslides',
  size: 'A6',
  pages: null,
  words: null,
  printable: true,
  noteBox: null,
  footerLine: 'setup',
  slides: [
    {
      kind: 'card',
      art: 'qr-frame',
      title: "Ci racconta com'è andata?",
      body: [
        "Se le va, lasci una recensione onesta, anche breve, con le sue parole. È utile a chi sta scegliendo uno studio e a noi per capire dove migliorare.",
        "Inquadri il QR con la fotocamera del telefono, oppure visiti [LINK RECENSIONI].",
      ],
      footer: '[NOME STUDIO]',
    },
    {
      kind: 'content',
      title: 'Stampa e crea il suo QR in 2 minuti',
      body: [
        'Stampa: formato A6, su cartoncino, senza ridimensionare. La tenga sul bancone della segreteria e la consegni a fine visita, a chi lo desidera.',
        '1. Dal profilo Google Business dello studio, apra la sezione recensioni e copi il link per chiedere una recensione.',
        '2. Cerchi "generatore QR gratuito" (o usi [LINK GENERATORE QR]), incolli il link delle recensioni e scarichi il QR.',
        '3. Inserisca il QR nel riquadro della card e stampi. Lo provi con il telefono: deve aprire la pagina delle recensioni.',
        "Chieda sempre un'esperienza onesta: nessun voto positivo richiesto, nessun incentivo.",
      ],
    },
  ],
};