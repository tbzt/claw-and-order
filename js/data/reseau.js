/* ============================================================
   LE RÉSEAU DE CONTACTS

   Le carnet dit QUOI demander. La carte dit OÙ aller. Le réseau dit
   À QUI demander quand on ne peut plus y aller — les gens qui savent
   quelque chose sont souvent des tableaux en arrière.

   Le geste est celui du carnet, transposé : on pose une fiche sur un
   contact au lieu d'une fiche sur une autre. Même grammaire, le joueur
   la connaît déjà.

   LE CHANTIER 31 avait posé deux contacts seulement, les deux qui
   portent les maillons GARANTIS du scénario (voir
   PLAN_CAPACITES_ET_RESEAU § 5) — valider le geste avant d'en dépendre,
   comme CONCEPTION § 12 demandait pour le carnet et que personne n'a
   fait. LE CHANTIER 32 pose les trois qui manquaient : Hercules est
   « le personnage-réseau » de la fiche (Réseau 4, deux contacts) — il
   porte Elton EN PLUS d'Alicia. Drakk et White_Rabbit reçoivent chacun
   le leur.

   Chaque contact appartient à UN runner : Sarah ne répond qu'à Trash,
   Alicia et Elton qu'à Hercules, Herwick qu'à Drakk, Duke qu'à
   White_Rabbit. Le choix du runner compte donc aussi hors du décor —
   c'est écrit dans le plan, pas une contrainte technique.

   BUG ÉVITÉ EN VÉRIFIANT DANS LE NAVIGATEUR (même famille que celui que
   `reconstruitFiches()` corrige déjà dans main.js) : un appel qui
   CONFIRME une fiche née d'une DÉDUCTION du carnet (`pas-de-proces`,
   `ordre-anterieur`, `deux-plans`, `deux-mains`) ne peut pas se
   contenter d'un `id` — `classe()` ajoute l'identifiant à
   `etat.fiches` sans condition, mais le contenu (`fiches[id]`) ne
   vient QUE d'un `donne`. Sans lui, `rendCarnet()` compte la fiche
   (`if (!fiches[id]) continue`) et ne l'affiche jamais. `donneDe()`
   ci-dessous réutilise le `donne` de la déduction elle-même : le texte
   ne se duplique pas, et les deux chemins (carnet, réseau) posent
   exactement la même fiche. */
import { deductions } from './carnet.js'
const donneDe = (id) => deductions.find((d) => d.donne.id === id).donne

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
  elton: {
    nom: 'Elton Hutchinson',
    titre: 'avocat',
    runner: 'hercules',
    specialite: 'réseau général — la procédure',
  },
  herwick: {
    nom: 'Herwick Strauber',
    titre: 'antiquaire',
    runner: 'drakk',
    specialite: 'la rue',
  },
  duke: {
    nom: 'Duke',
    titre: 'ganger',
    runner: 'rabbit',
    specialite: 'criminel',
  },

  /* ── Cisco — le premier contact qui « s'ajoute » (chantier 4,
     l'abordage) ────────────────────────────────────────────────────
     Les cinq contacts ci-dessus sont là depuis le début de la partie ;
     Cisco ne l'est pas. `requiert` est lu par `rendReseau()` dans
     main.js : sans le drapeau, le contact n'apparaît simplement pas
     dans le panneau — ni verrou visible, ni case grisée, il n'existe
     pas encore. Posé en parlant à la barre pendant l'abordage
     (`retour.js`, dialogue `cisco`), jamais par un objet (G5). */
  cisco: {
    nom: 'Cisco',
    titre: 'passeur, le Sunnyside',
    runner: 'hercules',
    specialite: 'transport, discrétion',
    requiert: 'cisco-contact',
  },

  /* ── Amelia Brown — le second contact qui « s'ajoute » (chantier 28,
     les amis de Teresa) ────────────────────────────────────────────
     `PLAN_CAPACITES_ET_RESEAU.md` § 5 la nommait déjà comme l'un des
     deux contacts suivants (« Amelia Brown (ORC) et Wú Chen (STV) »),
     et `PLAN_TRAME_ACTES_III_IV.md` § 7.3 dit par qui la porte s'ouvre :
     Nita, la chamane de l'Ours, « ouvre la porte vers l'ORC — le contact
     de Trash, la contre-partie de Sarah ». Contre-partie au sens fort :
     Sarah répare des corps, Amelia attaque des dossiers, et les deux
     appartiennent au même runner.

     COMME CISCO, ET POUR LA MÊME RAISON : elle rejoint le réseau EN
     PARLANT (L2), et elle n'a PAS ENCORE D'APPEL. Ce n'est pas un
     oubli — D9 (`PLAN_TRAME_ACTES_III_IV.md` § 3) a tranché que le prix
     d'un appel à l'acte IV est l'EXPOSITION, pas les minutes, et le
     compteur d'exposition n'existe pas. Lui écrire un appel à 15
     minutes maintenant, ce serait facturer la nuit à une enquête qui
     dure des jours — exactement l'horloge qu'il faudrait défaire. */
  amelia: {
    nom: 'Amelia Brown',
    titre: 'permanente de l’ORC',
    runner: 'trash',
    specialite: 'juridique, communautaire',
    requiert: 'orc-contact',
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
      '« Teresa Banks ? Étranglée. Main d’elfe. »',
      '« Pas d’ork là-dedans, à aucun moment. Le légiste ne s’est pas trompé, si c’est ta question. »',
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

  /* ── Elton Hutchinson (Hercules) — la procédure ────────────────────
     Il ne DONNE rien : il confirme, en juriste, deux fiches déjà
     posables ailleurs (la fiche à droite du `id`) à partir d'une fiche
     différente (la clé). Les deux premières sont les deux DÉDUCTIONS du
     carnet, par une voie de secours — exactement le rôle de Sarah pour
     `elfe-autopsie`, transposé à l'avocat qui fait le raisonnement à la
     place du joueur qui ne l'a pas encore fait. */
  'elton|dossier-vide': {
    id: 'pas-de-proces',
    donne: donneDe('pas-de-proces'),
    minutes: 15,
    ligne: [
      '« Hutchinson. Dites-moi que c’est facturable. »',
      '« Un dossier vide ne suffit jamais à lui seul, Pitchford — n’importe quel juge de deuxième année vous le dira. Mais couplé à un transfert déjà verrouillé avant même l’instruction ? Ça, ça a un nom. Ça s’appelle vouloir qu’il n’y ait jamais d’audience. »',
      '« Facturez-moi la minute, je vous ai déjà dit l’essentiel. »',
    ],
    dejaLigne: '« Toujours aussi vide, ce dossier. Et toujours aussi verrouillée, cette navette. Mon avis n’a pas changé depuis la dernière fois. »',
    reaction: '« Un avocat qui te donne la conclusion avant le jury. C’est exactement pour ça que je le paie trop cher. »',
  },
  'elton|registre-anterieur': {
    id: 'ordre-anterieur',
    donne: donneDe('ordre-anterieur'),
    minutes: 15,
    ligne: [
      '« Hutchinson, j’écoute — vite, j’ai un dossier qui brûle. »',
      '« Un registre horodaté avant l’arrestation elle-même ? »',
      '« Ça, Pitchford, ça ne se plaide pas comme une négligence. Ça se plaide comme une préméditation. »',
      '« Trouvez-moi qui a signé ce registre en premier, et j’ai un procès à faire, pas une défense. »',
    ],
    dejaLigne: '« L’horodatage n’a pas changé de sens depuis hier. Toujours antérieur. Toujours accusateur. »',
    reaction: ['« Il appelle ça une préméditation. »',
                '« Moi j’appelle ça un plan B. On verra lequel des deux mots passe au tribunal — ce sera le sien, remarquez, c’est lui qui plaide. »'],
  },
  'elton|navette-huit-heures': {
    id: 'ordre-anterieur',
    donne: donneDe('ordre-anterieur'),
    minutes: 15,
    ligne: [
      '« Hutchinson. »',
      '« Une navette réservée avant que quiconque sache qu’il y aurait un procès ? On appelle ça, dans ma partie, une décision antérieure aux faits censés la justifier. Trouvez-moi la pièce qui prouve QUAND cette réservation a été faite, et vous tenez le dossier entier. »',
      '« C’est le registre du greffe qui porte cette date, en général. Allez le lire avant que quelqu’un pense à le faire disparaître. »',
    ],
    dejaLigne: '« Toujours la même affaire : la navette existait avant le motif de la prendre. »',
    reaction: '« Il a raison. Et il vient de me dire d’aller lire un registre que j’ai peut-être déjà sous le bras. »',
  },
  'elton|teresa': {
    id: 'crime-crapuleux',
    minutes: 15,
    ligne: [
      '« Hutchinson. Un nom, ou je raccroche. »',
      '« Teresa Banks — oui, je connais la version du procureur. Agression de rue, mobile inconnu, dossier classé « crapuleux ». C’est une qualification commode, Pitchford : elle dispense le procureur de trouver un mobile, et la police de chercher un suspect autre que le vôtre. »',
      '« Quelqu’un a choisi ce mot-là. Je ne sais pas qui, et ce n’est pas ma partie. »',
    ],
    dejaLigne: '« La qualification n’a pas bougé. « Crapuleux », toujours. Ça arrange toujours les mêmes gens. »',
    reaction: '« Un mot de procédure, et voilà que toute l’accusation sent le carton-pâte. »',
  },

  /* ── Herwick Strauber (Drakk) — la rue ──────────────────────────────
     C'est L'ANTIQUAIRE NAIN qui lui a mis un jeu de rôle dans les mains
     à seize ans (equipe.js ne le nommait pas — la fiche ne pouvait
     décrire personne d'autre). Il connaît Loveland mieux que la Lone
     Star : ce que la police n'archive pas, la rue s'en souvient. */
  'herwick|teresa': {
    id: 'corps-loveland',
    minutes: 15,
    ligne: [
      '« Strauber Antiquités, on ne rachète rien après minuit. »',
      '« Ah. Toi. »',
      '« Teresa Banks. Le bruit qui court sur mon trottoir, c’est qu’on l’a retrouvée dans un taudis de Loveland. Pas une ruelle — un taudis, avec une adresse et un propriétaire qui ne demande rien à personne. »',
      '« Ce genre d’endroit ne s’improvise pas. »',
      '« Demande-toi qui connaît un taudis vide à Loveland. Ce n’est pas une liste longue. »',
    ],
    dejaLigne: '« Loveland, toujours. Le trottoir n’a pas changé d’avis. »',
    reaction: ['« Un antiquaire qui connaît la carte des taudis mieux que la police. »',
                '« Je ne sais pas si ça doit m’inquiéter. Je note que ça ne m’inquiète pas, et je note que ça devrait. »'],
  },
  'herwick|dossier-vide': {
    id: 'appart-hors-dossier',
    minutes: 15,
    ligne: [
      '« Strauber. »',
      '« Un dossier vide, chez la Lone Star ? Rien d’étonnant. »',
      '« Son appartement n’y figure même pas. Pas une adresse, pas un bail, rien. Cette fille n’avait pas de chez-elle, sur leurs papiers. »',
      '« J’en connais l’adresse depuis plus longtemps qu’eux. »',
      '« Tu veux l’adresse ? Je te la donne. Mais tu ne l’as pas eue de moi. »',
    ],
    dejaLigne: '« Son appartement n’est toujours pas dans leurs papiers. Toujours dans les miens. »',
    reaction: '« Il a l’adresse et eux ne l’ont pas. Je vais éviter de me demander depuis quand. »',
  },
  'herwick|grand-blond': {
    id: 'travail-inacheve',
    minutes: 15,
    ligne: [
      '« Strauber, j’écoute. »',
      '« Un grand blond, monté sur un bateau et reparti à pied par le talus ? »',
      '« Des fils arrachés à la va-vite, compagnon. Personne ne travaille comme ça. »',
      '« Quelqu’un l’a dérangé avant qu’il ait fini. »',
      '« Il reviendra. Ou il enverra quelqu’un. Je ne sais pas lequel des deux est pire. »',
    ],
    dejaLigne: '« Toujours le même homme, toujours le même travail laissé en plan. »',
    reaction: '« Il a raison. Personne ne laisse un chantier à moitié fait sans y repenser. »',
  },
  'herwick|appart-hors-dossier': {
    id: 'lester-loveland',
    minutes: 15,
    ligne: [
      '« Strauber. »',
      '« Cet appartement hors dossier, je le situe très exactement, compagnon : à deux rues d’où dort le gamin qu’on accuse. Loveland n’est pas un quartier si grand qu’on y meure par hasard à deux pâtés de maisons de son propre lit. »',
      '« Deux rues, compagnon. Va voir toi-même, tu marcheras moins de dix minutes. »',
    ],
    dejaLigne: '« Toujours à deux rues. La carte n’a pas changé, elle. »',
    reaction: '« Deux rues. C’est petit, Loveland. Trop petit pour que ce soit un hasard. »',
  },

  /* ── Duke (White_Rabbit) — criminel ────────────────────────────────
     Le milieu sait des choses sur Chimera et Toralf que la Matrice ne
     documente pas. Duke ne nomme jamais le commanditaire final — ça
     reste hors de portée de ce chantier, réservé à l'acte IV. */
  'duke|toralf-vise-lester': {
    id: 'chimera-nous-suit',
    minutes: 15,
    ligne: [
      '« Ouais ? »',
      /* CHANTIER 36 — RACCORD (PLAN_PLANQUES.md § 6) : cette ligne
         nommait « la laverie » en dur, avant que le conseil de la
         traversée puisse envoyer l'équipe ailleurs. Générique depuis
         ce chantier — vrai quelle que soit la planque choisie. */
      '« Un tireur au goulet, hauteur d’épaule, sur le gamin ? J’ai entendu parler d’un contrat comme ça cette semaine — même signature, même style propre, sur un second coup, ailleurs en ville, plus tard dans la nuit. Une seule boîte bosse comme ça dans le coin : Chimera. Sécurité privée, façon polie de dire mercenaires. »',
      '« Si Chimera a mis deux équipes sur le même gamin en une nuit, c’est qu’on paie cher pour qu’il ferme sa bouche. »',
    ],
    dejaLigne: '« Toujours Chimera. Ils n’ont pas changé de crew pour ça. »',
    reaction: '« Duke ne donne pas un nom de boîte à la légère. Si c’est Chimera, c’est Chimera. »',
  },
  'duke|chimera-nous-suit': {
    id: 'deux-plans',
    donne: donneDe('deux-plans'),
    minutes: 15,
    ligne: [
      '« Ouais ? »',
      '« Chimera qui vous colle au train ? Ça ne s’improvise pas en une nuit, ce genre de boîte. Ils ont TOUJOURS un plan de rechange en caisse avant même de savoir s’ils vont en avoir besoin — c’est ce qui les rend chers, et c’est ce qui les rend dangereux. Si le premier coup a raté, le second était déjà payé. »',
      '« Personne n’improvise un sniper la nuit même. Il était réservé. »',
    ],
    dejaLigne: '« Toujours pareil : chez Chimera, le plan B est facturé d’avance. »',
    reaction: '« Payé d’avance. J’aime pas savoir que quelqu’un a budgétisé notre nuit avant nous. »',
  },
  'duke|grand-blond': {
    id: 'deux-mains',
    donne: donneDe('deux-mains'),
    minutes: 15,
    ligne: [
      '« Ouais ? »',
      '« Deux coups, pas un de plus ? C’est pas le même tarif qu’un étranglement. »',
      '« Ceux qui étranglent, c’est de la colère. Ceux qui plantent net, c’est facturé à la prestation. »',
      '« Deux styles, deux factures, deux mecs. »',
      '« Cherche pas un seul commanditaire à ça. Cherche deux clients qui ne se sont peut-être jamais parlé. »',
    ],
    dejaLigne: '« Toujours deux styles, toujours deux factures. Le milieu ne s’est pas trompé. »',
    reaction: '« Deux mecs, deux tarifs. Duke confirme ce que j’avais déjà pensé. Ça fait plaisir, pour une fois. »',
  },
  'duke|lester-temoigne': {
    id: 'toralf-vise-lester',
    minutes: 15,
    ligne: [
      '« Ouais ? »',
      '« Le gamin qui décide de parler ? La nuit même, un tireur au goulet, hauteur d’épaule, exactement sur sa place ? Le milieu en parle déjà, si tu veux savoir — un contrat lancé la même nuit que sa décision, ça sent pas la coïncidence, ça sent la réaction. »',
      '« Quelqu’un a su qu’il allait parler avant même qu’il l’ait dit à voix haute. Demande-toi comment. »',
    ],
    dejaLigne: '« Toujours la même histoire : un tir, la même nuit que sa décision. »',
    reaction: '« Comment est-ce qu’un contrat se déclenche avant même que Lester ouvre la bouche ? Ça, ça me plaît pas du tout. »',
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
  elton: [
    '« Ça, ce n’est pas de la procédure. Rappelez-moi quand ça en redevient. »',
    '« Intéressant, humainement. Inutilisable, juridiquement. »',
  ],
  herwick: [
    '« Je vends des objets, compagnon. Pas des ragots — enfin, pas ceux-là. »',
    '« Ça, je l’ignore. Et sur ce quartier, j’ignore rarement. »',
  ],
  duke: [
    '« Connais pas. Et ce que je connais pas, j’invente pas. »',
    '« C’est pas mon rayon, ça. Mon rayon, c’est plus sale. »',
  ],
  cisco: [
    '« Ça, c’est pas du transport. Rappelle quand t’as un bateau à bouger. »',
    '« Je facture le silence, pas les questions. Trouve-toi quelqu’un d’autre pour celle-là. »',
  ],
  /* Amelia n'a pas encore d'appel qui réponde (voir plus haut, D9), mais
     elle DOIT avoir ses refus : `verifieReseau()` crie au chargement
     pour un contact muet, et il a raison — un contact qu'on peut
     composer et qui ne dit rien est exactement le buzzer que le plan du
     réseau interdit. Elle décroche donc, et elle décline en parlant. */
  amelia: [
    '« Ce n’est pas un dossier, ça. C’est une intuition. Revenez quand quelqu’un l’a signée. »',
    '« On perd neuf fois sur dix, et on les perd sur des pièces solides. Alors imaginez avec celle-là. »',
  ],
}
