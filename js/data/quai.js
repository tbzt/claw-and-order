/* ============================================================
   TABLEAU 2 — LE SUNNYSIDE BEACH PARK, TACOMA. ~MINUIT.

   Au texte : « Une cinquantaine de bateaux s'y entassent. Cependant en
   parcourant la jetée, ils remarquent un bateau qui semble prêt à mettre,
   littéralement, les voiles. » Wilson est mort dans sa cabine, deux coups
   de couteau habilement portés sur des organes, victime prise par
   surprise. Sur le corps : le passe des amarres, un créditube de 2 000 ¥,
   une arme de poing. Le commlink est passé par-dessus bord.
   Toralf a quitté les lieux avant d'avoir fini — une patrouille nautique
   de la Star est passée. C'est ce sabotage inachevé qui sauve l'équipe,
   et c'est l'énigme du tableau.

   C'EST ICI QUE LES QUATRE REGARDS SERVENT :
     Drakk     déplace, force, répare
     Trash     lit les résidus astraux
     White_Rabbit  lit les ORA et les nœuds
     Hercules  fait parler quelqu'un qui ne veut pas parler

   Chaque réaction porte une clé `tous` — la description partagée, c'est
   la caméra — et une clé par runner quand il a quelque chose que les
   trois autres n'ont pas. Partout ailleurs, `tous` suffit.
   ============================================================ */


import { equipiers } from './equipiers.js'

export const quai = {
  markup: 'scenes/quai.html',

  /* Chantier 13 : `visite` vient de `charge()`. Ce tableau se rechargeait
     DÉJÀ plusieurs fois avant ce chantier — chaque aller-retour vers la
     vue rapprochée du voilier (`reculer` dans quai-voilier.js) rejoue
     `charge('quai')` — et personne ne l'avait remarqué : l'ouverture
     entière repartait de zéro à chaque retour du pont. Corrigé au passage. */
  ouverture: (ctx, visite) => visite > 1
    ? ['Vous êtes de retour sur la jetée. Le voilier attend, exactement où vous l’avez laissé.']
    : ['Sunnyside Beach Park, Tacoma. Une cinquantaine de bateaux s’entassent le long de la jetée, tous éteints.',
       'Tous sauf un : un voilier qui semble prêt à mettre, littéralement, les voiles. Personne sur le pont.',
       'OBJECTIF — rejoindre l’île McNeil. Wilson devait vous y conduire. Wilson ne répond pas.'],

  /* `esprit-eau` se demande maintenant depuis la vue rapprochée du
     voilier (chantier 25) — mais son visuel (l'ondine sous l'étrave,
     dessinée ICI) ne survivrait pas à un aller-retour sans ça :
     `charge()` vide `visuels` à chaque entrée, et ce tableau est le
     premier du jeu à se revisiter. */
  entree: ({ a }) => [
    ...(a('esprit-eau') ? ['esprit-eau'] : []),
  ],

  /* Première bascule vers chaque lentille : on ne l'annonce qu'une fois. */
  vues: {
    sociale: ['Cinquante bateaux, une jetée déserte à cette heure, et un carré de lumière au bout du ponton : une cabane de gardien, ou quelqu’un qui n’arrive pas à dormir.',
               '« Il y a toujours quelqu’un qui ne dort pas sur un port. »',
               '« Trouvons-le avant la Star. »'],
    astrale: ['Le plan astral, ici, est calme. Trop. L’eau avale les traces plus vite que la terre.',
              '« Il reste quelque chose sur le bateau. Fais-moi monter. »'],
    ra: ['La RA du port s’allume d’un coup : balises d’amarrage, numéros de coque, publicités pour un ponton privé, trois offres de crédit.',
         '« Personne ne filtre rien dans ce port. C’est illisible. »',
         '« Tant mieux. Pour l’instant. »'],
    materielle: ['Une jetée, un ponton, cinquante embarcations qui se touchent presque — et un seul chemin sec pour rejoindre le voilier.',
               '« Rien pour se cacher, des deux côtés. »',
               '« Sauf du côté de l’eau. Je ne sais pas lire l’eau. »'],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js).

       Chacun a une ligne dans la voix de chacun des trois autres. */

    ...equipiers('quai'),


    voilier: {
      nom: 'Le voilier',
      sortie: 'quai-voilier',
      regarder: {
        tous: ['Un huit mètres fatigué, amarré au bout de la jetée. Les voiles sont ferlées mais les taquets sont libérés : quelqu’un s’apprêtait à partir.',
               'Aucune lumière à bord.'],
        drakk: ['« Personne sur le pont. »', '« Mauvais signe, ou piège. Dans les deux cas j’y vais devant. »'],
        rabbit: '« Sa balise d’amarrage émet encore. Immatriculé au nom d’un Wilson, W. Et il se fait appeler l’Amiral dans son propre profil public. »',
        trash: '« Il y a une trace là-dessus. Pas fraîche de dix minutes, fraîche d’une heure. »',
      },
      objets: {
        /* Rappel de la bouteille achetée au bar. Sans lui, un objet qui
           paie deux tableaux plus tard se lit comme un bug, pas comme
           une récompense. Le mort dans la cabine n'est révélé qu'après
           l'avoir vu à bord (`corps-vu`, posé dans quai-voilier.js) —
           avant ça, la ligne ne doit rien en dire. */
        bouteille: ({ a }) => ({
          tous: a('corps-vu')
            ? 'Pas maintenant. Il y a un mort dans la cabine et quarante minutes de traversée devant.'
            : 'Pas maintenant. Vous êtes venus pour embarquer, pas pour trinquer.',
          drakk: '« Je la garde. Elle a un usage et ce n’est pas celui-ci. »',
          hercules: '« On boira à l’arrivée. On boit toujours à l’arrivée, c’est pour ça qu’on arrive. »',
        }),
      },
      /* Neuf cibles avaient partagé ce sprite de 86 u — un tiers du
         cadre, et cinq d'entre elles sans un pixel de marge sous le
         seuil de lisibilité. Chantier 25 : elles ont déménagé dans la
         vue rapprochée, à l'échelle ×2 du même sprite. `voilier` reste
         le seul point d'entrée depuis la vue large — une chose du
         monde, une seule cible. */
      utiliser: ({ a }) => a('a-bord')
        ? { tous: 'Tu remontes examiner le bateau de plus près.', va: 'quai-voilier' }
        : { tous: 'Tu montes à bord. Le pont tangue, le bateau grince, et l’écoutille de la cabine est entrouverte.',
            flags: ['a-bord'] },
    },

    pecheur: {
      nom: 'Un pêcheur de nuit',
      regarder: {
        tous: ['Trente mètres plus loin sur la jetée, un vieil humain pêche dans le noir. Il n’a pas de seau.',
               'Il vous a vus arriver et il a décidé de ne pas vous voir.'],
        hercules: ['« Il n’a pas de seau, donc il ne pêche pas. Il est là pour être là. »', '« Celui-là a vu quelque chose. Laissez-moi trente secondes, et ne le regardez pas tous les quatre en même temps. »'],
        rabbit: '« Commlink éteint. Volontairement. À cette heure-ci, dans ce port, c’est un choix. »',
        drakk: '« Une sentinelle qui feint la pêche. Vieux stratagème. »',
        trash: ['« Il a peur de nous, et il reste. »', '« Il a plus peur d’autre chose. »'],
      },

      /* Deux clés, et il faut les deux : le BON RUNNER pour qu'il
         entrouvre, et DE QUOI PAYER pour qu'il finisse. Avec n'importe
         qui d'autre il ne dit rien ; avec Hercules sans argent, il dit
         le prix. C'est ce qui manquait : il livrait tout en un clic. */
      parler: ({ a, qui }) => {
        if (a('pecheur-parle')) return { tous: '« J’ai dit c’que j’avais à dire. »' }
        if (qui !== 'hercules')
          return { tous: '« Bougez de là. J’pêche. »',
                   drakk: '« Noble pêcheur ! » — il ne se retourne même pas.',
                   trash: 'Il regarde ton poncho, tes perles, ton écharpe. Il se retourne vers l’eau.',
                   rabbit: '« J’parle pas aux gangers. »' }
        return {
          tous: ['Hercules s’assoit à côté de lui, ne dit rien pendant vingt secondes, puis parle du temps qu’il fait.',
                 'Deux minutes plus tard le vieux a arrêté de regarder son fil.',
                 '« J’ai peut-être vu passer quelqu’un. J’ai peut-être une mémoire qui revient. »',
                 '« Elle revient mieux quand on l’aide. »'],
          hercules: '« Voilà une phrase que je comprends parfaitement. »',
          flags: ['pecheur-amorce'],
        }
      },

      objets: {
        creditube: ({ a, qui }) => {
          if (a('pecheur-parle')) return 'Il a déjà été payé. Il a une conscience, à sa manière.'
          if (!a('pecheur-amorce'))
            return { tous: 'Tu lui tends un créditube sans avoir dit un mot. Il ne le prend pas.',
                     hercules: ['« On ne paie pas avant d’avoir demandé. Ça vexe. »', '« Et un homme vexé, ça coûte le double. Je le sais, je facture pareil. »'] }
          return {
            tous: ['Le créditube disparaît dans une poche cirée.',
                   '« Un grand type. Blond, une tête de plus que tout le monde. Il est monté sur le bateau vers onze heures. »',
                   '« Il est ressorti quand la vedette de la Star est passée. Pas couru. Marché. Comme s’il avait fini. »',
                   '« Et il est parti par le talus, pas par la route. »'],
            hercules: '« Il n’avait pas fini. »',
            flags: ['pecheur-parle', 'sait-toralf', 'sait-inacheve'],
            fiches: ['grand-blond', 'travail-inacheve'],
            retire: ['creditube'],
          }
        },
        arme: 'Tu ne sors pas une arme devant un vieil homme qui pêche.',
      },

      utiliser: 'On ne fouille pas un vieux monsieur qui pêche.',
    },

    eau: {
      nom: 'L’eau du port',
      regarder: {
        tous: 'Noire, grasse, immobile. Quelque part là-dedans, un commlink coule encore.',
        rabbit: '« Si on avait deux heures et un drone, on le récupérerait. On n’a ni l’un ni l’autre. »',
        trash: '« L’eau ne garde rien. C’est pour ça que les gens y jettent des choses. »',
      },
      utiliser: 'À cette température, non.',
    },

    'esprit-eau': {
      nom: 'Quelque chose, sous l’étrave',
      regarder: {
        tous: 'Sous la coque, une longueur pâle qui ne bouge pas comme de l’eau bouge.',
        trash: ['« Un esprit de l’eau. Elle est venue seule, et elle n’a pas fixé de prix. »',
                '« Ça se paie toujours. Simplement, on ne sait pas encore avec quoi. »'],
      },
      utiliser: {
        tous: 'On ne touche pas à ce qui nage sous une coque qu’on a déjà remerciée.',
        trash: '« Elle est là. Ça suffit. On ne demande pas deux fois la même nuit. »',
      },
    },

    /* ── Tactique ───────────────────────────────────────────────── */
    defile: {
      nom: 'La jetée, en plan',
      regarder: {
        tous: 'La jetée est barrée sur toute sa longueur, entre deux traits rouges.',
        drakk: ['« Un défilé. Une seule planche, aucun flanc, et l’eau des deux côtés. »',
                '« Si on nous coince ici, on ne manœuvre pas. On tient, ou on tombe. »',
                '« Je préfère les défilés quand c’est moi qui les tiens. »'],
      },
      utiliser: {
        tous: 'On ne s’arrête pas sur un défilé. On le traverse, et vite.',
        drakk: '« Je marche en dernier. Si quelque chose vient de la jetée, je le vois avant vous. »',
      },
    },

    perchoir: {
      nom: 'Un angle, au-dessus du parking',
      regarder: ({ qui }) => ({
        tous: 'En haut à droite, un rectangle rouge cerne un angle du talus, au-dessus du parking.',
        drakk: ['« Là. Un archer posté là voit toute la jetée, et personne ne le voit. »',
                '« Il n’y est pas. »',
                '« Il y a été, ou il y sera. C’est le seul endroit qui vaille. »',
                '« Quand on ne sait pas où est l’ennemi, on regarde où on se mettrait. »'],
        flags: qui === 'drakk' ? ['sait-perchoir'] : undefined,
      }),
      utiliser: {
        tous: 'Quarante pas, un talus, et rien qui prouve que ça vaut la peine.',
        drakk: '« Plus tard. On ne quitte pas le gué pour aller voir la colline. »',
      },
    },

    /* ── Astral ─────────────────────────────────────────────────── */
    trace: {
      nom: 'Une trace, sur le pont',
      regarder: {
        tous: 'Une tache qui n’est pas du sang. Elle est posée par-dessus, et elle s’efface plus lentement.',
        trash: ['« C’est lui. Il est resté à peu près quatre minutes à bord, pas plus. »',
                '« Et regarde la jetée : sa piste va jusqu’ici, et elle REVIENT. Elle ne court pas au retour. »',
                '« Celui-là croyait avoir terminé. »'],
        fiches: ['travail-inacheve'],
      },
      utiliser: 'On ne touche pas à un résidu astral. On le lit, et on s’en va.',
    },

    /* ── RA ─────────────────────────────────────────────────────────
       L'ORA de défaut flotte AU-DESSUS du compartiment moteur : il ne
       décore pas, il désigne. C'est la deuxième route vers le même
       diagnostic — on peut y arriver par le moteur ou par le nœud. */
    defaut: {
      nom: 'Alerte du bateau',
      regarder: ({ a, qui }) => ({
        tous: 'Une icône rouge clignote au-dessus de la poupe. Le bateau se plaint de quelque chose.',
        rabbit: ['« Défaut d’allumage. Sauf qu’une panne ne se déclare pas net comme ça — ça, c’est une coupure. »',
                 '« Et elle est inachevée : il reste deux fils entiers. Celui qui a coupé n’a pas fini. »'],
        trash: '« Je vois une lumière rouge et rien d’autre. Ce n’est pas mon plan. »',
        drakk: '« Un présage. Rouge. Mauvais. »',
        /* Deux routes vers le même diagnostic : lire le nœud en RA, ou
           savoir par le pêcheur qu'il est parti sans finir — auquel cas
           on cherche ce qui reste entier au lieu de ce qui est cassé. */
        /* Deux vraies routes : lire le nœud en RA, OU savoir par le
           pêcheur qu'il est reparti sans finir — auquel cas n'importe
           qui comprend qu'il faut chercher ce qui reste entier. */
        flags: (qui === 'rabbit' || a('sait-inacheve')) ? ['sabotage-compris'] : undefined,
      }),
      utiliser: {
        tous: 'On ne répare pas une icône. Il faut ouvrir le capot.',
        rabbit: '« L’alerte dit OÙ. Elle ne visse rien. »',
      },
    },

    immat: {
      nom: 'Immatriculation du voilier',
      regarder: {
        tous: 'La fiche publique du bateau flotte au-dessus de l’étrave.',
        rabbit: ['« Wilson, W. Propriétaire depuis onze ans, aucune infraction déclarée. »',
                 '« Et dans son profil public, en nom d’usage : “l’Amiral”. Il l’a écrit lui-même. »'],
      },
      utiliser: ({ a, qui }) => {
        if (a('vu-immat')) return 'Toujours la même fiche. Il n’y a rien de plus à en tirer.'
        if (qui !== 'rabbit')
          return { tous: 'Il faudrait un deck pour aller au-delà de ce qui flotte.',
                   hercules: '« Laissons-la à celle qui sait lire ça. »' }
        return { tous: ['White_Rabbit interroge le registre au-delà de ce qu’il affiche.',
                        'Rien. Onze ans de propriété sans un seul incident, pas même une amende de mouillage.'],
                 rabbit: ['« Un homme sans dossier, ça n’existe pas. »', '« Nettoyé, ou jamais rien fait. Je ne sais pas laquelle des deux m’inquiète le plus. »'],
                 flags: ['vu-immat'] }
      },
    },

    'commlink-eteint': {
      nom: 'Un commlink éteint',
      regarder: {
        tous: 'Au bout de la jetée, une icône barrée. Quelqu’un a coupé son commlink.',
        rabbit: ['« Éteint à la main, pas déchargé. À cette heure-ci, dans ce port, c’est un choix. »',
                 '« Il ne veut pas qu’on sache qu’il était là. Donc il était là. »'],
      },
      utiliser: {
        tous: 'Éteint, ça ne se pirate pas. Il n’y a rien à attraper.',
        rabbit: ['« Je peux réveiller une machine qui dort. Pas une qu’on a éteinte à la main. »', '« Celui qui a fait ça savait. »'],
      },
    },

    'commlink-noye': {
      nom: 'Dernière position connue',
      regarder: {
        tous: 'Un marqueur pâle flotte au-dessus de l’eau, à six mètres du ponton.',
        rabbit: ['« Le commlink de Wilson. Dernière position avant de couler. »',
                 '« Six mètres. Il l’avait encore en main quand il est tombé — il n’a pas été jeté, il a échappé. »'],
        trash: '« L’eau a déjà tout avalé. Il n’y a rien pour moi là-dedans. »',
      },
      utiliser: 'Il faudrait deux heures et un drone. On n’a ni l’un ni l’autre.',
    },

    jetee: {
      nom: 'La jetée',
      sortie: 'carte',
      regarder: {
        tous: ['Cinquante bateaux éteints, des pontons qui grincent, et une odeur d’essence et de vase.',
               'Personne, sauf le pêcheur.'],
        trash: '« Il est passé par là. La trace va du parking au bateau, et elle revient. Il n’a pas couru en revenant. »',
        drakk: '« Une seule route, et pas de sortie de flanc. Si on nous coince ici, on se bat sur cette planche. »',
      },
      /* La jetée EST le chemin du parking (Drakk le dit déjà en tactique :
         « la trace va du parking au bateau »). Chantier 13 : c'est donc
         elle qui porte la sortie vers LA CARTE — aucun décor neuf, la
         même cible sert les deux usages, comme la porte au bar. */
      utiliser: {
        tous: 'Vous reprenez la jetée en sens inverse, vers le parking.',
        va: 'carte',
      },
    },
  },

  dialogues: {},
}
