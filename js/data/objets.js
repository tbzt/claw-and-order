/* Catalogue global. Les objets survivent aux tableaux — ils ne peuvent
   donc pas appartenir à l'un d'eux.

   `icone` désigne une règle `.objet__<icone>` d'engine.css. Une icône par
   objet, jamais partagée : le joueur qui tend « quelque chose » au pêcheur
   doit savoir ce qu'il tend sans avoir à survoler.

   ── LA SACOCHE (chantier 65) ──────────────────────────────────────────
   `ou` et `regarder` sont neufs, et ils sont la moitié du chantier. Un
   objet portait `nom` et `icone` : deux champs, contre les trois d'une
   fiche du carnet — plus l'étal, la table de lecture et le compteur.
   Mesuré avant d'y toucher : sur 181 cibles déclarées, 26 portaient un
   bloc `objets:` (14 %), et 37 des 52 règles écrites n'étaient que du
   texte. L'inventaire n'avait jamais été conçu ; la règle 12 le cite
   comme repoussoir (« un second inventaire, une liste de courses »), et
   personne n'était revenu lui demander ce qu'il faisait là.

   `regarder` a EXACTEMENT la forme d'un `regarder` de cible — `tous` est
   la caméra, la clé d'un runner est sa voix (règle 10). Le panneau le
   résout avec `resousTexte()`, le même que les déductions du carnet. On
   n'écrit une ligne de runner que là où il a quelque chose que les trois
   autres n'ont pas ; partout ailleurs, `tous` suffit.

   `ou` est la provenance, comme sur une fiche. Elle sert au liseré du
   jeton, et elle sert surtout à répondre à « ça, je l'ai eu où ? » deux
   heures après l'avoir ramassé. */
export const objets = {
  contrat: {
    nom: 'Contrat de prestation',
    icone: 'contrat',
    ou: 'McCarthy, au Claw & Order',
    regarder: {
      tous: ['Deux pages dans une police que personne ne lit, et une ligne au milieu : le transfert doit être terminé à dix heures.',
             'La signature de McCarthy est illisible. La vôtre est dessous, et elle ne vaut pas mieux.'],
      hercules: '« Rien sur ce qui se passe si ça tourne mal. Rien non plus sur ce qui se passe si ça se passe bien. »',
      drakk: '« Il est écrit dessus qu’on est prestataires. Pas escorte, pas gardes du corps. Prestataires. »',
    },
  },
  mandat: {
    nom: 'Mandat de transfert',
    icone: 'mandat',
    ou: 'McCarthy, au Claw & Order',
    regarder: {
      tous: 'Un formulaire du Département, tamponné deux fois, avec le nom de Lester Kane et un numéro d’écrou. C’est ce papier-là qui fait sortir un homme d’une cellule.',
      rabbit: '« Le numéro d’écrou est bon. Je l’ai vérifié deux fois, parce que la première fois je n’y croyais pas. »',
    },
  },
  /* LE TROISIÈME FEUILLET. Le scénario source place l'amorce de la
     contre-enquête exactement ici : c'est en ÉTUDIANT le dossier, pendant
     les heures d'attente à la planque, que l'équipe voit que les faits ne
     collent pas. Le jeu donnait le contrat et le mandat, et gardait le
     seul des trois qui raconte quelque chose.
     Voir PLAN_TRAME_ACTES_III_IV § 4. */
  dossier: {
    nom: 'Le dossier de Lester',
    icone: 'dossier',
    ou: 'McCarthy, au Claw & Order',
    regarder: {
      tous: ['Une chemise cartonnée, cornée aux angles, épaisse comme trois doigts. Elle n’était pas dans le contrat.',
             'McCarthy a dit de le lire. Il a aussi dit de ne pas le lire, dans la même phrase.'],
      trash: '« Il a hésité avant de le pousser sur la table. C’est la seule chose qu’il ait faite cette nuit sans savoir pourquoi il la faisait. »',
      drakk: '« C’est lourd, pour un dossier vide. »',
    },
  },
  passe: {
    nom: 'Passe des amarres',
    icone: 'passe',
    ou: 'Sur Wilson, au Sunnyside Beach Park',
    regarder: {
      tous: 'Une carte usée sur les bords, le numéro d’un ponton gravé au dos. Elle était dans la poche intérieure, pas sur le trousseau.',
      hercules: '« Pas avec les autres clés. Celle-là, il la voulait sur lui. »',
      rabbit: '« Bande magnétique, pas de puce. On ne peut pas la suivre, on ne peut pas la couper à distance. C’est vieux, et c’est pour ça que ça marche encore. »',
    },
  },
  creditube: {
    nom: 'Créditube — 2 000 ¥',
    icone: 'tube',
    ou: 'Sur Wilson, au Sunnyside Beach Park',
    regarder: {
      tous: 'Un tube certifié, modèle courant, aucun nom dessus. Deux mille : trop pour une soirée, pas assez pour disparaître.',
      hercules: '« Deux mille, c’est ce qu’on garde sur soi quand on pense avoir à convaincre quelqu’un le soir même. »',
      drakk: '« On l’a pris sur un mort. Je le dis, c’est tout. Je ne dis pas qu’il ne fallait pas. »',
    },
  },
  arme: {
    nom: 'Arme de poing',
    icone: 'arme',
    ou: 'Sur Wilson, au Sunnyside Beach Park',
    regarder: {
      tous: 'Lourde, entretenue, chargeur plein. Wilson ne l’a pas sortie.',
      drakk: '« Il ne l’a pas sortie. Soit il n’a pas eu le temps, soit il n’a pas cru en avoir besoin. »',
      hercules: '« Range ça avant le tribunal. Je le redirai. »',
    },
  },
  /* Chantier 46, le portique. Ce que les quatre fiches portent depuis le
     début de la nuit — pas un ramassage, une donnée de personnage — et
     qu'aucune scène ne matérialisait avant le tribunal. Voir
     PLAN_LE_PORTIQUE.md § 1.
     Chacun appartient à quelqu'un : c'est son propriétaire qui en parle,
     et les autres qui le regardent de côté. */
  epees: {
    nom: 'Les deux épées de Drakk',
    icone: 'epees',
    a: 'drakk',
    ou: 'À Drakk, depuis avant tout ça',
    regarder: {
      tous: 'Deux lames droites dans un harnais de dos, entretenues au point que ça ressemble à une manie.',
      drakk: '« Elles ont un nom chacune. Je ne le dis pas — la dernière fois qu’on me l’a demandé, c’était pour rire. »',
      hercules: '« J’ai arrêté de demander pourquoi il en faut deux. »',
    },
  },
  focus: {
    nom: 'Le focus de maintien de Trash',
    icone: 'focus',
    a: 'trash',
    ou: 'À Trash, depuis avant tout ça',
    regarder: {
      tous: 'Un anneau de métal terne, porté à la main gauche, usé jusqu’à ce qu’on ne distingue plus la gravure.',
      trash: '« Il maintient. C’est tout ce qu’il fait, et c’est déjà rare. »',
      drakk: '« Il le tourne autour de son doigt quand il réfléchit. Il ne sait pas qu’il le fait. »',
    },
  },
  deck: {
    nom: 'Le deck de White_Rabbit',
    icone: 'deck',
    a: 'rabbit',
    ou: 'À White_Rabbit, depuis avant tout ça',
    regarder: {
      tous: 'Un boîtier noir sans marque, deux coins refaits à la main. Le câble d’interface est neuf ; rien d’autre ne l’est.',
      rabbit: ['« Huit ans. Réparé onze fois. La douzième, je le remplace. »',
               '« Je dis ça depuis quatre ans. »'],
    },
  },
  kit: {
    nom: 'Le kit d’effraction d’Hercules',
    icone: 'kit',
    a: 'hercules',
    ou: 'À Hercules, depuis avant tout ça',
    regarder: {
      tous: 'Un étui souple qui se roule à plat. Des outils fins, rangés dans l’ordre où on s’en sert.',
      hercules: '« Ce n’est pas un kit de cambrioleur, c’est un kit de serrurier. La différence, c’est qui t’a demandé d’ouvrir. »',
      trash: '« Il dit “serrurier” à chaque fois. À chaque fois. »',
    },
  },
  /* Ce qui s'achète au Claw & Order. C'est White_Rabbit qui paie —
     décision T5 de TRAME.md : aucun compteur d'argent, une action de
     dialogue, et une réplique qui coûte autre chose que des nuyens. */
  bouteille: {
    nom: 'Bouteille du rang du haut',
    icone: 'bouteille',
    ou: 'Le barman, au Claw & Order',
    regarder: {
      tous: 'Personne ne prend celles du haut. Le barman l’a essuyée par habitude avant de la poser. L’étiquette est en deux langues, dont une qu’il ne parle pas.',
      hercules: '« Une bouteille ouvre plus de portes qu’un pied-de-biche. Moins vite, mais plus longtemps. »',
      rabbit: '« J’ai payé sans regarder. Ne me demandez pas combien. »',
    },
  },
  filtre: {
    nom: 'Filtre d’ORA',
    icone: 'filtre',
    ou: 'Le barman, au Claw & Order',
    regarder: {
      tous: 'Un boîtier plat qui se clipse derrière l’oreille. Matériel de service, numéro de lot gravé, et un nom gratté au canif.',
      rabbit: ['« Il coupe la pub, les balises commerciales, les enseignes. Ce qui reste allumé, c’est ce que la Star a marqué elle-même. »',
               '« La moitié de la salle s’est éteinte. L’autre moitié m’a regardé. »'],
      hercules: '« Un flic l’a laissé en gage et n’est jamais revenu. Il y a une histoire là-dedans, et elle finit mal. »',
    },
  },
}
