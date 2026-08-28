/* Résolution d'une interaction : (verbe ou objet) × cible → réaction.
   Une règle de scène peut rendre une chaîne, un tableau de lignes, ou un
   objet complet { texte, qui, flags, objets, retire, visuels, dialogue, fin }. */

import { etat, contexte } from './state.js'
import { equipe, pnj } from './data/equipe.js'

/* RÈGLE 11 — Chaque refus se dit dans la voix du runner actif.
   Jamais une ligne générique : le catalogue de répliques d'Anarchy est
   exactement le stock dans lequel piocher, et il est déjà écrit sur la
   fiche de chaque prétiré. C'est ce qui fait qu'un personnage existe
   entre deux scènes de dialogue.

   Un refus est donc dit PAR quelqu'un — il part dans la bulle du runner
   (`qui`), pas dans celle du récit. Le joueur qui bascule de runner sur
   une cible morte entend quatre voix différentes : c'est la manière la
   moins chère d'enseigner que le bouton change quelque chose. */

const pioche = (liste) => liste[Math.floor(Math.random() * liste.length)]

/* ── QUI DIT CETTE LIGNE-LÀ ───────────────────────────────────────────
   Avant, une réaction entière était dite par UN locuteur : `dedouble()`
   aplatissait `tous` et la ligne du runner dans le même tableau de
   chaînes, et la file en héritait d'un seul `qui`. La ligne d'un runner
   partait donc dans la bulle du RÉCIT, et seuls les guillemets disaient
   qu'elle était de quelqu'un.

   Chaque ligne porte maintenant son locuteur. C'est ce qui permet la
   couleur par voix, le portrait qui suit la parole, et surtout les
   runners qui SE COUPENT LA PAROLE dans une même réaction.

   Deux écritures, dans n'importe quel tableau de lignes :
       'du texte'             → dit par le locuteur par défaut du bloc
                                (`recit` pour `tous`, le runner pour sa clé)
       ['drakk', 'du texte']  → dit PAR Drakk, où qu'on l'écrive

   La paire se reconnaît à son premier élément : un identifiant de
   locuteur connu. Aucune réplique ne commence par « drakk » ou
   « mccarthy » en minuscules, donc l'ambiguïté n'existe pas. */

const LOCUTEURS = new Set([...Object.keys(equipe), ...Object.keys(pnj), 'recit', 'barman'])

const estPaire = (v) =>
  Array.isArray(v) && v.length === 2 &&
  typeof v[0] === 'string' && LOCUTEURS.has(v[0]) && typeof v[1] === 'string'

/* Une ligne écrite en toutes lettres. `qui` est facultatif — sans lui,
   la ligne prend le locuteur par défaut du bloc, ce qui permet d'écrire
   une ligne de RÉCIT qui porte autre chose que du texte :

       { texte: 'Un claquement sec.', visuel: ['tir', 'impact-rouf'] }

   `visuel` est marqué au moment où la ligne s'affiche, pas au moment où
   la réaction est résolue. C'est toute la différence entre un décor qui
   a déjà changé quand on lit la phrase, et un décor qui change AVEC
   elle. Voir `suivante()` dans main.js. */
const estLigne = (v) =>
  v !== null && typeof v === 'object' && !Array.isArray(v) && 'texte' in v

function uneLigne(v, parDefaut) {
  if (estLigne(v)) return 'qui' in v ? v : { ...v, qui: parDefaut }
  if (estPaire(v)) return { qui: v[0], texte: v[1] }
  return { qui: parDefaut, texte: v }
}

/* Normalise n'importe quelle écriture de contenu en lignes attribuées. */
export function enLignes(v, parDefaut = 'recit') {
  if (v === undefined || v === null) return []
  if (typeof v === 'string' || estPaire(v) || estLigne(v)) return [uneLigne(v, parDefaut)]
  return (Array.isArray(v) ? v : [v]).map((x) => uneLigne(x, parDefaut))
}

/* Dernier recours si un runner inconnu devient actif — le moteur ne doit
   jamais rester muet, même mal configuré. */
const SECOURS = 'Non.'

function refuse(genre) {
  const fiche = equipe[etat.actif]
  const stock = fiche?.refus?.[genre]
  if (!stock?.length) return { texte: enLignes(SECOURS) }
  return { texte: enLignes(pioche(stock), etat.actif) }
}

/* Règle 10 en pratique : une réaction peut porter une clé `tous` — la
   description partagée, c'est la caméra — et une clé par runner. Le
   runner actif ajoute SA ligne derrière, dans sa voix. On n'écrit une
   ligne de perso que là où il a quelque chose que les trois autres
   n'ont pas ; partout ailleurs, `tous` suffit. */
function dedouble(brut, qui) {
  if (!brut || typeof brut !== 'object' || Array.isArray(brut) || !('tous' in brut)) return brut
  /* `tous` est la caméra : elle parle en récit. La clé du runner est sa
     voix à lui. Une paire ['x', '…'] écrite dans l'un ou l'autre garde
     son locuteur — c'est là qu'on écrit les échanges. */
  return {
    ...brut,
    texte: [...enLignes(brut.tous, 'recit'), ...enLignes(brut[qui], qui)],
    tous: undefined,
  }
}

function normalise(brut, parDefaut = 'recit') {
  if (typeof brut === 'string' || estPaire(brut) || Array.isArray(brut))
    return { texte: enLignes(brut, parDefaut) }
  return { ...brut, texte: enLignes(brut.texte, brut.qui ?? parDefaut) }
}

/* ── LE VERBE PRINCIPAL ───────────────────────────────────────────────
   Choisir « utiliser » ou « parler » au HUD coûtait un aller-retour de
   souris, et ce choix n'existait presque jamais. Compté sur les 246
   cibles du jeu qui portent au moins un verbe : 33 en portent deux, et
   sur ces 33, VINGT-NEUF ont un `utiliser` qui n'est que du texte — un
   refus dans la voix du runner (règle 11). Deux cibles seulement ont les
   deux verbes vivants et différents au même instant.

   Le clic gauche joue donc le verbe principal de la cible, et le clic
   droit continue de regarder. Plus de trajet vers le bas de l'écran
   entre deux gestes.

   PAR DÉFAUT : `parler` s'il existe, sinon `utiliser`. C'est le bon
   choix partout où `utiliser` n'est qu'un refus — l'immense majorité,
   les quatre équipiers compris (« On ne se fouille pas entre nous »).

   `principal:` renverse ce défaut là où l'auteur le sait mieux, et
   s'écrit comme le reste : une chaîne, ou une fonction du contexte
   quand les deux gestes s'ENCHAÎNENT. C'est le cas des deux seules
   cibles à vrai conflit — poster Trash à l'étrave PUIS lui faire appeler
   l'esprit, parler à Cisco PUIS prendre la barre. Écrite ainsi, la
   séquence se joue au clic gauche seul.

   ET `regarder` EN DERNIER RECOURS, pour les neuf cibles du jeu qui ne
   portent que lui. Tomber sur `utiliser` là où l'auteur n'a rien écrit
   rendrait le bark générique de `refus.utiliser` — alors qu'il existe
   une description, et qu'elle est tout ce que cette cible a. Un refus
   ÉCRIT est du contenu et se garde ; un refus par défaut n'en est pas. */
export function verbePrincipal(scene, idCible, ctx) {
  const cible = scene.hotspots?.[idCible]
  if (!cible) return 'utiliser'
  const declare = typeof cible.principal === 'function' ? cible.principal(ctx) : cible.principal
  if (declare) return declare
  if (cible.parler) return 'parler'
  return cible.utiliser ? 'utiliser' : 'regarder'
}

/* `etat.verbe` vaut `null` tant que le joueur n'a rien imposé au HUD —
   c'est l'état normal. Un verbe choisi au HUD le remplit et prend le pas
   sur le principal, pour les rares fois où on veut l'autre geste. */
export function resous(scene, idCible) {
  const cible = scene.hotspots[idCible]
  if (!cible) return { texte: enLignes('…') }

  const ctx = contexte()

  if (etat.objetActif) {
    const regle = cible.objets?.[etat.objetActif]
    if (!regle) return refuse('objet')
    /* MÊME CONTRAT QUE LES VERBES, et il ne l'était pas. Cette ligne
       appelait `regle(ctx)` sans regarder si c'en était une, alors que
       la branche des verbes, six lignes plus bas, teste `typeof`. Une
       règle d'objet écrite en chaîne — la forme la plus courante, celle
       d'un refus dans la voix du runner — levait donc une TypeError au
       clic, et le joueur voyait un objet qui ne fait rien.

       Mesuré au moment de la trouver (chantier 67) : 23 des 54 règles
       objet × cible du jeu étaient dans ce cas, soit 43 %. C'est une
       bonne part de « les objets ne servent pas à grand-chose » — le
       contenu était écrit, il n'était pas atteignable. */
    return normalise(dedouble(typeof regle === 'function' ? regle(ctx) : regle, etat.actif))
  }

  const verbe = etat.verbe ?? verbePrincipal(scene, idCible, ctx)
  const regle = cible[verbe]
  if (!regle) return refuse(verbe)
  /* Une règle qui lit `ctx.verbe` (la carte, pour son étiquette) doit
     voir le verbe RÉSOLU, pas le `null` de l'état automatique. */
  return normalise(dedouble(typeof regle === 'function' ? regle({ ...ctx, verbe }) : regle, etat.actif))
}

/* `nom` est presque toujours une chaîne — sauf sur la carte (chantier
   13), où l'étiquette d'un nœud porte le coût du trajet et doit donc
   lire l'heure courante. Une fonction s'évalue avec le contexte ; tout
   le reste du jeu continue d'écrire une chaîne, sans y penser. */
export function nomDe(scene, idCible, ctx) {
  const nom = scene.hotspots[idCible]?.nom
  return (typeof nom === 'function' ? nom(ctx) : nom) ?? '?'
}
