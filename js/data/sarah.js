/* ============================================================
   LE CABINET DE SARAH CARPENTER — une halte, pas une planque.
   Routé automatiquement depuis `retour.js` (`barre.utiliser`, `va:
   'sarah'`) quand Lester est touché au goulet. Six heures moins le
   quart.

   CHANTIER 39 — PLAN_PLANQUES.md § 3.6, ÉTAPE B DU § 8 : « Sarah
   redevient une halte. » Playtest du 2026-08-24 (voir § 0 du plan) : la
   salle d'attente d'une clinique de rue n'était défendable comme
   planque que dans un seul cas — quelqu'un déjà blessé, à faire soigner
   — et c'est tout ce que ce tableau fait désormais. Ce n'est plus un
   choix pris au conseil de la traversée : Sarah ne concurrence plus
   Herwick ni Duke, elle n'apparaît que si `lester-blesse`, et on la
   quitte vers la même destination qu'on aurait prise sans elle.

   ══ CE QUI A SAUTÉ, ET POURQUOI ═══════════════════════════════════
   Le bloc G5 (les sept `conf-*`), la lecture du dossier, le tir de
   8 h 40 (`sarah-brulee`, `patient-touche`, la fiche `tir-sarah`) et le
   seuil de confiance sur la porte. Aucun de ces mécanismes n'a de sens
   pour un arrêt de quelques minutes : le dossier se lit à la vraie
   planque (garde-fou § 4.2, qui exempte explicitement la halte), la
   confiance de Lester s'y gagne aussi, et rien ici ne justifie un
   second tir — Sarah n'est plus l'hôte qui encaisse à la place de
   l'équipe, elle est le détour qui soigne avant d'y arriver.

   ══ CE QUI SURVIT ═══════════════════════════════════════════════
   Le décor, les dialogues qui restent, et trois gains, tous à voix
   humaine plutôt qu'au téléphone ou dans un dossier : `lester-soigne`
   (le bras vraiment recousu, pas l'écharpe rayée de Trash — « un gamin
   qui se tient droit à la barre, ça se voit à l'audience »),
   `elfe-autopsie` (l'autopsie confirmée de vive voix) et
   `teresa-cliente` (Sarah est la seule personne du jeu à pouvoir dire
   que Teresa est venue la voir). */

import { equipiers } from './equipiers.js'
import { destinationPlanque } from './retour.js'

export const sarah = {
  markup: 'scenes/sarah.html',

  ouverture: ({ a }) => [
    'Le cabinet de Sarah Carpenter, au-dessus d’une supérette qui ne ferme jamais tout à fait. Deux pièces : une salle d’attente à trois chaises, et un cabinet avec une table d’examen et un autoclave qui date d’avant elle.',
    'Une clinique de rue ne ferme pas, même à six heures moins le quart. Il y a déjà trois personnes dans la salle d’attente, dont une qui patiente depuis quatre heures.',
    'Lester s’est assis près de la porte du cabinet, son bras contre lui, sans qu’on ait besoin de le lui montrer.',
    'Sarah n’a pas discuté le prix : elle a regardé Trash, une seconde, et elle a désigné la pièce du fond.',
    'OBJECTIF — faire soigner ce bras, et repartir. On n’a pas trois heures à donner à cette étape.',
  ],

  entree: ({ a }) => [
    ...(a('lester-soigne') ? ['lester-soigne'] : []),
  ],

  vues: {
    physique: [
      'Trois chaises, trois inconnus qui attendent depuis des heures et qui ne poseront aucune question — dans une clinique de rue, ne pas regarder est la politesse de base.',
      '« Personne ici ne nous demandera qui on est. C’est le genre de silence qui coûte cher ailleurs, et ici il est gratuit. »',
    ],
    astrale: [
      'Ici, pas de meuble pour cacher une aura : rien qu’une pièce nue, et de la peur qui s’est accumulée dedans depuis des années, une nuit après l’autre.',
      '« Je vois tout, cette fois. C’est presque pire. La salle d’attente d’une clinique de rue, à l’astral, c’est juste de la peur empilée, en rangs, comme des chaises. »',
    ],
    ra: [
      'Un vieux terminal de dossiers patients, sur le bureau du fond, qui synchronise ses fiches vers un serveur d’assurance-maladie une fois par nuit — le genre de service que Sarah ne peut pas se permettre de couper, parce que c’est lui qui la paie.',
      '« Ça bavarde, mais ça bavarde pour elle, pas contre nous. Je laisse. »',
    ],
    tactique: [
      'Deux pièces, une porte entre les deux, une table d’examen qui ne protégerait de rien.',
      '« Nul rempart dans une infirmerie, compagnon. On n’y vient pas pour tenir un siège — on y vient pour repartir vite. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('sarah'),

    /* ══ LESTER ════════════════════════════════════════════════════ */
    lester: {
      nom: 'Lester',
      regarder: ({ a }) => ({
        tous: a('lester-soigne')
          ? ['Le bras dans une vraie attelle, propre, serrée juste ce qu’il faut. Il la regarde comme un objet qu’on ne lui a encore jamais offert neuf.',
             'Il ne bouge plus le bras pour vérifier que ça tient. Il sait déjà que ça tient.']
          : ['Assis près de la porte du cabinet, le bras contre lui, à regarder les trois inconnus de la salle d’attente comme s’il cherchait à savoir lequel d’entre eux est le plus fatigué.',
             'C’est la première fois de la nuit qu’il est dans une pièce où quelqu’un d’autre attend aussi.'],
        hercules: '« Un gamin qui compte les gens plus fatigués que lui. Il en trouve toujours un. Ça devrait le rassurer et ça ne le rassure jamais. »',
        rabbit: '« Vingt ans, et personne ne lui avait jamais proposé une vraie attelle avant ce soir. »',
        drakk: '« Il regarde les trois autres comme un compagnon compte les rangs ennemis. Il essaie de savoir combien d’entre eux comptent plus que lui, dans cette histoire. »',
      }),
      parler: { tous: '« On repart bientôt. » Il hoche la tête et ne dit rien de plus.' },
      utiliser: 'Non. Il a passé la nuit à être déplacé par des mains.',
      objets: {
        bouteille: ({ a }) => a('guilde')
          ? { tous: 'Elle est restée sur le voilier. Ici, il n’y a que des gobelets d’eau et une pile de magazines périmés.' }
          : { tous: 'Sarah l’a vue et n’a rien dit. Elle a juste rapproché son fauteuil du sien.' },
        arme: 'Non. Pas devant une salle d’attente pleine d’inconnus, et pas dans le cabinet de la femme qui vient de vous ouvrir sa porte.',
      },
    },

    /* ══ SARAH — l'hôte, et la seule à pouvoir dire ce que le dossier
       tait ══════════════════════════════════════════════════════════ */
    sarah: {
      nom: 'Sarah Carpenter',
      regarder: {
        tous: ['Une elfe d’un âge qu’elle ne donne à personne, blouse tachée, cernes qu’aucun sommeil ne rattrapera plus. Elle bouge vite, sans jamais courir.',
               'Elle a déjà fait le tri entre les urgences et les autres, dans sa tête, avant même que vous ayez fini de vous présenter.'],
        hercules: '« Une clinique de rue ne demande jamais qui paie. C’est un métier qui coûte cher, et je ne parle pas de l’autoclave. »',
        trash: '« Elle m’a soigné trois fois sans jamais me demander mon vrai nom. Je le lui ai donné quand même, la troisième fois. »',
        rabbit: '« Un terminal patient à jour, un autoclave d’un autre siècle. Elle dépense là où ça soigne, pas là où ça brille. »',
        drakk: '« Une guérisseuse sans temple, qui soigne quiconque franchit sa porte. Il y a un mot pour ça, dans toutes les tables. Je crois que c’est “sainte”. »',
      },
      parler: { texte: [], dialogue: 'sarah' },
      utiliser: 'On ne fouille pas le cabinet d’une femme qui vient de vous l’ouvrir.',
    },

    /* ══ LA SALLE D'ATTENTE — décor : plus de dilemme depuis le
       chantier 39, on ne vide plus une pièce pour personne. */
    salle: {
      nom: 'La salle d’attente',
      regarder: {
        tous: ['Trois personnes attendent sur des chaises dépareillées. L’une d’elles patiente depuis quatre heures, et elle le sait précisément — elle regarde une horloge que personne d’autre ne regarde.',
               'Aucune des trois ne sait qui vous êtes, ni pourquoi un gamin menotté aux poignets par la fatigue est assis parmi eux.'],
        hercules: '« Une salle d’attente à six heures du matin. Ça n’étonne personne. C’est bien pour ça qu’on s’arrête ici, et pas plus longtemps. »',
        trash: '« Celle qui attend depuis quatre heures a une aura épuisée jusqu’à l’os. On ne fait rien pour elle en restant. On repart. »',
      },
      parler: { tous: 'Ils ne vous répondront pas. Ce n’est pas à eux qu’il faut parler, ici.' },
      utiliser: { tous: 'Ce n’est pas une chose qu’on déplace. On n’est pas là pour ça.' },
    },

    /* ══ LA TABLE D'EXAMEN — où `lester-soigne` se joue, dans le
       dialogue `sarah`, pas ici : la cible montre le résultat, elle ne
       le déclenche pas. */
    table: {
      nom: 'La table d’examen',
      regarder: ({ a }) => ({
        tous: a('lester-soigne')
          ? 'Une compresse usagée et un rouleau de bande entamé, encore sur le plateau. Le reste a servi.'
          : 'Métal froid, une lampe articulée, un plateau d’instruments qui ont vu passer plus de monde que n’importe quel meuble de ce quartier.',
      }),
      utiliser: ({ a }) => a('lester-blesse') && !a('lester-soigne')
        ? { tous: 'Ce n’est pas à vous de vous en servir. C’est à Sarah — parlez-lui.' }
        : { tous: 'Tu t’y appuies. Elle est froide, et elle tient.' },
    },

    /* ══ LE DÉCOR AMBIANT ══════════════════════════════════════════ */
    bureau: {
      nom: 'Le bureau de consultation',
      regarder: {
        tous: 'Un bureau métallique couvert de formulaires d’assurance en retard.',
      },
      utiliser: 'Tu t’y appuies. Il tient, comme tout ici depuis longtemps.',
    },

    autoclave: {
      nom: 'Un autoclave qui date',
      regarder: {
        tous: 'Un modèle qu’on ne fabrique plus, entretenu à la main depuis des années par quelqu’un qui n’a jamais eu de quoi le remplacer.',
        rabbit: '« Aucune puce, aucun cycle connecté. C’est le seul objet de la nuit que je ne peux pas espionner, et ça me plaît plus que ça ne le devrait. »',
        trash: '« Elle le fait tourner tous les matins, qu’il y ait un instrument à stériliser ou non. Un rituel, pas une nécessité. J’aime les gens qui en ont. »',
      },
      utiliser: 'Tu ne touches pas au matériel d’une femme qui te soigne gratuitement.',
    },

    fenetre: {
      nom: 'La fenêtre, sur la supérette',
      regarder: {
        tous: 'Elle donne sur l’enseigne de la supérette, en bas, allumée toute la nuit. Il pleut encore.',
        rabbit: '« Une caméra à l’angle de la supérette, tournée vers la rue, pas vers cette fenêtre. Pour l’instant. »',
      },
      utiliser: 'On ne l’ouvre pas. Il pleut, et il fait déjà assez froid comme ça.',
    },

    /* ══ LA SORTIE — plus de verrou depuis le chantier 39 : rien à
       encaisser ici, donc rien qui retienne la porte. On route vers la
       même destination que sans cette halte (`destinationPlanque`,
       partagée avec `retour.js`). */
    porte: {
      nom: 'La porte du cabinet, vers l’escalier de service',
      /* Route vers `destinationPlanque(a)` (chantier 39) : herwick, duke,
         squat, tripot ou la laverie par défaut selon ce qui a été tranché
         au conseil — jamais une chaîne fixe, donc `true` générique. */
      sortie: true,
      regarder: {
        tous: ['Une porte métallique qui donne sur l’escalier au-dessus de la supérette. Le tribunal est à vingt-cinq minutes, à pied.',
               'Il est un peu plus de six heures. On peut partir dès que le bras tient.'],
        rabbit: '« Une seule caméra dans cet escalier, tournée sur la porte de la supérette, pas sur celle-ci. »',
      },
      utiliser: ({ a }) => a('lester-blesse') && !a('lester-soigne')
        ? { tous: 'Pas avant que Sarah ait vu ce bras. On n’est pas venus jusqu’ici pour repartir comme on est arrivés.' }
        : { tous: ['Sarah tient la porte, une main sur le chambranle.',
                   'Lester passe devant elle. « Merci », dit-il, et pour une fois c’est lui qui le dit en premier.'],
            va: destinationPlanque(a) },
    },
  },

  dialogues: {

    /* ══ SARAH — ce qu'elle donne, sans dilemme depuis le chantier 39 ══
       Ouvert par `sarah.parler`. `soigner`, `teresa-patiente` et
       `autopsie` sont des gestes à part, jamais exclusifs entre eux. */
    sarah: {
      qui: 'sarah',
      accueil: ['Elle a déjà évalué les cinq nouveaux venus avant qu’ils aient fini de refermer la porte — qui saigne, qui ment, qui tient encore debout par habitude.',
                '« Trash m’a prévenue que ce serait vous. Il ne m’a pas dit pour le petit. »'],
      retour: ['« Toujours là. »'],
      sujets: [
        {
          id: 'soigner',
          titre: '« Le bras de Lester. Vraiment, cette fois. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => a('lester-blesse') && !a('lester-soigne'),
          flags: ['lester-soigne'],
          minutes: 25,
          texte: ['Elle l’assoit sur la table d’examen sans lui demander la permission, et découpe la manche au lieu de la remonter.',
                  'Vingt-cinq minutes, une désinfection qui pique pour de vrai, trois points de suture et une attelle propre — pas une écharpe rayée nouée à la va-vite.',
                  '« Voilà. Ça, c’est du vrai travail. »',
                  '« … Ça change quoi, à l’audience ? »',
                  '« Rien, sur le papier. Tout, sur la façon dont tu vas te tenir en te levant pour prêter serment. »'],
        },
        {
          id: 'teresa-patiente',
          titre: '« Vous avez déjà entendu ce nom ? Teresa Banks. »',
          quand: ({ a }) => !a('teresa-cliente'),
          flags: ['teresa-cliente'],
          fiches: ['teresa-cliente'],
          texte: ['Elle s’arrête, une seconde de trop pour que ce soit rien.',
                  '« Elle est venue ici. Deux fois, cet automne. »',
                  '« Elle voulait savoir comment on disparaît proprement — des papiers, un nom qu’on ne peut pas retracer. Je lui ai dit que je ne faisais pas ça. »',
                  '« Elle est repartie avant que je puisse lui demander de qui elle se cachait. »',
                  '« Je n’ai jamais reparlé d’elle avec personne. Le dossier ne le dit sûrement pas non plus. »'],
        },
        {
          id: 'autopsie',
          titre: '« L’autopsie. Un elfe, ou un ork ? »',
          /* `sait()` teste le carnet directement — `elfe-autopsie` est une
             fiche, pas un drapeau (voir `contexte()` dans state.js). */
          quand: ({ sait }) => !sait('elfe-autopsie'),
          fiches: ['elfe-autopsie'],
          texte: ['« Un elfe. Je connais celle qui a fait le rapport, on partage le même labo depuis dix ans. »',
                  '« Mets un ork dans une navette pour ça, et c’est vous qui vous êtes trompés de dossier. »',
                  '« Je peux vous le répéter à la barre, si quelqu’un a besoin de l’entendre deux fois. »'],
        },
        {
          id: 'silence',
          titre: '(En rester là, pour l’instant.)',
          fin: true,
          texte: ['Elle retourne à ses formulaires en retard.'],
        },
      ],
    },
  },
}
