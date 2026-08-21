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
  /* L'horloge de la nuit. Un registre de décisions, pas un chronomètre
     (règle D3) : elle n'avance qu'aux réactions qui déclarent `minutes`,
     jamais au clic ni au temps réel. Départ 23:00, en minutes depuis
     minuit. */
  heure: 23 * 60,
  /* Le tableau courant. `null` avant le premier `charge()` — c'est ce qui
     dit à `sauvegarde()` qu'il n'y a encore rien à écrire. */
  lieu: null,
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

export function avance(minutes) {
  etat.heure += minutes
}

/* `23:41`, jamais autre chose : pas de barre, pas de jauge — un chiffre.
   Prend `etat.heure` par défaut ; accepte un autre total de minutes pour
   formater l'heure D'UNE SAUVEGARDE sans la charger. */
export function formateHeure(minutes = etat.heure) {
  const total = ((minutes % 1440) + 1440) % 1440
  const h = String(Math.floor(total / 60)).padStart(2, '0')
  const m = String(total % 60).padStart(2, '0')
  return `${h}:${m}`
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

/* ── SAUVEGARDE ──────────────────────────────────────────────────────
   Une seule automatique, en local. On ne sauvegarde qu'au repos — c'est
   à l'appelant de le garantir, pas à ce module. Trois `Set` à convertir,
   et c'est tout le travail de sérialisation.

   `version` n'est pas du zèle : `etat` gagnera `visites` avec la carte,
   et une sauvegarde d'une version inconnue doit se refuser poliment
   plutôt que se réparer à moitié. */
const SAUVEGARDE_CLE = 'claw-and-order:sauvegarde'
const SAUVEGARDE_VERSION = 1

export function sauvegarde() {
  if (!etat.lieu) return
  const donnees = {
    version: SAUVEGARDE_VERSION,
    quand: new Date().toISOString(),
    ou: etat.lieu,
    heure: etat.heure,
    etat: {
      lieu: etat.lieu,
      verbe: etat.verbe,
      actif: etat.actif,
      inventaire: etat.inventaire,
      flags: [...etat.flags],
      visuels: [...etat.visuels],
      fiches: [...etat.fiches],
      allure: etat.allure,
      journal: etat.journal,
      heure: etat.heure,
    },
  }
  /* `localStorage` peut refuser (navigation privée, quota) : tant pis,
     on continue sans bloquer le jeu pour une sauvegarde manquée. */
  try { localStorage.setItem(SAUVEGARDE_CLE, JSON.stringify(donnees)) } catch {}
}

export function sauvegardeLisible() {
  try {
    const brut = localStorage.getItem(SAUVEGARDE_CLE)
    if (!brut) return null
    const donnees = JSON.parse(brut)
    return donnees?.version === SAUVEGARDE_VERSION ? donnees : null
  } catch {
    return null
  }
}

export function effaceSauvegarde() {
  try { localStorage.removeItem(SAUVEGARDE_CLE) } catch {}
}

/* Remet `etat` depuis une sauvegarde lisible. Ne touche ni `objetActif`
   ni `ficheActive` (transitoires, § 6 du plan) ni `astral` (dérivé de
   `actif` — à l'appelant de le recalculer, il connaît `VUES`). */
export function restaure(donnees) {
  const d = donnees.etat
  etat.lieu = d.lieu
  etat.verbe = d.verbe
  etat.actif = d.actif
  etat.objetActif = null
  etat.inventaire = d.inventaire
  etat.flags = new Set(d.flags)
  etat.visuels = new Set(d.visuels)
  etat.fiches = new Set(d.fiches)
  etat.ficheActive = null
  etat.allure = d.allure
  etat.journal = d.journal
  etat.heure = d.heure
}
