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

const estLigne = (v) =>
  v !== null && typeof v === 'object' && !Array.isArray(v) && 'qui' in v && 'texte' in v

function uneLigne(v, parDefaut) {
  if (estLigne(v)) return v
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

export function resous(scene, idCible) {
  const cible = scene.hotspots[idCible]
  if (!cible) return { texte: enLignes('…') }

  const ctx = contexte()

  if (etat.objetActif) {
    const regle = cible.objets?.[etat.objetActif]
    return regle ? normalise(dedouble(regle(ctx), etat.actif)) : refuse('objet')
  }

  const regle = cible[etat.verbe]
  if (!regle) return refuse(etat.verbe)
  return normalise(dedouble(typeof regle === 'function' ? regle(ctx) : regle, etat.actif))
}

export function nomDe(scene, idCible) {
  return scene.hotspots[idCible]?.nom ?? '?'
}
