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
       voix et le flag disent lequel des deux a eu lieu. */
    detecteurs: {
      nom: 'Les détecteurs',
      regarder: {
        tous: 'Un cadre métallique, et un garde qui regarde l’écran plus que vous.',
        rabbit: ['« Détection de masse ferreuse. Standard. »', '« Vous avez une raison de vous inquiéter ? »'],
      },
      utiliser: ({ tient }) => {
        if (tient('arme')) return {
          tous: ['L’arme de Wilson pèse dans une poche depuis le quai. Personne ne l’a mentionnée jusqu’ici — le détecteur, lui, ne l’oubliera pas.',
                 'Un garde tend la main sans un mot. Vous la laissez en dépôt.'],
          drakk: '« Une lame ne sonne pas. Un P-au poing, si. Il fallait choisir avant d’arriver. »',
          hercules: '« On la récupérera en sortant. Ou pas. On verra à ce moment-là. »',
          flags: ['arme-saisie'], retire: ['arme'],
        }
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
      regarder: {
        tous: 'Entrouverte, donnant sur un couloir de service visiblement peu surveillé.',
        drakk: ['« Une entrée qu’on ne montre pas d’habitude. »', '« Quelqu’un a oublié de la fermer. »'],
      },
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
    'garde-trouble': {
      nom: 'Un garde, près de la porte',
      regarder: ({ qui }) => qui === 'hercules'
        ? { tous: 'Il vous regarde un peu trop longtemps.',
            hercules: ['« Celui-là. Je ne sais pas pourquoi. »', '« Alan Jones, une mauvaise nuit, un uniforme mal coupé. Je ne le saurai pas avant qu’il soit trop tard, et ça m’agace depuis trente ans. »'] }
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
    physique: ['Des dizaines de gens en costume qui n’ont pas dormi non plus, chacun avec un dossier sous le bras et personne pour le regarder deux fois.',
               '« Ce matin, le meilleur déguisement c’est d’avoir l’air aussi fatigué qu’eux. »',
               '« Ça tombe bien. Je n’ai rien eu à préparer. »'],
    ra: ['La RA du palais est presque vide — des balises d’orientation, un flux d’audiences. Une exception, au plafond : une caméra araignée qui ne devrait pas être là, une patte repliée contre une poutre.',
         '« Elle ne bouge pas. Elle regarde quand même. »'],
    astrale: ['Le plan astral d’un tribunal ne devrait pas avoir peur. Celui-ci, si — un courant froid qui descend du couloir du fond, comme si quelque chose venait d’y passer vite.',
              '« Ce n’est pas hanté. »',
              '« Trop de gens ont eu peur au même endroit. »'],
    tactique: ['Angles de tir, sorties, lignes de vue.',
               '« Une seule sortie civilisée. »',
               '« Je le note. Je n’accuse personne. »'],
  },

  dialogues: {},
}
