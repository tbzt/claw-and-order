/* ============================================================
   LE RÉSEAU DE CONTACTS

   Le carnet dit QUOI demander. La carte dit OÙ aller. Le réseau dit
   À QUI demander quand on ne peut plus y aller — les gens qui savent
   quelque chose sont souvent des tableaux en arrière.

   Le geste est celui du carnet, transposé : on pose une fiche sur un
   contact au lieu d'une fiche sur une autre. Même grammaire, le joueur
   la connaît déjà.

   RÈGLE DU CHANTIER 31 : deux contacts seulement, les deux qui portent
   les maillons GARANTIS du scénario (voir PLAN_CAPACITES_ET_RESEAU § 5) —
   valider le geste avant d'en dépendre, comme CONCEPTION § 12 demandait
   pour le carnet et que personne n'a fait. Les cinq contacts, et ceux
   qui s'ajoutent en parlant, sont le chantier 32.

   Chaque contact appartient à UN runner : Sarah ne répond qu'à Trash,
   Alicia qu'à Hercules. Le choix du runner compte donc aussi hors du
   décor — c'est écrit dans le plan, pas une contrainte technique. */

export const contacts = {
  sarah: {
    nom: 'Sarah Carpenter',
    titre: 'doc des rues',
    runner: 'trash',
    specialite: 'médical',
  },
  alicia: {
    nom: 'Alicia Francetti',
    titre: 'journaliste',
    runner: 'hercules',
    specialite: 'médiatique',
  },
}

/* ── LES APPELS QUI RÉPONDENT ─────────────────────────────────────────
   Clé : `${contact}|${fiche posée}`. `id` est la fiche que l'appel
   donne — si elle existe déjà (`elfe-autopsie`, posée par McCarthy),
   l'appel se contente de la CONFIRMER : c'est la révélation garantie
   du scénario, une seconde voie vers le même fait pour le joueur qui
   aurait manqué la première. Si elle n'existe pas encore (`heure-deces`),
   `donne` la crée, exactement comme une déduction du carnet.

   `ligne` est ce que le contact dit au téléphone — sa voix, jamais un
   refus générique. `reaction` est la phrase du runner qui vient de
   raccrocher : toujours le même, puisqu'un contact n'appartient qu'à
   un seul runner, et qu'appeler exige que ce runner soit actif.
   `dejaLigne` remplace `ligne` si la fiche était déjà connue — plus
   courte, parce que la nouvelle n'est plus le rapport, c'est la
   relation. */
export const appels = {
  'sarah|teresa': {
    id: 'elfe-autopsie',
    minutes: 15,
    ligne: [
      '« Carpenter. Si c’est pas un corps, fais vite. »',
      '« Teresa Banks ? J’ai vu le rapport passer. Étranglée, et c’est une main d’ELFE qui a fait ça — pas d’ork là-dedans, à aucun moment. Le légiste ne s’est pas trompé, si c’est ta question. »',
      '« Mets un ork dans une navette pour ça, et c’est vous qui vous êtes trompés de dossier. »',
    ],
    dejaLigne: '« Toujours étranglée par un elfe, dernière fois que j’ai vérifié. Je t’ai déjà dit ce que je savais, Conall. »',
    reaction: '« Elle ne se trompe jamais sur un corps. Ni sur moi, en général. »',
  },
  'alicia|teresa': {
    id: 'heure-deces',
    donne: {
      titre: 'Vingt-deux heures quatre',
      texte: 'L’heure du décès, avant même que la Lone Star ne la publie. Teresa avait un dîner ce soir-là, à l’autre bout de la ville — rien ne l’attendait sur ce quai.',
      ou: 'Alicia Francetti, au téléphone',
    },
    minutes: 15,
    ligne: [
      '« Francetti. Parlez, j’enregistre par réflexe. »',
      '« Teresa Banks, oui, ça commence à circuler. On tient l’heure avant la Star elle-même : vingt-deux heures quatre. Une source au légiste, ne me demande pas laquelle. »',
      '« Et elle avait un dîner, ce soir-là. À l’autre bout de la ville. Quelqu’un va devoir m’expliquer comment on meurt sur un quai qu’on n’avait aucune raison de visiter. »',
    ],
    dejaLigne: '« Vingt-deux heures quatre, toujours. Et personne n’a encore expliqué le dîner. »',
    reaction: '« Un dîner manqué, c’est le genre de détail qu’un procureur adore. On va devoir le trouver, ce dîner. »',
  },
}

/* ── LES REFUS ─────────────────────────────────────────────────────────
   « Un refus dans la voix du CONTACT, jamais un buzzer » — la leçon du
   carnet (chantier 5), où refrotter une paire résolue tombait sur un
   refus au hasard et trahissait le joueur. Ici la voix change : ce
   n'est plus le runner qui parle, c'est la personne qu'il vient de
   déranger. */
export const refus = {
  sarah: [
    '« J’ai un corps sur la table, là. Reviens avec quelque chose de médical. »',
    '« Ça, c’est pas mon rayon. Essaie un flic, ou un prêtre. »',
  ],
  alicia: [
    '« Rien à publier là-dedans. Rappelle-moi quand t’as un scoop. »',
    '« Je connais déjà cette version. Trouve-m’en une autre. »',
  ],
}
