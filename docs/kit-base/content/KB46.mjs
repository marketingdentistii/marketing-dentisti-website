export default {
  id: 'KB46',
  area: 'F',
  areaName: 'Social',
  title: 'Grafiche di servizio',
  format: 'gslides',
  size: 'square',
  pages: null,
  words: null,
  printable: false,
  noteBox: null,
  footerLine: 'contenuti',
  slides: [
    // 1 · Ferie / chiusura
    {
      kind: 'content',
      title: 'Chiusura per ferie',
      subtitle: 'Le date della pausa estiva',
      body: ['Saremo chiusi dal [DATA] al [DATA]. Riapriamo [DATA] con gli orari [ORARI]. Per esigenze durante la pausa, il riferimento è [TELEFONO].'],
      badge: 'Ferie',
      footer: '[NOME STUDIO]',
    },
    // 2 · Ferie / chiusura
    {
      kind: 'content',
      title: 'Chiusura straordinaria',
      subtitle: 'Una chiusura fuori dal calendario abituale',
      body: ['Lo studio resta chiuso [DATA]. Riapriamo [DATA] con gli orari [ORARI]. Gli appuntamenti già fissati vengono spostati: la segreteria la contatta per riprogrammarli.'],
      badge: 'Chiusura',
      footer: '[NOME STUDIO]',
    },
    // 3 · Nuovo orario
    {
      kind: 'content',
      title: 'Nuovo orario di apertura',
      subtitle: 'Dal [DATA] cambiano gli orari dello studio',
      body: ['Da [DATA] lo studio apre con i nuovi orari: [ORARI]. Le prenotazioni già fissate restano invariate. Per spostare un appuntamento: [TELEFONO].'],
      badge: 'Nuovo orario',
      footer: '[NOME STUDIO]',
    },
    // 4 · Nuovo orario
    {
      kind: 'content',
      title: 'I nuovi orari dello studio',
      subtitle: 'Un promemoria con gli orari aggiornati',
      body: ['Da [DATA] siamo aperti con questi orari: [ORARI]. Per prenotazioni e spostamenti: [TELEFONO]. La segreteria risponde negli stessi orari.'],
      badge: 'Orari',
      footer: '[NOME STUDIO]',
    },
    // 5 · Nuovo servizio
    {
      kind: 'content',
      title: 'Nuovo servizio: [NOME SERVIZIO]',
      subtitle: 'Da [DATA] disponibile in studio',
      body: ['Da [DATA] è disponibile [NOME SERVIZIO]. Per informazioni e per fissare una visita: [TELEFONO]. La segreteria risponde negli orari [ORARI].'],
      badge: 'Novità',
      footer: '[NOME STUDIO]',
    },
    // 6 · Nuovo servizio
    {
      kind: 'content',
      title: 'Come accedere al nuovo servizio',
      subtitle: 'Dalla richiesta alla prima visita',
      body: ['Per accedere a [NOME SERVIZIO] ci contatti al [TELEFONO]. Fissiamo una visita conoscitiva: il medico le spiega il percorso, con tempi e costi.'],
      badge: 'Nuovo servizio',
      footer: '[NOME STUDIO]',
    },
    // 7 · Emergenza / urgenza
    {
      kind: 'content',
      title: 'Urgenze odontoiatriche',
      subtitle: 'Come contattarci quando serve',
      body: ['Se ha un\'urgenza, ci chiami al [TELEFONO] negli orari [ORARI]. La segreteria valuta con lei come procedere e le propone il primo appuntamento utile.'],
      badge: 'Urgenze',
      footer: '[NOME STUDIO]',
    },
    // 8 · Emergenza / urgenza
    {
      kind: 'content',
      title: 'Dolore o problema improvviso',
      subtitle: 'Il numero per le urgenze dello studio',
      body: ['Per un dolore improvviso o un problema urgente, ci chiami al [TELEFONO]. Negli orari [ORARI] risponde la segreteria: le diciamo subito come procedere.'],
      badge: 'Emergenza',
      footer: '[NOME STUDIO]',
    },
    // 9 · Traguardo: anniversario
    {
      kind: 'content',
      title: '[ANNI] anni di attività',
      subtitle: 'Lo studio festeggia un traguardo',
      body: ['Lo studio compie [ANNI] anni di attività. Grazie alle famiglie e ai pazienti che ci hanno scelto in questo tempo. Il team di [NOME STUDIO].'],
      badge: 'Anniversario',
      footer: '[NOME STUDIO]',
    },
    // 10 · Traguardo: nuovo membro del team
    {
      kind: 'content',
      title: 'Benvenuto nel team',
      subtitle: '[NOME MEDICO] entra in studio da [DATA]',
      body: ['Da [DATA] [NOME MEDICO] fa parte del team di [NOME STUDIO]. Per prenotazioni con il nuovo medico: [TELEFONO], negli orari [ORARI].'],
      badge: 'Team',
      footer: '[NOME STUDIO]',
    },
  ],
};
