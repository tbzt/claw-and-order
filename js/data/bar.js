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

  ouverture: [
    'Le Claw & Order, Downtown, 23 h. Un vieux bar dans son jus — un bar à flics-à-louer, relativement méta-friendly, ce qui explique qu’on vous laisse entrer.',
    'Quelques clients éparpillés jouent aux fléchettes. Certains portent encore l’uniforme doré. Les fléchettes s’arrêtent en même temps que les conversations.',
    'Au nom de « McCarthy », le barman troll relève à peine les yeux de son comptoir et pointe le menton vers le fond, en grognant.',
    'À l’écart, attablé seul, un vieil ork attend. Il est visiblement nerveux.',
  ],

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js).

       Chacun a une ligne dans la voix de chacun des trois autres. */

    ...equipiers('bar'),


    mccarthy: {
      nom: 'Le vieil ork',
      regarder: ({ a }) => a('parle:mccarthy')
        ? { tous: 'Inspecteur James McCarthy, brigade criminelle. Trente-quatre ans de maison, et il paie ce soir avec son propre créditube.',
            hercules: '« Costume correct, montre bon marché, addition qu’il réglera lui-même. Il n’a pas de budget. Il a un problème. »' }
        : { tous: ['Gabardine, col relevé à l’intérieur — il n’a pas prévu de rester.',
                   'Une étoile Lone Star à la ceinture, tournée vers l’intérieur. Il ne la montre pas.'],
            hercules: '« Il a choisi la table la plus mal éclairée de la salle. Ça, c’est quelqu’un qui a déjà réfléchi à qui pourrait entrer. »',
            trash: ['« Son aura est effilochée. Il ne dort pas, et pas depuis avant-hier. »',
                    '« Mais elle est droite. Il a peur, il n’a pas honte. »',
                    '« Ce n’est pas un homme qui nous vend. C’est un homme qui n’a plus personne à qui demander. »'],
            rabbit: '« Un vieil ork. Voilà. C’est ça que tout le monde voit avant d’entendre ce qu’il dit. »',
            drakk: '« Un homme seul qui engage des mercenaires dans une auberge. Dans mon livre, c’est toujours ainsi que ça commence. »' },
      parler: { texte: [], dialogue: 'mccarthy' },
      utiliser: 'On ne bouscule pas un flic dans un bar à flics.',
    },

    photos: {
      nom: 'Les photos au-dessus du comptoir',
      regarder: {
        tous: ['Des photos usées, punaisées en désordre : les collègues tombés pour l’Étoile.',
               'Certaines sont là depuis si longtemps que le tirage a viré au jaune. Personne ne les remplace, et personne ne les enlève.'],
        hercules: '« Trente-quatre ans de maison. Il en a punaisé quelques-unes lui-même, j’imagine. »',
        trash: '« Personne ne les regarde. C’est ça qui me gêne. Pas les photos. »',
        rabbit: ['« Aucune n’est numérisée. Pas de copie, pas de sauvegarde, rien. »',
                 '« Le jour où ce mur brûle, ils meurent une deuxième fois. »'],
        drakk: '« Le mur des compagnons tombés. Toutes les guildes en ont un. Celui-ci est mal tenu. »',
      },
      utiliser: 'Tu ne touches pas à ça. Pas ici, pas ce soir.',
    },

    barman: {
      nom: 'Le barman troll',
      regarder: {
        tous: 'Il essuie le même endroit du comptoir depuis que vous êtes entrés. C’est sa façon de dire qu’il vous a vus et qu’il s’en accommode.',
        hercules: '« Il ne nous servira pas et il ne nous jettera pas. C’est exactement le service que je demande. »',
        trash: '« Il nous a jaugés en une seconde, puis il a arrêté d’y penser. J’aimerais savoir faire ça. »',
        rabbit: '« Un troll qui tient un bar à flics. Il a dû en avaler, des choses, pour avoir le droit d’être là. »',
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
        trash: '« Ils jouent, et personne ne s’amuse. »',
        rabbit: '« Il n’a pas lancé depuis qu’on est entrés. Un bras armé qui ne se détend pas, ça finit toujours par se détendre. »',
        drakk: '« Des lanceurs. Deux portent les couleurs de la garde. »',
      },
      parler: 'Ce n’est pas le moment, et ce ne sera jamais le moment.',
    },

    horloge: {
      nom: 'L’horloge',
      regarder: {
        tous: ['Vingt-trois heures passées. Elle avance de quatre minutes et personne ne l’a jamais réglée.',
               'Onze heures avant l’audience. Tu viens de faire le calcul sans le vouloir, et tu le referas toute la nuit.'],
        hercules: '« Onze heures. J’ai connu des délais plus courts. Jamais pour moins cher. »',
        trash: '« C’est le temps qu’il reste au gamin. Dit comme ça, ça ne fait pas beaucoup. »',
        rabbit: '« Quatre minutes d’avance sur la grille, et jamais resynchronisée. Personne ici n’a envie d’être à l’heure. »',
        drakk: '« Le sablier tourne. Il tourne toujours. »',
      },
      utiliser: 'La régler ne ferait pas gagner une minute.',
    },

    tasses: {
      nom: 'Les tasses vides',
      regarder: ({ a }) => a('parle:mccarthy')
        ? { tous: 'Trois. À une par heure, il a commencé à téléphoner vers vingt heures.',
            rabbit: '« Six appels, trois tasses. Il a passé la soirée à se faire raccrocher au nez. »' }
        : { tous: ['Trois tasses vides devant un homme seul. Il n’a pas commandé d’alcool.',
                   'C’est la première chose qui te dit qu’il n’est pas là pour se détendre.'],
            hercules: '« Trois cafés à ce prix-là, pour lui, c’est déjà une dépense. »',
            trash: '« Il veut rester lucide. Un homme qui a peur commande autre chose. »',
            drakk: '« Trois potions d’éveil. Voilà quelqu’un qui se prépare. »' },
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
        hercules: '« Personnel. Pas de logo de service, pas de plafond corpo. Cet homme va nous payer avec ce qu’il n’aura plus. »',
        trash: '« Il l’a sorti avant qu’on arrive. Il a répété la scène tout seul. »',
        rabbit: '« Aucun jeton d’organisme derrière. C’est sa vie qui est dedans, pas un budget. »',
        drakk: '« Une bourse posée sur la table avant même le marchandage. Voilà quelqu’un qui n’a jamais négocié. »',
      },
      utiliser: 'Il n’est pas à toi, et il n’est pas encore à toi.',
    },

    /* UNE CHOSE DU MONDE, UNE SEULE CIBLE. La ligne de retraite de Drakk
       était un second hotspot posé exactement sur celui-ci : sa lentille
       retirait la sortie au lieu de la désigner. Sa lecture tactique est
       maintenant sa ligne à lui sur la porte, ce qui est précisément ce
       que la règle 10 demande. */
    sortie: {
      nom: 'La porte de la rue',
      regarder: {
        tous: 'La porte battante par laquelle vous êtes entrés. Derrière, il pleut sur Downtown et il est bientôt minuit.',
        drakk: ['« Notre monture attend dehors. »',
                '« Une seule issue franche. Douze pas. »',
                '« Le fond est un cul-de-sac : qui s’y engage se fait prendre entre deux murs. »',
                '« Retenez-le. Ça servira, ou ça ne servira pas, mais on ne le sait qu’après. »'],
      },
      utiliser: ({ a }) => a('embauche')
        ? { tous: ['Vous sortez. La pluie a repris.',
                   'Tacoma est à quarante minutes, et le Sunnyside Beach Park est au bout.'],
            minutes: 35, va: 'quai' }
        : { tous: 'Pas sans avoir parlé au vieil ork. C’est pour lui que vous êtes venus.',
            hercules: '« On ne quitte pas un rendez-vous avant d’avoir vu la couleur de l’argent. »' },
    },

    porte: {
      nom: 'Porte du fond',
      regarder: {
        tous: 'Elle donne sur l’arrière-salle. Verre dépoli, éclairé de l’autre côté. Personne n’y entre pendant que tu regardes.',
        rabbit: '« Pas de lecteur, pas de serrure connectée. Ça s’ouvre à la main. Donc ça ne s’ouvre pas pour moi. »',
        drakk: '« Une seconde issue. Fermée, gardée, et nul ne s’en approche. »',
      },
      utiliser: ({ a }) => a('embauche')
        ? 'Pas par là. Ta soirée commence dehors, sur un quai du Sunnyside Beach Park.'
        : 'Tu n’as rien à faire là-dedans, et deux tables t’ont déjà remarqué.',
    },

    bouteilles: {
      nom: 'Les bouteilles',
      regarder: {
        tous: ['Le rang des alcools sérieux, celui du haut. Personne n’y touche : ici on boit ce qui est en bas.',
               'Trois étiquettes sont retournées. Le genre de détail qui veut dire qu’on ne sert plus certaines maisons.'],
        hercules: '« J’ai bu la moitié de cette étagère à Las Vegas. Je la dois encore, d’ailleurs. »',
        drakk: '« Des philtres. Trois sont retournés : signe de deuil, ou signe de dette. »',
      },
      utiliser: 'Le barman te suit du regard depuis que tu es entré. Non.',
    },

    comptoir: {
      nom: 'Le comptoir',
      regarder: {
        tous: 'Zinc rayé, verni par quarante ans de coudes. On y a gravé des matricules, et quelqu’un en a barré plusieurs.',
        hercules: '« Quarante ans de coudes. Il y a plus d’histoire là-dessus que dans le dossier du gamin. »',
        rabbit: '« Des matricules gravés, et des matricules barrés. Personne n’a jamais pensé à effacer. Ici, on n’efface pas : on raye. »',
        drakk: '« La table du maître des lieux. On n’y pose pas les coudes sans y avoir été invité. »',
      },
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

    ward: {
      nom: 'Quelque chose sur la porte du fond',
      regarder: {
        tous: 'Sur l’arrière-salle, une barrière. Du travail d’occasion, refait plusieurs fois par-dessus lui-même.',
        trash: ['« Bon marché, et ancienne. Ils la font renouveler par quelqu’un qui passe. »',
                '« Dans un bar à flics, l’arrière-salle est le seul endroit qui vaut la peine d’être gardé. Notez-le. »'],
      },
      utiliser: 'Tu n’as aucune raison de la toucher, et une très bonne de ne pas le faire.',
    },

    /* ── Tactique : la lentille de Drakk ─────────────────────────
       Il ne voit ni aura ni donnée. Il voit une carte de bataille, et
       il la lit en vocabulaire d'auberge. Le cadre est faux, les
       conclusions sont bonnes — c'est ce qui le rend précieux.
       (Sa lecture de l'issue est sur `sortie` : voir plus haut.) */
    'ligne-de-tir': {
      nom: 'Une ligne rouge',
      regarder: {
        tous: 'Une bande rouge relie les deux joueurs de fléchettes à la porte de la rue.',
        drakk: ['« Ces deux-là sont entre nous et la sortie depuis que nous sommes entrés. »',
                '« Je ne dis pas qu’ils y sont pour quelque chose. Je dis qu’ils y sont. »',
                '« Un bon maître de jeu ne place jamais deux hostiles sur la ligne de retraite par hasard. Mais la vie n’est pas un bon maître de jeu. »'],
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
        rabbit: ['« Six appels en deux heures, six numéros différents, tous très courts. »',
                 '« Il n’a pas monté une opération. Il a cherché quelqu’un qui dise oui, et il a raclé jusqu’en bas. »',
                 '« On est le fond de la liste. »'],
      },
      utiliser: {
        tous: 'Dans un bar à flics ? Non.',
        rabbit: '« Je peux. Je ne devrais pas. Je peux quand même. »',
      },
    },

    noeud: {
      nom: 'Le nœud du bar',
      regarder: {
        tous: 'L’icône publique du Claw & Order flotte au-dessus du comptoir, dorée, mal tenue.',
        rabbit: ['« Nœud ouvert, pas de filtre, pas de journal de connexion. »',
                 '« Ce qui veut dire que si quelqu’un a écouté ce qu’on vient de se dire, personne ne le saura jamais. »',
                 '« Y compris nous. »'],
      },
      utiliser: {
        tous: 'Il faudrait un deck, et une raison.',
        rabbit: '« Pas ici. Pas dans une salle où trente personnes portent l’étoile. »',
      },
    },

    salle: {
      nom: 'La salle',
      regarder: {
        tous: 'Des flics en fin de service, quelques-uns en début. Personne ne parle fort. Un bar à flics à 23 h, c’est plus calme qu’une bibliothèque.',
        hercules: '« Que des gens qui savent ce que vaut un contrat. La négociation va être honnête. C’est le pire cas de figure. »',
        trash: '« Personne ne parle fort, et tout le monde écoute. Ce n’est pas du calme, c’est de l’attention. »',
        rabbit: '« Trente commlinks, tous en mode discret. Le réseau le plus poli de Seattle. »',
        drakk: '« Une salle commune. Peu de rires. Mauvaise auberge. »',
      },
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
          quand: ({ a, qui }) => qui === 'rabbit' && !a('achat-bouteille'),
          flags: ['achat-bouteille'],
          objets: ['bouteille'],
          texte: ['Il regarde White_Rabbit. Puis l’étagère. Puis White_Rabbit.',
                  '« Personne prend celles du haut. »',
                  'Il la descend quand même, l’essuie par habitude, et la pose sur le zinc.',
                  'White_Rabbit paie sans regarder le montant. C’est la seule chose qu’il fasse sans regarder.',
                  '« … Bonne nuit. »'],
        },
        {
          id: 'rang-haut-refus',
          titre: '« La rangée du haut. Une bouteille. »',
          quand: ({ a, qui }) => qui !== 'rabbit' && !a('achat-bouteille'),
          texte: ['« Vous avez de quoi ? »',
                  'Il n’a pas tort de demander.'],
        },
        {
          id: 'filtre',
          titre: '« Vous gardez des choses derrière le comptoir. » (White_Rabbit paie)',
          quand: ({ a, qui }) => qui === 'rabbit' && a('sait-le-job') && !a('achat-filtre'),
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
          quand: ({ a, qui }) => qui === 'rabbit' && a('parle:mccarthy') && !a('verre-mccarthy'),
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
                  'Il reprend son chiffon.'],
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
          texte: ['« Lester. Vingt ans. Ork. Ramassé dans une descente à Redmond. »',
                  '« On l’accuse du meurtre de Teresa Banks. Une elfe du Tír. Le genre de nom qui fait bouger des gens. »'],
        },
        {
          id: 'dossier',
          titre: '« Et il l’a tuée ? »',
          quand: ({ a }) => a('sait-le-job'),
          flags: ['sait-dossier-vide'],
          fiches: ['dossier-vide', 'elfe-autopsie'],
          texte: ['« L’autopsie dit que le dernier à l’avoir touchée était un elfe. On n’a pas une trace de lui sur elle. »',
                  '« Le dossier est vide. Je le sais. Ça n’a jamais arrêté personne. »',
                  '« Et non, j’ai pas dit “parce qu’il est ork”. J’ai pas besoin de le dire. »'],
        },
        {
          id: 'pourquoi',
          titre: '« Pourquoi nous, et pas la Star ? »',
          quand: ({ a }) => a('sait-dossier-vide'),
          fiches: ['navette-huit-heures'],
          texte: ['« Parce que si je le fais transférer par la navette de huit heures, il arrive pas. »',
                  '« Il aura un accident, ou un remords subit. J’ai déjà lu le rapport, je peux vous le réciter. »'],
        },
        /* D14 — LA VICTIME.
           Son nom apparaissait UNE FOIS en trois tableaux, comme un
           élément de dossier. C'est pourtant le sujet du scénario :
           « la victime intéresse tout le monde moins que le scandale ».
           Ce sujet est le seul endroit du jeu où quelqu'un demande. */
        {
          id: 'teresa',
          titre: '« Et elle ? Teresa Banks. »',
          quand: ({ a }) => a('sait-le-job'),
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
          quand: ({ a, qui }) => qui === 'hercules' && a('sait-le-job'),
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
                  '« Il est déjà payé, alors discutez pas. Et il essaie de se faire appeler l’Amiral. Ça marche pas, mais il essaie. »'],
        },
        {
          id: 'mandat',
          titre: '« Et à McNeil, on entre comment ? »',
          quand: ({ a }) => a('sait-le-job'),
          texte: ['« Avec le mandat de transfert. Vous le présentez, ils vous le sortent. C’est légal, je vous rappelle. »',
                  '« Après, vous vous planquez, et vous êtes au tribunal de Downtown à dix heures. Spring Street, à l’angle de la 5e. »'],
        },
        {
          id: 'accepter',
          titre: '(Signer.)',
          quand: ({ a }) => a('sait-le-job') && a('vu:contrat'),
          fin: true,
          flags: ['embauche'],
          objets: ['contrat', 'mandat'],
          texte: ['« Bien. »',
                  '« Dix heures. Après, ça ne sert plus à rien. »',
                  'Il pousse deux feuillets sur la table : le contrat, et le mandat de transfert.',
                  'Il retourne à sa quatrième tasse. L’entretien est fini, et la porte de la rue est derrière vous.'],
        },
        /* Un sujet par runner : chacun pose la question que les trois
           autres ne poseraient pas. C'est la règle 10 appliquée au
           dialogue, et c'est ce qui rend le choix du runner sensible. */
        {
          id: 'tir',
          titre: '« La victime était du Tír. » (Trash)',
          quand: ({ a, qui }) => qui === 'trash' && a('sait-le-job'),
          texte: ['Le vieil ork le regarde autrement. « Vous connaissez ? »',
                  '« Alors vous savez ce que ça veut dire, une famille de là-bas qui veut que ça se taise. »',
                  '« Moi je l’ai appris en trois jours. Ça m’a suffi. »'],
          flags: ['sait-famille'],
          fiches: ['famille-tir'],
        },
        {
          id: 'ork',
          titre: '« Le gamin est ork. C’est ça, le dossier. » (White_Rabbit)',
          quand: ({ qui }) => qui === 'rabbit',
          texte: ['« … »',
                  '« Trente-quatre ans que je porte cette étoile. J’ai signé des rapports que je ne relis pas. »',
                  '« Celui-là, je le relis. C’est pour ça que vous êtes là. »'],
          flags: ['mccarthy-avoue'],
        },
        {
          id: 'opposition',
          titre: '« Combien d’hommes en face ? » (Drakk)',
          quand: ({ a, qui }) => qui === 'drakk' && a('sait-le-job'),
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
