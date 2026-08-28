/* ============================================================
   TABLEAU 10 — LE SHAMELESS. Un club sans enseigne, quelque part entre
   le concert et Loveland.

   CHANTIER 27 — `PLAN_TRAME_ACTES_III_IV.md` § 7.1, RANG 7 DU § 10. La
   troisième et dernière des trois ancres du scénario source : « des
   noctambules ont vu une voiture de luxe qui détonnait dans le
   quartier » → l'amant secret. Troisième tableau de l'acte IV, après le
   local de répétition (28) et l'appartement de Teresa (26).

   ══ LA PRÉMISSE, VÉRIFIÉE AVANT D'ÉCRIRE UNE LIGNE ═══════════════════
   « Entre le concert et chez elle » (SCÉNARIO_SOURCE.md) : ce n'est ni
   Loveland, ni Downtown — un point sur la route, dans Tacoma
   (`carte.js`). Et c'est le QUARTIER qui détonne autour de la voiture,
   pas l'inverse (`PLAN_CARTE_NAVIGATION.md` § 4 bis) : le club lui-même
   n'a rien de doré. C'est un bar sans prétention, dans une rue qui n'en
   a pas non plus — ce qui est exactement ce qui rend une berline corpo
   repérable à un pâté de maisons.

   ══ LE MÊME GESTE QUE `HAYDEN` ET `LESTER-INNOCENT` ═══════════════════
   Deux fiches du même tableau, deux témoins qui ne s'ouvrent pas de la
   même façon (§ 7.1) :

     DENNY  le videur. C'est littéralement son métier de remarquer une
            voiture qui ne devrait pas être là — il n'a besoin d'aucune
            confiance particulière pour le dire, seulement qu'on lui
            pose la bonne question. `voiture-luxe`.
     IRIS   la gérante. Elle protège la mémoire d'une habituée morte,
            pas un secret professionnel — le petit frère de Mark au
            local (28) : elle ne s'achète pas, elle se convainc, et le
            créditube tendu trop tôt ferme la porte pour de bon, comme
            `mark-ferme`. `commlink-coupe`.

   Aucune des deux fiches ne nomme personne, exactement comme `hayden`
   ne nommait qu'un homme et pas ce qu'il avait fait (règle 12). Le
   recoupement, lui, ne nomme toujours pas Hayden — il nomme un
   PROTOCOLE : une voiture qui ne se gare jamais deux fois au même
   endroit, un commlink coupé avant chaque rendez-vous. C'est au local
   (28) que le nom tombe, pas ici.

   ══ CE QUE CE TABLEAU NE FAIT PAS, ET POURQUOI ═══════════════════════
   Il ne construit pas le compteur d'exposition de D9. Le plan
   (`PLAN_TRAME_ACTES_III_IV.md` § 7.4, note du 2026-08-25) dit qu'il
   « devient dû » à ce rang, mais ses trois présages annoncés — « de
   nouvelles brutes arrivent → la planque est localisée → l'exécution
   est tentée » — décrivent Lester exposé DANS UNE PLANQUE. Ce n'est
   plus le cas depuis le chantier 28 : Lester est à McNeil, sous clé, et
   `amis.js` le dit en toutes lettres dans son ouverture. Construire le
   compteur maintenant obligerait à inventer ce que le front Chimera
   menace RÉELLEMENT à l'acte IV — la sécurité du transfert vers la
   seconde audience ? celle des runners eux-mêmes ? — sans que le plan
   ait tranché la question. C'est exactement la même famille d'erreur
   que le chantier 17 d'origine (D11) : coder une prémisse qui ne tient
   plus, plutôt que la vérifier d'abord. Le compteur reste donc noté,
   pas construit — à trancher avant d'écrire, pas en écrivant. */

import { equipiers } from './equipiers.js'

export const shameless = {
  markup: 'scenes/shameless.html',

  acte: 4,

  /* L3, comme au local et à l'appartement. Ni Denny ni Iris n'ont de
     raison de changer de comportement à une seconde visite — ce
     tableau n'est pas surveillé par le Tír (§ 7.4 : seuls l'appartement
     et les amis le sont) — donc le changement est celui, plus sobre,
     d'une porte qui s'ouvre un peu plus vite la deuxième fois. */
  ouverture: ({ a }, visite) => visite > 1 ? [
    'Denny vous reconnaît avant que vous ayez fini de traverser la rue. Il ne dit rien — il s’écarte d’un pas, ce qui pour lui tient de la standing ovation.',
    'Rien n’a changé à l’intérieur. Dans un endroit comme celui-ci, c’est déjà une réponse.',
    'OBJECTIF — reprendre ce qu’on n’a pas obtenu la première fois.',
  ] : [
    'La rue ne paie pas de mine : des rideaux de fer baissés, une supérette qui ferme à vingt-deux heures, et au milieu, une porte noire sans enseigne — un mot peint à la bombe, en lettres qui ont dû être drôles une fois. SHAMELESS.',
    'À l’intérieur, personne ne joue de musique. Chaises sur les tables, un videur qui garde une porte que personne ne pousse, une gérante qui recompte sa caisse pour la troisième fois.',
    'C’est le genre d’endroit qu’on ne remarque qu’en sortant d’ailleurs — après un concert, avant de rentrer. Teresa en sortait, chaque fois, pour remonter à pied jusqu’à Loveland.',
    'OBJECTIF — trouver ce qu’un club sans enseigne peut bien savoir d’une fille qui n’avait, en apparence, aucune raison particulière d’y être.',
  ],

  /* Comme au local et à l'appartement (chantiers 28, 26) : tout ce qui
     change ici se décide PENDANT la visite. `derive()`, pas `entree()` —
     voir la doctrine notée dans ces deux fichiers, elle ne se répète
     pas ici. */
  derive: ({ a, sait }) => {
    const rendus = ['voiture-luxe', 'commlink-coupe'].filter(sait).length
    return [
      rendus === 0 ? 'club-froid' : rendus < 2 ? 'club-entrouvert' : 'club-ouvert',
      ...(a('su:amant-secret') ? ['amant-trouve'] : []),
      ...(a('denny-parle') ? ['denny-parle'] : []),
      ...(a('iris-convaincue') ? ['iris-convaincue'] : []),
      ...(a('iris-fermee') ? ['iris-fermee'] : []),
    ]
  },

  vues: {
    sociale: [
      'Un bar, une piste vide, une régie DJ éteinte dans un coin. Rien de luxueux — du contreplaqué peint en noir, des banquettes reprisées au gaffer.',
      '« Un décor de pauvre pour des gens qui ont de l’argent une fois par semaine. »',
      '« Ça se voit aux détails qu’on n’a pas payés. J’ai tenu une salle comme ça, autrefois. Pas longtemps. »',
    ],
    astrale: [
      'Beaucoup de monde est passé ici sans jamais y être vraiment. Une aura de salle d’attente, empilée nuit après nuit.',
      '« Personne ne vient ici pour l’endroit. »',
      '« Ils attendent quelqu’un. »',
    ],
    ra: [
      'Aucune caméra, aucun tag commercial, un brouilleur artisanal au-dessus du bar qui bave un peu sur les fréquences voisines.',
      '« Le brouilleur est artisanal, et il bave. »',
      '« C’est ça qu’ils vendent. L’alcool, c’est pour la facture. »',
    ],
    materielle: [
      'Une entrée, une sortie, et une arrière-salle qu’on n’a pas vue s’ouvrir. Un videur qui a l’œil sur la rue plus que sur la salle.',
      '« On ne se planque pas ici. On y passe. »',
      '« Le videur regarde la rue, pas la salle. C’est un endroit d’où on part. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('shameless'),

    /* ══ DENNY — le videur. Son métier, pas sa confiance ═══════════════
       Aucun verrou émotionnel : remarquer une voiture qui ne devrait
       pas être là est littéralement sa compétence, comme la table de
       jeu l'est pour Hercules au tripot (chantier 41). Il suffit de
       poser la question qu'un videur attend qu'on lui pose. */
    denny: {
      nom: 'Denny, à la porte',
      regarder: ({ a }) => ({
        tous: a('denny-parle')
          ? ['Bras croisés, il regarde la rue plutôt que vous — il a déjà dit ce qu’il avait à dire, et il n’aime pas le répéter.']
          : ['Un ork imposant, bras croisés, qui regarde la rue plutôt que vous. Ce n’est pas de l’indifférence : c’est le métier. On surveille ce qui rentre en gardant l’air de ne surveiller personne.',
             'Il a le genre de visage qui a arrêté de compter les emmerdes vers la trentième année.'],
        hercules: '« Un videur qui regarde la rue et pas la file, c’est un professionnel. La plupart regardent la file. C’est plus facile et ça sert à rien. »',
        trash: '« Son aura est plate, presque effacée. Vingt ans à ne rien laisser paraître, ça finit par ne plus rien laisser du tout. »',
        rabbit: '« Aucun implant visible. Il compte sur ses yeux et sur son poids. Étonnamment, ça marche encore, la moitié du temps. »',
        drakk: '« Le gardien de la poterne. Il ne demande jamais le mot de passe — il regarde si on en a l’air. »',
      }),
      parler: ({ a }) => {
        if (a('denny-parle'))
          return { tous: 'Il hausse une épaule. « J’ai déjà tout dit. Je le redirai pas deux fois, ça vaudrait plus rien. »' }
        return { texte: [], dialogue: 'denny' }
      },
      utiliser: 'Non. On ne bouscule pas la seule personne qui pourrait vous laisser ressortir aussi.',
      objets: {
        creditube: ({ a }) => a('denny-parle')
          ? { tous: 'Il regarde le tube, puis vous. « Trop tard. J’ai déjà causé gratuitement, compagnon. Range ça. »' }
          : { tous: 'Il ne le prend pas — pas encore. « Cause d’abord. On verra après si ça vaut quelque chose. »' },
        arme: 'Non. Pas devant le seul homme entre vous et la rue.',
      },
    },

    /* ══ IRIS — la gérante. Le petit frère de Mark ═════════════════════
       Même grammaire que Mark au local (28) : elle s'ouvre en parlant
       d'ELLE, jamais en payant, et le créditube tendu trop tôt ferme la
       porte pour de bon — `iris-fermee`, la même faute au même prix que
       `mark-ferme`. */
    iris: {
      nom: 'Iris, derrière le bar',
      regarder: ({ a }) => ({
        tous: a('iris-fermee')
          ? ['Elle essuie le même verre depuis cinq minutes. Elle ne vous regarde plus quand vous parlez.']
          : a('iris-convaincue')
            ? ['Elle a arrêté de compter sa caisse. Elle vous écoute, maintenant, un chiffon à la main qu’elle ne repose pas.']
            : ['Une femme d’une quarantaine d’années, en train de recompter une caisse qui doit être juste depuis la première fois. Elle vous a jaugés avant que la porte finisse de se refermer.',
               'Elle a le genre de politesse qu’on apprend en servant des inconnus pendant vingt ans — utile, jamais chaleureuse.'],
        hercules: a('iris-fermee')
          ? '« On vient de perdre la seule personne de cette pièce qui savait vraiment quelque chose. Beau travail. »'
          : '« Elle compte sa caisse trois fois par soir. Ça, ou elle compte autre chose et la caisse lui sert de prétexte. »',
        trash: '« Son aura se referme chaque fois qu’on approche du bar. Elle protège quelque chose qui est déjà mort, et elle le sait. »',
        rabbit: '« Zéro terminal de paiement visible. Tout se règle en liquide, ici. C’est un choix, pas une négligence — le liquide ne laisse pas de journal. »',
        drakk: '« La tavernière qui a enterré plus de clients qu’elle n’en a servis, et qui continue de servir quand même. Je connais cette patience. »',
      }),
      parler: ({ a }) => a('iris-fermee')
        ? { tous: 'Elle ne lève pas les yeux du verre. « J’ai plus rien à vous dire. Vous avez eu votre chance. »' }
        : { texte: [], dialogue: 'iris' },
      utiliser: 'Non. C’est une gérante derrière son bar, pas un obstacle.',
      objets: {
        /* LA MÊME FAUTE QU'AU LOCAL, AU MÊME PRIX — et sans condition
           sur `iris-convaincue`, exactement comme `mark.objets.creditube`
           (amis.js) ne vérifie jamais `mark-convaincu` : offrir de
           l'argent est une faute en soi, qu'elle ait déjà parlé ou non. */
        creditube: ({ a }) => a('iris-fermee')
          ? { tous: 'Elle ne le regarde même pas. « C’est réglé, ça. Rangez-le. »' }
          : { tous: ['Tu poses le créditube sur le bar, entre vous deux.',
                     'Elle le regarde longtemps, plus longtemps qu’il n’en faudrait pour compter deux mille nuyens.',
                     ['iris', '« … Elle venait ici pour qu’on la laisse tranquille. Et vous, la première chose que vous faites, c’est lui remettre un prix sur le dos. »'],
                     'Elle repousse le tube sans le toucher, et reprend son chiffon.'],
              hercules: '« Reprends ça. Range-le, tout de suite. »',
              trash: '« Elle ne nous devait rien, et on vient de le lui rappeler de la pire façon possible. »',
              rabbit: '« … Je viens de comprendre pourquoi les gens détestent qu’on les prenne pour des distributeurs. »',
              drakk: '« On n’achète pas un deuil. On ne fait que le vexer plus vite. »',
              flags: ['iris-fermee'] },
        bouteille: 'Elle hausse un sourcil. « C’est moi qui vends ça, ici. »',
        arme: 'Non. Pas sur la seule personne qui contrôle qui rentre et qui sort de cette salle.',
      },
    },

    /* ══ L'ALCÔVE — la banquette du fond, où elle s'asseyait ═══════════
       Émotionnel, sans rendement mécanique — même rôle que `micro` au
       local (28) : sans cette cible, rien d'autre dans la pièce ne pèse. */
    alcove: {
      nom: 'L’alcôve du fond',
      regarder: ({ a }) => ({
        tous: a('su:amant-secret')
          ? ['La banquette du fond, dos au mur, face à la porte — la seule place de la salle d’où on voit tout le monde entrer avant d’être vu soi-même.',
             'On ne s’assoit pas là par hasard. On s’assoit là quand on a une raison de surveiller qui arrive.']
          : ['Une banquette dans l’angle le plus sombre de la salle, en velours élimé, dos au mur.',
             'Le cuir est plus tassé à cet endroit précis qu’ailleurs. Quelqu’un s’y asseyait souvent, et toujours de la même façon.'],
        hercules: '« La meilleure place de la maison, et personne ne la réserve jamais officiellement. Ça se garde autrement, une place comme ça. »',
        trash: ['« Il reste quelque chose ici. Pas beaucoup. De l’attente. »', '« Elle a passé plus de temps à espérer qu’à parler, sur cette banquette. »'],
        rabbit: '« Angle mort des deux seules caméras de la rue, à travers la vitrine. On ne choisit pas cette place par goût du velours. »',
        drakk: '« Le siège du guetteur, dans toute bonne taverne. On y voit la porte, on n’y est vu par personne d’autre. »',
      }),
      utiliser: {
        tous: 'Tu t’assois une seconde. La vue donne exactement sur la porte, et sur rien d’autre.',
        drakk: '« … Je comprends pourquoi elle aimait cette place. »',
      },
    },

    /* ══ LE MUR DE FLYERS — l'écho du local, dans un miroir déformant ══
       Même motif que `mur` chez les amis (28) : la musique comme fil
       commun. Ici, un coin arraché dit ce que personne n'a eu besoin de
       dire à voix haute. */
    mur: {
      nom: 'Le mur de flyers',
      regarder: {
        tous: ['Des années de concerts, collées en couches, et des polaroïds de clients punaisés par-dessus — le genre de mur que chaque bar de quartier a fini par se donner, un jour ou l’autre.',
               'Un coin, à hauteur d’yeux, a été arraché proprement. Pas déchiré — décollé, avec soin, en laissant les photos voisines intactes.'],
        hercules: '« On n’arrache pas une photo par accident, et surtout pas aussi proprement. Quelqu’un a fait le ménage, ici, avant nous. »',
        trash: '« Une place vide sur un mur plein, c’est une absence qui a une forme. Quelqu’un savait exactement ce qu’il fallait retirer. »',
        rabbit: '« Pas de trace numérique — ces photos n’ont jamais existé qu’en papier. Ce qui les a fait disparaître n’a laissé aucun journal, nulle part. »',
        drakk: '« La tapisserie amputée d’un blason. On ne l’efface pas par négligence : on l’efface parce qu’il désignait quelqu’un. »',
      },
      utiliser: {
        tous: 'Tu ne décolles rien de plus. Ce mur a déjà perdu ce qu’il avait à perdre.',
      },
    },

    /* ══ LA RÉGIE ET LA PISTE — le décor, muet ═════════════════════════ */
    piste: {
      nom: 'La piste et la régie éteinte',
      regarder: {
        tous: ['Une petite piste, vide, et une régie DJ éteinte dans un coin — un club qui ne joue de musique qu’une partie de la nuit.',
               'Les chaises sont montées sur les tables. Le ménage est fait pour une soirée qui n’a pas encore commencé.'],
        hercules: '« Petite salle, petite jauge, gros prix d’entrée. C’est comme ça qu’on garde un endroit exclusif sans jamais avoir l’air de le vouloir. »',
        trash: '« Elle venait pour le concert d’avant, pas pour celui-ci. Ce club n’était qu’une étape, pour elle. Un endroit où finir la nuit, pas un endroit où la commencer. »',
        rabbit: '« Aucune balise sur le matériel. Tout est débranché du réseau — même la sono. C’est délibéré, à ce point-là. »',
        drakk: '« Une salle de banquet entre deux fêtes. Le silence, ici, n’est jamais définitif — il est en pause. »',
      },
      utiliser: {
        tous: 'Tu ne touches pas au matériel de quelqu’un d’autre.',
      },
    },

    /* ══ L'ARDOISE — le comptoir tient les comptes, et pas seulement
       les siens. Objet, pas meuble — convention « une chose du monde,
       une seule cible » (voir amis.js). Aucune fiche : c'est une
       texture, pas un fait à charger dans le carnet. ═══════════════════ */
    ardoise: {
      nom: 'L’ardoise, derrière le bar',
      regarder: {
        tous: ['Une ardoise noire, des noms à la craie, des chiffres effacés au coin d’un doigt et réécrits par-dessus.',
               'Un nom, tout en haut, n’a jamais de solde. « T. » — rien d’autre. Chaque semaine, la ligne repasse à zéro sans qu’on la voie payer.'],
        hercules: '« Une ardoise qui se règle toute seule, chaque semaine, sans jamais qu’on voie de main la régler. Ça, dans mon métier, ça a un nom : un compte tiers. »',
        trash: '« Quelqu’un payait pour elle sans qu’elle le sache, ou sans qu’elle le dise. Les deux se ressemblent, de loin. »',
        rabbit: '« Aucun horodatage, aucun registre — de la craie sur de l’ardoise, exprès pour qu’il n’en reste rien le lendemain. »',
        drakk: '« Une dette d’honneur, réglée par un tiers anonyme. Dans mes livres, ça s’appelle un protecteur. Ou un geôlier. Le mot dépend de qui tient la craie. »',
      },
      utiliser: {
        tous: 'Tu ne touches pas à l’ardoise d’un bar qui n’est pas le tien.',
      },
    },

    /* ══ LA PORTE — la sortie ═══════════════════════════════════════════
       Aucune surveillance du Tír ici (§ 7.4 : seuls l'appartement et les
       amis le sont) — donc pas de `tir-prevenu` à ce tableau. La sortie
       rend simplement la main à la carte, comme au local et à
       l'appartement. */
    porte: {
      nom: 'La porte noire',
      sortie: 'carte',
      regarder: {
        tous: ['La porte par laquelle vous êtes entrés.',
               'Dehors, la rue est exactement aussi grise qu’à l’arrivée.'],
        drakk: '« Une seule sortie, comme une seule entrée. Ce lieu n’a jamais eu l’intention de retenir personne. Seulement de ne rien laisser paraître. »',
      },
      utiliser: {
        tous: 'Vous ressortez du Shameless. La porte noire se referme derrière vous, sans un bruit — elle est faite pour ça.',
        va: 'carte',
      },
    },
  },

  dialogues: {

    /* ══ DENNY ═══════════════════════════════════════════════════════
       Trois sujets, aucune garde émotionnelle : on lui pose la question
       qu'un videur attend, et il répond parce que c'est son métier de
       remarquer, pas parce qu'on l'a convaincu de quoi que ce soit. */
    denny: {
      qui: 'denny',
      accueil: ['Il ne se retourne qu’à moitié.',
                '« C’est fermé. »'],
      retour: ['« Encore vous. »'],
      sujets: [
        {
          id: 'motif',
          titre: '« On cherche pas à entrer. On cherche une fille qui venait ici. »',
          texte: ['Il vous regarde vraiment, cette fois.',
                  '« Ça dépend de la fille. »'],
        },
        {
          id: 'voiture',
          titre: '« Il se passe des trucs inhabituels, dehors, en ce moment ? »',
          flags: ['denny-parle'],
          fiches: ['voiture-luxe'],
          texte: ['Il hausse enfin les épaules, et pour la première fois il a l’air presque intéressé.',
                  '« Une bagnole. Une vraie, une corpo, vitres teintées, qui vient se garer en double file devant CHEZ MOI. Une fois par semaine, toujours à la même heure. »',
                  '« Personne d’autre dans ce quartier roule là-dedans sans dette. J’ai jamais vu le visage du chauffeur — la fille montait dedans, et c’est tout. »',
                  '« On remarque ce genre de truc. »',
            '« Après, ce qu’il y avait dedans, j’en sais rien. J’ai jamais regardé de près. On regarde pas de près, ici. »'],
        },
        {
          id: 'depuis-quand',
          titre: '« Depuis combien de temps ? »',
          quand: ({ a }) => a('denny-parle'),
          texte: ['« Trois, quatre mois. Jamais deux fois de suite le même soir de la semaine, remarquez. »',
                  '« Comme si quelqu’un changeait l’horaire exprès pour que je m’habitue pas. »'],
        },
        {
          id: 'assez',
          titre: '(Le laisser à sa porte.)',
          fin: true,
          texte: ['Il se retourne vers la rue, et reprend sa faction.'],
        },
      ],
    },

    /* ══ IRIS ═══════════════════════════════════════════════════════
       Même dispositif que Mark au local (28) : `elle` ouvre en parlant
       d'ELLE, jamais en payant. `commlink` ne s'ouvre qu'une fois
       `iris-convaincue` posé — visible-et-refusé avant, jamais caché,
       comme `nom-refus` chez Mark. */
    iris: {
      qui: 'iris',
      accueil: ['Elle ne lève pas les yeux de sa caisse.',
                '« Vous buvez, ou vous demandez ? »'],
      retour: ['« Quoi encore. »'],
      sujets: [
        {
          id: 'habituee',
          titre: '« Teresa Banks. Elle venait ici. »',
          texte: ['Elle repose son chiffon, une seconde de trop pour que ce soit anodin.',
                  '« … Ouais. Elle venait. »',
                  '« Vous êtes de la Star, ou vous cherchez juste à vous faire de l’argent sur son dos ? »'],
        },
        {
          id: 'elle',
          titre: '« Parlez-nous d’elle. Pas de ce qu’elle cachait — d’elle. »',
          quand: ({ a }) => !a('iris-convaincue') && !a('iris-fermee'),
          flags: ['iris-convaincue'],
          texte: ['Elle repose vraiment le chiffon, cette fois.',
                  '« … Personne demande ça. Personne, en trois jours. »',
                  '« Elle arrivait tard, toujours après le concert d’à côté. Elle commandait jamais rien de cher. Elle laissait de bons pourboires les soirs où elle avait l’air triste, et des mauvais les soirs où elle avait l’air bien. »',
                  '« Elle me parlait de rien d’important. C’était déjà beaucoup, pour une habituée. La plupart, ils vous parlent jamais que d’eux. »'],
        },
        {
          id: 'qui-elle-voyait-refus',
          titre: '« Qui elle venait retrouver ? »',
          quand: ({ a }) => !a('iris-convaincue') && !a('iris-fermee'),
          texte: ['« Ça, c’est pas à moi de le dire. »',
                  'Elle reprend sa caisse, et ne relève plus les yeux.',
                  '« Vous êtes venus chercher un ragot. Tout le monde vient chercher un ragot. »'],
        },
        {
          id: 'commlink',
          titre: '« Qui elle venait retrouver ? »',
          quand: ({ a }) => a('iris-convaincue') && !a('iris-fermee'),
          fiches: ['commlink-coupe'],
          texte: ['Long silence. Elle regarde la porte, puis vous.',
                  '« Chaque fois qu’elle sortait le retrouver, elle coupait son commlink ici, au bar, devant moi. Pas dans la rue — ICI, devant témoin, comme si elle voulait que quelqu’un le voie faire. »',
                  '« Je lui ai demandé une fois pourquoi. Elle m’a dit : “Pas pour moi.” »',
                  '« “Pour lui.” C’est tout ce qu’elle a dit. Et elle avait l’air presque fière de le faire, allez savoir. »'],
        },
        {
          id: 'assez',
          titre: '(La laisser à sa caisse.)',
          fin: true,
          texte: ['Elle reprend son chiffon, et le même verre qu’elle essuie depuis le début.'],
        },
      ],
    },
  },
}
