/* ============================================================
   TABLEAU 1 — LE BAR À FLICS, 23 H.
   « La parole est à la défense », Les Dossiers McCarthy.

   Le scénario dit : rendez-vous à 23 h, boulot « légal », contrat officiel
   entre la Lone Star et des « prestataires de sécurité indépendants », et
   il faut au moins un runner avec un SIN assez convaincant pour que ça
   passe au juridique et à la paye.

   Décor au texte : vieux bar dans son jus, bar à flics-à-louer
   relativement méta-friendly, clients éparpillés aux fléchettes dont
   certains en uniforme doré, barman troll, photos usées des collègues
   tombés au-dessus du comptoir, et McCarthy attablé seul, à l'écart.
   ============================================================ */


import { equipiers } from './equipiers.js'

export const bar = {
  markup: 'scenes/bar.html',

  /* Chantier 13 : `visite` vient de `charge()`, 1 la première fois. Ce
     texte plantait 23 h en dur — le rejouer tel quel à un retour depuis
     la carte, à une heure qui n'est plus 23 h, contredirait l'horloge
     affichée au HUD. Ça reste tout ce que ce retour a à dire : le
     chantier 19 (une vraie « seconde fenêtre ») a été tranché avec
     l'utilisateur le 2026-08-26 — rien ne motive un retour au bar une
     fois `embauche` posé (aucune fiche, aucun objet n'y attend l'équipe),
     et chaque aller-retour coûte 70 minutes sur l'horloge de l'audience
     pour un gain nul. Voir `PLAN_EXECUTION.md`, chantier 19. */
  ouverture: (ctx, visite) => visite > 1
    ? ['Vous repoussez la porte battante du Claw & Order. La salle n’a pas changé — l’heure, elle, a tourné.']
    : ['Le Claw & Order, Downtown, 23 h. Un vieux bar dans son jus — un bar à flics-à-louer, relativement méta-friendly.',
       'Quelques clients éparpillés jouent aux fléchettes. Certains portent encore l’uniforme doré. Les fléchettes s’arrêtent en même temps que les conversations.',
       'Au nom de « McCarthy », le barman troll relève à peine les yeux de son comptoir et pointe le menton vers le fond, en grognant.',
       'À l’écart, attablé seul, un vieil ork attend. Il regarde la porte chaque fois qu’elle bat.'],

  /* ── LES QUATRE REGARDS ───────────────────────────────────────────
     Écrit le 2026-08-27. Le tableau qui OUVRE le jeu était l'un des deux
     seuls (avec `tribunal-salle`) à porter ses trois calques de lentille
     — depuis le premier jour, ici — et à ne rien dire quand on change de
     runner : le décor se colorait, et c'était tout. C'est précisément le
     défaut que le backlog appelle « le bar enseigne mal ».

     QUATRE ENTRÉES, PAS DEUX, et c'est le seul endroit où ça se
     justifie ainsi : ce tableau n'a pas à donner quatre informations, il
     a à démontrer qu'il y a quatre regards. Un runner qui ne dirait rien
     au premier essai enseignerait le contraire.

     ET AUCUNE NE DIT CE QU'UN HOTSPOT DIRA MIEUX. La lecture tactique
     s'arrête juste avant la ligne de tir (c'est `ligne-de-tir` qui la
     donne, et qui paie `sait-ligne`), et l'astrale ne décrit pas l'aura
     de McCarthy (c'est `mccarthy` qui la porte). Une vue cadre la salle ;
     elle ne vide pas les cibles de leur récompense. */
  vues: {
    sociale: [
      'Trente personnes dans cette salle portent une étoile, et une seule a choisi la table où la lumière ne va pas.',
      '« On ne donne pas rendez-vous dans un bar à flics pour se cacher. On y donne rendez-vous pour qu’on remarque les quatre types qui entrent, et pas celui qui attend. »',
      '« C’est ce que j’aurais fait. Je dis ça comme un compliment, remarquez. Je ne sais pas encore si c’en est un. »',
    ],
    astrale: [
      'Trente auras, et la même fatigue dans toutes — un uniforme qu’ils garderaient en dessous et qu’ils ont fini par ne plus sentir. Le troll, derrière son comptoir, est le seul qui soit entier.',
      '« Ils se ressemblent tous. »',
      '« Sauf celui du fond. »',
    ],
    ra: [
      'Vingt icônes flottent dans cette salle. Dix-huit sont de la réclame que personne n’a demandée ; les deux qui restent sont posées exactement au milieu.',
      '« Non, je ne filtre pas. Personne ne filtre. »',
      '« On apprend. »',
    ],
    materielle: [
      'Une porte. Un comptoir assez long pour s’y mettre à couvert. Quatre silhouettes dont il faudra savoir laquelle bouge en premier.',
      '« Une seule issue. Des habitués, et au moins six armes que je peux voir d’ici. »',
      '« Rien d’anormal. Je vais quand même regarder de plus près. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js).

       Chacun a une ligne dans la voix de chacun des trois autres. */

    ...equipiers('bar'),


    mccarthy: {
      nom: 'Le vieil ork',
      regarder: ({ a }) => a('parle:mccarthy')
        ? { tous: 'Inspecteur James McCarthy, brigade criminelle. Trente-quatre ans de maison, et il paie ce soir avec son propre créditube.',
            hercules: ['« Costume correct, montre bon marché, et il va régler l’addition lui-même. »',
                       '« Il n’a pas de budget. Ce qui veut dire que personne ne lui a dit de venir. Je devrais m’en réjouir. »'] }
        : { tous: ['Gabardine, col relevé à l’intérieur — il n’a pas prévu de rester.',
                   'Une étoile Lone Star à la ceinture, tournée vers l’intérieur. Il ne la montre pas.'],
            hercules: '« Il a choisi la table la plus mal éclairée de la salle. Ça, c’est quelqu’un qui a déjà réfléchi à qui pourrait entrer. »',
            trash: ['« Son aura est effilochée. Il ne dort pas depuis deux jours. »',
                    '« Elle est droite, par contre. »'],
            rabbit: ['« Un vieil ork. »',
                     '« C’est ce que les gens voient. Je sais comment ça marche. »'],
            drakk: ['« Un homme seul qui engage des mercenaires dans une auberge. »',
                    '« C’est le début d’à peu près tous les livres que j’ai lus. »'] },
      parler: { texte: [], dialogue: 'mccarthy' },
      utiliser: 'On ne bouscule pas un flic dans un bar à flics.',
    },

    photos: {
      nom: 'Les photos au-dessus du comptoir',
      regarder: {
        tous: ['Des photos usées, punaisées en désordre : les collègues tombés pour l’Étoile.',
               'Certaines sont là depuis si longtemps que le tirage a viré au jaune. Personne ne les remplace, et personne ne les enlève.'],
        hercules: '« Trente-quatre ans de maison. Il en a punaisé quelques-unes lui-même, j’imagine. »',
        trash: '« Personne ne les regarde. »',
        rabbit: ['« Aucune n’est numérisée. Pas de copie, rien. »',
                 '« Si ce mur brûle, il ne reste rien. »'],
        drakk: '« Le mur des compagnons tombés. Toutes les guildes en ont un. Celui-ci est mal tenu. »',
      },
      utiliser: 'Tu ne touches pas à ça. Pas ici, pas ce soir.',
    },

    barman: {
      nom: 'Le barman troll',
      regarder: {
        tous: 'Il essuie le même endroit du comptoir depuis que vous êtes entrés. C’est sa façon de dire qu’il vous a vus et qu’il s’en accommode.',
        hercules: ['« Il ne nous servira pas, et il ne nous jettera pas non plus. »',
                   '« C’est déjà une position. On peut travailler avec ça. »'],
        trash: '« Il nous a jaugés, puis il a arrêté d’y penser. »',
        rabbit: ['« Un troll qui tient un bar à flics. »', '« Il a dû en avaler. »'],
        drakk: '« L’aubergiste. On salue toujours l’aubergiste. »',
      },
      parler: { texte: [], dialogue: 'barman' },
      utiliser: 'Non.',
    },

    flechettes: {
      nom: 'Les joueurs de fléchettes',
      regarder: {
        tous: ['Quatre, dont deux en uniforme doré. Ils ont repris leur partie, mais moins fort qu’avant.',
               'L’un d’eux vise depuis un moment sans lancer. Il attend de voir à quelle table vous allez.'],
        hercules: '« Celui de gauche a une dette de jeu. Ça se voit à la façon dont il compte les points des autres. »',
        trash: '« Personne ne s’amuse. »',
        rabbit: '« Il n’a pas lancé depuis qu’on est entrés. »',
        drakk: '« Des lanceurs. Deux portent les couleurs de la garde. »',
      },
      parler: 'Ce n’est pas le moment, et ce ne sera jamais le moment.',
      utiliser: 'Tu ne ramasses pas une fléchette dans un bar plein d’étoiles. Pas ce soir.',
    },

    horloge: {
      nom: 'L’horloge',
      /* Le compte à rebours de l'audience (et « le gamin » chez Trash)
         n'a de sens qu'une fois le boulot connu — sinon on lit le calcul
         d'une échéance dont on n'a pas encore entendu parler. */
      regarder: ({ a }) => a('sait-le-job')
        ? { tous: ['Vingt-trois heures passées. Elle avance de quatre minutes et personne ne l’a jamais réglée.',
                   'Onze heures avant l’audience. Tu viens de faire le calcul sans le vouloir, et tu le referas toute la nuit.'],
            hercules: ['« Onze heures. J’ai connu plus court. »',
                       '« Jamais pour ce prix-là, ceci dit. Je ne sais pas encore si c’est bon signe. »'],
            trash: '« C’est le temps qu’il reste au gamin. »',
            rabbit: '« Quatre minutes d’avance. Jamais resynchronisée. »',
            drakk: '« Onze heures. C’est peu, pour un voyage et un procès. »' }
        : { tous: 'Vingt-trois heures passées. Elle avance de quatre minutes et personne ne l’a jamais réglée.',
            rabbit: '« Quatre minutes d’avance. Jamais resynchronisée. »',
            drakk: '« Elle avance, et personne ne la règle. »' },
      utiliser: 'La régler ne ferait pas gagner une minute.',
    },

    tasses: {
      nom: 'Les tasses vides',
      regarder: ({ a }) => a('parle:mccarthy')
        ? { tous: 'Trois. À une par heure, il a commencé à téléphoner vers vingt heures.',
            rabbit: ['« Six appels, trois tasses. »',
                     '« Il s’est fait raccrocher au nez toute la soirée. »'] }
        : { tous: ['Trois tasses vides devant un homme seul. Il n’a pas commandé d’alcool.',
                   'C’est la première chose qui te dit qu’il n’est pas là pour se détendre.'],
            hercules: '« Trois cafés à ce prix-là, pour lui, c’est déjà une dépense. »',
            trash: '« Il veut rester lucide. »',
            drakk: '« Trois cafés. Il attend depuis trois heures, alors. »' },
      utiliser: 'Ce ne sont pas tes tasses.',
    },

    /* D-Sofia — « McCarthy paie de sa poche. C'est écrit dans son
       dialogue et très bien joué, mais le joueur ne le VOIT jamais. »
       Son créditube personnel est sur la table depuis le début, à côté
       des tasses. Il l'a sorti avant que vous arriviez. */
    creditube: {
      nom: 'Un créditube, sur la table',
      regarder: {
        tous: ['Un créditube posé bien à plat près de son coude, déjà sorti. Ce n’est pas un modèle de service : c’est un tube personnel, usé aux angles.',
               'Il ne l’a pas encore poussé vers vous. Il attend de savoir combien il va devoir en enlever.'],
        hercules: ['« Personnel. Pas de logo de service, pas de plafond corpo. »',
                   '« Il va nous payer avec son propre argent. Je n’aime pas ça, et je vais le prendre quand même. »'],
        trash: '« Il l’a sorti avant qu’on arrive. Il a répété la scène tout seul. »',
        rabbit: '« Aucun jeton d’organisme derrière. C’est son compte à lui. »',
        drakk: ['« Il a posé la bourse avant le marchandage. »',
                '« Ça ne se fait pas. Il ne doit pas le savoir. »'],
      },
      utiliser: 'Il n’est pas à toi, et il n’est pas encore à toi.',
    },

    /* LA PORTE — retour de playtest le 22/08 : deux portes dans le même
       tableau, une abstraite (le seuil au sol, invisible tant qu'on ne
       le cherche pas) et une dessinée (celle-ci, un vrai sprite de
       porte) — mais c'était la mauvaise qui menait dehors. « La porte
       du fond n'a pas d'enjeu en tant qu'impasse, fais-en une sortie » :
       elle porte maintenant tout ce que `sortie` portait, et rien
       d'autre. Une chose du monde, une seule cible, et cette fois la
       cible visible est la bonne. `ward` (l'astral) et le seuil au sol
       n'avaient de sens que pour l'ancienne impasse : retirés avec
       elle plutôt que laissés à décrire une porte qui n'existe plus. */
    porte: {
      nom: 'La porte de la rue',
      sortie: 'carte',
      regarder: {
        tous: 'La porte battante par laquelle vous êtes entrés. Derrière, il pleut sur Downtown et il est bientôt minuit.',
        rabbit: '« Pas de lecteur, pas de serrure connectée. Ça s’ouvre à la main. »',
        drakk: ['« Une seule issue. Douze pas. »',
                '« Retenez le chiffre. »'],
      },
      /* `sait-ligne` était posé par la lecture tactique de Drakk et
         RELU NULLE PART dans tout le jeu — audit du 22/08 : le seul
         drapeau du projet à ne servir à rien. Il paie ici. Sortir en
         sachant que deux types sont sur la ligne de retraite n'est pas
         le même geste que sortir sans le savoir : c'est la plus petite
         récompense possible pour une observation, et elle suffit à ce
         que regarder avec le bon runner cesse d'être décoratif. */
      /* Chantier 13 : la porte ne paie plus le trajet elle-même et ne
         présume plus la destination — elle ouvre sur LA CARTE
         (`js/data/carte.js`), qui affiche le coût et le choix. Avant,
         elle disait « Tacoma est à quarante minutes » tout en ne
         prélevant que 35 sur l'horloge : un écart jamais visible à
         l'écran, et qui l'est devenu le jour où le coût s'est affiché
         ailleurs. Corrigé en même temps que le trajet a déménagé. */
      utiliser: ({ a }) => {
        if (!a('embauche'))
          return { tous: 'Pas sans avoir parlé au vieil ork. C’est pour lui que vous êtes venus.',
                   hercules: '« On ne quitte pas un rendez-vous avant d’avoir vu la couleur de l’argent. »' }
        return a('sait-ligne')
          ? { tous: ['Drakk sort le premier, et il passe entre les joueurs de fléchettes et la porte.',
                     'Les deux en uniforme doré le regardent faire. Aucun des deux ne se lève.',
                     'Vous sortez. La pluie a repris.'],
              drakk: '« On ne tourne pas le dos à une ligne qu’on a vue. On marche dessus. »',
              va: 'carte' }
          : { tous: 'Vous sortez. La pluie a repris.',
              va: 'carte' }
      },
    },

    bouteilles: {
      nom: 'Les bouteilles',
      regarder: {
        tous: ['Le rang des alcools sérieux, celui du haut. Personne n’y touche : ici on boit ce qui est en bas.',
               'Trois étiquettes sont retournées. Le genre de détail qui veut dire qu’on ne sert plus certaines maisons.'],
        hercules: '« J’ai bu la moitié de cette étagère à Las Vegas. Je la dois encore, d’ailleurs. »',
        drakk: ['« Trois étiquettes retournées. »',
                '« Chez nous ça voulait dire une dette. Ici je ne sais pas. »'],
      },
      utiliser: 'Le barman te suit du regard depuis que tu es entré. Non.',
    },

    comptoir: {
      nom: 'Le comptoir',
      /* La ligne d'Hercules citait « le dossier du gamin » sans condition —
         lisible avant même d'avoir appris qu'il y a un gamin, ou un dossier. */
      regarder: ({ a }) => ({
        tous: 'Zinc rayé, verni par quarante ans de coudes. On y a gravé des matricules, et quelqu’un en a barré plusieurs.',
        hercules: a('sait-gamin')
          ? ['« Quarante ans de coudes. »',
             '« Il s’est dit plus de choses ici que dans tout le dossier du gamin. Et je n’ai pas encore lu le dossier. »']
          : ['« Quarante ans de coudes. »',
             '« Les gens parlent plus au comptoir qu’en salle d’interrogatoire. Je ne dis pas ça au hasard. »'],
        rabbit: ['« Des matricules gravés. Certains barrés. »',
                 '« Personne n’a effacé. »'],
        drakk: '« La table du maître des lieux. On n’y pose pas les coudes sans y avoir été invité. »',
      }),
      utiliser: 'Tu n’es pas venu boire.',
    },

    verres: {
      nom: 'Verres et cendrier',
      regarder: {
        tous: 'Deux verres vides et un cendrier plein. Le service ne suit pas, ou plus personne n’y croit.',
        trash: '« Ils étaient deux. L’un des deux est parti sans finir son verre. »',
      },
      utiliser: 'Laisse.',
    },





    /* ── Cibles qui n'existent que dans une lentille ─────────────
       Elles sont dans le calque correspondant du décor : hors de la
       bonne vue, elles ne sont ni visibles ni cliquables. */

    /* ── Tactique : la lentille de Drakk ─────────────────────────
       Il ne voit ni aura ni donnée. Il voit une carte de bataille, et
       il la lit en vocabulaire d'auberge. Le cadre est faux, les
       conclusions sont bonnes — c'est ce qui le rend précieux.
       (Sa lecture de l'issue est sur `porte` : voir plus haut.) */
    /* ══ LA CIBLE DE LA LENTILLE SOCIALE — R1 ════════════════════════
       La première du jeu : Hercules avait zéro cible de calque contre
       onze à White_Rabbit, et c'est tout l'écart d'accès mesuré au 27.

       Une cible de calque n'est atteignable que par SON runner — le CSS
       ne rend les clics au calque que sous sa propre lentille. Elle ne
       porte donc que `tous` + la voix du porteur, exactement comme
       `ligne-de-tir` juste en dessous. Écrire les quatre voix ici
       serait du texte mort.

       `sait-regards` se paie sur `salle.regarder`, comme `sait-ligne`
       se paie sur `porte.utiliser` : un drapeau de perception, relu dans
       la scène même, sans ligne de bilan — ce n'est pas une conséquence
       que le monde retient, c'est une chose qu'on a comprise. */
    regards: {
      nom: 'Ce que la salle regarde',
      /* Une cible de calque est faite pour être REGARDÉE — c'est même
         la seule chose qu'on puisse en faire. Sans cette ligne, le clic
         gauche contextuel retombe sur `utiliser`, donc sur le refus, et
         la lentille ne rend rien au premier clic. Inerte tant que le
         moteur ne lit pas `principal` ; juste dès qu'il le lira. */
      principal: 'regarder',
      regarder: {
        tous: 'Trois personnes ont relevé la tête quand la porte a battu, et aucune ne l’a rebaissée depuis.',
        hercules: ['« Ils nous comptent. Quatre, dont un troll — c’est le genre de chose qu’on retient sans le vouloir. »',
                   '« Et lui, dans son coin, personne ne l’a regardé une seule fois. Il a payé pour ça, et il a bien payé : c’est nous qu’on remarquera en sortant. »'],
        flags: ['sait-regards'],
      },
      utiliser: {
        tous: 'On ne touche pas à ce qui n’est pas là. C’est une lecture, pas un objet.',
        hercules: '« Ça se regarde, ça ne se prend pas. »',
      },
    },

    'ligne-de-tir': {
      nom: 'Une ligne rouge',
      regarder: {
        tous: 'Une bande rouge relie les deux joueurs de fléchettes à la porte de la rue.',
        drakk: ['« Ces deux-là sont entre nous et la sortie depuis qu’on est entrés. »',
                '« Je ne sais pas si c’est exprès. »',
                '« À ma table, ça l’aurait été. »'],
        flags: ['sait-ligne'],
      },
      utiliser: {
        tous: 'Personne ne bouge encore. Pas ici, pas devant trente étoiles.',
        drakk: '« Je change juste qui marche devant. Ça suffit, pour l’instant. »',
      },
    },

    'commlink-mccarthy': {
      nom: 'Le commlink de McCarthy',
      regarder: {
        tous: 'Son commlink est posé face contre table, mais il diffuse encore son état.',
        rabbit: ['« Six appels en deux heures. Six numéros, tous très courts. »',
                 '« Il a cherché quelqu’un qui dise oui. »',
                 '« On est le fond de la liste. »'],
      },
      utiliser: {
        tous: 'Dans un bar à flics ? Non.',
        rabbit: ['« Je peux le faire. »', '« Je ne devrais pas. »'],
      },
    },

    noeud: {
      nom: 'Le nœud du bar',
      regarder: {
        tous: 'L’icône publique du Claw & Order flotte au-dessus du comptoir, dorée, mal tenue.',
        rabbit: ['« Nœud ouvert. Pas de filtre, pas de journal. »',
                 '« Si quelqu’un nous a écoutés, personne ne le saura. »',
                 '« Nous non plus. »'],
      },
      utiliser: {
        tous: 'Il faudrait un deck, et une raison.',
        rabbit: '« Pas ici. Pas dans une salle où trente personnes portent l’étoile. »',
      },
    },

    salle: {
      nom: 'La salle',
      /* Chantier 65. Le filtre s'achète ici, et c'est ici qu'on
         comprend ce qu'il fait — dans la seule salle du jeu où « ce que
         la Star a marqué elle-même » désigne les gens attablés. Du
         texte seul : on apprend l'outil, on ne gagne rien avec. */
      objets: {
        filtre: {
          tous: ['La salle s’éteint à moitié. Les enseignes, les menus, les icônes de commlink — tout ce qui voulait être vu disparaît d’un coup.',
                 'Ce qui reste allumé, ce sont les gens. Une petite marque de service au-dessus de neuf d’entre eux, en jaune terne. Les neuf qui sont encore en poste.'],
          rabbit: ['« Neuf. Sur trente. »', '« Et ils ne savent pas qu’ils la portent. »'],
          hercules: '« Range ça. Si l’un des neuf sait lire dans l’autre sens, on a fini notre nuit. »',
          trash: '« Tu vois qui est de service. Eux voient un homme qui regarde la salle sans rien commander. »',
          drakk: '« Neuf gardes en service, vingt et un au repos. C’est une information utile et je n’aime pas la manière dont on l’a eue. »',
        },
      },
      /* R1 : `sait-regards` (la cible du calque social) se paie ici.
         La salle ne change pas — c'est ce qu'on en sait qui change, et
         seulement pour celui qui l'a vu. Les trois autres voix restent
         mot pour mot ce qu'elles étaient. */
      regarder: ({ a }) => ({
        tous: a('sait-regards')
          ? ['Des flics en fin de service, quelques-uns en début. Personne ne parle fort.',
             'Et trois têtes qui ne se sont pas rebaissées depuis que vous êtes entrés.']
          : 'Des flics en fin de service, quelques-uns en début. Personne ne parle fort. Un bar à flics à 23 h, c’est plus calme qu’une bibliothèque.',
        hercules: a('sait-regards')
          ? ['« On est la seule chose neuve de la soirée. Ça ne durera pas, mais ça dure encore. »',
             '« Et lui, il attendait déjà. Personne ne saura dire depuis quand. »']
          : ['« Que des gens qui savent ce que vaut un contrat. La négociation va être honnête. »',
             '« C’est embêtant. Je suis meilleur quand elle ne l’est pas. »'],
        trash: '« Tout le monde écoute. »',
        rabbit: '« Trente commlinks, tous en mode discret. »',
        drakk: '« Une salle commune. Peu de rires. »',
      }),
      utiliser: 'On ne réarrange pas un bar à flics. On y reste discret, ou on en sort.',
    },
  },

  dialogues: {

    /* ── LE COMPTOIR ─────────────────────────────────────────────────
       La scène de courses. Décision T5 de TRAME.md : pas de compteur
       d'argent, pas de boutique. On paie parce que White_Rabbit est là,
       et chaque paiement a sa réplique — un homme au train de vie élevé
       qui a acheté jusqu'à son visage, et qui recommence.

       Rien de ce qui s'achète ici n'ouvre un verrou (règle 19). */
    barman: {
      qui: 'barman',
      accueil: ['Il pose son chiffon. C’est déjà beaucoup.',
                '« Quoi. »'],
      retour: ['« Encore. »'],
      sujets: [
        {
          id: 'rang-haut',
          titre: '« La rangée du haut. Une bouteille. » (White_Rabbit paie)',
          acteur: 'rabbit',
          quand: ({ a }) => !a('achat-bouteille'),
          flags: ['achat-bouteille'],
          objets: ['bouteille'],
          texte: ['Il regarde White_Rabbit. Puis l’étagère. Puis White_Rabbit.',
                  '« Personne prend celles du haut. »',
                  'Il la descend quand même, l’essuie par habitude, et la pose sur le zinc.',
                  'White_Rabbit paie sans regarder le montant. C’est la seule chose qu’il fasse sans regarder.',
                  '« … Bonne nuit. »'],
        },
        {
          id: 'filtre',
          titre: '« Vous gardez des choses derrière le comptoir. » (White_Rabbit paie)',
          acteur: 'rabbit',
          quand: ({ a }) => a('sait-le-job') && !a('achat-filtre'),
          flags: ['achat-filtre'],
          objets: ['filtre'],
          texte: ['« Des ardoises. »',
                  'Il sort une caisse de sous le zinc. Des montres, un cyberbras d’occasion, trois commlinks.',
                  '« Ça, c’est un flic qui l’a laissé en juillet. Filtre d’ORA de service. Il est jamais revenu. »',
                  'White_Rabbit le prend, l’allume, et la moitié de la salle s’éteint dans ses yeux.',
                  '« Il me doit encore quarante. Vous, vous me devez plus rien. »'],
        },
        {
          id: 'verre-mccarthy',
          titre: '« Le café du vieux, c’est pour nous. » (White_Rabbit paie)',
          acteur: 'rabbit',
          quand: ({ a }) => a('parle:mccarthy') && !a('verre-mccarthy'),
          flags: ['verre-mccarthy'],
          texte: ['« Il a déjà payé. »',
                  '« Il paie toujours. »',
                  'Il regarde le fond de la salle, puis efface trois lignes de son ardoise avec le pouce.',
                  '« Vous lui direz pas. »'],
        },
        {
          id: 'photos-barman',
          titre: '« Les photos, au-dessus. »',
          texte: ['« Elles étaient là avant moi. »',
                  '« J’ai demandé une fois si on les enlevait un jour. On m’a répondu que non. »',
                  'Il reprend son chiffon.',
                  '« Leurs noms, je les connais pas. Personne me les a dits et j’ai jamais demandé. »'],
        },
        {
          id: 'partir-barman',
          titre: '(Le laisser essuyer.)',
          fin: true,
          texte: ['Il essuyait déjà.'],
        },
      ],
    },

    mccarthy: {
      qui: 'mccarthy',
      accueil: ['« Vous êtes en retard de six minutes. »',
                '« C’est pas grave. Moi, j’ai que ça. Asseyez-vous. »'],
      retour: ['« Autre chose ? »'],
      sujets: [
        {
          id: 'job',
          titre: '« On nous a parlé d’un boulot légal. »',
          flags: ['sait-le-job'],
          texte: ['« Un transfert. Un gamin à McNeil, il passe devant le juge demain à dix heures. »',
                  '« Vous allez le chercher, vous me le ramenez, et vous le gardez en vie jusqu’à l’audience. »',
                  '« C’est tout. C’est déjà beaucoup. »'],
        },
        {
          id: 'gamin',
          titre: '« Quel gamin ? »',
          quand: ({ a }) => a('sait-le-job'),
          flags: ['sait-gamin'],
          texte: ['« Lester. Vingt ans. Ork. Ramassé dans une descente à Redmond. »',
                  '« On l’accuse du meurtre de Teresa Banks. Une elfe du Tír. Le genre de nom qui fait bouger des gens. »'],
        },
        {
          id: 'dossier',
          titre: '« Et il l’a tuée ? »',
          quand: ({ a }) => a('sait-gamin'),
          flags: ['sait-dossier-vide'],
          fiches: ['dossier-vide', 'elfe-autopsie'],
          texte: ['« L’autopsie dit que le dernier à l’avoir touchée était un elfe. On n’a pas une trace de lui sur elle. »',
                  '« Le dossier est vide. Je le sais. Ça n’a jamais arrêté personne. »',
                  '« Et non, j’ai pas dit “parce qu’il est ork”. J’ai pas besoin de le dire. »',
                  '« Qui l’a vidé, ce dossier ? J’ai pas réussi à le savoir. Trente-quatre ans de maison, et j’ai pas réussi. »'],
        },
        {
          id: 'pourquoi',
          titre: '« Pourquoi nous, et pas la Star ? »',
          quand: ({ a }) => a('sait-dossier-vide'),
          fiches: ['navette-huit-heures'],
          texte: ['« Parce que si je le fais transférer par la navette de huit heures, il arrive pas. »',
                  '« Il aura un accident, ou un remords subit. J’ai déjà lu le rapport, je peux vous le réciter. »',
                  '« Qui l’écrira, ce rapport ? Je sais pas. C’est ça qui m’empêche de dormir, pas le reste. »'],
        },
        /* D14 — LA VICTIME.
           Son nom apparaissait UNE FOIS en trois tableaux, comme un
           élément de dossier. C'est pourtant le sujet du scénario :
           « la victime intéresse tout le monde moins que le scandale ».
           Ce sujet est le seul endroit du jeu où quelqu'un demande. */
        {
          id: 'teresa',
          titre: '« Et elle ? Teresa Banks. »',
          quand: ({ a }) => a('sait-gamin'),
          flags: ['sait-teresa'],
          fiches: ['teresa'],
          texte: ['Il lève les yeux. C’est la première fois depuis que vous êtes assis.',
                  '« … »',
                  '« Vingt-deux ans. Étranglée. Elle avait un SIN Telestrian et une adresse à Bellevue qu’elle n’habitait plus. »',
                  '« Trois jours que je suis dessus. Vous êtes les premiers à poser la question. »',
                  '« Ça ne lui fait ni chaud ni froid, remarquez. Mais je le note. »'],
        },
        {
          id: 'contrat',
          titre: '« Vous parliez d’un contrat. »',
          quand: ({ a }) => a('sait-le-job'),
          texte: ['« Prestation de sécurité indépendante. Signé Lone Star, en bonne et due forme. »',
                  '« Il me faut un SIN qui passe au juridique et à la paye. Un seul suffit. Je serai pas regardant — je sais très bien pourquoi je paye. »'],
        },
        {
          id: 'argent',
          titre: '« Et si on trouvait ça un peu léger ? » (Hercules)',
          acteur: 'hercules',
          quand: ({ a }) => a('sait-le-job'),
          /* Le scénario est explicite : McCarthy coupe court à toute
             tentative de négociation. Il ne marchande pas, il explique
             pourquoi il ne peut pas — ce qui est pire. */
          texte: ['« Non. »',
                  '« Je peux pas monter plus haut. C’est mon argent, pas le leur. Le budget officiel sera coupé demain matin par quelqu’un qui aura reçu un coup de fil. »',
                  '« Alors c’est ça, ou c’est rien, et le gamin monte dans la navette de huit heures. »'],
        },
        {
          id: 'passeur',
          titre: '« McNeil, c’est une île. »',
          quand: ({ a }) => a('sait-le-job'),
          texte: ['« Un passeur. Wilson. Il attend sur un quai à Tacoma, au Sunnyside Beach Park. »',
                  '« Il est déjà payé, alors discutez pas. Et il essaie de se faire appeler l’Amiral. Ça marche pas, mais il essaie. »',
                  '« Est-ce qu’il est fiable ? Aucune idée. Il est disponible. À trois heures du matin, c’est le même mot. »'],
        },
        {
          id: 'mandat',
          titre: '« Et à McNeil, on entre comment ? »',
          quand: ({ a }) => a('sait-le-job'),
          texte: ['« Avec le mandat de transfert. Vous le présentez, ils vous le sortent. C’est légal, je vous rappelle. »',
                  '« Après, vous vous planquez, et vous êtes au tribunal de Downtown à dix heures. Spring Street, à l’angle de la 5e. »',
                  '« Où vous planquer, ça je sais pas. J’ai jamais eu à me cacher de mes propres collègues. »'],
        },
        {
          id: 'accepter',
          titre: '(Signer.)',
          quand: ({ a }) => a('sait-le-job') && a('vu:contrat'),
          fin: true,
          flags: ['embauche'],
          objets: ['contrat', 'mandat', 'dossier'],
          texte: ['« Bien. »',
                  '« Dix heures. Après, ça ne sert plus à rien. »',
                  'Il pousse deux feuillets sur la table : le contrat, et le mandat de transfert.',
                  /* LE TROISIÈME. Le scénario fait démarrer la
                     contre-enquête sur la lecture du dossier, pendant
                     l'attente à la planque. Encore faut-il l'avoir. */
                  'Puis il hésite, et il pousse une troisième chose : une chemise cartonnée, épaisse, cornée aux angles.',
                  '« Ça, c’est pas dans le contrat. »',
                  '« Vous allez avoir deux heures à tuer quelque part avant l’audience. Lisez-le. Ou le lisez pas. »',
                  'Il retourne à sa quatrième tasse. L’entretien est fini, et la porte de la rue est derrière vous.'],
        },
        /* Un sujet par runner : chacun pose la question que les trois
           autres ne poseraient pas. C'est la règle 10 appliquée au
           dialogue, et c'est ce qui rend le choix du runner sensible. */
        {
          id: 'tir',
          titre: '« La victime était du Tír. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => a('sait-gamin'),
          texte: ['Le vieil ork le regarde autrement. « Vous connaissez ? »',
                  '« Alors vous savez ce que ça veut dire, une famille de là-bas qui veut que ça se taise. »',
                  '« Moi je l’ai appris en trois jours. Ça m’a suffi. »'],
          flags: ['sait-famille'],
          fiches: ['famille-tir'],
        },
        {
          id: 'ork',
          titre: '« Le gamin est ork. C’est ça, le dossier. » (White_Rabbit)',
          acteur: 'rabbit',
          quand: ({ a }) => a('sait-dossier-vide'),
          texte: ['« … »',
                  '« Trente-quatre ans que je porte cette étoile. J’ai signé des rapports que je ne relis pas. »',
                  '« Celui-là, je le relis. C’est pour ça que vous êtes là. »'],
          flags: ['mccarthy-avoue'],
        },
        {
          id: 'opposition',
          titre: '« Combien d’hommes en face ? » (Drakk)',
          acteur: 'drakk',
          quand: ({ a }) => a('sait-le-job'),
          texte: ['« Aucune idée. Officiellement, personne : le transfert est légal et c’est moi qui le signe. »',
                  '« Officieusement, quelqu’un a passé un coup de fil il y a deux heures, et je ne sais pas à qui. »'],
        },
        {
          id: 'partir',
          titre: '(Le laisser boire.)',
          fin: true,
          texte: ['« Mmh. »'],
        },
      ],
    },
  },
}
