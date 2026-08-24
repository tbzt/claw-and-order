/* ============================================================
   TABLEAU 5 BIS — STRAUBER ANTIQUITÉS. L'arrière-boutique de Herwick,
   choisie par Drakk au conseil de la traversée (`retour.js`, dialogue
   `conseil`, sujet `herwick`). Cinq heures et quelques.

   CHANTIER 36 — PLAN_PLANQUES.md § 3.2, ÉTAPE B DU § 8 : « la boutique
   de Herwick, en pilote ». Premier des trois décors annoncés par le
   chantier 35 à devenir réels ; la laverie (`planque.js`) reste le
   défaut si personne ne tranche.

   ══ CE QUI SE CHOISIT, CE N'EST PAS D'ÉVITER LE TIR (§1 du plan) ═════
   Le coup part TOUJOURS, ici comme à la laverie. Ce qui change, c'est
   QUI encaisse : Herwick, jamais Lester. « On ne se cache jamais nulle
   part, on se cache CHEZ QUELQU'UN, et quelqu'un le paie. »

   ══ LE G5 SE REJOUE ICI, PAS SEULEMENT À LA LAVERIE ═══════════════
   Mesuré avant d'écrire une ligne, comme la doctrine du projet le
   demande : `lester-temoigne` (le seul enjeu qui compte au rideau,
   `main.js`, `carnet.js`, `reseau.js`) n'était posé que par
   `planque.js`. Choisir Herwick sans reconstruire ce mécanisme aurait
   rendu la fin la plus importante du jeu INATTEIGNABLE dans la moitié
   des parties. Les trois sujets gratuits et les six chaînés sont donc
   repris ici avec les MÊMES noms de drapeau qu'à la laverie (une seule
   scène planque se visite par partie, ils ne se croisent jamais) ; un
   septième, `conf-herwick`, est propre à ce décor (garde-fou § 4.3 du
   plan : « chaque planque porte au moins une source de confiance
   chaînée qui lui est propre »).

   ══ LE DOSSIER SE LIT ICI AUSSI (garde-fou § 4.2) ═════════════════
   Mêmes trois fiches qu'à la laverie (`corps-loveland`, `crime-crapuleux`,
   `appart-hors-dossier`) : c'est le même dossier, lu dans une autre
   pièce. Ce que Herwick ajoute PAR-DESSUS, à voix humaine et pas au
   téléphone, c'est `appart-teresa` — le trou que ni le dossier ni un
   appel ne comblait (§3.2 : « la seule pièce du jeu où le trou du
   dossier … se comble à voix humaine »).

   ══ TROIS GESTES, AUCUN GRATUIT (§3.2 du plan) ════════════════════
   « Le soigner d'abord » est un geste À PART, pas une troisième
   branche exclusive : Trash peut soigner Herwick AVANT de trancher, ça
   coûte des minutes et rien d'autre — puis il faut quand même choisir
   entre « ne rien demander » (`herwick-epargne`) et « demander »
   (`drakk-brise`), qui restent mutuellement exclusifs. Lu au mot près :
   « Ça coûte des minutes … et c'est le seul geste qui ne coûte rien à
   PERSONNE D'AUTRE » — donc les deux autres coûtent chacun à quelqu'un,
   et soigner peut se combiner avec l'un ou l'autre. */

import { equipiers } from './equipiers.js'

/* ══ LE G5, REPRIS DE `planque.js` ═══════════════════════════════════
   Même arithmétique, mêmes noms de drapeau : GRATUITES plafonnées à
   deux, CHAINEES sans plafond, seuil à trois. `conf-abri` devient
   `conf-herwick` — propre à ce décor, gardé par `herwick-touche`. */
const GRATUITES = ['conf-job', 'conf-question', 'conf-silence']
const CHAINEES  = ['conf-teresa', 'conf-guilde', 'conf-bras',
                   'conf-mccarthy', 'conf-deduction', 'conf-dossier',
                   'conf-herwick']

const compte = (a) =>
  Math.min(GRATUITES.filter((f) => a(f)).length, 2) +
  CHAINEES.filter((f) => a(f)).length -
  (a('conf-perdue') ? 2 : 0)

/* ══ LES TROIS PRÉCAUTIONS, VERSION BOUTIQUE (§3.2 du plan) ══════════
   Une par runner, comme à la laverie : `rideau-baisse` (Drakk, la
   main), `caisse-coupee` (White_Rabbit, le terminal qui géolocalise
   ses paiements), `armoire-poussee` (Hercules, l'armoire normande
   devant la devanture). Trash n'en a pas — il DIT, sur `vues.astrale` :
   la boutique est saturée, quarante ans de mémoire empilée où une aura
   de gamin se perd. Premier lieu du jeu où l'astral cache au lieu de
   révéler. */
const PRECAUTIONS = ['rideau-baisse', 'caisse-coupee', 'armoire-poussee']
const prises = (a) => PRECAUTIONS.filter((f) => a(f)).length

export const herwick = {
  markup: 'scenes/herwick.html',

  ouverture: ({ a }) => [
    'L’arrière-boutique de Strauber Antiquités. Un antiquaire nain, un rideau de fer à moitié baissé sur la rue, et quarante ans de meubles empilés jusqu’au plafond.',
    'Herwick n’a pas discuté le prix : il a regardé Drakk, une seconde, et il a fait de la place.',
    a('lester-blesse')
      ? 'Lester s’est assis dans un fauteuil qui vaut sans doute plus cher que tout ce qu’il a jamais possédé, son bras contre lui.'
      : 'Lester s’est assis dans un fauteuil qui vaut sans doute plus cher que tout ce qu’il a jamais possédé.',
    'Il fait du thé. Personne ne le lui a demandé.',
    'OBJECTIF — tenir jusqu’à l’audience, sans que ça coûte à celui qui a ouvert la porte. Il reste trois heures et quelques.',
  ],

  /* `visuels` est vidé à chaque `charge()` (voir `planque.js`) : ce qui
     a été acquis doit se reposer à l'entrée, sinon une reprise après
     F5 rallume un terminal qu'on a fait taire. */
  entree: ({ a }) => [
    ...(a('rideau-baisse') ? ['rideau-baisse'] : []),
    ...(a('caisse-coupee') ? ['caisse-coupee'] : []),
    ...(a('armoire-poussee') ? ['armoire-poussee'] : []),
    ...(a('herwick-touche') ? ['herwick-touche'] : []),
  ],

  derive: ({ a }) => {
    const c = compte(a)
    return [c <= 0 ? 'lester-ferme' : c < 3 ? 'lester-ecoute' : 'lester-ouvert']
  },

  vues: {
    astrale: [
      'Quarante ans de meubles vendus, rachetés, hérités, abandonnés : des milliers de deuils qui se sont arrêtés ici un moment avant de repartir.',
      '« C’est saturé. Je ne trouve pas son aura à lui là-dedans. Je ne trouve personne — c’est la première fois de la nuit que je vois moins que ce qu’il y a. »',
    ],
    ra: [
      'Une seule icône, au-dessus de la caisse : un terminal qui pousse ses paiements vers un serveur de comptabilité, à heure fixe, toutes les nuits depuis vingt ans.',
      '« Il paie ses fournisseurs à des horaires bizarres. Ce n’est pas louche, c’est juste vieux. Mais ça bavarde, et cette nuit ça ne devrait pas. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('herwick'),

    /* ══ LESTER — le même G5, dans une autre pièce ═══════════════════ */
    lester: {
      nom: 'Lester',
      regarder: ({ a }) => ({
        tous: a('lester-blesse')
          ? ['Enfoncé dans un fauteuil qui a survécu à trois propriétaires, il tient son bras contre lui.',
             'C’est la première fois de la nuit qu’il est assis dans quelque chose de confortable, et ça ne semble pas l’aider.']
          : ['Enfoncé dans un fauteuil qui a survécu à trois propriétaires, les mains sur les accoudoirs comme s’il craignait de les salir.',
             'Il regarde le rideau de fer toutes les deux minutes. Pas les meubles : le rideau.'],
        hercules: '« Un gamin qui n’a jamais vu un meuble pareil, et qui n’ose pas s’y appuyer. On lui a appris à ne rien abîmer de ce qu’il n’a pas le droit de posséder. »',
        trash: compte(a) >= 3
          ? ['« Son aura a doublé depuis le bateau, et elle est tournée vers nous. »',
             '« Il a décidé quelque chose, et il ne l’a encore dit à personne. »',
             '« Ce qu’il dira à la barre, il vient de le décider ici. »']
          : compte(a) >= 1
            ? ['« Son aura est plus grande qu’au bateau. Elle est tournée vers nous, pas ouverte. »',
               '« Il attend de voir ce qu’on fait de cette pièce, et de l’homme qui nous l’a ouverte. »']
            : ['« Son aura est serrée sur elle-même, comme au bateau. »',
               '« Il regarde un homme saigner pour lui et il ne sait pas quoi en faire. Moi non plus, pour être honnête. »'],
        rabbit: '« Vingt ans, et il n’a jamais été assis dans une pièce qui vaut aussi cher que sa peine. »',
        drakk: '« Il ne dort pas. Il regarde Herwick comme s’il essayait de comprendre pourquoi un inconnu saigne pour lui. »',
      }),
      parler: { texte: [], dialogue: 'lester' },
      utiliser: 'Non. Il a passé la nuit à être déplacé par des mains.',
      objets: {
        bouteille: ({ a }) => a('guilde')
          ? { tous: 'Elle est restée sur le voilier. Ici, il y a du thé.' }
          : { tous: 'Herwick l’a vue et n’a rien dit, mais il a posé deux tasses de plus sur le comptoir.' },
        arme: 'Non. Pas devant lui, et pas dans la boutique d’un homme qui vient de vous ouvrir sa porte.',
      },
    },

    /* ══ HERWICK — l'hôte, jamais un pion ═════════════════════════════
       Avant le tir : un homme qui range ce qui n'a pas besoin d'être
       rangé, en boucle, parce qu'il ne peut pas se rasseoir (§3.2 du
       plan). Après : la barre du dilemme, ouverte par `parler`. */
    herwick: {
      nom: 'Herwick Strauber',
      regarder: ({ a }) => a('herwick-touche')
        ? {
            tous: ['Assis sur une chaise Louis XV qu’il n’a jamais laissé personne toucher, une main sur l’épaule, il regarde ses propres doigts comme un objet qu’il n’a pas encore expertisé.',
                   '« Ce n’est rien », dit-il. Ce n’est pas vrai, et il le sait mieux que quiconque dans la pièce.'],
            drakk: '« Il s’assoit sur la seule chaise de la boutique qu’il n’a jamais osé vendre. Je ne sais pas s’il l’a fait exprès. »',
          }
        : {
            tous: ['Un nain d’un âge indéfini, rideau de fer à moitié baissé derrière lui, qui range des objets qui n’ont pas besoin d’être rangés.',
                   'Il regarde la rue toutes les cinq minutes. Il ne s’est pas recouché depuis que vous êtes entrés.'],
            hercules: '« Un homme seul, tiré du lit à cinq heures pour héberger cinq inconnus et un fugitif, et qui fait du thé. Je connais le prix de ce genre de politesse : il est en train de le payer d’avance. »',
            trash: '« Son aura ne tient pas en place. Ce n’est pas de la peur. C’est quelqu’un qui a déjà décidé de rester, et qui n’aime pas ce que ça va lui coûter. »',
            rabbit: '« Il n’a pas de caméra dans sa propre boutique. Un antiquaire, sans caméra. Ça devrait me rassurer et ça ne me rassure pas. »',
            drakk: '« Le même homme, quarante ans plus tard, dans la même arrière-boutique. Il m’a ouvert cette porte une fois. Ce soir, c’est moi qui frappe. »',
          },
      parler: ({ a }) => {
        if (!a('herwick-touche'))
          return { tous: 'Il vous verse du thé et change de sujet chaque fois qu’on lui demande s’il va bien. Il va bien. Ce n’est pas la question.' }
        if (a('herwick-epargne') || a('drakk-brise'))
          return { tous: 'Il a la main sur la plaie et le regard sur la fente du rideau. Il n’a plus rien à ajouter — pas ce matin.' }
        return { texte: [], dialogue: 'herwick' }
      },
      utiliser: 'On ne fouille pas la boutique d’un homme qui vient de vous l’ouvrir.',
    },

    /* ══ LE RIDEAU — précaution de Drakk ══════════════════════════════ */
    rideau: {
      nom: 'Le rideau de fer',
      regarder: ({ a }) => a('rideau-baisse')
        ? { tous: 'Baissé jusqu’en bas. Plus une fente, plus une ligne de tir depuis la rue.',
            drakk: '« Voilà. On ne me voit plus penser d’ici. »' }
        : { tous: 'À moitié baissé, comme tous les soirs. De la rue, on voit encore les pieds de ceux qui bougent à l’intérieur.',
            drakk: '« Une porte qui ne choisit pas d’être ouverte ou fermée. Ça me déplaît profondément. »',
            rabbit: '« Rideau de fer, pas de capteur. S’il descend, personne d’extérieur ne le saura avant de l’avoir vu. »' },
      utiliser: ({ a, qui }) => {
        if (a('rideau-baisse')) return { tous: 'Il est déjà au sol. Le baisser deux fois ne le baisserait pas plus.',
                                          drakk: '« Ça tient. Je vérifie, c’est tout. »' }
        if (qui !== 'drakk')
          return { tous: 'Il est lourd, et il grince — le genre de bruit qu’on ne fait qu’une fois, au bon moment.',
                   hercules: '« Laisse-le faire. C’est le seul d’entre nous à pouvoir le baisser sans réveiller la rue. »' }
        return {
          tous: ['Drakk le prend à deux mains et le fait descendre en un seul mouvement, lentement, pour ne pas qu’il claque.',
                 'Plus une fente. La boutique devient une boîte, éclairée seulement de l’intérieur.'],
          drakk: '« Voilà. On n’est plus visibles. On est seulement là. »',
          flags: ['rideau-baisse'],
          visuels: ['rideau-baisse'],
        }
      },
    },

    /* ══ LA CAISSE — précaution de White_Rabbit ═══════════════════════ */
    caisse: {
      nom: 'Le terminal de caisse',
      regarder: ({ a }) => ({
        tous: a('caisse-coupee')
          ? 'Éteint. Le petit voyant vert qui clignotait toutes les quarante secondes a disparu.'
          : 'Un vieux terminal de paiement, mis à jour une fois par décennie, qui pousse ses transactions vers un serveur comptable chaque nuit à heure fixe.',
        rabbit: a('caisse-coupee')
          ? '« Coupé. Il ne dira plus à personne qu’il y a une boutique ouverte à cette heure. »'
          : '« Il émet. Pas grand-chose, mais il émet — un point de plus sur une carte, à l’heure où il ne devrait y avoir aucun mouvement ici. »',
      }),
      utiliser: ({ a, qui }) => {
        if (a('caisse-coupee')) return { tous: 'Éteint. Il n’a plus rien à dire à personne.' }
        if (qui !== 'rabbit')
          return { tous: 'Il faudrait un deck, et savoir dans quoi on entre.',
                   hercules: '« Laisse-la faire. C’est son rayon, et je préfère que ce soit elle plutôt que moi qui tâtonne. »' }
        return {
          tous: ['White_Rabbit se glisse dans le petit réseau du terminal, coupe la synchronisation nocturne, et referme derrière elle.',
                 'Rien ne clignote plus. Une boutique fermée, sur les registres, exactement comme elle devrait l’être à cette heure.'],
          rabbit: '« Voilà. Aux yeux de qui que ce soit qui regarde de loin, cette caisse dort. »',
          flags: ['caisse-coupee'],
          visuels: ['caisse-coupee'],
        }
      },
    },

    /* ══ L'ARMOIRE — précaution d'Hercules ═════════════════════════════
       DEVANT LA DEVANTURE, PAS DEVANT LE RIDEAU : deux cibles distinctes
       pour deux gestes distincts (§ « une chose du monde, une seule
       cible ») — celle-ci ferme la ligne de tir qui contourne le rideau
       par la vitrine latérale, pas le rideau lui-même. */
    armoire: {
      nom: 'Une armoire normande',
      regarder: ({ a }) => ({
        tous: a('armoire-poussee')
          ? 'Poussée devant la petite vitrine latérale, celle que le rideau ne couvre pas. Elle a dû peser une fortune à faire glisser.'
          : 'Deux mètres de chêne sculpté, devant une vitrine latérale que le rideau de fer ne couvre pas — un angle mort dans un angle mort.',
        hercules: a('armoire-poussee')
          ? '« Trente ans de bureaucratie m’ont appris une chose : on ne devine jamais l’angle qu’on n’a pas vérifié. Celui-là, je viens de le fermer. »'
          : '« Cette vitrine-là, personne n’en a parlé. C’est exactement le genre d’angle que je passe ma vie à chercher. »',
      }),
      utiliser: ({ a, qui }) => {
        if (a('armoire-poussee')) return { tous: 'Elle ne bougera plus ce matin. Elle a déjà donné.' }
        if (qui !== 'hercules')
          return { tous: 'Elle doit peser plus qu’un homme. Il faudrait quelqu’un qui sache pousser sans se faire un tour de dos, et surtout sans faire de bruit.',
                   drakk: '« Je pourrais la porter. Je préfère qu’on ne m’entende pas la porter. »' }
        return {
          tous: ['Hercules cale son épaule contre le bois et pousse, par petits à-coups silencieux, jusqu’à ce que l’armoire couvre entièrement la vitrine latérale.',
                 'Herwick le regarde faire sans un mot. C’est visiblement la première fois que quelqu’un déplace ce meuble depuis qu’il l’a acheté.'],
          hercules: '« Voilà l’angle mort fermé. Ça ne coûte rien à personne, sauf à mon dos, demain. »',
          flags: ['armoire-poussee'],
          visuels: ['armoire-poussee'],
        }
      },
    },

    /* ══ LE COMPTOIR — où se lit le dossier ═══════════════════════════
       Même geste, mêmes trois fiches qu'à `planque.js` (garde-fou § 4.2
       du plan) : c'est le même dossier, lu dans une autre pièce. */
    comptoir: {
      nom: 'Le comptoir de la boutique',
      regarder: ({ a }) => ({
        tous: a('dossier-lu')
          ? ['Un comptoir de bois sombre, couvert d’étiquettes de prix écrites à la main.',
             'Le dossier est étalé dessus, en trois tas, et personne ne l’a refermé.']
          : ['Un comptoir de bois sombre, couvert d’étiquettes de prix écrites à la main — assez grand pour y étaler quelque chose.'],
      }),
      utiliser: 'Tu t’y appuies. Il tient, comme tout ici depuis quarante ans.',
      objets: {
        dossier: ({ a }) => a('dossier-lu')
          ? { tous: 'Vous l’avez lu. Trois fois, à quatre. Il ne dira rien de plus ici.',
              rabbit: '« Ce qui manque dedans ne va pas apparaître parce qu’on rouvre la chemise. »' }
          : {
              tous: ['Hercules étale la chemise sur le comptoir, entre une pendule arrêtée et un lot de timbales dépareillées, et la partage en trois tas.',
                     'Le dossier tient en trois faits, et les trois se regardent de travers.',
                     'UN — le corps a été trouvé dans un taudis de Loveland, à deux rues de chez Lester.',
                     'DEUX — l’accusation appelle ça une agression de rue. Ça règle la question du mobile en la supprimant.',
                     'TROIS — son appartement à elle n’est nulle part dans ces pages. Ni photo, ni relevé, ni ligne.'],
              hercules: '« Trente ans d’administration. Un dossier qui ne verse pas une adresse, ce n’est pas un dossier bâclé. C’est un dossier arbitré. »',
              trash: '« Il y a un endroit dans cette histoire où quelqu’un est mort, et il n’est pas écrit ici. Ça me gêne physiquement. »',
              rabbit: ['« Trois jours de procédure, zéro pièce matérielle sur le lieu du décès. »',
                       '« Ce n’est pas un trou. Un trou, c’est rond. Celui-là a des bords droits. »'],
              drakk: '« On a désigné un coupable, puis on a bâti la carte autour de lui. J’ai fait pire, comme maître de jeu. Jamais avec un vrai gamin. »',
              flags: ['dossier-lu'],
              fiches: ['corps-loveland', 'crime-crapuleux', 'appart-hors-dossier'],
            },
      },
    },

    /* ══ LE DÉCOR AMBIANT ══════════════════════════════════════════════ */
    meubles: {
      nom: 'Quarante ans de meubles',
      regarder: {
        tous: 'Des armoires, des horloges, des cadres vides, empilés jusqu’au plafond — les restes de quarante ans de deuils vendus à la pièce.',
        drakk: '« Une salle au trésor sans dragon. J’ai toujours trouvé ça plus triste qu’une salle vide. »',
        trash: '« Chaque objet ici a fini une histoire de quelqu’un d’autre. C’est peut-être pour ça que l’astral n’y voit rien clair : trop de fins, aucune en cours. »',
        rabbit: '« Rien de connecté là-dedans. C’est presque reposant. »',
      },
      utiliser: 'Tu ne touches pas au stock d’un homme qui te loge gratuitement.',
    },

    horloge: {
      nom: 'Une horloge comtoise, arrêtée',
      regarder: {
        tous: 'Arrêtée depuis des années, à une heure qui ne veut plus rien dire. Ce n’est pas elle qui donne l’heure ici — c’est le téléphone de White_Rabbit.',
        hercules: '« Trois heures pour convaincre un gamin de vingt ans, dans la boutique de l’homme qui saigne pour lui. Il a raison d’avoir peur, en plus. »',
        drakk: '« Elle s’est arrêtée un jour précis, et Herwick ne l’a jamais fait réparer. Certains hommes gardent leurs cicatrices visibles. »',
      },
      utiliser: 'La remonter ne dirait toujours pas l’heure qu’il faut. Autant la laisser se taire.',
    },

    /* ══ LA SORTIE — le verrou du tableau ═════════════════════════════
       Même geste en deux temps que `porte` dans `planque.js` : le tir
       part TOUJOURS au premier usage ; ensuite, tant que le dilemme de
       Herwick n'est pas tranché, la sortie se refuse ; une fois tranché,
       elle applique le seuil de confiance (G5) et transite vers
       `tribunal`, exactement comme `planque.js`. */
    porte: {
      nom: 'La porte de service, vers la ruelle',
      regarder: {
        tous: ['Une porte en tôle, à l’arrière, qui donne sur une ruelle de service. Le tribunal est à vingt minutes, à pied.',
               'Il est un peu plus de cinq heures. On peut partir quand on veut, et c’est le problème : il faut savoir quand.'],
        rabbit: '« Une seule caméra dans cette ruelle, et elle est cassée depuis un moment — d’après ce que je vois d’ici. »',
      },
      utiliser: ({ a }) => {
        /* ══ HUIT HEURES QUARANTE ═══════════════════════════════════
           Le coup part TOUJOURS (règle 19, § « ce qui se choisit, c'est
           qui encaisse ») et c'est TOUJOURS Herwick qui le prend — le
           plan le dit au mot près, sans le brancher sur les précautions :
           « le tir traverse le rideau de fer à mi-hauteur et c'est
           Herwick qui le prend, à l'épaule ». Les précautions changent
           ce que le tireur a pu lire de la pièce AVANT le coup — donc
           ce qui accompagne Herwick au sol, pas SI il tombe. */
        if (!a('herwick-touche')) {
          const n = prises(a)
          const debout = [
            'Huit heures quarante. Herwick pose sa tasse et va lui-même vérifier le rideau, comme il l’a fait toutes les cinq minutes depuis le début.',
            'C’est à ce moment précis que le coup part.',
          ]
          /* `visuel` posé sur la ligne qui le dit, pas sur la réaction :
             même bug évité qu'au chantier 4 (« le seul coup de feu de la
             nuit partait dans un mur de récit qui se terminait par un
             changement de tableau »). Sans lui, la posture assise et la
             tache de sang n'apparaissaient qu'au rechargement suivant —
             trouvé en jouant la séquence, pas en relisant le code. */
          if (n >= 2)
            return { tous: [...debout,
                            'Le carreau siffle à mi-hauteur du rideau, dans l’angle exact où Herwick se tenait il y a une seconde — et où il ne se tient plus tout à fait.',
                            { texte: 'Il tombe assis, plus surpris que touché, une entaille à l’épaule qui saigne sans presser.',
                              visuel: 'herwick-touche' },
                            'Personne d’autre n’a bougé, parce que personne d’autre n’était visible depuis la rue. Le tireur n’avait que lui.'],
                     drakk: '« Il avait une pièce à lire. Nous ne la lui avions pas laissée. Il n’a eu que celui qui restait debout. »',
                     rabbit: '« Une seule cible offerte, et c’était la sienne. Ce n’est pas de la chance, c’est de l’arithmétique. »',
                     flags: ['herwick-touche'],
                     fiches: ['tir-herwick'] }
          return { tous: [...debout,
                          'Le carreau passe à travers la fente du rideau, et à travers Herwick, qui était debout, éclairé, seul visage à hauteur du tireur.',
                          { texte: 'Il s’effondre contre le comptoir. Le sang part vite sur la chemise claire.',
                            visuel: 'herwick-touche' },
                          '« Ce n’est rien », dit-il tout de suite, avant même qu’on lui demande.'],
                   trash: '« Ne le déplacez pas encore. Laissez-moi une minute. »',
                   hercules: '« Une boutique comme celle-là se lit depuis la rue si on ne fait rien pour l’en empêcher. Nous n’avons pas fait grand-chose. »',
                   flags: ['herwick-touche'],
                   fiches: ['tir-herwick'] }
        }

        /* Tant que le dilemme n'est pas tranché, on ne part pas : la
           porte se refuse dans la voix du runner actif (règle 11). */
        if (!a('herwick-epargne') && !a('drakk-brise'))
          return { tous: 'On ne sort pas en laissant un homme qui saigne pour vous sans un mot.',
                   drakk: '« Pas comme ça. Pas lui. Pas comme ça. »' }

        const c = compte(a)
        const commun = ['Herwick relève le rideau lui-même, d’une seule main, pour vous laisser sortir par la ruelle.',
                        'Lester passe devant lui sans savoir quoi dire, et ne dit rien.']
        return c >= 3
          ? { tous: [...commun,
                     '« Bon. »',
                     '« Je vais leur dire. Pas ce qu’ils veulent entendre — ce qui s’est passé. »',
                     'Il regarde une dernière fois la boutique, et l’homme assis dedans.',
                     '« Si vous êtes encore là quand je sortirai, je lui rachèterai quelque chose. J’aurai rien pour payer, mais je lui rachèterai quelque chose. »'],
              hercules: '« Voilà quelqu’un qui vient de décider quelque chose tout seul. C’est plus rare que ça n’en a l’air. »',
              flags: ['lester-temoigne'], fiches: ['lester-temoigne'], va: 'tribunal' }
          : { tous: [...commun,
                     'Il ne dit rien. Il sort le premier, la tête basse.',
                     'Il ira au tribunal. Il sera vivant à dix heures. C’était le contrat.',
                     'Ce qu’il dira à la barre, personne ici ne le sait — et lui non plus.'],
              trash: '« On l’a assis dans une boutique où un homme a saigné pour lui, et on ne lui a pas parlé. On l’a juste transporté, une pièce de plus loin. »',
              va: 'tribunal' }
      },
    },
  },

  dialogues: {

    /* ══ LESTER — le même G5, repris de `planque.js` ══════════════════
       Trois sujets ouverts à tout le monde, quatre paient des chaînes
       plantées ailleurs dans la nuit, un septième — `conf-herwick` —
       n'existe que dans ce décor. Il en faut TROIS sur sept. */
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
          texte: ['Personne ne parle. Quelque part dans la boutique, une pendule qui ne marche plus ne fait pas de bruit non plus, et c’est très long.',
                  '« Ils m’ont posé la même question pendant trois jours. »',
                  '« Chaque fois que je répondais pas, ils écrivaient quelque chose. »',
                  '« Vous, vous écrivez rien. C’est bizarre. »'],
        },
        {
          id: 'question',
          titre: '« Pose-la, ta question. »',
          quand: ({ a }) => a('conf-job') && !a('conf-question'),
          flags: ['conf-question'],
          texte: ['« Pourquoi lui ? Le vieux, là. »',
                  '« Pourquoi un inconnu ouvre sa boutique à cinq heures du matin pour un gamin qu’il a jamais vu ? »',
                  'La vraie réponse tient en un mot, Drakk. On la lui donne.',
                  '« … D’accord. Au moins c’est une réponse. »'],
        },
        {
          id: 'teresa',
          titre: '« On sait comment elle s’appelait. Teresa. »',
          quand: ({ a }) => a('sait-teresa') && !a('conf-teresa'),
          flags: ['conf-teresa'],
          texte: ['Il ferme les yeux.',
                  '« Vous êtes les deuxièmes à dire son nom devant moi. »',
                  '« Le premier, c’était le vieux flic. Il l’a dit une fois, à voix basse, en relisant son dossier. Il croyait que je dormais. »',
                  '« Tout le monde dit “la victime”. C’est plus court. »'],
        },
        {
          id: 'bras',
          titre: '« Montre ce bras. » (Trash)',
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
          titre: '« Tu fais partie de la compagnie, maintenant. » (Drakk)',
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
        /* CE QUE HERWICK LUI APPREND SANS UN MOT — propre à ce décor
           (garde-fou § 4.3 du plan). Gardé par `herwick-touche` : voir
           un homme saigner pour lui n'a rien à raconter tant que
           personne n'a saigné. */
        {
          id: 'herwick',
          titre: '« Ça va ? »',
          quand: ({ a }) => a('herwick-touche') && !a('conf-herwick'),
          flags: ['conf-herwick'],
          texte: ['Il regarde le sang sur la chemise de Herwick, puis vous, puis Herwick encore.',
                  '« Il vous connaissait même pas, avant cette nuit. »',
                  '« Personne fait ça pour un contrat. »',
                  '« … Je crois que j’ai jamais vu personne faire ça pour rien. »'],
        },
        {
          id: 'assez',
          titre: '(Le laisser tranquille.)',
          fin: true,
          texte: ['Il regarde la fente du rideau.'],
        },
      ],
    },

    /* ══ HERWICK — le dilemme, § 3.2 du plan ═════════════════════════
       Ouvert par `herwick.parler` une fois `herwick-touche` posé.
       `soigner` est un geste À PART qui se combine avec l'un OU
       l'autre des deux issues, jamais un troisième chemin qui les
       remplace (voir l'en-tête du fichier). `rien` et `demander`
       ferment la scène : la porte ne s'ouvre qu'une fois l'un des deux
       posé (`porte.utiliser`, plus haut). */
    herwick: {
      qui: 'herwick',
      accueil: ['Il a la main sur l’épaule et il regarde ceux qui l’ont amené ça.',
                '« Alors. Vous vouliez me demander quelque chose, je crois. »'],
      retour: ['« Je suis toujours là. Ça n’a pas beaucoup changé en deux minutes. »'],
      sujets: [
        {
          id: 'soigner',
          titre: '« Laisse-moi voir cette épaule d’abord. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => !a('herwick-soigne') && !a('herwick-epargne') && !a('drakk-brise'),
          flags: ['herwick-soigne'],
          minutes: 20,
          texte: ['Trash écarte la chemise sans demander la permission, et Herwick le laisse faire — il n’a manifestement pas le choix, et il le sait.',
                  'Vingt minutes, un pansement propre, et un vieil homme qui respire un peu mieux.',
                  '« Merci, compagnon. »',
                  '« … Ça ne répond toujours pas à la question que vous êtes venus poser. »'],
        },
        {
          id: 'demander',
          titre: '« Le Loveland, l’appartement — il faut qu’on sache. »',
          quand: ({ a }) => !a('herwick-epargne') && !a('drakk-brise'),
          fin: true,
          flags: ['drakk-brise'],
          fiches: ['appart-teresa'],
          texte: ['Herwick ferme les yeux une seconde, puis les rouvre.',
                  '« … Un studio, au-dessus d’un pressing, à Loveland. Loué cash depuis huit mois, à un nom qui n’est pas le sien. Je le situe au mètre près — je ne le dois à aucun registre, seulement à quarante ans à savoir qui vit où sur mon trottoir. »',
                  ['drakk', '« … »'],
                  ['drakk', '« Je vous ai vus le faire. Je ne l’oublierai pas. »'],
                  'Herwick ne le regarde pas en le disant. Il regarde la fente du rideau, comme avant.',
                  '« Ce n’est rien, compagnon. Vous aviez besoin de savoir. »',
                  '« Ça n’empêche pas que je l’ai vu. »'],
        },
        {
          id: 'rien',
          titre: '(Ne rien demander. Le laisser tranquille.)',
          quand: ({ a }) => !a('herwick-epargne') && !a('drakk-brise'),
          fin: true,
          flags: ['herwick-epargne'],
          texte: [['drakk', '« On ne lui demande rien de plus. »'],
                  'Personne ne discute. Herwick relève la tête, surpris, comme s’il s’attendait à autre chose.',
                  '« Vous êtes sûrs ? J’ai ce que vous cherchez, vous savez. »',
                  ['drakk', '« On sait. »'],
                  'Il ne dit plus rien pendant un moment. Puis il hoche la tête, une fois, et se ressert du thé de l’autre main.'],
        },
      ],
    },
  },
}
