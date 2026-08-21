/* ============================================================
   LE CARNET DE RECOUPEMENT

   Le mécanisme de « Discworld Noir », qui se trouve être la définition
   exacte du legwork Shadowrun : on collecte des informations, et on les
   frotte l'une contre l'autre jusqu'à ce qu'elles en produisent une
   troisième.

   `CONCEPTION.md` § 12 demandait de le construire EN PREMIER, avec
   quatre fiches jouets, pour valider le geste avant d'en dépendre. Il ne
   l'a pas été pendant tout le prototype, et l'acte IV — la contre-enquête,
   la remontée jusqu'à Hayden Telestrian — n'avait donc aucun support.

   > RÈGLE 12 — Une déduction ouvre la parole, jamais une porte.
   > Le carnet débloque des sujets de dialogue et des options de
   > négociation. Il ne déverrouille jamais un obstacle physique. Sinon
   > il devient un second inventaire, et le joueur le traite comme une
   > liste de courses.

   Chaque déduction pose un drapeau `su:<id>`. C'est la SEULE chose
   qu'elle fait. Un dialogue peut le lire ; un verrou, jamais.

   Volume cible sur la run : 24 fiches, dont 7 déductions.
   ============================================================ */

export const fiches = {

  /* ── Ce que McCarthy lâche au bar ─────────────────────────────── */
  'dossier-vide': {
    titre: 'Le dossier est vide',
    texte: 'Aucune trace de Lester sur elle. McCarthy le sait, et il ira le soutenir au procès quand même.',
    ou: 'McCarthy, au Claw & Order',
  },
  'elfe-autopsie': {
    titre: 'Le dernier à l’avoir touchée était un elfe',
    texte: 'C’est l’autopsie qui le dit, et c’est ce rapport que Wú Chen a fait verser au dossier de la défense.',
    ou: 'McCarthy, au Claw & Order',
  },
  'navette-huit-heures': {
    titre: 'Il n’arrivera pas',
    texte: '« Si je le fais transférer par la navette de huit heures, il arrive pas. J’ai déjà lu le rapport, je peux vous le réciter. »',
    ou: 'McCarthy, au Claw & Order',
  },
  teresa: {
    titre: 'Teresa Banks, vingt-deux ans',
    texte: 'Étranglée. Elfe de Tír Tairngire, SIN associé à Telestrian. Personne n’a posé de question sur elle depuis trois jours.',
    ou: 'McCarthy, au Claw & Order',
  },
  'famille-tir': {
    titre: 'Une famille du Tír veut que ça se taise',
    texte: 'Trash connaît la chanson de l’intérieur : chez lui, ce qui gêne ne se règle pas, ça s’efface.',
    ou: 'Trash, au Claw & Order',
  },

  /* ── Ce qu'on ramasse au quai ─────────────────────────────────── */
  'grand-blond': {
    titre: 'Un grand type blond',
    texte: 'Une tête de plus que tout le monde. Monté sur le bateau vers onze heures, ressorti en marchant, parti par le talus.',
    ou: 'Le pêcheur, au Sunnyside Beach Park',
  },
  'travail-inacheve': {
    titre: 'Il croyait avoir fini',
    texte: 'Deux fils entiers dans le compartiment moteur, et une piste astrale qui revient au pas. Un homme qui s’enfuit ne marche pas.',
    ou: 'Le quai, Sunnyside Beach Park',
  },

  /* ── Ce que le goulet apprend ─────────────────────────────────── */
  'toralf-vise-lester': {
    titre: 'Il visait le gamin',
    texte: 'Deux tirs au goulet, à hauteur d’épaule, sur la place exacte où Lester était assis. Ce n’est pas le bateau qu’on voulait arrêter.',
    ou: 'Le goulet, au retour',
  },

  guilde: {
    titre: 'Une compagnie',
    texte: 'Une bouteille payée au Claw & Order, ouverte au milieu du détroit, et tendue au gamin en premier. Ce n’est pas une information. C’est la seule chose de la nuit que personne n’a calculée.',
    ou: 'Le pont du voilier, au retour',
  },

  'lester-temoigne': {
    titre: 'Il a décidé de parler',
    texte: '« Je vais leur dire. Pas ce qu’ils veulent entendre — ce qui s’est passé. » Personne ne l’a acheté, personne ne l’a convaincu. On l’a écouté trois heures dans une laverie.',
    ou: 'La planque, à l’aube',
  },

  /* ── Ce qu'on lit au greffe ───────────────────────────────────── */
  'registre-anterieur': {
    titre: 'La ligne est plus ancienne que lui',
    texte: 'LESTER — TRANSFERT TRIBUNAL — 08:00 — NAVETTE. Écrite avant la prise de service du gardien de nuit.',
    ou: 'Le greffe de McNeil',
  },
}


/* Les déductions. Une paire prévue, une fiche neuve, et un drapeau
   `su:<id>` que seuls les dialogues ont le droit de lire. */
export const deductions = [
  /* LA DÉDUCTION-TUTORIEL. Les deux fiches viennent du même dialogue,
     au premier tableau : le joueur peut donc faire son premier
     recoupement dans la scène qui lui apprend le jeu, au lieu d'attendre
     le troisième tableau pour découvrir à quoi sert le carnet.
     C'est ce que demandait CONCEPTION § 12 — « quatre fiches jouets,
     valider le geste avant d'en dépendre » — et ça ne coûte rien,
     puisque les deux répliques existaient déjà. */
  {
    paire: ['dossier-vide', 'navette-huit-heures'],
    donne: {
      id: 'pas-de-proces',
      titre: 'Ce n’est pas un procès qu’on veut',
      texte: 'Le dossier ne tient pas debout : au tribunal, il s’effondre. Et pourtant quelqu’un tient à ce que Lester monte dans la navette de huit heures. On ne cherche pas à le faire condamner. On cherche à ce qu’il n’y ait pas d’audience du tout.',
      ou: 'Recoupement',
    },
    dit: {
      tous: 'Les deux fiches se répondent, et la réponse est pire que les questions.',
      hercules: '« On nous paie pour livrer un témoin. Pas pour sauver un innocent. Le vieux ne s’en est peut-être pas encore aperçu. »',
      trash: '« Personne ne veut le condamner. On veut qu’il se taise. Ce n’est pas la même chose et c’est beaucoup plus simple. »',
      rabbit: '« Un dossier vide et un transfert verrouillé. Ce n’est pas une erreur judiciaire, c’est une suppression planifiée. »',
      drakk: '« On n’a pas dressé de gibet. On a creusé une fosse sur le chemin. »',
    },
  },
  {
    paire: ['elfe-autopsie', 'grand-blond'],
    donne: {
      id: 'deux-mains',
      titre: 'Ce ne sont pas les mêmes mains',
      texte: 'Un elfe a étranglé Teresa. Un grand blond a planté Wilson, proprement, deux coups. Deux métiers différents, deux affaires différentes — et un seul commanditaire pour qu’elles se croisent cette nuit.',
      ou: 'Recoupement',
    },
    /* La réplique se dit dans la voix du runner actif : c'est lui qui
       vient de faire le lien, pas une voix off. */
    dit: {
      tous: 'Tu poses les deux fiches l’une sur l’autre, et la nuit change de forme.',
      hercules: '« Deux tueurs. Donc deux factures. Donc deux personnes qui ont payé, et elles ne se connaissent peut-être même pas. »',
      trash: '« L’un a étranglé — c’est de la colère. L’autre a placé deux coups — c’est un tarif. Ce ne sont pas les mêmes mains. »',
      rabbit: '« Le premier a tué une fille. Le second nettoie derrière. Ils ne travaillent pas pour la même raison. »',
      drakk: '« Deux lames dans la même nuit et aucune ne se connaît. Voilà une intrigue de haute cour. »',
    },
  },
  {
    paire: ['toralf-vise-lester', 'navette-huit-heures'],
    donne: {
      id: 'deux-plans',
      titre: 'Deux plans pour le même mort',
      texte: 'La navette de huit heures était le plan propre : un accident administratif, personne à payer. Le tireur du goulet est le plan sale, celui qu’on déclenche quand le premier échoue. On n’improvise pas un sniper en une nuit : il était déjà réservé.',
      ou: 'Recoupement',
    },
    dit: {
      tous: 'Les deux fiches se posent l’une sur l’autre sans forcer.',
      hercules: '« Un plan de rechange, ça se paie d’avance. Quelqu’un a acheté ce type AVANT de savoir s’il en aurait besoin. »',
      trash: '« On ne prépare pas deux morts pour le même homme si on doute de le vouloir mort. »',
      rabbit: '« Redondance. C’est un mot d’architecte. Ils ont architecturé sa mort. »',
      drakk: '« Deux lames pour une gorge. C’est l’aveu d’une grande peur. »',
    },
  },
  {
    paire: ['registre-anterieur', 'navette-huit-heures'],
    donne: {
      id: 'ordre-anterieur',
      titre: 'C’était écrit avant',
      texte: 'La navette de huit heures était déjà réservée à Lester quand McCarthy cherchait encore un passeur. On n’a pas réagi à son initiative : on l’a devancée.',
      ou: 'Recoupement',
    },
    dit: {
      tous: 'Les deux heures ne collent pas. Elles ne colleront jamais.',
      hercules: '« Le vieux croit qu’il a pris tout le monde de vitesse. Il a une nuit de retard. »',
      trash: '« Il n’a pas déclenché ça. Il est arrivé dedans. »',
      rabbit: '« L’horodatage est antérieur. Quelqu’un a écrit la fin avant qu’on écrive le début. »',
      drakk: '« Le piège était tendu avant que nous entrions dans la taverne. »',
    },
  },
]


/* Les refus. « Les répliques de Guybrush qui décline sont la moitié de
   la personnalité de Monkey Island » — un refus générique sur une paire
   que le joueur croyait maligne, c'est une petite trahison à chaque
   fois. Ceux-ci sont dans la voix du runner actif, comme les autres. */
export const refus = {
  hercules: [
    '« Les deux ensemble ? Rien. Et j’ai vraiment essayé de me convaincre. »',
    '« Ça ne fait pas une troisième idée. Ça fait deux idées côte à côte. »',
  ],
  trash: [
    '« Non. Ces deux-là ne se regardent pas. »',
    '« J’ai frotté. Il n’en sort rien, et ça ne sent même pas le brûlé. »',
  ],
  rabbit: [
    '« Aucune corrélation. J’ai croisé, c’est vide. »',
    '« Deux entrées sans clé commune. Ça ne joint pas. »',
  ],
  drakk: [
    '« Ces deux augures ne se répondent pas. »',
    '« J’ai rapproché les deux parchemins. Le destin se tait. »',
  ],
}

/* ── LES PAIRES PROCHES ───────────────────────────────────────────────
   Celles où le joueur a une bonne raison d'essayer : deux fiches qui
   partagent une source, un nom propre, ou une heure. Elles méritent
   mieux qu'un refus au hasard — c'est là qu'on lui dit qu'il n'a pas
   tort, seulement pas encore assez.

   L'ARITHMÉTIQUE, parce qu'elle décide de tout ici. Avec quinze fiches,
   il y a 105 paires possibles. Avec quatre déductions et quatre paires
   proches, huit d'entre elles disaient quelque chose — 7,6 %. Un joueur
   qui essaie au hasard tombait donc treize fois sur un refus générique
   avant de trouver, et il en concluait que le carnet ne sert à rien.
   Il avait statistiquement raison de le conclure.

   Elles sont dix-sept. Le taux passe à 20 % : une paire sur cinq
   répond. C'est le seuil à partir duquel on continue d'essayer.

   Un `presque` coûte une phrase ; une déduction coûte une fiche neuve,
   cinq voix et un drapeau. À budget d'écriture égal, c'est ici que
   l'argent rend le plus.

   LA CLÉ SE TRIE : `[a, b].sort().join('|')`. Une clé dans le mauvais
   ordre ne se déclenche jamais et rien ne le dit — `verifieCarnet()`
   dans main.js crie au chargement si l'une d'elles est mal écrite. */
export const presque = {

  /* ── Ce que McCarthy a dit, frotté contre lui-même ───────────────── */
  'dossier-vide|elfe-autopsie':
    'Les deux disent la même chose : ce n’est pas lui. Ça ne dit toujours pas qui.',
  'dossier-vide|teresa':
    'Un dossier qui ne dit rien d’elle, et une fille dont personne n’a parlé depuis trois jours. Deux silences côte à côte ne font pas encore une bouche.',
  'elfe-autopsie|navette-huit-heures':
    'Un elfe l’a étranglée, et c’est un ork qu’on met dans la navette de huit heures. Ces deux-là ne se recoupent pas : l’un remplace l’autre.',
  /* Elle s'écrivait `teresa|elfe-autopsie` — dans le désordre. La clé se
     construit en TRIANT, donc celle-ci n'a jamais rien déclenché : le
     joueur recevait un refus au hasard là où on lui avait écrit une
     réponse. C'est exactement le bug que `verifieCarnet()` guette. */
  'elfe-autopsie|teresa':
    'Un elfe, et une elfe morte. Il manque le nom, et le nom ne viendra pas d’ici.',
  'famille-tir|teresa':
    'La famille et la fille, oui. Mais une famille qui étouffe, ce n’est pas encore une main sur une gorge.',
  'elfe-autopsie|famille-tir':
    'Un elfe a tué, une famille d’elfes veut le silence. C’est la même communauté — ce n’est pas encore la même main.',
  'famille-tir|navette-huit-heures':
    'Le Tír efface, la navette transporte. Entre les deux, il manque quelqu’un qui décroche un téléphone.',

  /* ── Le quai, le goulet, et ce qu’on y a laissé ──────────────────── */
  'grand-blond|travail-inacheve':
    'Le même homme, la même nuit, le même bateau. Deux fiches pour un seul fait : ça ne se recoupe pas, ça se répète.',
  'grand-blond|teresa':
    'Une tête de plus que tout le monde, ça se remarque. Personne ne l’a remarqué près d’elle — il était sur un bateau, pas dans sa chambre.',
  'toralf-vise-lester|travail-inacheve':
    'Deux travaux laissés en plan sur le même gamin. Ça dit qu’on s’y est repris à deux fois. Ça ne dit pas qui compte les fois.',

  /* ── Le greffe, et l’heure qui ne colle pas ──────────────────────── */
  'dossier-vide|registre-anterieur':
    'Un dossier qui ne dit rien, un registre qui dit tout. Deux papiers, deux services, et pas une signature commune.',
  'registre-anterieur|toralf-vise-lester':
    'La ligne était écrite avant, et le tireur était déjà en place. Deux préparatifs — rien qui prouve qu’ils sortent du même bureau.',

  /* ── Lester, et ce qui lui arrive ────────────────────────────────── */
  'lester-temoigne|navette-huit-heures':
    'Il a décidé de parler ; quelqu’un avait décidé qu’il n’arriverait pas. Les deux tiennent debout séparément. Ensemble, il manque le nom de celui qui a décidé en second.',
  'lester-temoigne|toralf-vise-lester':
    'On lui a tiré dessus à minuit, il a dit oui à cinq heures. Ce n’est pas un lien : c’est une nuit.',
  'guilde|lester-temoigne':
    'La bouteille, et sa décision. Oui. Mais ça ne se déduit pas — c’est ce qui s’est passé, et ça n’a besoin d’aucune preuve.',

  /* ── Ce qu’on a déjà déduit, frotté contre le reste ──────────────── */
  'deux-mains|teresa':
    'Deux paires de mains, et une seule morte pour l’instant. La seconde paire n’a pas fini sa nuit.',
  'deux-mains|famille-tir':
    'Une main de colère, une main de tarif. Reste à savoir qui paie la seconde en couvrant la première — et personne ne l’a encore dit à voix haute.',
}
