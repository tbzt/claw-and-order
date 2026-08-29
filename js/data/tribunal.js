/* ============================================================
   TABLEAU 6 BIS — LE TRIBUNAL, LE PARVIS.

   Chantier 20b. Vue large du même nœud que `tribunal-salle` (chantier
   20a, déjà livré) — même geste que `quai` / `quai-voilier` (chantier
   25) : s'approcher de la salle ne coûte rien, `entree-salle` n'a pas de
   `minutes`. `PLAN_TRAME_ACTES_III_IV.md` §5.1-5.2.

   L'art du tableau est livré (chantier 23, 8ᵉ lot) — voir
   `css/scene-tribunal.css`.

   Le passage par la planque a déjà fait vingt minutes de marche
   (`planque.js`, `porte.utiliser`) ; on arrive donc directement devant
   le palais, accrédité — le mandat et le contrat ont déjà ouvert la
   porte, ce tableau ne fait que le raconter. */

import { equipiers } from './equipiers.js'

/* Nœud 2 (`PLAN_NOEUDS_DE_CHAOS_FICHES` § II) : le portique est une
   FRONTIÈRE, pas un bouton. Mesuré le 2026-08-28 : pousser les portes
   sans avoir touché aux détecteurs faisait entrer l'équipe armée dans
   une salle d'audience — inventaire intact, zéro drapeau. Le
   commentaire d'origine de `detecteurs` promettait pourtant
   « automatique, le portique n'oublie pas » : c'était une intention,
   jamais un câblage. Étroit — l'arme SEULE : le cadre détaille, il ne
   fauche pas d'un coup. Une seule fabrique, deux sites de pose
   (`detecteurs.utiliser` et `entree.utiliser`) : la dette que l'audit
   d'architecture nommait « le patron a voyagé quatre fois » ne
   s'applique pas ici. */
const armeAuPortique = () => ({
  tous: ['L’arme de Wilson pèse dans une poche depuis le quai. Personne ne l’a mentionnée jusqu’ici — le détecteur, lui, ne l’oubliera pas.',
         'Un garde tend la main sans un mot. Vous la laissez en dépôt.',
         'Il passe le numéro de série au scanner, et s’arrête une seconde de trop.'],
  drakk: '« Une lame ne sonne pas. Un P-au poing, si. Il fallait choisir avant d’arriver. »',
  hercules: '« On la récupérera en sortant. Ou pas. On verra à ce moment-là. »',
  rabbit: '« Ce numéro est enregistré. Sur un homme mort hier soir, sur une jetée de Tacoma. »',
  flags: ['arme-saisie', 'star-nous-connait'],
  retire: ['arme'],
})

export const tribunal = {
  markup: 'scenes/tribunal.html',
  /* ACTE III — le pivot : les deux audiences et ce qui les sépare. */
  acte: 3,

  ouverture: [
    'Le mandat suffit aux détecteurs, l’accréditation suffit aux gardes. Personne n’a demandé les armes — pas encore.',
    /* Le carton de coupure nomme le palais et donne l'heure : la ligne
       redisait les deux, et « Neuf heures moins dix » était en dur —
       faux dès qu'on a passé un appel dans la nuit (14 à 15 minutes,
       tous facultatifs). Ce qui reste est ce que le carton ne peut pas
       dire : le quartier, et à quoi ressemblent les couloirs quand
       l'audience approche. */
    'Downtown, à l’heure où les couloirs se remplissent.',
  ],

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('tribunal'),

    sculptures: {
      nom: 'Les deux Justice',
      regarder: {
        tous: 'Deux figures encapuchonnées penchées sur l’entrée. Ni l’une ni l’autre ne tient de balance — celle-là a été volée il y a longtemps, et personne ne l’a remplacée.',
        drakk: '« Des statues sans yeux. Je n’ai jamais compris pourquoi on fait ça. »',
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
       tableau 2), jamais mentionnée depuis — et depuis le chantier 46,
       le premier des cinq objets que ce cadre attrape, plus les quatre
       capacités des fiches (`epees`, `focus`, `deck`, `kit`, sur eux
       depuis le début, `js/state.js`). PLAN_LE_PORTIQUE.md §1 : « le
       mandat suffit aux détecteurs […] personne n'a demandé les armes —
       pas encore. » Ça se paie ici, en un seul geste par objet, pas en
       bloc — le détecteur détaille, il ne fauche pas d'un coup.

       Deux branches, pas une : `utiliser` (le clic nu) est ce qui se
       passe quand on marche à travers en le gardant sur soi — automatique,
       « le portique n'oublie pas ». `objets` est le geste qui le précède :
       on désigne l'objet dans l'inventaire et on le tend soi-même, avant
       que le cadre n'ait sonné — un choix, pas une fatalité (§1, « on le
       laisse — ou on tente »). Les deux retirent l'objet ; seule la
       voix et le flag disent lequel des deux a eu lieu.

       Chantier 50 (nœud 2) : « automatique » ne l'était pas — pousser
       les portes de `entree` sans avoir cliqué ce cadre laissait
       entrer l'équipe armée sans un drapeau. `entree.utiliser` appelle
       maintenant la même fabrique, `armeAuPortique()` : le portique
       n'oublie plus, qu'on le clique ou qu'on le traverse. */
    detecteurs: {
      nom: 'Les détecteurs',
      regarder: {
        tous: 'Un cadre métallique, et un garde qui regarde l’écran plus que vous.',
        rabbit: ['« Détection de masse ferreuse. Standard. »', '« Vous avez une raison de vous inquiéter ? »'],
      },
      utiliser: ({ tient }) => {
        if (tient('arme')) return armeAuPortique()
        if (tient('epees')) return {
          tous: ['Le cadre sonne avant même que Drakk ne soit passé dessous.',
                 'Un garde tend la main, presque désolé pour lui.'],
          drakk: ['« Elle a sonné. »', '« Deux fois. Je ne comprends pas ce qu’elle a dedans. »'],
          flags: ['epees-saisies'], retire: ['epees'],
        }
        if (tient('focus')) return {
          tous: ['Le cadre ne réagit pas — ce n’est pas du métal. Mais le garde a un formulaire pour « objet non identifié, présumé magique », et il le sort quand même.',
                 'Un focus enregistré porte un numéro. Celui-là n’en a pas.'],
          trash: '« Il n’était pas censé être vu. Personne n’est parfait, même Raton laveur. »',
          flags: ['focus-saisi'], retire: ['focus'],
        }
        if (tient('deck')) return {
          tous: ['Le cadre sonne. Le garde regarde l’écran, puis le sac, puis vous.',
                 '« Ça, monsieur, ça ne rentre pas dans une salle d’audience. »'],
          rabbit: '« Il ne mord pas. Il compile, tout au plus. »',
          flags: ['deck-saisi'], retire: ['deck'],
        }
        if (tient('kit')) return {
          tous: ['Le cadre sonne. Le garde ouvre la trousse, compte les crochets un par un, puis regarde Hercules.',
                 '« Serrurier ? »'],
          hercules: '« Job. Je répare, aussi. »',
          flags: ['kit-saisi'], retire: ['kit'],
        }
        return 'Rien à déclarer. Le détecteur reste muet, comme le reste de l’équipe.'
      },
      objets: {
        arme: () => ({
          tous: ['Vous tendez l’arme de Wilson avant même qu’on la demande.',
                 'Le garde la prend sans un mot, presque surpris.'],
          hercules: '« Autant choisir soi-même ce qu’on perd. »',
          flags: ['arme-laissee'], retire: ['arme'],
        }),
        epees: () => ({
          tous: 'Drakk détache ses deux fourreaux et les pose sur le comptoir du garde, lame contre lame, avant que le cadre n’ait rien à dire.',
          drakk: '« Elles m’attendront. Elles ont l’habitude d’attendre. »',
          flags: ['epees-laissees'], retire: ['epees'],
        }),
        focus: () => ({
          tous: 'Trash pose une pierre grise sur le comptoir, sans qu’on lui demande. Le garde ne sait pas ce que c’est. Trash n’explique pas.',
          trash: '« Raton laveur dit : ce qu’on ne montre pas, on ne le perd pas non plus. »',
          flags: ['focus-laisse'], retire: ['focus'],
        }),
        deck: () => ({
          tous: 'White_Rabbit tend son deck des deux mains, comme on tend quelque chose de vivant. Le garde le glisse dans un casier numéroté.',
          rabbit: '« Traite-le bien. Moi je vais devoir revenir. »',
          flags: ['deck-laisse'], retire: ['deck'],
        }),
        kit: () => ({
          tous: 'Hercules pose une trousse de cuir sur le comptoir, avec la délicatesse de quelqu’un qui sait exactement ce qu’elle vaut au marché noir.',
          hercules: '« Rien de ce qu’il y a dedans n’a de nom. Notez juste "trousse". »',
          flags: ['kit-laisse'], retire: ['kit'],
        }),
      },
    },

    /* Le decoy que le jeu doit refuser en voix — pas une vraie option. */
    fenetre: {
      nom: 'Une fenêtre du deuxième étage',
      /* R4 : `araignee-vue` se paie ici — le markup du calque RA le
         demandait déjà en toutes lettres, « deux lentilles, deux
         lectures, le même mètre carré ». Drakk trouve la fenêtre trop
         commodément ouverte ; l'araignée est vissée juste dessous. Ni
         l'un ni l'autre n'en conclut quoi que ce soit. */
      regarder: ({ a }) => ({
        tous: a('araignee-vue')
          ? ['Entrouverte, donnant sur un couloir de service visiblement peu surveillé.',
             'Six mètres plus bas, sous l’appui, la caméra que personne n’a déclarée.']
          : 'Entrouverte, donnant sur un couloir de service visiblement peu surveillé.',
        drakk: ['« Une entrée qu’on ne montre pas d’habitude. »', '« Quelqu’un a oublié de la fermer. »'],
      }),
      utiliser: {
        tous: 'Non. Vous avez un mandat, une accréditation, et une audience dans quelques minutes. Ce n’est pas ce genre de travail.',
        hercules: ['« On est de son côté aujourd’hui. Entrons par où on nous attend. »', '« C’est la première fois de ma vie que je dis cette phrase, et je voudrais qu’on le note quelque part. »'],
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
    /* ══ LES CIBLES DE CALQUE — R4, troisième des onze décors ════════
       Deux cibles, et le calque TACTIQUE n'en reçoit aucune : sa propre
       note de `scenes/tribunal.html` dit pourquoi, et c'est une
       décision d'auteur, pas un oubli — « la lentille de Drakk les
       DÉSIGNE au lieu de les redoubler ». On ne la défait pas.

       Les deux qui restent brossent le même homme sans jamais
       l'atteindre. `garde-trouble` doit rester **jamais résolu** (plan
       § 5.2) : rien ici ne le nomme, ne le confirme, ni ne le relie à
       quoi que ce soit. Deux inquiétudes de plus, de deux plans
       différents — doctrine des quatre regards § 10, « aucune ligne ne
       dit : voici la vérité ». */
    courant: {
      nom: 'Le courant froid',
      principal: 'regarder',
      regarder: {
        tous: 'Il descend du couloir du fond, à hauteur de poitrine, et il est plus froid que l’air du parvis.',
        trash: ['« La peur du lieu est en bas, au ras du sol. Elle a mis des années. »',
                '« Ça, c’est récent. Et c’est passé vite. »',
                '« Le couloir du fond mène au dépôt. Je ne vous dirai pas mieux. »'],
        flags: ['courant-lu'],
      },
      utiliser: {
        tous: 'Il n’y a rien à saisir. C’est un courant d’air qui n’en est pas un.',
        trash: '« On ne retient pas ça. On le laisse descendre. »',
      },
    },

    araignee: {
      nom: 'La caméra araignée',
      principal: 'regarder',
      regarder: {
        tous: 'Au plafond du porche, une patte repliée contre une poutre. Elle ne bouge pas. Elle regarde quand même.',
        rabbit: ['« Pas d’immatriculation, pas de propriétaire déclaré. »',
                 '« Le flux sort du bâtiment. Il va quelque part. »',
                 '« Où, je ne sais pas. Il faudrait — non, laisse. »'],
        flags: ['araignee-vue'],
      },
      utiliser: {
        tous: 'Elle est à six mètres, au plafond, devant trente personnes et deux portiques.',
        rabbit: '« Si je la touche, celui qui la relève saura qu’on l’a vue. Non. »',
      },
    },

    'garde-trouble': {
      nom: 'Un garde, près de la porte',
      /* R4 : `courant-lu` se paie ici. Trash remarque le même homme
         qu'Hercules, pour une raison qui n'a rien à voir — et lui non
         plus ne conclut rien. La cible reste sans résolution. */
      regarder: ({ qui, a }) => qui === 'hercules'
        ? { tous: 'Il vous regarde un peu trop longtemps.',
            hercules: ['« Celui-là. Je ne sais pas pourquoi. »', '« Alan Jones, une mauvaise nuit, un uniforme mal coupé. Je ne le saurai pas avant qu’il soit trop tard, et ça m’agace depuis trente ans. »'] }
        : qui === 'trash' && a('courant-lu')
          ? { tous: 'Il vous regarde un peu trop longtemps.',
              /* Une seule ligne, et il s'arrête là. « Plus il est touché,
                 moins il parle » — il constate d'où l'homme sort, il ne
                 dit pas ce que ça veut dire, parce qu'il n'en sait rien. */
              trash: '« Il sort du couloir du fond. »' }
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
      utiliser: ({ tient }) => tient('arme')
        ? { ...armeAuPortique(), va: 'tribunal-salle' }
        : { tous: 'Vous poussez les portes.', va: 'tribunal-salle' },
    },
  },

  vues: {
    sociale: ['Des dizaines de gens en costume qui n’ont pas dormi non plus, chacun avec un dossier sous le bras et personne pour le regarder deux fois.',
               '« Ce matin, le meilleur déguisement c’est d’avoir l’air aussi fatigué qu’eux. »',
               '« Ça tombe bien. Je n’ai rien eu à préparer. »'],
    ra: ['La RA du palais est presque vide — des balises d’orientation, un flux d’audiences. Une exception, au plafond : une caméra araignée qui ne devrait pas être là, une patte repliée contre une poutre.',
         '« Elle ne bouge pas. Elle regarde quand même. »'],
    astrale: ['Le plan astral d’un tribunal ne devrait pas avoir peur. Celui-ci, si — un courant froid qui descend du couloir du fond, comme si quelque chose venait d’y passer vite.',
              '« Ce n’est pas hanté. »',
              '« Trop de gens ont eu peur au même endroit. »'],
    materielle: ['Angles de tir, sorties, lignes de vue.',
               '« Une seule sortie civilisée. »',
               '« Je le note. Je n’accuse personne. »'],
  },

  dialogues: {},
}
