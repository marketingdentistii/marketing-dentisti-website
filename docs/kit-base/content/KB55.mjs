export default {
  id: 'KB55',
  area: 'G',
  areaName: 'Percorso',
  title: 'Bambini: scheda da colorare e attestato',
  format: 'gslides',
  size: 'A4',
  pages: 2,
  words: null,
  printable: true,
  noteBox: null,
  footerLine: 'contenuti',
  slides: [
    {
      kind: 'coloring',
      art: 'tooth-hero',
      title: 'Il mio amico dentino',
      body: [
        'Colora il dentino e il suo spazzolino: usa i colori che ti piacciono di più.',
        'Il mio nome è: [NOME BAMBINO]',
      ],
    },
    {
      kind: 'certificate',
      size: 'A5',
      title: 'Attestato di piccolo coraggioso',
      body: [
        'Questo attestato è per [NOME BAMBINO].',
        'Oggi, [DATA], ha affrontato la visita da [NOME STUDIO] con coraggio e collaborazione.',
        'Il team di [NOME STUDIO] è contento di averti incontrato.',
        '[NOME MEDICO] · [NOME STUDIO]',
        'Firma del medico: ____________________',
      ],
    },
  ],
};