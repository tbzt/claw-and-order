/* ============================================================
   TABLEAU 6 BIS — LE TRIBUNAL, LE PARVIS.

   Chantier 20b. Vue large du même nœud que `tribunal-salle` (chantier
   20a, déjà livré) — même geste que `quai` / `quai-voilier` (chantier
   25) : s'approcher de la salle ne coûte rien, `entree-salle` n'a pas de
   `minutes`. `PLAN_TRAME_ACTES_III_IV.md` §5.1-5.2.

   PLACEHOLDER FONCTIONNEL, PAS UN PIXEL DESSINÉ — même réserve que
   `tribunal-salle.js`. L'art des deux tableaux reste à faire, dans
   l'atelier, à part.

   Le passage par la planque a déjà fait vingt minutes de marche
   (`planque.js`, `porte.utiliser`) ; on arrive donc directement devant
   le palais, accrédité — le mandat et le contrat ont déjà ouvert la
   porte, ce tableau ne fait que le raconter. */

export const tribunal = {
  markup: 'scenes/tribunal.html',

  ouverture: [
    'Le mandat suffit aux détecteurs, l’accréditation suffit aux gardes. Personne n’a demandé les armes — pas encore.',
    'Le palais de justice de Downtown, à l’heure où les couloirs se remplissent. Neuf heures moins dix.',
  ],

  hotspots: {

    sculptures: {
      nom: 'Les deux Justice',
      regarder: {
        tous: 'Deux figures encapuchonnées penchées sur l’entrée. Ni l’une ni l’autre ne tient de balance — celle-là a été volée il y a longtemps, et personne ne l’a remplacée.',
        drakk: '« Des idoles sans regard. Ma déesse en aurait honte. »',
      },
    },

    gardes: {
      nom: 'Les gardes de l’entrée',
      regarder: {
        tous: 'Deux gardes, l’accréditation vérifiée deux fois. Le mandat de McCarthy et le contrat ont fait le travail — ils ne serviront plus après aujourd’hui.',
        hercules: '« Voilà des papiers qui ont enfin servi à quelque chose. »',
      },
    },

    /* L'arme de Wilson, traçable depuis quai-voilier (`corps.utiliser`,
       tableau 2), jamais mentionnée depuis. Un seul beat, pas une vraie
       fourche : le texte dit qu'elle se paie ici, pas qu'elle bloque
       l'entrée (§5.2 du plan). */
    detecteurs: {
      nom: 'Les détecteurs',
      regarder: {
        tous: 'Un cadre métallique, et un garde qui regarde l’écran plus que vous.',
        rabbit: '« Détection de masse ferreuse. Standard. Pas de quoi s’inquiéter — sauf raison de s’inquiéter. »',
      },
      utiliser: ({ tient }) => tient('arme')
        ? {
            tous: ['L’arme de Wilson pèse dans une poche depuis le quai. Personne ne l’a mentionnée jusqu’ici — le détecteur, lui, ne l’oubliera pas.',
                   'Un garde tend la main sans un mot. Vous la laissez en dépôt.'],
            drakk: '« Une lame ne sonne pas. Un P-au poing, si. Il fallait choisir avant d’arriver. »',
            hercules: '« On la récupérera en sortant. Ou pas. On verra ce qui compte le plus, en sortant. »',
            flags: ['arme-declaree'], retire: ['arme'],
          }
        : 'Rien à déclarer. Le détecteur reste muet, comme le reste de l’équipe.',
    },

    /* Le decoy que le jeu doit refuser en voix — pas une vraie option. */
    fenetre: {
      nom: 'Une fenêtre du deuxième étage',
      regarder: {
        tous: 'Entrouverte, donnant sur un couloir de service visiblement peu surveillé.',
        drakk: '« Une entrée qu’on ne vous montre pas d’habitude. Ça se remarque, une porte qu’on oublie de fermer. »',
      },
      utiliser: {
        tous: 'Non. Vous avez un mandat, une accréditation, et une audience dans quelques minutes. Ce n’est pas ce genre de travail.',
        hercules: '« On est de son côté aujourd’hui. Entrons par où on nous attend. »',
      },
    },

    galeries: {
      nom: 'Les couloirs',
      regarder: {
        tous: 'Des avocats au bord de la crise, des gardes qui changent de pied trop souvent, des familles qui portent le deuil d’autres affaires. Personne, ici, n’est venu pour Lester.',
      },
    },

    mccarthy: {
      nom: 'McCarthy',
      regarder: {
        tous: 'En civil, une chemise qui a connu une nuit plus longue que la vôtre. Vous ne l’aviez pas revu depuis le bar.',
      },
      parler: {
        tous: '« Ne me remerciez pas encore. On n’a encore rien gagné. »',
      },
    },

    /* Le premier vrai emploi de « sens du danger » hors de `retour` —
       jamais résolu, comme le veut le plan §5.2. Même convention que
       `retour.js`/`planque.js` : câblé en dur sur `qui === 'hercules'`,
       pas sur une lecture de `signature` (que rien, nulle part dans le
       moteur, ne lit — voir `equipe.js`). */
    'garde-trouble': {
      nom: 'Un garde, près de la porte',
      regarder: ({ qui }) => qui === 'hercules'
        ? { tous: 'Il vous regarde un peu trop longtemps.',
            hercules: '« Celui-là. Je ne sais pas pourquoi. Alan Jones, une mauvaise nuit, ou juste un uniforme mal coupé — je ne le saurai pas avant qu’il soit trop tard. »' }
        : 'Un garde parmi d’autres.',
    },

    /* Vue rapprochée gratuite vers `tribunal-salle` (chantier 25, même
       geste). Aucun `minutes` sur cette réaction : s'approcher de la
       salle ne coûte rien. */
    entree: {
      nom: 'Les portes de la salle d’audience',
      sortie: 'tribunal-salle',
      regarder: {
        tous: 'Deux battants de bois sombre, déjà entrebâillés. On entend la salle avant de la voir.',
      },
      utiliser: {
        tous: 'Vous poussez les portes.',
        va: 'tribunal-salle',
      },
    },
  },

  vues: {
    ra: ['La RA du palais est presque vide — des balises d’orientation, un flux d’audiences. Une exception, au plafond : une caméra araignée qui ne devrait pas être là, une patte repliée contre une poutre.',
         '« Elle ne bouge pas. Elle regarde quand même. »'],
    astrale: ['Le plan astral d’un tribunal ne devrait pas avoir peur. Celui-ci, si — un courant froid qui descend du couloir du fond, comme si quelque chose venait d’y passer vite.',
              '« Ce n’est pas hanté. C’est juste que trop de monde, ici, a eu peur au même endroit. »'],
    tactique: ['Angles de tir, sorties, lignes de vue : Drakk lit la salle comme un champ de bataille qu’elle n’est pas censée être.',
               '« Une seule sortie civilisée. C’est une donnée, pas une accusation. »'],
  },

  dialogues: {},
}
