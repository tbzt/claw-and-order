/* ============================================================
   TABLEAU 5 QUINQUIES — LE SQUAT DE TRASH. La loge chamanique, choisie
   par Trash lui-même au conseil de la traversée (`retour.js`, dialogue
   `conseil`, sujet `squat`). Cinq heures et quelques.

   CHANTIER 40 — PLAN_PLANQUES.md § 3.4, ÉTAPE C DU § 8 : « la plus
   riche des deux neuves, et celle qui ouvre une mécanique inédite (le
   préavis). » Le quatrième des cinq décors annoncés par le chantier 35
   à devenir réels, après Herwick (36), Sarah (37, rétrogradée en halte
   au 39) et Duke (37).

   ══ CE QUI SE CHOISIT, CE N'EST PAS D'ÉVITER LE TIR (§1 du plan) ═════
   Ici comme ailleurs, garde-fou § 4.5 : le tir part TOUJOURS. Ce qui
   change, c'est ce qu'il trouve en arrivant — et, pour la première fois,
   QUI a encaissé avant même que la porte s'ouvre : Trash lui-même a
   déjà tout payé, en prêtant son seul endroit à lui.

   ══ « ON NE TROUVE PAS LE LIEU : ON TROUVE TRASH » (§3.4 du plan) ═══
   Un squat n'a ni bail, ni SIN, ni facture, ni contact qui parle — le
   meilleur dossier tactique des quatre. Alors ce n'est pas le dossier
   qui le trahit : c'est sa propre nuit. `esprit-eau` au voilier,
   `signature: 'raton-laveur'` à l'astral partout où il a agi cette nuit
   (chantier 33 au greffe) — un chaman qui cherche un chaman le trouve
   à l'astral. C'est la seule planque du jeu où le préavis existe, et
   c'est aussi la seule où l'on est trouvé PAR SA FAUTE — le jeu peut le
   dire sans accuser le joueur : c'est Trash qui le comprend à voix
   haute, pas un texte de blâme.

   ══ LE MÉCANISME TRANCHÉ : LE PRÉAVIS, EN TOURS, PAS EN MINUTES (§9) ══
   Le plan laissait la question ouverte : « en minutes d'horloge (donc
   l'heure du tir bouge) ou en tours de dialogue ? » Tranché ici : en
   tours. Le préavis est délivré dès `ouverture()` — Trash le sent
   AVANT que le joueur agisse, ce qui fait de tout ce qui suit une
   RÉACTION à un signal connu, jamais une précaution posée dans le vide
   comme au rideau de Herwick ou à la baie de la laverie. Sous le capot,
   la mécanique reste un compte de gestes pris avant `porte.utiliser`
   (même fonction `prises()` que Herwick) : le plan dit « pas de
   précautions » au sens narratif — on ne se protège pas d'une menace
   qu'on ignore, on RÉPOND à une menace qu'on connaît déjà — pas au sens
   mécanique. Réutiliser le compteur éprouvé plutôt que d'inventer un
   système de minutes qui toucherait `avance()` était le choix le plus
   sûr, et c'est le sens de « le second est plus simple ».

   ══ LE G5 SE REJOUE UNE QUATRIÈME FOIS ══════════════════════════════
   Mêmes noms de drapeau que les trois autres planques, plus `conf-trash`,
   gardé par `loge-brulee` (garde-fou § 4.3 du plan).

   ══ CE QUI COÛTE, ET C'EST TOUJOURS LA MÊME CHOSE (§3.4 du plan) ═════
   « La loge est accordée à lui. Brûlée, il perd le seul endroit où il
   peut travailler — et quiconque l'a trouvée tient un morceau de lui. »
   `loge-brulee` tombe TOUJOURS au premier passage à la porte, comme
   `herwick-touche` ou `ganger-touche` — la loge est compromise dès
   qu'elle est trouvée, quoi qu'on ait fait avant. Ce que les trois
   réactions changent, c'est si un morceau de LUI part avec :
   `trash-trace`, posé seulement si moins de deux réactions ont été
   prises avant la porte — sinon l'intrus reparti à vide n'a rien à
   ramener de plus qu'une adresse déjà grillée. */

import { equipiers } from './equipiers.js'
/* Le dossier se lit dans les cinq décors où l'équipe attend l'audience,
   et c'est le MÊME dossier : son texte vit chez celui qui l'a écrit en
   premier (`planque.js`), et on ne passe ici que le meuble. */
import { lectureDossier } from './planque.js'

/* ══ LE G5, REPRIS DE `planque.js` / `herwick.js` / `duke.js` ═══════════ */
const GRATUITES = ['conf-job', 'conf-question', 'conf-silence']
const CHAINEES  = ['conf-teresa', 'conf-guilde', 'conf-bras',
                   'conf-mccarthy', 'conf-deduction', 'conf-dossier',
                   'conf-trash']

const compte = (a) =>
  Math.min(GRATUITES.filter((f) => a(f)).length, 2) +
  CHAINEES.filter((f) => a(f)).length -
  (a('conf-perdue') ? 2 : 0)

/* ══ LES TROIS RÉACTIONS AU PRÉAVIS, UNE PAR RUNNER (§3.4 du plan) ═════
   Trash donne le signal (`ouverture()`) ; il n'a pas de geste à lui ici
   — il EST le signal. Les trois autres, comme au rideau de Herwick :
   Drakk barricade l'unique accès physique (`echelle-tenue`), White_Rabbit
   coupe ce qui émet dans la loge (`loge-eteinte`), Hercules descend
   accueillir ce qui monte avant que ça n'arrive à l'étage
   (`palier-tenu`). */
const REACTIONS = ['echelle-tenue', 'loge-eteinte', 'palier-tenu']
const prises = (a) => REACTIONS.filter((f) => a(f)).length

export const squat = {
  markup: 'scenes/squat.html',

  ouverture: ({ a }) => [
    'Un dernier étage muré aux trois quarts, au-dessus d’un atelier de couture fermé depuis des années. Personne ne l’a loué à Trash : il l’a trouvé mal protégé, et il l’a traité comme un don.',
    'Des meubles qui ne devraient pas être là — un fauteuil Second Empire éventré, un miroir dont le tain s’écaille en dentelle, un métier à tisser transformé en autel — la récupération d’un homme qui a perdu sa fortune sans perdre son œil.',
    a('lester-blesse')
      ? 'Lester s’est assis sur le fauteuil éventré, son bras contre lui, sans oser s’y enfoncer.'
      : 'Lester s’est assis sur le fauteuil éventré sans oser s’y enfoncer.',
    { texte: 'Trash s’arrête au milieu d’une phrase, la tête légèrement tournée, comme s’il écoutait quelque chose qui n’a pas encore de son.',
      visuel: 'loge-alerte' },
    ['trash', '« Quelque chose remonte l’escalier de service de l’immeuble d’à côté. Ça ne devrait pas savoir que cet immeuble-là mène ici. »'],
    ['trash', '« On a un peu de temps. Pas beaucoup. »'],
    'OBJECTIF — tenir jusqu’à l’audience, sans que ça coûte à celui qui a ouvert la porte. Il reste trois heures et quelques.',
  ],

  entree: ({ a }) => [
    'loge-alerte',
    ...(a('echelle-tenue') ? ['echelle-tenue'] : []),
    ...(a('loge-eteinte') ? ['loge-eteinte'] : []),
    ...(a('palier-tenu') ? ['palier-tenu'] : []),
    ...(a('loge-brulee') ? ['loge-brulee'] : []),
  ],

  derive: ({ a }) => {
    const c = compte(a)
    return [c <= 0 ? 'lester-ferme' : c < 3 ? 'lester-ecoute' : 'lester-ouvert']
  },

  vues: {
    astrale: [
      'La loge est PRÉPARÉE — accordée à celui qui l’a montée. Elle tient chaud à l’aura de Trash comme un vêtement porté longtemps.',
      '« Je vois ce qui approche mieux que je ne verrais un homme dans la rue. C’est ma maison, ici. Rien n’y entre sans que je le sente d’abord. »',
    ],
    ra: [
      'Une seule icône, mal cachée : un branchement volé sur la ligne de l’atelier du dessous, qui alimente trois lampes et rien d’officiel.',
      '« Il n’y a pas d’adresse à trouver sur un réseau. Ça, en revanche, ça se voit — si on sait où chercher, et je sais où chercher. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js).
       Trash y reste un équipier normal, pas un hôte à part : c'est lui
       qui parle en premier dans `ouverture()`, mais la loge elle-même
       — via `autel`, plus bas — porte ce que le tableau a à ajouter
       une fois l'attaque encaissée, exactement comme `herwick.parler`
       ou `duke.parler` chez les hôtes NPJ. */
    ...equipiers('squat'),

    /* ══ LESTER — le même G5, dans un cinquième lieu ══════════════════ */
    lester: {
      nom: 'Lester',
      regarder: ({ a }) => ({
        tous: a('loge-brulee')
          ? ['Il regarde Trash ranger ce qui peut encore l’être, sans un mot, comme s’il avait compris avant qu’on le lui explique.',
             'C’est la première fois de la nuit qu’il voit quelqu’un perdre quelque chose pour lui et ne pas s’en plaindre une seule fois.']
          : a('lester-blesse')
            ? ['Sur le fauteuil éventré, le bras contre lui, il regarde le métier à tisser transformé en autel sans comprendre ce qu’il regarde.',
               'Personne ne lui a encore expliqué ce qu’est un esprit mentor. Il n’a pas demandé non plus.']
            : ['Sur le fauteuil éventré, il regarde le métier à tisser transformé en autel sans comprendre ce qu’il regarde.',
               'Personne ne lui a encore expliqué ce qu’est un esprit mentor. Il n’a pas demandé non plus.'],
        hercules: a('loge-brulee')
          ? '« Il vient de voir un homme donner son seul bien pour un inconnu, sans qu’on le lui demande deux fois. Je crois que c’est la première leçon de la nuit qu’il retiendra. »'
          : '« Un gamin qui n’a jamais eu d’endroit à lui essaie de comprendre ce que c’est, de voir quelqu’un en avoir un et le risquer quand même. »',
        trash: compte(a) >= 3
          ? ['« Son aura a doublé depuis le bateau, et elle est tournée vers nous. »',
             '« Il a décidé quelque chose, et il ne l’a encore dit à personne. »',
             '« Ce qu’il dira à la barre, il vient de le décider ici. »']
          : compte(a) >= 1
            ? ['« Son aura est plus grande qu’au bateau. Elle est tournée vers nous, pas ouverte. »',
               '« Il est assis dans le seul endroit du monde qui soit vraiment à moi, et il ne le sait pas encore. »']
            : ['« Son aura est serrée sur elle-même, comme au bateau. »',
               '« Je lui ai ouvert ma porte. Il ne sait pas encore ce que ça veut dire, ici. »'],
        rabbit: '« Vingt ans, et il vient d’atterrir dans le seul endroit de la nuit qui n’appartient à personne d’autre qu’à celui qui l’a ouvert. »',
        drakk: '« Il compte les issues sans qu’on le lui apprenne. C’est un réflexe qu’un gamin ne devrait pas avoir à cet âge. »',
      }),
      parler: { texte: [], dialogue: 'lester' },
      utiliser: 'Non. Il a passé la nuit à être déplacé par des mains.',
      objets: {
        bouteille: ({ a }) => a('guilde')
          ? { tous: 'Elle est restée sur le voilier. Ici, personne ne boit — Trash n’a jamais rien eu à offrir de ce genre, et personne ne le lui reproche.' }
          : { tous: 'Personne ne réagit. Il n’y a rien à boire dans une loge chamanique, et ça n’étonne personne.' },
        arme: 'Non. Pas ici. Pas dans le seul endroit de la nuit qui appartient à quelqu’un qu’on aime bien.',
      },
    },

    /* ══ L'AUTEL — le sanctuaire de Raton Laveur, et le lieu de la
       vraie conversation avec Trash ═══════════════════════════════════
       Un métier à tisser récupéré, couvert d'objets chapardés à moitié
       drôles, à moitié sacrés — la signature de Trash (equipe.js) DOIT
       se dessiner comme un raton laveur, pas comme une orbe abstraite ;
       ici, c'est le décor qui porte cette promesse en attendant
       l'atelier. `parler` n'ouvre le dialogue `squat` qu'une fois
       l'attaque encaissée (`loge-brulee`) : avant, il n'y a rien à en
       tirer que Trash n'ait déjà dit dans `ouverture()`. */
    autel: {
      nom: 'L’autel de Raton Laveur',
      regarder: ({ a }) => ({
        tous: ['Un métier à tisser muet, couvert de babioles volées avec soin : une pièce de monnaie pliée en deux, trois clés qui n’ouvrent plus rien, une dent de quelque chose.',
               'Rien n’est cher. Tout est choisi.'],
        trash: '« Il aime les objets sans valeur qui ont une histoire. Ça nous ressemble, à tous les deux. »',
        drakk: '« Un autel de bric et de broc à un esprit farceur. Je respecte la cohérence. »',
        rabbit: '« Rien de connecté là-dessus. C’est le seul endroit de la nuit où je n’ai littéralement rien à pirater. »',
        hercules: '« Un noble du Tír qui prie devant une dent trouvée dans une poubelle. Il y a une leçon là-dedans que je préfère ne pas creuser trop fort. »',
      }),
      parler: ({ a, qui }) => {
        if (!a('loge-brulee'))
          return { tous: 'Rien à en tirer pour l’instant. Trash a déjà dit ce qu’il fallait dire.',
                   drakk: '« Pas maintenant. On écoute ce qui monte l’escalier, pas ce qui dort sur ce métier. »' }
        if (qui === 'trash')
          return { tous: [], trash: '« Je me parle beaucoup, à cet autel. Ce n’est pas nouveau. »' }
        return { texte: [], dialogue: 'squat' }
      },
      utiliser: {
        tous: 'Tu ne touches pas à l’autel d’un autre. Même chapardé, même à moitié en broc.',
        drakk: '« Un homme d’honneur ne pille pas le sanctuaire d’un compagnon. »',
      },
    },

    /* ══ LA MALLE — où se lit le dossier ══════════════════════════════
       Même geste, mêmes trois fiches qu'ailleurs (garde-fou § 4.2). */
    malle: {
      nom: 'Une malle de voyage, en guise de table',
      regarder: ({ a }) => ({
        tous: a('dossier-lu')
          ? ['Une malle de cuir craquelé, du genre qu’on ne fabrique plus, qui sert de table basse.',
             'Le dossier est étalé dessus, en trois tas, et personne ne l’a refermé.']
          : ['Une malle de cuir craquelé, du genre qu’on ne fabrique plus — assez grande pour y étaler quelque chose.'],
      }),
      utiliser: 'Tu t’y appuies. Elle a survécu à plus que cette nuit.',
      objets: {
        dossier: lectureDossier('sur la malle, entre un chandelier dépareillé et une pile de livres sans reliure'),
      },
    },

    /* ══ L'ÉCHELLE — réaction de Drakk ═════════════════════════════════
       Le seul accès physique : une trappe de toit, reliée à une échelle
       de secours extérieure. C'est par là que ça montera. */
    echelle: {
      nom: 'La trappe de toit, et l’échelle de secours',
      regarder: ({ a }) => ({
        tous: a('echelle-tenue')
          ? 'Barricadée avec le métier à tisser voisin, basculé en travers. Plus personne ne passe par là sans faire un bruit qu’on entendra venir.'
          : 'Une trappe de toit mal jointe, au-dessus d’une échelle de secours rouillée. C’est le seul chemin, pour qui sait qu’il existe.',
        drakk: a('echelle-tenue')
          ? '« Voilà. On ne monte pas chez quelqu’un sans qu’il l’entende. »'
          : '« Une seule porte, une seule trappe. C’est un siège qu’on peut tenir, pas une fuite qu’on peut craindre. »',
      }),
      utiliser: ({ a, qui }) => {
        if (a('echelle-tenue')) return { tous: 'Elle tient. Il n’y a rien à ajouter par-dessus.' }
        if (qui !== 'drakk')
          return { tous: 'Il faudrait quelqu’un d’assez fort pour basculer un meuble en une seule fois, sans bruit.',
                   hercules: '« Drakk. C’est pour toi, ça, pas pour nous. »' }
        return {
          tous: ['Drakk bascule le métier à tisser voisin en travers de la trappe, d’un seul geste, et cale le pied contre le mur.',
                 'Plus rien ne passe par là sans qu’on l’entende arriver de loin.'],
          drakk: '« Le mur entre vous et le ciel. Toujours. »',
          flags: ['echelle-tenue'],
          visuels: ['echelle-tenue'],
        }
      },
    },

    /* ══ LES BRANCHEMENTS — réaction de White_Rabbit ══════════════════ */
    branchements: {
      nom: 'Le branchement volé, et les trois lampes',
      regarder: ({ a }) => ({
        tous: a('loge-eteinte')
          ? 'Coupé à la source. Les trois lampes sont mortes, et la loge n’existe plus pour rien qui compte les watts.'
          : 'Un fil tiré depuis l’atelier du dessous, sans compteur, qui alimente trois lampes de fortune.',
        rabbit: a('loge-eteinte')
          ? '« Éteint. Aux yeux de qui que ce soit qui regarde une courbe de consommation, cet étage n’existe plus. »'
          : '« Il vole son électricité en direct, sans jamais dépasser ce qu’un vieux moteur de couture consommait déjà. C’est malin, et c’est traçable si on cherche vraiment. »',
      }),
      utiliser: ({ a, qui }) => {
        if (a('loge-eteinte')) return { tous: 'Coupé. Il n’y a plus rien à éteindre.' }
        if (qui !== 'rabbit')
          return { tous: 'Il faudrait savoir quel fil couper sans tout faire sauter.',
                   hercules: '« C’est son rayon. Toujours. »' }
        return {
          tous: ['White_Rabbit suit le fil volé jusqu’à son point d’origine et le débranche à la main, sans un arc électrique.',
                 'Les trois lampes meurent d’un coup. La loge devient une pièce parmi d’autres, dans le noir.'],
          rabbit: '« Voilà. Plus une seule raison technique de savoir que quelqu’un vit ici. »',
          flags: ['loge-eteinte'],
          visuels: ['loge-eteinte'],
        }
      },
    },

    /* ══ LE PALIER — réaction d'Hercules ═══════════════════════════════
       Descendre à la rencontre plutôt qu'attendre : le seul des trois
       gestes qui sort de la loge, un étage plus bas. */
    palier: {
      nom: 'Le palier, un étage plus bas',
      regarder: ({ a }) => ({
        tous: a('palier-tenu')
          ? 'Vide, maintenant. Hercules y a passé un moment, et il en est redescendu — ou remonté, c’est selon d’où on regarde.'
          : 'L’escalier de service qui dessert l’atelier fermé, et rien d’autre. Personne ne devrait avoir de raison d’y monter à cette heure.',
        hercules: a('palier-tenu')
          ? '« On ne surprend pas quelqu’un qui vous attend déjà en bas des marches, tout sourire, comme si vous étiez venu lui vendre quelque chose. »'
          : '« Si quelqu’un monte, autant l’accueillir avant qu’il choisisse lui-même comment entrer. »',
      }),
      utiliser: ({ a, qui }) => {
        if (a('palier-tenu')) return { tous: 'C’est fait. Redescendre une seconde fois n’ajouterait rien.' }
        if (qui !== 'hercules')
          return { tous: 'Il faudrait une voix capable de faire hésiter un inconnu armé, le temps d’une phrase.',
                   trash: '« Ce n’est pas mon registre. Le sien, si. »' }
        return {
          tous: ['Hercules descend seul, remet sa veste correctement, et s’installe sur la première marche comme s’il attendait un rendez-vous d’affaires.',
                 'Ce n’est pas du courage. C’est un tarif : mieux vaut choisir où la conversation commence que la subir chez soi.'],
          hercules: '« Si quelqu’un doit me trouver, autant que ce soit moi qui décide où. »',
          flags: ['palier-tenu'],
          visuels: ['palier-tenu'],
        }
      },
    },

    /* ══ LE DÉCOR AMBIANT ══════════════════════════════════════════════ */
    miroir: {
      nom: 'Un miroir piqué de rouille',
      regarder: {
        tous: 'Le tain s’écaille en dentelle sur les bords, mais le cadre est doré à la feuille, et personne n’a jamais retiré la feuille pour la revendre.',
        hercules: '« Il pourrait vendre ce cadre et manger un mois. Il ne l’a jamais fait. Ce n’est pas de la naïveté, c’est un principe, et je le respecte sans le comprendre. »',
        trash: '« On peut tout perdre, sauf son raffinement. Celui-là, je l’ai gardé en entier. »',
      },
      utiliser: 'Tu ne touches pas au seul luxe que Trash se soit gardé.',
    },

    fauteuil: {
      nom: 'Un fauteuil Second Empire, éventré',
      regarder: {
        tous: 'La soie est fendue jusqu’au crin, mais les pieds sculptés ont survécu à trois déménagements forcés.',
        drakk: '« Un trône qui a connu de meilleurs jours et une meilleure cour. J’aime son entêtement à rester un trône quand même. »',
      },
      utiliser: 'Il ne tiendra pas un poids de plus que celui qui s’y trouve déjà.',
    },

    /* ══ LA SORTIE — le verrou du tableau ═════════════════════════════
       Le tir part TOUJOURS (garde-fou § 4.5). `loge-brulee` tombe au
       premier passage, quoi qu'il arrive — la loge est compromise dès
       qu'elle est trouvée. `trash-trace` ne tombe qu'en dessous de deux
       réactions prises : au-delà, l'intrus reparti à vide n'apprend
       rien de plus qu'une adresse déjà grillée. */
    porte: {
      nom: 'La trappe, refermée derrière vous',
      sortie: 'tribunal',
      regarder: {
        tous: ['La trappe par laquelle vous êtes montés. Le tribunal est à vingt minutes, en coupant par les toits puis la rue.',
               'Il est un peu plus de cinq heures. On peut partir quand on veut, et c’est le problème : il faut savoir quand.'],
        rabbit: '« Aucune caméra sur ce toit. C’est bien pour ça qu’il vit ici, et bien pour ça qu’on peut sortir sans laisser de trace de plus. »',
      },
      utiliser: ({ a }) => {
        if (!a('loge-brulee')) {
          const n = prises(a)
          const commun = [
            { texte: 'Trash se redresse d’un coup, la tête tournée vers la trappe.',
              visuel: 'loge-alerte' },
            'Ça monte. Vite, et sans plus se cacher — ce n’est plus un préavis, c’est une seconde.',
          ]
          if (n >= 2)
            return { tous: [...commun,
                            { texte: 'Un choc contre la trappe, un juron étouffé, et plus rien. Quelqu’un vient de découvrir qu’on l’attendait.',
                              visuel: 'loge-brulee' },
                            'Un coup de feu part quand même, dans le bois de la trappe, à hauteur de rien du tout. Il ne touche personne.',
                            'Le silence qui suit dure longtemps. Personne ne redescend vérifier qui c’était.'],
                     drakk: '« Il n’avait plus de porte à forcer. Il a tiré pour dire qu’il était venu, pas pour toucher quelqu’un. »',
                     trash: '« Ils savent, maintenant. Ils savaient déjà, en fait. Ils viennent de le confirmer eux-mêmes. »',
                     flags: ['loge-brulee'],
                     fiches: ['tir-squat'] }
          return { tous: [...commun,
                          'La trappe cède plus vite qu’elle n’aurait dû. Une silhouette passe la tête, arme haute, et trouve la pièce éclairée, pleine, et prête.',
                          { texte: 'Le coup part avant que quiconque ait pu bouger. Trash pivote sur lui-même, la manche ouverte à l’avant-bras, et ne tombe pas.',
                            visuel: 'loge-brulee' },
                          '« C’est rien », dit-il, ce qui est faux, et personne ne le corrige.',
                          'L’intrus ne redescend pas comme prévu : il redescend en courant, sans avoir eu le temps de rien regarder — et c’est bien le problème.'],
                   hercules: '« Il a eu le temps de voir un visage avant de repartir. Ça, ça ne s’efface pas d’un coup de feu manqué. »',
                   trash: '« Ce n’est pas la loge qu’on a trouvée. C’est moi. »',
                   flags: ['loge-brulee', 'trash-trace'],
                   fiches: ['tir-squat'] }
        }

        const c = compte(a)
        const commun = ['Trash ouvre lui-même la trappe, sans un mot, et vous fait passer un par un sur le toit voisin.',
                        'Lester passe devant lui sans savoir quoi dire, et ne dit rien.']
        return c >= 3
          ? { tous: [...commun,
                     '« Bon. »',
                     '« Je vais leur dire. Pas ce qu’ils veulent entendre — ce qui s’est passé. »',
                     'Il regarde une dernière fois la trappe, et l’homme qui vient de perdre le seul endroit qui était à lui.',
                     '« S’ils demandent qui m’a protégé cette nuit, je dirai la vérité. Toute la vérité, pas juste la partie qui vous arrange. »'],
              hercules: '« Voilà quelqu’un qui vient de décider quelque chose tout seul. C’est plus rare que ça n’en a l’air. »',
              flags: ['lester-temoigne'], fiches: ['lester-temoigne'], va: 'tribunal' }
          : { tous: [...commun,
                     'Il ne dit rien. Il sort le premier, la tête basse.',
                     'Il ira au tribunal. Il sera vivant à dix heures. C’était le contrat.',
                     'Ce qu’il dira à la barre, personne ici ne le sait — et lui non plus.'],
              trash: '« On l’a assis dans le seul endroit qui était à moi, et on ne lui a pas parlé. On l’a juste transporté, un étage plus haut. »',
              va: 'tribunal' }
      },
    },
  },

  dialogues: {

    /* ══ LESTER — le même G5, repris une quatrième fois ═══════════════
       Trois sujets ouverts à tout le monde, quatre paient des chaînes
       plantées ailleurs dans la nuit, un septième — `conf-trash` — ne
       s'ouvre que dans ce décor. Il en faut TROIS sur sept. */
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
          texte: ['Personne ne parle. Quelque part sous le toit, un pigeon se déplace sur une tôle, et c’est tout le bruit qu’il y a.',
                  '« Ils m’ont posé la même question pendant trois jours. »',
                  '« Chaque fois que je répondais pas, ils écrivaient quelque chose. »',
                  '« Vous, vous écrivez rien. C’est bizarre. »'],
        },
        {
          id: 'question',
          titre: '« Pose-la, ta question. »',
          quand: ({ a }) => a('conf-job') && !a('conf-question'),
          flags: ['conf-question'],
          texte: ['« Pourquoi ici ? C’est chez qui, vraiment ? »',
                  '« Pourquoi un type qu’a jamais rien à lui te donne le seul endroit qu’il a ? »',
                  'La vraie réponse tient en un mot, Trash. On la lui donne.',
                  '« … D’accord. Au moins c’est une réponse. »'],
        },
        {
          id: 'teresa',
          titre: '« Teresa Banks. Tu la connaissais ? »',
          quand: ({ a }) => a('sait-teresa') && !a('conf-teresa'),
          flags: ['conf-teresa'],
          texte: ['Long silence. Le pigeon se déplace encore, quelque part au-dessus.',
                  '« Elle dormait deux étages au-dessus. Elle descendait fumer parce qu’en haut ça tirait. »',
                  '« On s’est parlé quatre fois. Peut-être cinq. »',
                  '« Personne m’a demandé ça non plus. Ils m’ont demandé où j’étais. Jamais qui elle était. »'],
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
        /* CE QUE PERDRE LA LOGE LUI APPREND SANS UN MOT — propre à ce
           décor (garde-fou § 4.3 du plan). Gardé par `loge-brulee`. */
        {
          id: 'trash-confiance',
          titre: '« Il vient de perdre le seul endroit qu’il avait. Pour toi. »',
          quand: ({ a }) => a('loge-brulee') && !a('conf-trash'),
          flags: ['conf-trash'],
          texte: ['Il regarde Trash ranger ce qui peut encore l’être, sans se presser, sans se plaindre.',
                  '« Il pourrait m’en vouloir. »',
                  '« … Il m’en veut pas. »',
                  '« C’est la première fois qu’on me donne quelque chose sans me faire sentir que je le devais. »'],
        },
        {
          id: 'assez',
          titre: '(Le laisser tranquille.)',
          fin: true,
          texte: ['Il regarde la trappe, ou ce qui vient de s’y passer.'],
        },
      ],
    },

    /* ══ SQUAT — la vraie conversation, une fois l'attaque encaissée ═══
       Ouvert par `autel.parler` tant que `loge-brulee` n'est pas posé,
       jamais avant : « on trouve Trash, pas la loge » (§3.4 du plan)
       n'a de sens à raconter qu'une fois que la loge a été trouvée. Le
       gain propre à ce décor (garde-fou § 4.3) : Chimera a quelqu'un
       qui voit comme Trash. */
    squat: {
      qui: 'trash',
      accueil: ['Il continue de ranger ce qui peut l’être, sans lever les yeux.',
                '« Demandez. Je sais ce que vous allez demander. »'],
      retour: ['« Toujours la même question, ou une nouvelle ? »'],
      sujets: [
        {
          id: 'comment',
          titre: '« Comment ils t’ont trouvé, si tu n’as ni bail ni SIN ? »',
          fin: true,
          flags: ['trash-repere'],
          fiches: ['trash-repere'],
          texte: ['« Je ne dors nulle part sans laisser une trace, à l’astral. Ce soir, j’en ai laissé plus que d’habitude. »',
                  '« Le bateau. Le greffe. À chaque fois, quelque chose qui me ressemble reste un peu, quelque part. »',
                  '« Quelqu’un qui voit comme moi a suivi ces traces jusqu’ici. Chimera a un chaman sur sa liste de paie, ou pire. »',
                  '« Ce n’est pas mon adresse qu’ils ont trouvée. C’est ma signature. »'],
        },
        {
          id: 'desole',
          titre: '(Rien à dire. Juste rester.)',
          fin: true,
          texte: ['Personne ne dit rien. Trash finit de ranger, et ça suffit comme réponse.'],
        },
      ],
    },
  },
}
