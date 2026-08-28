/* ============================================================
   TABLEAU 3 BIS — LA CELLULE, DE L'AUTRE CÔTÉ DU SAS.

   Chantier 33 (PLAN_CAPACITES_ET_RESEAU § 3, Trash — Projection
   astrale) : « il peut quitter son corps. Aller voir là où l'équipe
   ne peut pas entrer — une pièce fermée, l'autre côté d'un sas. Cousin
   direct de la vue rapprochée : un autre cadre, sans déplacement. »

   MÊME MÉCANIQUE TECHNIQUE que `quai-voilier.js` (PLAN_VUES_RAPPROCHEES) :
   un second markup du même geste que `charge()`, gratuit, hors de
   `carte.js`. Ce qui change, c'est QUI y va : pas les quatre, un seul —
   et c'est ce qu'écrit chaque hotspot ci-dessous quand `qui !== 'trash'`.
   Le corps de Trash reste au greffe ; ses coéquipiers le constatent,
   ils ne voient pas ce qu'il voit. Aucun `.pj` dans le markup : comme
   au voilier, cette vue ne montre pas de corps, ici encore moins que
   là-bas — Trash n'en a, pour l'instant, plus.

   PAS DE FLAG NEUF. `etat.visites['greffe-cellule']` (posé par
   `charge()`) suffit à distinguer premier passage et retour — le même
   geste que `quai.js` depuis le chantier 13, pas une invention de plus.
   ============================================================ */

export const greffeCellule = {
  markup: 'scenes/greffe-cellule.html',

  ouverture: (ctx, visite) => visite > 1
    ? ['La cellule, encore. Rien n’y a changé — c’est bien tout le problème, et c’est aussi la bonne nouvelle.']
    : ['Un couloir de deux mètres, un battant, et une cellule qui ne payait pas de mine derrière ses gonds.',
       'Ici, il n’y a pas de corps à faire entrer. Juste un regard qui passe où le reste de l’équipe ne peut pas encore aller.'],

  hotspots: {

    lester: {
      nom: 'Lester',
      regarder: ({ qui }) => qui !== 'trash'
        ? { tous: 'Tu regardes Trash. Il n’a pas bougé, et ses yeux sont ouverts sur rien.',
            hercules: '« Il fait ça souvent ? » — personne ne répond, personne ne sait.',
            drakk: '« Il respire encore. C’est tout ce que je peux constater d’ici. »',
            rabbit: '« Aucun signal ne sort de lui. Je déteste ne rien pouvoir lire là-dessus. »' }
        : { tous: ['Une silhouette maigre, assise sur la paillasse, le dos au mur, les genoux remontés.',
                   'Il ne dort pas. Il compte les fissures du plafond, ou fait semblant d’en avoir besoin.',
                   'Seul. Pas d’autre présence dans le couloir, aucun garde posté à la porte.'],
            trash: ['« Il va bien. Personne ne l’a touché. »',
                    '« Ce n’est pas rien, cette nuit-là. Il ne le sait pas encore. »'] },
      utiliser: {
        tous: 'On ne touche pas ce qu’on ne fait que regarder.',
        trash: '« Une présence, ça se garde discrète. Je regarde, je ne me pose pas. »',
      },
      parler: {
        tous: 'Le verre et deux mètres de couloir. Même en le voulant, la voix ne passerait pas.',
        trash: '« Il ne peut pas m’entendre. Tant mieux — il a déjà assez peur comme ça. »',
      },
    },

    cellule: {
      nom: 'La cellule',
      regarder: ({ qui }) => qui !== 'trash'
        ? 'Tu ne vois que le mur du guichet, et Trash devant, immobile.'
        : { tous: 'Un lit vissé, un lavabo, une lumière au plafond qui ne s’éteint jamais.',
            trash: '« Rien n’y a laissé de trace. Dix-huit ans, et cette pièce n’a pas de mémoire. »' },
      utiliser: 'Un décor qu’on ne touche pas, qu’on soit là ou pas.',
    },

    revenir: {
      nom: 'Revenir',
      sortie: 'greffe',
      regarder: { tous: 'Le fil qui relie Trash à son corps, ténu, mais entier.' },
      utiliser: {
        tous: 'Trash cligne des yeux. Il est de retour derrière la vitre, dans son corps, les jambes un peu molles.',
        va: 'greffe',
      },
    },
  },

  dialogues: {},
}
