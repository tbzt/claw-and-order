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

  ouverture: [
    'Sunnyside Beach Park, Tacoma. Une cinquantaine de bateaux s’entassent le long de la jetée, tous éteints.',
    'Tous sauf un : un voilier qui semble prêt à mettre, littéralement, les voiles. Personne sur le pont.',
    'OBJECTIF — rejoindre l’île McNeil. Wilson devait vous y conduire. Wilson ne répond pas.',
  ],

  /* Première bascule vers chaque lentille : on ne l'annonce qu'une fois. */
  vues: {
    astrale: ['Le plan astral, ici, est calme. Trop. L’eau avale les traces plus vite que la terre.',
              '« Il reste quelque chose sur le bateau. Fais-moi monter. »'],
    ra: ['La RA du port s’allume d’un coup : balises d’amarrage, numéros de coque, publicités pour un ponton privé, trois offres de crédit.',
         '« Personne ne filtre rien dans ce port. C’est illisible, et c’est parfait. »',
         '« Le jour où il faudra lire au milieu de ça, il faudra autre chose que de la bonne volonté. »'],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js).

       Chacun a une ligne dans la voix de chacun des trois autres. */

    ...equipiers('quai'),


    voilier: {
      nom: 'Le voilier',
      regarder: {
        tous: ['Un huit mètres fatigué, amarré au bout de la jetée. Les voiles sont ferlées mais les taquets sont libérés : quelqu’un s’apprêtait à partir.',
               'Aucune lumière à bord.'],
        drakk: '« Nulle sentinelle sur le pont. C’est mauvais signe, ou c’est un piège. Dans les deux cas j’y vais devant. »',
        rabbit: '« Sa balise d’amarrage émet encore. Immatriculé au nom d’un Wilson, W. Et il se fait appeler l’Amiral dans son propre profil public. »',
        trash: '« Il y a une trace là-dessus. Pas fraîche de dix minutes, fraîche d’une heure. »',
      },
      objets: {
        /* Rappel de la bouteille achetée au bar. Sans lui, un objet qui
           paie deux tableaux plus tard se lit comme un bug, pas comme
           une récompense. */
        bouteille: {
          tous: 'Pas maintenant. Il y a un mort dans la cabine et quarante minutes de traversée devant.',
          drakk: '« Je la garde. Elle a un usage et ce n’est pas celui-ci. »',
          hercules: '« On boira à l’arrivée. On boit toujours à l’arrivée, c’est pour ça qu’on arrive. »',
        },
      },
      utiliser: ({ a, tient }) => {
        if (!a('a-bord'))
          return { tous: 'Tu montes à bord. Le pont tangue, le bateau grince, et l’écoutille de la cabine est entrouverte.',
                   flags: ['a-bord'] }
        /* Le voilier sert de rappel : cliquer dessus dit toujours ce qui
           manque encore. Un tableau doit pouvoir répondre à « et
           maintenant ? » sans que le joueur ait à deviner. */
        const reste = []
        if (!a('corps-vu')) reste.push('l’écoutille de la cabine est ouverte, et personne n’en est ressorti')
        if (!tient('passe')) reste.push('le ponton est verrouillé, et le passe n’est pas sur toi')
        if (!a('trappe-ouverte')) reste.push('la trappe du compartiment moteur est coincée')
        else if (!a('moteur-repare')) reste.push('le moteur ne prend pas')
        if (a('moteur-repare')) {
          const p = ['poste-barre','poste-aussieres','poste-vigie','poste-radio'].filter(x => a(x)).length
          if (p < 4) reste.push(`l’équipage n’est pas à son poste (${p} sur 4)`)
        }
        return reste.length
          ? { tous: ['Il ne partira pas comme ça.', 'Il reste que ' + reste.join(', et que ') + '.'] }
          : { tous: 'Le moteur tourne, le passe est dans ta poche. Il ne manque plus qu’à larguer.' }
      },
    },

    cabine: {
      nom: 'L’écoutille de la cabine',
      regarder: ({ a }) => a('corps-vu')
        ? 'La cabine, et ce qu’il y a dedans. Tu as déjà vu.'
        : { tous: ['L’écoutille est entrouverte de deux doigts. À l’intérieur, il fait plus noir que dehors.',
                   'Ça sent le gasoil, le renfermé, et autre chose.'],
            trash: '« N’ouvre pas tout de suite. Laisse-moi regarder d’abord. »' },
      utiliser: ({ a }) => a('corps-vu')
        ? 'Tu redescends. Rien n’a changé, et ça ne changera pas.'
        : {
            tous: ['Tu écartes l’écoutille. Wilson est étendu sur le plancher de sa cabine, dans une mare qui a eu le temps de s’étaler.',
                   'Il tenait son commlink. Il ne le tient plus.'],
            flags: ['corps-vu'],
            visuels: ['cabine-ouverte'],
          },
    },

    corps: {
      nom: 'Wilson',
      regarder: {
        tous: ['Deux plaies, pas une de plus. Pas de coupures de défense sur les mains.',
               'Il n’a pas eu le temps de comprendre qu’il se passait quelque chose.'],
        drakk: '« Deux coups. Placés. Celui qui a fait ça n’a pas frappé fort, il a frappé juste. Ce n’est pas de la colère, c’est du métier. »',
        trash: ['« Il y a deux empreintes ici. La sienne, surprise, et l’autre. »',
                '« L’autre est calme. Aucune émotion, pas même du dégoût. C’est ça qui me fait peur, pas le sang. »'],
        rabbit: ['« Son commlink n’émet plus. Dernière connexion il y a cinquante-deux minutes, puis plus rien, et pas de déconnexion propre. »',
                 '« Il est dans l’eau. Ça veut dire que ça s’est passé vite. »'],
        hercules: '« Il attendait quelqu’un. Il n’a pas verrouillé son écoutille. Un type qui fait ce métier ne laisse pas sa porte ouverte pour n’importe qui. »',
      },
      utiliser: ({ a, qui }) => {
        if (a('corps-fouille')) return 'Tu as pris ce qu’il y avait à prendre. Le reste lui appartient.'
        if (qui !== 'drakk')
          return { tous: 'Il est coincé entre la couchette et la table, et il pèse son poids. Tu n’y arriveras pas seul.',
                   hercules: '« Drakk. C’est un travail pour quelqu’un qui a des bras. »' }
        return {
          tous: ['Drakk le dégage de la couchette avec une douceur qui surprend tout le monde, y compris lui.',
                 'Dans la veste : un passe des amarres, un créditube de deux mille, et une arme de poing qu’il n’a pas sortie.'],
          drakk: '« Repose en paix, Amiral. Ta traversée sera achevée. »',
          objets: ['passe', 'creditube', 'arme'],
          flags: ['corps-fouille'],
        }
      },
      parler: {
        tous: 'Non.',
        trash: '« Trop tard pour ça. Il est déjà loin. »',
      },
    },

    trappe: {
      nom: 'La trappe du compartiment moteur',
      regarder: {
        tous: ['Le capot est de travers, refermé à la hâte, et la crémone est faussée.',
               'Quelqu’un l’a claquée en partant.'],
        drakk: '« Forcée en la fermant. On peut la forcer en l’ouvrant. »',
        trash: '« Il était pressé, à la fin. Avant, il ne l’était pas. »',
      },
      utiliser: ({ a, qui }) => {
        if (a('trappe-ouverte')) return 'Elle est ouverte.'
        if (qui !== 'drakk')
          return { tous: 'La crémone est tordue. Tu tires, elle ne cède pas d’un millimètre.',
                   hercules: '« Je vais me casser un ongle. Drakk ? »',
                   rabbit: '« C’est de la mécanique. Je ne fais pas la mécanique. »' }
        return { tous: ['Drakk cale un pied contre le bordé, prend la crémone à deux mains et tire.',
                        'La trappe s’ouvre avec un bruit de casserole. Le compartiment moteur est à nu.'],
                 drakk: '« Le coffre est ouvert, compagnons. »',
                 flags: ['trappe-ouverte'], visuels: ['trappe-ouverte'] }
      },
    },

    moteur: {
      nom: 'Le compartiment moteur',
      regarder: ({ a, qui }) => ({
        tous: ['Le capot du compartiment est de travers, comme si on l’avait refermé à la hâte.',
               'En dessous : un moteur d’appoint, des durites, et un boîtier d’allumage.'],
        rabbit: ['« Le nœud du bateau me remonte un défaut d’allumage. Sauf que ce n’est pas une panne : c’est une coupure, et elle est franche. »',
                 '« Et elle est INACHEVÉE. Il restait deux fils à faire, et il ne les a pas faits. »'],
        hercules: a('sait-inacheve')
          ? '« Le vieux a dit qu’il était reparti comme s’il avait fini. Il n’avait pas fini. Cherchez ce qui est encore entier. »'
          : '« Un moteur cassé. Voilà, j’ai contribué. »',
        drakk: '« On a tranché là-dedans. Avec la même lame que le passeur, je parierais mon destrier. »',
        trash: '« Rien à voir avec la magie. Celui qui a fait ça n’en a pas besoin. »',
        /* Seule la lecture du nœud fait comprendre CE QUI a été coupé.
           C'est le verrou en deux temps du tableau : White_Rabbit
           diagnostique, Drakk répare. Aucun des deux ne s'en sort seul. */
        /* Deux vraies routes : lire le nœud en RA, OU savoir par le
           pêcheur qu'il est reparti sans finir — auquel cas n'importe
           qui comprend qu'il faut chercher ce qui reste entier. */
        flags: (qui === 'rabbit' || a('sait-inacheve')) ? ['sabotage-compris'] : undefined,
      }),
      utiliser: ({ a, qui }) => {
        if (a('moteur-repare')) return 'Il tourne. N’y touche plus.'
        if (!a('trappe-ouverte'))
          return { tous: 'La trappe est coincée. On n’atteint rien à travers.',
                   drakk: '« Laissez-moi ouvrir d’abord. »' }
        if (!a('sabotage-compris'))
          return { tous: 'Tu tripotes les durites au hasard. Il faudrait déjà savoir CE QUI a été coupé.',
                   rabbit: '« Laisse-moi lire le nœud avant de tirer sur des fils. »',
                   hercules: '« Quelqu’un a une idée de ce qu’on cherche ? Parce que moi, non. »' }
        if (qui !== 'drakk')
          return { tous: 'Le faisceau est écrasé au fond du compartiment, sous le moteur. Il faut soulever le bloc.',
                   drakk: '', hercules: '« Encore une fois : quelqu’un qui a des bras. »' }
        return {
          tous: ['Drakk soulève le bloc d’une main, tient, et de l’autre raboute les deux fils que l’assassin n’a pas eu le temps de sectionner.',
                 'Le moteur tousse, crache, et prend.'],
          drakk: '« La monture répond ! »',
          flags: ['moteur-repare'],
          visuels: ['moteur-ok'],
        }
      },
    },

    /* ══ L'APPAREILLAGE ══════════════════════════════════════════
       Quatre postes, un par runner, et le bateau ne part pas tant que
       les quatre ne sont pas tenus. C'est le seul verrou du jeu qui
       exige TOUTE l'équipe en même temps — les autres se franchissent
       l'un après l'autre. Chacun décline les postes qui ne sont pas
       le sien, et sa manière de décliner le raconte.        */

    barre: {
      nom: 'La barre',
      regarder: {
        tous: ['Une barre franche, un compas au tritium, et un boîtier de navigation vissé au tableau.',
               'Wilson devait vous conduire. Wilson est dans la cabine.'],
        rabbit: '« Le boîtier de nav est un nœud. Bas de gamme, mais c’est un nœud. »',
        drakk: '« J’ai mené un drakkar sur la Mer de Cendre pendant six séances. »',
        trash: '« Je sais lire l’eau. Je ne sais pas conduire un moteur. »',
        hercules: '« J’ai fait de la voile à Newport. Sur un bateau qui avait un équipage. »',
      },
      utiliser: ({ a, tient, qui }) => {
        if (a('poste-barre')) return 'White_Rabbit y est. Il n’en bougera pas.'
        if (!a('moteur-repare'))
          return { tous: 'Tenir la barre d’un bateau qui ne démarre pas ne mène nulle part.',
                   drakk: '« Une monture morte ne se monte pas. »' }
        if (qui === 'drakk')
          return { tous: ['Drakk empoigne la barre à deux mains, avec un sérieux absolu. Le voilier part de travers et racle un pieu.',
                          'Personne ne dit rien pendant quelques secondes.'],
                   drakk: '« La Mer de Cendre était plus large. »' }
        if (qui === 'hercules')
          return { tous: 'Hercules pose une main sur la barre, la regarde, et la retire.',
                   hercules: '« Non. Je sais commander un bateau. Ce n’est pas pareil. »' }
        if (qui === 'trash')
          return { tous: 'Trash regarde le chenal, les balises, le courant — et lève les mains.',
                   trash: '« Je peux vous dire où va l’eau. Pas où va le bateau. »' }
        if (!tient('passe'))
          return { tous: 'Le boîtier demande un appairage. Il faut la clé du bateau.',
                   rabbit: '« Wilson l’avait sur lui. Forcément. »' }
        return {
          tous: ['White_Rabbit approche le passe du boîtier — c’est la clé du bateau autant que celle du ponton.',
                 'Le compas s’allume. Il entre dans le nœud de navigation et ne rouvre plus les yeux.'],
          rabbit: '« Je ne pilote pas un bateau. Je pilote un ordinateur qui pilote un bateau. Beaucoup plus sûr. »',
          flags: ['poste-barre'], visuels: ['poste-barre'],
        }
      },
    },

    aussieres: {
      nom: 'Les aussières et la gaffe',
      regarder: {
        tous: ['Deux aussières tournées sur leurs taquets, et une gaffe de quatre mètres couchée le long du bordé.',
               'Le ponton est contre le flanc : il faudra écarter la coque à la main avant que l’hélice serve à quelque chose.'],
        drakk: '« Voilà un poste que je comprends. »',
        rabbit: '« Il faut de la force et du timing. Je n’ai ni l’un ni l’autre. »',
      },
      utiliser: ({ a, qui }) => {
        if (a('poste-aussieres')) return 'Drakk tient la gaffe. Il attend le signal.'
        if (qui !== 'drakk')
          return { tous: 'La gaffe fait quatre mètres et le bateau huit tonnes. Tu ne l’écarteras pas seul.',
                   hercules: '« Poste occupé par quelqu’un de plus large que moi, j’espère. »',
                   trash: '« Ce n’est pas une question d’adresse. »' }
        return {
          tous: ['Drakk largue les deux tours, garde une aussière en main, et cale la gaffe contre le ponton.',
                 'Il ne pousse pas encore. Il attend.'],
          drakk: '« Je tiens l’amarre et le levier. Dites-moi quand. »',
          flags: ['poste-aussieres'], visuels: ['poste-aussieres'],
        }
      },
    },

    vigie: {
      nom: 'L’avant du bateau',
      regarder: {
        tous: ['Devant l’étrave, le chenal est balisé — mal. Deux feux sur trois sont éteints, et il y a des casiers partout.',
               'Quelqu’un devra dire ce qui arrive, parce que le boîtier ne voit que la carte.'],
        trash: '« Les casiers dérivent avec le courant. La carte ne sait pas ça. Moi, si. »',
        rabbit: '« Ma carte est à jour de 2079. Ça ne me rassure pas non plus. »',
      },
      utiliser: ({ a, qui }) => {
        if (a('poste-vigie')) return 'Trash est à l’étrave. Il ne s’assoit pas.'
        if (qui !== 'trash')
          return { tous: 'Tu regardes l’eau noire. Elle est noire.',
                   drakk: '« Je vois de l’eau. Beaucoup d’eau. »',
                   hercules: '« Je distingue le haut du bas et c’est à peu près tout. »' }
        return {
          tous: ['Trash monte à l’étrave, s’accroche à l’étai, et se penche au-dessus du noir.',
                 'Il ne regarde pas les balises. Il regarde le sens des rides sur l’eau.'],
          trash: '« Le courant porte au nord-est. Je vous préviendrai des casiers. Et de ce qui n’est pas un casier. »',
          flags: ['poste-vigie'], visuels: ['poste-vigie'],
        }
      },

      /* Trash est chamane, et il est déjà penché sur l'eau. Il peut
         demander de l'aide — DEMANDER, pas contraindre : c'est écrit
         dans sa fiche qu'il traite les esprits comme des personnes, y
         compris quand c'est un mauvais calcul. Ici c'en est un, et il
         le fait quand même. Le gain est du TEMPS, la seule monnaie qui
         compte dans un scénario qui se joue contre une heure d'audience. */
      parler: ({ a, qui }) => {
        if (a('esprit-eau')) return { tous: 'Il y a quelque chose sous l’étrave. Ça suit.',
                                      trash: '« Elle est là. Ne la remerciez pas trop fort, ça la gêne. »' }
        if (qui !== 'trash')
          return { tous: 'Tu parles à de l’eau noire. Elle ne répond pas.',
                   drakk: '« On ne hèle pas la mer sans y avoir jeté quelque chose. »' }
        if (!a('poste-vigie'))
          return { tous: 'Il faudrait déjà être à l’étrave, les mains dans le vent.',
                   trash: '« Pas d’ici. Il faut être penché dessus. »' }
        return {
          tous: ['Trash lâche l’étai d’une main et pose la paume à plat sur l’eau noire, jusqu’au poignet.',
                 'Il ne récite rien. Il demande, en sperethiel, et il attend.',
                 'Trente secondes. Puis le clapot s’aplatit sur deux mètres autour de la coque, et quelque chose de long se glisse sous l’étrave.',
                 'Trash remonte le bras. Il est blanc, et il tremble un peu.'],
          trash: ['« Elle vient. Elle n’a rien demandé, et c’est ce qui m’inquiète. »',
                  '« On ira vite. Trente minutes de gagnées, peut-être plus. »'],
          flags: ['esprit-eau', 'trash-epuise'],
          visuels: ['esprit-eau'],
        }
      },
    },

    radio: {
      nom: 'La VHF',
      regarder: {
        tous: ['Une VHF fixe, canal 16 allumé. Le port veille, et la Star aussi.',
               'Un voilier qui appareille à quatre heures du matin sans son propriétaire, ça se remarque.'],
        hercules: '« Ah. Voilà mon poste. »',
        rabbit: '« Je peux masquer le transpondeur. Je ne peux pas masquer une voix humaine qui pose une question. »',
        drakk: '« Le cor de guerre. Je m’en méfie. »',
      },
      utiliser: ({ a, qui }) => {
        if (a('poste-radio')) return 'Hercules a le micro sur les genoux et l’air très détendu.'
        if (qui !== 'hercules')
          return { tous: 'Si quelqu’un appelle, il faudra répondre quelque chose. Tu n’as rien à répondre.',
                   drakk: '« Je dirais la vérité. C’est mon défaut. »',
                   trash: '« On m’entendrait mentir. »',
                   rabbit: '« Une voix, ça ne se falsifie pas en quarante secondes. »' }
        return {
          tous: ['Hercules s’installe près du poste, décroche le micro, l’essaie une fois à vide, et s’éclaircit la gorge.'],
          hercules: '« Si on nous appelle, je suis le neveu de Wilson, je ramène le bateau au chantier, et mon oncle a la grippe. Personne ne vérifie une grippe. »',
          flags: ['poste-radio'], visuels: ['poste-radio'],
        }
      },
    },

    amarres: {
      nom: 'Le verrou de ponton',
      regarder: ({ a }) => {
        const postes = ['poste-barre','poste-aussieres','poste-vigie','poste-radio'].filter(p => a(p)).length
        return { tous: [`Deux aussières et un verrou de ponton électronique.`,
                        `Postes tenus : ${postes} sur 4.`] }
      },
      utiliser: ({ a, tient }) => {
        if (!tient('passe')) return 'Verrouillé au ponton. Il faut le passe, et le passe est sur Wilson.'
        if (!a('moteur-repare')) return 'Tu pourrais larguer. Et dériver, sans moteur, dans le noir. Non.'
        const manque = []
        if (!a('poste-barre'))     manque.push('personne à la barre')
        if (!a('poste-aussieres')) manque.push('personne pour écarter la coque')
        if (!a('poste-vigie'))     manque.push('personne à l’avant')
        if (!a('poste-radio'))     manque.push('personne pour répondre à la VHF')
        if (manque.length)
          return { tous: ['Pas comme ça.', 'Il manque : ' + manque.join(', ') + '.'],
                   hercules: '« Un bateau, c’est quatre paires de mains. On en a quatre. Servons-nous-en. »' }
        const commun = ['« Paré ? » — « Paré. » — « Paré. » — « Paré. »',
                        'Le passe libère le verrou. Drakk pousse sur la gaffe et la coque s’écarte d’un mètre, sans un bruit.',
                        'L’hélice mord. Trash annonce un casier à bâbord, White_Rabbit corrige sans ouvrir les yeux.']
        return a('esprit-eau')
          ? { tous: [...commun,
                     'Puis quelque chose prend le bateau par en dessous.',
                     'La coque cesse de taper. Le sillage se referme aussitôt derrière elle, comme si personne n’était passé.',
                     'Une vedette de la Star croise à trois cents mètres et ne voit rien — il n’y a rien à voir.',
                     'Vingt-six minutes. McNeil sort de la nuit comme un mur qu’on aurait posé sur l’eau.'],
              trash: '« Ne la regardez pas trop. »',
              visuels: ['appareillage'], minutes: 26, va: 'greffe' }
          : { tous: [...commun,
                     'Quarante minutes de clapot noir. À mi-parcours, une vedette de la Star appelle sur le 16.',
                     'Hercules répond qu’il ramène le bateau de son oncle au chantier. La vedette souhaite bon courage et s’éloigne.',
                     'La masse de McNeil sort de la nuit comme un mur qu’on aurait posé sur l’eau.'],
              drakk: '« Belle manœuvre, compagnons. »',
              visuels: ['appareillage'], minutes: 40, va: 'greffe' }
      },
      objets: {
        passe: 'Il faut d’abord que tout le monde soit à son poste.',
      },
    },

    pecheur: {
      nom: 'Un pêcheur de nuit',
      regarder: {
        tous: ['Trente mètres plus loin sur la jetée, un vieil humain pêche dans le noir. Il n’a pas de seau.',
               'Il vous a vus arriver et il a décidé de ne pas vous voir.'],
        hercules: '« Il n’a pas de seau, donc il ne pêche pas. Il est là pour être là. Celui-là a vu quelque chose. »',
        rabbit: '« Commlink éteint. Volontairement. À cette heure-ci, dans ce port, c’est un choix. »',
        drakk: '« Une sentinelle qui feint la pêche. Vieux stratagème. »',
        trash: '« Il a peur de nous, et il reste. Donc il a plus peur d’autre chose. »',
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
                     hercules: '« On ne paie pas avant d’avoir demandé. Ça vexe. »' }
          return {
            tous: ['Le créditube disparaît dans une poche cirée.',
                   '« Un grand type. Blond, une tête de plus que tout le monde. Il est monté sur le bateau vers onze heures. »',
                   '« Il est ressorti quand la vedette de la Star est passée. Pas couru. Marché. Comme s’il avait fini. »',
                   '« Et il est parti par le talus, pas par la route. »'],
            hercules: '« Il n’avait pas fini. C’est toute la différence, et c’est la nôtre. »',
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
                '« Il n’y est pas. Mais il y a été, ou il y sera. C’est le seul endroit qui vaille. »',
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
                '« Un homme qui s’enfuit ne marche pas. Celui-là croyait avoir terminé. »'],
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
                 rabbit: '« Un homme sans dossier, ça n’existe pas. Ça veut dire que le sien a été nettoyé, ou qu’il n’a jamais rien fait qui mérite d’être noté. Je ne sais pas laquelle des deux m’inquiète le plus. »',
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
        rabbit: '« Je peux réveiller une machine qui dort. Pas une qu’on a éteinte à la main. Celui qui a fait ça savait ce qu’il faisait. »',
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
      regarder: {
        tous: ['Cinquante bateaux éteints, des pontons qui grincent, et une odeur d’essence et de vase.',
               'Personne, sauf le pêcheur.'],
        trash: '« Il est passé par là. La trace va du parking au bateau, et elle revient. Il n’a pas couru en revenant. »',
        drakk: '« Une seule route, et pas de sortie de flanc. Si on nous coince ici, on se bat sur cette planche. »',
      },
    },
  },

  dialogues: {},
}
