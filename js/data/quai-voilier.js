/* ============================================================
   TABLEAU 2 BIS — LE VOILIER, DE PRÈS.

   Vue rapprochée, pas un nœud de carte : on ne quitte pas le quai, on
   se penche sur une chose qu'il contient. Zéro minute, jamais dans
   `carte.js` (PLAN_VUES_RAPPROCHEES § 3).

   Neuf cibles avaient partagé un sprite de 86 u de large — un tiers du
   cadre — et cinq d'entre elles n'avaient pas un pixel de marge sous
   le seuil de lisibilité. Elles DÉMÉNAGENT ici, à l'échelle ×2 du même
   sprite (déjà doublé au chantier 7 : à 172 u, c'est exactement le
   grain d'un sprite normal). Le texte ne bouge pas — il est déjà
   écrit, repris tel quel depuis `quai.js`. Une chose du monde, une
   seule cible (§ 5) : ces neuf-là n'existent plus dans la vue large.
   ============================================================ */

export const quaiVoilier = {
  markup: 'scenes/quai-voilier.html',

  /* Le voilier « dit toujours ce qui manque encore » (c'était la
     promesse de son `utiliser` dans la vue large) : la même règle,
     reprise ici en `ouverture`, pour qu'un aller-retour par `reculer`
     ne fasse jamais perdre le fil de ce qu'il reste à faire. */
  ouverture: ({ a, tient }) => {
    const reste = []
    if (!a('corps-vu')) reste.push('l’écoutille de la cabine est ouverte, et personne n’en est ressorti')
    if (!tient('passe')) reste.push('le ponton est verrouillé, et le passe n’est pas sur toi')
    if (!a('trappe-ouverte')) reste.push('la trappe du compartiment moteur est coincée')
    else if (!a('moteur-repare')) reste.push('le moteur ne prend pas')
    if (a('moteur-repare')) {
      const p = ['poste-barre', 'poste-aussieres', 'poste-vigie', 'poste-radio'].filter((x) => a(x)).length
      if (p < 4) reste.push(`l’équipage n’est pas à son poste (${p} sur 4)`)
    }
    return reste.length
      ? ['Le pont, de près.', 'Il reste que ' + reste.join(', et que ') + '.']
      : ['Le pont, de près.', 'Le moteur tourne, le passe est dans ta poche. Il ne manque plus qu’à larguer.']
  },

  /* `visuels` ne survit pas à un `charge()` — chaque réentrée le vide
     avant de le reconstruire. Sans ça, un aller-retour par `reculer`
     effacerait visuellement une trappe déjà ouverte ou un poste déjà
     tenu, alors que le drapeau, lui, reste vrai. C'est le premier
     endroit du jeu qui se revisite ; c'est pour ça que personne n'avait
     eu besoin de cette ligne avant. */
  entree: ({ a }) => [
    ...(a('corps-vu') ? ['cabine-ouverte'] : []),
    ...(a('trappe-ouverte') ? ['trappe-ouverte'] : []),
    ...(a('moteur-repare') ? ['moteur-ok'] : []),
    ...(a('poste-vigie') ? ['poste-vigie'] : []),
    ...(a('poste-aussieres') ? ['poste-aussieres'] : []),
    ...(a('poste-radio') ? ['poste-radio'] : []),
    ...(a('poste-barre') ? ['poste-barre'] : []),
    ...(a('esprit-eau') ? ['esprit-eau'] : []),
  ],

  hotspots: {

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
      sortie: 'greffe',
      regarder: ({ a }) => {
        const postes = ['poste-barre', 'poste-aussieres', 'poste-vigie', 'poste-radio'].filter((p) => a(p)).length
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
              minutes: 26, va: 'greffe' }
          : { tous: [...commun,
                     'Quarante minutes de clapot noir. À mi-parcours, une vedette de la Star appelle sur le 16.',
                     'Hercules répond qu’il ramène le bateau de son oncle au chantier. La vedette souhaite bon courage et s’éloigne.',
                     'La masse de McNeil sort de la nuit comme un mur qu’on aurait posé sur l’eau.'],
              drakk: '« Belle manœuvre, compagnons. »',
              minutes: 40, va: 'greffe' }
      },
      objets: {
        passe: 'Il faut d’abord que tout le monde soit à son poste.',
      },
    },

    /* Le retour, dessiné (règle 2) : pas de vue rapprochée sans lui.
       Gratuit — regarder est déjà gratuit, et s'approcher en est une
       forme (§ 3 du plan). */
    reculer: {
      nom: 'Redescendre sur le ponton',
      sortie: 'quai',
      regarder: {
        tous: 'Le ponton, juste en contrebas.',
      },
      utiliser: {
        tous: 'Tu redescends sur le ponton.',
        va: 'quai',
      },
    },
  },

  dialogues: {},
}
