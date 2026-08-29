/* ============================================================
   TABLEAU 8 — CHEZ MARK, À RENTON. Les amis de Teresa Banks.
   Trois jours après la récusation, un matin.

   Le tableau se jouait dans un local de répétition, et Teresa y était
   chanteuse : les deux sont faux. Le scénario (p. 22) donne quatre
   spectateurs qui étaient AVEC ELLE au concert de Cerberus & Erebus à
   l'Underworld 93, et une fille qui est montée sur scène pour DANSER.
   Le lieu de la veillée est donc chez le seul qui ne peut plus sortir.

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
            sujet `dansait` est ouvert dès la première seconde, et il
            donne la même fiche. On ne s'en veut qu'après, et seulement
            si on a payé d'abord. C'est exactement ce que le plan
            demandait, et ce n'est pas jouable autrement.
     NOVA   elle a été interrogée par les runners du Tír et ne le dit
            pas spontanément. Deux raisons de faire confiance, et deux
            seulement : avoir LU la carte qu'ils ont laissée (`carte-vue`,
            sur la table), ou porter un nom de gang qu'elle reconnaît —
            Duke, et c'est White_Rabbit qui le porte (sujet à `acteur` :
            c'est LUI qui le dit, quel que soit le portrait qu'on tient).
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
   retombait sur `fin: true` — **elle mène à l'appartement depuis le
   chantier 26** ; quand le Shameless (27) existera à son tour, c'est là
   que la carte reprendra la main. */

import { equipiers } from './equipiers.js'

export const amis = {
  markup: 'scenes/amis.html',
  /* ACTE IV — l'enquête, et c'est lui qui compte en tours (D8). */
  acte: 4,

  /* L3 — « revenir doit changer quelque chose » (`PLAN_CARTE_NAVIGATION`).
     Le chantier 17 réécrit rend ce tableau revisitable ; une seconde
     visite identique à la première contredirait la loi qui justifie la
     carte. Elle n'est pas cosmétique ici : si le Tír est repassé
     (`tir-retour`, posé en ressortant de chez Teresa), la pièce a
     changé de personnes. */
  ouverture: ({ a }, visite) => visite > 1 ? [
    ...(a('tir-retour')
      ? ['La porte du studio est entrouverte, comme la première fois. Dedans, ils sont trois au lieu de quatre, et personne ne dit qui manque.',
         'Nita range ses tracts dans un carton. Elle ne les trie plus.',
         '« Ils sont revenus. Après vous. Ils ont demandé ce que vous aviez demandé, dans le même ordre. »']
      : ['La porte est entrouverte, comme la première fois, et ils sont toujours quatre. Rien n’a bougé — chez quelqu’un qui ne sort plus, c’est la meilleure nouvelle possible.',
         'L’écran tourne toujours en boucle. Personne ne l’a arrêté cette fois non plus.']),
    'OBJECTIF — reprendre ce qu’on n’a pas pris la première fois.',
  ] : [
    'Trois jours que l’audience est repoussée. En trois jours, le nom de Teresa Banks n’est apparu dans aucun journal, sur aucun fil, dans aucune conversation qui ne soit pas la vôtre.',
    /* CHEZ MARK, PAS DANS UN LOCAL DE RÉPÉTITION. Le scénario ne donne
       pas de lieu de rendez-vous : il donne quatre personnes très
       dépareillées — une gangeuse Novarich de Bellevue, un graphiste de
       Renton, un obsédé de la piste de danse, une naine chamane
       permanente de l'ORC — qui n'ont en commun que d'avoir été au même
       concert avec elle. Rien ne les réunit dans une salle.

       Ce qui les réunit, c'est Mark : « à peine 19 ans, c'est le plus
       jeune des amis de Teresa et probablement le plus amoureux d'elle
       […] Il a le cœur brisé par sa mort et il a fait une dépression,
       dont il sort tout juste. » Il ne sort plus, alors ce sont les
       trois autres qui viennent. C'est une veillée, et elle a lieu chez
       celui qui ne peut pas la quitter. */
    'Un studio au quatrième, au-dessus d’une imprimerie qui tourne encore. Une pièce, un lit qu’on ne replie plus, une table à dessin repoussée contre le mur, et des piles de tirages que personne n’a livrés.',
    'Trois d’entre eux sont venus ce matin. Le quatrième habite là et n’en est pas sorti depuis trois jours.',
    /* ON VIENT DE L'Y DÉPOSER, ET MAINTENANT ÇA SE JOUE. Les deux
       lignes commençaient par « Lester est à McNeil » — le seul endroit
       du jeu où la remise existait, en compte rendu, trois jours après.
       Elle se joue désormais à la fin de l'abordage (`retour.js`,
       `remise`), donc ce n'est plus une nouvelle : c'est là où il est
       resté. Ce qui compte ici est la seconde moitié, qui n'a pas
       bougé. */
    a('lester-temoigne')
      ? 'Il attend sa seconde audience en sachant déjà ce qu’il va dire. C’est la première fois de l’affaire que vous travaillez sans l’avoir sur les bras.'
      : 'Il attend sa seconde audience sous clé, sans savoir ce qu’il y dira. C’est la première fois de l’affaire que vous travaillez sans l’avoir sur les bras.',
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
    sociale: [
      'Quatre personnes, quatre façons de ne pas être ailleurs. Aucune ne s’est levée quand vous êtes entrés, et aucune ne vous a quittés des yeux.',
      '« Personne ici n’a intérêt à nous parler, et personne n’a envie qu’on s’en aille. »',
      '« C’est une bonne position. Je ne sais pas encore de quoi. »',
    ],
    astrale: [
      'La pièce est saturée. Trois personnes y reviennent depuis trois jours, et une n’en est pas sortie ; ça s’est déposé sur les murs.',
      '« Chez moi on appelait ça une veillée. »',
      '« Celle-là dure depuis trois jours, et elle a lieu chez le seul qui ne peut pas rentrer chez lui. »',
    ],
    ra: [
      'Un écran qui repasse la même boucle, quatre commlinks en veille, un rig de travail éteint sur la table à dessin — et, juste à côté, une carte de visite. C’est elle, la seule chose qui émette encore.',
      '« La pièce est morte côté réseau. »',
      '« Sauf un truc, là-bas. Il attend qu’on le lise. »',
    ],
    materielle: [
      'Un quatrième étage, une porte, une fenêtre qui donne sur une cour. L’escalier est la seule façon d’entrer et la seule de sortir.',
      '« Un donjon à une porte, et quatre étages de marches. »',
      '« Ça va, tant que personne ne sait qu’on est dedans. »',
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
          ? ['Il tient toujours le tirage, et il le tient maintenant entre vous et lui.',
             'Dix-neuf ans, et il vient d’apprendre en une seconde à quoi ressemble quelqu’un qui met un prix sur elle.']
          : a('mark-convaincu')
            ? ['Assis au bord du lit défait, un tirage entre les mains. Il n’a pas arrêté de parler d’elle depuis qu’on a commencé, et il n’a pas l’air d’avoir fini.',
               'C’est le seul de la pièce qui la conjugue encore au présent de temps en temps, et qui se reprend chaque fois.']
            : ['Assis au bord du lit défait, dix-neuf ans, un tirage entre les mains — une image arrêtée du concert, sortie de son imprimante et refaite trop de fois. Il la tient comme on tient une chose qu’on a déjà usée.',
               'Il vous a regardés entrer sans bouger. Ce n’est pas du courage : il n’a simplement nulle part où aller.'],
        hercules: a('mark-ferme')
          ? '« J’ai fait ça pendant trente ans et je viens de le rater sur un gamin de dix-neuf ans. Il n’avait pas de prix, et je lui en ai demandé un. »'
          : '« Il n’a rien à vendre et il le sait. Ce sont les seuls à qui je n’ai jamais rien pu acheter. »',
        trash: ['« Son aura est entière, et elle penche toute d’un côté. »', '« Il compte rester comme ça. »'],
        rabbit: ['« Zéro empreinte. Pas de profil, pas de fil, rien. »', '« À dix-neuf ans, en 2081. Il vit dans une seule pièce. »'],
        drakk: '« Le jeune homme qui garde la relique et ne dit pas qu’il l’a. J’ai écrit ce personnage. Je ne pensais pas le rencontrer. »',
      }),
      parler: ({ a }) => a('mark-ferme')
        ? { tous: 'Il ne lève pas les yeux. La conversation est finie depuis qu’elle a eu un prix.',
            hercules: '« Non. Celle-là, je l’ai fermée moi-même. »' }
        : { texte: [], dialogue: 'mark', flags: ['tir-prevenu'] },
      utiliser: 'Non. C’est un gamin assis au bord de son lit, pas une porte.',
      objets: {
        /* LA MÊME FAUTE QU'À LA PLANQUE, AU MÊME PRIX. `conf-perdue`
           coûte deux points de confiance à Lester ; ici, ça coûte la
           moitié d'un nom. Irrécupérable, et c'est le sujet du jeu. */
        creditube: ({ a }) => a('mark-ferme')
          ? { tous: 'Il l’a déjà vu. Une fois suffit largement.' }
          : { tous: ['Tu poses le créditube sur le lit, à côté de lui. Deux mille, et personne n’a besoin de dire pour quoi.',
                     'Il le regarde longtemps. Puis il regarde le tirage entre ses mains, et il comprend qu’on vient de mettre les deux sur la même table.',
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
       créditube (immédiat, évident, efficace) et le sujet `dansait`
       (gratuit, ouvert dès la première seconde, à condition de poser une
       question sur elle plutôt que sur ce qu'on cherche). Payer marche.
       C'est en repartant qu'on apprend que ce n'était pas nécessaire. */
    psych: {
      nom: 'Psych',
      regarder: ({ a }) => ({
        tous: a('psych-paye') || a('psych-ecoute')
          ? ['Allongé par terre entre le lit et la table à dessin, les mains derrière la tête, il a rouvert les yeux au milieu de sa propre phrase et il l’a reprise au même mot.',
             'Il parle de ces dix secondes sur la scène comme d’un endroit où il habiterait encore.']
          : ['Allongé par terre entre le lit et la table à dessin, un bras sur les yeux. Il n’a pas bougé depuis que vous êtes entrés, et il n’a pas dormi non plus.',
             'Il a l’âge qu’on veut lui donner. Ce n’est pas un compliment.'],
        hercules: ['« Il a un prix, il le dit lui-même, et il est bas. »', '« D’habitude ça m’arrange. »'],
        trash: a('psych-paye')
          ? '« Son aura s’est allumée quand il a parlé d’elle, pas quand il a pris l’argent. On s’est trompés d’entrée. »'
          : '« Il y a un trou dans son aura, à l’endroit exact où on met ce qu’on prend. Et le reste tient debout. Le reste tient même très bien. »',
        rabbit: '« Trois cliniques de désintox dans son historique, toutes payées par la même association. Quelqu’un a essayé, plusieurs fois. »',
        drakk: ['« Le barde. »', '« Toujours le plus abîmé, et toujours celui qui se souvient de la chanson exacte. »'],
      }),
      parler: { texte: [], dialogue: 'psych', flags: ['tir-prevenu'] },
      utiliser: 'On ne secoue pas quelqu’un qui vous parle déjà.',
      objets: {
        creditube: ({ a }) => a('psych-paye') || a('psych-ecoute')
          ? { tous: 'Il a déjà dit ce qu’il savait. Lui donner ça maintenant ne serait plus un achat — ce serait autre chose, et personne dans la pièce n’a envie de savoir quoi.' }
          : { tous: ['Le créditube change de main sans que personne ait eu à formuler la question. C’est la transaction la plus propre de toute l’affaire.',
                     ['psych', '« Waters. Reginald Waters, un studio à Puyallup, à deux rues de chez elle. C’est là qu’elle a tourné son truc. »'],
                     ['psych', '« Les elfes cherchaient ça. Moi j’ai rien dit, mais ils avaient pas besoin de moi. »'],
                     'Il l’a dit en huit secondes. Il n’a pas hésité, il n’a pas négocié, il n’a même pas eu l’air de trouver ça désagréable.',
                     ['psych', '« … Vous êtes les premiers à venir pour elle. Les autres, ils venaient pour la bande. »'],
                     'Ça, il l’a dit gratuitement.'],
              hercules: '« Deux mille pour huit secondes. C’est le meilleur tarif de ma carrière et je n’en suis pas fier une seconde. »',
              trash: ['« Il aurait parlé sans ça. »', '« Il s’est allumé quand on l’a nommée. Pas quand on a sorti le tube. »'],
              rabbit: ['« Transaction conclue. Aucune contrepartie, aucune condition. »', '« Il n’a jamais appris à négocier. »'],
              drakk: '« Nous avons payé pour une chose qui nous était offerte. »',
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
          ? ['Adossée au chambranle, dans l’entrebâillement, exactement comme elle se tenait à l’entrée de la fosse ce soir-là. Elle garde encore une porte qui ne protège plus personne.',
             'Depuis qu’elle a parlé, elle regarde la cage d’escalier au lieu de vous regarder, vous.']
          : ['Une fille d’une vingtaine d’années, tête blond platine, lunettes chrome à l’intérieur, similicuir blanc parcouru d’éclairs jaunes. Elle vous arrive à la poitrine et elle s’est quand même placée entre vous et l’escalier.',
             'Elle vous a comptés en entrant. Quatre. Elle n’a pas eu besoin de regarder deux fois.'],
        hercules: ['« Elle garde une porte dans un studio où il n’y a plus rien à garder. »', '« Et elle le fait bien. Ce qui sonne faux chez elle, ce n’est pas ça. »'],
        trash: '« Elle est en rupture avec quelque chose. Je reconnais la forme que ça donne à une aura : c’est la mienne, en plus récent. »',
        rabbit: a('dette-duke') || a('conf-duke') || a('choix-duke')
          ? ['« Melissa Patterson. Bellevue, deux parents cadres chez Microdeck, carte Novarich depuis treize mois. »',
             '« Duke tient la 44e. Il sait exactement qui elle est, et il la laisse tenir la porte quand même. »']
          : ['« Melissa Patterson. Bellevue, deux parents cadres chez Microdeck, carte Novarich depuis treize mois. »',
             '« … Je vais rien dire. Je suis mal placé. »'],
        drakk: '« La garde du corps qui n’a plus de corps à garder. Elle n’a pas déposé les armes : personne ne lui a dit que la quête était finie. »',
      }),
      parler: { texte: [], dialogue: 'nova', flags: ['tir-prevenu'] },
      utiliser: 'Non. Elle est adossée à la seule sortie du quatrième étage, et elle le sait mieux que vous.',
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
          ? ['Elle s’est remise à trier les tirages contre le mur, méthodiquement, et elle ne s’arrêtera plus. Elle a posé une question et elle n’a pas eu de réponse ; pour elle, c’en était une.',
             'Un fétiche d’ours pend à sa ceinture, côté mur. Elle l’a tourné de l’autre côté quand vous avez esquivé.']
          : ['Debout près du mur, une pile de tracts sous le bras — la seule de la pièce qui soit venue ce matin pour faire quelque chose plutôt que pour être quelque part.',
             'Un fétiche d’ours à la ceinture, usé jusqu’au poil. Elle vous a jaugés en trois secondes et elle n’a pas caché qu’elle le faisait.'],
        hercules: ['« Elle a une question à poser et elle attend de la poser. »', '« Je fais le même métier qu’elle avec moins de conviction. Je vais la laisser commencer, ça m’évitera de me tromper le premier. »'],
        trash: a('orc-contact')
          ? '« Une chamane de l’Ours dans une permanence associative. Elle fait avec son don ce que ma famille m’a appris à en faire : rien pour soi. »'
          : '« Éveillée. Ours — c’est le totem des gens qui protègent, et c’est le seul que personne ne prend par ambition. Elle sait que je l’ai vue. »',
        rabbit: '« Permanente ORC, dix ans de dossiers publics, zéro condamnation, quatorze plaintes déposées contre la Lone Star. »',
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
    /* ══ L'ÉCRAN — la dernière fois qu'ils l'ont vue ══════════════════
       Ce que le scénario donne, au mot près : quatre heures avant sa
       mort, Teresa est au concert de Cerberus & Erebus à l'Underworld
       93 avec ces quatre-là ; elle monte sur scène POUR DANSER, « ceci
       a fait son effet sur la foule comme le groupe », et elle poste
       elle-même ses selfies. Elle ne chante pas, elle n'a pas de
       groupe, il n'y a pas de local de répétition.

       Ces images existent donc publiquement, et Mark les repasse depuis
       trois jours. C'est l'objet de deuil de la pièce, et il est vrai. */
    ecran: {
      nom: 'L’écran',
      regarder: {
        tous: ['Un écran posé à même le sol, contre le mur, qui repasse en boucle une captation de concert prise depuis la fosse. Quelqu’un l’a lancée et personne ne l’a arrêtée.',
               'À trois minutes vingt, une fille monte sur scène et se met à danser. Le groupe la laisse faire. La salle s’occupe d’elle plus que de la musique, et elle le sait très bien.'],
        hercules: ['« Ça tourne en boucle. Ça veut dire que personne, dans cette pièce, n’a osé aller l’éteindre. »',
                   '« Il y a des gens qui reprennent le deuil au début à chaque fois. »'],
        trash: ['« Elle savait exactement où était la lumière. »',
                '« Ce n’est pas de l’insouciance. On ne monte pas là-dessus sans avoir décidé quelque chose. »'],
        rabbit: ['« Captation publique, diffusée le soir même, jamais retirée. Elle est dessus, et ses propres images aussi — elle les a postées elle-même. »',
                 '« Tout le monde pouvait la voir ce soir-là. C’est le contraire d’une fille qui se cache. »'],
        drakk: '« Quatre heures avant. Ils regardent les quatre dernières heures en boucle, comme si en la regardant assez fort on pouvait la faire descendre de cette scène. »',
      },
      utiliser: {
        tous: ['Tu tends la main vers l’écran, et quatre personnes tournent la tête en même temps sans qu’aucune n’ait dit un mot.',
               'Tu la retires.'],
        drakk: '« Non. Pas celui-là. »',
      },
    },

    /* ══ LE MUR D'AFFICHES — le lieu, et ce qu'il était ══════════════ */
    /* ══ LE MUR — son métier, et ce qu'il en a fait depuis trois jours ══
       Mark est graphiste (« il vit de piges de graphiste auprès de
       différentes petites boîtes »), enfant d'artistes. Le mur était à
       lui bien avant elle : c'est son mur de travail. Ce qui a changé,
       c'est ce qu'il y a punaisé par-dessus. */
    mur: {
      nom: 'Le mur, au-dessus de la table',
      regarder: ({ a }) => ({
        tous: ['Des années de travail punaisé les unes sur les autres — maquettes, essais de lettrage, épreuves annotées au feutre rouge par des gens qui ne payaient pas cher.',
               a('mark-convaincu')
                 ? 'Par-dessus, à plat, une trentaine d’images tirées de la captation. Elle est sur onze d’entre elles. Mark a compté — il vous l’a dit sans qu’on le lui demande.'
                 : 'Par-dessus, à plat, une trentaine d’images tirées de la captation. Elle est sur onze d’entre elles, et quelqu’un les a punaisées récemment, toutes au même endroit.'],
        hercules: ['« Il a arrêté un plan sur elle trente fois et il les a toutes tirées. »',
                   '« Ce n’est pas un mur de deuil. C’est un mur de recherche. Il cherche encore quelque chose là-dedans. »'],
        trash: ['« Les vieilles couches sont froides. Les trente du dessus sont brûlantes, et elles ont toutes trois jours. »',
                '« Il a fait ça en une nuit. »'],
        rabbit: '« Toutes tirées de la même captation publique, image par image. Il n’a rien piraté : il a regardé ce que tout le monde pouvait voir, plus longtemps que tout le monde. »',
        drakk: ['« La tapisserie de la salle commune. »', '« On la lit en décollant les couches dans le bon ordre. »'],
      }),
      utiliser: {
        tous: 'Tu ne décroches rien de ce mur. Il n’y a pas d’ordre dans lequel ça se ferait poliment.',
      },
    },

    /* ══ LA CARTE DE VISITE — le front du Tír, posé là où il se lit ═══
       Un objet qui attend d'être lu (§ 7.4 : « ils ont laissé leur
       carte »). `carte-vue` est la première des deux raisons de faire
       confiance à Nova — donc la seule que le joueur puisse obtenir
       sans avoir joué White_Rabbit ni choisi Duke à la traversée. */
    carte: {
      nom: 'La carte, sur la table',
      regarder: ({ a }) => a('carte-vue')
        ? { tous: 'Toujours là, toujours face en l’air. Personne dans cette pièce ne l’a retournée, et personne ne l’a jetée non plus.',
            rabbit: '« Le code répond encore. Ils attendent qu’on appelle. »' }
        : { tous: ['Une carte de visite, posée face en l’air sur la table à dessin, bien à plat sur une épreuve que personne ne finira.',
                   'Un nom qui n’est pas un nom, un code de comm, et rien d’autre. Pas de société, pas de fonction, pas d’adresse.',
                   'Elle est propre. Elle n’a pas passé trois jours sur cette table — deux, au plus.'],
            hercules: ['« On laisse une carte quand on veut être rappelé. »', '« On la laisse FACE EN L’AIR quand on veut qu’elle soit vue. »'],
            trash: ['« Du papier. Du vrai papier, chez des elfes du Tír. »', '« Ce n’est pas de la discrétion. C’est de la politesse. »'],
            rabbit: ['« Code de comm à usage unique, encore actif. »', '« Ils n’ont pas fini. »'],
            drakk: ['« Quelqu’un est venu, il a laissé sa marque, et il repassera. »', '« C’est poli. Ça reste un siège. »'],
            /* Pas de `visuels` en double : `derive()` allume le
               contour de la carte à partir du drapeau, et une seule
               source pour un même état vaut mieux que deux. */
            flags: ['carte-vue'] },
      utiliser: ({ a }) => a('carte-vue')
        ? { tous: 'Tu la laisses où elle est. Elle n’est pas à vous, et l’emporter préviendrait plus sûrement que de la lire.',
            rabbit: '« Si je la prends, ils sauront qu’elle a bougé. Elle est plus utile là. »' }
        : { tous: 'De loin, c’est un rectangle blanc sur un comptoir. Il faudrait la regarder pour savoir ce que c’est.' },
    },

    /* ══ LES TIRAGES — le travail qui s'est arrêté net ════════════════
       Ce que « il sort tout juste d'une dépression » donne à voir sans
       qu'on ait à le dire : des commandes finies, jamais livrées. */
    tirages: {
      nom: 'Les piles de tirages',
      regarder: {
        tous: ['Contre le mur, des piles de tirages sous film plastique, étiquetées au nom de petites boîtes de Renton. Des commandes finies.',
               'La plus récente est datée du lendemain de sa mort. Après, plus rien — et personne n’est venu chercher les précédentes.'],
        hercules: ['« Il y a trois semaines de facturation par terre, et il n’a appelé personne. »',
                   '« Un type de dix-neuf ans qui vit de piges et qui ne relance pas ses clients. Ça, ça dit tout. »'],
        trash: '« Il a continué à travailler deux jours. Puis il s’est arrêté au milieu, et ça se voit à l’endroit exact où la pile devient droite. »',
        rabbit: '« Support physique, livraison à la main, aucune trace en ligne. Il travaille comme son père devait travailler. »',
        drakk: ['« Ah. »',
                '« Ah. »',
                'Il faut le rappeler deux fois.'],
      },
      utiliser: {
        tous: 'Tu remets une pile d’aplomb. C’est à peu près tout ce qu’on peut faire pour cette pièce.',
        drakk: '« Je vais avoir besoin d’une heure. »',
      },
    },

    /* ══ LA COURONNE DE TRODES — ce avec quoi il travaille ═══════════
       Le scénario le dit graphiste en piges ; en 2081 ça se fait en RA,
       et la pièce n'en montrait rien. Elle n'en montre toujours pas
       beaucoup — c'est voulu : l'outil est ÉTEINT, et sa lentille RA
       dit déjà « la pièce est morte côté réseau ». Ce qui manquait,
       c'était de pouvoir voir la chose qui devrait émettre et qui
       n'émet pas.

       Aucune fiche, aucun drapeau : c'est de la texture, comme le pied
       de micro. Elle ne fait que redire, avec un objet, ce que la pile
       de tirages dit avec du papier — et à la même date. */
    trodes: {
      nom: 'La couronne de trodes',
      regarder: {
        tous: ['Une couronne de trodes, poussée au bord de la table à dessin, le câble encore branché. Elle n’est pas en veille : elle est éteinte.',
               'À côté, la carte de visite d’un inconnu est la seule chose de cette table qui émette quelque chose.'],
        hercules: ['« Ça vaut deux mois de piges, ce truc-là, et il l’a laissé au bord de la table. »',
                   '« Je ne dis pas ça pour l’argent. Je dis ça parce qu’on range ce qui coûte cher, et qu’il ne l’a pas fait. »'],
        trash: '« Il y a une trace dessus. Elle s’arrête le même jour que la pile de tirages. »',
        rabbit: ['« Trodes d’entrée de gamme, six contacts. De quoi faire de la mise en page, pas plus. »',
                 '« Dernière session il y a trois jours. Pour quelqu’un qui vit de piges, c’est long. »'],
        drakk: ['« Un diadème. »',
                '« C’est l’objet qu’on repose sur la table quand on ne joue plus le personnage. »'],
      },
      utiliser: {
        tous: 'Elle est à lui, elle est sur sa table, et il est assis juste à côté. Non.',
        drakk: '« On ne coiffe pas le diadème d’un autre. »',
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
    palier: {
      nom: 'La porte, sur le palier',
      sortie: 'carte',
      regarder: ({ a }) => ({
        tous: a('tir-prevenu')
          ? ['La porte est restée entrouverte depuis que vous êtes entrés. En bas, par la fenêtre de la cage, la rue est la même qu’à l’arrivée.',
             'Sauf une voiture, garée en face, qui n’y était pas.']
          : ['La porte n’a pas de serrure qui ferme — pas cassée : personne n’a jamais eu de raison de la fermer.',
             'Quatre étages plus bas, l’imprimerie tourne, et Renton à dix heures du matin ressemble beaucoup à Renton à toute heure.'],
        rabbit: a('tir-prevenu')
          ? '« Immatriculation neutre. Trop neutre. Ce n’est pas une plaque, c’est une absence de plaque. »'
          : '« Rue morte. Deux caméras municipales, toutes les deux tournées vers le carrefour. Personne ne regarde cette entrée. »',
        drakk: '« Une seule issue, et quatre étages pour la descendre. En sortant, on saura tout de suite si quelqu’un nous attendait. »',
      }),
      utiliser: ({ a }) => ({
        tous: [
          ...(a('su:hayden')
            ? ['Vous ressortez avec un nom. Trois jours que l’affaire existe, et c’est la première chose qu’elle rend.']
            : ['Vous redescendez les quatre étages. La porte reste entrouverte derrière vous : personne, ici, ne verrouille quoi que ce soit.']),
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
          ? { trash: '« Ils repasseront ici. Chez ce gamin-là, qui ne sort plus. Et ce sera de notre fait. »' }
          : {}),
        /* Ce que le rideau relit pour savoir OÙ la partie s'est
           arrêtée : la nuit du contrat s'arrêtait à l'abordage, elle
           s'arrête maintenant ici. Un drapeau et pas `etat.lieu` —
           `tombeRideau()` ne lit que des drapeaux, et il doit continuer
           à savoir répondre à une sauvegarde plus ancienne.

           CE QUI ÉTAIT PROVISOIRE NE L'EST PLUS (chantier 26) : ce
           `fin: true` est devenu `va: 'appartement'`. Le local disait
           lui-même, en en-tête, que c'est ici que la suite se
           brancherait — troisième fois que le jeu paie cette dette-là,
           après `tribunal-salle.js` (chantier 4) et `retour.js`
           (chantier 28), et toujours de la même façon. */
        flags: ['local-quitte'],   /* nom d'origine gardé : des sauvegardes le portent */
        /* CHANTIER 17 RÉÉCRIT : ce n'est plus l'appartement en dur.
           Il y a maintenant deux lieux d'enquête et une sortie, donc
           un choix, donc une carte. Troisième fois que cette ligne
           change de destination, et la dernière : au-delà, c'est la
           carte qui décide. */
        va: 'carte',
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
                  '« Elle parlait pas fort. Tout le monde croit qu’il faut parler fort pour qu’on t’écoute. Elle, elle parlait comme si t’étais assis à côté d’elle, même quand y avait cent personnes autour. »',
                  '« Elle bossait au pressing en bas de chez elle. Elle disait que c’était bien parce que ça sentait le propre. »',
                  '« Elle est montée sur la scène, à l’Underworld, l’autre soir. Personne lui avait rien demandé. C’est ça qu’elle faisait quand elle avait peur : elle en rajoutait, un tatouage neuf, une idée en l’air, monter là où on la voit. »',
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
                  '« Ils ont demandé si elle enregistrait quelque part. Ils ont demandé que ça. »',
                  '« Pourquoi un enregistrement ? J’en sais rien. J’y pense depuis deux jours. »'],
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
       `dansait` est ouvert dès la première seconde et rend exactement
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
          /* LA MÊME LEÇON, SUR LE BON FAIT. Le principe du sujet ne
             bouge pas — on l'obtient en demandant pour ELLE, jamais
             pour la bande — mais elle ne chantait pas : elle est montée
             danser sur la scène d'un concert qui n'était pas le sien,
             et Psych était dans la fosse (« il est sur la piste de
             danse ou à un concert la plupart du temps »).

             Il sait pour l'enregistrement parce que les elfes du Tír
             sont passés le lui demander — le scénario le dit : « il se
             souvient également qu'ils cherchaient un enregistrement que
             Teresa aurait fait ». */
          id: 'dansait',
          titre: '« Comment elle dansait ? »',
          quand: ({ a }) => !a('psych-paye') && !a('psych-ecoute'),
          flags: ['psych-ecoute'],
          fiches: ['enregistrement-waters'],
          texte: ['Il se redresse sur un coude. C’est le plus grand mouvement qu’il ait fait de la matinée.',
                  '« … Personne me demande jamais ça. »',
                  '« Elle dansait juste. Pas “juste” comme dans en rythme — juste comme dans : au bon endroit. Tu sais quand tu poses un truc et que c’est exactement là qu’il devait être ? »',
                  '« Elle est montée sur la scène, ce soir-là. Personne lui avait rien demandé, le groupe l’a laissée faire, et au bout de dix secondes toute la salle regardait plus qu’elle. »',
                  '« C’est pas de la frime. C’est quelqu’un qui décide qu’on va la voir. »',
                  'Il s’arrête net. Il vient de dire quelque chose qu’il n’avait pas prévu de dire.',
                  '« … Les elfes, ils m’ont demandé ça aussi. Enfin non. Eux ils demandaient un enregistrement qu’elle aurait fait. »',
                  '« Waters. Reginald Waters, un studio à Puyallup, à deux rues de chez elle. C’est là qu’elle l’a tourné. »',
                  '« Il garde tout, ce type. Tout ce qui rentre chez lui, il le garde. »'],
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
                  '« Faites attention avec sa matrice. Il a mis un truc dessus. Il l’a payé cher, il l’a dit à tout le monde, il était très fier. »',
                  '« C’est quoi, le truc ? Aucune idée. Moi les machines… »'],
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
                  '« Ils cherchaient un enregistrement. C’est le seul truc qu’ils ont demandé deux fois. »',
                  '« Je sais pas ce qu’il y a dessus. Je sais même pas s’il existe. »'],
        },
        {
          id: 'duke',
          titre: '« Duke se porte garant. »',
          acteur: 'rabbit',
          quand: ({ a }) => (a('dette-duke') || a('conf-duke') || a('choix-duke')) && !a('nova-parle'),
          flags: ['nova-parle'],
          fiches: ['elfes-du-tir'],
          texte: ['Elle regarde White_Rabbit pour la première fois vraiment.',
                  '« … Duke. Le Duke de la 44e. »',
                  '« C’est le seul en bas de chez moi qui m’appelle Melissa. Il le fait pas méchamment. Il le fait pour que je l’oublie pas. »',
                  'Un temps. Puis elle décide.',
                  '« Trois elfes du Tír, avant-hier, deux heures. Polis. Ils cherchaient un enregistrement — c’est le seul truc qu’ils ont demandé deux fois. »',
                  '« Ils ont laissé une carte sur le comptoir. Elle y est encore. Personne a osé la jeter. »'],
        },
        {
          id: 'porte',
          titre: '« Tu tiens encore la porte. »',
          quand: ({ a }) => a('nova-parle'),
          texte: ['« Faut bien que quelqu’un le fasse. »',
                  '« Quand elle est montée sur cette scène, je me suis mise devant, en bas. Y avait rien à garder, c’était un concert. Mais elle aimait bien savoir que quelqu’un était placé. »',
                  '« Elle se cachait pas, elle. Un nouveau tatouage, une nouvelle idée, un nouveau coup de tête — elle le mettait devant tout le monde, et sur ses propres images en plus. Personne pouvait dire qu’il savait pas. »',
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
                  '« Elle avait rien d’une fille qui se cache, remarquez. Elle disait ce qu’elle pensait, elle montrait ce qu’elle voulait montrer, et elle le postait elle-même. Sa vie était devant tout le monde. »',
                  '« C’est ça, le pire. Personne avait besoin de creuser. Il aurait juste fallu regarder. »',
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
          titre: '« L’ORC pourrait porter ce dossier-là. »',
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
                  '« Ils ont pas aimé la réponse. Eux non plus ils l’ont pas dit. »',
                  '« Qui les envoyait ? Aucune idée. Et croyez-moi, j’ai cherché. »'],
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
