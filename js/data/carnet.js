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

  /* ── L'abordage, chantier de rang 4 ───────────────────────────────
     Vraie quel que soit ce qu'on en a fait au goulet : c'est la
     TENTATIVE elle-même qui est le fait, pas son issue. */
  'abordage-repousse': {
    titre: 'Ils ont retenté, en groupe',
    texte: 'Un second bateau a suivi le vôtre depuis McNeil, tous feux éteints, jusqu’au goulet. Personne n’a tiré cette fois. Ils voulaient monter à bord, pas tirer de loin.',
    ou: 'Le goulet, à l’abordage',
  },

  'chimera-nous-suit': {
    titre: 'Ils savaient où on était',
    texte: 'Une laverie choisie au hasard à six heures du matin, et un tir à travers la baie à huit heures quarante. Personne ne nous a suivis depuis Tacoma — quelqu’un nous a trouvés autrement.',
    ou: 'La laverie, à huit heures quarante',
  },

  'lester-loveland': {
    titre: 'Elle n’avait rien à faire là',
    texte: 'Le taudis où on a trouvé le corps est dans la rue de Lester. C’est un endroit où personne ne va — il le sait, il y vivait. Personne ne lui a posé la question en trois jours.',
    ou: 'Lester, à la planque',
  },

  'lester-temoigne': {
    titre: 'Il a décidé de parler',
    texte: '« Je vais leur dire. Pas ce qu’ils veulent entendre — ce qui s’est passé. » Personne ne l’a acheté, personne ne l’a convaincu. On l’a écouté trois heures, à l’abri.',
    ou: 'La planque, à l’aube',
  },

  /* ── Ce qu'on lit dans le dossier, à la planque ───────────────────
     Le scénario source place ici l'amorce de la contre-enquête : c'est
     en ÉTUDIANT le dossier que l'équipe voit que les faits ne collent
     pas. Ces trois fiches sont les trois trous du dossier, et chacune
     pointe une des trois ancres de l'acte IV — sans qu'aucune ne le
     dise, parce que ce n'est pas au dossier de le dire. */
  'corps-loveland': {
    titre: 'Le corps était à Loveland',
    texte: 'Retrouvé dans un taudis, à deux rues de là où Lester dormait. Toute la géographie de l’accusation tient dans cette distance-là.',
    ou: 'Le dossier, à la planque',
  },
  'crime-crapuleux': {
    titre: 'Un crime sans mobile',
    texte: 'L’accusation a décrété une agression de rue : elle aurait erré là par hasard. C’est commode — ça ne supprime pas le mobile, ça supprime la question du mobile.',
    ou: 'Le dossier, à la planque',
  },
  'appart-hors-dossier': {
    titre: 'Son appartement n’est pas au dossier',
    texte: 'Pas une photo, pas un relevé, pas une ligne. Officiellement, ce n’est pas le lieu du crime — donc officiellement, il n’y a rien à y voir.',
    ou: 'Le dossier, à la planque',
  },

  /* ── La planque de Drakk, chantier 36 ─────────────────────────────
     Le pendant, chez Herwick, de ce que `chimera-nous-suit` dit à la
     laverie : le même fait — on ne vous a pas suivis, on vous a
     trouvés — mais une fiche à part, parce que les deux scènes ne se
     visitent jamais dans la même partie et que le texte de l'une
     nommait « la laverie » au mot près. */
  'tir-herwick': {
    titre: 'Ils ont su, jusque dans l’arrière-boutique',
    texte: 'Un rideau de fer, une adresse que personne n’avait notée nulle part, et un tir à huit heures quarante quand même. Personne ne vous a suivis depuis Tacoma — quelqu’un vous a trouvés autrement.',
    ou: 'Chez Herwick, à huit heures quarante',
  },
  /* Le trou du dossier, comblé à voix humaine et pas au téléphone
     (`herwick|dossier-vide` ne donne que l'ABSENCE de l'adresse ;
     celle-ci est l'adresse elle-même — PLAN_PLANQUES.md § 3.2). */
  'appart-teresa': {
    titre: 'L’appartement que personne n’a versé au dossier',
    texte: 'Un studio au-dessus d’un pressing, à Loveland, loué cash depuis huit mois à un nom qui n’est pas le sien. Herwick le situe au mètre près — il ne le doit à aucun registre, seulement à quarante ans à savoir qui vit où sur son trottoir.',
    ou: 'Herwick Strauber, à l’arrière-boutique',
  },

  /* Sarah, depuis le chantier 39, est une halte et non plus une
     planque (`PLAN_PLANQUES.md` § 3.6) : il n'y a plus de tir dans son
     cabinet, donc plus de fiche `tir-sarah` — seule `teresa-cliente`
     survit de ce décor. Sarah est la seule personne du jeu qui puisse
     dire cette confidence, parce qu'elle est la seule à avoir soigné
     Teresa de son vivant. */
  'teresa-cliente': {
    titre: 'Elle est déjà venue ici',
    texte: 'Deux fois, cet automne. Elle voulait savoir comment on disparaît proprement — des papiers, un nom qu’on ne peut pas retracer. Sarah n’a pas pu l’aider, et n’a jamais su de qui elle se cachait.',
    ou: 'Sarah Carpenter, au cabinet',
  },

  /* ── Le sous-sol de Duke, chantier 37 ─────────────────────────────
     Même famille que `tir-herwick` — un tir qui trouve la planque
     malgré tout — mais un mode d'attaque différent (« pas de ligne de
     tir… alors quelqu'un entre », PLAN_PLANQUES.md § 3.4). */
  'tir-duke': {
    titre: 'Ils ont su, jusque dans le sous-sol',
    texte: 'Un escalier, une adresse que personne n’avait notée nulle part, et quelqu’un qui tente d’entrer à huit heures quarante quand même. Personne ne vous a suivis depuis Tacoma — quelqu’un vous a trouvés autrement.',
    ou: 'Chez Duke, à huit heures quarante',
  },
  /* Le prix qui se paie avant (garde-fou § 4.3 du plan) : Toralf nommé,
     et le fil qui remonte à Telestrian — le même nom que porte déjà la
     fiche `teresa` (chantier 1, au bar), pas une coïncidence. */
  'duke-toralf': {
    titre: 'Il a un nom : Toralf',
    texte: 'Un tireur scandinave, déjà reparti au nord — inutile de le chercher. Payé par un compte qui remonte à une famille corpo. Telestrian, si le nom dit quelque chose.',
    ou: 'Duke, au sous-sol',
  },

  /* ── La loge de Trash, chantier 40 ─────────────────────────────────
     Même famille que `tir-herwick`/`tir-duke` — un tir qui trouve la
     planque malgré tout — mais un mode d'attaque différent (« pas de
     ligne de tir, un préavis », PLAN_PLANQUES.md § 3.4). */
  'tir-squat': {
    titre: 'Ils ont su, jusque dans la loge',
    texte: 'Une trappe sans adresse, un branchement volé, et quelqu’un qui force quand même le passage à huit heures quarante. Personne ne vous a suivis depuis Tacoma — quelqu’un vous a trouvés autrement.',
    ou: 'Chez Trash, à huit heures quarante',
  },
  /* Le gain propre à ce décor (garde-fou § 4.3 du plan) : pas une
     adresse ni un nom de tireur, comme chez Herwick ou Duke — une
     capacité de l'adversaire, révélée parce que Trash est le seul à
     pouvoir la lire. */
  'trash-repere': {
    titre: 'Ils l’ont retrouvé par sa propre lumière',
    texte: 'Aucun registre, aucune adresse — ils ont suivi ce qui restait de lui à l’astral, du bateau jusqu’au greffe. Chimera a quelqu’un qui voit comme Trash, ou pire.',
    ou: 'Trash, à la loge',
  },

  /* ── Le tripot d'Hercules, chantier 41 ─────────────────────────────
     Même famille que `tir-herwick`/`tir-duke`/`tir-squat` — un tir qui
     trouve la planque malgré tout — mais un troisième mode d'attaque
     (« on n'entre pas de force, on achète une place à la table »,
     PLAN_PLANQUES.md § 3.5). */
  'tir-tripot': {
    titre: 'Ils ont su, jusque dans le tripot',
    texte: 'Une porte sans enseigne, une adresse que personne n’avait notée nulle part, et quelqu’un déjà assis à la table qui passe à l’action à huit heures quarante quand même. Personne ne vous a suivis depuis Tacoma — quelqu’un vous a trouvés autrement.',
    ou: 'Au tripot, à huit heures quarante',
  },
  /* Le gain propre à ce décor (garde-fou § 4.3 du plan) : pas une
     adresse ni un nom de tireur, comme chez Herwick ou Duke — la manière
     dont Chimera opère, révélée par le seul homme du jeu qui a été payé
     pour regarder ailleurs. */
  'tripot-embauche': {
    titre: 'Il paie cash, et jamais deux fois le même visage',
    texte: 'Un professionnel, pas un habitué — payé à l’avance pour qu’on regarde ailleurs. Ce n’est pas un nom. C’est une méthode, et elle dit qu’il y en a plus d’un sur ce contrat.',
    ou: 'Le Patron, au tripot',
  },

  /* ── LES AMIS DE TERESA, chantier 28 — l'acte IV s'ouvre ──────────
     `PLAN_TRAME_ACTES_III_IV.md` § 7.1 : les quatre choses que ce lieu
     doit rendre. Trois d'entre elles ne servent à rien seules — c'est
     voulu : ce tableau ne donne pas une réponse, il donne les deux
     moitiés d'un nom et deux fils qui partent ailleurs (le studio de
     Waters, les runners du Tír).

     `prenom-mal-ecrit` et `gros-ponte-telestrian` sont la PAIRE de la
     déduction `hayden`. Elles viennent de deux personnes différentes,
     qui ne s'ouvrent pas de la même façon : le nom ne tombe donc jamais
     d'une seule conversation, et jamais d'un seul geste. */
  'prenom-mal-ecrit': {
    titre: 'Un prénom, écrit à l’oreille',
    texte: 'HAIDEN, au dos d’un flyer, de la main de Teresa. Elle l’avait entendu, jamais lu — les deux fautes le prouvent. Mark a gardé le flyer sans jamais le montrer à personne.',
    ou: 'Mark, au local de répétition',
  },
  'gros-ponte-telestrian': {
    titre: 'Un gros ponte chez Telestrian',
    texte: 'Elle voyait quelqu’un de la maison Telestrian, assez haut placé pour qu’elle n’en dise jamais le nom de famille. Nita le tient d’elle, un soir, et n’a rien pu en faire depuis.',
    ou: 'Nita, au local de répétition',
  },
  'enregistrement-waters': {
    titre: 'Il existe un enregistrement',
    texte: 'Quatre titres, mis en boîte chez Reginald Waters, un studio de Puyallup. Elle y a parlé entre deux prises, et Waters garde tout — les prises ratées comprises.',
    ou: 'Psych, au local de répétition',
  },
  'elfes-du-tir': {
    titre: 'Ils sont passés avant vous',
    texte: 'Trois elfes, polis, deux jours plus tôt. Ils ont posé exactement les mêmes questions que vous, et ils ont laissé une carte de visite — le genre de geste qu’on fait quand on compte revenir.',
    ou: 'Nova, au local de répétition',
  },

  /* ── L'APPARTEMENT DE TERESA, chantier 26 — la première ancre ──────
     `PLAN_TRAME_ACTES_III_IV.md` § 7.1. Le scénario source est net :
     « c'est le VRAI lieu du crime ; la Lone Star a relevé l'ADN et ne
     l'a jamais versé au dossier ». Ces fiches ne disent pas qu'elle est
     morte là — elles disent que LA STAR LE SAIT, ce qui est une autre
     affaire, et beaucoup plus lourde.

     `draps-emportes` et `maglock-journal` sont la paire de
     `lester-innocent`. Comme pour `hayden` au local, elles viennent du
     même tableau par deux chemins différents : un constat que n'importe
     qui peut faire, et une intrusion que White_Rabbit seule peut mener
     — et qui coûte une trace. */
  'rubans-intacts': {
    titre: 'Personne n’est repassé',
    texte: 'Les scellés de RA portent leur horodatage de pose et pas une seule rupture depuis. Trois jours, et aucun enquêteur n’a rouvert cette porte. On ne ferme pas une scène de crime le jour où on la trouve — sauf quand on a déjà décidé de ce qu’on écrirait dedans.',
    ou: 'L’appartement de Teresa',
  },
  'draps-emportes': {
    titre: 'Ils ont relevé, et ils n’ont rien versé',
    texte: 'Le lit est nu et la poudre à empreintes est encore sur la tête de lit. La Lone Star a fait un relevé complet dans un appartement qui, officiellement, n’est pas le lieu du crime. Le rapport existe. Il n’est pas au dossier de Lester.',
    ou: 'L’appartement de Teresa',
  },
  'affaires-homme': {
    titre: 'Il vivait ici à moitié',
    texte: 'Un rasoir en acier massif qui vaut plus cher que la pièce, une seconde brosse à dents, et six gélules blanches dans un flacon sans étiquette. Il ne dormait pas là : il s’y rasait, et il s’y préparait à être brillant ailleurs.',
    ou: 'L’appartement de Teresa',
  },
  'valise-faite': {
    titre: 'Elle partait',
    texte: 'Une valise cabine à moitié faite sous le lit, les vêtements pliés et pas jetés, la trousse déjà fermée. Rien de sentimental dedans, pas une photo. Ce n’était pas un voyage : c’était un départ, et il avait une date.',
    ou: 'L’appartement de Teresa',
  },
  'maglock-journal': {
    titre: 'Deux portes ouvertes après sa mort',
    texte: '22:04, elle rentre — la dernière fois. 22:51, une seconde ouverture, un autre porteur. 23:58, une troisième. Et les deux ressortent à 00:26, à une minute d’intervalle. C’est archivé en clair chez le prestataire de serrures de l’immeuble, et personne n’était allé le chercher.',
    ou: 'Puyallup Lockworks, contrat 4471-B',
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

  /* ── LA DÉDUCTION DE L'ACTE IV — chantier 28 ──────────────────────
     La troisième des trois que `carnet.js` réservait aux trois ancres
     (D5, `PLAN_TRAME_ACTES_III_IV.md` § 7.1). Elle est la seule du jeu
     dont les deux fiches viennent du MÊME tableau et de deux personnes
     différentes : c'est la forme que prend « quatre serrures qui ne
     sont pas des serrures » une fois traduite en mécanique — deux
     conversations gagnées séparément, et le carnet fait le reste.

     Elle ne nomme pas un coupable : elle nomme un HOMME. Ce qu'il a
     fait reste à prouver, et c'est le travail des deux autres ancres
     (l'appartement, le Shameless) — règle 12, une déduction ouvre la
     parole, jamais une porte. */
  {
    paire: ['gros-ponte-telestrian', 'prenom-mal-ecrit'],
    donne: {
      id: 'hayden',
      titre: 'Hayden Telestrian',
      texte: 'Un prénom écrit à l’oreille par quelqu’un qui ne l’avait jamais vu écrit, et un nom de famille que tout le Tír connaît. Posés l’un sur l’autre, ils font un homme — et cet homme est de la maison qui paie les elfes polis qui posent des questions à Loveland.',
      ou: 'Recoupement',
    },
    dit: {
      tous: 'Deux moitiés de nom, et personne dans cette pièce ne les avait jamais mises côte à côte.',
      hercules: '« Haiden. Hayden. Elle l’a écrit comme elle l’entendait. Voilà pourquoi personne ne l’a jamais trouvé : il n’était mal orthographié que sur le seul papier qui le portait. »',
      trash: '« Je connais cette famille. Pas cet homme — la famille. Et je sais exactement ce qu’elle fait de ce qui la gêne, parce que la mienne faisait pareil. »',
      rabbit: '« Une faute de frappe a protégé un homme pendant trois jours. Aucun chiffrement au monde n’a jamais fait aussi bien. »',
      drakk: '« Nous avions le nom depuis le début. Il était écrit dans la mauvaise langue, voilà tout. »',
    },
  },

  /* ── LA DEUXIÈME DÉDUCTION DE L'ACTE IV — chantier 26 ─────────────
     Elle ne prouve pas que Lester n'a rien fait : elle prouve que la
     Lone Star a de quoi le savoir depuis le premier jour, et qu'elle a
     rangé ce qu'il fallait pour ne pas le savoir. C'est la différence
     entre une erreur judiciaire et ce que ce jeu raconte, et c'est pour
     ça que la fiche s'appelle `lester-innocent` sans jamais parler de
     Lester : les deux pièces parlent d'EUX. */
  {
    paire: ['draps-emportes', 'maglock-journal'],
    donne: {
      id: 'lester-innocent',
      titre: 'Ils savent depuis le premier jour',
      texte: 'Ils ont relevé l’ADN sur des draps qu’ils ont emportés d’un appartement dont ils n’ont jamais versé l’existence, et il existe un journal en clair où deux hommes entrent chez elle après sa mort et ressortent ensemble. Aucune des deux pièces n’accuse Lester. Ensemble, elles disent qu’on a construit un dossier autour d’un homme qu’on savait innocent.',
      ou: 'Recoupement',
    },
    dit: {
      tous: 'Les deux fiches tiennent debout séparément. Posées l’une sur l’autre, elles cessent de parler de Teresa.',
      hercules: '« Ce n’est pas un dossier bâclé. Un dossier bâclé, ça manque de pièces. Celui-là a les pièces et les a rangées ailleurs. Ça s’appelle autrement. »',
      trash: '« Ils ont su avant nous, avant lui, avant tout le monde. Et ils ont mis un gamin de vingt ans dans une navette. »',
      rabbit: '« Deux relevés, un journal, trois jours. La preuve de son innocence était consultable par n’importe qui, moyennant un numéro de contrat à quatre chiffres. »',
      drakk: '« Ils n’ont pas manqué le coupable. Ils ont choisi un autre nom, et ils l’ont écrit à la place. »',
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

  /* ── Le dossier, et les trous qu'on y voit ────────────────────────
     LE CROCHET DE L'ACTE IV. La première de ces paires est la plus
     importante du jeu : elle dit exactement ce qu'il faut aller faire,
     et pourquoi ça ne se fera pas dans ces pages. Un `presque` était le
     bon outil — une déduction aurait donné une réponse là où le joueur
     doit rester avec une question. */
  'appart-hors-dossier|corps-loveland':
    'Un corps à Loveland, et un appartement que personne n’a versé au dossier. Il manque le trajet entre les deux, et il ne se trouvera pas dans ces pages.',
  'corps-loveland|crime-crapuleux':
    'On n’a pas cherché où elle est morte : on a trouvé où elle a été posée, et on a écrit le reste autour. Ça se sent. Ça ne se prouve pas d’ici.',
  'crime-crapuleux|teresa':
    'Une agression de rue sur une fille dont personne n’a parlé pendant trois jours. Les deux se tiennent chaud, et aucune des deux ne tient debout seule.',
  'appart-hors-dossier|elfe-autopsie':
    'Ils ont relevé assez pour dire qu’un elfe l’a touchée. Et ils n’ont pas versé l’endroit où ils l’ont relevé. Ce n’est pas une négligence, c’est une économie.',
  'corps-loveland|dossier-vide':
    'Le dossier ne dit rien de lui, sauf qu’il habitait à côté. C’est tout ce qu’il dit, et c’est tout ce qu’on a retenu contre lui.',
  /* ── Ce que le tir de neuf heures rouvre ─────────────────────────── */
  'chimera-nous-suit|toralf-vise-lester':
    'Le goulet, puis la laverie. Le même homme, ou le même employeur — ça ne se décide pas avec deux tirs. Ça se décide en trouvant qui paie.',
  'chimera-nous-suit|navette-huit-heures':
    'La navette, le goulet, la laverie. Trois fois, et à chaque fois plus salement. Quelqu’un a de moins en moins le temps.',
  'chimera-nous-suit|grand-blond':
    'Un grand type blond au port, et un toit à deux kilomètres ce matin. Le même métier, sûrement. La même main, on n’en sait rien.',
  'chimera-nous-suit|travail-inacheve':
    'Il n’a pas fini au port, il n’a pas fini ici. C’est presque rassurant, et ce n’est pas une preuve.',
  'corps-loveland|lester-loveland':
    'Le dossier dit où était le corps ; Lester dit que personne n’y va jamais. Les deux disent la même chose sous deux angles — il manque encore celui qui l’y a portée.',
  'crime-crapuleux|lester-loveland':
    'On l’a dite en promenade dans une rue où personne ne se promène. Ça ne tient pas. Ça ne tombe pas non plus : il faudrait quelqu’un pour dire où elle était vraiment.',
  'appart-hors-dossier|navette-huit-heures':
    'On ne verse pas le lieu du crime, et on réserve la navette. Ce sont deux services différents, et ils vont exactement dans le même sens.',

  /* ── La planque de Drakk, chantier 36 ─────────────────────────────
     Le pendant, chez Herwick, des paires que `chimera-nous-suit` forme
     à la laverie : même famille de faits, fiche différente. */
  'tir-herwick|toralf-vise-lester':
    'Le goulet, puis l’arrière-boutique. Le même employeur, sans doute — ça ne se prouve pas avec deux tirs. Ça se prouve en trouvant qui paie.',
  'appart-teresa|corps-loveland':
    'Un corps posé à Loveland, et un studio loué cash à deux rues de là. Il manque encore qui l’a menée du second au premier.',

  /* Sarah est une halte depuis le chantier 39 : plus de tir dans son
     cabinet, donc plus de paire `tir-sarah|toralf-vise-lester`. Celle-ci
     survit — `teresa-cliente` n'a jamais dépendu du tir. */
  'famille-tir|teresa-cliente':
    'Elle cherchait à disparaître, et sa famille voulait la faire taire. Ce n’est peut-être pas la même chose qu’elle fuyait. Ça se recoupe, ça ne se prouve pas encore.',

  /* ── Le sous-sol de Duke, chantier 37 ─────────────────────────────
     Même famille que les paires ci-dessus, dans le quatrième et
     dernier décor à porter le tir de 8 h 40 — sauf que celui-ci n'est
     pas de Toralf (un tireur, pas un homme qui force une porte), d'où
     la paire avec `chimera-nous-suit` plutôt qu'avec `toralf-vise-lester`. */
  'chimera-nous-suit|tir-duke':
    'La laverie, puis le sous-sol. Le même employeur, sans doute — mais pas la même main : celui qui force une porte n’est pas celui qui tire de loin. Chimera a plus d’un homme sur ce contrat.',
  'duke-toralf|teresa':
    'Un tireur payé par un compte Telestrian, et une victime au SIN Telestrian. Le même nom, deux fois, dans la même nuit. Ça ne se décide pas avec deux faits. Ça commence à devenir difficile à ignorer.',
  'duke-toralf|toralf-vise-lester':
    'Le tireur du goulet, et celui que Duke vient de nommer. Le même homme, sans doute — ça se prouve en trouvant qui paie, et Duke vient de le dire : Telestrian.',

  /* ── La loge de Trash, chantier 40 ─────────────────────────────── */
  'famille-tir|trash-repere':
    'La même vulnérabilité, deux fois dans la même nuit : ce qui l’a fait fuir sa famille est aussi ce qui vient de le trahir. On ne se cache jamais de ce qu’on est, seulement de ceux qui le cherchent.',

  /* ── Le tripot d'Hercules, chantier 41 ─────────────────────────────
     Pas de paire avec `chimera-nous-suit` ni `tir-herwick`/`tir-duke`/
     `tir-squat` : ces fiches viennent chacune d'une planque différente,
     et une seule se visite par partie (`decisionPrise`, `retour.js`) —
     les recouper serait une paire morte, comme `chimera-nous-suit|tir-
     duke` l'est déjà depuis le chantier 37 (jamais joignable en jeu,
     trouvé en écrivant celle-ci, hors du périmètre de ce chantier). Les
     deux paires ci-dessous recoupent `tripot-embauche` avec des fiches
     universelles (le goulet, le bar), atteignables quel que soit le
     choix de planque. */
  'toralf-vise-lester|tripot-embauche':
    'Un tireur au goulet, un homme assis à une table de jeu. Deux méthodes différentes, engagées de la même façon — cash, à l’avance. Chimera n’a pas un contrat. Il a un budget.',
  'teresa|tripot-embauche':
    'Une victime au SIN Telestrian, et un homme payé pour ne jamais laisser de visage derrière lui. Ça se recoupe. Ça ne nomme toujours personne.',

  /* ── Les amis de Teresa, chantier 28 ──────────────────────────────
     Le local de répétition rend quatre fiches, et la paire qui NOMME
     (`gros-ponte-telestrian|prenom-mal-ecrit`) est une déduction, pas
     un presque — elle est plus haut. Ce qui suit, ce sont les six
     autres frottements que le joueur a une bonne raison d'essayer en
     sortant de ce tableau, et qui doivent lui dire qu'il n'a pas tort,
     seulement pas encore assez. */
  'elfes-du-tir|famille-tir':
    'Une famille qui étouffe ce qui la gêne, et trois elfes polis qui remontent la piste avant vous. C’est cohérent au point d’en être évident — et ça ne dit toujours pas ce qu’ils cherchent, eux.',
  'elfes-du-tir|enregistrement-waters':
    'Ils sont passés poser des questions, et il existe quelque part quatre titres où elle parle entre deux prises. Ils ne cherchent peut-être pas un coupable. Il faudrait entendre la bande pour le savoir.',
  'enregistrement-waters|gros-ponte-telestrian':
    'Elle voyait un homme de la maison, et elle a passé des heures dans un studio à parler entre deux prises. Ce qui manque n’est pas un lien : c’est la bande elle-même.',
  'elfe-autopsie|prenom-mal-ecrit':
    'Un elfe l’a touchée en dernier, et elle avait noté un prénom au dos d’un flyer. Un prénom n’est pas une main. Il lui manque un nom de famille pour le devenir.',
  'appart-teresa|gros-ponte-telestrian':
    'Un studio loué cash sous un nom qui n’est pas le sien, et quelqu’un d’assez haut placé pour qu’elle n’en dise jamais le nom. Elle ne se cachait pas de lui : elle se cachait AVEC lui.',
  'prenom-mal-ecrit|teresa':
    'Elle est morte étranglée, et elle avait gardé un prénom au dos d’un papier. Les deux sont vrais. Il manque tout le reste.',

  /* ── L'appartement de Teresa, chantier 26 ─────────────────────────
     La paire qui PROUVE (`draps-emportes|maglock-journal`) est une
     déduction, plus haut. Celles-ci sont les frottements que le joueur
     a une bonne raison d'essayer en ressortant du studio — et deux
     d'entre elles raccordent enfin des fiches qui dormaient depuis la
     nuit du contrat. */
  'appart-hors-dossier|rubans-intacts':
    'Rien au dossier, et personne qui repasse. Les deux racontent le même désintérêt, et le désintérêt n’est pas une preuve — c’est ce qu’on invoque quand on n’en a pas.',
  'corps-loveland|maglock-journal':
    'Elle est sortie de chez elle à 00:26, portée par deux hommes, et on l’a retrouvée à deux rues. Le trajet manquant du dossier est là. Il manque encore leurs noms.',
  'draps-emportes|elfe-autopsie':
    'Une main d’elfe sur sa gorge, et un relevé complet fait puis enterré. S’ils ont l’ADN, ils ont le nom. S’ils ont le nom et qu’ils poursuivent un ork, ce n’est plus une enquête.',
  'affaires-homme|gros-ponte-telestrian':
    'Un rasoir qu’on ne s’achète pas, des stimulants sans étiquette, et un homme de la maison Telestrian assez haut placé pour n’avoir jamais de nom de famille. Ce sont les mêmes affaires. Ça ne fait toujours pas une main sur une gorge.',
  'teresa-cliente|valise-faite':
    'Elle demandait à une doc des rues comment on disparaît proprement, et sa valise était aux trois quarts faite. Elle n’a pas été surprise par sa mort : elle a été rattrapée par son départ.',
  'hayden|valise-faite':
    'Elle partait, et il le savait peut-être. Ce serait un mobile — ce n’est pour l’instant qu’une chronologie, et une chronologie ne condamne personne.',
  'rubans-intacts|tir-herwick':
    'Ils n’ont pas remis les pieds chez elle en trois jours, et ils vous ont trouvés en une nuit. Ce ne sont pas les mêmes gens qui cherchent, ou ce ne sont pas les mêmes ordres.',
  'maglock-journal|toralf-vise-lester':
    'Deux hommes chez elle après minuit, un tireur au goulet trois jours plus tard. Le second a été payé ; les deux premiers avaient une clé. Ce n’est pas le même métier.',

  /* ── Ce qu’on a déjà déduit, frotté contre le reste ──────────────── */
  'deux-mains|teresa':
    'Deux paires de mains, et une seule morte pour l’instant. La seconde paire n’a pas fini sa nuit.',
  'deux-mains|famille-tir':
    'Une main de colère, une main de tarif. Reste à savoir qui paie la seconde en couvrant la première — et personne ne l’a encore dit à voix haute.',
}
