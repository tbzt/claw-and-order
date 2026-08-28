/* Arbres de dialogue.
   Un sujet est disponible si sa condition passe ; il est « épuisé » une fois
   posé, et il se RETIRE alors de la liste.

   Il restait cliquable jusqu'ici, exprès — « on peut toujours refaire dire la
   même chose à quelqu'un ». Deux choses ont changé cet arbitrage : le journal
   garde tout ce qui a été dit (touche J), et il garde maintenant la question
   elle-même, pas seulement la réponse. Redemander pour relire n'a plus de
   raison d'être, alors qu'une liste de quatorze sujets dont neuf sont morts
   en avait un coût réel.

   Ce qui ferme le dialogue (`fin: true`) ne se retire JAMAIS, épuisé ou non :
   rien d'autre ne ferme un dialogue — ni Échap, ni un clic sur le décor — et
   un arbre rouvert sans sa sortie serait sans issue.

   Deux gardes distinctes (chantier 38, `PLAN_LISIBILITE.md` §2) : `quand`
   porte les conditions d'ÉTAT — si elles échouent, le sujet n'existe pas,
   au sens propre (invisible). `acteur` porte l'IDENTITÉ — si elle ne
   correspond pas au runner actif, le sujet reste affiché, mais verrouillé :
   « délibérer est ouvert, s'engager est personnel ». */

import { a, pose, contexte } from './state.js'
import { equipe } from './data/equipe.js'
import { enLignes } from './interact.js'

export function sujetsVisibles(arbre) {
  const ctx = contexte()
  return arbre.sujets.filter((s) => !s.quand || s.quand(ctx))
}

/* ── QUI POSE LA QUESTION, ET CE QU'ON LUI RÉPOND ─────────────────────
   Un sujet ne se pose QU'UNE FOIS — mais ni la question ni la réponse ne
   sont les mêmes selon qui la pose. Drakk et White_Rabbit ne demandent
   pas la même chose avec les mêmes mots, et McCarthy ne répond pas
   pareil à un samouraï des rues qu'à une decker.

   `titre` (la question) et `texte` (la réponse) acceptent donc les mêmes
   trois écritures :

       '« Vous connaissiez Wilson ? »'          une seule voix
       (ctx) => …                               calculé
       { tous: '…', drakk: '…', rabbit: '…' }   une par runner qui demande

   Dans les deux cas la clé désigne LE RUNNER ACTIF — celui qui pose. Sur
   `titre` elle choisit la formulation ; sur `texte` elle choisit la
   réponse que le PNJ lui fait. `tous` est le repli, et une voix qui n'a
   rien de particulier à dire n'a rien à écrire.

   La réponse reste dite par le PNJ (`dialogue.qui`). Pour qu'un runner
   coupe dedans, la notation de paire suffit, comme partout ailleurs :
   `['drakk', '« Ça, c’est une réponse d’homme qui compte ses morts. »']`. */

/* Les seules clés qui font d'un objet une carte de voix. Sans cette
   liste, `{ texte: '…', visuel: [] }` — une ligne parfaitement légale —
   serait pris pour une carte et rendrait `undefined`. */
const VOIX = new Set(['tous', ...Object.keys(equipe)])

const estCarteDeVoix = (v) =>
  v !== null && typeof v === 'object' && !Array.isArray(v) &&
  Object.keys(v).length > 0 && Object.keys(v).every((k) => VOIX.has(k))

const evalue = (v, ctx) => (typeof v === 'function' ? v(ctx) : v)

/* LA QUESTION : la carte CHOISIT. Un titre est une ligne unique, celle
   qu'on clique — il n'y a rien à quoi l'ajouter. `tous` est le repli. */
export function titreDe(sujet, ctx = contexte()) {
  const v = evalue(sujet.titre, ctx)
  return estCarteDeVoix(v) ? v[ctx.qui] ?? v.tous : v
}

/* LA RÉPONSE : la carte AJOUTE — exactement comme sur une cible, et
   c'est la même grammaire pour ne pas en avoir deux. `tous` est ce que
   le PNJ dit à tout le monde ; la clé du runner est ce qui s'ajoute
   quand c'est LUI qui a demandé, dans sa voix à lui. On écrit une ligne
   de runner là où il a quelque chose que les trois autres n'ont pas, et
   `tous` suffit partout ailleurs.

   Quand la réponse doit être franchement AUTRE et pas seulement enrichie
   — le PNJ qui se ferme avec l'un et s'ouvre avec l'autre — c'est une
   fonction qu'on écrit, pas une carte :

       texte: ({ qui }) => qui === 'rabbit' ? [ … ] : [ … ] */
export function texteDe(sujet, quiPnj, ctx = contexte()) {
  const v = evalue(sujet.texte, ctx)
  if (!estCarteDeVoix(v)) return v
  return [...enLignes(v.tous, quiPnj), ...enLignes(v[ctx.qui], ctx.qui)]
}

/* Épuisé pour tout le monde, quelle que soit la voix qui a posé la
   question : elle a été posée, la table entière a entendu la réponse. */
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
