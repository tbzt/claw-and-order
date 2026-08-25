/* ============================================================
   LE CASTING — les prétirés d'Anarchy 2.0, repris au livre.

   Format Anarchy : 5 mots-clés, 4 comportements, 4 répliques.
   Ce n'est pas de la documentation, c'est la SPÉCIFICATION D'ÉCRITURE.

   Les `repliques` sont les quatre lignes canoniques de la fiche, citées
   telles quelles — elles ne se réécrivent pas. Les `refus` sont le stock
   de barks du moteur : un verbe qui ne mène à rien se dit dans la voix du
   runner actif, jamais dans une ligne générique (règle 11). Ils sont
   écrits SOUS CONTRAT des comportements, et reprennent les répliques
   canoniques là où elles tombent juste.

   Anarchy insiste sur un point qu'on suit à la lettre : comportements et
   répliques ne listent pas les qualités. Ils sont ambivalents, défauts
   compris. Un personnage sans travers n'a pas de réplique intéressante.

   Les clés sont les identifiants du moteur (`etat.actif`).
   ============================================================ */

export const equipe = {

  /* ── HERCULES — Arthur Pitchford ─────────────────────────────────
     Nain, presque 50 ans, l'air d'un préadolescent. Face ADEPTE :
     il est Éveillé, ce que le jeu n'a pas encore utilisé — son « sens
     du danger » pressent une menace SANS détail. Ex-bureaucrate de
     l'administration Saito, tombé pour corruption (il était coupable,
     et il raconte l'histoire autrement). Compteur de cartes interdit
     de Las Vegas. Il doit toujours de l'argent à quelqu'un. */
  hercules: {
    nom: 'Hercules',
    metatype: 'nain',
    taille: 1.20,        // → 28 px d'art (voir CONCEPTION § 2)
    role: 'face adepte',
    vue: 'physique',
    motsCles: [
      'Nain',
      'Seattle / Downtown',
      'Face adepte',
      'Joueur',
      'Train de vie bas',
    ],
    comportements: [
      'Tchatcheur invétéré',
      'Arrogance insouciante',
      'Chanceux',
      'Opportuniste',
    ],
    repliques: [
      '« Chaque échec me rapproche d’une réussite. C’est prouvé. »',
      '« À défaut de les vaincre, on peut les convaincre. »',
      '« J’ai déjà vu pire, une fois… »',
      '« Rien ne se perd, rien ne se crée, tout se transforme. »',
    ],
    refus: {
      regarder: [
        '« Rien. Et j’ai l’œil, normalement. »',
        '« J’ai déjà vu pire, une fois… »',
        '« Regardé, jaugé, estimé. Ça ne vaut rien. »',
      ],
      utiliser: [
        '« Chaque échec me rapproche d’une réussite. C’est prouvé. »',
        '« Je pourrais. Je ne vais pas me salir les mains pour si peu. »',
        '« Rien ne se perd, rien ne se crée, tout se transforme. Sauf ça. »',
      ],
      parler: [
        '« À défaut de les vaincre, on peut les convaincre. Encore faut-il qu’ils écoutent. »',
        '« Je parle à tout le monde. Pas à ça. »',
        '« J’ai un charme considérable, et il a des limites. Rarement. »',
      ],
      objet: [
        '« Non. Et je le savais avant d’essayer, ce qui est pire. »',
        '« Les deux ensemble, il faudrait être joueur. Je le suis. Ça ne marche pas quand même. »',
      ],
      /* Ce qu'il dit quand on essaie de changer de runner pendant
         qu'il parle. Un refus de plus, dans sa voix (règle 11). */
      coupe: [
        '« Deux secondes. Je suis en train de faire quelque chose de bien. »',
        '« Laisse-moi finir, c’est la partie où je suis bon. »',
      ],
      /* Ce qu'il dit sur un sujet verrouillé — visible, mais qui n'est
         pas à lui de dire (chantier 38, règle 11 appliquée au conseil). */
      verrouille: [
        '« Ça, c’est la partie de quelqu’un d’autre. Moi je négocie, je n’improvise pas dans le rôle des autres. »',
        '« J’ai un avis. Je le garde pour quand ce sera à moi de parler. »',
      ],
    },
    /* Deux contacts de fiche, les deux au réseau (js/data/reseau.js) :
       Alicia Francetti, journaliste (chantier 31) — une journaliste,
       dans un scénario où les médias s'emparent de l'affaire — et Elton
       Hutchinson, avocat (chantier 32). Réseau 4 : il est le
       personnage-réseau de l'équipe, et de loin. */
    signature: 'sens-du-danger',
  },

  /* ── TRASH — Conall D'Arcy ────────────────────────────────────────
     Elfe, fils aîné d'une famille NOBLE DU TÍR TAIRNGIRE, destiné au
     Conseil des Princes. Éveillé à 16 ans par l'esprit de Raton laveur
     alors qu'il sombrait. A refusé la voie tracée ; sa sœur Saoirse a
     pris sa place. Ne touche plus à la fortune familiale.

     C'est LE personnage que ce scénario attendait : la victime est une
     elfe du Tír dont la famille veut que ça se taise, et il vient de
     cette noblesse-là. */
  trash: {
    nom: 'Trash',
    metatype: 'elfe',
    taille: 1.90,        // → 45 px d'art
    role: 'chaman',
    vue: 'astrale',
    motsCles: [
      'Elfe',
      'Seattle',
      'Chaman',
      'Noble de Tír Tairngire',
      'Train de vie bas',
    ],
    comportements: [
      'Dilettante',
      'Instinctif',
      'Curieux',
      'Idéaliste',
    ],
    repliques: [
      '« On peut tout perdre, sauf son raffinement. »',
      '« Raton laveur dit : si c’est mal protégé, c’est un don. »',
      '« Un plan ne foire pas, il s’improvise en continu. »',
      '« Pourquoi courir quand on peut juste disparaître ? »',
    ],
    refus: {
      regarder: [
        '« Rien. Ni ici, ni de l’autre côté. »',
        '« Raton laveur s’en désintéresse. Moi aussi, du coup. »',
        '« J’ai regardé deux fois. Il n’y a rien, et j’aime autant. »',
      ],
      utiliser: [
        '« Pourquoi courir quand on peut juste disparaître ? »',
        '« Un plan ne foire pas, il s’improvise en continu. Là, il n’y a rien à improviser. »',
        '« Je pourrais forcer. Je préfère ne pas. »',
      ],
      parler: [
        '« Ça n’a rien à dire. Ni au sens où tu l’entends, ni au mien. »',
        '« On peut tout perdre, sauf son raffinement. Parler à ça, ce serait le perdre. »',
        '« Je demande. Ça ne répond pas. C’est déjà une réponse. »',
      ],
      objet: [
        '« Raton laveur dit : si c’est mal protégé, c’est un don. Ça, c’est juste mal assorti. »',
        '« Non. Les choses n’ont pas envie. »',
      ],
      /* Ce qu'il dit quand on essaie de changer de runner pendant
         qu'il parle. Un refus de plus, dans sa voix (règle 11). */
      coupe: [
        '« Attends. J’ai pas fini. »',
        '« Une seconde. Ce que je dis a une fin, et elle compte. »',
      ],
      /* Ce qu'il dit sur un sujet verrouillé — visible, mais qui n'est
         pas à lui de dire (chantier 38, règle 11 appliquée au conseil). */
      verrouille: [
        '« Ce n’est pas à moi de le dire. Raton laveur non plus n’a d’avis là-dessus. »',
        '« Je pourrais le dire à sa place. Ça sonnerait faux, et il le saurait. »',
      ],
    },
    /* Esprit mentor Raton laveur : farceur, chapardeur, curieux. Il doit
       se DESSINER comme un raton laveur, pas comme une orbe abstraite. */
    signature: 'raton-laveur',
  },

  /* ── WHITE_RABBIT — Dennis Freeman ────────────────────────────────
     HUMAIN. Poseur ork. Train de vie ÉLEVÉ.

     Petit-fils d'un scientifique d'ESP Systems, orphelin par le Crash
     2.0. Riche et seul, il erre dans l'Underground et y trouve des
     communautés qui, malgré la misère, se vouent un amour fraternel.
     Il décide de DEVENIR un ork pour en faire partie, et paie les
     opérations. Résultat acceptable, malgré de nombreuses cicatrices.

     Son bonheur est fondé sur un mensonge. Dans un jeu sur un gamin
     ork qu'on accuse parce qu'il est ork, c'est le personnage le plus
     chargé du casting — et sa troisième réplique est une phrase qu'il
     ne finit jamais. */
  rabbit: {
    nom: 'White_Rabbit',
    metatype: 'humain',
    taille: 1.75,        // → 41 px d'art : PLUS PETIT que Lester et McCarthy
    role: 'decker de combat',
    vue: 'ra',
    motsCles: [
      'Humain',
      'Seattle / Underground',
      'Decker de combat',
      'Poseur ork',
      'Train de vie élevé',
    ],
    comportements: [
      'Loyal',
      'Identité instable',
      'Téméraire',
      'Refus du passé',
    ],
    repliques: [
      '« J’ai pris les privilèges administrateur de ma vie. »',
      '« Si tu les touches, je te formate. »',
      '« Nous, les orks, … »',
      '« T’as besoin d’un decker ou d’un miracle ? »',
    ],
    refus: {
      regarder: [
        '« Rien. Pas de nœud, pas d’icône, pas d’intérêt. »',
        '« J’ai regardé, et le monde physique m’a encore déçu. »',
        '« Ça n’émet rien. Donc ça n’existe qu’à moitié. »',
      ],
      utiliser: [
        '« T’as besoin d’un decker ou d’un miracle ? Là, il te faut un miracle. »',
        '« J’ai pris les privilèges administrateur de ma vie. Pas de celle-là. »',
        '« Si ça avait une prise, je serais déjà dedans. Ça n’en a pas. »',
      ],
      parler: [
        '« Nous, les orks, … non. Rien. Laisse tomber. »',
        '« Ça ne parle pas. Même en binaire, j’ai vérifié. »',
        '« Je ne parle pas aux objets. J’ai déjà du mal avec les gens. »',
      ],
      objet: [
        '« Incompatible. Je te fais un schéma ? »',
        '« Si tu les touches, je te formate. Et là, tu touches n’importe quoi. »',
      ],
      /* Ce qu'il dit quand on essaie de changer de runner pendant
         qu'il parle. Un refus de plus, dans sa voix (règle 11). */
      coupe: [
        '« Attends, j’ai pas fini de parler. »',
        '« Une seconde. Je termine ma phrase et je te la rends. »',
      ],
      /* Ce qu'il dit sur un sujet verrouillé — visible, mais qui n'est
         pas à lui de dire (chantier 38, règle 11 appliquée au conseil). */
      verrouille: [
        '« Pas mon terrain. Je sais rester dans ma voie, pour une fois. »',
        '« Ça, c’est à quelqu’un d’autre de le formuler. Change de main. »',
      ],
    },
    signature: 'poseur-ork',
  },

  /* ── DRAKK ────────────────────────────────────────────────────────
     Troll. Abandonné dans l'Underground, il a cru toute son enfance
     que les gens s'adressaient à lui avec un seul mot : DREK. C'est le
     seul nom qu'il ait jamais connu.

     Combats d'enfants à 12 ans. À 16, un antiquaire nain acculé lui met
     dans les mains un jeu de rôle précurseur de Dawn of Atlantis en lui
     promettant « une porte vers un au-delà infini ». Il ne l'a plus
     jamais refermé. **C'est cet antiquaire, Herwick Strauber, qui est
     son contact « la rue » au réseau** (chantier 32, js/data/reseau.js) —
     la fiche ne le nommait pas, mais elle ne pouvait décrire personne
     d'autre.

     Sa vie de solitaire le lasse : IL VOUDRAIT DES AMIS POUR FORMER UNE
     VRAIE GUILDE. Dans un jeu sur quatre runners qui doivent travailler
     ensemble, un des quatre est là pour ça. */
  drakk: {
    nom: 'Drakk',
    metatype: 'troll',
    taille: 2.50,        // → 59 px d'art
    role: 'samouraï des rues',
    vue: 'tactique',
    motsCles: [
      'Troll',
      'Seattle / Underground',
      'Samouraï des rues',
      'Homme de main',
      'Train de vie bas',
    ],
    comportements: [
      'Chevaleresque théâtral',
      'Brutal rêveur',
      'Obsédé par une quête',
      'Cherche à sociabiliser',
    ],
    repliques: [
      '« Encore un exploit qu’on chantera dans les tavernes. »',
      '« Tu vas tâter de ma lame, misérable félon. »',
      '« Sorciers de la Matrice, prêtez-moi votre sagesse. »',
      '« Échec critique ! »',
    ],
    refus: {
      regarder: [
        '« Nulle relique. Nul présage. »',
        '« J’ai scruté. Le maître de jeu n’a rien caché là. »',
        '« Échec critique ! »',
      ],
      utiliser: [
        '« Échec critique ! »',
        '« Ma lame ne sert pas à ça, compagnon. »',
        '« Sorciers de la Matrice, prêtez-moi votre sagesse. »',
      ],
      parler: [
        '« Tu vas tâter de ma lame, misérable félon. … Ah. Ça ne parle pas. »',
        '« Je hèle. Nul ne répond. La quête continue. »',
        '« On ne parlemente pas avec le décor. Même moi je le sais. »',
      ],
      objet: [
        '« Ces deux artefacts ne se marient point. »',
        '« Encore un exploit qu’on chantera dans les tavernes. … Non, en fait. »',
      ],
      /* Ce qu'il dit quand on essaie de changer de runner pendant
         qu'il parle. Un refus de plus, dans sa voix (règle 11). */
      coupe: [
        '« Un instant, compagnon. Je n’ai pas achevé. »',
        '« On ne coupe pas un conteur au milieu. C’est page douze. »',
      ],
      /* Ce qu'il dit sur un sujet verrouillé — visible, mais qui n'est
         pas à lui de dire (chantier 38, règle 11 appliquée au conseil). */
      verrouille: [
        '« Ce n’est pas à moi de porter cette parole, compagnon. »',
        '« Chacun sa quête. Celle-ci n’est pas la mienne à raconter. »',
      ],
    },
    /* Sa réplique 3 est la RÈGLE 9 dite par un personnage : c'est Drakk
       qui demande à White_Rabbit de regarder avant qu'il force. */
    signature: 'guilde',
  },
}


/* ── LES PNJ ──────────────────────────────────────────────────────────
   Mêmes contrats d'écriture. Ceux du scénario, pas des inventions. */

export const pnj = {

  /* L'employeur. Pas un Johnson corpo : un flic qui a déjà perdu, et qui
     paie de sa poche une enquête que sa hiérarchie lui a interdite. */
  mccarthy: {
    nom: 'James McCarthy',
    metatype: 'ork',
    taille: 1.90,        // → 45 px : l'ANCRE de l'échelle du jeu
    motsCles: [
      'Ork avec un SIN, et ça lui a coûté',
      'Seattle, commissariat de Downtown',
      'Inspecteur Lone Star, brigade criminelle',
      'Train de vie modeste, pension en vue',
      'Trente-quatre ans de maison',
    ],
    comportements: [
      'Défend un dossier auquel il ne croit pas, parce que c’est son travail.',
      'Paie de sa poche ce que la Star refuse de financer.',
      'Ne dit jamais « parce qu’il est ork ». Tout le monde l’entend quand même.',
      'S’excuse de vous faire perdre votre temps, alors que c’est lui qui risque tout.',
    ],
    repliques: [
      '« Le dossier est vide. Je le sais. Ça n’a jamais arrêté personne. »',
      '« Je peux pas monter plus haut. C’est mon argent, pas le leur. »',
      '« Dix heures. Après, ça ne sert plus à rien. »',
      '« Vous ne l’ouvrez pas. J’ai besoin de lui à dix heures. »',
    ],
    /* Sa dernière réplique est le nœud moral du jeu : un homme bien
       demande de garder un être en cage, et il a une bonne raison. */
    signature: 'demande-defendable',
  },

  lester: {
    nom: 'Lester',
    metatype: 'ork',
    taille: 1.90,        // → 45 px. Il a vingt ans et il en paraît seize.
    motsCles: [
      'Ork sans SIN',
      'Loveland, puis la rue de Redmond',
      'Vingt ans, accusé de meurtre',
      'Train de vie : aucun',
      'Client de l’ORC malgré lui',
    ],
    comportements: [
      'Vous jauge avant de répondre : héros des SINless, ou mercenaires qui le vendront ?',
      'Ne dit jamais qu’il est innocent. Il trouve que ça sonne comme un aveu.',
      'Se tait quand on hausse la voix. Réflexe, pas stratégie.',
      'Retient les prénoms. Il n’a que ça à retenir.',
    ],
    repliques: [
      '« Vous êtes payés combien pour me sortir ? »',
      '« J’ai rien signé. J’ai rien dit. J’ai attendu. »',
      '« Elle était déjà là quand j’suis rentré. »',
      '« Vous allez me ramener où, exactement ? »',
    ],
    /* G5 ne s'ouvre qu'en parlant. Aucun objet ne l'achète : c'est le
       verrou-manifeste du jeu. */
    signature: 'ne-s-achete-pas',
  },

  gardien: {
    nom: 'Le gardien de nuit',
    metatype: 'humain',
    taille: 1.75,
    motsCles: [
      'Humain avec un SIN et un crédit immobilier',
      'McNeil, greffe pénitentiaire',
      'Garde de nuit, seul jusqu’à l’aube',
      'Train de vie : correct, et fragile',
      'Trente-cinq ans, l’air d’en avoir cinquante à cette heure-ci',
    ],
    comportements: [
      'N’est pas hostile. Il a peur de son règlement, ce qui n’est pas la même serrure.',
      'Ne veut pas appeler de renfort : il veut que ça se passe bien.',
      'Relit deux fois tout ce qu’on lui tend.',
      'Cherche qui sera couvert si ça tourne mal. Y compris lui.',
    ],
    repliques: [
      '« C’est fermé. Le greffe rouvre à sept heures. »',
      '« Moi j’ai un registre. Le registre dit huit heures. »',
      '« Je sais pas ce que vous racontez et je veux pas le savoir. »',
      '« Il est bon. Signé McCarthy, brigade criminelle. »',
    ],
    signature: 'couvrez-le',
  },

  pecheur: {
    nom: 'Le pêcheur de nuit',
    metatype: 'humain',
    taille: 1.75,
    motsCles: [
      'Humain, vieux, sans papiers en règle',
      'La jetée du Sunnyside Beach Park',
      'Ne pêche pas : il est là pour être là',
      'Train de vie : la jetée',
      'A vu passer quelqu’un',
    ],
    comportements: [
      'A décidé de ne pas vous voir, et le tient tant qu’on ne s’assoit pas.',
      'Ne parle pas au premier qui demande. Il parle au premier qui attend.',
      'Coupe son commlink volontairement. À cette heure-ci, c’est un choix.',
      'A une mémoire qui revient mieux quand on l’aide.',
    ],
    repliques: [
      '« Bougez de là. J’pêche. »',
      '« J’ai peut-être vu passer quelqu’un. »',
      '« Elle revient mieux quand on l’aide. »',
      '« J’ai dit c’que j’avais à dire. »',
    ],
    signature: 'pas-de-seau',
  },

  /* Jamais vu, seulement déduit — et c'est ce qui le rend présent.
     Au texte : Scandinave discret, sniper de formation militaire,
     « une tête de plus que la moyenne des gens ». */
  toralf: {
    nom: 'Toralf',
    metatype: 'humain',
    taille: 1.95,
    motsCles: [
      'Humain, traits scandinaves',
      'Chimera, agent de terrain',
      'Sniper, formation militaire',
      'Train de vie : élevé et invisible',
      'Beaucoup trop d’augmentations',
    ],
    comportements: [
      'Frappe juste, pas fort. Deux plaies, pas une de plus.',
      'Part quand une patrouille passe, et revient plus tard. Ou pas.',
      'Marche au retour. Il ne court jamais : il croit toujours avoir fini.',
      'N’aime pas quand ça devient salissant.',
    ],
    repliques: [],   // il ne parle pas encore, et c'est volontaire
    signature: 'sabotage-inacheve',
  },

  /* ══ CHANTIER RENFIELD (rang 9, PLAN_TRAME_ACTES_III_IV.md §10) ══════
     D10 (validée le 2026-08-22, jamais appliquée faute de scène où il
     parle) : le texte source en fait un vieux chaman amérindien, fixeur
     par loyauté envers la famille Telestrian — pas l'elfe intermédiaire
     que cette fiche en faisait. Corrigé ici, au moment où il ouvre
     enfin la bouche pour la première fois du jeu (`carte.js`, le
     dialogue `renfield`). */
  renfield: {
    nom: 'Renfield',
    metatype: 'humain',
    taille: 1.90,
    motsCles: [
      'Humain, chaman, âgé',
      'Ami de la famille Telestrian, depuis plus longtemps qu’Hayden n’est né',
      'Fixeur à contrecœur, mage de combat si vraiment il le faut',
      'Train de vie : élevé, et jamais dépensé pour lui',
      'N’a pas participé à un bain de sang depuis des années, et compte que ça dure',
    ],
    comportements: [
      'Ne menace jamais lui-même. Il n’en a pas besoin, et ça le dégoûterait.',
      'Répète qu’il n’a pas choisi ce travail, sans jamais dire qu’il pourrait le refuser.',
      'Écoute plus qu’il ne parle. Vingt ans de silence, ça laisse une habitude.',
      'Ne défend pas Hayden. Il défend ce qu’il doit aux parents.',
    ],
    repliques: [
      '« Je savais que vous viendriez me trouver avant que je vous trouve, moi. »',
      '« Ce n’est pas mon crime. Je n’ai fait que le porter. »',
      '« Je n’ai plus mis les mains dans ce genre d’affaire depuis longtemps. Je préférerais ne pas recommencer. »',
      '« Dites-moi ce que vous savez. Après, c’est moi qui déciderai quoi en faire. »',
    ],
    signature: 'remonte-a-hayden',
  },

  /* ── LES QUATRE AMIS DE TERESA — chantier 28, acte IV ──────────────
     `PLAN_TRAME_ACTES_III_IV.md` § 7.3 : « quatre PNJ, quatre serrures
     qui ne sont pas des serrures ». C'est le second verrou-manifeste du
     jeu, celui qui rejoue la leçon de G5 en quatre variantes — un ami
     ne s'ouvre pas, il décide de parler.

     Ils sont ici, dans `pnj` et pas dans `equipe`, pour deux raisons de
     moteur et une de fond : `LOCUTEURS` (interact.js) est construit sur
     `equipe` + `pnj`, donc une paire ['mark', '…'] ne s'attribue que
     si la fiche existe ici ; `dis()` (main.js) envoie dans la bulle du
     RÉCIT tout ce qui est dans `equipe`, ce qui est juste pour les
     quatre runners et faux pour quelqu'un d'en face. Et sur le fond :
     ce sont des personnages, pas des cibles — ils méritent la même
     fiche que McCarthy ou le pêcheur. */

  mark: {
    nom: 'Mark',
    metatype: 'humain',
    taille: 1.72,
    motsCles: [
      'Humain, dix-neuf ans',
      'Loveland, livreur de nuit',
      'Amoureux d’elle, et elle ne l’a jamais su',
      'Train de vie : celui de sa mère',
      'A gardé tout ce qu’elle a écrit',
    ],
    comportements: [
      'Répond aux questions sur elle. Jamais à celles sur l’autre.',
      'Ne prend pas d’argent. Ce n’est pas de la fierté, c’est pire.',
      'Tient une pochette de disque vide pendant toute la conversation.',
      'S’ouvre à qui parle d’elle au présent.',
    ],
    repliques: [
      '« Vous êtes qui, vous. »',
      '« Personne demande jamais comment elle allait. »',
      '« J’ai pas envie que ça serve à quelque chose. »',
      '« Elle l’a écrit une fois. Je l’ai gardé. »',
    ],
    /* Le petit frère de G5 : même verrou, quinze ans de moins. */
    signature: 'se-convainc-pas-sachete',
  },

  psych: {
    nom: 'Psych',
    metatype: 'humain',
    taille: 1.80,
    motsCles: [
      'Humain, âge indéterminé',
      'Loveland, nulle part précisément',
      'Ingénieur du son quand il tient debout',
      'Train de vie : ce qu’on lui donne',
      'A entendu chaque prise qu’elle a chantée',
    ],
    comportements: [
      'Parle contre un peu d’argent. Ça marche à chaque fois.',
      'Parle aussi gratuitement, à qui l’interroge sur la musique.',
      'Ne ment pas : il n’a pas la place en mémoire pour deux versions.',
      'S’endort au milieu d’une phrase, et la reprend au même mot.',
    ],
    repliques: [
      '« T’as quelque chose ? »',
      '« La troisième prise. C’est la troisième qui était bonne. »',
      '« Waters a tout gardé. Waters garde tout. »',
      '« Personne me demande jamais comment elle chantait. »',
    ],
    signature: 'venal-et-gratuit',
  },

  nova: {
    nom: 'Nova',
    metatype: 'orke',
    taille: 1.88,
    motsCles: [
      'Orke, vingt-quatre ans',
      'Loveland, ancienne des Halloweeners',
      'En rupture, et ça se paie tous les jours',
      'Train de vie : bas, assumé',
      'Interrogée avant vous, et elle n’en parle pas',
    ],
    comportements: [
      'Tient la porte du local sans qu’on le lui ait demandé.',
      'Ne dit jamais la première chose qu’on lui demande.',
      'Reconnaît un nom de gang avant de reconnaître un visage.',
      'A été polie avec des gens polis, et elle s’en veut encore.',
    ],
    repliques: [
      '« Vous êtes la deuxième équipe cette semaine. »',
      '« J’ai rien dit. J’ai juste répondu. »',
      '« Ils avaient des cartes de visite. Vous, non. »',
      '« Elle chantait, et nous on tenait la porte. »',
    ],
    signature: 'deuxieme-equipe',
  },

  nita: {
    nom: 'Nita',
    metatype: 'humaine',
    taille: 1.65,
    motsCles: [
      'Humaine, chamane de l’Ours',
      'Loveland, permanence de l’ORC',
      'Militante — le mot lui va, elle le revendique',
      'Train de vie : celui de l’association',
      'Donne, mais elle veut savoir à qui',
    ],
    comportements: [
      'Pose la question de l’employeur avant toute autre.',
      'Encaisse une vérité désagréable mieux qu’une politesse.',
      'Ferme définitivement à qui esquive, et sans hausser le ton.',
      'Reconnaît un Éveillé d’un coup d’œil, et le traite en confrère.',
    ],
    repliques: [
      '« Pour qui vous travaillez ? »',
      '« Répondez d’abord. Ensuite on verra ce que je sais. »',
      '« Un ork accusé à la place d’un elfe. On a un dossier par mois. »',
      '« Amelia prend les appels. Dites que vous venez de ma part. »',
    ],
    signature: 'pour-qui-vous-travaillez',
  },
}
