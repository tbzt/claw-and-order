/* ============================================================
   TABLEAU 8 — LE LOCAL DE RÉPÉTITION. Les amis de Teresa Banks.
   Trois jours après la récusation, un matin, à Loveland.

   CHANTIER 28 — `PLAN_TRAME_ACTES_III_IV.md` § 7.3, RANG 5 DU § 10 :
   « le plus proche de la thèse, donc le premier de l'acte IV — pas le
   dernier ». C'est le premier tableau du jeu qui ne se joue pas la nuit
   du contrat, et le premier où Lester n'est pas dans la pièce : l'équipe
   ne le transporte plus, elle travaille POUR lui.

   ══ CE TABLEAU OUVRE L'ACTE IV, ET IL EN PAIE LE PRIX ════════════════
   L'abordage (chantier de rang 4) retombait sur `fin: true` avec une
   note explicite dans `retour.js` : « quand l'acte IV aura un lieu où
   atterrir, cette fin se change en `va: '<hub-acte-iv>'` ». C'est fait,
   et ça coûte une chose que le rang 4 ne pouvait pas payer seul :
   `etat.tour` (D8, § 3 du plan). L'acte IV dure plusieurs jours ;
   afficher `09:12` au HUD dans cette pièce aurait été un mensonge lisible
   à l'écran. Le tableau porte donc `acte: 4`, et le moteur bascule
   l'horloge en « jour 1 — matin » à l'entrée. Voir `state.js`.

   ══ LE SECOND VERROU-MANIFESTE (§ 7.3) ══════════════════════════════
   > « G5 ne s'ouvre qu'en parlant : c'est le verrou-manifeste du jeu,
   > celui qui dit qu'un gamin terrifié n'est pas une serrure. »
   > — `CONCEPTION.md` § 7

   Quatre amis rejouent cette leçon en quatre variantes, et AUCUNE des
   quatre n'est gardée par un drapeau venu d'un tableau antérieur. C'est
   le point de doctrine du chantier : G5 ne dépend d'aucune chaîne
   (règle 19), et ses quatre petits frères non plus. Tout ce qui décide
   ici se décide ICI, dans cette pièce, ce matin-là.

     MARK   il sait le prénom et il le garde par loyauté. Il ne
            s'achète pas, il se convainc — donc on l'obtient en parlant
            d'ELLE et jamais de l'autre. Le créditube tendu à Mark pose
            `mark-ferme`, définitivement : c'est le `conf-perdue` de ce
            tableau, la même faute au même prix.
     PSYCH  il parle contre un peu d'argent, et ça MARCHE (§ 7.3 : « la
            tentation vénale revient ici, et elle a un goût amer »).
            L'amertume n'est pas une punition : c'est qu'il aurait parlé
            gratuitement à qui l'aurait interrogé sur la musique — le
            sujet `chantait` est ouvert dès la première seconde, et il
            donne la même fiche. On ne s'en veut qu'après, et seulement
            si on a payé d'abord. C'est exactement ce que le plan
            demandait, et ce n'est pas jouable autrement.
     NOVA   elle a été interrogée par les runners du Tír et ne le dit
            pas spontanément. Deux raisons de faire confiance, et deux
            seulement : avoir LU la carte qu'ils ont laissée (`carte-vue`,
            au comptoir), ou porter un nom de gang qu'elle reconnaît —
            Duke, et c'est White_Rabbit qui le porte (sujet à `acteur`,
            visible-mais-verrouillé pour les trois autres, chantier 38).
     NITA   elle donne, mais elle veut savoir pour qui. Deux sujets
            mutuellement exclusifs : la vérité (`nita-parle`) ou
            l'esquive (`nita-ferme`), et l'esquive ne se rattrape pas.
            C'est la seule des quatre serrures où le mauvais geste est
            de ne rien dire.

   ══ CE QUE LA PIÈCE REND, ET CE QU'ELLE NE REND PAS ═════════════════
   Quatre fiches (§ 7.1), et la déduction `su:hayden` qui n'en demande
   que DEUX — `prenom-mal-ecrit` (Mark) et `gros-ponte-telestrian`
   (Nita). Psych et Nova portent les deux autres fils, qui partent
   ailleurs : le studio de Waters (rang 8) et le front du Tír (§ 7.4).
   Conséquence assumée, et vérifiée : le nom se trouve sans le créditube
   (que le pêcheur peut avoir emporté au tableau 2) et sans White_Rabbit
   — règle 17, perdre coûte un état, jamais la partie.

   ══ LE COÛT QUI TOMBE TOUJOURS (§ 7.4) ══════════════════════════════
   « Le voisinage préviendra l'équipe du Tír de quiconque pose des
   questions — ils ont laissé leur carte. » `tir-prevenu` tombe au
   PREMIER `parler` adressé à l'un des quatre, quoi qu'on dise et quel
   que soit le résultat : ce n'est pas un choix, c'est le quartier. Même
   grammaire que `hercules-demasque` au tripot ou que le tir de 8 h 40
   aux quatre planques (garde-fou § 4.5 de `PLAN_PLANQUES.md`) — chercher
   vite, c'est chercher bruyamment, et il n'y a pas de version discrète.
   Ce qu'il coûtera se paiera au studio et à la 2ᵉ audience ; ici il se
   VOIT (le présage, en sortant) et il se RELIT (le bilan).

   ══ CE QUE CE TABLEAU NE FAIT PAS ═══════════════════════════════════
   Il ne construit pas le hub de l'acte IV : il n'y a qu'un lieu, donc
   pas de carrefour à dessiner (D11 — pas de nœuds de carte tant que
   l'acte IV n'existe pas ; il commence à exister avec ce fichier). Il
   ne construit pas non plus le compteur d'exposition de D9. La sortie
   retombe donc sur `fin: true`, avec la même honnêteté que `retour.js`
   avant lui : quand l'appartement (26) et le Shameless (27) existeront,
   c'est ici que la carte reprendra la main. */

import { equipiers } from './equipiers.js'

export const amis = {
  markup: 'scenes/amis.html',

  /* L'acte IV compte en tours, pas en minutes (D8). Le moteur lit ce
     champ dans `charge()` : c'est le seul endroit du jeu qui déclare
     appartenir à l'acte IV, et il suffit. */
  acte: 4,

  ouverture: ({ a }) => [
    'Trois jours que l’audience est repoussée. En trois jours, le nom de Teresa Banks n’est apparu dans aucun journal, sur aucun fil, dans aucune conversation qui ne soit pas la vôtre.',
    'Le local est un ancien magasin de disques dont le rideau de fer ne redescend plus. Deux amplis, une batterie à qui il manque la caisse claire, et des bacs encore pleins d’un stock que personne n’a racheté.',
    'Quatre personnes sont là dedans à dix heures du matin. Aucune n’a d’autre endroit où porter ça.',
    a('lester-temoigne')
      ? 'Lester est à McNeil, et il attend une seconde audience en sachant déjà ce qu’il va dire. C’est la première fois de l’affaire que vous travaillez sans l’avoir sur les bras.'
      : 'Lester est à McNeil, sous clé, en attendant une seconde audience. C’est la première fois de l’affaire que vous travaillez sans l’avoir sur les bras.',
    'OBJECTIF — repartir avec un nom. Quatre personnes l’ont connue, et aucune ne vous doit quoi que ce soit.',
  ],

  /* PAS D'`entree()` ICI, ET C'EST UNE DIFFÉRENCE DE FORME AVEC LES
     CINQ PLANQUES. `entree()` ne tourne qu'au `charge()` : elle sert à
     un décor qui doit s'ouvrir en portant les conséquences d'un choix
     pris DEUX TABLEAUX PLUS TÔT. Ici, tout ce qui change se décide
     pendant la visite — et ce tableau ne se visite qu'une fois. Un état
     posé dans `entree()` n'y serait donc jamais affiché : trouvé en
     jouant, `nom-trouve` ne s'allumait pas au moment précis où le
     recoupement tombait.

     `derive()`, lui, est recalculé à chaque `rafraichit()` (main.js) :
     c'est le bon outil pour un décor qui change SOUS les yeux du
     joueur. Les cinq marqueurs d'état passent donc par là, et la règle
     du playtest du 2026-08-22 est tenue — « un état qui change doit
     pouvoir se relire ». */
  derive: ({ a, sait }) => {
    const rendus = ['prenom-mal-ecrit', 'gros-ponte-telestrian',
                    'enregistrement-waters', 'elfes-du-tir'].filter(sait).length
    return [
      rendus === 0 ? 'local-muet' : rendus < 3 ? 'local-entrouvert' : 'local-ouvert',
      ...(a('su:hayden') ? ['nom-trouve'] : []),
      ...(a('carte-vue') ? ['carte-vue'] : []),
      ...(a('mark-ferme') ? ['mark-ferme'] : []),
      ...(a('nita-ferme') ? ['nita-ferme'] : []),
      ...(a('tir-prevenu') ? ['tir-prevenu'] : []),
    ]
  },

  vues: {
    physique: [
      'Quatre personnes, quatre façons de ne pas être ailleurs. Aucune ne s’est levée quand vous êtes entrés, et aucune ne vous a quittés des yeux.',
      '« Personne ici n’a intérêt à nous parler, et personne ici n’a envie qu’on s’en aille. C’est la meilleure position de départ que j’aie eue de la semaine. »',
    ],
    astrale: [
      'La pièce est saturée. Pas de la fille — de ce que quatre personnes ont laissé dedans à force d’y revenir sans savoir quoi y faire.',
      '« C’est un deuil qui n’a pas de place où aller, alors il reste ici. Chez moi on appelait ça une veillée. Elle dure depuis trois jours. »',
    ],
    ra: [
      'Aucun tag commercial, aucune balise. Un seul objet émet dans cette pièce, et c’est une carte de visite posée sur un comptoir.',
      '« Le local est mort côté réseau. Sauf un truc, là-bas, qui attend qu’on le lise. Ce n’est jamais un hasard, un objet qui attend. »',
    ],
    tactique: [
      'Une seule ouverture, le rideau de fer. Pas de seconde issue, pas de fenêtre — un ancien magasin, c’est fait pour qu’on entre par devant.',
      '« Un donjon à une porte. Ce n’est pas dangereux tant que personne ne sait qu’on y est. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('amis'),

    /* ══ MARK — « il ne s'achète pas, il se convainc » ════════════════
       Le petit frère de G5. La règle de son verrou tient en une ligne :
       il répond aux questions sur ELLE, jamais à celles sur l'autre, et
       le prénom ne vient qu'après. Aucune garde extérieure. */
    mark: {
      nom: 'Mark',
      regarder: ({ a }) => ({
        tous: a('mark-ferme')
          ? ['Il tient toujours la pochette de disque vide, et il la tient maintenant entre vous et lui.',
             'Dix-neuf ans, et il vient d’apprendre en une seconde à quoi ressemble quelqu’un qui met un prix sur elle.']
          : a('mark-convaincu')
            ? ['Assis sur l’ampli, une pochette de disque vide entre les mains. Il n’a pas arrêté de parler d’elle depuis qu’on a commencé, et il n’a pas l’air d’avoir fini.',
               'C’est le seul de la pièce qui la conjugue encore au présent de temps en temps, et qui se reprend chaque fois.']
            : ['Assis sur l’ampli, dix-neuf ans, une pochette de disque vide entre les mains. Il la tient comme on tient quelque chose qui n’a plus de contenu.',
               'Il vous a regardés entrer sans bouger. Ce n’est pas du courage : il n’a simplement nulle part où aller.'],
        hercules: a('mark-ferme')
          ? '« J’ai fait ça pendant trente ans et je viens de le rater sur un gamin de dix-neuf ans. Il n’avait pas de prix, et je lui en ai demandé un. »'
          : '« Il n’a rien à vendre et il le sait. Ce sont les seuls à qui je n’ai jamais rien pu acheter. »',
        trash: '« Son aura est entière et elle penche toute d’un côté. Il est amoureux de quelqu’un qui n’est plus là pour le savoir, et il compte le rester. »',
        rabbit: '« Zéro empreinte. Pas de profil, pas de fil, rien. À dix-neuf ans, en 2081, ça veut dire qu’il vit dans une seule pièce et qu’il n’en sort pas. »',
        drakk: '« Le jeune homme qui garde la relique et ne dit pas qu’il l’a. J’ai écrit ce personnage. Je ne pensais pas le rencontrer. »',
      }),
      parler: ({ a }) => a('mark-ferme')
        ? { tous: 'Il ne lève pas les yeux. La conversation est finie depuis qu’elle a eu un prix.',
            hercules: '« Non. Celle-là, je l’ai fermée moi-même. »' }
        : { texte: [], dialogue: 'mark', flags: ['tir-prevenu'] },
      utiliser: 'Non. C’est un gamin assis sur un ampli, pas une porte.',
      objets: {
        /* LA MÊME FAUTE QU'À LA PLANQUE, AU MÊME PRIX. `conf-perdue`
           coûte deux points de confiance à Lester ; ici, ça coûte la
           moitié d'un nom. Irrécupérable, et c'est le sujet du jeu. */
        creditube: ({ a }) => a('mark-ferme')
          ? { tous: 'Il l’a déjà vu. Une fois suffit largement.' }
          : { tous: ['Tu poses le créditube sur l’ampli, à côté de lui. Deux mille, et personne n’a besoin de dire pour quoi.',
                     'Il le regarde longtemps. Puis il regarde la pochette vide entre ses mains, et il comprend qu’on vient de mettre les deux sur la même table.',
                     ['mark', '« … Vous êtes venus l’acheter, elle. »'],
                     'Il ne crie pas. Il se lève, il va s’asseoir plus loin, et c’est fini.'],
              hercules: '« Reprends ça. Reprends ça tout de suite. »',
              trash: '« Non. Non, non — ce n’est pas ce qu’on—. » Il n’a pas fini sa phrase que le gamin est déjà debout.',
              rabbit: '« … Je viens de faire exactement ce que je déteste qu’on me fasse. »',
              drakk: '« On n’achète pas un serment. On ne fait que le briser plus vite. »',
              flags: ['mark-ferme'] },
        bouteille: 'Il a dix-neuf ans et il n’a pas dormi depuis trois jours. Ce serait la pire idée de la matinée.',
        arme: 'Non. Pas sur lui, pas devant lui, pas aujourd’hui.',
      },
    },

    /* ══ PSYCH — la tentation vénale, et son goût amer ═══════════════
       DEUX ROUTES VERS LA MÊME FICHE, et c'est tout le dispositif : le
       créditube (immédiat, évident, efficace) et le sujet `chantait`
       (gratuit, ouvert dès la première seconde, à condition de poser une
       question sur elle plutôt que sur ce qu'on cherche). Payer marche.
       C'est en repartant qu'on apprend que ce n'était pas nécessaire. */
    psych: {
      nom: 'Psych',
      regarder: ({ a }) => ({
        tous: a('psych-paye') || a('psych-ecoute')
          ? ['Allongé par terre entre les deux amplis, les mains derrière la tête, il a rouvert les yeux au milieu de sa propre phrase et il l’a reprise au même mot.',
             'Il parle de la troisième prise comme d’un endroit où il habiterait encore.']
          : ['Allongé par terre entre les deux amplis, un bras sur les yeux. Il n’a pas bougé depuis que vous êtes entrés, et il n’a pas dormi non plus.',
             'Il a l’âge qu’on veut lui donner. Ce n’est pas un compliment.'],
        hercules: '« Il a un prix, il le dit lui-même, et il est bas. Ça devrait m’arranger, et pour une fois ça ne m’arrange pas du tout. »',
        trash: a('psych-paye')
          ? '« Son aura s’est allumée quand il a parlé d’elle, pas quand il a pris l’argent. On s’est trompés d’entrée. »'
          : '« Il y a un trou dans son aura, à l’endroit exact où on met ce qu’on prend. Et le reste tient debout. Le reste tient même très bien. »',
        rabbit: '« Trois cliniques de désintox dans son historique, toutes payées par la même association. Quelqu’un a essayé, plusieurs fois. »',
        drakk: '« Le barde. Toujours le plus abîmé de la compagnie, et toujours celui qui se souvient de la chanson exacte. »',
      }),
      parler: { texte: [], dialogue: 'psych', flags: ['tir-prevenu'] },
      utiliser: 'On ne secoue pas quelqu’un qui vous parle déjà.',
      objets: {
        creditube: ({ a }) => a('psych-paye') || a('psych-ecoute')
          ? { tous: 'Il a déjà dit ce qu’il savait. Lui donner ça maintenant ne serait plus un achat — ce serait autre chose, et personne dans la pièce n’a envie de savoir quoi.' }
          : { tous: ['Le créditube change de main sans que personne ait eu à formuler la question. C’est la transaction la plus propre de toute l’affaire.',
                     ['psych', '« Waters. Reginald Waters, studio à Puyallup. Quatre titres, elle en a fait quatre. »'],
                     ['psych', '« Il garde tout. Les prises ratées aussi. Elle parlait, entre les prises. »'],
                     'Il l’a dit en huit secondes. Il n’a pas hésité, il n’a pas négocié, il n’a même pas eu l’air de trouver ça désagréable.',
                     ['psych', '« … Vous êtes les premiers à venir pour elle. Les autres, ils venaient pour la bande. »'],
                     'Ça, il l’a dit gratuitement.'],
              hercules: '« Deux mille pour huit secondes. C’est le meilleur tarif de ma carrière et je n’en suis pas fier une seconde. »',
              trash: '« Il aurait parlé sans ça. Je le sais parce que je l’ai vu s’allumer en la nommant, pas en prenant le tube. »',
              rabbit: '« Transaction conclue. Aucune contrepartie exigée, aucune condition. C’est le contraire d’une négociation : c’est quelqu’un qui n’a jamais appris à en avoir une. »',
              drakk: '« Nous avons payé pour une chose qui nous était offerte. C’est une manière de voler à l’envers. »',
              retire: ['creditube'],
              flags: ['psych-paye'],
              fiches: ['enregistrement-waters'] },
        bouteille: 'Non. Il y a des endroits où ça ne se fait pas, et celui-ci en est un.',
        arme: 'Non.',
      },
    },

    /* ══ NOVA — « il faut lui donner une raison de faire confiance » ══
       Deux raisons possibles, jamais gratuites : la carte lue au
       comptoir, ou un nom de gang porté par la seule personne de
       l'équipe qui l'a gagné (White_Rabbit, chez Duke). Le sujet à
       `acteur` reste VISIBLE pour les trois autres et se refuse dans
       leur voix — chantier 38. */
    nova: {
      nom: 'Nova',
      regarder: ({ a }) => ({
        tous: a('nova-parle')
          ? ['Adossée au montant du rideau de fer, à l’endroit exact où elle se mettait quand le groupe jouait. Elle tient encore la porte de quelque chose qui n’existe plus.',
             'Depuis qu’elle a parlé, elle regarde la rue au lieu de vous regarder, vous.']
          : ['Une orke d’une vingtaine d’années, adossée au montant du rideau de fer. Elle s’est placée entre vous et la sortie sans en avoir l’air, et elle l’a fait par réflexe.',
             'Elle vous a comptés en entrant. Quatre. Elle n’a pas eu besoin de regarder deux fois.'],
        hercules: '« Elle tient la porte d’un local vide. Ça ne s’apprend pas, ça se garde — elle a fait ça pour de vrai, ailleurs, et pas il y a longtemps. »',
        trash: '« Elle est en rupture avec quelque chose. Je reconnais la forme que ça donne à une aura : c’est la mienne, en plus récent. »',
        rabbit: a('dette-duke') || a('conf-duke') || a('choix-duke')
          ? '« Halloweener, deux ans, sortie propre — ce qui n’existe pas. Sauf si quelqu’un a couvert la sortie. Je connais un type qui fait ça. »'
          : '« Halloweener, deux ans, et plus rien depuis quatorze mois. On ne sort pas de là en s’en allant. »',
        drakk: '« La garde du corps qui n’a plus de corps à garder. Elle n’a pas déposé les armes : personne ne lui a dit que la quête était finie. »',
      }),
      parler: { texte: [], dialogue: 'nova', flags: ['tir-prevenu'] },
      utiliser: 'Non. Elle est adossée à la seule sortie de la pièce, et elle le sait mieux que vous.',
      objets: {
        creditube: ({ a }) => a('nova-parle')
          ? { tous: 'Elle regarde le tube, puis vous. « Gardez ça pour des gens qui n’ont rien dit. »' }
          : { tous: ['Elle ne le prend pas. Elle ne le repousse pas non plus : elle le laisse tendu dans le vide assez longtemps pour que ça devienne inconfortable.',
                     ['nova', '« Les autres aussi ils ont commencé par ça. Eux, ils étaient polis en plus. »']],
              hercules: '« … D’accord. On efface celle-là. »',
              drakk: '« Nous venons de nous faire comparer à l’ennemi. C’est mérité. »' },
        arme: 'Non. Elle en a vu de plus près que vous ne croyez.',
      },
    },

    /* ══ NITA — « elle donne, mais elle veut savoir pour qui » ════════
       La seule des quatre où le mauvais geste est de ne RIEN dire.
       L'esquive ferme définitivement ; la vérité — un flic de la Star
       qui paie de sa poche la défense d'un ork — est exactement ce
       qu'une militante de l'ORC ne peut pas laisser passer. */
    nita: {
      nom: 'Nita',
      regarder: ({ a }) => ({
        tous: a('nita-ferme')
          ? ['Elle s’est remise à trier les affiches du mur, méthodiquement, et elle ne s’arrêtera plus. Elle a posé une question et elle n’a pas eu de réponse ; pour elle, c’en était une.',
             'Un fétiche d’ours pend à sa ceinture, côté mur. Elle l’a tourné de l’autre côté quand vous avez esquivé.']
          : ['Debout près du mur d’affiches, une pile de tracts sous le bras — la seule de la pièce qui soit venue ce matin pour faire quelque chose plutôt que pour être quelque part.',
             'Un fétiche d’ours à la ceinture, usé jusqu’au poil. Elle vous a jaugés en trois secondes et elle n’a pas caché qu’elle le faisait.'],
        hercules: '« Elle a une question à poser et elle attend de la poser. Je fais le même métier qu’elle avec moins de conviction, alors je vais la laisser commencer. »',
        trash: a('orc-contact')
          ? '« Une chamane de l’Ours dans une permanence associative. Elle fait avec son don ce que ma famille m’a appris à en faire : rien pour soi. »'
          : '« Éveillée. Ours — c’est le totem des gens qui protègent, et c’est le seul que personne ne prend par ambition. Elle sait que je l’ai vue. »',
        rabbit: '« Permanente ORC, dix ans de dossiers publics, zéro condamnation, quatorze plaintes déposées contre la Lone Star. C’est une carrière, ça. »',
        drakk: '« La prêtresse. Elle demandera pour quel dieu on se bat avant de nous soigner, et elle aura raison de demander. »',
      }),
      parler: { texte: [], dialogue: 'nita', flags: ['tir-prevenu'] },
      utiliser: 'Non.',
      objets: {
        creditube: ({ a }) => a('nita-ferme')
          ? { tous: 'Elle ne le regarde même pas. Le sujet a été tranché il y a une minute.' }
          : { tous: ['« Non », dit-elle avant que le tube soit sorti. « Ça, c’est comme ça qu’on achète le silence. Moi je vends le contraire, et je le donne. »'],
              hercules: '« … Elle a raison, en plus. C’est vexant. »' },
        arme: 'Non. Elle a passé dix ans à écrire des plaintes contre des gens qui font ça.',
      },
    },

    /* ══ LE MICRO — ce que le tableau a de plus cher, et il ne rend
       aucune fiche ═══════════════════════════════════════════════════
       Une cible qui ne sert à rien mécaniquement et sans laquelle le
       reste ne pèse pas. C'est ici que la pièce dit de qui on parle. */
    micro: {
      nom: 'Le micro',
      regarder: {
        tous: ['Un pied de micro au milieu de la pièce, le micro encore dessus, le câble encore branché. Personne ne l’a rangé.',
               'Il y a un morceau de gaffer sur le pied, à hauteur de main, avec une hauteur notée au feutre. C’est sa hauteur à elle.'],
        hercules: '« Personne ne l’a touché en trois jours. Dans une pièce où quatre personnes dorment. Ça vous dit tout ce qu’il faut savoir sur elle et sur eux. »',
        trash: ['« C’est le seul objet de la pièce qui n’a pas de deuil dessus. »',
                '« Il a gardé autre chose. Je ne vais pas vous dire quoi, ce n’est pas à moi. »'],
        rabbit: '« Micro dynamique, quarante ans d’âge, réparé trois fois à la main. Personne n’a chanté là-dedans avec un correcteur de voix. »',
        drakk: '« On ne déplace pas l’épée du compagnon tombé. On la laisse là où elle est tombée, et on continue de s’asseoir autour. »',
      },
      utiliser: {
        tous: ['Tu tends la main vers le pied de micro, et quatre personnes tournent la tête en même temps sans qu’aucune n’ait dit un mot.',
               'Tu la retires.'],
        drakk: '« Non. Pas celui-là. »',
      },
    },

    /* ══ LE MUR D'AFFICHES — le lieu, et ce qu'il était ══════════════ */
    mur: {
      nom: 'Le mur d’affiches',
      regarder: ({ a }) => ({
        tous: ['Quinze ans d’affiches de concerts collées les unes sur les autres, et par-dessus, punaisées à plat, une trentaine de photos.',
               a('mark-convaincu')
                 ? 'Elle est sur onze d’entre elles. Mark a compté — il vous l’a dit sans qu’on le lui demande.'
                 : 'Elle est sur onze d’entre elles. Quelqu’un les a rassemblées au même endroit du mur, récemment.'],
        hercules: '« Un local de répétition qui affiche encore les groupes du quartier. Il n’y en a plus beaucoup à Loveland. Il n’y en a peut-être plus qu’un. »',
        trash: '« Il y a des mains partout sur ce mur, en couches. C’est un des rares endroits de cette ville où plusieurs générations ont touché la même chose sans se battre. »',
        rabbit: '« Aucune de ces affiches n’a de code. Elles annoncent des dates qu’il fallait connaître pour savoir qu’elles existaient. »',
        drakk: '« La tapisserie de la salle commune. On y lit toute l’histoire de la maison, si on sait dans quel ordre décoller les couches. »',
      }),
      utiliser: {
        tous: 'Tu ne décolles rien de ce mur. Il n’y a pas d’ordre dans lequel ça se ferait poliment.',
      },
    },

    /* ══ LA CARTE DE VISITE — le front du Tír, posé là où il se lit ═══
       Un objet qui attend d'être lu (§ 7.4 : « ils ont laissé leur
       carte »). `carte-vue` est la première des deux raisons de faire
       confiance à Nova — donc la seule que le joueur puisse obtenir
       sans avoir joué White_Rabbit ni choisi Duke à la traversée. */
    carte: {
      nom: 'La carte, sur le comptoir',
      regarder: ({ a }) => a('carte-vue')
        ? { tous: 'Toujours là, toujours face en l’air. Personne dans cette pièce ne l’a retournée, et personne ne l’a jetée non plus.',
            rabbit: '« Le code répond encore. Ils attendent qu’on appelle. »' }
        : { tous: ['Une carte de visite, posée face en l’air sur le comptoir de l’ancien magasin, à l’endroit exact où on posait la monnaie.',
                   'Un nom qui n’est pas un nom, un code de comm, et rien d’autre. Pas de société, pas de fonction, pas d’adresse.',
                   'Elle est propre. Elle n’a pas passé trois jours sur ce comptoir — deux, au plus.'],
            hercules: '« On laisse une carte quand on veut être rappelé. On la laisse FACE EN L’AIR quand on veut surtout qu’elle soit vue. C’est une signature, ça. »',
            trash: '« Du papier. Du vrai papier, chez des elfes du Tír. Ce n’est pas de la discrétion, c’est de la politesse — et c’est cent fois pire. »',
            rabbit: '« Code de comm à usage unique, encore actif. Ils n’ont pas fini leur passage : ils l’ont mis en pause. »',
            drakk: '« Le héraut est venu, il a laissé son sceau, et il repassera. C’est la façon la plus civilisée d’annoncer un siège. »',
            /* Pas de `visuels` en double : `derive()` allume le
               contour de la carte à partir du drapeau, et une seule
               source pour un même état vaut mieux que deux. */
            flags: ['carte-vue'] },
      utiliser: ({ a }) => a('carte-vue')
        ? { tous: 'Tu la laisses où elle est. Elle n’est pas à vous, et l’emporter préviendrait plus sûrement que de la lire.',
            rabbit: '« Si je la prends, ils sauront qu’elle a bougé. Elle est plus utile là. »' }
        : { tous: 'De loin, c’est un rectangle blanc sur un comptoir. Il faudrait la regarder pour savoir ce que c’est.' },
    },

    /* ══ LES BACS À VINYLES — le décor qui parle des quatre runners ══ */
    bacs: {
      nom: 'Les bacs à vinyles',
      regarder: {
        tous: ['Le stock que personne n’a racheté quand le magasin a fermé. Six bacs, classés par genre, avec des intercalaires écrits à la main.',
               'Quelqu’un continue de les remettre en ordre. Régulièrement.'],
        hercules: '« Il y a pour trois mille de collection là-dedans et personne n’y a touché en deux ans. Dans ce quartier. C’est une information sur les gens, pas sur les disques. »',
        trash: '« On garde les choses parce qu’elles ont servi à quelqu’un. Je fais pareil. C’est même à peu près tout ce que je fais. »',
        rabbit: '« Support physique, lecture analogique, aucune copie. Chaque écoute abîme la chose écoutée. Je ne comprends pas et j’aimerais comprendre. »',
        drakk: ['« Ah. »',
                '« Ah. »',
                'Il faut le rappeler deux fois.'],
      },
      utiliser: {
        tous: 'Tu remets un intercalaire droit. C’est à peu près tout ce qu’on peut faire pour cette pièce.',
        drakk: '« Je vais avoir besoin d’une heure. »',
      },
    },

    /* ══ LE RIDEAU DE FER — la sortie ════════════════════════════════
       PROVISOIRE ET ASSUMÉ, comme `retour.js` avant ce chantier : on
       retombe sur `fin: true` parce que l'acte IV n'a qu'un lieu. Quand
       l'appartement (26) et le Shameless (27) existeront, c'est ici que
       la carte reprend la main — `va: 'carte'` — et le chantier 17 se
       réécrira autour de ces trois nœuds-là, pas des cinq d'origine
       (D11). Le présage du Tír, lui, tombe dès maintenant : il est la
       seule chose que ce tableau doive au § 7.4. */
    grille: {
      nom: 'Le rideau de fer',
      sortie: true,
      regarder: ({ a }) => ({
        tous: a('tir-prevenu')
          ? ['Le rideau de fer est resté à mi-hauteur depuis que vous êtes entrés. Dehors, la rue est la même qu’à l’arrivée.',
             'Sauf une voiture, garée en face, qui n’y était pas.']
          : ['Le rideau de fer est bloqué à mi-hauteur — pas cassé : personne n’a jamais eu de raison de le redescendre.',
             'Dehors, Loveland à dix heures du matin, ce qui ressemble beaucoup à Loveland à toute heure.'],
        rabbit: a('tir-prevenu')
          ? '« Immatriculation neutre. Trop neutre. Ce n’est pas une plaque, c’est une absence de plaque. »'
          : '« Rue morte. Deux caméras municipales, toutes les deux tournées vers le carrefour. Personne ne regarde cette porte. »',
        drakk: '« Une seule issue. En sortant, on saura tout de suite si quelqu’un nous attendait. »',
      }),
      utiliser: ({ a }) => ({
        tous: [
          ...(a('su:hayden')
            ? ['Vous ressortez avec un nom. Trois jours que l’affaire existe, et c’est la première chose qu’elle rend.']
            : ['Vous ressortez du local. Le rideau de fer reste à mi-hauteur derrière vous : personne, ici, ne verrouille quoi que ce soit.']),
          ...(a('tir-prevenu')
            ? [{ texte: 'La voiture d’en face démarre au moment où vous atteignez le trottoir. Elle ne vous suit pas : elle part dans l’autre sens, sans se presser.',
                 visuel: 'tir-dehors' },
               'Ils n’avaient pas besoin de vous suivre. Ils avaient besoin de savoir que quelqu’un était venu poser les mêmes questions qu’eux, et ils viennent de l’apprendre.']
            : ['Personne dans la rue. C’est peut-être la première fois de l’affaire, et ça ne durera pas.']),
        ],
        hercules: a('su:hayden')
          ? '« Un prénom mal écrit et un nom de famille. Vingt ans de métier et c’est toujours comme ça que ça tombe. »'
          : '« On a frappé à la bonne porte. On n’a pas posé les bonnes questions. Ça arrive, et ça ne se rattrape pas le même jour. »',
        ...(a('tir-prevenu')
          ? { trash: '« Ils repasseront ici. Chez ces quatre-là. Et ce sera de notre fait. »' }
          : {}),
        /* Ce que le rideau relit pour savoir OÙ la partie s'est
           arrêtée : la nuit du contrat s'arrêtait à l'abordage, elle
           s'arrête maintenant ici. Un drapeau et pas `etat.lieu` —
           `tombeRideau()` ne lit que des drapeaux, et il doit continuer
           à savoir répondre à une sauvegarde plus ancienne. */
        flags: ['local-quitte'],
        fin: true,
      }),
    },
  },

  dialogues: {

    /* ══ MARK ════════════════════════════════════════════════════════
       Trois sujets et une sortie. `elle` est le seul qui ouvre, et il
       n'a aucune garde : c'est la définition d'un verrou-manifeste.
       `nom` est visible dès le début et se REFUSE tant que `mark-
       convaincu` n'est pas posé — visible et refusé, jamais caché :
       c'est comme ça que le joueur apprend que l'ordre des questions
       est le sujet du tableau (§2.2 de `PLAN_LISIBILITE.md`). */
    mark: {
      qui: 'mark',
      accueil: ['Il ne se lève pas. Il ne repose pas la pochette non plus.',
                '« Vous êtes qui, vous. »'],
      retour: ['« … Ouais. »'],
      sujets: [
        {
          id: 'qui-on-est',
          titre: '« On travaille pour l’avocat de celui qu’on accuse. »',
          texte: ['« Alors vous êtes de leur côté. »',
                  '« Je veux dire — vous êtes du côté de celui qui l’a. »',
                  'Il n’arrive pas à dire le mot. Il essaie depuis trois jours et il n’y arrive pas.',
                  '« Ils ont dit un ork. Ils ont dit qu’il l’avait suivie. »'],
        },
        {
          id: 'elle',
          titre: '« Parle-nous d’elle. Pas de l’affaire — d’elle. »',
          quand: ({ a }) => !a('mark-convaincu'),
          flags: ['mark-convaincu'],
          texte: ['Il lève les yeux pour la première fois.',
                  '« … Personne me l’a demandé. Trois jours. Personne. »',
                  '« Elle chantait pas fort. Tout le monde croit qu’il faut chanter fort. Elle, elle chantait comme si t’étais assis à côté d’elle, même quand y avait cent personnes. »',
                  '« Elle bossait au pressing en bas de chez elle. Elle disait que c’était bien parce que ça sentait le propre. »',
                  'Il parle pendant deux minutes sans s’arrêter. Personne ne l’interrompt.',
                  '« … Et depuis l’automne elle était bizarre. Contente-bizarre. Elle disparaissait des soirs, et elle revenait avec des trucs qu’elle pouvait pas se payer. »',
                  '« J’ai rien dit. J’étais pas jaloux. » Il s’arrête. « Si. Un peu. »'],
        },
        /* DEUX SUJETS, UN SEUL BOUTON À L'ÉCRAN. `quand` les rend
           mutuellement exclusifs, donc le joueur ne voit jamais qu'une
           seule ligne « Tu sais qui c'était » — mais elle ne répond pas
           la même chose selon qu'on a parlé d'ELLE avant. Deux sujets
           et pas un seul à texte conditionnel parce que `choisit()`
           (main.js) n'évalue ni `texte` ni `fiches` : ce sont des
           données, jamais des fonctions. Deux `id` distincts, donc deux
           épuisements distincts — demander avant, puis convaincre, puis
           redemander, rend bien un bouton neuf. */
        {
          id: 'nom-refus',
          titre: '« Tu sais qui c’était. »',
          quand: ({ a }) => !a('mark-convaincu') && !a('mark-ferme'),
          texte: ['« Non. »',
                  'C’est tout. Il ne détourne pas les yeux, il ne s’explique pas, il ne négocie pas.',
                  '« Vous êtes venus chercher un truc. Tout le monde vient chercher un truc. »'],
        },
        {
          id: 'nom',
          titre: '« Tu sais qui c’était. »',
          quand: ({ a }) => a('mark-convaincu') && !a('mark-ferme'),
          fiches: ['prenom-mal-ecrit'],
          texte: ['Long silence. Il retourne la pochette de disque vide entre ses mains, deux fois, trois fois.',
                  '« Elle l’a écrit une fois. Au dos d’un flyer. Elle voulait voir comment ça faisait, écrit. »',
                  'Il sort le flyer de sa veste. Il l’avait sur lui.',
                  '« HAIDEN. Elle l’a écrit comme ça. Elle l’avait jamais vu écrit, elle l’avait juste entendu. »',
                  '« Je l’ai gardé parce que c’est son écriture. Pas à cause de lui. »',
                  '« Vous le dites à personne que ça vient de moi. »'],
        },
        {
          id: 'tir',
          titre: '« Trois elfes sont passés avant nous. »',
          quand: ({ a }) => a('carte-vue'),
          texte: ['« Ouais. Ils ont été gentils. »',
                  '« C’est ça qui m’a fait peur, en fait. Ils étaient gentils et ils sont restés une heure. »',
                  '« Ils ont demandé si elle enregistrait quelque part. Ils ont demandé que ça. »'],
        },
        {
          id: 'assez',
          titre: '(Le laisser avec sa pochette.)',
          fin: true,
          texte: ['Il repose la pochette sur ses genoux, à plat, et il remet les mains dessus.'],
        },
      ],
    },

    /* ══ PSYCH ═══════════════════════════════════════════════════════
       `chantait` est ouvert dès la première seconde et rend exactement
       la même fiche que le créditube. Le tableau ne dit jamais que ce
       sujet existe ; il ne le cache pas non plus. Toute la mécanique du
       « goût amer » tient dans cet écart-là. */
    psych: {
      qui: 'psych',
      accueil: ['Il retire le bras de ses yeux sans se relever.',
                '« T’as quelque chose ? »'],
      retour: ['« … Ouais. Vas-y. »'],
      sujets: [
        {
          id: 'chantait',
          titre: '« Comment elle chantait ? »',
          quand: ({ a }) => !a('psych-paye') && !a('psych-ecoute'),
          flags: ['psych-ecoute'],
          fiches: ['enregistrement-waters'],
          texte: ['Il se redresse sur un coude. C’est le plus grand mouvement qu’il ait fait de la matinée.',
                  '« … Personne me demande jamais ça. »',
                  '« Elle chantait juste. Pas “juste” comme dans les notes — juste comme dans : au bon endroit. Tu sais quand tu poses un truc et que c’est exactement là qu’il devait être ? »',
                  '« La troisième prise. C’est toujours la troisième qui est bonne, avec elle. La première elle a peur, la deuxième elle réfléchit, la troisième elle oublie qu’on enregistre. »',
                  'Il s’arrête net. Il vient de dire quelque chose qu’il n’avait pas prévu de dire.',
                  '« … Waters. Reginald Waters, à Puyallup. Quatre titres. Il garde tout, ce type. Les prises ratées, les silences, tout. »',
                  '« Elle parlait, entre les prises. Elle parlait beaucoup. »'],
        },
        {
          id: 'apres-paye',
          titre: '« Tu nous l’aurais dit sans ça ? »',
          quand: ({ a }) => a('psych-paye'),
          texte: ['Il a l’air sincèrement surpris par la question.',
                  '« Ben ouais. »',
                  '« Faut demander pour elle, c’est tout. Les gens ils demandent pour la bande. »',
                  'Il se rallonge, un bras sur les yeux.',
                  '« Gardez le tube. C’est déjà parti. »'],
        },
        {
          id: 'waters',
          titre: '« Waters te laisserait entrer ? »',
          quand: ({ a }) => a('psych-paye') || a('psych-ecoute'),
          texte: ['« Moi ? Non. Il m’aime pas. »',
                  '« Il aime personne, en fait. Il a un coffre dans la salle de montage et il croit que personne le sait. Tout le monde le sait. »',
                  '« Faites attention avec sa matrice. Il a mis un truc dessus. Il l’a payé cher, il l’a dit à tout le monde, il était très fier. »'],
        },
        {
          id: 'assez',
          titre: '(Le laisser dormir.)',
          fin: true,
          texte: ['Le bras est déjà revenu sur les yeux.'],
        },
      ],
    },

    /* ══ NOVA ════════════════════════════════════════════════════════
       Deux raisons de faire confiance, jamais trois. `duke` porte un
       `acteur` : il reste VISIBLE et VERROUILLÉ pour les trois autres
       runners, qui le refusent dans leur voix (chantier 38). C'est le
       seul endroit du jeu où le choix de planque fait à la traversée
       revient parler, trois jours plus tard, dans un autre tableau. */
    nova: {
      qui: 'nova',
      accueil: ['Elle ne bouge pas du montant.',
                '« Vous êtes la deuxième équipe cette semaine. »'],
      retour: ['« Quoi encore. »'],
      sujets: [
        {
          id: 'deuxieme',
          titre: '« La deuxième ? »',
          texte: ['« Vous m’avez entendue. »',
                  'Et c’est tout ce qu’elle en dira comme ça.'],
        },
        {
          id: 'carte',
          titre: '« Ils ont laissé leur carte sur le comptoir. »',
          quand: ({ a }) => a('carte-vue') && !a('nova-parle'),
          flags: ['nova-parle'],
          fiches: ['elfes-du-tir'],
          texte: ['Elle décolle enfin l’épaule du montant.',
                  '« Vous l’avez lue. Bon. Au moins vous regardez. »',
                  '« Ils étaient trois. Des elfes, du Tír — pas des elfes d’ici, c’est pas pareil, ça s’entend. Avant-hier. »',
                  '« Deux heures. Ils ont pas menacé, ils ont pas payé. Ils ont juste demandé, très poliment, et à la fin t’avais tout dit. »',
                  'Elle se ferme une seconde.',
                  '« J’ai rien dit. J’ai juste répondu. C’est pas pareil non plus. »',
                  '« Ils cherchaient un enregistrement. C’est le seul truc qu’ils ont demandé deux fois. »'],
        },
        {
          id: 'duke',
          titre: '« Duke se porte garant. » (White_Rabbit)',
          acteur: 'rabbit',
          quand: ({ a }) => (a('dette-duke') || a('conf-duke') || a('choix-duke')) && !a('nova-parle'),
          flags: ['nova-parle'],
          fiches: ['elfes-du-tir'],
          texte: ['Elle regarde White_Rabbit pour la première fois vraiment.',
                  '« … Duke. Le Duke de la 44e. »',
                  '« Il m’a sortie de chez les Halloweeners. Personne le sait, et vous venez de le dire devant quatre personnes. »',
                  'Un temps. Puis elle décide.',
                  '« Trois elfes du Tír, avant-hier, deux heures. Polis. Ils cherchaient un enregistrement — c’est le seul truc qu’ils ont demandé deux fois. »',
                  '« Ils ont laissé une carte sur le comptoir. Elle y est encore. Personne a osé la jeter. »'],
        },
        {
          id: 'porte',
          titre: '« Tu tiens encore la porte. »',
          quand: ({ a }) => a('nova-parle'),
          texte: ['« Faut bien que quelqu’un le fasse. »',
                  '« Quand elle chantait, je tenais la porte. Y avait rien à garder, c’était un local pourri. Mais elle aimait bien savoir que quelqu’un tenait la porte. »',
                  'Elle se remet en place, épaule contre le montant.',
                  '« Alors je la tiens. »'],
        },
        {
          id: 'assez',
          titre: '(La laisser à sa porte.)',
          fin: true,
          texte: ['Elle a déjà repris sa place. Elle ne l’avait pas vraiment quittée.'],
        },
      ],
    },

    /* ══ NITA ════════════════════════════════════════════════════════
       Deux sujets exclusifs par construction (`quand`), et l'esquive ne
       se rattrape jamais : c'est la seule des quatre serrures où le
       silence est la faute. Le sujet `orc` demande TRASH — pas parce
       qu'il faut un Éveillé pour parler à une chamane, mais parce que
       le plan désigne Amelia Brown comme SON contact (§ 7.3), et qu'un
       contact appartient à un runner (`PLAN_CAPACITES_ET_RESEAU.md`). */
    nita: {
      qui: 'nita',
      accueil: ['Elle repose sa pile de tracts sur le comptoir, sans se presser, et elle vous fait face.',
                '« Pour qui vous travaillez ? »'],
      retour: ['« Je vous écoute. »'],
      sujets: [
        {
          id: 'verite',
          titre: '« Pour un inspecteur de la Lone Star qui paie de sa poche. »',
          quand: ({ a }) => !a('nita-parle') && !a('nita-ferme'),
          flags: ['nita-parle'],
          fiches: ['gros-ponte-telestrian'],
          texte: ['Elle ne réagit pas tout de suite. Elle range ça quelque part, d’abord.',
                  '« Un flic de la Star qui paie de sa poche la défense d’un ork. »',
                  '« … D’accord. Ça, c’est vrai. Personne inventerait ça pour me plaire, c’est trop moche. »',
                  'Elle décroise les bras.',
                  '« Elle voyait quelqu’un. Depuis l’automne. Quelqu’un de la maison Telestrian, et haut — assez haut pour qu’elle dise jamais le nom de famille. »',
                  '« Elle me l’a dit une fois, un soir, et elle a passé la semaine suivante à faire comme si elle l’avait pas dit. »',
                  '« J’ai rien pu en faire. Je suis permanente d’une association, pas enquêtrice. J’ai un dossier par mois où un ork prend la place d’un elfe et je gagne un dossier sur dix. »'],
        },
        {
          id: 'esquive',
          titre: '« Ça ne vous regarde pas. »',
          quand: ({ a }) => !a('nita-parle') && !a('nita-ferme'),
          flags: ['nita-ferme'],
          fin: true,
          texte: ['« Si. »',
                  'Elle reprend sa pile de tracts.',
                  '« Ça me regarde exactement autant que ça vous regarde, elle. Et vous venez de me dire de quel côté vous êtes sans le vouloir. »',
                  'Elle se remet à trier les affiches du mur. La conversation est terminée, et elle n’a pas eu besoin de le dire.'],
        },
        {
          id: 'orc',
          titre: '« L’ORC pourrait porter ce dossier-là. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => a('nita-parle') && !a('orc-contact'),
          flags: ['orc-contact'],
          texte: ['Elle regarde Trash, et elle voit ce qu’il est avant qu’il ait dit trois mots. Ça se fait entre Éveillés et personne d’autre dans la pièce ne s’en aperçoit.',
                  '« Toi, tu viens du Tír. »',
                  '« … Et tu bosses pour un flic qui défend un ork. »',
                  'Elle sort un code de comm et l’écrit à la main, au dos d’un tract.',
                  '« Amelia Brown. Elle prend les appels chez nous. Dites que vous venez de ma part, sinon elle raccroche — elle a raison de raccrocher. »',
                  '« Et si ce que vous trouvez tient debout, on le portera. On perd neuf fois sur dix, mais on le portera. »'],
        },
        {
          id: 'elfes',
          titre: '« Trois elfes du Tír sont passés avant nous. »',
          quand: ({ a }) => a('nita-parle') && a('carte-vue'),
          texte: ['« Je sais. J’étais là. »',
                  '« Ils m’ont demandé pour qui je travaillais, exactement comme je viens de le faire. J’ai répondu. »',
                  'Un temps.',
                  '« Ils ont pas aimé la réponse. Eux non plus ils l’ont pas dit. »'],
        },
        {
          id: 'assez',
          titre: '(La laisser à ses tracts.)',
          fin: true,
          texte: ['Elle reprend sa pile là où elle l’avait posée, et le compte à voix basse.'],
        },
      ],
    },
  },
}
