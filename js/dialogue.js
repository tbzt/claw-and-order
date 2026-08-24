/* Arbres de dialogue.
   Un sujet est disponible si sa condition passe ; il est « épuisé » une fois
   posé, mais reste cliquable — on peut toujours refaire dire la même chose
   à quelqu'un, c'est la moindre des politesses dans un point & click.

   Deux gardes distinctes (chantier 38, `PLAN_LISIBILITE.md` §2) : `quand`
   porte les conditions d'ÉTAT — si elles échouent, le sujet n'existe pas,
   au sens propre (invisible). `acteur` porte l'IDENTITÉ — si elle ne
   correspond pas au runner actif, le sujet reste affiché, mais verrouillé :
   « délibérer est ouvert, s'engager est personnel ». */

import { a, pose, contexte } from './state.js'

export function sujetsVisibles(arbre) {
  const ctx = contexte()
  return arbre.sujets.filter((s) => !s.quand || s.quand(ctx))
}

export const estEpuise = (sujet) => a(`vu:${sujet.id}`)

export const estVerrouille = (sujet) => !!sujet.acteur && sujet.acteur !== contexte().qui

export function retiens(sujet) {
  pose(`vu:${sujet.id}`)
  if (sujet.flags) pose(...sujet.flags)
}

export function entree(arbre, idPnj) {
  const premier = !a(`parle:${idPnj}`)
  pose(`parle:${idPnj}`)
  return premier ? arbre.accueil : arbre.retour
}
