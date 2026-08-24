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

   ══ CHANTIER DE RANG 4 — L'ABORDAGE (`PLAN_TRAME_ACTES_III_IV.md` §6) ══
   Le tribunal se récuse (`tribunal-salle.js`) : Lester repart vers McNeil,
   nouveau passeur, le soir même. D7 (§3 du plan) est explicite : « la
   seconde traversée réutilise `retour`, par `entree()` et des drapeaux,
   jamais par un tableau neuf ». Ce fichier gagne donc un second état,
   gardé partout par `a('recuse-abri')` — jamais une branche qui retire
   quelque chose au premier passage, seulement une qui s'ajoute à côté
   (règle 19). Précédent : `quai-voilier` (chantier 25) prouvait déjà
   qu'un tableau peut se reconstruire depuis ses drapeaux à la revisite.

   « Pas de combat » (§6 du plan) : ce qui se joue, c'est se débarrasser,
   pas se battre. Chaque route de secours rappelle un tableau antérieur —
   Trash et l'ondine (`esprit`, si `esprit-eau` tient toujours), Hercules
   et la VHF (impossible si `star-nous-connait`), White_Rabbit et le
   transpondeur (`muet`, une seconde fois), Drakk et un placement — mais
   « cette fois il n'y a pas de rouf » : se mettre à couvert ne veut plus
   rien dire contre un abordage qui vient du bastingage, pas d'un
   surplomb. Sa route est donc une cible neuve, `grappin`, pas une
   nouvelle branche d'`ecoutille`.

   Cisco, le nouveau passeur, est le contact que le chantier 32 attendait
   (« ceux qui s'ajoutent », `PLAN_CAPACITES_ET_RESEAU.md` §5) : il tient
   la barre, on lui parle, et il rejoint le réseau EN PARLANT — jamais un
   objet ne l'achète, même grammaire que Lester (G5). Sans sprite neuf :
   comme McCarthy au téléphone ou la vedette sur le 16, une voix suffit.

   PROVISOIRE, ASSUMÉ : la traversée retombe sur `fin: true`, comme
   `tribunal-salle.js` le faisait pour elle avant ce chantier. L'acte IV
   (chantiers 26-28, l'appartement/le Shameless/les amis) n'a encore
   aucun lieu où atterrir — quand il en aura un, cette fin se change en
   `va: '<hub-acte-iv>'`, exactement le geste que ce chantier vient de
   faire pour `tribunal-salle.js`. */

import { equipiers } from './equipiers.js'

/* Un seul `choix-*` peut être posé par partie (chantiers 36-37) : chaque
   sujet `trancher-*` du conseil se ferme dès qu'un autre a tranché. */
const decisionPrise = (a) => a('choix-herwick') || a('choix-sarah')

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
  ouverture: ({ a, qui }) => a('recuse-abri') ? [
    /* ══ L'ABORDAGE — second passage ═══════════════════════════════ */
    'Le même bateau, une autre nuit. Cisco a pris la barre sans discuter le prix, et il n’a posé qu’une question : « Vivant ou discret ? Je ne fais pas les deux à la fois ce soir. »',
    'Tacoma s’efface derrière la pluie, pour la seconde fois. Cette fois, c’est McNeil qui attend, au bout du chenal.',
    'Lester est assis contre le rouf. Au même endroit. Le trou dans le bois n’a toujours pas été rebouché.',
    ...(a('lester-blesse') || a('lester-touche-laverie') ? [
      'Son bras porte un second pansement, par-dessus le premier. Il ne dit rien. Il n’a plus besoin de le dire.',
    ] : []),
    'Personne, à bord, n’a encore vu ce qui vous suit. Ça n’a empêché personne de s’en apercevoir.',
    'OBJECTIF — franchir le goulet une seconde fois, et rendre Lester à McNeil. Quelque chose gagne du terrain derrière vous, sans se presser.',
  ] : [
    'Le voilier a repris la mer avec un passager de plus. McNeil s’efface derrière la pluie.',
    a('esprit-eau')
      ? 'La coque ne tape pas. Elle glisse, et personne à bord n’a envie de demander pourquoi.'
      : 'La coque tape à contretemps. Il pleut depuis McNeil et ça ne s’arrêtera pas avant Tacoma.',
    'Lester est assis contre le rouf, dos à la cabine où Wilson est mort. Personne ne le lui a dit.',
    /* CE QU'ON A PAYÉ AU PÊCHEUR SE VOIT ICI. `sait-toralf` coûtait deux
       mille au tableau 2 et ne changeait qu'une ligne d'Hercules sur une
       cible de lentille tactique — autant dire rien, pour la plupart des
       parties. La menace du tableau doit être NOMMÉE à l'entrée quand on
       a payé pour la connaître : c'est la différence entre traverser un
       détroit et traverser un détroit en sachant qui attend. */
    ...(a('sait-toralf') && !a('goulet-passe') ? [
      'Un grand type blond est reparti du port en marchant, comme s’il avait fini. Personne à bord n’a réussi à penser à autre chose depuis.',
    ] : []),
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
     joueur a fait ailleurs. Second passage : `poursuite` remplace
     `vedette` (la Star n'a aucune raison d'être là ce soir-là), et
     `abri` ne traverse pas — il décrivait un couvert contre un tireur
     immobile, pas contre un abordage. */
  entree: ({ a }) => a('recuse-abri') ? [
    'poursuite',
    ...(a('esprit-eau') ? ['esprit'] : []),
  ] : [
    ...(a('trace-matricielle') ? ['vedette'] : []),
    ...(a('esprit-eau') ? ['esprit'] : []),
    /* `visuels` est vidé à chaque `charge()` : sans ça, une reprise
       après F5 remettrait l'équipe à découvert alors que le drapeau
       dit qu'elle est à couvert. */
    ...(a('abri') ? ['abri'] : []),
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
      regarder: ({ a }) => ({
        tous: a('recuse-abri')
          ? ['Cisco tient la barre, capuche rabattue, et regarde le chenal comme s’il l’avait déjà traversé cent fois — ce qui est sans doute vrai.',
             'C’est le seul endroit du trajet où l’on ne peut ni virer ni faire demi-tour.']
          : ['La barre franche, et le goulet droit devant : quatre cents mètres entre deux pointes de terre.',
             'C’est le seul endroit du trajet où l’on ne peut ni virer ni faire demi-tour.'],
        drakk: '« Un défilé. Encore un. Celui-ci avance tout seul, ce qui est pire. »',
        rabbit: '« Chenal 12. Une seule route possible, et elle est sur toutes les cartes. »',
      }),
      /* Cisco « s'ajoute en parlant » (§6 du plan, chantier 32 :
         « ceux qui s'ajoutent ») — jamais un objet ne l'achète, même
         grammaire que Lester (G5). Pas de sprite neuf : une voix à la
         barre suffit, comme la vedette sur le 16 ou McCarthy au
         téléphone. Premier passage : la barre ne tient personne, on ne
         parle pas à un gouvernail vide — le refus générique de
         `equipe[qui].refus.parler` suffit déjà, pas besoin de l'écrire
         ici deux fois. */
      parler: ({ a }) => a('recuse-abri')
        ? { texte: [], dialogue: 'cisco' }
        : { tous: 'La barre. Personne ne la tient, sinon celui qui vient de la lâcher.',
            drakk: '« On ne parle pas à un gouvernail. »' },
      utiliser: ({ a }) => {
        /* ══ L'ABORDAGE — la traversée retour ═══════════════════════════
           Gardé en tout premier : `goulet-passe` est vrai pour de bon
           depuis le premier passage et resterait vrai pour toujours —
           sans ce garde-fou, la ligne juste en dessous (« c'est derrière
           nous ») répondrait à la place de tout ce bloc. */
        if (a('recuse-abri')) {
          if (a('abordage-passe')) return 'Le chenal est vide, cette fois aussi. Personne ne retente un abordage deux fois la même nuit.'

          /* Chaque route rappelle un tableau antérieur (§6 du plan) ;
             il en suffit UNE. Comptées, pas choisies au hasard : la
             voix qui commente l'issue dépend de ce qui a vraiment
             servi, dans l'ordre où le plan les liste. */
          const routes = ['abordage-vitesse', 'abordage-vhf', 'abordage-transpondeur', 'abordage-grappin'].filter(a)

          const commun = [
            { texte: 'La barre à droite toute, une seconde fois. Le chenal se referme.',
              visuel: 'goulet-serre' },
            'Le sillage, derrière, ne lâche pas la distance.',
          ]

          if (routes.length)
            return { tous: [...commun,
                            { texte: 'Le sillage hésite, puis vire au large. Il ne vous suit pas dans le goulet.',
                              visuel: ['goulet-passe', 'poursuite-partie'] },
                            'Personne ne saura jamais s’il a renoncé, ou s’il a compris qu’il n’avait plus rien à y gagner.'],
                     drakk: routes.includes('abordage-grappin')
                       ? '« Il n’avait plus de quoi accoster. On ne monte pas à bord les mains vides. »'
                       : '« Il a compris avant de comprendre pourquoi. C’est déjà ça. »',
                     ...(routes.includes('abordage-vhf')
                       ? { hercules: '« Une patrouille qui répond, ça change une nuit entière. »' }
                       : {}),
                     flags: ['abordage-passe'],
                     fiches: ['abordage-repousse'],
                     minutes: 10, fin: true }

          return { tous: [...commun,
                          'Un choc sourd contre la coque. Une main gantée passe par-dessus le bastingage.',
                          'Cisco lâche la barre une seconde — une seule — et Drakk s’en charge : l’homme repart à l’eau plus vite qu’il n’est monté.',
                          { texte: 'Le sillage renonce, cette fois, et la terre s’écarte. McNeil est devant.',
                            visuel: ['goulet-passe', 'poursuite-partie'] }],
                   hercules: '« On a eu de la chance. La chance, ça ne se facture pas deux fois. »',
                   drakk: '« Un contre un, sur mon propre pont. Je ne demandais que ça. »',
                   flags: ['abordage-passe', 'abordage-echec'],
                   fiches: ['abordage-repousse'],
                   minutes: 10, fin: true }
        }

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

        /* CHANTIER 37 : Sarah gagne sa propre porte. `choix-herwick` et
           `choix-sarah` sont mutuellement exclusifs par construction —
           chaque sujet `trancher-*` de `conseil` ne pose son drapeau que
           si aucun autre n'a déjà tranché (`!decisionPrise(a)`, plus bas)
           — donc l'ordre de ce `?:` ne fait aucune différence en
           pratique. Duke reste la laverie par défaut, comme au
           chantier 36, en attendant le chantier 37 lui-même. */
        const destination = a('choix-herwick') ? 'herwick' : a('choix-sarah') ? 'sarah' : 'planque'

        /* ══ LA TRAVERSÉE SE REGARDE ═══════════════════════════════════
           Le seul coup de feu de la nuit partait dans un mur de récit
           qui se terminait par un changement de tableau : le joueur
           lisait que Lester avait été touché, et il l'apprenait vraiment
           plus tard, dans le carnet. Playtest du 2026-08-22.

           Chaque ligne porte maintenant son `visuel`, marqué au moment
           où elle s'affiche (voir `suivante()` dans main.js) : la terre
           se referme sur la phrase qui la referme, la lueur accroche la
           pluie sur la phrase qui la décrit, le trou apparaît dans le
           rouf sur le claquement, et la manche rougit sur la ligne qui
           le dit. Aucun texte n'a changé de sens ; il a changé de
           rythme, et c'est tout ce qui manquait. */
        const commun = [
          { texte: 'La barre à droite toute. Les deux pointes de terre se referment.',
            visuel: 'goulet-serre' },
          'Quatre cents mètres. Personne ne parle.',
          /* Le battement de peur. Il vient AVANT le coup, il ne désigne
             personne, et il ne dit pas la même chose selon qu'on a lu le
             perchoir ou pas — un joueur qui a cherché voit qu'il avait
             raison de chercher. */
          a('sait-ou')
            ? { texte: 'Sur la pointe de gauche, à l’endroit exact que vous surveilliez, quelque chose accroche la pluie une demi-seconde.',
                visuel: 'lueur-perchoir' }
            : { texte: 'Sur la pointe de gauche, quelque chose accroche la pluie une demi-seconde. Personne n’a le temps de se demander quoi.',
                visuel: 'lueur-perchoir' },
        ]

        /* On passe TOUJOURS. Ce qui change, c'est ce qu'on emporte. */
        if (abri)
          return { tous: [...commun,
                          { texte: 'Un claquement sec sur le rouf, à hauteur d’épaule. Puis un deuxième, dans l’eau.',
                            visuel: ['tir', 'impact-rouf'] },
                          'Personne n’était debout devant.',
                          { texte: 'Trois cents mètres plus loin, la terre s’écarte et le bruit s’arrête. Tacoma est devant.',
                            visuel: 'goulet-passe' }],
                   drakk: '« Deux tirs. Il n’en avait que deux à donner avant qu’on sorte de sa portée. Il le savait aussi. »',
                   trash: '« Il n’a pas visé le bateau. Il a visé la place où le gamin était assis. »',
                   flags: ['goulet-passe', 'toralf-manque'],
                   fiches: ['toralf-vise-lester'],
                   minutes: 10, va: destination }

        return { tous: [...commun,
                        { texte: 'Un claquement sec, et Lester tombe en avant sans un bruit.',
                          visuel: 'tir' },
                        { texte: 'Il se relève seul. Sa manche est ouverte du coude à l’épaule et elle rougit vite.',
                          visuel: 'lester-touche' },
                        '« C’est rien », dit-il, ce qui est faux, et personne ne le corrige.',
                        { texte: 'Trois cents mètres plus loin, la terre s’écarte. Tacoma est devant.',
                          visuel: 'goulet-passe' }],
                 hercules: '« On aurait dû le mettre derrière quelque chose. C’est ma faute et je la retiens. »',
                 drakk: '« J’ai vu le poste. Je n’ai pas donné l’ordre. C’est pire que de ne pas voir. »',
                 flags: ['goulet-passe', 'lester-blesse'],
                 fiches: ['toralf-vise-lester'],
                 minutes: 10, va: destination }
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
        /* ══ L'ABORDAGE — une seconde intrusion sur le même boîtier ═════
           « Chaque intrusion s'accumule » (§6 du plan) : le compteur
           d'exposition lui-même appartient à D9, pas encore construit
           (backlog acte IV) — mais le coût se DIT ici, dans la voix de
           White_Rabbit, sans attendre le mécanisme pour exister. */
        if (a('recuse-abri')) {
          if (a('abordage-transpondeur')) return 'Il ment déjà. Une fois par nuit, c’est le tarif.'
          if (qui !== 'rabbit')
            return { tous: 'Il faudrait rentrer dans le boîtier, et il faut un deck pour ça.',
                     hercules: '« C’est le sien, ce rayon. Toujours. »' }
          return { tous: ['White_Rabbit rentre une seconde fois dans le même boîtier. Ça prend moins de temps qu’avant : elle connaît déjà la serrure.',
                          'CHALUTIER — GIG HARBOR — ÉMET, encore.'],
                   rabbit: ['« Deux fois dans la même nuit, sur le même boîtier. Ce n’est plus discret, c’est comptable. »',
                            '« Quelqu’un, quelque part, additionne mes passages. Ce ne sera pas gratuit plus tard. »'],
                   flags: ['abordage-transpondeur'] }
        }

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
        /* ══ L'ABORDAGE — appeler la patrouille sur ses propres agresseurs
           Impossible si `star-nous-connait` (§6 du plan) : la dernière
           fois qu'Hercules a parlé à la Star sur ce canal, c'était pour
           avouer un mensonge (`vedette.objets.contrat`, premier passage).
           On ne rappelle pas ensuite pour demander un service. */
        if (a('recuse-abri')) {
          if (a('abordage-vhf')) return 'Ils savent déjà. Répéter n’avancerait rien.'
          if (a('star-nous-connait'))
            return { tous: 'Le canal 16 attend une réponse. La dernière fois qu’on leur a parlé sur ce canal, on avouait un mensonge.',
                     hercules: '« Ils ont mon numéro de coque et un motif de me trouver suspect. Je ne vais pas leur demander une faveur en plus. »' }
          if (qui !== 'hercules')
            return { tous: 'Il faudrait une voix qui sait faire peur poliment. Ce n’est pas la tienne, pas cette fois.',
                     trash: '« On m’entendrait mentir sur l’urgence. »',
                     rabbit: '« Une voix, ça ne se falsifie pas en quarante secondes. »',
                     drakk: '« Je crierais la vérité. Ça ne ferait venir personne assez vite. »' }
          return { tous: ['Hercules décroche et ne joue plus rien : « Sunnyside quatre-deux, on est suivis de près par un bateau sans feux, chenal 12, direction McNeil. On a un mineur à bord. »',
                          'Trois secondes.',
                          '« Reçu, quatre-deux. On envoie. Tenez le cap. »'],
                   hercules: '« Voilà ce qu’on paie des impôts pour faire. Pour une fois, ça a marché. »',
                   flags: ['abordage-vhf'] }
        }

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
        /* « Cette fois il n'y a pas de rouf » (§6 du plan) : se mettre à
           couvert protégeait d'un tireur immobile sur UN côté. Un
           abordage vient du bastingage, des deux côtés à la fois — le
           rouf ne tranche plus rien. La route de Drakk se joue au
           bastingage (`grappin`), pas ici. */
        if (a('recuse-abri'))
          return { tous: 'Se planquer derrière le rouf ne dit pas de quel côté ils vont accoster. Ce n’est plus la bonne question.',
                   drakk: '« Cette fois, ce n’est pas un mur qu’il me faut. C’est un endroit où me tenir. »' }

        if (a('abri')) return 'Tout le monde est du bon côté du rouf. On attend le goulet.'
        if (qui === 'drakk')
          return { tous: ['Drakk prend Lester par le col sans un mot et le pose de l’autre côté du rouf.',
                          'Puis il désigne le pont à chacun, dans l’ordre, et personne ne discute.',
                          'On ne voit plus rien du goulet. C’est exactement l’idée.'],
                   drakk: '« Le mur entre vous et la colline. Toujours. C’est la première chose qu’on apprend et la première qu’on oublie. »',
                   flags: ['abri'], visuels: ['abri'] }

        /* ══ SAVOIR OÙ SUFFIT ══════════════════════════════════════════
           `sait-ou` était posé par DEUX lentilles — le perchoir lu par
           Drakk, le creux violet lu par Trash — et relu par rien du tout
           (audit du 2026-08-22, levier L4). Deux lentilles, six
           répliques, aucune conséquence : un joueur qui avait identifié
           le tireur franchissait le goulet exactement comme un joueur
           qui n'avait rien vu.

           Il paie ici, et c'est le bon endroit : quand quelqu'un a dit
           d'où ça viendra, il n'y a plus besoin d'un sergent pour placer
           la troupe — il suffit de savoir de quel côté du rouf se
           mettre. Chercher protège Lester. C'est la seule chose que le
           tableau avait à dire et il ne la disait pas. */
        if (a('sait-ou'))
          return { tous: ['Personne n’a d’ordre à donner : on sait d’où ça viendra, et ça suffit.',
                          'Lester est déplacé de deux mètres, sans discussion, et le rouf se retrouve entre la colline et lui.',
                          'Tout le monde se range du même côté que lui.'],
                   hercules: '« Ce n’est pas du commandement. C’est de la géométrie. »',
                   trash: '« Je n’aime pas savoir des choses pareilles. Je préfère quand même les savoir. »',
                   rabbit: '« Une ligne de tir, c’est une droite. Il suffit de ne pas être dessus. »',
                   flags: ['abri'], visuels: ['abri'] }

        return { tous: 'Il faudrait faire bouger tout le monde, et vite, et sans discuter — et personne ne sait encore de quel côté.',
                 drakk: '« Laissez-moi placer la troupe. »',
                 hercules: '« Drakk. C’est ton métier, ça, pas le mien. »',
                 trash: '« Dites-moi où regarder et je vous dirai ce qu’il y a. Dans cet ordre-là. »',
                 rabbit: '« Je peux calculer un angle. Il me faut un point de départ. »' }
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

        /* ══ L'ABORDAGE — la route de Trash ══════════════════════════════
           « Si l'ondine est encore là » (§6 du plan) : `esprit-eau` n'a
           jamais été retiré, mais un second service dans la même nuit
           n'est pas le MÊME service que `esprit-demande` gardait déjà —
           d'où un drapeau à part, `abordage-vitesse`. « Elle se
           paiera » (Trash le disait déjà au premier passage) : la dette
           se pose ici, `dette-esprit`, sans mécanisme pour l'encaisser —
           ce sera à l'acte IV de le faire, pas à ce chantier. */
        if (a('recuse-abri')) {
          if (!a('esprit-eau'))
            return { tous: 'L’eau est vide, cette fois. Ce qui la remplissait n’a pas suivi jusqu’ici.',
                     trash: '« Je ne peux pas lui en vouloir. Je ne l’ai payée qu’une fois. »' }
          if (a('abordage-vitesse'))
            return { tous: 'Elle est déjà là. On ne redemande pas la même chose deux fois dans la même nuit.',
                     trash: '« Elle a dit que ça se paierait. Je crois que c’est en train de se faire. »' }
          return { tous: ['Trash pose de nouveau la paume sur le bordé. Cette fois, elle met plus longtemps à répondre.',
                          'Quand la coque cesse de taper, quelque chose, quelque part, note une dette.'],
                   trash: ['« Deux fois dans la même nuit. Elle me l’a fait comprendre sans un mot. »',
                           '« Ça se paiera. Elle l’a dit à l’aller. Ce n’était pas une politesse. »'],
                   flags: ['abordage-vitesse', 'dette-esprit'] }
        }

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

    /* ══ LA POURSUITE — le second passage n'a pas de tireur, il a un
       bateau ═══════════════════════════════════════════════════════
       Cible neuve. Visible dès l'entrée du second passage (`entree()`
       ci-dessus), masquée sinon par `css/scene-retour.css`. Purement
       `regarder` : le sillage ne se traite pas d'ici, il se traite en
       préparant l'une des quatre routes avant la barre. */
    poursuite: {
      nom: 'Un sillage, qui gagne du terrain',
      regarder: {
        tous: ['Un bateau sans feux qui prend la même route que vous depuis McNeil. Il ne se rapproche pas vite. Il se rapproche sûrement.',
               'Personne à bord ne répond sur le 16.'],
        hercules: '« Ceux-là ne sont pas la Star. La Star, au moins, s’identifie. »',
        drakk: '« Il ne presse pas le pas. Il sait qu’on ne peut pas accélérer plus que le goulet ne le permet. »',
        trash: '« Je ne sens rien, à bord de ce bateau-là. Rien du tout. Ça ne veut pas dire qu’il n’y a personne. »',
        rabbit: '« Transpondeur muet, coque nue, pas un octet émis. Ça, au moins, c’est du travail propre. »',
      },
      utiliser: {
        tous: 'Trop loin encore. Ce n’est pas en le regardant fort qu’il ralentira.',
        drakk: '« On ne va pas à sa rencontre. On choisit où on l’attend. »',
      },
    },

    /* ══ LE GRAPPIN — la route de Drakk, cette fois sans rouf ═════════
       Cible neuve. Même masquage que `poursuite`. Reprend le geste
       d'`ecoutille.utiliser` (Drakk place la troupe) mais sur un autre
       problème : ici, on empêche l'abordage d'avoir lieu, on ne se
       met pas à couvert d'un tir qui vient d'une seule direction. */
    grappin: {
      nom: 'Le bastingage, côté poursuite',
      regarder: {
        tous: ['Une gaffe et un grappin traînent contre le bastingage — pas les vôtres.',
               'Pas de rouf, cette fois, pour se mettre derrière. Juste un bastingage et de l’eau noire des deux côtés.'],
        drakk: '« S’ils montent, c’est par là. Je le sais avant eux : c’est le seul endroit du pont assez bas sur l’eau. »',
      },
      utiliser: ({ a, qui }) => {
        if (a('abordage-grappin')) return 'C’est fait. Personne ne remonte à bord deux fois du même endroit.'
        if (qui !== 'drakk')
          return { tous: 'Il faudrait savoir où se poster, et vite. Ce n’est pas ton métier.',
                   hercules: '« Drakk. C’est pour toi, ça. »' }
        return { tous: ['Drakk repère où l’autre bateau viendrait mordre, et s’y poste avant lui, les mains vides.',
                        'Quand un grappin adverse s’accroche au bastingage, il le soulève et le jette à l’eau avec son câble.',
                        'Personne ne monte à bord d’un pont qu’un adepte a décidé de garder.'],
                 drakk: '« Le mur entre vous et l’eau. Toujours. »',
                 flags: ['abordage-grappin'] }
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
      utiliser: 'On ne rentre pas. On regarde le mur s’éloigner, et ça suffit.',
    },

    /* ══ CHANTIER 35 — LE CONSEIL DE LA TRAVERSÉE (`PLAN_PLANQUES.md` §2) ══
       Étape A du plan : la scène se joue, se mesure, se corrige — zéro
       pixel, zéro tableau neuf. Les quatre planques qu'on y défend s'y
       opposent toutes, mais au chantier 35, aucune n'avait de porte :
       `barre.utiliser` retombait sur `va: 'planque'` en dur, quoi qu'on
       ait dit. « Le défaut ne disparaît pas » (§2) : rien ici ne bloque
       le passage du goulet, discuté ou pas.

       CHANTIER 36 — ÉTAPE B DU §8 : Herwick est la première des trois
       planques neuves à exister pour de vrai (`herwick.js`). Le sujet
       `trancher-herwick`, ci-dessous, pose `choix-herwick` ; `destination`
       (dans `barre.utiliser`) le lit et route vers `herwick` au lieu de
       `planque`.

       CHANTIER 37 — ÉTAPE D DU §8 : Sarah rejoint Herwick (`sarah.js`),
       `trancher-sarah` pose `choix-sarah`, même geste. Duke reste du
       texte, comme au chantier 35, jusqu'à son propre chantier. */
    tacoma: {
      nom: 'Les lumières de Tacoma',
      regarder: {
        tous: ['Une lueur orange au ras de l’eau, encore loin. Sodium, pluie, et deux grues qui ne dorment jamais.',
               'Cinq heures. L’audience est à dix.'],
        hercules: '« Cinq heures pour tenir un homme en vie dans une ville qui préfère qu’il meure. C’est jouable. J’ai eu pire. »',
        trash: '« C’est là qu’on va se cacher. On se cache toujours dans ce qui brille. »',
      },
      /* Un sujet par runner, et il faut ÊTRE ce runner pour le proposer
         (§2 du plan) — la grammaire `quand: ({ qui }) => qui === '…'`,
         déjà utilisée 23 fois ailleurs dans le jeu, tranche seule qui
         peut défendre quelle planque. Gardé par `recuse-abri` en tout
         premier : le second passage ne repose plus la question, Lester
         va déjà chez McNeil — texte d'origine, inchangé. */
      utiliser: ({ a }) => {
        if (a('recuse-abri')) return 'Encore trop loin pour que la regarder change quoi que ce soit.'
        if (a('goulet-passe')) return 'On est déjà de l’autre côté. Un peu tard pour en discuter.'
        return { tous: 'Cinq heures, et personne à bord n’a encore dit où on allait.', dialogue: 'conseil' }
      },
    },

    mat: {
      nom: 'Le mât',
      regarder: {
        tous: 'Voile ferlée, drisses qui claquent contre l’espar. Le bruit le plus régulier de la nuit.',
        drakk: '« La lance du navire. Elle ne sert à rien ce soir : nous allons au moteur, comme des marchands. »',
      },
      utiliser: 'Tu poses la main dessus. Il vibre avec le vent, rien de plus.',
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
          quand: ({ qui, a }) => qui === 'hercules' && !a('vedette-tiede') && !a('vedette-reglee'),
          flags: ['vedette-tiede'],
          texte: ['« Reçu. Vous naviguez au nom de Wilson, W. »',
                  '« Wilson est enregistré seul à bord. Vous êtes cinq sur le pont. »',
                  '« … Restez sur le 16. »',
                  'Le projecteur ne s’éteint pas, mais il cesse de suivre. La barre attend, devant.'],
        },
        {
          id: 'contrat',
          titre: '(Présenter le contrat de prestation.)',
          quand: ({ tient, a }) => tient('contrat') && !a('vedette-tiede') && !a('vedette-reglee'),
          texte: ['Le projecteur s’attarde sur le feuillet.',
                  '« Prestation de sécurité indépendante, contresignée brigade criminelle. »',
                  '« … » Le projecteur reste où il est. Ce n’est pas un refus. Ce n’est pas non plus un oui.'],
        },
        /* Le signal qui manquait : `nom` posait déjà `vedette-tiede`,
           suffisant pour débloquer `barre`, mais rien ne le disait — le
           joueur revenait discuter une deuxième fois sans savoir que
           c'était déjà réglé (playtest le 2026-08-21). */
        {
          id: 'reglee',
          titre: '(Rien à ajouter.)',
          quand: ({ a }) => (a('vedette-tiede') || a('vedette-reglee')) && !a('goulet-passe'),
          fin: true,
          texte: ['Elle n’a plus de raison de s’attarder. La barre attend, devant.'],
        },
        {
          id: 'couper',
          titre: '(Ne pas répondre.)',
          quand: ({ a }) => !a('vedette-tiede') && !a('vedette-reglee'),
          fin: true,
          texte: ['Personne ne décroche. Le projecteur reste où il est.',
                  'Ça ne les décourage pas. Ça ne les presse pas non plus.'],
        },
      ],
    },

    /* ══ CISCO — le nouveau passeur, et le contact que le chantier 32
       attendait (« ceux qui s'ajoutent ») ══════════════════════════════
       Pas de sprite : une voix à la barre, comme la vedette sur le 16.
       Il rejoint le réseau EN PARLANT (`contacts.cisco`, js/data/reseau.js),
       jamais par un objet — même grammaire que Lester (G5). */
    cisco: {
      qui: 'cisco',
      accueil: ['Il n’a pas donné son prénom avant de larguer les amarres. Il l’a donné après.',
                '« Cisco. Je tiens le Sunnyside depuis plus longtemps que Wilson n’a tenu ce bateau. Il me devait de l’argent. Vous, vous me payez d’avance. »'],
      retour: ['« La barre, et rien d’autre, tant qu’on n’est pas passés. »'],
      sujets: [
        {
          id: 'wilson',
          titre: '« Vous connaissiez Wilson ? »',
          texte: ['« Assez pour savoir qu’il prenait des à-côtés que je ne prends pas. »',
                  '« Vous voyez où ça l’a mené. »'],
        },
        {
          id: 'contact',
          titre: '« On pourrait avoir besoin de vous, après cette nuit. »',
          flags: ['cisco-contact'],
          texte: ['« Je ne pose pas de questions. C’est facturé en plus. »',
                  'Il ne vous donne pas de carte — une carte, ça se retrouve dans une poche — juste un numéro, à retenir.'],
        },
        {
          id: 'silence',
          titre: '(Le laisser barrer.)',
          fin: true,
          texte: ['Il ne dit plus rien jusqu’au goulet.'],
        },
      ],
    },

    /* ══ LE CONSEIL DE LA TRAVERSÉE — chantier 35, `PLAN_PLANQUES.md` §2 ══
       Aucun interlocuteur : c'est l'équipe qui se parle à elle-même,
       d'où `qui: 'recit'` — un locuteur qui n'a jamais de portrait
       (`VISAGES` ne le connaît pas) et dont les lignes non attribuées
       tombent dans la bulle du récit, exactement ce qu'il faut pour une
       scène sans PNJ en face. Chaque ligne attribuée par paire
       (`['drakk', '…']`) garde sa voix et sa teinte, comme partout
       ailleurs dans ce fichier (voir l'en-tête, `ouverture`).

       Quatre sujets, un par runner, chacun visible SEULEMENT si ce
       runner est actif (`quand: ({ qui }) => qui === '…'`) : proposer
       une planque, c'est être son runner. Les trois autres objectent
       dans la foulée, dans la même réplique — « le vrai contenu moral
       de la scène » (§2 du plan). Aucun sujet ne ferme les autres : on
       peut les rouvrir dans n'importe quel ordre, en changeant de
       runner actif en cours de dialogue (déjà permis par `selectionne()`
       dans main.js). Rien ne force à trancher — `barre` ne lit aucun
       drapeau posé ici. */
    conseil: {
      qui: 'recit',
      accueil: ['Cinq heures. Pour la première fois de la nuit, personne n’a rien à faire — et c’est bien tout le problème : il va falloir décider où poser Lester avant l’audience, et un endroit, ici, ça veut toujours dire quelqu’un.'],
      retour: ['« On n’a toujours rien décidé. »'],
      sujets: [
        {
          id: 'laverie',
          titre: '« La laverie. On ne doit rien à personne. » (Hercules)',
          quand: ({ qui }) => qui === 'hercules',
          texte: [
            ['hercules', '« Un lav-o-matic ouvert toute la nuit. Cinq personnes qui attendent une machine à cette heure, ça n’étonne personne — et on ne réveille personne pour lui demander une faveur qu’il ne peut pas refuser. »'],
            ['drakk', '« Une vitrine sur la rue. Toute la ville peut vous compter à travers. »'],
            ['trash', '« C’est le seul endroit de cette liste où personne d’autre ne dort. Personne d’autre ne paie, non plus. »'],
            ['rabbit', '« Pas de terminal à faire taire, pas de serrure à forcer. Juste une baie vitrée qu’on ne peut pas éteindre. »'],
          ],
        },
        {
          id: 'herwick',
          titre: '« Strauber. L’homme qui m’a sorti de la rue, à seize ans. » (Drakk)',
          quand: ({ qui }) => qui === 'drakk',
          texte: [
            ['drakk', '« Un antiquaire, rideau de fer, une arrière-boutique chauffée. Il connaît Loveland mieux que la Lone Star. Et je ne lui demande pas une faveur — je lui en dois une. »'],
            ['hercules', '« Un vieil homme seul, tiré du lit à cinq heures pour héberger cinq inconnus et un fugitif. Tu sais ce que ça lui coûte, si ça tourne mal ? »'],
            ['trash', '« Ce qu’il sait, personne d’autre dans cette pièce ne le sait. C’est un vrai gain, cette nuit. Pas une simple faveur. »'],
            ['rabbit', '« Un rideau de fer, ça se force. Ça ne se pirate pas. Une fois dedans, il n’y a plus de sortie discrète. »'],
          ],
        },
        /* ══ CHANTIER 36-37 — LES PLANQUES QUI SE TRANCHENT ═══════════
           Herwick (chantier 36) et Sarah (chantier 37) existent pour de
           vrai ; Duke reste du texte, comme au chantier 35, en attendant
           son propre chantier. `decisionPrise(a)` empêche de trancher
           deux fois — un seul `choix-*` peut être posé par partie, et
           chaque sujet `trancher-*` disparaît dès qu'un autre a débranché
           la question. Trancher reste un geste du runner qui a PROPOSÉ le
           lieu — même grammaire que proposer (« il faut ÊTRE ce runner »,
           § 2 du plan) — et `barre.utiliser` lit ces drapeaux : rien
           d'autre ne change la destination. */
        {
          id: 'trancher-herwick',
          titre: '« Assez parlé. On va chez Herwick. » (Trancher, Drakk)',
          quand: ({ qui, a }) => qui === 'drakk' && !decisionPrise(a),
          fin: true,
          flags: ['choix-herwick'],
          texte: [
            ['drakk', '« Assez parlé. On va chez Herwick. »'],
            'Personne ne s’oppose à voix haute. Ça ne veut pas dire que tout le monde est d’accord.',
          ],
        },
        {
          id: 'sarah',
          titre: '« Le cabinet de Sarah. Le bras de Lester, d’abord. » (Trash)',
          quand: ({ qui }) => qui === 'trash',
          texte: [
            ['trash', '« Une clinique de rue ne ferme jamais. Elle recoud ce que personne d’autre ne veut recoudre, et elle recoudra Lester sans poser une question. »'],
            ['hercules', '« Et la salle d’attente ? Il y a des gens qui patientent là-dedans depuis des heures, cette nuit comme toutes les autres. »'],
            ['drakk', '« Vider une pièce pleine d’inconnus pour en protéger cinq. Je connais ce calcul. Je ne l’aime toujours pas. »'],
            ['rabbit', '« Un cabinet, ça a une adresse fixe et un registre de patients. C’est le lieu le plus facile à retrouver de toute la liste. »'],
          ],
        },
        {
          id: 'trancher-sarah',
          titre: '« Assez parlé. On va chez Sarah. » (Trancher, Trash)',
          quand: ({ qui, a }) => qui === 'trash' && !decisionPrise(a),
          fin: true,
          flags: ['choix-sarah'],
          texte: [
            ['trash', '« Assez parlé. On va chez Sarah. »'],
            'Personne ne s’oppose à voix haute. Ça ne veut pas dire que tout le monde est d’accord.',
          ],
        },
        {
          id: 'duke',
          titre: '« Le sous-sol de Duke. Personne n’y tire à travers un mur. » (White_Rabbit)',
          quand: ({ qui }) => qui === 'rabbit',
          texte: [
            ['rabbit', '« Du béton, pas une fenêtre, huit personnes armées qui ne doivent rien à la Star. Pas de ligne de mire possible, là-dedans. »'],
            ['hercules', '« Huit personnes armées qui ne NOUS doivent rien non plus. Duke ne fait jamais crédit. »'],
            ['drakk', '« Et il faudra payer avant d’entrer, pas après. Je n’aime pas les portes qui se ferment derrière un prix. »'],
            ['trash', '« Lester va passer trois heures à regarder ceux qui le protègent traiter avec exactement le genre de gens que l’accusation dit qu’il est. »'],
          ],
        },
        {
          id: 'silence',
          titre: '(En rester là, pour l’instant.)',
          fin: true,
          texte: ['Personne ne tranche. Le goulet, de toute façon, ne se traverse pas en discutant.'],
        },
      ],
    },
  },
}
