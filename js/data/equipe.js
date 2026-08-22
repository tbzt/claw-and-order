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
    },
    /* Deux contacts de fiche : Elton Hutchinson (avocat, pas encore
       branché — chantier 32) et Alicia Francetti, journaliste — branchée
       au réseau (chantier 31). Une journaliste, dans un scénario où les
       médias s'emparent de l'affaire : voir js/data/reseau.js. */
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
     jamais refermé.

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

  renfield: {
    nom: 'Renfield',
    metatype: 'elfe',
    taille: 1.90,
    motsCles: [
      'Elfe, Seattle',
      'Intermédiaire de la famille Telestrian',
      'Fixeur, mais il déteste le mot',
      'Train de vie : élevé',
      'Ne travaille que pour des gens qu’il méprise',
    ],
    comportements: [
      'Parle du Tír comme d’un endroit qu’il a quitté, alors qu’il n’y a jamais vécu.',
      'Paie comptant, et trop, pour ne pas avoir à revenir.',
      'Se souvient des visages, pas des noms. C’est un choix.',
      'Ne menace jamais lui-même.',
    ],
    repliques: [
      '« Vous n’êtes pas obligés de comprendre. »',
      '« La famille préfère que ça reste une affaire de famille. »',
      '« Je ne suis pas un fixeur. Je suis un intermédiaire. »',
      '« Combien, pour que vous ne soyez jamais venus ? »',
    ],
    signature: 'remonte-a-hayden',
  },
}
