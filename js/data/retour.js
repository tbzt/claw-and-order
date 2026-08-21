/* ============================================================
   TABLEAU 4 — LE RETOUR. Le pont du voilier, 5 h.

   Au texte : « repartir avec le passeur » — sauf que le passeur est mort
   dans sa cabine et que c'est vous qui tenez la barre. La patrouille
   fluviale de la Star existe au scénario (« le capitaine Williams est
   persuadé d'avoir vu quelque chose de bizarre »), et Toralf est un
   sniper à formation militaire qui a déjà raté une fois.

   C'EST LE TABLEAU QUI ENCAISSE (voir TRAME.md § 5).
   Rien ici n'est un obstacle neuf. Tout ce qui arrive a été déclenché
   deux tableaux plus tôt :

     trace-matricielle  → la vedette de la Star EXISTE. Sinon elle passe.
     contrat            → il couvre le transfert… sauf si l'ordre a été
                          réécrit, auquel cas il contredit le registre.
                          Un choix mord l'autre : c'est le cœur du tableau.
     sait-toralf        → on sait qui attend, et à quoi il ressemble.
     sait-perchoir      → Drakk sait OÙ, sans avoir à chercher.
     esprit-eau         → elle est encore sous la coque.
     arme               → le pistolet d'un mort, et il est traçable.

   > RÈGLE 19 — Une conséquence ajoute, elle ne retire jamais.
   > Les trois issues du goulet sont trois ÉTATS de ce tableau, jamais
   > trois tableaux. Aucune chaîne n'est requise pour passer : on passe
   > toujours. Ce qui change, c'est ce qu'on emporte de l'autre côté.

   > RÈGLE 17 — Perdre coûte un état, jamais la partie.
   > Passer le goulet à découvert ne tue personne. Ça écorche Lester, et
   > `lester-blesse` se paiera à la planque et à l'audience.
   ============================================================ */

import { equipiers } from './equipiers.js'

export const retour = {
  markup: 'scenes/retour.html',

  /* SENS DU DANGER (Hercules, `signature: 'sens-du-danger'`, equipe.js).
     Un adepte le ressent SANS détail — la fiche insiste sur ce point, et
     c'est ce qui en fait un beat d'ambiance et pas un indice : il ne
     pointe ni Toralf, ni le perchoir, ni rien. `retour` est le seul
     tableau du jeu bâti entier autour d'une menace encore cachée à
     l'entrée (voir l'en-tête du fichier) ; c'est pour ça qu'il porte le
     premier branchement de `signature`, et pas les quatre autres décors.
     Gardé par `goulet-passe` : une fois le danger encaissé, le pressentir
     encore serait un mensonge du moteur. */
  ouverture: ({ a, qui }) => [
    'Le voilier a repris la mer avec un passager de plus. McNeil s’efface derrière la pluie.',
    a('esprit-eau')
      ? 'La coque ne tape pas. Elle glisse, et personne à bord n’a envie de demander pourquoi.'
      : 'La coque tape à contretemps. Il pleut depuis McNeil et ça ne s’arrêtera pas avant Tacoma.',
    'Lester est assis contre le rouf, dos à la cabine où Wilson est mort. Personne ne le lui a dit.',
    ...(qui === 'hercules' && !a('goulet-passe') ? [
      'Hercules se tait au milieu d’une phrase qu’il n’avait pas commencée.',
      ['hercules', '« Quelque chose ne va pas, droit devant. Je ne sais pas quoi. Je préfère ne pas le savoir avant que ce soit fini. »'],
    ] : []),
    a('trace-matricielle')
      ? 'OBJECTIF — franchir le goulet et rejoindre Tacoma. Un projecteur vient de s’allumer derrière vous.'
      : 'OBJECTIF — franchir le goulet et rejoindre Tacoma. Quatre cents mètres où l’on ne peut pas manœuvrer.',
  ],

  /* La vedette et l'esprit ne sont pas des surprises : ce sont des
     conséquences. On les pose au chargement, à partir de ce que le
     joueur a fait ailleurs. */
  entree: ({ a }) => [
    ...(a('trace-matricielle') ? ['vedette'] : []),
    ...(a('esprit-eau') ? ['esprit'] : []),
  ],

  vues: {
    astrale: ['L’eau n’a pas de mémoire. Ce qui flotte dessus en a.',
              '« Le gamin a peur, et il a raison. Mais il y a plus froid que lui, droit devant. »'],
    ra: ['Le large est propre. Pas de réclame, pas de spam, quatre icônes en tout.',
         '« C’est la première fois de la nuit que je vois clair. Et c’est exactement le problème : nous aussi, on se voit. »'],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js).

       Chacun a une ligne dans la voix de chacun des trois autres. */

    ...equipiers('retour'),


    /* ══ LESTER ═══════════════════════════════════════════════════════
       Son sprite existait depuis le début du projet et n'avait jamais
       été à l'écran. Il a vingt ans et il en paraît seize. */
    lester: {
      nom: 'Lester',
      regarder: {
        tous: ['Il s’est assis contre le rouf dès qu’on l’a fait monter, et il n’a pas bougé depuis.',
               'Combinaison de détention, deux tailles trop grande. Il tient ses coudes.'],
        hercules: '« Il n’a pas demandé où on allait. Un gamin qui ne demande pas, c’est un gamin qui a déjà été déplacé plusieurs fois. »',
        trash: '« Son aura est petite. Serrée sur elle-même, comme quelqu’un qui essaie de prendre moins de place. »',
        rabbit: ['« Vingt ans. Ork. Aucun SIN, donc aucune existence, donc aucun avocat commis d’office avant l’ORC. »',
                 '« … »',
                 '« Nous, les orks, … non. Rien. »'],
        drakk: '« Il ne demande rien et il ne remercie pas. Un otage bien élevé. Ça me déplaît. »',
      },
      parler: { texte: [], dialogue: 'lester' },
      utiliser: 'On ne le touche pas. Il a passé la nuit à être déplacé par des mains.',
      objets: {
        /* ══ LE PAIEMENT DE LA BOUTEILLE ═══════════════════════════════
           Achetée au Claw & Order, six heures et deux tableaux plus tôt.
           Elle n'ouvre RIEN — la confiance de Lester ne s'achète pas
           (G5, règle 5). Elle donne à Drakk la seule chose que sa fiche
           réclame depuis le début : « sa vie de solitaire le lasse, il
           souhaiterait avoir des amis pour former une vraie guilde ». */
        bouteille: ({ a }) => a('guilde')
          ? { tous: 'La bouteille est à moitié vide et elle circule toujours.',
              drakk: '« Elle tiendra jusqu’à Tacoma. Les bonnes compagnies boivent lentement. »' }
          : { tous: ['Drakk prend la bouteille des mains de qui la tenait, l’ouvre avec les dents, et boit une gorgée.',
                     'Puis il la tend à Lester. Pas au groupe : à Lester.',
                     'Le gamin la regarde comme un piège, prend une gorgée minuscule, et tousse.',
                     'Elle fait le tour du pont. Personne ne dit rien d’important.',
                     'Pendant quatre minutes, cinq personnes trempées font autre chose que fuir.'],
              drakk: ['« Voilà. C’est ça. »',
                      '« Une compagnie, ça se scelle. Pas par un serment — par une bouteille et une mauvaise nuit. »',
                      '« Nous en sommes une, maintenant. Vous pouvez faire semblant de l’ignorer. »'],
              trash: '« Il attendait ça depuis le bar. Je crois qu’il attendait ça depuis plus longtemps que le bar. »',
              hercules: '« Trente ans que je fais ce métier et c’est la première fois qu’on me fait entrer dans une guilde. »',
              rabbit: '« … je l’ai payée. Ça compte, non ? »',
              flags: ['guilde'],
              fiches: ['guilde'] },
        arme: 'Non. Pas devant lui, et pas cette nuit.',
      },
    },

    /* ══ LA BARRE — le verrou du tableau ══════════════════════════════ */
    barre: {
      nom: 'La barre',
      regarder: {
        tous: ['La barre franche, et le goulet droit devant : quatre cents mètres entre deux pointes de terre.',
               'C’est le seul endroit du trajet où l’on ne peut ni virer ni faire demi-tour.'],
        drakk: '« Un défilé. Encore un. Celui-ci avance tout seul, ce qui est pire. »',
        rabbit: '« Chenal 12. Une seule route possible, et elle est sur toutes les cartes. »',
      },
      utiliser: ({ a }) => {
        if (a('goulet-passe')) return 'C’est derrière nous.'

        /* La vedette bloque tant qu'elle n'est pas réglée. Elle n'existe
           que si l'ordre a été réécrit au greffe. */
        const patrouilleReglee = a('vedette-reglee') || a('vedette-tiede') ||
                                 (a('feux-eteints') && a('muet'))
        if (a('trace-matricielle') && !patrouilleReglee)
          return { tous: ['Tu pousses la barre. Le projecteur te suit sans hésiter d’un mètre.',
                          'Ils ne cherchent pas un bateau au hasard. Ils cherchent celui-là.'],
                   hercules: '« On ne sème pas une vedette de vingt-huit pieds avec un voilier de huit mètres. Il va falloir leur parler, ou disparaître. »',
                   rabbit: '« Tant qu’on émet, on est un point sur leur carte. »' }

        const abri = a('abri')
        const commun = ['La barre à droite toute. Les deux pointes de terre se referment.',
                        'Quatre cents mètres. Personne ne parle.']

        /* On passe TOUJOURS. Ce qui change, c'est ce qu'on emporte. */
        if (abri)
          return { tous: [...commun,
                          'Un claquement sec sur le rouf, à hauteur d’épaule. Puis un deuxième, dans l’eau.',
                          'Personne n’était debout devant.',
                          'Trois cents mètres plus loin, la terre s’écarte et le bruit s’arrête. Tacoma est devant.'],
                   drakk: '« Deux tirs. Il n’en avait que deux à donner avant qu’on sorte de sa portée. Il le savait aussi. »',
                   trash: '« Il n’a pas visé le bateau. Il a visé la place où le gamin était assis. »',
                   flags: ['goulet-passe', 'toralf-manque'],
                   fiches: ['toralf-vise-lester'],
                   minutes: 10, va: 'planque' }

        return { tous: [...commun,
                        'Un claquement sec, et Lester tombe en avant sans un bruit.',
                        'Il se relève seul. Sa manche est ouverte du coude à l’épaule et elle rougit vite.',
                        '« C’est rien », dit-il, ce qui est faux, et personne ne le corrige.',
                        'Trois cents mètres plus loin, la terre s’écarte. Tacoma est devant.'],
                 hercules: '« On aurait dû le mettre derrière quelque chose. C’est ma faute et je la retiens. »',
                 drakk: '« J’ai vu le poste. Je n’ai pas donné l’ordre. C’est pire que de ne pas voir. »',
                 flags: ['goulet-passe', 'lester-blesse'],
                 fiches: ['toralf-vise-lester'],
                 minutes: 10, va: 'planque' }
      },
    },

    /* ══ LA VEDETTE — l'encaissement de `trace-matricielle` ═══════════ */
    vedette: {
      nom: 'La vedette de la Lone Star',
      regarder: ({ a }) => ({
        tous: ['Une vedette de patrouille, feux bleus en veille, projecteur allumé. Elle tient la distance sans chercher à réduire.',
               'Elle ne vous arraisonne pas. Elle vous accompagne.'],
        hercules: a('trace-matricielle')
          ? '« Elle nous suit depuis la sortie de McNeil. Ce n’est pas une ronde. Quelqu’un l’a envoyée. »'
          : '« Une ronde. Elle passe. »',
        rabbit: ['« Elle interroge notre transpondeur toutes les quarante secondes. »',
                 '« Et elle a déjà la réponse. Elle vérifie juste qu’on ne l’a pas changée. »'],
        drakk: '« Une galère de guet. Plus rapide, mieux armée, et elle a l’avantage du vent. »',
        trash: '« Il y a quatre personnes à bord et aucune n’a peur. Ce n’est pas bon signe pour nous. »',
      }),
      parler: { texte: [], dialogue: 'vedette' },
      utiliser: {
        tous: 'Elle est à deux cents mètres. On ne l’atteint pas d’ici.',
        drakk: '« Trop loin pour la lame, trop près pour l’oubli. »',
      },
      objets: {
        /* Le contrat couvre le transfert — SAUF si on a réécrit l'ordre.
           Le choix du greffe mord ici, et c'est tout le sujet. */
        contrat: ({ a }) => a('trace-matricielle')
          ? { tous: ['Tu brandis le contrat vers le projecteur. Ils le lisent — ils ont de quoi lire à cette distance.',
                     'Silence radio pendant vingt secondes.',
                     '« Votre prestation est enregistrée. Le mouvement du détenu, lui, est enregistré à huit heures. »',
                     '« Vous transportez quelqu’un que le registre dit encore à McNeil. Coupez les moteurs. »'],
              hercules: '« Le papier est bon. C’est l’heure qui est fausse, et c’est nous qui l’avons faussée. »',
              rabbit: '« … oui. C’est moi. »',
              flags: ['star-nous-connait'] }
          : { tous: ['Tu brandis le contrat. Le projecteur s’attarde dessus.',
                     '« Prestation de sécurité indépendante, contresignée brigade criminelle. Bon transfert. »',
                     'La vedette met la barre à gauche et rentre dans la pluie.'],
              hercules: '« Voilà. Du papier. Il n’y a jamais rien eu de plus dangereux qu’un homme avec le bon papier. »',
              flags: ['vedette-reglee'], visuels: ['vedette-partie'] },
        arme: 'On ne sort pas une arme devant une patrouille de police. Jamais, et surtout pas cette nuit.',
      },
    },

    /* ══ LE COFFRET — disparaître ═════════════════════════════════════ */
    feux: {
      nom: 'Le coffret de bord',
      regarder: {
        tous: ['Un coffret d’interrupteurs vissé près de la barre. Deux voyants : feu bâbord, feu tribord.',
               'Les feux de navigation sont obligatoires. C’est bien pour ça qu’ils sont visibles à mille mètres.'],
        rabbit: '« Les feux, je peux les couper d’ici. Le transpondeur, non : il faut que je rentre dedans. »',
        drakk: '« Éteindre ses propres lanternes. Voilà une ruse de couard, et une bonne. »',
      },
      utiliser: ({ a }) => a('feux-eteints')
        ? 'Ils sont éteints. Le bateau est un trou dans l’eau.'
        : { tous: ['Deux interrupteurs. Le rouge s’éteint, puis le vert.',
                   'Le pont devient noir et la mer devient plus grande.'],
            trash: '« On vient de disparaître pour les yeux. Pas pour le reste. »',
            flags: ['feux-eteints'], visuels: ['feux-eteints'] },
    },

    transpondeur: {
      nom: 'Le transpondeur',
      regarder: {
        tous: 'Une fiche ambrée collée au mât : VOILIER — W. WILSON — ÉMET.',
        rabbit: ['« Il émet le nom d’un mort toutes les quarante secondes depuis qu’on a quitté le ponton. »',
                 '« Je peux le faire mentir. Je ne peux pas le faire taire : un bateau muet, ça se remarque plus qu’un bateau qui ment. »'],
        trash: '« Je vois une étiquette. Ce n’est pas mon plan. »',
      },
      utiliser: ({ a, qui }) => {
        if (a('muet')) return 'Il raconte maintenant qu’on est un chalutier de Gig Harbor. Personne n’a rien à redire.'
        if (qui !== 'rabbit')
          return { tous: 'Il faudrait entrer dans le boîtier, et il faut un deck pour ça.',
                   hercules: '« Ce n’est pas mon rayon. C’est le sien, et il le sait déjà. »',
                   drakk: '« Sorciers de la Matrice, prêtez-moi votre sagesse. »' }
        return { tous: ['White_Rabbit pose deux doigts sur son deck et ne bouge plus pendant quarante secondes.',
                        'La fiche clignote une fois. CHALUTIER — GIG HARBOR — ÉMET.',
                        'Le nom du mort a disparu de la nuit.'],
                 rabbit: '« Ce n’est pas propre. C’est le mot juste : ce n’est pas PROPRE. Mais ils ne cherchent plus nous. »',
                 flags: ['muet'], visuels: ['muet'] }
      },
    },

    vhf: {
      nom: 'La VHF',
      regarder: {
        tous: ['Canal 16 allumé, et un deuxième canal qui grésille en dessous — un canal de service.',
               'Hercules a laissé le micro sur ses genoux depuis Tacoma. Il ne l’a pas lâché de la nuit.'],
        hercules: '« Une voix, c’est encore ce qui se falsifie le mieux. Il n’y a qu’à ne pas mentir sur ce qui se vérifie. »',
        rabbit: '« Je peux masquer une machine. Je ne peux pas masquer un homme qui répond mal à une question simple. »',
      },
      utiliser: ({ a, qui }) => {
        if (!a('trace-matricielle'))
          return { tous: 'Le canal 16 est calme. Personne ne demande rien à personne.',
                   drakk: '« Le cor se tait. J’aime autant. »' }
        if (a('vedette-reglee')) return 'Ils sont repartis. N’appelle pas pour dire bonsoir.'
        if (qui !== 'hercules')
          return { tous: 'Si tu décroches, il faudra répondre. Tu n’as rien à répondre.',
                   trash: '« On m’entendrait mentir. »',
                   rabbit: '« Une voix, ça ne se falsifie pas en quarante secondes. »',
                   drakk: '« Je dirais la vérité. C’est mon défaut. »' }
        return { tous: ['Hercules décroche, s’éclaircit la gorge, et prend un ton d’homme qu’on dérange.',
                        '« Sunnyside quatre-deux, on rentre au chantier. Vous voulez le numéro de coque ou vous préférez qu’on se voie au port ? »',
                        'Trois secondes.',
                        '« … Restez sur le 16. »',
                        'Le projecteur ne s’éteint pas, mais il cesse de suivre.'],
                 hercules: '« Ils ne sont pas convaincus. Ils sont occupés. C’est presque aussi bien et ça coûte moins cher. »',
                 flags: ['vedette-tiede'] }
      },
    },

    canal: {
      nom: 'Le canal de service de la Star',
      regarder: {
        tous: 'Une fiche rouge : LONE STAR — CANAL DE SERVICE. Chiffré, mais il est là.',
        rabbit: ['« Chiffrement de service, celui qu’on renouvelle une fois par an quand on y pense. »',
                 '« Ils demandent confirmation d’un mouvement de détenu. À McNeil. Qui ne répond pas, parce qu’il est cinq heures du matin. »',
                 '« On a peut-être vingt minutes avant que quelqu’un se réveille. »'],
      },
      utiliser: {
        tous: 'On écoute. On n’émet pas là-dessus.',
        rabbit: '« Répondre sur leur canal, c’est signer. Non. »',
      },
    },

    /* ══ TORALF — l'encaissement de `sait-toralf` et `sait-perchoir` ══ */
    tireur: {
      nom: 'Un angle, au-dessus du goulet',
      regarder: ({ a, qui }) => ({
        tous: 'Sur la pointe de gauche, un rectangle rouge cerne un surplomb. Rien ne bouge dedans.',
        drakk: a('sait-perchoir')
          ? ['« C’est le même poste qu’au port. Le seul endroit d’où l’on voit tout sans être vu. »',
             '« Il n’y était pas. Il y est. »',
             '« Quatre cents mètres, un bateau qui ne peut pas dévier. Moi, je serais là. Donc il est là. »']
          : ['« Là-haut. Si j’avais à tenir ce goulet, je me mettrais là. »',
             '« Je ne dis pas qu’il y a quelqu’un. Je dis que c’est l’endroit. »'],
        hercules: a('sait-toralf')
          ? '« Un grand blond qui marche au lieu de courir. Le pêcheur nous l’a vendu deux mille. C’est la meilleure dépense de la nuit. »'
          : '« Un surplomb. Il y en a des dizaines sur cette côte. »',
        trash: '« Il fait froid, là-haut. Plus froid que la pluie. Quelqu’un attend depuis longtemps et ne pense à rien. »',
        flags: (qui === 'drakk' && a('sait-perchoir')) ? ['sait-ou'] : undefined,
      }),
      utiliser: {
        tous: 'Quatre cents mètres d’eau noire. On ne va pas là-bas.',
        drakk: '« On ne quitte pas le pont pour aller voir la falaise. On l’a déjà dit une fois cette nuit. »',
      },
      objets: {
        /* L'arme de Wilson : prise sur un mort au tableau 2, jamais
           utilisable jusqu'ici, et il vaut mieux qu'elle le reste. */
        arme: {
          tous: ['Tu sors le pistolet pris sur Wilson. Quatre cents mètres, de nuit, depuis un pont qui bouge.',
                 'Tu le remets où il était.'],
          drakk: '« Cette arme a déjà servi cette nuit, et pas à toi. Elle porte un nom, et ce n’est pas le nôtre. »',
          rabbit: '« Numéro de série sur un mort de la marina. Si elle tire, c’est Wilson qui tire. »',
          hercules: '« Rangez ça. On est en règle jusqu’à présent, et c’est notre seul luxe. »',
        },
      },
    },

    'ligne-de-tir': {
      nom: 'Le goulet, en plan',
      regarder: {
        tous: 'Une bande rouge barre le chenal sur toute sa largeur : quatre cents mètres sans couvert.',
        drakk: ['« On ne peut ni virer, ni accélérer, ni se coucher : on est huit mètres de bois sur de l’eau plate. »',
                '« Il n’y a qu’UN couvert à bord, et c’est le rouf. »',
                '« Le gamin est assis contre. Pas derrière. Ce n’est pas la même chose. »'],
      },
      utiliser: {
        tous: 'La ligne ne se déplace pas d’ici. Le seul geste qui compte, c’est de sortir du dessin.',
        drakk: '« Le rouf. C’est là qu’on va, pas ici. »',
      },
    },

    /* ══ LE ROUF — le seul couvert, et une porte qu'on n'ouvre pas ════ */
    ecoutille: {
      nom: 'Le rouf',
      regarder: {
        tous: ['La cabine. L’écoutille est refermée et personne ne l’a rouverte depuis McNeil.',
               'Wilson est toujours dedans. On n’avait pas le temps, et on n’a toujours pas le temps.'],
        hercules: '« On ramène un mort et un vivant sur le même bateau, et c’est le vivant qui est assis dehors. »',
        trash: '« Il n’y a plus rien là-dedans. Ce qui reste, c’est une pièce, et un homme qui n’est plus à l’intérieur. »',
        drakk: '« Bois épais, deux traverses. C’est le seul rempart de ce navire. »',
        rabbit: '« Lester est adossé à une cloison, et de l’autre côté il y a un cadavre. Il ne le sait pas. Je préférerais qu’il continue. »',
      },
      utiliser: ({ a, qui }) => {
        if (a('abri')) return 'Tout le monde est du bon côté du rouf. On attend le goulet.'
        if (qui !== 'drakk')
          return { tous: 'Il faudrait faire bouger tout le monde, et vite, et sans discuter.',
                   drakk: '« Laissez-moi placer la troupe. »',
                   hercules: '« Drakk. C’est ton métier, ça, pas le mien. »' }
        return { tous: ['Drakk prend Lester par le col sans un mot et le pose de l’autre côté du rouf.',
                        'Puis il désigne le pont à chacun, dans l’ordre, et personne ne discute.',
                        'On ne voit plus rien du goulet. C’est exactement l’idée.'],
                 drakk: '« Le mur entre vous et la colline. Toujours. C’est la première chose qu’on apprend et la première qu’on oublie. »',
                 flags: ['abri'] }
      },
    },

    /* ══ L'ESPRIT — l'encaissement de `esprit-eau` ════════════════════ */
    esprit: {
      nom: 'Quelque chose, sous la coque',
      regarder: {
        tous: 'Une longueur pâle épouse la carène sur toute sa longueur. Elle ne bouge pas comme de l’eau bouge.',
        trash: ['« Elle est restée. Personne ne le lui a demandé. »',
                '« Elle nous a fait gagner quatorze minutes à l’aller et elle n’a rien réclamé. »',
                '« Ça va se payer. Pas cette nuit, j’espère. »'],
      },
      parler: ({ a, qui }) => {
        if (qui !== 'trash')
          return { tous: 'Tu parles à de l’eau noire. Elle ne répond pas.',
                   drakk: '« On ne hèle pas la mer deux fois dans la même nuit. »' }
        if (a('esprit-demande'))
          return { tous: 'Elle est là. Elle attend.',
                   trash: '« Je lui ai déjà demandé. On ne demande pas deux fois. »' }
        return { tous: ['Trash s’accroupit contre le bastingage et pose la paume sur le bordé, à hauteur de flottaison.',
                        'Il ne récite rien. Il demande, en sperethiel, et il attend.',
                        'La coque cesse de taper. Le sillage se referme derrière elle comme si personne n’était passé.'],
                 trash: ['« Elle veut bien nous cacher. Pas nous porter — nous cacher. »',
                         '« C’est plus que ce que je demandais et beaucoup moins que ce que je voulais. »'],
                 flags: ['esprit-demande', 'vedette-reglee'], visuels: ['vedette-partie'] }
      },
      utiliser: {
        tous: 'On ne pose pas la main sur ce qui vous cache. Pas avant Tacoma.',
        trash: '« On lui parle. On ne la touche pas. »',
      },
    },

    froid: {
      nom: 'Le froid, au-dessus du goulet',
      regarder: {
        tous: 'Sur la pointe de gauche, une tache violette et calme. Pas une aura : un creux.',
        trash: ['« Quelqu’un attend là-haut et ne ressent rien. Ni peur, ni ennui, ni impatience. »',
                '« J’ai vu ça une fois sur le pont du passeur. C’est la même absence. »',
                '« Ce n’est pas un monstre. C’est un homme qui a arrêté d’en être un pendant qu’il travaille. »'],
        flags: ['sait-ou'],
      },
      utiliser: {
        tous: 'Un creux ne se touche pas. Il se contourne.',
        trash: '« Je ne vais pas là-haut lui demander ce qu’il ressent. La réponse est déjà dans la question. »',
      },
    },

    /* ══ Décor ════════════════════════════════════════════════════════ */
    eau: {
      nom: 'L’eau',
      regarder: {
        tous: 'Noire, hachée par la pluie. On ne voit pas le fond et on ne veut pas.',
        trash: '« L’eau ne garde rien. C’est pour ça qu’on y jette des choses. »',
        rabbit: '« Le commlink de Wilson est là-dedans quelque part, à six mètres de fond et à vingt kilomètres derrière. »',
      },
      utiliser: 'À cette température, non.',
    },

    mcneil: {
      nom: 'McNeil, derrière',
      regarder: {
        tous: 'Un mur posé sur l’eau, sans une lumière. On en est sortis avec quelqu’un et personne n’a encore sonné.',
        hercules: '« Ils s’en apercevront à sept heures, quand le greffe rouvre. Ou à huit, quand la navette viendra le chercher. »',
        rabbit: '« Ils s’en apercevront quand quelqu’un relira l’heure que j’ai écrite. »',
        drakk: '« La forteresse s’éloigne. On n’a pas eu à l’assiéger. Personne ne chantera ça. »',
      },
    },

    tacoma: {
      nom: 'Les lumières de Tacoma',
      regarder: {
        tous: ['Une lueur orange au ras de l’eau, encore loin. Sodium, pluie, et deux grues qui ne dorment jamais.',
               'Cinq heures. L’audience est à dix.'],
        hercules: '« Cinq heures pour tenir un homme en vie dans une ville qui préfère qu’il meure. C’est jouable. J’ai eu pire. »',
        trash: '« C’est là qu’on va se cacher. On se cache toujours dans ce qui brille. »',
      },
    },

    mat: {
      nom: 'Le mât',
      regarder: {
        tous: 'Voile ferlée, drisses qui claquent contre l’espar. Le bruit le plus régulier de la nuit.',
        drakk: '« La lance du navire. Elle ne sert à rien ce soir : nous allons au moteur, comme des marchands. »',
      },
    },

    bastingage: {
      nom: 'Le bastingage',
      regarder: {
        tous: 'Un liston de bois et une filière tendue à hauteur de cuisse. C’est tout ce qui sépare le pont de la mer.',
        hercules: '« C’est aussi tout ce qui a séparé Wilson de la mer, et il n’est pas tombé. Ils l’ont trouvé en bas. »',
      },
      utiliser: 'Tu t’y appuies. La pluie continue.',
    },
  },

  dialogues: {

    /* ══ LESTER ═══════════════════════════════════════════════════════
       G5 dit que sa confiance ne s'obtient qu'en parlant, et qu'aucun
       objet ne l'achète. Ici on ne l'obtient pas encore : on la commence.
       Le vrai verrou est à la planque. */
    lester: {
      qui: 'lester',
      accueil: ['Il relève la tête de dix centimètres.',
                '« Vous êtes payés combien pour me sortir ? »'],
      retour: ['« Ouais. »'],
      sujets: [
        {
          id: 'combien',
          titre: '« Assez pour aller jusqu’au bout. »',
          flags: ['lester-parle'],
          texte: ['« C’est ce qu’a dit l’avocat. »',
                  '« Le premier, pas la dame de chez STV. Le premier, il a dit qu’il irait jusqu’au bout et il est parti au bout de six minutes. »',
                  '« J’ai compté. »'],
        },
        {
          id: 'ou',
          titre: '« On te ramène au tribunal. Vivant. »',
          quand: ({ a }) => a('lester-parle'),
          texte: ['« Vivant. »',
                  '« Personne m’avait encore dit ce mot-là dans cet ordre-là. »'],
        },
        /* RAPPEL de `sait-teresa` (planté au tableau 1). C'est le
           troisième point de la chaîne : on plante, on RAPPELLE, on paie
           — et le paiement est à la contre-enquête. */
        {
          id: 'teresa',
          titre: '« Teresa Banks. Tu la connaissais ? »',
          quand: ({ a }) => a('sait-teresa') && a('lester-parle'),
          flags: ['lester-teresa'],
          texte: ['Long silence. La pluie fait tout le bruit.',
                  '« Elle dormait deux étages au-dessus. Elle descendait fumer parce qu’en haut ça tirait. »',
                  '« On s’est parlé quatre fois. Peut-être cinq. »',
                  '« Personne m’a demandé ça non plus. Ils m’ont demandé où j’étais. Jamais qui elle était. »'],
        },
        {
          id: 'mccarthy',
          titre: '« C’est un flic qui nous paie. »',
          quand: ({ a }) => a('lester-parle'),
          texte: ['« Je sais. Le vieux. »',
                  '« Il est venu deux fois. La deuxième, il a rien demandé, il a juste relu ses papiers devant moi. »',
                  '« J’ai pas compris si c’était pour moi ou pour lui. »'],
        },
        /* RAPPEL de `mccarthy-avoue` (planté au tableau 1, par
           White_Rabbit). Il se paie à l'audience. */
        {
          id: 'relit',
          titre: '« Il relit ce dossier parce qu’il n’y croit pas. » (White_Rabbit)',
          quand: ({ a, qui }) => qui === 'rabbit' && a('mccarthy-avoue') && a('lester-parle'),
          flags: ['lester-sait-mccarthy'],
          texte: ['« … »',
                  '« Alors pourquoi il l’a signé. »',
                  'Il ne le demande pas. Il le pose, à plat, comme une pièce sur une table.'],
        },
        {
          id: 'blesse',
          titre: '« Montre ce bras. »',
          quand: ({ a }) => a('lester-blesse'),
          texte: ['Il ne montre pas. Il tourne l’épaule pour qu’on voie sans qu’il ait à bouger.',
                  '« Ça saigne moins que ça en a l’air. »',
                  '« J’ai eu pire en tombant d’un mur. »'],
        },
        {
          id: 'silence',
          titre: '(Le laisser tranquille.)',
          fin: true,
          texte: ['Il remet le menton sur ses genoux.'],
        },
      ],
    },

    /* ══ LA VEDETTE ═══════════════════════════════════════════════════ */
    vedette: {
      qui: 'vedette',
      accueil: ['La VHF crache, canal 16.',
                '« Voilier au chenal 12, ici patrouille fluviale Lone Star. Identifiez-vous. »'],
      retour: ['« On vous écoute, voilier. »'],
      sujets: [
        {
          id: 'nom',
          titre: '« Sunnyside quatre-deux. On rentre au chantier. » (Hercules)',
          quand: ({ qui }) => qui === 'hercules',
          flags: ['vedette-tiede'],
          texte: ['« Reçu. Vous naviguez au nom de Wilson, W. »',
                  '« Wilson est enregistré seul à bord. Vous êtes cinq sur le pont. »'],
        },
        {
          id: 'contrat',
          titre: '(Présenter le contrat de prestation.)',
          quand: ({ tient }) => tient('contrat'),
          texte: ['Le projecteur s’attarde sur le feuillet.',
                  '« Prestation de sécurité indépendante, contresignée brigade criminelle. »'],
        },
        {
          id: 'couper',
          titre: '(Ne pas répondre.)',
          fin: true,
          texte: ['Personne ne décroche. Le projecteur reste où il est.',
                  'Ça ne les décourage pas. Ça ne les presse pas non plus.'],
        },
      ],
    },
  },
}
