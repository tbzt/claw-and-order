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
     qu'on tient en main pour la frotter contre une autre.

     `fichesNeuves` est ce qu'on sait SANS L'AVOIR ENCORE LU. Le bouton
     du HUD signalait déjà « il y a du neuf », mais le carnet ne disait
     pas LAQUELLE : ouvrir douze fiches pour trouver la treizième est
     exactement le geste que ce carnet devait supprimer. Une fiche cesse
     d'être neuve quand le carnet s'est ouvert dessus, pas avant. */
  fiches: new Set(),
  fichesNeuves: new Set(),
  ficheActive: null,
  /* Qui a fait chaque recoupement — `{ 'pas-de-proces': 'trash', … }`.
     Une déduction se signe (chantier 21, plan du carnet §3.2) : le
     sceau qui la représente au carnet se teint de la voix du runner
     actif au moment où `frotte()` a réussi, pas d'une couleur fixe. */
  auteurDeductions: {},
  /* La barre (chantier 20). Une fiche déposée qui « tient » le fait
     monter ; une qui « se retourne » le fait redescendre. Un registre de
     compte, comme la confiance de Lester — mais CELUI-CI se sauvegarde :
     rien ne le redéduit de l'état du monde, chaque dépôt est un geste
     ponctuel du joueur, pas un fait qui reste vrai qu'on l'ait dit ou non. */
  credibilite: 0,
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
  /* ── L'ACTE IV COMPTE EN TOURS, PAS EN MINUTES (D8) ────────────────
     `PLAN_TRAME_ACTES_III_IV.md` § 3 : « `etat.heure` est en minutes
     depuis minuit et l'acte I s'y tient très bien. L'acte IV dure
     plusieurs jours : la même variable ne peut pas porter les deux sans
     que le HUD devienne illisible. »

     `null` tant qu'on est dans la nuit du contrat — c'est ce qui dit au
     HUD que l'horloge fait toujours foi. Le premier tableau déclarant
     `acte: 4` le passe à 1, et chaque entrée dans un lieu de l'acte IV
     l'incrémente : UN TOUR = UNE VISITE DE LIEU. La règle D3 est
     préservée à la lettre — le compteur n'avance que quand le joueur a
     choisi d'aller quelque part, jamais au clic ni au temps réel.

     Trois moments par jour, et pas quatre : matin, après-midi, soir.
     C'est le grain le plus grossier qui reste lisible, et le seul qu'on
     puisse tenir sans écrire une heure qu'aucune scène ne connaît. */
  tour: null,
  /* Le tableau courant. `null` avant le premier `charge()` — c'est ce qui
     dit à `sauvegarde()` qu'il n'y a encore rien à écrire. */
  lieu: null,
  /* D'où l'on vient — posé par `charge()` juste avant qu'il écrase `lieu`.
     La carte (chantier 13) en a besoin : une fois DESSUS, `lieu === 'carte'`
     et plus rien ne dit quel nœud est « ici ». Utile à toute scène qui
     voudrait un jour distinguer d'où on arrive. */
  depuis: null,
  /* Combien de fois chaque tableau a été chargé. `{ bar: 2, quai: 1, … }` —
     chantier 13. Sert à écrire une ouverture différente au second passage
     sans construire tout de suite les « secondes fenêtres » (chantier 19,
     bien plus gros) : un nœud qu'on retrouve identique à sa première
     visite contredit L3 (« revenir doit changer quelque chose »), même
     si ce n'est que le texte d'ouverture qui change pour l'instant. */
  visites: {},
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

/* Un tour de plus. Appelé par `charge()` (main.js) à l'entrée d'un
   tableau qui déclare `acte: 4`, jamais ailleurs. */
export function avanceTour() {
  etat.tour = (etat.tour ?? 0) + 1
}

const MOMENTS = ['matin', 'après-midi', 'soir']

/* `jour 2 — après-midi`, l'exemple exact de D8. Prend `etat.tour` par
   défaut ; accepte un autre numéro pour étiqueter une SAUVEGARDE sans
   la charger, comme `formateHeure()` le fait pour l'heure. */
export function formateTour(t = etat.tour) {
  const n = Math.max(1, t | 0)
  return `jour ${Math.floor((n - 1) / MOMENTS.length) + 1} — ${MOMENTS[(n - 1) % MOMENTS.length]}`
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
  for (const f of ids) if (!etat.fiches.has(f)) {
    etat.fiches.add(f)
    etat.fichesNeuves.add(f)
    neuf = true
  }
  return neuf
}

/* Le carnet s'est ouvert, et il les a montrées : elles ne sont plus
   neuves. Appelé à la FERMETURE, pas à l'ouverture — sinon la marque
   disparaîtrait sous les yeux du joueur au moment où il la cherche. */
export function ficheslues() {
  etat.fichesNeuves.clear()
}

export const sait = (fiche) => etat.fiches.has(fiche)

/* Le contexte transmis aux règles de la scène : elles n'ont pas besoin
   d'en savoir plus, et elles ne peuvent rien casser avec ça.
   `heure` et `depuis` sont arrivés avec la carte (chantier 13) : un lieu
   qui se ferme la nuit (chantier 17) doit pouvoir lire l'heure, et un
   nœud de la carte doit savoir d'où on l'atteint. */
export const contexte = () => ({ a, tient, sait, astral: etat.astral, qui: etat.actif, heure: etat.heure, depuis: etat.depuis })

/* ── SAUVEGARDE ──────────────────────────────────────────────────────
   Une seule automatique, en local. On ne sauvegarde qu'au repos — c'est
   à l'appelant de le garantir, pas à ce module. Trois `Set` à convertir,
   et c'est tout le travail de sérialisation.

   `visites` et `depuis` (chantier 13) s'ajoutent SANS bump de version :
   ce sont des champs de confort (l'ouverture d'un nœud revisité, savoir
   d'où on arrive sur la carte), jamais lus pour une décision qui ne se
   rattraperait pas. Une sauvegarde d'avant la carte les restaure à `{}`
   / `null` sans rien perdre de plus grave — bumper la version aurait
   rejeté la nuit en cours de l'utilisateur pour un gain qui ne le
   justifie pas. */
const SAUVEGARDE_CLE = 'claw-and-order:sauvegarde'
const SAUVEGARDE_VERSION = 1

/* Le même instantané sert à l'automatique et aux états gardés (chantier
   15) — seul l'endroit où on l'écrit change. */
function instantane() {
  return {
    version: SAUVEGARDE_VERSION,
    quand: new Date().toISOString(),
    ou: etat.lieu,
    heure: etat.heure,
    /* Au même rang que `heure`, et pour la même raison : c'est ce qui
       étiquette une sauvegarde dans la liste sans avoir à la charger.
       `null` hors de l'acte IV — l'étiquette retombe alors sur l'heure. */
    tour: etat.tour,
    etat: {
      lieu: etat.lieu,
      verbe: etat.verbe,
      actif: etat.actif,
      inventaire: etat.inventaire,
      flags: [...etat.flags],
      visuels: [...etat.visuels],
      fiches: [...etat.fiches],
      fichesNeuves: [...etat.fichesNeuves],
      credibilite: etat.credibilite,
      allure: etat.allure,
      journal: etat.journal,
      heure: etat.heure,
      tour: etat.tour,
      visites: etat.visites,
      depuis: etat.depuis,
      auteurDeductions: etat.auteurDeductions,
    },
  }
}

export function sauvegarde() {
  if (!etat.lieu) return
  /* `localStorage` peut refuser (navigation privée, quota) : tant pis,
     on continue sans bloquer le jeu pour une sauvegarde manquée. */
  try { localStorage.setItem(SAUVEGARDE_CLE, JSON.stringify(instantane())) } catch {}
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
  /* Une fiche gagnée juste avant un F5 doit rester signalée : sinon la
     reprise la rend « déjà lue » sans que personne l'ait lue. */
  etat.fichesNeuves = new Set(d.fichesNeuves ?? [])
  etat.credibilite = d.credibilite ?? 0
  etat.ficheActive = null
  etat.allure = d.allure
  etat.journal = d.journal
  etat.heure = d.heure
  /* Même geste que `visites`/`depuis` : une sauvegarde d'avant le
     chantier 28 n'a pas de registre de tours, et une nuit du contrat
     n'en aura jamais — `null` est la valeur juste dans les deux cas,
     donc rien à refuser et pas de bump de version. */
  etat.tour = d.tour ?? null
  /* `?? {}`/`?? null` : une sauvegarde d'avant le chantier 13 n'a ni
     l'un ni l'autre, et ce n'est pas une raison de la refuser. */
  etat.visites = d.visites ?? {}
  etat.depuis = d.depuis ?? null
  /* Même geste : une sauvegarde d'avant le chantier 21 n'a pas de
     signature de recoupement, et un sceau sans teinte de runner
     retombe sur le cyan par défaut (CSS) — rien à refuser. */
  etat.auteurDeductions = d.auteurDeductions ?? {}
}

/* ── ÉTATS GARDÉS (chantier 15) ──────────────────────────────────────
   L'automatique est unique et s'écrase à chaque repos ; un état gardé
   est un instantané qu'on choisit de garder, empilé à côté des autres
   dans une liste séparée (§4 du plan). Même format, mêmes trois `Set` —
   `instantane()` sert aux deux. Le nom qui les rend lisibles n'est pas
   tapé par le joueur : c'est `ou` + `heure`, comme la reprise
   automatique le fait déjà (« Le greffe de nuit — 02:14 ») — l'appelant
   compose l'étiquette, ce module ne connaît pas les noms de lieux. */
const GARDEES_CLE = 'claw-and-order:gardees'

function litGardees() {
  try {
    const brut = localStorage.getItem(GARDEES_CLE)
    const liste = brut ? JSON.parse(brut) : []
    return Array.isArray(liste) ? liste.filter((g) => g?.version === SAUVEGARDE_VERSION) : []
  } catch {
    return []
  }
}

function ecritGardees(liste) {
  try { localStorage.setItem(GARDEES_CLE, JSON.stringify(liste)) } catch {}
}

/* Du plus récent au plus ancien — celui qu'on vient de garder est celui
   qu'on veut revoir en premier. */
export function sauvegardesGardees() {
  return litGardees().sort((a, b) => b.id - a.id)
}

/* On ne sauvegarde qu'au repos (§2 du plan) : à l'appelant de le
   garantir, comme pour `sauvegarde()`. */
export function garde() {
  if (!etat.lieu) return null
  const g = { ...instantane(), id: Date.now() }
  ecritGardees([...litGardees(), g])
  return g
}

export function gardeeParId(id) {
  return litGardees().find((g) => g.id === id) ?? null
}

export function oublieGardee(id) {
  ecritGardees(litGardees().filter((g) => g.id !== id))
}
