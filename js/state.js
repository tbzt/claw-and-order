/* État du monde.
   Trois choses seulement : ce que le joueur sait (flags), ce qu'il porte
   (inventaire), et ce que la scène doit montrer (visuels). Tout le reste
   du moteur se contente de lire ça. */

export const etat = {
  verbe: 'regarder',
  actif: 'hercules',      // le runner sélectionné — c'est lui qui agit
  objetActif: null,
  astral: false,
  flags: new Set(),
  inventaire: [],
  visuels: new Set(),
  /* Le carnet. `fiches` est ce qu'on sait ; `ficheActive` est celle
     qu'on tient en main pour la frotter contre une autre. */
  fiches: new Set(),
  ficheActive: null,
  /* D-Osk. Le texte défilait à 25,7 caractères par seconde au pire, sans
     réglage et sans historique : une ligne partie était perdue pour de
     bon. `allure` change la cadence, `journal` garde tout. */
  allure: 1,
  journal: [],
}

export const a = (flag) => etat.flags.has(flag)
export const tient = (objet) => etat.inventaire.includes(objet)

export function pose(...flags) {
  for (const f of flags) etat.flags.add(f)
}

export function donne(...objets) {
  for (const o of objets) if (!etat.inventaire.includes(o)) etat.inventaire.push(o)
}

export function retire(...objets) {
  etat.inventaire = etat.inventaire.filter((o) => !objets.includes(o))
  if (objets.includes(etat.objetActif)) etat.objetActif = null
}

export function marque(...visuels) {
  for (const v of visuels) etat.visuels.add(v)
}

/* Une fiche se mérite : toutes les répliques n'en déposent pas. Rendre
   `true` quand c'est une nouveauté permet de ne le signaler qu'une fois. */
export function classe(...ids) {
  let neuf = false
  for (const f of ids) if (!etat.fiches.has(f)) { etat.fiches.add(f); neuf = true }
  return neuf
}

export const sait = (fiche) => etat.fiches.has(fiche)

/* Le contexte transmis aux règles de la scène : elles n'ont pas besoin
   d'en savoir plus, et elles ne peuvent rien casser avec ça. */
export const contexte = () => ({ a, tient, sait, astral: etat.astral, qui: etat.actif })
