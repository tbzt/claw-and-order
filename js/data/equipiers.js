/* ============================================================
   LES ÉQUIPIERS COMME CIBLES

   Les quatre runners sont dans tous les décors, et ils étaient
   cliquables dans deux d'entre eux sans avoir la moindre réaction :
   « ? » au survol, « … » au clic. Huit cibles muettes.

   Ils sont maintenant une cible dans les cinq tableaux, et chacun a
   quelque chose à dire sur chacun — soit seize regards, plus ce que le
   moment ajoute.

   ── LE CONTRAT D'ÉCRITURE ──────────────────────────────────────────

   Trois registres, et ils ne se confondent jamais :

     REGARDER  un CONSTAT. Ce que ce runner-ci voit de l'autre, avec sa
               lentille et ses préjugés. Court. Il décrit l'autre et se
               trahit lui-même — c'est ça, le double fond.
     PARLER    un ÉCHANGE. Il y a une réponse, donc deux voix au moins.
               C'est le seul registre où l'autre a le droit de couper.
     SE VOIR   quand on se regarde soi-même : jamais une description,
               toujours un aveu. C'est la seule ligne où un personnage
               n'a personne à qui mentir.

   ── QUI PARLE DE QUI ───────────────────────────────────────────────

   Chaque paire porte une asymétrie, et elle est tirée des fiches :

     Hercules → il jauge, il évalue, il chiffre. Un tchatcheur regarde
                les gens comme des mains à jouer.
     Trash    → il lit l'aura avant la personne, et il a des manières
                de noble qu'il n'arrive pas à ranger.
     Rabbit   → il lit le trafic, les signaux, l'appartenance. Le seul
                qui envie ce que les autres sont sans effort.
     Drakk    → il traduit tout le monde en personnages de sa table.
                C'est ridicule, et c'est exactement juste à chaque fois.

   ── LA MÉCANIQUE ───────────────────────────────────────────────────

   Une ligne écrite ['drakk', '…'] est dite PAR Drakk, où qu'elle soit.
   C'est comme ça qu'on écrit une coupure de parole : dans le bloc de
   `tous`, on alterne les locuteurs et le moteur les enchaîne dans leurs
   bulles respectives.

   Rien ici ne pose de drapeau et rien n'ouvre de verrou : la règle 19
   tient, une conséquence ajoute et ne retire jamais.
   ============================================================ */

const NOMS = {
  hercules: 'Hercules',
  trash: 'Trash',
  rabbit: 'White_Rabbit',
  drakk: 'Drakk',
}

/* ── SE REGARDER SOI-MÊME ─────────────────────────────────────────────
   Quatre aveux. Pas de description : personne ne se décrit. */
const SOI = {
  hercules: '« Un mètre vingt de charme et une ardoise. Les deux tiennent debout tant que je parle. »',
  trash: '« Une écharpe rayée, des bottes trouées, et un nom de famille que je ne prononce plus. »',
  rabbit: '« Deux cent mille nuyens de chirurgie. Personne n’a jamais demandé pourquoi, et c’est la preuve que ça marche. »',
  drakk: '« Un troll. Niveau douze. Alignement… on verra. »',
}

/* ── CE QUE CHACUN VOIT DES AUTRES ────────────────────────────────────
   REGARDS[cible][observateur]. Seize lignes, aucune interchangeable. */
const REGARDS = {

  hercules: {
    trash: '« Il tient sa mise comme si elle était plus grosse. Ça marche presque toujours, et je le lui envie. »',
    rabbit: '« Train de vie bas, montre chère. Il a eu de l’argent, il n’en a plus, il n’en parle pas. »',
    drakk: '« Un halfelin beau parleur. Toute compagnie en a un, et sans lui la compagnie se fait tuer au premier village. »',
  },

  trash: {
    hercules: '« Grand, mince, et parfaitement inutile en cas de bagarre. Il le sait. C’est pour ça qu’il n’y en a jamais avec lui. »',
    rabbit: '« Son aura est propre. Trop propre pour quelqu’un qui dort dehors — il a choisi de dormir dehors. Ce n’est pas pareil. »',
    drakk: '« Un elfe. Noble, si je lis ses manières. Il rend le sel à table avec les deux mains. »',
  },

  rabbit: {
    hercules: '« Il a payé pour ces défenses. Je ne juge pas : moi j’ai payé pour un costume. La différence est qu’on peut retirer un costume. »',
    trash: '« Il porte un visage qui n’est pas celui de sa naissance, et il le porte bien. L’aura, elle, n’a pas suivi. Elle est restée humaine. »',
    drakk: '« Un ork qui n’a pas la démarche d’un ork. La statistique ne ment pas, la fiche de personnage non plus. »',
  },

  drakk: {
    hercules: '« Deux mètres cinquante de raisons de ne pas négocier. J’adore travailler avec lui, ça raccourcit mes phrases. »',
    trash: '« Il y a de la place pour trois esprits dans cet homme et il n’y en a aucun. Il est seul là-dedans, et il tient quand même. »',
    rabbit: '« Il lit un livre en papier. En 2081. Il l’a lu deux cents fois et il en parle comme d’une première fois. »',
  },
}

/* ── LES ÉCHANGES ─────────────────────────────────────────────────────
   ÉCHANGES[cible][qui parle]. Ici l'autre répond, et il coupe.
   C'est le registre PARLER : il y a toujours au moins deux voix. */
const ECHANGES = {

  hercules: {
    trash: [
      ['trash', '« Hercules. Si Raton laveur te demandait quelque chose, tu dirais oui ? »'],
      ['hercules', '« Ça dépend de ce qu’il propose en échange. »'],
      ['trash', '« Rien. Jamais. C’est le principe. »'],
      ['hercules', '« Alors non. Mais dis-lui que je l’aime bien. »'],
    ],
    rabbit: [
      ['rabbit', '« T’as besoin d’un decker ou d’un miracle ? »'],
      ['hercules', '« J’ai besoin de quarante secondes de silence pendant que je parle. »'],
      ['rabbit', '« Ça, c’est le miracle. »'],
    ],
    drakk: [
      ['drakk', '« Compagnon. Combien de langues parles-tu ? »'],
      ['hercules', '« Une. Très bien. »'],
      ['drakk', '« …Ah. Dans ma table, c’est un malus. »'],
      ['hercules', '« Dans la vraie vie, c’est un métier. »'],
    ],
  },

  trash: {
    hercules: [
      ['hercules', '« Ta famille. Elle vaut combien ? »'],
      ['trash', '« Assez pour que la question soit impolie. »'],
      ['hercules', '« C’est pour ça que je la pose. Les gens répondent quand ils sont vexés. »'],
      ['trash', '« Je sais. Je suis vexé. Je ne réponds pas. »'],
    ],
    rabbit: [
      ['rabbit', '« Tu pourrais rentrer chez toi demain. »'],
      ['trash', '« Oui. »'],
      ['rabbit', '« …Moi non. »'],
      ['trash', '« Je sais. C’est pour ça que je reste. »'],
    ],
    drakk: [
      ['drakk', '« Noble elfe, quelle est ta quête ? »'],
      ['trash', '« Ne pas devenir mon père. »'],
      ['drakk', '« C’est une bonne quête. Longue. »'],
    ],
  },

  rabbit: {
    hercules: [
      ['hercules', '« Tu sais que je sais. »'],
      ['rabbit', '« Nous, les orks, … »'],
      ['hercules', '« Voilà. Ça. Ne finis jamais cette phrase et tout ira bien. »'],
    ],
    trash: [
      ['trash', '« Ton aura n’a pas changé, tu sais. »'],
      ['rabbit', '« Je ne t’ai rien demandé. »'],
      ['trash', '« Non. Je te dis juste qu’elle est belle telle qu’elle est. »'],
      ['rabbit', '« …Ferme-la, Trash. »'],
    ],
    drakk: [
      ['drakk', '« Sorciers de la Matrice, prêtez-moi votre sagesse. »'],
      ['rabbit', '« C’est moi, le sorcier de la Matrice. »'],
      ['drakk', '« Je sais. C’est une formule. Elle se dit avant. »'],
    ],
  },

  drakk: {
    hercules: [
      ['hercules', '« Drakk. Ton livre. Il finit comment ? »'],
      ['drakk', '« Je ne l’ai jamais fini. »'],
      ['hercules', '« Deux cents lectures et tu n’as jamais fini ? »'],
      ['drakk', '« On ne finit pas une porte, compagnon. On la passe. »'],
    ],
    trash: [
      ['trash', '« Tu joues tous les personnages toi-même ? »'],
      ['drakk', '« Il n’y avait personne d’autre. »'],
      ['trash', '« …Il y a quelqu’un, maintenant. »'],
    ],
    rabbit: [
      ['rabbit', '« Pourquoi Drakk ? »'],
      ['drakk', '« Parce que Drek était pris. »'],
    ],
  },
}

/* ── CE QUE LE TABLEAU AJOUTE ─────────────────────────────────────────
   Règle 19 : ça AJOUTE, ça ne remplace pas.

     `vu`  la description partagée — la caméra. C'est elle qui plante le
           personnage la première fois qu'on le voit, et elle passe en
           récit, avant la voix de celui qui regarde.
     `dit` ce que la cible dit d'ELLE-MÊME quand on vient lui parler.
           Elle ouvre l'échange ; les répliques du catalogue suivent.
           Peut être une fonction du contexte.
     `<runner>` une ligne de plus pour CE runner-là, à ce moment-là.

   Le tableau 1 était déjà écrit — quatre fiches d'introduction, mais
   sans voix : le texte ne changeait pas selon qui regardait. Il est
   repris ici tel quel, et c'est maintenant la couche partagée. */
const TABLEAUX = {

  bar: {
    drakk: {
      vu: ['Deux mètres soixante de troll en tenue simili-médiévale, et il ne trouve pas ça bizarre.',
           'Il inspecte la salle comme on relève une taverne : les sorties, les tables, qui est armé. Le vocabulaire est faux, la méthode est bonne.'],
      dit: '« La compagnie tient conseil dans une auberge. C’est de bon augure. »',
    },
    rabbit: {
      vu: ['Capuche relevée, épaules rentrées, cyberdeck contre la poitrine. Il se fait plus petit qu’il n’est.',
           'Sous la mâchoire, les cicatrices que la chirurgie n’a jamais tout à fait rattrapées. Personne ici ne les remarquera : ils voient juste un ork.'],
      dit: '« Le bar a un nœud public. Ouvert. Dans un bar à flics. C’est presque touchant. »',
    },
    trash: {
      vu: ['Un elfe, trois épaisseurs de fringues dépareillées, une écharpe rayée qui pend jusqu’à la ceinture.',
           'Il regarde McCarthy comme s’il évaluait un adulte, pas un client. C’est une habitude de famille dont il ne s’est jamais débarrassé.'],
      dit: ({ a }) => a('sait-famille')
        ? '« Une fille du Tír, morte à Redmond, et sa famille qui veut que ça se taise. Je connais la chanson par cœur. »'
        : '« Il a peur, ce vieux. Ce n’est pas nous qui lui faisons peur. »',
    },
    hercules: {
      vu: ['Un nain d’une cinquantaine d’années en costume correct et fatigué. Il tient les apparences ; il n’a plus les moyens.',
           'Il a déjà compté les issues, les clients et, approximativement, ce que McCarthy peut se permettre de payer.'],
      dit: ({ a }) => a('embauche')
        ? '« Signé. Voilà, c’est fait. Maintenant on peut paniquer tranquillement. »'
        : '« Laissez-moi parler. C’est littéralement la seule chose que je fasse bien. »',
    },
  },

  retour: {
    /* Le bras trempé ne se voit que si l'esprit de l'eau a été appelé
       au voilier (`trash-epuise`, quai-voilier.js) — un chemin
       optionnel. Sans condition, la ligne se lisait même quand la
       scène n'avait jamais eu lieu. */
    trash: {
      vu: ({ a }) => a('trash-epuise')
        ? 'Il a le bras gauche encore trempé jusqu’au coude, et il ne le frotte pas.'
        : 'Il regarde l’eau du détroit comme s’il s’attendait à ce qu’elle réponde.',
      hercules: ({ a }) => a('trash-epuise')
        ? '« Il a payé quelque chose dans cette eau. Il ne dira pas quoi. »'
        : '« Il n’a pas dit un mot depuis McNeil. Ça ne lui ressemble pas. »',
    },
    drakk: {
      drakk: '« La Mer de Cendre était plus large. Et il n’y avait personne dessus. »',
    },
  },

  planque: {
    hercules: {
      vu: 'Six heures du matin. Il parle encore, mais plus vite et moins bien.',
      drakk: '« Le halfelin fatigue. C’est à ce moment-là qu’il dit des choses vraies. »',
    },
    rabbit: {
      trash: '« Son aura s’est ouverte cette nuit. Je ne lui dirai pas. »',
    },
  },

  /* La planque de Drakk, chantier 36 : « chaque planque neuve a le
     sien » (PLAN_PLANQUES.md § 6). */
  herwick: {
    drakk: {
      vu: 'Il ne s’assoit pas. Il reste debout, près du rideau, comme s’il montait la garde devant une dette plutôt que devant une porte.',
      hercules: '« Il n’a pas quitté ce rideau des yeux depuis qu’on est entrés. Ce n’est pas de la méfiance. C’est de la culpabilité qui a pris la forme d’une vigilance. »',
    },
    hercules: {
      vu: 'Il évalue le stock du regard, par réflexe, et s’arrête net en réalisant ce qu’il est en train de faire.',
      trash: '« Il vient de chiffrer toute la boutique en une seconde, et il vient de s’en vouloir tout aussi vite. »',
    },
  },

  /* Le cabinet de Sarah, chantier 37 : même raccord, troisième décor. */
  sarah: {
    trash: {
      vu: 'Il ne s’assoit pas non plus. Il reste debout près de la table d’examen, comme s’il attendait son tour depuis toujours, sans jamais le prendre.',
      hercules: '« Il connaît cette pièce mieux qu’il ne connaît la nôtre. Ça devrait m’inquiéter pour lui, et ça ne fait que me rassurer pour nous. »',
    },
    hercules: {
      vu: 'Il compte les trois inconnus de la salle d’attente sans en avoir l’air, comme il compte tout le reste.',
      drakk: '« Le halfelin fait l’inventaire d’une salle de gens malades. J’ai vu des maîtres de jeu plus cyniques que lui, et aucun d’aussi affecté par ce qu’il compte. »',
    },
  },

  /* Le sous-sol de Duke, chantier 37 : même raccord, quatrième décor. */
  duke: {
    rabbit: {
      vu: 'Il ne s’assoit pas non plus. Il reste debout, entre Duke et l’escalier, comme si sa place était déjà décidée depuis longtemps dans cette pièce.',
      trash: '« Son aura change, ici. Moins de gêne qu’ailleurs. Il est chez des gens qui ne lui demandent pas d’expliquer qui il est. »',
    },
    drakk: {
      vu: 'Il compte les issues et les armes de la pièce, par réflexe de troll des rues, et s’arrête en réalisant que huit personnes font déjà ce calcul pour lui.',
      hercules: '« Pour une fois, il n’est pas le plus grand danger de la pièce. Je crois que ça le repose plus qu’il ne l’admettra. »',
    },
  },

  /* La loge de Trash, chantier 40 : cinquième et dernier décor. Ici
     c'est TRASH qui est l'hôte — le seul des quatre — donc sa propre
     entrée porte le poids que Drakk portait chez Herwick, pas une ligne
     de plus sur un cinquième runner. */
  squat: {
    trash: {
      vu: 'Il touche les objets de la pièce comme s’il les comptait, pas comme s’il les admirait — un geste de propriétaire qu’on ne lui voit nulle part ailleurs cette nuit.',
      drakk: '« Il garde un œil sur chaque chose qu’il a sauvée, l’un après l’autre. C’est la première fois de la nuit que je le vois monter la garde sur autre chose qu’une personne. »',
    },
    drakk: {
      vu: 'Il reste près de la trappe, les bras croisés, comme s’il montait déjà la garde avant qu’on le lui demande.',
      hercules: '« Personne ne lui a rien demandé. Il a juste décidé que c’était sa place, ce soir. Je ne discute pas ce genre de décision. »',
    },
  },

  /* Le tripot d'Hercules, chantier 41 : ici c'est HERCULES qui est
     l'hôte — comme Trash au squat — donc sa propre entrée porte le
     poids que Drakk portait chez Herwick, pas une ligne de plus sur un
     cinquième runner. */
  tripot: {
    hercules: {
      vu: 'Il ne s’assoit pas à la table. Il reste debout, à la lisière, comme quelqu’un qui connaît trop bien les règles de la maison pour vouloir y jouer ce soir.',
      trash: '« Son aura tremble depuis qu’on est entrés, et ce n’est pas la fumée. Il a peur de cette pièce plus qu’il ne l’admettra. »',
    },
    drakk: {
      vu: 'Il observe la partie comme il observerait une table de jeu de rôle mal maîtrisée : les règles existent, personne ne les dit à voix haute.',
      hercules: '« Il vient de repérer trois tricheurs à l’œil nu. Je ne sais pas s’il faut que ça me rassure ou que ça m’inquiète. »',
    },
  },

  /* Le local de répétition, chantier 28 : le premier décor de l'acte IV,
     et le premier où PERSONNE n'est l'hôte. Les cinq décors de planque
     avaient chacun le leur (Drakk chez Herwick, Trash à la loge,
     Hercules au tripot…) ; ici, les quatre runners sont également
     étrangers à la pièce, et ce sont deux MÉTHODES qui échouent au lieu
     de deux hommes qui rentrent chez eux. Hercules ne peut acheter
     personne ; Trash reconnaît la famille qui vient de passer avant
     eux, parce que c'est la sienne. */
  /* L'appartement de Teresa, chantier 26 : le premier décor du jeu SANS
     PERSONNE en face. Les cinq planques avaient Lester, le local avait
     quatre amis ; ici il n'y a que l'équipe et une pièce vide depuis
     trois jours. Les deux entrées sont donc celles des deux runners que
     le vide met au travail — White_Rabbit, parce que le seul maillon
     qui reste est matriciel, et Drakk, parce qu'il est le seul à savoir
     quoi faire d'un endroit où quelqu'un est mort. */
  appartement: {
    rabbit: {
      vu: ‘Il ne touche à rien. Il fait le tour de la pièce en lisant ce qui flotte dessus, les mains dans les poches, comme dans un musée dont il serait le seul visiteur.’,
      trash: ‘« Il est le seul d’entre nous qui voie encore quelque chose ici. Nous trois, on regarde des meubles. »’,
    },
    drakk: {
      vu: 'Il enlève son bonnet en entrant. Personne ne lui a rien demandé, et personne ne fait de commentaire.',
      hercules: '« Il a retiré son bonnet. Je ne l’avais jamais vu faire ça de toute la nuit, pas même au tribunal. »',
    },
  },

  amis: {
    hercules: {
      vu: 'Il ouvre la bouche deux fois avant de dire quoi que ce soit. Trente ans qu’il entre dans une pièce en sachant ce qu’il va vendre, et il n’a rien à vendre ici.',
      drakk: '« Le halfelin ne trouve pas sa première phrase. Je ne l’avais jamais vu manquer une entrée. »',
    },
    trash: {
      vu: 'Il reste près de la porte, ce qui ne lui ressemble pas dans une pièce pleine d’auras. Il regarde surtout le comptoir.',
      rabbit: '« Il a compris avant nous qui était passé ici. Il n’a pas eu besoin de lire la carte : il a reconnu la manière. »',
    },
  },

  /* Le Shameless, chantier 27 : la troisième ancre, et le seul décor de
     l'acte IV qui ne soit ni un lieu de deuil ni un lieu de travail —
     un club, tard, où personne de l'équipe n'a sa place. Drakk et
     White_Rabbit portent l'entrée, comme au local : deux façons
     différentes de ne pas être d'ici. */
  shameless: {
    drakk: {
      vu: 'Il garde les mains dans le dos, comme s’il craignait de casser quelque chose rien qu’en le regardant. Ce genre d’endroit ne figure dans aucun de ses livres.',
      hercules: '« Il vient de calculer le prix d’un verre au bar, et il vient de perdre une teinte. Pour un troll de deux mètres cinquante, c’est un exploit. »',
    },
    rabbit: {
      vu: ‘Il scanne la salle par réflexe, puis s’arrête : il n’y a presque rien à lire ici. Un club qui ne veut pas qu’on sache qui vient.’,
      trash: ‘« Son aura s’est refermée d’un cran en entrant. Ce n’est pas la musique. C’est le genre de silence que les riches paient pour avoir. »’,
    },
  },

  /* Waters Sound, chantier 43 : le quatrième décor de l’acte IV, et le
     premier où l'enjeu n'est ni un deuil ni une confiance à gagner mais
     un COFFRE — Rabbit et Hercules portent l'entrée, chacun reconnaissant
     dans la pièce une version déformée de son propre métier. */
  waters: {
    rabbit: {
      vu: ‘Il repère le verrou du coffre avant même d’avoir salué qui que ce soit, par réflexe — puis se force à regarder le reste de la pièce en second.’,
      hercules: ‘« Il vient d’évaluer une porte avant un homme. Je fais l’inverse depuis trente ans. Je ne sais plus lequel de nous deux a raison. »’,
    },
    hercules: {
      vu: 'Il inspecte le mur de disques encadrés en connaisseur, puis s’arrête sur la petite photo dans le coin du cadre — celle où Waters est encore devant le micro, pas derrière.',
      trash: '« Il vient de reconnaître un homme qui a raté quelque chose, parce qu’il en est un lui aussi. Ça ne le rend pas plus tendre. Ça le rend plus précis. »',
    },
  },
}

/* ── LA FABRIQUE ──────────────────────────────────────────────────────
   Rend les quatre cibles pour un tableau donné, à étaler dans ses
   `hotspots`. Le moteur n'y touche pas : c'est de la donnée. */
export function equipiers(tableau) {
  const cibles = {}

  for (const id of Object.keys(NOMS)) {
    const ici = TABLEAUX[tableau]?.[id] ?? {}

    cibles[id] = {
      nom: NOMS[id],

      regarder: (ctx) => {
        const { qui } = ctx
        /* `vu` et la ligne par runner peuvent dépendre de l'état — un
           tableau revisité (règle 19) peut avoir gagné un drapeau que
           la description ne connaissait pas encore. Même traitement
           que `dit` plus bas. */
        const vu = typeof ici.vu === 'function' ? ici.vu(ctx) : ici.vu
        const extra = typeof ici[qui] === 'function' ? ici[qui](ctx) : ici[qui]
        /* Se regarder soi-même n'est pas se décrire : c'est s'avouer. */
        if (qui === id) return { tous: vu ?? [], [qui]: SOI[id] }
        return {
          tous: vu ?? [],
          [qui]: [REGARDS[id][qui], ...(extra ? [extra] : [])],
        }
      },

      parler: (ctx) => {
        const { qui } = ctx
        /* La cible ouvre — c'est elle qu'on est venu voir — puis
           l'échange se déroule dans les deux voix. */
        const ouverture = typeof ici.dit === 'function' ? ici.dit(ctx) : ici.dit
        const amorce = ouverture ? [[id, ouverture]] : []
        if (qui === id)
          return { tous: amorce, [qui]: '« Je me parle beaucoup. Ça ne regarde personne. »' }
        return { tous: [...amorce, ...ECHANGES[id][qui]] }
      },

      /* On ne se fouille pas entre équipiers. Le refus est dans la voix
         du runner actif, comme partout ailleurs (règle 11). */
      utiliser: ({ qui }) =>
        qui === id
          ? { tous: [], [qui]: '« Je me tiens déjà. »' }
          : { tous: [], [qui]: TOUCHER[qui] },
    }
  }

  return cibles
}

const TOUCHER = {
  hercules: '« On ne touche pas les gens. On leur parle. C’est plus lent et ça marche mieux. »',
  trash: '« Non. On ne pose pas la main sur quelqu’un sans le lui demander. »',
  rabbit: '« Si tu les touches, je te formate. Ça vaut aussi pour moi qui les touche. »',
  drakk: '« Un compagnon ne se fouille pas. C’est écrit page quarante. »',
}
