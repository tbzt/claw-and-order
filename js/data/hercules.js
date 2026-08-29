/* ============================================================
   TABLEAU 5 SEXIES — LE TRIPOT D'HERCULES. Choisi par Hercules au
   conseil de la traversée (`retour.js`, dialogue `conseil`, sujet
   `tripot`). Six heures et quelques.

   CHANTIER 41 — PLAN_PLANQUES.md § 3.5, ÉTAPE D DU § 8 : « le tripot
   d'Hercules… la plus complexe (une observation, pas une précaution) et
   celle dont le coût est le plus délicat à écrire. » Le cinquième et
   dernier des décors annoncés par le chantier 35 à devenir réels, après
   Herwick (36), Sarah (37, rétrogradée en halte au 39), Duke (37) et
   Trash (40).

   ══ CE QUI SE CHOISIT, CE N'EST PAS D'ÉVITER LE TIR (§1 du plan) ═════
   Garde-fou § 4.5 : le coup part TOUJOURS. Ici, il change de nature une
   SECONDE fois (la première était chez Duke, « pas de ligne de tir » —
   ici, « on n'entre pas de force, on achète une place à la table » :
   `tripot-brule` tombe au premier passage à la porte, quoi qu'on ait
   fait avant, exactement comme `herwick-touche`, `ganger-touche` et
   `loge-brulee` avant lui.

   ══ LA MÉCANIQUE TRANCHÉE : UNE OBSERVATION, PAS UNE PRÉCAUTION (§3) ═
   Les trois autres planques neuves se jouent au verbe UTILISER — un
   geste, pris d'avance ou en réaction. Le tripot est le seul tableau du
   jeu où le geste qui compte se joue au verbe REGARDER : Hercules, et
   lui seul, est un compteur de cartes interdit de Las Vegas — lire une
   salle de joueurs est littéralement sa compétence, pas une précaution
   qu'on prend, un fait qu'on remarque. `table.regarder`, tenu par
   Hercules, pose `tueur-repere` — AVANT la porte, ou jamais : contrai-
   rement aux trois réactions du squat (déclenchées PAR le préavis), rien
   ici n'avertit qu'il faut regarder. C'est le prix de « rien ne le
   distingue » (§3.5 du plan) : on ne sait pas qu'on cherche tant qu'on
   n'a pas cherché.

   ══ CE QUI COÛTE, ET CE N'EST PAS DE L'ARGENT (§3.5 du plan) ═════════
   `hercules-demasque` — le patron connaît la vraie version de l'histoire
   Saito et la mentionne en passant, devant tout le monde. Comme
   `herwick-touche` ou `loge-brulee`, ce n'est PAS un choix : « Hercules
   ne choisit pas de se découvrir : la pièce le découvre. » Posé au
   premier `patron.parler`, avant même que le dialogue ne s'ouvre.

   ══ CE QUI RESTAIT À TRANCHER (§9 du plan), TRANCHÉ ICI ═════════════
   « `hercules-demasque` doit-il pouvoir être évité ? » Non — le garder
   évitable aurait cassé la symétrie avec les trois autres planques
   (le coût tombe toujours, § 4.5). Ce qui EST un choix, en revanche,
   c'est ce que l'ÉQUIPE fait une fois que c'est tombé : `dialogues.patron`
   porte deux sujets mutuellement exclusifs, `laisser` (Hercules parle
   pour de vrai) et `couvrir` (on change de sujet à sa place). Le texte
   du plan le dit : « ça se paie en laissant Hercules parler au lieu de
   le couvrir » — `conf-hercules`, dans `dialogues.lester`, n'est
   accessible que si `hercules-assume` est posé. Couvrir Hercules le
   protège d'un aveu devant Lester ; ça ferme aussi la seule confiance
   propre à ce décor. C'est le prix exact que le plan demandait, sans
   ajouter de branche à la mécanique de la porte elle-même.

   ══ LE G5 SE REJOUE UNE CINQUIÈME FOIS ═══════════════════════════════
   Mêmes noms de drapeau que les quatre autres planques, plus
   `conf-hercules`, gardé par `hercules-assume` (pas `hercules-demasque` :
   voir ci-dessus, c'est le fait de LAISSER PARLER qui paie, pas le fait
   d'être démasqué).

   ══ CE QUI SE PAIE, EN CHAIR (§3.5, « qui paie : Hercules ») ═════════
   Si `tueur-repere` n'est pas posé avant la porte, le tueur a le temps
   d'agir et c'est Hercules — l'hôte, la dette, l'homme que la pièce
   connaît déjà — qui s'interpose : `hercules-touche`. Repéré à temps,
   personne ne saigne : la table se vide d'elle-même, sans bruit. Rule 17
   tient dans les deux cas ; ce que l'observation change, c'est QUI paie
   en plus de la porte, pas SI on passe. */

import { equipiers } from './equipiers.js'
/* Le dossier se lit dans les cinq décors où l'équipe attend l'audience,
   et c'est le MÊME dossier : son texte vit chez celui qui l'a écrit en
   premier (`planque.js`), et on ne passe ici que le meuble. */
import { lectureDossier } from './planque.js'

/* ══ LE G5, REPRIS DE `planque.js` / `herwick.js` / `duke.js` / `trash.js` ══ */
const GRATUITES = ['conf-job', 'conf-question', 'conf-silence']
const CHAINEES  = ['conf-teresa', 'conf-guilde', 'conf-bras',
                   'conf-mccarthy', 'conf-deduction', 'conf-dossier',
                   'conf-hercules']

const compte = (a) =>
  Math.min(GRATUITES.filter((f) => a(f)).length, 2) +
  CHAINEES.filter((f) => a(f)).length -
  (a('conf-perdue') ? 2 : 0)

export const tripot = {
  markup: 'scenes/tripot.html',

  ouverture: ({ a }) => [
    'Une porte sans enseigne, au fond d’une cour à poubelles, et de l’autre côté une salle chauffée, enfumée, sans une seule fenêtre. Cinq personnes jouent aux cartes comme si six heures du matin était une heure normale pour ça — et ici, c’est le cas.',
    'Le patron connaît Hercules par son prénom. Ce n’est pas un bon signe. C’en est un très mauvais, en fait, mais personne ne le dit à voix haute.',
    a('lester-blesse')
      ? 'Lester s’assoit à l’écart de la table, son bras contre lui, et personne ne lui pose de question — dans cette pièce, ne pas poser de question est une politesse.'
      : 'Lester s’assoit à l’écart de la table, et personne ne lui pose de question — dans cette pièce, ne pas poser de question est une politesse.',
    '« On ne force pas la porte d’une salle de jeu », dit Hercules. « On y achète une place. »',
    'OBJECTIF — tenir jusqu’à l’audience, sans que ça coûte à celui qui a ouvert la porte. Il reste trois heures et quelques.',
  ],

  entree: ({ a }) => [
    ...(a('hercules-demasque') ? ['hercules-demasque'] : []),
    ...(a('tueur-repere') ? ['tueur-repere'] : []),
    ...(a('tripot-brule') ? ['tripot-brule'] : []),
    ...(a('hercules-touche') ? ['hercules-touche'] : []),
  ],

  derive: ({ a }) => {
    const c = compte(a)
    return [c <= 0 ? 'lester-ferme' : c < 3 ? 'lester-ecoute' : 'lester-ouvert']
  },

  vues: {
    sociale: [
      'Il connaît cette salle par cœur : la table du fond triche, celle de la fenêtre paie comptant, et le patron ne regarde jamais deux fois le même visage.',
      '« Rien n’a changé. »',
      '« J’aurais préféré que quelque chose ait changé. »',
    ],
    astrale: [
      'Cinq auras penchées sur des cartes, et une sixième, plus froide, qui ne joue pas pour l’argent posé sur le tapis.',
      '« Elle est là depuis avant nous. »',
      '« Elle attendait quelqu’un. »',
    ],
    ra: [
      'Aucun signal. Pas une caméra, pas un lecteur, pas un tag.',
      '« Rien à pirater. »',
      '« Rien de connecté. C’est efficace. »',
    ],
    materielle: [
      'Une salle sans fenêtre, une seule porte, cinq tables et plus de chaises que de joueurs assis dessus.',
      '« Une salle sans fenêtre, et une porte. »',
      '« J’en ai lu cent comme ça. Aucune n’avait de seconde sortie. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('tripot'),

    /* ══ LESTER — le même G5, dans un cinquième lieu ══════════════════ */
    lester: {
      nom: 'Lester',
      regarder: ({ a }) => ({
        tous: a('hercules-touche')
          ? ['Il regarde Hercules tenir son propre bras, dans une pièce où il vient d’apprendre que le petit homme causant devant lui a menti pendant vingt ans.',
             '« Il a pris ça pour moi. Après ce que je viens d’entendre sur lui. » Il ne finit pas la phrase.']
          : a('lester-blesse')
            ? ['À l’écart de la table, le bras contre lui, il regarde cinq inconnus jouer aux cartes comme si de rien n’était.',
               'C’est la première fois de la nuit qu’il est dans une pièce où personne ne le regarde, lui.']
            : ['À l’écart de la table, il regarde cinq inconnus jouer aux cartes comme si de rien n’était.',
               'C’est la première fois de la nuit qu’il est dans une pièce où personne ne le regarde, lui.'],
        hercules: a('hercules-demasque')
          ? '« Il vient de m’entendre mentir sur moi-même depuis vingt ans, en une phrase, dite par quelqu’un d’autre. Je me demande ce qu’il va faire de ça. »'
          : '« Un gamin dans une salle de jeu à six heures du matin. Il compte les jetons, pas les visages. On lui a appris les bonnes choses, dans le mauvais ordre. »',
        trash: compte(a) >= 3
          ? ['« Son aura a doublé depuis le bateau, et elle est tournée vers nous. »',
             '« Il a décidé quelque chose, et il ne l’a encore dit à personne. »',
             '« Ce qu’il dira à la barre, il vient de le décider ici. »']
          : compte(a) >= 1
            ? ['« Son aura est plus grande qu’au bateau. Elle est tournée vers nous, pas ouverte. »',
               '« Il regarde des adultes mentir et dire la vérité dans la même pièce, et il essaie de faire la différence. »']
            : ['« Son aura est serrée sur elle-même, comme au bateau. »',
               '« Il est assis dans une pièce où tout le monde triche un peu, et il n’a encore triché avec personne. »'],
        rabbit: '« Dix-huit ans, et il vient de voir un adulte se faire démasquer devant lui sans que le monde s’arrête. C’est peut-être la leçon la plus utile de la nuit. »',
        drakk: '« Il compte les cartes qu’on abat, pas celles qu’on garde. Un bon réflexe de joueur, pour un garçon qui n’a jamais eu de main correcte. »',
      }),
      parler: { texte: [], dialogue: 'lester' },
      utiliser: 'Non. Il a passé la nuit à être déplacé par des mains.',
      objets: {
        bouteille: ({ a }) => a('guilde')
          ? { tous: 'Elle est restée sur le voilier. Ici, quelqu’un a déjà posé un verre d’eau devant lui sans qu’on le demande.' }
          : { tous: 'Personne ne réagit. Dans une salle de jeu, un gamin qui ne boit pas n’étonne personne.' },
        arme: 'Non. Pas devant cinq inconnus armés qui n’ont jamais entendu parler de vous.',
      },
    },

    /* ══ LE PATRON — l'hôte, jamais nommé (§3.5 : ce n'est pas lui qu'on
       vient chercher, c'est ce qu'il sait). `parler` pose `hercules-
       demasque` au premier échange, avant même que le dialogue s'ouvre
       (§ en-tête : « la pièce le découvre », pas un choix) — puis ouvre
       `dialogues.patron`, où l'équipe décide quoi FAIRE de ce qui vient
       de tomber. */
    patron: {
      nom: 'Le Patron',
      regarder: ({ a }) => ({
        tous: 'Un homme sans âge précis, assis derrière une caisse plutôt que derrière un bureau — il tient une salle de jeu comme d’autres tiennent un livre de comptes.',
        hercules: a('hercules-demasque')
          ? '« Il savait avant même que j’ouvre la bouche. Vingt ans que je raconte mon histoire, et lui, il connaît l’originale. »'
          : '« Je lui dois de l’argent depuis assez longtemps pour que ça devienne une sorte de relation. »',
        drakk: '« Il tient sa table comme je tiens la mienne : les règles d’abord, les joueurs après. Je respecte la discipline. »',
      }),
      parler: ({ a }) => a('hercules-demasque')
        ? { texte: [], dialogue: 'patron' }
        : {
            tous: ['Le Patron ne se lève pas. Il regarde Hercules un long moment, avec l’amusement tranquille de quelqu’un qui connaît une bonne histoire.',
                   '« Ex-bureaucrate de l’administration Saito, tombé pour corruption. » Il le dit devant tout le monde, sans baisser la voix, comme on rappelle une vieille connaissance.',
                   '« Il raconte ça autrement, d’habitude. Je préfère la vraie version. Elle est meilleure. »'],
            hercules: '« … Je vois que les nouvelles voyagent bien, dans ce quartier. »',
            flags: ['hercules-demasque'],
            visuels: ['hercules-demasque'],
            dialogue: 'patron',
          },
      utiliser: 'On ne fouille pas l’homme qui tient la seule sortie que cinq joueurs armés connaissent.',
    },

    /* ══ LA TABLE — le cœur de la mécanique (§3.5 du plan, en-tête) ═════
       « Une observation, pas une précaution » : le geste qui compte se
       joue au verbe REGARDER, tenu par Hercules seul — sa compétence de
       compteur de cartes, littéralement. Rien n'avertit qu'il faut
       regarder avant la porte : c'est le prix de « rien ne le
       distingue ». */
    table: {
      nom: 'La table de jeu, et les cinq joueurs',
      regarder: ({ a, qui }) => {
        if (qui !== 'hercules')
          return {
            tous: ['Cinq joueurs, des jetons, une lampe basse qui ne monte pas plus haut que les épaules — personne ici ne veut qu’on lise son visage.',
                   'Rien ne distingue personne. C’est probablement voulu.'],
            trash: '« Une des auras, à cette table, est plus froide que les autres. Je ne saurais pas dire laquelle. »',
            drakk: '« Cinq joueurs, cinq histoires qu’ils ne racontent pas. J’ai déjà maîtrisé des tables plus honnêtes que celle-ci. »',
            rabbit: '« Rien à pirater sur des cartes en carton. Pour une fois, mes yeux valent autant que les tiens, Hercules. »',
          }
        if (a('tueur-repere'))
          return { tous: [], hercules: '« Toujours le même. Troisième chaise en partant de la porte. Il ne regarde jamais ses cartes plus de deux secondes. »' }
        return {
          tous: ['Hercules ne regarde pas les cartes. Il regarde les mains, les mises, le rythme des relances — et un rythme, dans cette pièce-là, se lit comme un livre ouvert.',
                 '« Troisième chaise en partant de la porte. Il mise trop tôt, il mise trop bien, et il n’a pas touché son verre depuis qu’on est entrés. »',
                 '« Ce n’est pas un joueur. C’est quelqu’un qui joue à un joueur. »'],
          hercules: '« Compter des cartes, c’est repérer ce qui ne colle pas dans un motif. Un homme qui attend, ça ne colle jamais tout à fait. »',
          flags: ['tueur-repere'],
          visuels: ['tueur-repere'],
        }
      },
      utiliser: {
        tous: 'On ne s’assoit pas à une table qui n’est pas la nôtre, dans une salle qui n’est pas la nôtre.',
        drakk: '« Un compagnon ne rejoint pas une table sans y être invité. C’est écrit page huit. »',
      },
    },

    /* ══ LE GUICHET — où se lit le dossier ═════════════════════════════
       Même geste, mêmes trois fiches qu'ailleurs (garde-fou § 4.2). */
    guichet: {
      nom: 'Le guichet de change, éteint pour la nuit',
      regarder: ({ a }) => ({
        tous: a('dossier-lu')
          ? ['Un comptoir de caissier, grille à moitié baissée, assez large pour y étaler quelque chose.',
             'Le dossier est étalé dessus, en trois tas, et personne ne l’a refermé.']
          : ['Un comptoir de caissier, grille à moitié baissée — assez large pour y étaler quelque chose.'],
      }),
      utiliser: 'Tu t’y appuies. Personne ne te demande de jetons.',
      objets: {
        dossier: lectureDossier('sur le guichet, entre deux jeux de cartes scellés'),
      },
    },

    /* ══ LE DÉCOR AMBIANT ══════════════════════════════════════════════ */
    jetons: {
      nom: 'Un râtelier de jetons',
      regarder: {
        tous: 'Rien de marqué, rien de numéroté. Le genre de jetons qui ne valent que ce que le Patron veut bien s’en souvenir.',
        hercules: '« Aucune trace, aucun registre. C’est un système de confiance total envers un homme qui ne fait jamais confiance. L’ironie ne lui échappe pas non plus. »',
      },
      utiliser: 'Tu ne touches pas au râtelier d’un homme qui compte tout, même ce qu’il ne dit pas.',
    },

    videur: {
      nom: 'Le videur, près de la porte',
      regarder: {
        tous: 'Il ne bouge pas, ne parle pas, et n’a manifestement pas besoin de faire l’un ou l’autre pour qu’on le remarque.',
        drakk: '« Un garde qui ne garde qu’une seule porte. C’est un choix, pas une négligence — il n’y a nulle part ailleurs où fuir. »',
        rabbit: '« Aucun implant visible. Juste du muscle et de la patience. Ça marche encore, apparemment. »',
      },
      utiliser: 'Il te regarde. Tu changes d’avis.',
    },

    /* ══ LA SORTIE — le verrou du tableau ═════════════════════════════
       Le tir part TOUJOURS (garde-fou § 4.5) : `tripot-brule` tombe au
       premier passage, quoi qu'il arrive. Ce que `tueur-repere` change,
       c'est QUI encaisse en plus — personne, ou Hercules. */
    porte: {
      nom: 'La porte sans enseigne',
      sortie: 'tribunal',
      regarder: {
        tous: ['La porte par laquelle vous êtes entrés. Le tribunal est à vingt minutes, une fois dehors.',
               'Il est un peu plus de six heures. On peut partir quand on veut, et c’est le problème : il faut savoir quand.'],
        rabbit: '« Aucune caméra sur cette cour. C’est bien pour ça qu’il tient boutique ici, et bien pour ça qu’on peut sortir sans laisser de trace de plus. »',
      },
      utiliser: ({ a }) => {
        if (!a('tripot-brule')) {
          const commun = [
            'Huit heures quarante. À la table, quelqu’un se lève — pas pour partir.',
          ]
          if (a('tueur-repere'))
            return {
              tous: [...commun,
                     'Hercules a déjà bougé avant que la main de l’homme atteigne sa veste : deux mots au Patron, à peine plus haut qu’un murmure de jeu.',
                     'Le videur est sur lui en trois pas. Personne à la table ne lève les yeux — dans cet endroit, on ne regarde jamais la sortie de quelqu’un d’autre.',
                     '« Dehors », dit le Patron, sans se lever. « Et qu’on ne le revoie plus ici. »',
                     'La salle continue de jouer comme si rien ne s’était passé. C’est exactement ce que rien ne s’était passé, pour elle.'],
              hercules: '« Voilà à quoi ça sert, de savoir lire une table. »',
              flags: ['tripot-brule'],
              visuels: ['tripot-brule'],
              fiches: ['tir-tripot'],
            }
          return {
            tous: [...commun,
                   { texte: 'Il traverse la salle sans se presser, une main déjà dans la veste, et personne ne bouge — jusqu’à ce qu’il soit sur Lester.',
                     visuel: 'hercules-touche' },
                   'Hercules s’interpose d’un pas, sans réfléchir, et prend le coup qui n’était pas pour lui — une lame courte, au flanc, plus de sang que de dégâts.',
                   'Le videur le sort par le col avant que quiconque d’autre ait pu bouger. La partie continue. Elle n’a jamais vraiment cessé.',
                   '« C’est rien », dit Hercules, plié en deux, ce qui est faux, et personne ne le corrige.'],
            trash: '« Il ne l’a pas vu venir. Personne ne l’avait regardé venir. »',
            flags: ['tripot-brule', 'hercules-touche'],
            visuels: ['tripot-brule'],
            fiches: ['tir-tripot'],
          }
        }

        const c = compte(a)
        const commun = ['Le Patron vous fait signe de sortir par la cour, sans un mot de plus.',
                        'Lester passe devant lui sans savoir quoi dire, et ne dit rien.']
        return c >= 3
          ? { tous: [...commun,
                     '« Bon. »',
                     '« Je vais leur dire. Pas ce qu’ils veulent entendre — ce qui s’est passé. »',
                     'Il regarde une dernière fois la table, et l’homme qui vient d’apprendre qui était vraiment Hercules.',
                     '« S’ils demandent qui m’a protégé cette nuit, je dirai la vérité. Toute la vérité, pas juste la partie qui vous arrange. »'],
              hercules: ['« Voilà quelqu’un qui vient de décider quelque chose tout seul. »',
                         '« Dans ma salle. Il y a des gens qui viennent ici depuis vingt ans et qui n’ont jamais fait ça. »'],
              flags: ['lester-temoigne'], fiches: ['lester-temoigne'], va: 'tribunal' }
          : { tous: [...commun,
                     'Il ne dit rien. Il sort le premier, la tête basse.',
                     'Il ira au tribunal. Il sera vivant à dix heures. C’était le contrat.',
                     'Ce qu’il dira à la barre, personne ici ne le sait — et lui non plus.'],
              trash: '« On l’a assis dans une salle pleine de gens qui trichent, et on ne lui a pas parlé. On l’a juste transporté, une porte de plus loin. »',
              va: 'tribunal' }
      },
    },
  },

  dialogues: {

    /* ══ LESTER — le même G5, repris une cinquième fois ═══════════════
       Trois sujets ouverts à tout le monde, quatre paient des chaînes
       plantées ailleurs dans la nuit, un neuvième — `conf-hercules` —
       ne s'ouvre que si `hercules-assume` a été posé chez le Patron
       (voir l'en-tête du fichier). Il en faut TROIS sur sept. */
    lester: {
      qui: 'lester',
      accueil: ['Il ne lève pas la tête tout de suite.',
                '« C’est chez qui, ici ? »'],
      retour: ['« … »'],
      sujets: [
        {
          id: 'job',
          titre: '« On est payés. Par un flic. Pour te livrer vivant. »',
          quand: ({ a }) => !a('conf-job'),
          flags: ['conf-job'],
          texte: ['« Je sais. »',
                  '« … Non, en fait je savais pas. Je m’en doutais. C’est pas pareil. »',
                  '« Merci de l’avoir dit avant que je le devine. »'],
        },
        {
          id: 'ecouter',
          titre: '(Ne rien dire, et attendre.)',
          quand: ({ a }) => a('conf-job') && !a('conf-silence'),
          flags: ['conf-silence'],
          texte: ['Personne ne parle. Quelque part, un jeu de cartes se mélange, et c’est tout le bruit qu’il y a.',
                  '« Ils m’ont posé la même question pendant trois jours. »',
                  '« Chaque fois que je répondais pas, ils écrivaient quelque chose. »',
                  '« Vous, vous écrivez rien. C’est bizarre. »'],
        },
        {
          id: 'question',
          titre: '« Pose-la, ta question. »',
          quand: ({ a }) => a('conf-job') && !a('conf-question'),
          flags: ['conf-question'],
          texte: ['« Pourquoi ici ? C’est quoi, cet endroit ? »',
                  '« Pourquoi un halfelin qu’a jamais un rond amène cinq inconnus dans une salle de jeu clandestine ? »',
                  'La vraie réponse tient en un mot, Hercules. On la lui donne.',
                  '« … D’accord. Au moins c’est une réponse. »'],
        },
        {
          id: 'teresa',
          titre: '« Teresa Banks. Tu la connaissais ? »',
          quand: ({ a }) => a('sait-teresa') && !a('conf-teresa'),
          flags: ['conf-teresa'],
          /* Il ne la connaissait pas — voir la note du même sujet dans
             `duke.js`. Seule l'ambiance du lieu diffère d'une planque à
             l'autre ; les faits, non. */
          texte: ['Long silence. Quelque part, un jeton tombe et roule sous une chaise.',
                  '« Vous êtes les deuxièmes à dire son nom devant moi. »',
                  '« Le premier, c’était le vieux flic. Il l’a dit une fois, à voix basse, en relisant son dossier. Il croyait que je dormais. »',
                  '« Tout le monde dit “la victime”. C’est plus court. »'],
        },
        {
          id: 'bras',
          titre: '« Montre ce bras. »',
          acteur: 'trash',
          quand: ({ a }) => a('lester-blesse') && !a('conf-bras'),
          flags: ['conf-bras'],
          texte: ['Trash lui prend le poignet sans demander, remonte la manche, et regarde longtemps sans rien dire.',
                  '« Tu vas garder une marque. »',
                  '« … J’en ai d’autres. »',
                  '« Celle-là, tu sauras d’où elle vient. Ce n’est pas rien. »'],
        },
        {
          id: 'guilde',
          titre: '« Tu fais partie de la compagnie, maintenant. »',
          acteur: 'drakk',
          quand: ({ a }) => a('guilde') && !a('conf-guilde'),
          flags: ['conf-guilde'],
          texte: ['« C’était quoi, sur le bateau ? La bouteille. »',
                  '« Un serment », dit Drakk, avec un sérieux absolu.',
                  '« … Ah. »',
                  '« Vous êtes un peu bizarre. »',
                  '« On me le dit. Cela ne change rien au serment. »',
                  'Lester sourit. C’est court, et c’est le premier.'],
        },
        {
          id: 'mccarthy',
          titre: '« Le flic qui nous paie ne croit pas à son dossier. »',
          quand: ({ a }) => a('mccarthy-avoue') && !a('conf-mccarthy'),
          flags: ['conf-mccarthy'],
          texte: ['« Alors pourquoi il l’a signé. »',
                  'Personne n’a de bonne réponse. Quelqu’un donne la mauvaise : parce que c’est son travail.',
                  '« … Ouais. »',
                  '« C’est marrant, ce mot. Il sert à tout le monde. »'],
        },
        {
          id: 'loveland',
          titre: '« Le taudis où on l’a trouvée. C’était ta rue. »',
          quand: ({ a }) => a('dossier-lu') && !a('conf-dossier'),
          flags: ['conf-dossier'],
          fiches: ['lester-loveland'],
          texte: ['« … Ouais. »',
                  '« C’est un endroit où personne va. Y a rien dedans. Même nous on y allait pas. »',
                  '« Ils m’ont demandé quinze fois où j’étais cette nuit-là. Ils m’ont jamais demandé si elle, elle avait une raison d’y être. »',
                  '« Elle en avait pas. »'],
        },
        {
          id: 'deduction',
          titre: '« Ils ne veulent pas te condamner. Ils veulent qu’il n’y ait pas d’audience. »',
          quand: ({ a }) => a('su:pas-de-proces') && !a('conf-deduction'),
          flags: ['conf-deduction'],
          texte: ['Long silence.',
                  '« Donc si j’y vais, et que je parle… »',
                  '« … c’est le pire truc qui puisse leur arriver. »',
                  'Il se redresse. Ce n’est pas du courage, c’est du calcul, et c’est peut-être mieux.',
                  '« Personne m’a jamais dit que je pouvais être un problème pour quelqu’un. »'],
        },
        /* CE QU'HERCULES LUI APPREND, EN LE LAISSANT PARLER — propre à
           ce décor (garde-fou § 4.3 du plan). Gardé par `hercules-assume`,
           pas `hercules-demasque` : voir l'en-tête du fichier. */
        {
          id: 'hercules-confiance',
          titre: '« Ce que le Patron a dit sur toi. C’était vrai ? » (à Hercules)',
          quand: ({ a }) => a('hercules-assume') && !a('conf-hercules'),
          flags: ['conf-hercules'],
          texte: ['Hercules ne détourne pas les yeux, pour une fois.',
                  '« Oui. Tout. J’étais coupable, et j’ai raconté autre chose pendant vingt ans. »',
                  '« … Vous, vous avez dit la vérité alors que personne vous forçait. »',
                  '« Personne d’autre n’a fait ça pour moi, cette semaine. »'],
        },
        {
          id: 'assez',
          titre: '(Le laisser tranquille.)',
          fin: true,
          texte: ['Il regarde la table, ou ce qui vient de s’y passer.'],
        },
      ],
    },

    /* ══ LE PATRON — ce que l'équipe fait du démasquage (§9 du plan,
       tranché dans l'en-tête) ═══════════════════════════════════════
       Ouvert par `patron.parler`, une fois `hercules-demasque` posé.
       `laisser` et `couvrir` sont mutuellement exclusifs par construction
       (`quand`), et ne se referment jamais l'un sur l'autre après coup :
       contrairement aux planques du conseil, ce choix ne bloque rien de
       plus loin dans le tableau — seulement `conf-hercules`, plus haut. */
    patron: {
      qui: 'patron',
      accueil: ['Il repose ses cartes, sans les abattre. « Alors, on fait quoi de tout ça ? »'],
      retour: ['« Toujours la même histoire. Je ne me lasse pas de la raconter. »'],
      sujets: [
        {
          id: 'dette',
          titre: '« Qui d’autre vous a payé, cette nuit, pour nous trouver ? »',
          quand: ({ a }) => !a('tripot-embauche'),
          flags: ['tripot-embauche'],
          fiches: ['tripot-embauche'],
          texte: ['Le Patron hausse une épaule. « Personne ne m’a payé pour vous trouver. On m’a payé pour regarder ailleurs si quelqu’un d’autre le faisait. »',
                  '« Cash, à l’avance, jamais deux fois le même visage. Un professionnel, pas un habitué. »',
                  '« Ça, en revanche — ça, je le dis gratuitement, parce que j’aime bien Hercules, dans le fond. »'],
        },
        {
          id: 'laisser',
          titre: '« Vas-y. Raconte. » (Laisser Hercules parler)',
          quand: ({ a }) => !a('hercules-assume') && !a('hercules-couvert'),
          fin: true,
          flags: ['hercules-assume'],
          texte: ['Personne ne coupe la parole au Patron. Hercules non plus, pour une fois.',
                  '« … C’est vrai. Tout ce qu’il vient de dire. »',
                  'Il ne regarde pas Lester en le disant. Il le dit quand même, dans une pièce pleine d’inconnus, et ça compte plus que s’il l’avait chuchoté seul à seul.'],
        },
        {
          id: 'couvrir',
          titre: '« On n’a pas besoin d’entendre ça. » (Couper court)',
          quand: ({ a }) => !a('hercules-assume') && !a('hercules-couvert'),
          fin: true,
          flags: ['hercules-couvert'],
          texte: ['« On n’a pas besoin d’entendre ça », dit quelqu’un, et le sujet change avant qu’Hercules ait pu ouvrir la bouche.',
                  'Il ne dit pas merci. Il ne dit rien du tout, en fait, ce qui n’est pas tout à fait la même chose.'],
        },
        {
          id: 'assez',
          titre: '(En rester là, pour l’instant.)',
          fin: true,
          texte: ['Le Patron reprend ses cartes, et la partie continue sans vous.'],
        },
      ],
    },
  },
}
