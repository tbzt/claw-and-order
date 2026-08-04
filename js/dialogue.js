/* Arbres de dialogue.
   Un sujet est disponible si sa condition passe ; il est « épuisé » une fois
   posé, mais reste cliquable — on peut toujours refaire dire la même chose
   à quelqu'un, c'est la moindre des politesses dans un point & click. */

import { a, pose, contexte } from './state.js'

export function sujetsOuverts(arbre) {
  const ctx = contexte()
  return arbre.sujets.filter((s) => !s.quand || s.quand(ctx))
}

export const estEpuise = (sujet) => a(`vu:${sujet.id}`)

export function retiens(sujet) {
  pose(`vu:${sujet.id}`)
  if (sujet.flags) pose(...sujet.flags)
}

export function entree(arbre, idPnj) {
  const premier = !a(`parle:${idPnj}`)
  pose(`parle:${idPnj}`)
  return premier ? arbre.accueil : arbre.retour
}
