/* Boucle de jeu : survol, clic, texte, dialogue, inventaire.
   Ce fichier ne connaît aucun contenu — il ne sait que faire tourner
   une scène qu'on lui donne. */

import { etat, a, pose, donne, retire, tient, marque, classe, sait, contexte, avance, formateHeure, avanceTour, formateTour,
         sauvegarde, sauvegardeLisible, effaceSauvegarde, restaure, ficheslues,
         sauvegardesGardees, garde, gardeeParId, oublieGardee } from './state.js'
import { scenes, depart } from './data/scenes.js'
import { objets } from './data/objets.js'
import { resous, nomDe, enLignes, verbePrincipal } from './interact.js'
import { equipe, pnj } from './data/equipe.js'
import { sujetsVisibles, estEpuise, demandeur, retiens, entree, titreDe, texteDe } from './dialogue.js'
import { eveille, entre } from './ambiance.js'
import { fiches, deductions, refus as refusCarnet, presque } from './data/carnet.js'
import { contacts, appels, refus as refusReseau } from './data/reseau.js'

const $ = (id) => document.getElementById(id)
const stage = $('stage')
const decor = $('decor')
const curseur = $('curseur')
const etiquette = $('etiquette')
const bulleRecit = $('bulleRecit')
const bullePnj = $('bullePnj')
const boiteChoix = $('choix')
const rideau = $('rideau')
const carton = $('carton')
const carnet = $('carnet')
const reseau = $('reseau')
const sacoche = $('sacoche')
const equipeFiches = $('equipeFiches')
const portrait = $('portrait')
const journal = $('journal')
const gardees = $('gardees')
const repriseAuto = $('repriseAuto')

/* Qui a un visage. Un PNJ sans portrait parle quand même : la bulle
   suffit, et on ne dessine pas un visage pour une voix de radio.

   Chantier 23 : le compte a été fait, et il est net. Vingt
   interlocuteurs ont un arbre de dialogue dans `js/data/` ; cinq
   seulement avaient un portrait.

   Deux des quinze restants n'en veulent pas, et c'est la phrase
   ci-dessus : `vedette` est la VHF sur le canal 16, `cisco` est « une
   voix à la barre, comme la vedette sur le 16 » — son propre commentaire
   dans `retour.js` le dit. La dette réelle était donc de ONZE.

   LA DETTE EST REFERMÉE : les onze sont comblés. Tout interlocuteur qui
   n'est pas une voix de radio a maintenant un visage. Aucun n'a été
   dessiné de zéro — chacun DÉRIVE d'un portrait existant, ce qui est la
   seule façon de tenir la direction artistique sur seize visages. Voir
   `outils/visage.py`, `retouches/portraits-neufs.py` et
   `retouches/portraits-derniers.py` dans l'atelier.

   `patron` gagne un nom en même temps qu'un visage : le commentaire de
   `nomDuLocuteur`, plus bas, notait qu'il parlait sans nom faute d'être
   dans `pnj` ou `contacts`. Une entrée ici le nomme aussi. */
const VISAGES = {
  mccarthy: 'McCarthy',
  lester: 'Lester',
  gardien: 'Le gardien',
  barman: 'Le barman',
  renfield: 'Renfield',
  waters: 'Reginald Waters',
  herwick: 'Herwick Strauber',
  duke: 'Duke',
  patron: 'Le patron',
  sarah: 'Sarah Carpenter',
  denny: 'Denny',
  iris: 'Iris',
  mark: 'Mark',
  nita: 'Nita',
  nova: 'Nova',
  psych: 'Psych',
}

function montrePortrait(qui) {
  const nom = VISAGES[qui]
  /* En dialogue, l'interjection d'un runner ne doit pas faire disparaître
     le visage d'en face : le PNJ est toujours là, il écoute. */
  if (!nom) { if (!dialogue) portrait.hidden = true; return }
  portrait.hidden = false
  $('portraitImage').className = `portrait__image sprite--portrait-${qui}`
  $('portraitNom').textContent = nom
}

/* Les runners n'ont pas de portrait — c'est délibéré, ils sont déjà
   désignés dans le décor. Quand ils parlent, c'est donc leur NOM qui
   les identifie, et la couleur qui confirme.

   L'ordre compte, et il est mesuré : les quatre teintes se distinguent
   par la TEINTE, pas par la luminance — trash/drakk ne sont qu'à 1,10:1
   l'une de l'autre, et vert/or/orange est exactement le trio que confond
   une deutéranopie. La couleur seule ne peut donc pas porter « qui
   parle ». C'est la règle de Kiro appliquée au texte : une silhouette
   avant une couleur, donc un nom avant une teinte. */
/* `pnj` s'ajoute au chantier 28 : le local de répétition met QUATRE
   interlocuteurs dans la même pièce, et une bulle sans nom ne dit plus
   lequel des quatre vient de parler. Ajout strictement additif — les
   PNJ à portrait (`mccarthy`, `lester`, `gardien`) passent toujours par
   `VISAGES` avant, donc rien de ce qui existait ne change de rendu.
   `patron` (chantier 41) et `vedette` restent sans nom : ils ne sont ni
   dans `pnj` ni dans `contacts`, et les corriger n'appartient pas à ce
   chantier. */
const nomDuLocuteur = (qui) => equipe[qui]?.nom ?? VISAGES[qui] ?? pnj[qui]?.nom ?? contacts[qui]?.nom ?? ''

/* IL PARLE, ET ÇA SE VOIT.
   Chaque planche porte deux images de parole en bout ; `.parle` les joue
   (voir `.decor .parle` dans engine.css).

   La garde était `if (equipe[qui])`, c'est-à-dire : les runners seulement.
   Un PNJ qui parlait voyait donc son PORTRAIT s'animer pendant que son
   corps, dans le décor, continuait son attente ordinaire — rien ne
   reliait la voix au corps, ce qui est exactement le défaut qu'on avait
   corrigé pour les runners. La garde saute : `faitParler` pose `.parle`
   sur n'importe quelle silhouette présente dans le décor. Celles qui
   n'ont pas d'images de parole retombent sur leur attente, parce que
   `--parle-nom` a `var(--repos-nom)` pour valeur de repli.

   Un seul à la fois : celui qui vient de se taire retrouve son attente. */
function faitParler(qui) {
  seTait()
  decor.querySelector(`.p-${qui}`)?.classList.add('parle')
}

function seTait() {
  for (const el of decor.querySelectorAll('.parle')) el.classList.remove('parle')
}


let file = []
let quiParle = 'recit'
let apresFile = null
let occupe = false
let minuteur = 0
/* Distinct de `minuteur` : `charge()` appelle `clearTimeout(minuteur)`
   juste après avoir attendu le carton, et partager le même compteur
   ferait annuler par le tableau qui s'ouvre le carton qui l'annonce. */
let minuteurCarton = 0
let dialogue = null
let survolee = null
let derniereLigne = ''
/* La fiche posée dans le réseau, en attente d'un contact. Distincte de
   `etat.ficheActive` (le carnet) : les deux panneaux ne se ferment pas
   l'un l'autre, et partager l'état aurait fait retomber une sélection
   d'un panneau dans l'autre sans que rien ne le justifie. */
let ficheAppelActive = null
/* Le jeton survolé dans l'étal du carnet — sert à peindre la table
   (chantier 21) et l'étiquette du curseur, comme `survolee` le fait
   pour un hotspot du décor. Distinct de `survolee` : les jetons ne
   portent pas de `data-hotspot`, et le carnet peut être ouvert par
   dessus n'importe quel tableau sans se mélanger à son décor. */
let survoleeFiche = null
/* L'objet survolé dans l'étal de la sacoche. Même métier que
   `survoleeFiche` pour le carnet : peindre la table sans rien prendre.
   Regarder un objet ne coûte donc aucun geste — c'était le reproche,
   et c'est la réponse. */
let survoleObjet = null

/* ── Chargement d'un tableau ─────────────────────────────────
   Le moteur ne connaît aucun décor : il en charge un par son nom, vide
   ce qui traînait, et rebranche. Changer de tableau ne réinitialise
   rien — l'inventaire, les flags et le runner actif traversent. */

let scene = scenes[depart]

/* Un tableau qui se rejoue à deux actes déclare une FONCTION, comme il le
   fait déjà pour `ouverture` : `retour` est la nuit du contrat au premier
   passage et l'abordage au second, et c'est le même décor. */
const acteDe = (s) => (typeof s.acte === 'function' ? s.acte(contexte()) : s.acte)

/* ── CE QUI ARRIVE AU CORPS RESTE SUR LE CORPS ───────────────────────
   Un événement qui marque quelqu'un doit se voir ENSUITE, partout où il
   apparaît. Lester prend une balle au goulet (`retour.js`) et la porte
   jusqu'au procès : le carnet l'écrit depuis toujours — « une manche
   ouverte du coude à l'épaule. Il dit que ce n'est rien » — et aucun
   sprite ne l'apprenait.

   Le faire décor par décor demanderait une variante dans les NEUF
   tableaux où il est. Ici la carte se remplace une fois, au chargement,
   pour tous : le drapeau retire une classe de sprite et en pose une
   autre, exactement comme l'entrée de Drakk échange sa planche.

   LA TABLE EST FAITE POUR GRANDIR (chantier 78) : l'attelle que Sarah
   pose, le vêtement que Trash déchire à la planque, la combinaison
   orange du tribunal. Une ligne par événement — le drapeau, la carte
   qu'il retire, celle qu'il met. Rien d'autre à écrire. */
const CARTES_PORTEES = [
  ['lester-blesse', 'sprite--lester', 'sprite--lester-blesse'],
  ['lester-soigne', 'sprite--lester-blesse', 'sprite--lester-soigne'],
  /* `trash-echarpe-dechiree` cherche encore `sprite--lester-blesse` : si
     Sarah l'a déjà soigné (ligne au-dessus), la classe a déjà changé de
     nom et cette entrée ne trouve plus rien — la vraie attelle l'emporte
     sur le bandage improvisé, et c'est le bon ordre : Sarah vient
     toujours avant la planque dans la nuit. */
  ['trash-echarpe-dechiree', 'sprite--lester-blesse', 'sprite--lester-pansement'],
  ['trash-echarpe-dechiree', 'sprite--pj-trash', 'sprite--pj-trash-echarpe-dechiree'],
  /* S'il reprend une balle à la laverie (`planque.js`, la branche
     « aucune précaution » : « le pansement de Trash est parti avec la
     manche »), le bras était couvert par L'UNE des deux cartes ci-dessus
     selon d'où il vient — jamais les deux. Sans effet si aucune des deux
     n'a posé sa carte : `querySelectorAll` ne trouve alors rien. */
  ['lester-touche-laverie', 'sprite--lester-soigne', 'sprite--lester-blesse'],
  ['lester-touche-laverie', 'sprite--lester-pansement', 'sprite--lester-blesse'],

  /* ── LA COMBINAISON DU TRIBUNAL ────────────────────────────────────
     `tribunal-salle.html` ne part pas de `sprite--lester` : Lester y est
     TOUJOURS en combinaison, que dresse `entree()` de rien — c'est un
     fait du décor, pas une conséquence d'un choix. Les quatre mêmes
     drapeaux y rejouent donc la même chaîne, sur des cartes recolorées
     en orange (`lester-detenu*`), jamais sur les cartes de ville. */
  ['lester-blesse', 'sprite--lester-detenu', 'sprite--lester-detenu-blesse'],
  ['lester-soigne', 'sprite--lester-detenu-blesse', 'sprite--lester-detenu-soigne'],
  ['trash-echarpe-dechiree', 'sprite--lester-detenu-blesse', 'sprite--lester-detenu-pansement'],
  ['lester-touche-laverie', 'sprite--lester-detenu-soigne', 'sprite--lester-detenu-blesse'],
  ['lester-touche-laverie', 'sprite--lester-detenu-pansement', 'sprite--lester-detenu-blesse'],
]

/* Elle lit le DRAPEAU, pas un visuel, et c'est voulu : `etat.visuels` est
   vidé puis reconstruit par `entree()` à chaque `charge()`, alors qu'une
   balle ne se reprend pas. Appelée aux deux moments où le corps peut
   changer — au chargement d'un décor, et juste après une action, pour
   que le coup se voie SUR LE BATEAU et pas au tableau suivant.
   `classList.replace` ne fait rien si la classe n'est pas là : la
   rappeler à chaque rafraîchissement ne coûte rien. */
function porteLesCartes() {
  for (const [drapeau, avant, apres] of CARTES_PORTEES) {
    if (!a(drapeau)) continue
    for (const el of decor.querySelectorAll('.' + avant)) el.classList.replace(avant, apres)
  }
}

async function charge(idScene, muet = false) {
  /* `depuis`/`visites` (chantier 13) ne bougent que sur une VRAIE
     transition. `muet` sert aussi à la reprise d'une sauvegarde : à ce
     moment-là, `restaure()` vient de les poser depuis l'instantané, et
     `etat.lieu` vaut déjà la valeur restaurée — les recalculer ici les
     écraserait avec du vide. */
  if (!muet) etat.depuis = etat.lieu
  scene = scenes[idScene]
  etat.lieu = idScene
  if (!muet) etat.visites[idScene] = (etat.visites[idScene] ?? 0) + 1
  /* ── LE PASSAGE D'ACTE ────────────────────────────────────────────
     Résolu avant tout le reste, parce que deux choses en dépendent : le
     registre d'horloge, et le carton. `etat.acte === null` au tout
     premier `charge()` — commencer une partie n'est pas une coupure —
     et `muet` couvre la reprise d'une sauvegarde, où l'on retombe dans
     un acte sans l'avoir traversé.

     `acte: null` déclare « ce n'est pas un lieu » — la carte, et elle
     seule. Elle ne change donc pas d'acte (elle appartient à celui d'où
     l'on vient) et elle ne coûte pas de tour : D8 dit « un tour = une
     visite de lieu », et l'étiquette de chaque jalon annonce le tour que
     l'arrivée coûtera. `undefined`, lui, est un oubli : `verifieActes()`
     le crie au chargement. */
  const acteNeuf = acteDe(scene)
  const estUnLieu = acteNeuf !== null
  const coupure = !muet && estUnLieu && etat.acte !== null && acteNeuf !== etat.acte
  if (estUnLieu) etat.acte = acteNeuf
  /* D8 — un tour = une visite de lieu, et seulement à partir de
     l'acte IV ; tout ce qui précède continue de compter en minutes.
     `muet` couvre la reprise d'une sauvegarde : `restaure()` vient de
     reposer le tour, l'incrémenter ici le ferait avancer d'un cran à
     chaque F5. */
  if (!muet && estUnLieu && acteNeuf >= 4) avanceTour()
  /* L'horloge est à jour : le carton peut dire l'heure d'ARRIVÉE, et il
     couvre le remplacement du décor au lieu de le précéder. */
  if (coupure) await ouvreCarton(idScene)
  clearTimeout(minuteur)
  dialogue = null
  survolee = null
  etat.visuels.clear()
  decor.innerHTML = await (await fetch(scene.markup)).text()
  porteLesCartes()          /* les corps portent ce qui leur est arrivé */
  /* `entree` pose les visuels d'ouverture d'un tableau à partir de l'état
     du monde : c'est ainsi qu'un décor APPARAÎT à cause d'un choix pris
     deux tableaux plus tôt (la vedette de la Star au retour). Ça ne
     retire jamais rien — règle 19. */
  if (scene.entree) marque(...scene.entree(contexte()))
  entre(idScene)                 /* le son suit le tableau */
  /* `muet` sert aussi à une reprise de sauvegarde : l'équipe est déjà
     là, elle n'a pas à réapparaître par le bas du cadre. */
  if (!muet) faitEntrerLEquipe()
  verifieScene()
  brancheDecor()
  rafraichit()
  /* Le décor est peint : le carton peut se lever sur lui, jamais sur un
     cadre vide. L'ouverture se dit après — on lit le lieu, puis on
     l'entend. */
  if (coupure) fermeCarton()
  /* Une ouverture peut être une fonction : un tableau doit pouvoir
     s'ouvrir différemment selon ce qu'on a fait au précédent — et
     depuis le chantier 13, selon combien de fois on l'a déjà vu
     (`etat.visites[idScene]`, toujours ≥ 1 ici). */
  if (!muet) dis(typeof scene.ouverture === 'function'
    ? scene.ouverture(contexte(), etat.visites[idScene])
    : scene.ouverture)
}

/* ── SAUVEGARDE AUTOMATIQUE ──────────────────────────────────────────
   « On ne sauvegarde qu'au repos » (§2 du plan) : `occupe === false &&
   dialogue === null`. On y ajoute le rideau, pour ne pas figer la
   partie sur l'instant précis où elle se termine. Placé dans
   `rafraichit()`, ce garde-fou couvre à lui seul les trois points de
   repos du plan — entrée dans un tableau, fin d'un dialogue, et tout
   le reste — sans qu'aucun site d'appel n'ait à y penser. */
const estAuRepos = () => !occupe && !dialogue && rideau.hidden

/* Les vingt tableaux, et il en manquait quatre — la table servait la
   seule étiquette de reprise, qui retombe sur l'identifiant brut
   (`?? donnees.ou`) et ne criait donc jamais. Le carton de coupure, lui,
   n'a pas de repli : un acte s'ouvre sur un nom ou il ne s'ouvre pas.
   `amis` disait « Le local de répétition », ce que le chantier 73 a
   défait — la veillée a lieu chez Mark, à Renton. */
const NOMS_LIEUX = {
  bar: 'Le Claw & Order',
  quai: 'Le Sunnyside Beach Park',
  'quai-voilier': 'Le voilier, de près',
  greffe: 'Le greffe de nuit',
  'greffe-cellule': 'La cellule',
  retour: 'Le détroit',
  planque: 'La laverie',
  herwick: 'L’arrière-boutique de Herwick',
  sarah: 'Le cabinet de Sarah Carpenter',
  duke: 'Le sous-sol de Duke',
  squat: 'La loge de Trash',
  tripot: 'Le tripot d’Hercules',
  amis: 'Chez Mark, à Renton',
  appartement: 'L’appartement de Teresa',
  shameless: 'Le Shameless',
  waters: 'Waters Sound',
  'matrice-waters': 'Le nœud de Waters Sound',
  tribunal: 'Le palais de justice',
  'tribunal-salle': 'La salle d’audience',
  carte: 'La carte',
}

/* ── LE CARTON DE COUPURE ────────────────────────────────────────────
   Le jeu changeait d'acte sans le montrer : on quittait le détroit et
   on se retrouvait chez Mark, trois jours plus tard, après cinq cents
   millisecondes de rien. La prose le disait ; rien ne le JOUAIT.

   Le procédé est celui de la série dont ce jeu porte le nom — un lieu,
   une heure, sur fond noir, entre deux actes. Ce qu'il ne dit jamais,
   c'est le numéro de l'acte : la Boussole § 2 range « le système
   explique au joueur ce que le système vient de faire » parmi les
   choses à éviter, et une pancarte « ACTE II » est exactement ça. Le
   découpage est dans le code ; ce que le joueur reçoit est un fait du
   monde, où l'on est et quand.

   Trois cartons par partie au plus — la nuit (I), l'abri (II), le
   pivot (III), l'enquête (IV) — soit la fréquence d'une coupure de
   feuilleton, pas celle d'un écran de chargement.

   La durée est le PLANCHER de `duree()` — le temps le plus court que le
   jeu accorde à une ligne — passé au réglage d'allure comme le reste.
   Un carton ne se lit pas, il se laisse tomber : lui donner une durée
   proportionnelle à ses quinze caractères revient au plancher de toute
   façon, autant l'écrire. `MANUEL` met `x` à zéro et le carton attend
   alors le clic, comme toute réplique (« dans un jeu où lire EST le jeu,
   personne ne devrait avoir à lire vite »).

   Un clic passe, toujours. Le carton est au-dessus du curseur maison :
   il n'y a rien à viser, n'importe où suffit. */
function ouvreCarton(idScene) {
  $('cartonLieu').textContent = NOMS_LIEUX[idScene] ?? idScene
  $('cartonQuand').textContent = etat.tour === null ? formateHeure() : formateTour()
  carton.hidden = false
  return new Promise((resolu) => {
    const passe = () => {
      clearTimeout(minuteurCarton)
      carton.removeEventListener('click', passe)
      resolu()
    }
    carton.addEventListener('click', passe)
    const attente = Math.round(1800 * ALLURES[etat.allure].x)
    if (attente) minuteurCarton = setTimeout(passe, attente)
  })
}

function fermeCarton() { carton.hidden = true }

/* L'ÉTIQUETTE DE TEMPS D'UNE SAUVEGARDE (chantier 28). Une nuit du
   contrat s'étiquette par son heure ; une journée d'acte IV par son
   tour. Sans ça, un instantané pris au local de répétition se serait
   rangé dans la liste sous « 09:12 » — l'heure de la nuit d'avant, à
   trois jours près. Le champ `tour` est absent des sauvegardes plus
   anciennes, et `??` retombe alors sur l'heure : rien à refuser. */
const etiquetteTemps = (d) => d.tour ? formateTour(d.tour) : formateHeure(d.heure)

/* Au démarrage, une automatique lisible se PROPOSE, elle ne se charge
   pas d'office (§4) : rouvrir l'onglet pour recommencer une nuit ne
   doit pas rejeter le joueur au milieu de celle d'hier. */
function proposeReprise(donnees) {
  $('repriseAutoLieu').textContent =
    `${NOMS_LIEUX[donnees.ou] ?? donnees.ou} — ${etiquetteTemps(donnees)}`
  repriseAuto.hidden = false

  $('repriseAutoContinuer').addEventListener('click', async () => {
    const lieu = donnees.etat.lieu
    const visuels = donnees.etat.visuels
    restaure(donnees)
    reconstruitFiches()
    etat.astral = VUES[etat.actif] === 'astrale'
    repriseAuto.hidden = true
    /* `charge()` vide et reconstruit `visuels` depuis `entree()` — ce qui
       oublie tout ce qu'une action EN COURS de scène y avait ajouté
       (les postes tenus au quai, par exemple). On écrase donc après
       coup avec l'instantané sauvegardé, qui les contient déjà. */
    await charge(lieu, true)
    etat.visuels = new Set(visuels)
    peintAllure()
    rafraichit()
  }, { once: true })

  $('repriseAutoNouveau').addEventListener('click', () => {
    effaceSauvegarde()
    repriseAuto.hidden = true
    charge(depart)
  }, { once: true })
}

async function demarre() {
  brancheHud()
  brancheStage()
  verifieEquipe()
  verifieObjets()
  verifieCarnet()
  verifieReseau()
  verifieBarre()
  verifieActes()
  /* La jauge d'allure part de son vrai état : sans ça elle reste vide
     jusqu'au premier clic, et le joueur croit le réglage cassé. */
  peintAllure()
  /* Les navigateurs refusent le son avant un geste : on l'arme et
     il s'ouvrira au premier clic. */
  eveille(depart)

  const sauvegardee = sauvegardeLisible()
  if (sauvegardee) return proposeReprise(sauvegardee)
  await charge(depart)
}

/* ── Texte ───────────────────────────────────────────────── */

/* D-Osk — LA CADENCE.
   La formule d'origine plafonnait à 6 000 ms, ce qui imposait 25,7
   caractères par seconde sur la ligne la plus longue du jeu. Le plafond
   monte à 9 000 et l'échelle devient réglable.

   `manuel` est le vrai correctif : le minuteur ne part pas, la réplique
   attend le clic. Dans un jeu où lire EST le jeu, personne ne devrait
   avoir à lire vite. */
const ALLURES = [
  { cle: 'lent',   nom: 'LENT',   x: 1.55, crans: 3 },
  { cle: 'normal', nom: 'NORMAL', x: 1,    crans: 2 },
  { cle: 'vif',    nom: 'VIF',    x: 0.68, crans: 1 },
  { cle: 'manuel', nom: 'MANUEL', x: 0,    crans: 0 },
]

const duree = (ligne) =>
  Math.round(Math.min(9000, Math.max(1800, 950 + ligne.length * 46)) * ALLURES[etat.allure].x)

function peintAllure() {
  const a = ALLURES[etat.allure]
  $('allureNom').textContent = a.nom
  $('allureJauge').dataset.crans = String(a.crans)
}

function changeAllure() {
  etat.allure = (etat.allure + 1) % ALLURES.length
  const a = ALLURES[etat.allure]
  peintAllure()
  /* Le changement s'applique tout de suite, y compris sur la réplique
     en cours : sinon on règle la vitesse et il ne se passe rien. */
  if (occupe) {
    clearTimeout(minuteur)
    if (a.x) minuteur = setTimeout(suivante, duree(derniereLigne))
  }
  rafraichit()
}

/* `qui` n'est plus LE locuteur de la file : c'est son locuteur par
   DÉFAUT. Chaque ligne peut en désigner un autre, et c'est ce qui permet
   à deux runners de s'interrompre au milieu d'une réaction. */
function dis(lignes, qui = 'recit', apres = null) {
  file = enLignes(lignes, qui)
  apresFile = apres
  occupe = true
  boiteChoix.hidden = true
  rafraichit()
  suivante()
}

function suivante() {
  clearTimeout(minuteur)
  cacheBulles()
  const ligne = file.shift()
  if (ligne === undefined) return termine()

  /* UNE LIGNE PEUT FAIRE BOUGER LE DÉCOR.
     `visuels` posé sur la réaction s'applique AVANT que le texte
     commence : le décor a donc déjà changé quand on lit la phrase qui
     l'annonce, et le coup de feu se voit avant d'être tiré. Une ligne
     qui porte son propre `visuel` le marque au moment où elle
     s'affiche — c'est ce qui permet d'écrire une séquence : la terre se
     referme, la lueur accroche la pluie, le coup part, la manche
     rougit, la terre s'écarte.

     Le marquage n'enlève jamais rien (règle 19) : un état transitoire —
     l'éclair au départ du coup — est un état PERMANENT dont le rendu
     est une animation qui ne se joue qu'une fois. */
  if (ligne.visuel) {
    marque(...[].concat(ligne.visuel))
    /* `rafraichit()` et pas une écriture directe de `data-etat` : depuis
       que les tableaux exposent `derive()`, l'étiquette n'est plus la
       simple projection de `etat.visuels`, et la recopier à la main
       effaçait la posture de Lester à chaque beat de la laverie.
       Un seul endroit compose l'étiquette, et c'est celui-là. */
    rafraichit()
  }

  derniereLigne = ligne.texte
  quiParle = ligne.qui
  journalise(ligne.qui, ligne.texte)
  montrePortrait(ligne.qui)
  faitParler(ligne.qui)

  /* DEUX REGISTRES, DEUX PLACES. En bas, votre côté : le récit et les
     quatre voix de l'équipe — c'est la position de lecture installée
     depuis le début, au-dessus d'un sol vide. Au milieu, l'autre côté :
     celui à qui vous parlez.
     Faire monter les répliques de runner dans la bulle du PNJ les posait
     en plein sur les étiquettes de la lentille RA, illisibles. */
  const bulle = ligne.qui === 'recit' || equipe[ligne.qui] ? bulleRecit : bullePnj
  /* `.parle` ne change qu'une chose : la DURÉE de l'animation du
     portrait. La même planche de six images se lit comme un clignement
     à 3,8 s et comme une bouche qui remue à 0,62 s. Pas de seconde
     animation, donc pas de conflit avec la planche générée. */
  portrait.classList.add('parle')
  bulle.textContent = ligne.texte
  /* Le décor lit `data-qui` pour la teinte, `data-nom` pour l'étiquette
     de locuteur. Un PNJ à portrait n'en porte pas : son visage le dit. */
  bulle.dataset.qui = ligne.qui
  bulle.dataset.nom = VISAGES[ligne.qui] ? '' : nomDuLocuteur(ligne.qui)
  bulle.hidden = false
  bulle.style.animation = 'none'
  void bulle.offsetWidth
  bulle.style.animation = ''

  /* En mode manuel, aucun minuteur : la réplique attend qu'on clique. */
  if (ALLURES[etat.allure].x) minuteur = setTimeout(suivante, duree(ligne.texte))
}

function termine() {
  clearTimeout(minuteur)
  cacheBulles()
  occupe = false
  aRale = false
  if (!dialogue) portrait.hidden = true
  const suite = apresFile
  apresFile = null
  if (suite) suite()
  else if (dialogue) montreChoix()
  rafraichit()
}

function cacheBulles() {
  bulleRecit.hidden = true
  bullePnj.hidden = true
  portrait.classList.remove('parle')   /* il se tait : il cligne à nouveau */
  seTait()                             /* et le runner reprend son attente */
}

/* ── Interactions ────────────────────────────────────────── */

function joue(idCible) {
  const reaction = resous(scene, idCible)
  etat.objetActif = null

  if (reaction.flags) pose(...reaction.flags)
  if (reaction.objets) donne(...reaction.objets)
  if (reaction.retire) retire(...reaction.retire)
  if (reaction.visuels) marque(...reaction.visuels)
  if (reaction.minutes) avance(reaction.minutes)
  const fichesNeuves = reaction.fiches ? classe(...reaction.fiches) : false

  rafraichit()
  if (fichesNeuves) signaleCarnet()

  dis(reaction.texte, reaction.qui ?? 'recit', () => {
    if (reaction.dialogue) return ouvreDialogue(reaction.dialogue)
    if (reaction.va) return setTimeout(() => charge(reaction.va), 500)
    if (reaction.fin) return setTimeout(tombeRideau, 1400)
    rafraichit()
  })
}

/* La lentille suit le runner : pas de bouton de vision séparé. On
   sélectionne Trash, on voit l'astral ; White_Rabbit, on voit la RA.
   C'est ce qui rend la règle 10 tangible au lieu d'être une idée. */
/* `physique` → `sociale`, `tactique` → `materielle` (int. 6, audit reroute
   § IV.6) : les deux anciens noms ne décrivaient plus ce qui est écrit
   dessous, et orientaient l'auteur vers la mauvaise question.

   ET LA TABLE VIENT DES FICHES, maintenant. Le renommage n'avait été fait
   qu'ici : `equipe.js` a continué de dire `physique` et `tactique` pendant
   une semaine. Le champ n'étant lu par personne, rien n'a crié — mais un
   document de doctrine a été écrit d'après lui, et il disait le social de
   Drakk et le physique d'Hercules, soit l'inverse du jeu. Le fait est
   maintenant écrit une seule fois, sur la fiche du runner. */
const VUES = Object.fromEntries(Object.entries(equipe).map(([id, f]) => [id, f.vue]))

/* « J'AI PAS FINI. »
   Basculer de runner pendant qu'une réplique se déroule était refusé en
   silence : le joueur cliquait, rien ne se passait, et rien ne lui disait
   pourquoi. C'est le pire des refus — celui qu'on prend pour un bug.

   Il parle maintenant, dans la voix de celui qu'on coupe (règle 11), et
   il ne double jamais : une seule protestation par bloc de texte, sinon
   quatre clics impatients font quatre lignes et le remède devient pire.
   La ligne se glisse en TÊTE de file : elle passe juste après la phrase
   qu'on essayait d'interrompre, ce qui est exactement ce qu'elle dit. */
let aRale = false

function rale() {
  if (aRale) return
  const qui = equipe[quiParle] ? quiParle : etat.actif
  const stock = equipe[qui]?.refus?.coupe
  if (!stock?.length) return
  aRale = true
  file.unshift({ qui, texte: stock[Math.floor(Math.random() * stock.length)] })
}

function selectionne(idRunner) {
  if (occupe) return rale()
  /* Recliquer celui qu'on joue déjà ouvre les fiches. Ce clic était un
     `return` sec depuis toujours, et le HUD n'a pas la place d'un
     septième bouton (12 px de marge à 1024 — voir l'en-tête de `.hud`).
     Un geste mort qui devient un geste utile coûte moins cher qu'un
     bouton qui pousse l'équipe hors du cadre. */
  if (etat.actif === idRunner) return basculeEquipe()
  etat.actif = idRunner
  etat.astral = VUES[idRunner] === 'astrale'
  rafraichit()

  /* On peut changer de runner EN PLEIN DIALOGUE, et la liste des sujets
     se recompose : c'est là qu'on voit que Trash a une question que
     Drakk n'aura jamais. Interdire la bascule ici rendrait la mécanique
     invisible au moment précis où elle compte. */
  if (dialogue) return montreChoix()

  /* UN REGARD PAR TABLEAU, PAS UN PAR RUNNER. Le drapeau s'appelait
     `vue:trash` — sans le nom du lieu. Les drapeaux traversent les
     tableaux et ne se retirent jamais : la première bascule sur Trash,
     où qu'elle ait lieu, consommait donc le regard astral POUR TOUTE LA
     PARTIE. Seize tableaux × quatre regards = 64 blocs écrits ; un
     joueur en voyait quatre.

     Le lieu entre dans la clé. Une vieille sauvegarde peut encore
     porter des `vue:trash` : ils ne correspondent plus à rien et
     n'empêchent plus rien — pas de bump de version pour ça. */
  const decouverte = scene.vues?.[VUES[idRunner]]
  if (decouverte && !a(`vue:${etat.lieu}:${idRunner}`)) {
    pose(`vue:${etat.lieu}:${idRunner}`)
    dis(decouverte, idRunner)
  }
}

/* ── Dialogue ────────────────────────────────────────────── */

function ouvreDialogue(idPnj) {
  dialogue = scene.dialogues[idPnj]
  dis(entree(dialogue, idPnj), dialogue.qui, montreChoix)
}

/* Les sujets réellement offerts, dans l'ordre où ils s'affichent — donc
   dans l'ordre où les chiffres les désignent. Un épuisé se retire, sauf
   s'il ferme le dialogue (voir l'en-tête de `dialogue.js`). */
function sujetsOfferts() {
  return sujetsVisibles(dialogue).filter((s) => s.fin || !estEpuise(s))
}

function montreChoix() {
  boiteChoix.replaceChildren()
  const offerts = sujetsOfferts()
  offerts.forEach((sujet, i) => {
    const bouton = document.createElement('button')
    /* PLUS DE SUJET VERROUILLÉ (2026-08-29). `acteur` désigne celui qui
       pose la question au lieu d'exiger qu'on le tienne — voir l'en-tête
       de `dialogue.js`. Le titre se formule donc déjà dans sa voix, et
       cliquer suffit.

       C'est ce qui achève l'intervention 5 de l'audit du reroute. Elle
       avait retiré le suffixe `(Nom)` que le moteur ajoutait — mais il ne
       s'ajoutait que là où le titre ne nommait pas déjà le runner, et les
       trente-sept le nommaient. L'étiquette n'avait bougé nulle part. Le
       verrou parti, elle n'a plus rien à annoncer : elle est retirée des
       trente-sept titres. */
    /* Le rang s'affiche jusqu'à 9 — au-delà, le chiffre n'existe pas et
       promettre un raccourci qui ne répond pas est pire que se taire.
       Sept arbres sur vingt-six dépassent neuf sujets à l'ouverture ;
       ils fondent dès que les premiers sont dits. */
    if (i < 9) {
      const rang = document.createElement('span')
      rang.className = 'choix__rang'
      rang.textContent = String(i + 1)
      bouton.append(rang)
    }
    bouton.append(document.createTextNode(titreDe(sujet)))
    /* `mention` est ce que l'INTERFACE ajoute au sujet, jamais ce que
       quelqu'un dit — « Trancher », sur les cinq sujets qui referment une
       délibération. Elle vivait dans la chaîne du titre, et le journal
       enregistrait donc « … » (Trancher) comme une réplique. Pire : la
       chaîne n'étant plus la même que la ligne dite juste après, le
       dédoublonnage de `journalise()` ne la reconnaissait pas, et Trash
       tranchait deux fois de suite dans l'historique.

       Sortie du titre, elle ne coûte plus rien : le bouton la montre, le
       journal garde la phrase seule — donc identique à la réplique — et
       le dédoublonnage qui existait déjà fait le reste. */
    if (sujet.mention) {
      const m = document.createElement('span')
      m.className = 'choix__mention'
      m.textContent = ` (${sujet.mention})`
      bouton.append(m)
    }
    if (estEpuise(sujet)) bouton.classList.add('est-epuise')
    bouton.addEventListener('click', (e) => {
      e.stopPropagation()
      choisit(sujet)
    })
    boiteChoix.append(bouton)
  })
  boiteChoix.hidden = false
  rafraichit()
}

/* `refuseSujet()` vivait ici, avec les huit répliques `refus.verrouille`
   des quatre fiches. Les deux sont partis avec le verrou : un refus n'a
   de sens que s'il existe un geste à refuser, et il n'y en a plus. Les
   trois autres familles de refus (`regarder`, `utiliser`, `parler`,
   `objet`) sont intactes — la règle 11 ne perd rien, elle perd un cas
   qui ne devait pas exister. */

function choisit(sujet) {
  boiteChoix.hidden = true
  /* LA QUESTION AU JOURNAL, avant la réponse. C'est ce qui autorise à
     retirer un sujet dit : sans elle, le journal gardait « ce qu'on vous
     a répondu » sans jamais « ce que vous aviez demandé », et cacher la
     ligne aurait effacé la seule trace de la question. Elle est dite par
     `demandeur(sujet)` — l'acteur du sujet s'il en a un, sinon celui
     qu'on tient. Le journal nomme donc celui qui a VRAIMENT parlé, pas le
     portrait allumé au moment du clic. */
  /* La question ET la réponse se résolvent AVANT `retiens()` : le sujet
     peut poser des drapeaux, et une réponse écrite en fonction du
     contexte doit voir le monde tel qu'il était quand on a demandé, pas
     tel que sa propre question vient de le rendre. */
  const question = titreDe(sujet)
  const reponse = texteDe(sujet, dialogue.qui)
  journalise(demandeur(sujet), question)
  retiens(sujet)

  if (sujet.objets) donne(...sujet.objets)
  if (sujet.visuels) marque(...sujet.visuels)
  if (sujet.fiches && classe(...sujet.fiches)) signaleCarnet()
  /* Même geste que `joue()` (ligne 367) pour une réaction de hotspot —
     jusqu'ici absent ici, donc `minutes` sur un sujet de dialogue ne
     coûtait jamais rien à l'horloge. Trouvé chantier 39 en vérifiant
     `soigner` (`sarah.js`) dans le navigateur : le même défaut touchait
     déjà `herwick.js:547` (le `soigner` de Herwick, chantier 36),
     silencieux depuis, faute d'avoir mesuré l'horloge à cet endroit. */
  if (sujet.minutes) avance(sujet.minutes)
  const qui = dialogue.qui
  if (sujet.fin) {
    dialogue = null
    dis(reponse ?? [], qui, sujet.va ? () => charge(sujet.va) : null)
    return
  }
  dis(reponse, qui, montreChoix)
}


/* ── LE CARNET DE RECOUPEMENT ────────────────────────────────────────
   On sélectionne une fiche, on en clique une autre, et la paire est
   soit prévue — elle produit une troisième fiche — soit refusée, en
   voix. Jamais un buzzer.

   RÈGLE 12 : une déduction pose un drapeau `su:<id>` et rien d'autre.
   Elle ouvre des sujets de dialogue ; elle n'ouvre aucune porte. */

function signaleCarnet() {
  $('boutonCarnet').classList.add('a-du-neuf')
}

/* Le texte par défaut de la table, selon qu'une fiche est tenue ou non —
   le seul concept que le carnet ajoute au geste de l'inventaire, et
   c'est un texte, pas un mécanisme. */
const AIDE_VIDE = 'Prends un jeton, pose-le sur un autre.'
const AIDE_TENUE = 'Pose-la sur une autre fiche.'

/* Le sceau d'une fiche se déduit de son `ou` : cinq lieux, plus le
   recoupement. Pas de champ neuf sur les fiches — la source qu'elles
   portent déjà (§3.2 du plan) suffit à la retrouver. */
function sourceDe(ou) {
  if (ou === 'Recoupement') return 'recoupement'
  if (ou.includes('Claw & Order')) return 'bar'
  if (ou.includes('Sunnyside Beach Park') || ou.includes('quai')) return 'quai'
  if (ou.includes('greffe')) return 'greffe'
  if (ou.includes('retour') || ou.includes('goulet') || ou.includes('voilier')) return 'detroit'
  /* La planque, quel que soit le lieu réel : la laverie ET, depuis le
     chantier 36, l'arrière-boutique de Herwick. Un sceau générique
     plutôt qu'un par lieu — PLAN_PLANQUES.md § 6, § 9 laisse la question
     ouverte tant que les quatre planques n'existent pas ; rien n'empêche
     de la retrancher plus tard. */
  return 'planque'
}

function basculeCarnet() {
  const ouvert = carnet.hidden
  carnet.hidden = !ouvert
  etat.ficheActive = null
  survoleeFiche = null
  $('boutonCarnet').setAttribute('aria-pressed', String(ouvert))
  $('carnetAide').textContent = AIDE_VIDE
  $('carnetAide').classList.remove('est-refus')
  /* On marque les neuves comme lues à la FERMETURE, pas à l'ouverture :
     sinon la marque s'efface à l'instant précis où le joueur ouvre le
     carnet pour la chercher. Elle reste sous ses yeux tant qu'il est
     dedans, et ne le suit pas une fois ressorti. */
  if (ouvert) rendCarnet()
  else ficheslues()
  rafraichit()
}

function chercheDeduction(a, b) {
  return deductions.find((d) => d.paire.includes(a) && d.paire.includes(b) &&
                                !etat.fiches.has(d.donne.id))
}

/* La même paire, mais déjà résolue. Sans ça, refrotter deux fiches dont
   on a DÉJÀ tiré la conclusion tombait sur un refus au hasard — le
   moteur répondait « ces deux-là ne se regardent pas » à propos de deux
   fiches qui venaient justement de se regarder. Petite trahison, mais
   trahison : le joueur a raison, et on lui dit qu'il a tort. */
function dejaFaite(a, b) {
  return deductions.find((d) => d.paire.includes(a) && d.paire.includes(b) &&
                                etat.fiches.has(d.donne.id))
}

/* Combien de recoupements existent, combien sont faits. C'est la seule
   chose qui dise au joueur qu'il en reste. */
const recoupementsFaits = () =>
  deductions.filter((d) => etat.fiches.has(d.donne.id)).length

function peintProgres() {
  const faits = recoupementsFaits()
  const total = deductions.length
  const p = $('carnetProgres')
  p.textContent = faits
    ? `${faits} recoupement${faits > 1 ? 's' : ''} sur ${total}`
    : `${total} recoupements à trouver`
  p.classList.toggle('est-complet', faits === total)
  $('carnetRecoupements').textContent = `${faits}/${total}`
}

function frotte(idA, idB) {
  const trouvee = chercheDeduction(idA, idB)
  etat.ficheActive = null
  survoleeFiche = null

  if (trouvee) {
    fiches[trouvee.donne.id] = trouvee.donne
    classe(trouvee.donne.id)
    pose(`su:${trouvee.donne.id}`)      /* le seul effet : la parole s'ouvre */
    /* Le sceau du recoupement se teinte de la voix de celui qui vient
       de le faire (§3.2 du plan) — l'actif au moment précis où la
       paire tient, pas au moment où le carnet se rouvrira. */
    etat.auteurDeductions[trouvee.donne.id] = etat.actif
    carnet.hidden = true
    $('boutonCarnet').setAttribute('aria-pressed', 'false')
    const brut = resousTexte(trouvee.dit)
    return dis(brut, etat.actif, () => { rafraichit() })
  }

  /* Une paire proche mérite mieux qu'un refus au hasard : le joueur
     n'a pas tort, il n'a pas encore assez. Et une paire DÉJÀ résolue
     mérite mieux encore : on lui rappelle ce qu'elle a donné. */
  const revue = dejaFaite(idA, idB)
  const cle = [idA, idB].sort().join('|')
  const aide = $('carnetAide')
  aide.textContent = revue
    ? `C’est de là que vient « ${fiches[revue.donne.id].titre} ». Elle est déjà au carnet.`
    : presque[cle] ?? pioche(refusCarnet[etat.actif] ?? refusCarnet.hercules)
  aide.classList.remove('est-refus'); void aide.offsetWidth
  aide.classList.add('est-refus')
  rafraichit()
}

/* La déduction se dit dans la voix du runner actif : c'est lui qui vient
   de faire le lien. Même grammaire que les réactions de scène. */
/* Même contrat que `dedouble()` côté interaction : `tous` est la caméra,
   la clé du runner est sa voix. Une déduction se lit donc en deux temps —
   le constat, puis celui qui vient de le faire. */
function resousTexte(bloc) {
  return [...enLignes(bloc.tous, 'recit'), ...enLignes(bloc[etat.actif], etat.actif)]
}

const pioche = (liste) => liste[Math.floor(Math.random() * liste.length)]

/* Le bouton d'une fiche, en pleine carte — utilisé par le réseau
   seulement (le carnet, lui, pose des jetons dans l'étal ; voir
   `creeJeton()` plus bas, chantier 21). */
function creeFicheBouton(id, active, onClick) {
  const f = fiches[id]
  const b = document.createElement('button')
  b.className = 'fiche'
  b.classList.toggle('est-active', active)
  b.classList.toggle('est-deduction', f.ou === 'Recoupement')
  /* Le CSS pose un bandeau NOUVEAU dessus : savoir qu'il y a du neuf ne
     sert à rien si on doit relire douze fiches pour trouver laquelle. */
  b.classList.toggle('est-neuve', etat.fichesNeuves.has(id))
  b.innerHTML = `<span class="fiche__titre"></span><span class="fiche__texte"></span><span class="fiche__ou"></span>`
  b.querySelector('.fiche__titre').textContent = f.titre
  b.querySelector('.fiche__texte').textContent = f.texte
  b.querySelector('.fiche__ou').textContent = f.ou
  b.addEventListener('click', (e) => { e.stopPropagation(); onClick() })
  return b
}

/* La teinte d'un sceau : fixe pour les cinq lieux, celle du runner qui
   a fait le recoupement pour le sixième. Posée en ligne, sur le jeton
   ET sur les cartes de la table — les trois lisent la même variable. */
function teinteSceau(id, source) {
  if (source !== 'recoupement') return null
  return `var(--voix-${etat.auteurDeductions[id] ?? etat.actif})`
}

/* Le jeton : ce que l'étal montre de chaque fiche AVANT qu'on la lise —
   un sceau, un titre court, un liseré de source (§3.1-3.2 du plan). Le
   geste qu'il déclenche est celui de l'inventaire : le clic « prend »
   la fiche, elle n'est plus qu'active-marquée-par-un-liseré. */
function creeJeton(id, active, onClick) {
  const f = fiches[id]
  const source = sourceDe(f.ou)
  const b = document.createElement('button')
  b.className = 'jeton'
  b.dataset.source = source
  const teinte = teinteSceau(id, source)
  if (teinte) b.style.setProperty('--teinte-recoupement', teinte)
  b.classList.toggle('est-active', active)
  b.classList.toggle('est-neuve', etat.fichesNeuves.has(id))
  b.innerHTML = `<span class="sceau sceau--${source}"></span><span class="jeton__titre"></span>`
  b.querySelector('.jeton__titre').textContent = f.titre
  b.addEventListener('pointerenter', () => {
    survoleeFiche = id
    rendCarnetTable()
    ecritEtiquette()
  })
  b.addEventListener('pointerleave', () => {
    if (survoleeFiche !== id) return
    survoleeFiche = null
    rendCarnetTable()
    ecritEtiquette()
  })
  b.addEventListener('click', (e) => { e.stopPropagation(); onClick() })
  return b
}

/* Remplit une carte de la table avec le texte plein d'une fiche, ou un
   vide instructif si rien n'est à montrer. Même trois lignes que
   `creeFicheBouton` (titre/texte/ou), le sceau en plus. */
function remplitDetail(el, id, texteVide) {
  el.classList.toggle('est-vide', !id)
  /* `el` est un élément persistant (la table ne se recrée pas à chaque
     rendu) : une teinte posée en ligne la fois précédente doit être
     effacée avant d'en reposer une autre, sinon une fiche SANS
     recoupement hérite visuellement de la dernière couleur de runner. */
  el.style.removeProperty('--teinte-recoupement')
  if (!id) {
    el.innerHTML = `<p class="carnet__vide">${texteVide}</p>`
    return
  }
  const f = fiches[id]
  const source = sourceDe(f.ou)
  const teinte = teinteSceau(id, source)
  if (teinte) el.style.setProperty('--teinte-recoupement', teinte)
  el.innerHTML = `<div class="fiche__entete"><span class="sceau sceau--${source}"></span><span class="fiche__ou"></span></div><p class="fiche__titre"></p><p class="fiche__texte"></p>`
  el.querySelector('.fiche__ou').textContent = f.ou
  el.querySelector('.fiche__titre').textContent = f.titre
  el.querySelector('.fiche__texte').textContent = f.texte
}

/* La table seule — appelée à chaque survol, sans reconstruire tout
   l'étal (`rendCarnet()` le fait déjà, plus lourd, à l'ouverture et à
   chaque prise/dépose). */
function rendCarnetTable() {
  remplitDetail($('carnetTenue'), etat.ficheActive, AIDE_VIDE)
  /* Survoler le jeton qu'on tient déjà ne dit rien de plus : la carte de
     droite reste vide plutôt que de répéter celle de gauche. */
  const survoleeAffichee = survoleeFiche && survoleeFiche !== etat.ficheActive ? survoleeFiche : null
  remplitDetail($('carnetSurvolee'), survoleeAffichee, 'Survole un jeton pour le comparer.')
}

function rendCarnet() {
  peintProgres()
  const etal = $('carnetGrille')
  etal.replaceChildren()
  for (const id of etat.fiches) {
    if (!fiches[id]) continue
    etal.append(creeJeton(id, etat.ficheActive === id, () => {
      /* `rafraichit()`, pas `rendCarnet()` seul : c'est lui qui allume
         le curseur `porte-objet` (chantier 21, §3.3) — le rebuild de
         l'étal n'est que la moitié du geste. */
      if (!etat.ficheActive) {
        etat.ficheActive = id
        $('carnetAide').textContent = AIDE_TENUE
        $('carnetAide').classList.remove('est-refus')
        return rafraichit()
      }
      if (etat.ficheActive === id) {
        etat.ficheActive = null
        $('carnetAide').textContent = AIDE_VIDE
        return rafraichit()
      }
      frotte(etat.ficheActive, id)
    }))
  }
  if (!etat.fiches.size)
    etal.innerHTML = '<p class="carnet__vide">Rien encore. Une fiche se mérite.</p>'

  rendCarnetTable()

  /* Le troisième usage n'existe que là où il sert (§5.3 du plan) : un
     tableau qui expose `scene.barre` gagne le bouton, les autres ne le
     voient jamais. Même carnet, même grille — juste une cible de plus. */
  const boiteDepose = $('carnetDepose')
  boiteDepose.hidden = !scene.barre
  if (scene.barre) $('boutonDepose').disabled = !etat.ficheActive
}

/* ── LA BARRE ────────────────────────────────────────────────────────
   Troisième usage de la même grammaire que `frotte()` et `appelle()` :
   `frotte(fiche, fiche)` pose une fiche sur une autre, `appelle(fiche,
   contact)` pose une fiche sur un contact, `depose(fiche)` la pose
   devant le juge (§5.3 du plan). Le joueur la connaît déjà.

   Trois registres, pas un buzzer : une fiche qui TIENT fait monter la
   crédibilité, une qui SE RETOURNE la fait redescendre, et le reste —
   la majorité — N'A PAS SA PLACE : le juge, poliment, n'en fait rien.
   Comme au carnet, seules les fiches qui comptent vraiment ont une
   réponse écrite ; les autres tombent dans un refus pioché, dans la
   voix du runner qui vient d'essayer. */

function depose(idFiche) {
  const barre = scene.barre
  if (!barre) return
  etat.ficheActive = null

  /* On ne rejoue pas une déposition déjà faite : la crédibilité
     compterait deux fois pour une seule fiche, et rejouer un aveu
     n'a pas de sens non plus. Le drapeau est celui de la fiche, pas
     de la scène — une seconde audience (rang 10 du plan) en aura
     besoin telle quelle. */
  if (a(`depose:${idFiche}`)) {
    carnet.hidden = true
    $('boutonCarnet').setAttribute('aria-pressed', 'false')
    rafraichit()
    return dis('Déjà dit. Le juge s’en souvient.', etat.actif, () => rafraichit())
  }

  pose(`depose:${idFiche}`)
  carnet.hidden = true
  $('boutonCarnet').setAttribute('aria-pressed', 'false')

  /* Rang 10 : `hayden` doit pouvoir répondre différemment selon que
     Chimera a corrompu le témoignage (`chimera-avance`, D9) — une
     réponse peut donc être une fonction du contexte, comme partout
     ailleurs dans le jeu (`regarder`, `utiliser`), plutôt qu'un objet
     figé. Les quatre réponses de la 1ʳᵉ audience restent des objets
     simples : rien à leur changer. */
  const brute = barre.reponses[idFiche]
  const reponse = typeof brute === 'function' ? brute(contexte()) : brute
  if (!reponse) {
    rafraichit()
    return dis(pioche(barre.refus[etat.actif] ?? barre.refus.hercules), etat.actif, () => rafraichit())
  }

  if (reponse.registre === 'tient') etat.credibilite++
  if (reponse.registre === 'retourne') etat.credibilite = Math.max(0, etat.credibilite - 1)
  if (reponse.flags) pose(...reponse.flags)
  rafraichit()
  return dis(resousTexte(reponse.dit), etat.actif, () => rafraichit())
}

/* ── LE RÉSEAU ────────────────────────────────────────────────────────
   Le même geste, transposé : on pose une fiche, puis on clique un
   contact au lieu d'une seconde fiche. Un contact appartient à UN
   runner (§5 du plan) — appeler exige qu'il soit actif, et le bouton
   le dit avant que le joueur ait à le découvrir en échouant. */

/* ══ LA SACOCHE (chantier 67) ════════════════════════════════════════
   Le sixième panneau, et le seul qui remplace quelque chose au lieu de
   s'ajouter. Il reprend le patron du carnet sans y toucher : `.carnet`
   pour la mise en page, `.jeton` pour l'étal, `carnet__fiche` pour la
   table. Ce qui change tient en une ligne — un jeton de carnet se PREND
   pour être frotté à un autre, un jeton de sacoche se prend pour être
   tendu à quelque chose QUI EST DERRIÈRE LE PANNEAU. Il le referme
   donc, ce que le carnet n'a jamais eu à faire. */

/* Un objet peut appartenir à quelqu'un (`a:`) — les quatre du portique.
   Sa provenance n'est alors pas un lieu mais une personne, et son
   liseré prend la voix de son propriétaire plutôt qu'une teinte de
   lieu. Les huit autres se rangent par où on les a eus, avec la même
   fonction que les fiches. */
const sourceObjet = (o) => (o.a ? 'equipe' : sourceDe(o.ou))

/* `regarder` d'un objet a la forme d'un `regarder` de cible, et les
   trois mêmes écritures : une chaîne (elle vaut `tous`), une carte de
   voix, ou une FONCTION du contexte quand ce qu'on voit dépend de ce
   qu'on sait. Le dossier s'en sert — sa page de garde se lit toujours,
   sa masse change de sens une fois qu'on l'a vraiment lu. */
const regardDe = (o) => {
  const brut = typeof o.regarder === 'function' ? o.regarder(contexte()) : o.regarder
  return typeof brut === 'string' ? { tous: brut } : brut ?? {}
}

function basculeSacoche() {
  const ouvert = sacoche.hidden
  sacoche.hidden = !ouvert
  survoleObjet = null
  $('main').setAttribute('aria-pressed', String(ouvert))
  if (ouvert) rendSacoche()
  rafraichit()
}

/* Le jeton d'un objet : son icône, son nom, son liseré de provenance.
   Survoler peint la table ; cliquer prend — et referme. */
function creeJetonObjet(id, active) {
  const o = objets[id]
  const b = document.createElement('button')
  b.className = 'jeton jeton--objet'
  b.dataset.source = sourceObjet(o)
  if (o.a) b.style.setProperty('--teinte-equipe', `var(--voix-${o.a})`)
  b.classList.toggle('est-active', active)
  b.innerHTML = '<span class="jeton__icone"></span><span class="jeton__titre"></span>'
  b.querySelector('.jeton__icone').innerHTML = `<span class="objet__${o.icone}"></span>`
  b.querySelector('.jeton__titre').textContent = o.nom
  b.addEventListener('mouseenter', () => { survoleObjet = id; rendSacocheTable() })
  b.addEventListener('mouseleave', () => {
    if (survoleObjet !== id) return
    survoleObjet = null
    rendSacocheTable()
  })
  b.addEventListener('click', (e) => {
    e.stopPropagation()
    /* Reposer ce qu'on tenait déjà : on reste dans la sacoche, il n'y a
       rien à viser. Prendre autre chose : on sort, parce que la cible
       est dans le décor. */
    if (etat.objetActif === id) {
      etat.objetActif = null
      rendSacoche()
      return rafraichit()
    }
    etat.objetActif = id
    basculeSacoche()
  })
  return b
}

/* La table de lecture. Elle montre ce qu'on SURVOLE, à défaut ce qu'on
   tient — un objet qu'on vient de prendre reste donc lisible le temps
   que le panneau se referme, et la table n'est jamais vide sans raison. */
function rendSacocheTable() {
  const el = $('sacocheDetail')
  const id = survoleObjet ?? etat.objetActif
  el.classList.toggle('est-vide', !id)
  /* Même précaution que `remplitDetail()` : la table est un élément
     persistant, une teinte posée en ligne survivrait au rendu suivant. */
  el.style.removeProperty('--teinte-equipe')
  el.removeAttribute('data-source')
  if (!id || !objets[id]) {
    el.innerHTML = '<p class="carnet__vide">Survole un objet pour le regarder.</p>'
    return
  }
  const o = objets[id]
  el.dataset.source = sourceObjet(o)
  if (o.a) el.style.setProperty('--teinte-equipe', `var(--voix-${o.a})`)
  el.innerHTML = '<div class="fiche__entete"><span class="jeton__icone"></span><span class="fiche__ou"></span></div><p class="fiche__titre"></p><div class="sacoche__lignes"></div>'
  el.querySelector('.jeton__icone').innerHTML = `<span class="objet__${o.icone}"></span>`
  el.querySelector('.fiche__ou').textContent = o.ou
  el.querySelector('.fiche__titre').textContent = o.nom
  const lignes = el.querySelector('.sacoche__lignes')
  /* `resousTexte()` — le même résolveur que les déductions du carnet :
     `tous` est la caméra, la clé du runner actif est sa voix. Changer de
     runner sacoche ouverte change donc ce qu'on lit, et c'est le but. */
  for (const ligne of resousTexte(regardDe(o))) {
    const p = document.createElement('p')
    p.className = 'sacoche__ligne'
    p.dataset.qui = ligne.qui
    p.textContent = ligne.texte
    lignes.append(p)
  }
}

/* Ce que la SACOCHE montre : ce qu'on a ramassé cette nuit. L'équipement
   personnel (`a:`) n'y est plus — il est sur la fiche de son
   propriétaire, où il n'a jamais cessé d'être. Rien n'a bougé dans
   `etat.inventaire` pour autant : le portique lit `tient()` et retire,
   et ses deux branches écrites — traverser avec, ou le tendre soi-même —
   valent trop cher pour être cassées par une question de rangement.
   C'est la présentation qui se sépare, pas l'état. */
const dansLaSacoche = () => etat.inventaire.filter((id) => objets[id] && !objets[id].a)

function rendSacoche() {
  const etal = $('sacocheEtal')
  etal.replaceChildren()
  for (const id of dansLaSacoche()) etal.append(creeJetonObjet(id, etat.objetActif === id))
  const n = dansLaSacoche().length
  $('sacocheProgres').textContent = n === 0 ? 'vide' : `${n} objet${n > 1 ? 's' : ''}`
  rendSacocheTable()
}

/* ══ LES FICHES D'ÉQUIPE (chantier 70) ═══════════════════════════════
   Quatre cartes de front, jamais un étal : il n'y a que quatre fiches,
   et la comparaison EST le propos (DOCTRINE — LES QUATRE REGARDS § 15).

   Ce panneau MONTRE, il n'active rien — le § 9 interdit l'arbre de
   compétences, et il n'y a donc aucun bouton de capacité ici. La seule
   chose cliquable est l'équipement, et c'est le geste de la sacoche,
   pas un pouvoir : on le prend en main pour le tendre à quelqu'un. */

const materielDe = (idRunner) =>
  Object.keys(objets).find((id) => objets[id].a === idRunner)

function basculeEquipe() {
  const ouvert = equipeFiches.hidden
  equipeFiches.hidden = !ouvert
  if (ouvert) rendEquipe()
  rafraichit()
}

function creeBloc(titre, ...contenu) {
  const b = document.createElement('div')
  const t = document.createElement('p')
  t.className = 'eq-bloc__titre'
  t.textContent = titre
  b.append(t, ...contenu)
  return b
}

function creeLigne(classe, texte) {
  const p = document.createElement('p')
  p.className = classe
  /* `portrait` s'écrit en une ou plusieurs phrases ; les tableaux se
     rendent en un seul paragraphe, l'aération vient du CSS. */
  p.textContent = Array.isArray(texte) ? texte.join(' ') : texte
  return p
}

/* L'équipement sur sa fiche. Cliquable tant qu'on l'a — même geste que
   le jeton de la sacoche : on le prend, le panneau se referme, la cible
   est derrière. Saisi au portique, il reste écrit et barré : une
   conséquence ajoute, elle ne retire jamais (règle 19). */
function creeMateriel(idObjet) {
  const o = objets[idObjet]
  const porte = tient(idObjet)
  const b = document.createElement('button')
  b.className = 'eq-materiel'
  b.classList.toggle('est-parti', !porte)
  b.classList.toggle('est-actif', etat.objetActif === idObjet)
  b.disabled = !porte
  b.innerHTML = '<span class="jeton__icone"></span><span><span class="eq-materiel__nom"></span><span class="eq-materiel__ou"></span></span>'
  b.querySelector('.jeton__icone').innerHTML = `<span class="objet__${o.icone}"></span>`
  b.querySelector('.eq-materiel__nom').textContent = o.nom
  /* PAS DE PROVENANCE ICI. Le `ou` des objets a été écrit pour la
     sacoche, où « à Drakk » est l'information utile. Sur la fiche de
     Drakk, sous « Les deux épées de Drakk », le nom revenait trois fois
     en quatre lignes. La ligne ne sert plus qu'à dire ce qui a changé —
     donc elle ne s'écrit que quand quelque chose a changé. */
  b.querySelector('.eq-materiel__ou').textContent = porte ? '' : 'laissé au portique'
  b.title = porte ? `${o.nom} — prendre en main` : `${o.nom} — laissé au portique`
  if (porte) b.addEventListener('click', (e) => {
    e.stopPropagation()
    if (etat.objetActif === idObjet) {
      etat.objetActif = null
      rendEquipe()
      return rafraichit()
    }
    etat.objetActif = idObjet
    basculeEquipe()
  })
  return b
}

function rendEquipe() {
  const rangee = $('equipeRangee')
  rangee.replaceChildren()
  for (const [id, r] of Object.entries(equipe)) {
    const f = document.createElement('div')
    f.className = 'eq-fiche'
    f.dataset.runner = id
    f.classList.toggle('est-actif', etat.actif === id)
    const nom = document.createElement('p')
    nom.className = 'eq-fiche__nom'
    nom.textContent = r.nom
    const etatCivil = document.createElement('p')
    etatCivil.className = 'eq-fiche__etat'
    etatCivil.textContent = [r.metatype, r.role].filter(Boolean).join(' · ')
    f.append(nom, etatCivil)

    const idMateriel = materielDe(id)
    if (idMateriel) f.append(creeMateriel(idMateriel))

    if (r.attentif) f.append(creeBloc('Ce qu’il remarque', creeLigne('eq-attentif', r.attentif)))

    if (r.comportements?.length) {
      const puces = document.createElement('div')
      puces.className = 'eq-puces'
      for (const c of r.comportements) {
        const p = document.createElement('span')
        p.className = 'eq-puce'
        p.textContent = c
        puces.append(p)
      }
      f.append(creeBloc('Comportements', puces))
    }

    if (r.portrait) f.append(creeBloc('Ce qu’on sait de lui', creeLigne('eq-portrait', r.portrait)))
    /* Une seule des quatre répliques canoniques, tirée au sort à
       l'ouverture : les quatre d'affilée feraient une liste de
       citations, une seule fait entendre quelqu'un. */
    if (r.repliques?.length) f.append(creeLigne('eq-replique', pioche(r.repliques)))
    rangee.append(f)
  }
}

function basculeReseau() {
  const ouvert = reseau.hidden
  reseau.hidden = !ouvert
  ficheAppelActive = null
  $('boutonReseau').setAttribute('aria-pressed', String(ouvert))
  if (ouvert) rendReseau()
  rafraichit()
}

function rendReseau() {
  const grille = $('reseauGrille')
  grille.replaceChildren()
  for (const id of etat.fiches) {
    if (!fiches[id]) continue
    grille.append(creeFicheBouton(id, ficheAppelActive === id, () => {
      ficheAppelActive = ficheAppelActive === id ? null : id
      rendReseau()
    }))
  }
  if (!etat.fiches.size)
    grille.innerHTML = '<p class="carnet__vide">Rien encore. Une fiche se mérite.</p>'

  const boutons = $('reseauContacts')
  boutons.replaceChildren()
  for (const [id, c] of Object.entries(contacts)) {
    /* Chantier 4 (l'abordage) : « les cinq contacts, et ceux qui
       s'ajoutent » (chantier 32) — un contact peut porter `requiert`,
       un drapeau sans lequel il n'apparaît pas du tout dans le
       panneau. Cisco est le premier ; les cinq d'origine n'ont pas ce
       champ et passent donc toujours. */
    if (c.requiert && !a(c.requiert)) continue
    const b = document.createElement('button')
    b.className = 'contact'
    b.innerHTML = `<span class="contact__nom"></span><span class="contact__titre"></span>`
    b.querySelector('.contact__nom').textContent = c.nom
    b.querySelector('.contact__titre').textContent = `${c.titre} — le contact de ${equipe[c.runner].nom}`
    b.addEventListener('click', (e) => { e.stopPropagation(); appelle(id) })
    boutons.append(b)
  }
}

function appelle(idContact) {
  const c = contacts[idContact]
  const aide = $('reseauAide')

  if (!ficheAppelActive) {
    aide.textContent = 'Choisis d’abord une fiche à lui poser.'
    aide.classList.remove('est-refus')
    return
  }
  /* LE PANNEAU EST UNE SCÈNE, PAS QUATRE. Un contact n'appartient qu'à un
     runner — mais il fallait basculer sur lui AVANT de cliquer, sinon le
     panneau renvoyait « Bascule sur Hercules pour l'appeler ». Deux gestes
     pour une information que le bouton portait déjà : le sous-titre dit de
     qui est le contact, et personne d'autre n'est proposé.

     La bascule ne décidait donc de rien. Elle demandait au joueur de
     déclarer ce que le jeu savait — et elle laissait entendre que les
     quatre passent des coups de fil chacun dans son coin. Ils sont dans la
     même pièce, avec les mêmes téléphones : on appelle Alicia, et c'est
     Hercules qui parle, parce que c'est son numéro.

     L'appartenance n'a rien perdu : `c.runner` reste le locuteur de la
     réplique de sortie, plus bas, quel que soit le portrait allumé. */
  const appel = appels[`${idContact}|${ficheAppelActive}`]
  ficheAppelActive = null

  /* D9, tranché le 2026-08-25 : « plus l'équipe appelle ses contacts,
     plus l'information a de chances de remonter à Chimera » — mais
     Chimera ne peut plus atteindre Lester (McNeil, chantier 28) ni
     l'équipe (pas de combat, §11 du plan) : la seule chose qu'il peut
     encore abîmer, c'est un témoignage. Deux présages, symétriques à
     ceux du Tír (`tir-prevenu`/`tir-retour`, appartement.js/amis.js) —
     chaque appel pendant l'acte IV compte, réussi ou non : solliciter
     les Ombres est déjà le risque, avant même la réponse. Le second
     présage (`chimera-avance`) est lu par `hayden`, à la barre
     (`tribunal-salle.js`). */
  if (a('abordage-passe')) {
    if (!a('chimera-alerte')) pose('chimera-alerte')
    else if (!a('chimera-avance')) pose('chimera-avance')
  }
  const pari = a('chimera-alerte') && !a('pari-dit')

  if (!appel) {
    avance(5)
    aide.textContent = pioche(refusReseau[idContact])
    aide.classList.remove('est-refus'); void aide.offsetWidth
    aide.classList.add('est-refus')
    rendReseau()
    rafraichit()
    return
  }

  avance(appel.minutes)
  const dejaSu = sait(appel.id)
  if (!fiches[appel.id] && appel.donne) fiches[appel.id] = { ...appel.donne }
  const neuf = classe(appel.id)
  if (neuf) signaleCarnet()

  reseau.hidden = true
  $('boutonReseau').setAttribute('aria-pressed', 'false')
  rafraichit()
  const lignes = enLignes(dejaSu ? appel.dejaLigne : appel.ligne, idContact)
  const suite = appel.reaction ? enLignes(appel.reaction, c.runner) : []
  if (pari) {
    pose('pari-dit')
    lignes.unshift(...enLignes(['trash', '« Chaque fois qu’on décroche, quelqu’un d’autre l’apprend. Je ne dis pas de ne pas appeler. Je dis de le savoir. »'], 'trash'))
  }
  return dis([...lignes, ...suite], idContact, () => rafraichit())
}

/* ── LE JOURNAL ──────────────────────────────────────────────────────
   Tout ce qui a été dit, dans l'ordre. Le prototype n'avait aucun
   historique : une ligne partie était perdue, et la seule parade était
   de lire vite — exactement ce qu'un point & click ne doit pas demander.

   On garde les 240 dernières répliques. Au-delà, c'est du texte que
   personne ne remontera. */
const JOURNAL_MAX = 240

function journalise(qui, ligne) {
  const dernier = etat.journal[etat.journal.length - 1]
  if (dernier && dernier.ligne === ligne && dernier.qui === qui) return
  etat.journal.push({ qui, ligne, tableau: scene?.markup ?? '' })
  if (etat.journal.length > JOURNAL_MAX) etat.journal.shift()
}

function basculeJournal() {
  const ouvert = journal.hidden
  journal.hidden = !ouvert
  $('boutonJournal').setAttribute('aria-pressed', String(ouvert))
  if (ouvert) rendJournal()
  rafraichit()
}

function rendJournal() {
  const liste = $('journalListe')
  liste.replaceChildren()
  if (!etat.journal.length) {
    liste.innerHTML = '<p class="journal__vide">Personne n’a encore rien dit.</p>'
    return
  }
  for (const { qui, ligne } of etat.journal) {
    const p = document.createElement('p')
    p.className = 'journal__ligne'
    if (qui !== 'recit') {
      p.classList.add('est-dit')
      const nom = document.createElement('span')
      nom.className = 'journal__qui'
      nom.dataset.qui = qui              /* le journal se colore comme la bulle */
      nom.textContent = nomDuLocuteur(qui) || qui
      p.append(nom)
    }
    p.append(document.createTextNode(ligne))
    liste.append(p)
  }
  /* On ouvre sur la fin : c'est la réplique qu'on vient de rater qu'on
     vient chercher, pas celle du début de la soirée. */
  liste.scrollTop = liste.scrollHeight
}

/* ── LES ÉTATS GARDÉS (chantier 15) ──────────────────────────────────
   L'automatique (F5) est unique et s'écrase à chaque repos ; un état
   gardé est un instantané que le joueur choisit de garder, écrit sur
   demande et jamais écrasé — la liste vit dans `state.js`. Même
   étiquette que la reprise automatique : le lieu et l'heure, jamais un
   nom tapé au clavier (§4 du plan). */

function basculeGardees() {
  const ouvert = gardees.hidden
  gardees.hidden = !ouvert
  $('boutonGardees').setAttribute('aria-pressed', String(ouvert))
  if (ouvert) rendGardees()
  rafraichit()
}

function rendGardees() {
  const boutonGarder = $('boutonGarder')
  const repos = estAuRepos()
  boutonGarder.disabled = !repos
  boutonGarder.title = repos ? '' : 'Il faut être au repos pour garder un instant.'

  const liste = $('gardeesListe')
  liste.replaceChildren()
  const entrees = sauvegardesGardees()
  if (!entrees.length) {
    liste.innerHTML = '<p class="journal__vide">Rien de gardé pour l’instant.</p>'
    return
  }
  for (const g of entrees) {
    const ligne = document.createElement('div')
    ligne.className = 'gardees__ligne'

    const reprendre = document.createElement('button')
    reprendre.className = 'gardees__reprendre'
    reprendre.textContent = `${NOMS_LIEUX[g.ou] ?? g.ou} — ${etiquetteTemps(g)}`
    reprendre.addEventListener('click', () => reprendGardee(g.id))

    const oublier = document.createElement('button')
    oublier.className = 'gardees__oublier'
    oublier.title = 'Oublier cet état'
    oublier.textContent = '✕'
    oublier.addEventListener('click', (e) => {
      e.stopPropagation()
      oublieGardee(g.id)
      rendGardees()
    })

    ligne.append(reprendre, oublier)
    liste.append(ligne)
  }
}

/* Même geste que `repriseAutoContinuer` (§ SAUVEGARDE AUTOMATIQUE) :
   `charge()` reconstruit `visuels` depuis `entree()`, donc on l'écrase
   après coup avec l'instantané gardé, qui les contient déjà. */
async function reprendGardee(id) {
  const donnees = gardeeParId(id)
  if (!donnees) return
  const lieu = donnees.etat.lieu
  const visuels = donnees.etat.visuels
  restaure(donnees)
  reconstruitFiches()
  etat.astral = VUES[etat.actif] === 'astrale'
  gardees.hidden = true
  $('boutonGardees').setAttribute('aria-pressed', 'false')
  await charge(lieu, true)
  etat.visuels = new Set(visuels)
  peintAllure()
  rafraichit()
}

/* ── Rendu du HUD ────────────────────────────────────────── */

/* DEUX SORTES DE VISUELS, et le moteur n'en connaissait qu'une.
   `etat.visuels` est un registre d'ÉVÉNEMENTS : une réaction pose une
   marque, elle ne la retire jamais (règle 19), et c'est juste pour une
   trappe ouverte ou un poste tenu — ça ne se referme pas.

   Mais un état peut aussi être DÉRIVÉ d'un compte, et donc redescendre.
   La confiance de Lester en est un : huit sources l'augmentent, lui
   proposer de l'argent en retire deux. Aucune marque cumulative ne sait
   dire ça. Un tableau peut donc exposer `derive(ctx)` — recalculé à
   chaque rafraîchissement, jamais stocké, jamais sauvegardé, puisqu'il
   se redéduit toujours de l'état du monde. */
function rafraichit() {
  porteLesCartes()
  stage.dataset.astral = etat.astral ? 'on' : 'off'
  const derives = scene?.derive?.(contexte()) ?? []
  stage.dataset.etat = [...etat.visuels, ...derives].join(' ')
  stage.classList.toggle('est-occupe', occupe || Boolean(dialogue))

  /* Le décor doit savoir QUI agit, pas seulement quelle lentille est
     ouverte : c'est ce qui rend la règle 10 tangible dans le cadre au
     lieu de sous le cadre. Le CSS s'accroche aux classes `p-<runner>`,
     présentes dans tous les tableaux — le moteur n'a donc rien à
     toucher dans le markup d'une scène qu'il ne connaît pas. */
  stage.dataset.vue = VUES[etat.actif]
  stage.dataset.actif = etat.actif
  for (const bouton of document.querySelectorAll('.runner'))
    bouton.classList.toggle('est-actif', bouton.dataset.runner === etat.actif)

  rendMain()
  /* D8 : l'horloge de la nuit cède la place au registre en tours dès
     que l'acte IV commence. Le `title` suit — « L'heure, cette nuit »
     posé en dur dans index.html deviendrait faux le premier matin. */
  const hud = $('hudHeure')
  hud.textContent = etat.tour === null ? formateHeure() : formateTour()
  hud.title = etat.tour === null ? 'L’heure, cette nuit' : 'Depuis la récusation'
  $('carnetCompte').textContent = String(etat.fiches.size)
  /* Le bouton porte le NOMBRE de fiches non lues, pas seulement une
     pulsation : « il y a du neuf » et « il y en a trois » ne demandent
     pas le même geste. La classe reste pilotée ici plutôt que par
     `signaleCarnet()` seul, pour qu'une reprise après F5 la retrouve. */
  const neuves = etat.fichesNeuves.size
  $('boutonCarnet').classList.toggle('a-du-neuf', neuves > 0)
  const badge = $('carnetNeuves')
  badge.hidden = neuves === 0
  badge.textContent = `+${neuves}`
  peintProgres()
  if (!carnet.hidden) rendCarnet()
  if (!journal.hidden) rendJournal()
  if (!reseau.hidden) rendReseau()
  if (!sacoche.hidden) rendSacoche()
  if (!equipeFiches.hidden) rendEquipe()
  /* Hors cible, le curseur ne promet rien : il reprend sa forme neutre,
     ou celle du verbe forcé s'il y en a un. Sur une cible,
     `ecritEtiquette()` le repose sur le verbe résolu. */
  curseur.dataset.verbe = etat.verbe ?? ''
  /* Le geste du carnet est celui de l'inventaire (chantier 21, §3.3 du
     plan) : une fiche tenue allume le même curseur ambré qu'un objet
     porté — un seul signal visuel pour « quelque chose est en main »,
     pas un de plus à apprendre. */
  curseur.classList.toggle('porte-objet', Boolean(etat.objetActif || etat.ficheActive))
  ecritEtiquette()

  if (estAuRepos()) sauvegarde()
}

/* LA MAIN. Ce qui reste de l'inventaire au HUD : un emplacement, celui
   de l'objet qu'on tient. Il ne grandit pas avec la sacoche, donc il ne
   pousse plus le sélecteur d'équipe hors du cadre — c'était le débord
   mesuré dans l'en-tête de `.hud`, et il n'a plus de cause. */
function rendMain() {
  const b = $('main')
  const creux = $('mainIcone')
  creux.replaceChildren()
  const id = etat.objetActif
  const tient = Boolean(id && objets[id])
  b.classList.toggle('est-vide', !tient)
  $('sacocheCompte').textContent = String(dansLaSacoche().length)
  b.title = tient ? `${objets[id].nom} — ouvrir la sacoche (S)` : 'Sacoche (S)'
  if (!tient) return
  const icone = document.createElement('span')
  icone.className = `objet__${objets[id].icone}`
  creux.append(icone)
}

function ecritEtiquette() {
  /* Le carnet ouvert a sa propre cible : un jeton de l'étal, pas un
     hotspot du décor. Même grammaire d'étiquette que les objets
     (« X sur Y »), chantier 21 §3.3 — c'est le geste qui s'unifie, pas
     seulement son résultat. */
  if (!carnet.hidden) {
    if (!survoleeFiche) {
      etiquette.hidden = true
      curseur.classList.remove('est-sur-cible', 'est-sortie')
      return
    }
    const nom = fiches[survoleeFiche].titre
    etiquette.innerHTML = etat.ficheActive && etat.ficheActive !== survoleeFiche
      ? `<em>${fiches[etat.ficheActive].titre}</em> sur ${nom}`
      : nom
    etiquette.hidden = false
    curseur.classList.add('est-sur-cible')
    return
  }

  if (!survolee || occupe || dialogue) {
    etiquette.hidden = true
    curseur.classList.remove('est-sur-cible', 'est-sortie')
    return
  }
  /* L'étiquette et la forme du curseur annoncent ce que le CLIC GAUCHE
     va faire — sans forçage au HUD, le verbe principal de la cible. Sans
     ça le geste devient une devinette, et le contextuel ne vaut mieux
     que le HUD que s'il se lit avant de cliquer. La bulle de « parler »
     apparaît donc en survolant quelqu'un, sans rien avoir choisi. */
  const ctx = contexte()
  const verbe = etat.verbe ?? verbePrincipal(scene, survolee, ctx)
  curseur.dataset.verbe = verbe
  const nom = nomDe(scene, survolee, { ...ctx, verbe })
  /* Chantier 42, `PLAN_LISIBILITE.md` §3.2-3.3 : `sortie` est une donnée
     posée par l'auteur de la cible, pas une déduction du moteur (`va:`
     est rendu par la réaction, souvent sous condition). Une cible qui
     porte `sortie` allume le curseur en flèche quel que soit le verbe
     actif — c'est une propriété de la CIBLE, pas du geste — et
     l'étiquette ne bascule sur « sortir » que si le verbe en cours est
     bien celui qui ferait sortir (`utiliser`), sans objet ni fiche en
     main. */
  const cible = scene.hotspots[survolee]
  const enSortie = Boolean(cible?.sortie) && !etat.objetActif && !etat.ficheActive
  curseur.classList.toggle('est-sortie', enSortie)
  if (etat.objetActif) {
    etiquette.innerHTML = `<em>${objets[etat.objetActif].nom}</em> sur ${nom}`
  } else if (enSortie && verbe === 'utiliser') {
    /* La destination ne se dit que si elle est CONNUE (une chaîne fixe,
       pas `true`) et déjà VISITÉE — sinon on nomme la porte, pas ce
       qu'elle cache (§3.3, point 3 : « on ne divulgue pas la carte »). */
    const dest = typeof cible.sortie === 'string' ? cible.sortie : null
    etiquette.innerHTML = dest && (etat.visites[dest] ?? 0) > 0
      ? `sortir · vers ${NOMS_LIEUX[dest] ?? dest}`
      : `sortir · ${nom}`
  } else {
    etiquette.innerHTML = `${verbe} · ${nom}`
  }
  etiquette.hidden = false
  curseur.classList.add('est-sur-cible')
}

/* ── Branchements ────────────────────────────────────────── */

/* ── L'entrée de l'équipe ────────────────────────────────────────────
   Ils arrivent par le bas du cadre, en file. Le CSS fait le mouvement
   (voir `.stage.entre` dans engine.css) ; ici on ne fait qu'armer et
   désarmer l'état de départ.

   Drakk entre les lames sorties — c'est la pose de l'illustration
   d'Anarchy — et les range en arrivant : le temps de l'entrée, il porte
   le sprite `pj-drakk-entree`, dont l'animation `once` se fige sur une
   dernière image identique à la première image de son attente. La
   bascule est donc invisible.

   `setTimeout` et pas `requestAnimationFrame` : le panneau navigateur
   ne composite pas toujours de frames, et un rAF qui ne se déclenche
   jamais laisserait l'équipe hors champ pour de bon. */
const ENTREE = 1150
const FILE = [['p-drakk', 0], ['p-trash', 130], ['p-rabbit', 260], ['p-hercules', 390]]

function faitEntrerLEquipe() {
  /* 30 pixels d'art sous leur place : ils montent depuis le seuil.
     Grille 256 (chantier 8) : cette valeur doit suivre --u dans les
     feuilles de scène, sinon l'entrée glisse sur la mauvaise distance. */
  const bas = (stage.getBoundingClientRect().width / 256) * 30

  for (const [classe, delai] of FILE) {
    const el = decor.querySelector('.' + classe)
    el?.animate(
      [{ translate: `0 ${bas}px`, opacity: 0 }, { translate: '0 0', opacity: 1 }],
      { duration: 550, delay: delai, easing: 'cubic-bezier(.2, .8, .3, 1)' },
    )
  }

  const drakk = decor.querySelector('.p-drakk')
  drakk?.classList.replace('sprite--pj-drakk', 'sprite--pj-drakk-entree')
  setTimeout(() => drakk?.classList.replace('sprite--pj-drakk-entree', 'sprite--pj-drakk'), ENTREE)
}

/* Garde-fou : `flags` (ou `objets`, `visuels`) posé au niveau du hotspot
   au lieu de la réaction est invisible pour le moteur — le verrou devient
   infranchissable sans le moindre message. On le signale au chargement. */
/* `objets` porte DEUX choses qui n'ont que leur nom en commun :

     objets: ['passe', 'creditube']    dans une réaction — ce qu'elle DONNE
     objets: { creditube: (ctx) => … } sur une cible    — ce qu'on lui TEND

   La convention (« objets va DANS la réaction ») ne vise que la première.
   Le contrôle les confondait et criait sur les sept cibles du jeu qui
   portent légitimement une carte objet × cible — `pecheur`, `corps`,
   `lester`, `vedette`, `tireur`, `amarres`, `voilier`. Une console qui
   crie à tort sur du code juste apprend à ne plus la lire, ce qui est
   exactement le contraire de ce que ce garde-fou est là pour faire.

   La forme les sépare sans ambiguïté : la liste de dons est un TABLEAU,
   la carte est un objet. */
function verifieScene() {
  for (const [nom, h] of Object.entries(scene.hotspots ?? {})) {
    for (const cle of ['flags', 'visuels', 'retire', 'fiches'])
      if (cle in h) console.error(`[${scene.markup}] ${nom} : « ${cle} » doit être DANS regarder/utiliser/parler, pas à côté.`)
    if (Array.isArray(h.objets))
      console.error(`[${scene.markup}] ${nom} : « objets » en TABLEAU est une liste de dons — elle va DANS la réaction. Une carte objet × cible s'écrit en objet.`)
    /* Une clé d'objet mal orthographiée ne casse rien : elle n'est
       jamais trouvée, et `resous()` rend le refus générique de la
       règle 11. Le joueur reçoit un bark là où on avait écrit une
       réaction, et rien ne le dit — le même bug silencieux que
       `verifieCarnet()` traque du côté des fiches. */
    else for (const id of Object.keys(h.objets ?? {}))
      if (!(id in objets)) console.error(`[${scene.markup}] ${nom} : objet inconnu — « ${id} ».`)
    /* `principal` désigne le verbe du clic gauche. S'il nomme un verbe
       que la cible ne porte pas, le clic ne rend plus qu'un refus
       générique là où on avait écrit une réaction — et rien ne le dit.
       Une fonction ne se contrôle qu'à l'usage : on ne l'appelle pas au
       chargement, elle lit un état qui n'existe pas encore. */
    if (typeof h.principal === 'string' && !(h.principal in h))
      console.error(`[${scene.markup}] ${nom} : « principal: '${h.principal}' » désigne un verbe que cette cible ne porte pas.`)
  }
}

/* Garde-fou du catalogue d'objets (chantier 67). La sacoche LIT
   `ou` et `regarder` : un objet qui n'en porte pas s'affiche en carte
   vide, ce qui ressemble à un panneau cassé plutôt qu'à un objet
   incomplet. Rien d'autre n'est contrôlé ici — savoir si un objet SERT
   demande de voir les `tient()` dans les corps de fonction, que le
   chargement ne peut pas lire. Cette mesure-là se fait à l'atelier, pas
   dans la console : un garde-fou qui crie à tort sur du code juste
   apprend à ne plus le lire. */
/* Garde-fou de l'équipe. `VUES` se déduit maintenant des fiches : une
   fiche sans `vue` ne casse rien de visible — elle rend `data-vue`
   indéfini, le CSS de lentille ne s'applique plus, et le bloc `vues:`
   du tableau ne se dit jamais. Silencieux, donc à crier. Et pendant
   qu'on y est, un contact dont le `runner` n'existe pas ferait planter
   le rendu du panneau sur `equipe[c.runner].nom`. */
/* Garde-fou des actes. Un tableau sans `acte:` rendrait `undefined`, qui
   diffère de tout : le carton de coupure tomberait à chaque entrée, puis
   plus jamais. Symptôme illisible, cause muette — donc à crier au
   chargement. `null` passe, lui : c'est la déclaration explicite de « ce
   n'est pas un lieu », que seule la carte porte. Un `acte` en fonction ne
   se contrôle pas ici : il lit un état du monde qui n'existe pas encore,
   comme `principal`. */
function verifieActes() {
  for (const [id, s] of Object.entries(scenes)) {
    const declare = s.acte
    if (declare === undefined)
      console.error(`[actes] ${id} ne déclare pas son acte — le carton de coupure tombera à tort.`)
    else if (typeof declare === 'number' && !(declare >= 1 && declare <= 5))
      console.error(`[actes] ${id} déclare l'acte ${declare} — le graphe n'en compte que cinq.`)
    if (!(id in NOMS_LIEUX))
      console.error(`[actes] ${id} n'a pas de nom dans NOMS_LIEUX — son carton s'ouvrirait sur un identifiant.`)
  }
}

function verifieEquipe() {
  for (const [id, r] of Object.entries(equipe))
    if (!r.vue) console.error(`[équipe] ${id} n'a pas de vue — sa lentille ne montrera rien.`)
  for (const [id, c] of Object.entries(contacts))
    if (!(c.runner in equipe)) console.error(`[réseau] ${id} appartient à un runner inconnu — ${c.runner}.`)
}

function verifieObjets() {
  for (const [id, o] of Object.entries(objets)) {
    if (!o.nom) console.error(`[objets] « ${id} » n'a pas de nom.`)
    if (!o.icone) console.error(`[objets] « ${id} » n'a pas d'icône.`)
    if (!o.ou) console.error(`[objets] « ${id} » n'a pas de provenance (« ou »).`)
    if (!o.regarder) console.error(`[objets] « ${id} » n'a rien à montrer quand on le regarde.`)
    if (o.a && !(o.a in equipe)) console.error(`[objets] « ${id} » appartient à un runner inconnu — ${o.a}.`)
  }
}

/* Garde-fou du carnet. Une clé de `presque` se construit en TRIANT les
   deux identifiants : `[a, b].sort().join('|')`. Une clé écrite dans le
   mauvais ordre, ou sur une fiche qui n'existe pas, ne se déclenche
   jamais — et rien ne le dit. Le joueur reçoit un refus générique là où
   on avait écrit une réponse, et personne ne s'en aperçoit.

   Même esprit que `verifieScene()` : on crie au chargement. */
function verifieCarnet() {
  const connues = new Set([...Object.keys(fiches), ...deductions.map((d) => d.donne.id)])
  for (const cle of Object.keys(presque)) {
    const ids = cle.split('|')
    if (ids.length !== 2)
      console.error(`[carnet] « ${cle} » : une clé de presque, c'est deux identifiants séparés par |.`)
    else if (ids.join('|') !== [...ids].sort().join('|'))
      console.error(`[carnet] « ${cle} » : à trier — ${[...ids].sort().join('|')}.`)
    for (const id of ids)
      if (!connues.has(id)) console.error(`[carnet] « ${cle} » : fiche inconnue — ${id}.`)
  }
  for (const d of deductions)
    if (presque[[...d.paire].sort().join('|')])
      console.error(`[carnet] ${d.donne.id} : cette paire a DÉJÀ une déduction, le presque ne sortira qu'après.`)
}

/* Garde-fou du réseau, même esprit. Une clé d'appel mal orthographiée
   ou un contact renvoyant vers une fiche fantôme se tairait sans rien
   dire — exactement le bug que `verifieCarnet()` a trouvé une fois. */
function verifieReseau() {
  const ficheConnue = (id) => id in fiches || deductions.some((d) => d.donne.id === id)
  for (const cle of Object.keys(appels)) {
    const [idContact, idFiche] = cle.split('|')
    if (!(idContact in contacts))
      console.error(`[réseau] « ${cle} » : contact inconnu — ${idContact}.`)
    if (!ficheConnue(idFiche))
      console.error(`[réseau] « ${cle} » : fiche inconnue à poser — ${idFiche}.`)
    const appel = appels[cle]
    if (!ficheConnue(appel.id) && !appel.donne)
      console.error(`[réseau] « ${cle} » : donne « ${appel.id} », qui n'existe nulle part et n'a pas de contenu.`)
    if (!appel.ligne?.length)
      console.error(`[réseau] « ${cle} » : aucune ligne — le contact décrocherait pour ne rien dire.`)
    if (!appel.dejaLigne)
      console.error(`[réseau] « ${cle} » : pas de « dejaLigne » — un rappel retomberait muet.`)
  }
  for (const idContact of Object.keys(contacts))
    if (!refusReseau[idContact]?.length)
      console.error(`[réseau] ${idContact} n'a aucune ligne de refus.`)
}

/* Garde-fou de la barre, même esprit que `verifieReseau()`. Une réponse
   qui pointe une fiche inconnue, ou un runner sans refus, se tairait
   sans rien dire — silencieusement, exactement le bug que ces
   garde-fous existent pour empêcher. */
function verifieBarre() {
  const salle = scenes['tribunal-salle']
  if (!salle?.barre) return
  const ficheConnue = (id) => id in fiches || deductions.some((d) => d.donne.id === id) ||
                               Object.values(appels).some((ap) => ap.id === id)
  for (const [id, brute] of Object.entries(salle.barre.reponses)) {
    if (!ficheConnue(id)) console.error(`[barre] « ${id} » : fiche inconnue.`)
    /* Rang 10 : une réponse peut être une fonction du contexte (`hayden`,
       corrompue ou non par `chimera-avance`). On l'évalue avec l'état du
       moment pour vérifier au moins la branche qu'il produit — ce garde-
       fou n'a jamais prétendu couvrir tous les états possibles, voir
       `verifieReseau()` juste au-dessus. */
    const reponse = typeof brute === 'function' ? brute(contexte()) : brute
    if (!['tient', 'retourne'].includes(reponse.registre))
      console.error(`[barre] « ${id} » : registre inconnu — ${reponse.registre}.`)
  }
  for (const runner of Object.keys(equipe))
    if (!salle.barre.refus[runner]?.length)
      console.error(`[barre] ${runner} n'a aucune ligne de refus.`)
}

/* Bug trouvé en vérifiant le réseau dans le navigateur, pas causé par
   lui : une déduction du carnet (`frotte()`) ou une fiche d'appel
   (`appelle()`) s'injecte dans `fiches` — un DICTIONNAIRE, pas
   sérialisé — au moment où elle est gagnée. Seul son identifiant vit
   dans `etat.fiches`, qui LUI est sauvegardé. Une reprise (F5) restaure
   donc l'identifiant sans son contenu, et `rendCarnet()`/`rendReseau()`
   sautent silencieusement la fiche (`if (!fiches[id]) continue`) — un
   trou qu'aucun message ne signale. On réinjecte depuis les deux
   sources juste après `restaure()`. */
function reconstruitFiches() {
  for (const d of deductions)
    if (etat.fiches.has(d.donne.id) && !fiches[d.donne.id]) fiches[d.donne.id] = d.donne
  for (const appel of Object.values(appels))
    if (appel.donne && etat.fiches.has(appel.id) && !fiches[appel.id]) fiches[appel.id] = appel.donne
}

/* Rebranché à chaque `charge()` : `decor.innerHTML` vient d'être
   remplacé, donc chaque cible est un élément NEUF qui n'a jamais eu de
   listener. Rien ici ne touche à `#stage` lui-même — voir
   `brancheStage()`, plus bas, pour la raison précise. */
function brancheDecor() {
  for (const cible of decor.querySelectorAll('[data-hotspot]')) {
    cible.addEventListener('pointerenter', () => { survolee = cible.dataset.hotspot; ecritEtiquette() })
    cible.addEventListener('pointerleave', () => { survolee = null; ecritEtiquette() })
  }
}

/* BUG TROUVÉ EN VÉRIFIANT LE CHANTIER 13, PAS CAUSÉ PAR LUI : ces
   quatre écouteurs vivaient dans `brancheDecor()`, rebranchés à CHAQUE
   `charge()` — mais `#stage`, contrairement à `#decor`, n'est jamais
   recréé : son `innerHTML` n'est jamais vidé, lui. Chaque tableau
   chargé empilait donc un écouteur de plus sur le même élément, sans
   qu'aucun ne soit jamais retiré. Un clic après N tableaux chargés
   déclenchait `joue()` N fois d'affilée.

   Invisible depuis le début du projet parce que presque tous les
   effets de bord sont idempotents sous répétition — `pose()`, `classe()`
   et `marque()` posent dans des `Set`, `donne()` vérifie déjà la
   présence avant d'ajouter. Le seul qui ne l'est PAS, c'est
   `avance(minutes)` : il ADDITIONNE à chaque appel. Tant qu'aucun
   tableau revisitable ne portait de coût en minutes sur une cible, la
   duplication ne coûtait qu'une ligne de texte répétée — remarquée,
   sans doute, jamais assez pour qu'on cherche plus loin. La carte
   (chantier 13) est la première mécanique du jeu où REVENIR sur un
   tableau déjà chargé est le geste normal, ET où un clic coûte des
   minutes : elle a rendu visible ce que le reste du jeu cachait déjà.

   Trouvé en rejouant bar → carte → quai → carte → bar : la seconde
   fois qu'un nœud de la carte se cliquait, l'horloge avançait de plus
   que le coût affiché.

   Branché UNE SEULE FOIS, depuis `demarre()` — jamais depuis `charge()`. */
function brancheStage() {
  stage.addEventListener('pointermove', (e) => {
    const boite = stage.getBoundingClientRect()
    const x = e.clientX - boite.left
    const y = e.clientY - boite.top
    curseur.hidden = false
    curseur.style.transform = `translate3d(${x}px, ${y}px, 0)`
    etiquette.style.transform = `translate3d(${x}px, ${y}px, 0) translate(1.4cqw, 1.2cqw)`
  })

  stage.addEventListener('pointerleave', () => { curseur.hidden = true; survolee = null; ecritEtiquette() })

  stage.addEventListener('click', (e) => {
    if (!carnet.hidden || !journal.hidden || !reseau.hidden || !gardees.hidden || !sacoche.hidden || !equipeFiches.hidden) return
    if (occupe) return suivante()
    if (dialogue) return
    const cible = e.target.closest('[data-hotspot]')
    if (!cible) {
      if (etat.objetActif) { etat.objetActif = null; rafraichit() }
      return
    }
    /* Le verbe se résout dans `resous()` : sans forçage au HUD, c'est le
       verbe principal de la cible. Rien à imposer ici. */
    joue(cible.dataset.hotspot)
  })

  /* Clic droit = Regarder, comme il se doit. */
  stage.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if (occupe || dialogue) return
    const cible = e.target.closest('[data-hotspot]')
    if (!cible) return
    const memoire = { verbe: etat.verbe, objet: etat.objetActif }
    etat.verbe = 'regarder'
    etat.objetActif = null
    joue(cible.dataset.hotspot)
    etat.verbe = memoire.verbe
    etat.objetActif = memoire.objet
    rafraichit()
  })
}

function brancheHud() {
  for (const bouton of document.querySelectorAll('.runner'))
    bouton.addEventListener('click', () => selectionne(bouton.dataset.runner))
  /* « Rejouer » repartait d'un `location.reload()` qui rechargeait tout
     droit dans l'automatique qu'on venait de vivre. Il efface d'abord
     cette automatique — repartir à neuf redevient possible. */
  $('reprise').addEventListener('click', () => {
    effaceSauvegarde()
    location.reload()
  })
  $('boutonCarnet').addEventListener('click', basculeCarnet)
  /* Clic dans le vide de l'étal ou de la table = repose la fiche, sans
     fermer le panneau — le même geste qu'un clic dans le vide du décor
     repose un objet (chantier 21, §3.3 du plan). Les jetons stoppent
     déjà leur propagation (`creeJeton`), donc ce gestionnaire ne voit
     que les clics qui ne visaient rien. */
  carnet.addEventListener('click', () => {
    if (!etat.ficheActive) return
    etat.ficheActive = null
    $('carnetAide').textContent = AIDE_VIDE
    $('carnetAide').classList.remove('est-refus')
    rafraichit()
  })
  /* Clic dans le vide de la sacoche : repose l'objet sans fermer, le
     même geste qu'au carnet. Les jetons stoppent leur propagation. */
  sacoche.addEventListener('click', () => {
    if (!etat.objetActif) return
    etat.objetActif = null
    rendSacoche()
    rafraichit()
  })
  equipeFiches.addEventListener('click', () => {
    if (!etat.objetActif) return
    etat.objetActif = null
    rendEquipe()
    rafraichit()
  })
  /* La main OUVRE, toujours — qu'elle soit pleine ou vide. Elle a
     porté un temps le second métier « reposer ce qu'on tient », et deux
     métiers sur un bouton en font un qu'on n'ose plus cliquer. Reposer
     a déjà trois gestes qui ne servent qu'à ça : Échap, le vide du
     décor, et le jeton qu'on repose dans le panneau. */
  $('main').addEventListener('click', basculeSacoche)
  $('boutonJournal').addEventListener('click', basculeJournal)
  $('boutonReseau').addEventListener('click', basculeReseau)
  $('boutonGardees').addEventListener('click', basculeGardees)
  $('boutonAllure').addEventListener('click', changeAllure)
  $('boutonDepose').addEventListener('click', () => {
    if (etat.ficheActive) depose(etat.ficheActive)
  })
  $('boutonGarder').addEventListener('click', () => {
    if (!estAuRepos()) return
    garde()
    rendGardees()
  })

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      etat.objetActif = null
      /* Échap repose ce qu'on a en main — un objet, une fiche, et
         maintenant un verbe forcé. La même touche pour « laisse tomber ». */
      etat.verbe = null
      if (!carnet.hidden) basculeCarnet()
      else if (!journal.hidden) basculeJournal()
      else if (!reseau.hidden) basculeReseau()
      else if (!gardees.hidden) basculeGardees()
      else if (!sacoche.hidden) basculeSacoche()
      else if (!equipeFiches.hidden) basculeEquipe()
      else rafraichit()
    }
    if (e.key === 'c' || e.key === 'C') basculeCarnet()
    if (e.key === 'j' || e.key === 'J') basculeJournal()
    if (e.key === 'r' || e.key === 'R') basculeReseau()
    if (e.key === 'g' || e.key === 'G') basculeGardees()
    if (e.key === 's' || e.key === 'S') basculeSacoche()
    if (e.key === 'e' || e.key === 'E') basculeEquipe()
    if (e.key === 'a' || e.key === 'A') changeAllure()
    /* LES CHIFFRES ONT DEUX MÉTIERS, et les deux modes s'excluent : dans
       un dialogue ils désignent une réplique, hors dialogue ils forcent
       un verbe. Le dialogue passe en premier — c'est là qu'on a les
       mains sur les chiffres, et un forçage de verbe n'y sert à rien. */
    const chiffre = Number(e.key)
    if (dialogue && chiffre >= 1 && chiffre <= 9) {
      /* Le `return` vaut pour TOUT le temps du dialogue, pas seulement
         quand la liste est à l'écran : entre deux répliques la boîte est
         masquée une seconde, et un chiffre tapé là forçait un verbe en
         douce — un mode changé sans que rien ne le dise, découvert en
         vérifiant ceci dans le navigateur. On est en conversation ; les
         chiffres n'y ont qu'un métier, et sinon ils ne font rien. */
      if (boiteChoix.hidden) return
      const sujet = sujetsOfferts()[chiffre - 1]
      if (sujet) {
        e.preventDefault()
        boiteChoix.hidden = true; choisit(sujet)
      }
      return
    }
    /* Même bascule qu'au bouton : la touche déjà tenue relâche. */
    const force = { 1: 'regarder', 2: 'utiliser', 3: 'parler' }[e.key]
    if (force) { etat.verbe = etat.verbe === force ? null : force; etat.objetActif = null; rafraichit() }
    /* Chiffres = verbes, F1-F4 = runners. Le clavier fait tout. */
    const rangs = ['hercules', 'trash', 'rabbit', 'drakk']
    const f = e.key.match(/^F([1-4])$/)
    if (f) { e.preventDefault(); selectionne(rangs[+f[1] - 1]) }
    /* Chantier 42, `PLAN_LISIBILITE.md` §3.4 : maintenir Espace entoure
       les 170 `data-hotspot` du tableau — un contour, jamais un nom ni
       un verbe (§1). `e.preventDefault()` empêche le défilement de page
       ET l'activation d'un bouton qui aurait le focus (Espace clique un
       <button> par défaut) ; `!e.repeat` évite de re-basculer la classe
       à chaque répétition de touche pendant l'appui. */
    if (e.code === 'Space') {
      e.preventDefault()
      if (!e.repeat) stage.classList.add('revele-cibles')
    }
  })

  addEventListener('keyup', (e) => {
    if (e.code === 'Space') stage.classList.remove('revele-cibles')
  })
  /* Alt-tab pendant l'appui ne renvoie jamais de `keyup` : sans ce filet,
     le contour resterait affiché jusqu'à la prochaine pression. */
  addEventListener('blur', () => stage.classList.remove('revele-cibles'))
}

/* Le rideau dit ce qui s'est passé, pas une formule. Il lit l'état du
   monde : c'est le seul bilan que le prototype sait encore rendre, et
   c'est déjà là qu'on voit si les choix ont porté. */
const BILAN = [
  ['lester-blesse',     'Lester a une manche ouverte du coude à l’épaule. Il dit que ce n’est rien.'],
  /* La ligne nommait Drakk. Depuis que `sait-ou` paie (le perchoir lu
     par Drakk, le creux violet lu par Trash), n'importe qui peut avoir
     placé l'équipe — et le bilan racontait alors le mérite de quelqu'un
     qui n'avait rien fait. Ce qui compte n'est pas qui a donné l'ordre,
     c'est que quelqu'un ait su où regarder. */
  ['toralf-manque',     'Deux impacts dans le rouf, et personne devant. Quelqu’un avait su où regarder.'],
  /* Nœud 2, chantier 50 : la ligne couvrait la seule cause vedette
     (`vedette.objets.contrat`, `retour.js`). Le portique peut désormais
     poser le même drapeau (l'arme de Wilson, `tribunal.js`) — reformulée
     pour couvrir les deux causes, pas doublée. */
  ['star-nous-connait', 'La Lone Star a de quoi vous relier au mort du Sunnyside — son bateau, ou son arme. Ça se paiera.'],
  /* Nœud 4, chantier 49. Échec rétrospectif : personne ne l'a senti au
     quai, c'est tout le point du nœud (`PLAN_NOEUDS_DE_CHAOS_FICHES`
     § II). */
  ['pecheur-a-vu', 'Le pêcheur du quai vous a regardés partir sans un mot. Le mot, il l’a gardé pour Cisco.'],
  /* Nœud 2, chantier 50 : deux orphelins branchés. Le geste propre reste
     propre — le garde prend le dépôt sans le scanner ; le clic nu se
     paie, et le numéro de série se lit d'un coup d'œil. */
  ['arme-laissee', 'Vous avez tendu l’arme de Wilson avant qu’on ait à la demander. Personne ne l’a scannée.'],
  ['arme-saisie',  'Le détecteur a trouvé l’arme de Wilson dans une poche. Le garde l’a prise sans discuter — mais il a lu le numéro avant vous.'],
  ['trace-matricielle', 'Un ordre de transfert porte une heure que personne n’a signée.'],
  ['esprit-demande',    'Quelque chose vous a suivis jusqu’à Tacoma sans rien demander. Ça aussi, ça se paie.'],
  ['lester-teresa',     'Vous savez comment elle s’appelait, et lui aussi. Vous êtes les seuls.'],
  ['lester-temoigne',   'Lester a décidé de parler à la barre. Personne ne l’a acheté : on l’a écouté.'],
  ['conf-perdue',       'Vous lui avez proposé de l’argent. Il ne l’a pas pris, et il n’a pas oublié.'],
  ['camera-aveugle',    'Une caméra municipale a filmé un plafond pendant deux heures.'],
  /* La récusation, chantier 20. */
  ['aveu-guilde',       'Vous avez avoué, à la barre, avoir soudoyé votre propre témoin. Le juge a arrêté de prendre des notes à ce moment précis.'],
  /* Arbitrage du 28 août (audit reroute § IV.1) : la note du juge cesse
     d'être un chiffre en tête de bilan et devient une phrase à sa place,
     ici, au tribunal. Le compteur `etat.credibilite` reste : il cesse
     seulement d'être montré. N'apparaît que si on a vraiment plaidé au
     moins une fois — sans `depose:*`, « le juge » n'existe pour
     personne. */
  [() => [...etat.flags].some(f => f.startsWith('depose:')),
   () => etat.credibilite <= 2
     ? 'Le juge a écouté. Il a pris deux notes, et pas au moment où vous l’espériez.'
     : etat.credibilite <= 5
       ? 'Il vous a suivi une bonne partie du chemin. Pas jusqu’au bout.'
       : 'Il n’a pas eu besoin qu’on lui répète.'],
  /* Neuf heures à la laverie. Le tir part toujours ; le bilan dit ce que
     la pièce lui a donné à lire. */
  ['laverie-manquee',   'Deux trous dans le carrelage d’une laverie, à un mètre de personne. La pièce était noire, chaude et aveugle.'],
  ['lester-coupe',      'Lester a la joue ouverte par un éclat de baie vitrée. Il n’a pas crié.'],
  ['lester-touche-laverie', 'On lui a tiré dessus une seconde fois, dans une pièce éclairée, et cette fois on ne l’avait rien fait pour l’empêcher.'],
  /* L'abordage, chantier de rang 4. */
  ['abordage-echec', 'Un homme de Chimera a mis un pied sur le pont. Drakk l’a remis à l’eau. Personne n’a tiré.'],
  ['dette-esprit',   'Ce qui vous cache sous la coque a rendu deux services dans la même nuit. Ça se paiera — ça a été dit deux fois.'],
  ['cisco-contact',  'Cisco a rejoint votre réseau. Il n’a pas demandé pourquoi vous en aviez besoin.'],
  /* La planque de Drakk, chantier 36 (`PLAN_PLANQUES.md` § 5). */
  ['herwick-touche', 'Un vieil antiquaire a pris une balle destinée à quelqu’un d’autre.'],
  ['drakk-brise',    'Drakk a amené la guerre chez le seul homme qui lui ait ouvert une porte.'],
  ['herwick-epargne', 'On n’a rien demandé à un homme qui saignait.'],
  ['herwick-soigne', 'Trash a soigné Herwick avant de trancher quoi que ce soit. Ça n’a coûté qu’à l’horloge.'],
  /* Le cabinet de Sarah — une halte depuis le chantier 39, plus une
     planque (`PLAN_PLANQUES.md` § 3.6) : `sarah-brulee` et
     `patient-touche` ne se posent plus, il n'y a plus de tir ici. */
  ['lester-soigne',  'Il se tient droit à la barre : quelqu’un a enfin recousu ce bras correctement.'],
  /* Le sous-sol de Duke, chantier 37 (`PLAN_PLANQUES.md` § 5). */
  ['ganger-touche', 'Il avait l’âge de Lester.'],
  ['dette-duke',    'On doit quelque chose à un gang, et il s’en souviendra.'],
  /* La loge de Trash, chantier 40 (`PLAN_PLANQUES.md` § 5) — les deux
     lignes exactes du plan, reprises telles quelles. */
  ['loge-brulee', 'Trash n’a plus d’endroit à lui, et quelqu’un sait à quoi il ressemble de l’autre côté.'],
  ['trash-trace', 'Ce n’est pas la loge qu’on a trouvée. C’est lui.'],
  /* Le tripot d'Hercules, chantier 41 (`PLAN_PLANQUES.md` § 5) — les
     deux lignes exactes du plan, reprises telles quelles. */
  ['hercules-demasque', 'On sait maintenant pourquoi il a quitté l’administration, et ce n’est pas sa version.'],
  ['tripot-brule', 'Une salle de jeu ferme, et ceux qui la tenaient savent qui a amené ça.'],
  ['hercules-touche', 'Il a pris un coup qui n’était pas pour lui, dans sa propre salle de jeu.'],
  /* Le local de répétition, chantier 28 — le premier bilan qui parle
     de l'acte IV. Les quatre serrures s'y relisent : ce qu'on a obtenu,
     ce qu'on a fermé, et ce que le quartier a fait de notre passage. */
  ['su:hayden',      'Vous avez un nom. Hayden Telestrian — et il ne sait pas encore que quelqu’un l’a écrit correctement.'],
  ['mark-convaincu', 'Quelqu’un a fini par demander à Mark comment elle était. Il avait attendu trois jours.'],
  ['mark-ferme',     'Vous avez posé deux mille nuyens à côté d’un garçon de dix-neuf ans qui tenait la seule chose qu’elle ait écrite.'],
  ['psych-paye',     'Psych a parlé contre un créditube, en huit secondes. Il l’aurait fait pour rien : il suffisait de demander pour elle.'],
  ['psych-ecoute',   'On a demandé à Psych comment elle dansait. C’était la bonne question, et elle ne coûtait rien.'],
  ['nova-parle',     'Nova a dit à quatre inconnus ce qu’elle n’avait dit à personne. Elle tient toujours la porte.'],
  ['nita-ferme',     'Une permanente de l’ORC a demandé pour qui vous travailliez. Ne pas répondre était déjà une réponse.'],
  ['orc-contact',    'Amelia Brown prend vos appels. Ça ne s’achète pas — ça se recommande.'],
  ['tir-prevenu',    'Le quartier a prévenu les elfes du Tír que quelqu’un d’autre posait des questions. C’est pour ça qu’ils avaient laissé une carte.'],
  /* Nœud 3, chantier 54 — la patronne du pressing, la scène pilote.
     Mutuellement exclusifs : un seul sujet ferme la conversation. */
  ['pressing-parle', 'La patronne du pressing savait qui payait le loyer, et elle a choisi de ne pas décrocher. Ça ne se demande pas deux fois.'],
  ['pressing-mefie', 'Vous avez menti à une femme qui enterre une inconnue depuis trois jours. Elle a décroché avant que vous ayez fini de mentir.'],
  /* L'appartement de Teresa, chantier 26 — la première ancre. */
  ['su:lester-innocent', 'La preuve qu’il n’a rien fait était consultable depuis trois jours, pour qui avait un numéro de contrat à quatre chiffres.'],
  ['maglock-journal',    'Deux hommes sont entrés chez elle après sa mort et sont ressortis ensemble. C’est écrit en clair, chez un serrurier de Puyallup.'],
  ['trace-archive',      'Une archive commerciale a été lue par quelqu’un qui n’y avait pas droit. Ça se verra un jour, et pas aujourd’hui.'],
  ['rubans-intacts',     'Trois jours de scellés, pas une rupture. Personne de la Lone Star n’est jamais revenu sur les lieux.'],
  ['valise-faite',       'Sa valise était aux trois quarts faite. Elle n’a pas été surprise par sa mort — elle a été rattrapée par son départ.'],
  ['tir-retour',         'Les elfes du Tír sont retournés voir les quatre amis. Ils y sont allés parce que vous y étiez allés.'],
  /* Waters Sound, chantier 43 — le levier, pas une déduction de plus.
     Les deux flags sont mutuellement exclusifs : le coffre ne se
     résout qu'une fois par partie (`waters.js`, `coffre.utiliser`). */
  ['waters-convaincu',   'Un vieil homme qui n’aimait personne vous a donné, de lui-même, ce qu’il gardait depuis six mois.'],
  ['bombe-declenchee',   'Une bombe matricielle a fait ce pour quoi Waters l’avait payée. L’enregistrement existe, à moitié — et White_Rabbit en garde une brûlure au poignet.'],
  /* La carte de l'acte IV, chantier 17 réécrit. */
  ['enquete-close',      'Vous avez décidé vous-mêmes du moment où ça suffisait. Personne ne vous a poussés dehors.'],
  /* Renfield, rang 9 (`PLAN_TRAME_ACTES_III_IV.md` §10). `renfield-croise`
     seul n'a pas sa ligne : rester silencieux n'est pas un événement, et
     la rencontre elle-même se lit déjà dans le carnet et le dialogue. */
  ['renfield-retourne',  'Un vieux chaman a promis d’aller lui-même dire aux parents d’Hayden ce que vous saviez. Vous l’avez cru sur parole.'],
  /* D9, tranché le 2026-08-25 (rang 10, `PLAN_TRAME_ACTES_III_IV.md`
     §10) : le front Chimera, symétrique à celui du Tír (`tir-prevenu`/
     `tir-retour`), avance quand on appelle un contact pendant l'acte IV.
     `chimera-avance` seul suffisait ici : sa conséquence à la barre se
     lit déjà dans le dialogue de la 2ᵉ audience (`tribunal-salle.js`). */
  ['chimera-alerte', 'Un premier appel, pendant l’enquête. Quelque part, quelqu’un a noté qui posait la question.'],
  ['chimera-avance', 'Un second appel, et cette fois l’information a voyagé plus vite que vous.'],
  /* Chantier 48.b (`hayden-conteste`, posé `tribunal-salle.js:445` dans
     la branche `chimera-avance` de la réponse `hayden`) : le drapeau
     lui-même n'était relu par rien — la salle l'entend une fois, le
     bilan n'en gardait pas trace. */
  ['hayden-conteste', 'Le témoin qui devait confirmer le nom n’est jamais entré dans la salle. Quelqu’un lui avait parlé avant vous.'],
  /* Nœud 1, chantier 53 : le rattrapage n'avait pas de ligne — la
     décision prise chez Renfield, des tours plus tôt, ne se lisait qu'à
     la barre, une fois. */
  ['renfield-temoigne', 'Le témoin acheté ne s’est pas présenté, et personne dans sa famille n’a demandé pourquoi. Un vieil homme avait déjà parlé, trois nuits plus tôt.'],
]

function tombeRideau() {
  /* Depuis le chantier 20, la nuit ne s'arrête plus à la planque : elle
     s'arrête à la récusation, au tribunal — puis, depuis le chantier 4,
     à l'abordage qu'elle ouvre, et depuis le chantier 28 au LOCAL DE
     RÉPÉTITION, premier tableau de l'acte IV, où l'abordage mène
     maintenant (`retour.js`, `barre.utiliser`). Les branches du dessous
     restent en secours pour un `fin: true` plus ancien qu'aucun chemin
     du jeu ne déclenche plus — `abordage-passe` en fait désormais
     partie — mais qu'une sauvegarde antérieure pourrait encore
     porter. */
  $('rideauLigne').textContent = a('denouement-verite')
    ? (a('renfield-retourne')
        ? 'Un nom, une preuve, et un vieux chaman assez lucide pour avoir choisi la vérité contre vingt ans de loyauté. Il a déjà tout dit aux parents d’Hayden. Vous, vous venez de le dire au juge.'
        : 'Un nom, et de quoi montrer qu’on savait déjà. Il a poussé la porte de la salle avec ça derrière lui, et pour la première fois de l’affaire ce n’est pas lui qui avait quelque chose à expliquer.')
    : a('denouement-tractation')
    ? 'Personne n’a rien dit à voix haute. Vous avez posé, sur la table, de quoi faire dérailler une carrière — et attendu de voir qui céderait le premier.'
    : a('denouement-echec')
    ? (a('chimera-avance')
        ? 'Vous êtes remontés vers Downtown les mains presque vides. Chimera, lui, n’avait pas besoin de grand-chose de plus.'
        : 'Vous êtes remontés vers Downtown à peu près comme vous en étiez partis. Personne n’a rien prouvé à personne — et ça a suffi à personne.')
    : a('appart-quitte')
    ? (a('su:lester-innocent')
        ? 'Ils savaient. Depuis le premier jour, ils savaient, et ils ont mis un gamin de dix-huit ans dans une navette de huit heures. Il reste à le prouver devant quelqu’un.'
        : 'Une pièce et demie au-dessus d’un pressing, vide depuis trois jours. Vous en ressortez avec l’odeur du détachant et pas grand-chose d’autre.')
    : a('local-quitte')
    ? (a('su:hayden')
        ? 'Un prénom écrit à l’oreille, un nom de famille, et un homme au bout des deux. L’enquête a commencé, et elle a quelqu’un à chercher.'
        : 'Trois jours, quatre personnes qui l’ont connue, et vous ressortez de Loveland avec ce que vous y avez apporté.')
    : a('abordage-passe')
    ? 'Le goulet, une seconde fois. Lester est vivant, McNeil est devant, et l’enquête, elle, n’a pas commencé.'
    : a('recuse-abri')
      ? 'Le juge s’est récusé. L’audience est repoussée de plusieurs jours — et ce n’est pas fini.'
      : a('recuse-contrat')
        ? 'Le juge s’est récusé, l’audience est repoussée, et vous rentrez : le contrat était rempli, il ne vous doit rien de plus.'
        : a('lester-temoigne')
          ? 'Neuf heures moins le quart. Il pousse la porte le premier, et il sait ce qu’il va dire.'
          : a('goulet-passe')
            ? 'Neuf heures moins le quart. Il sera vivant à dix heures. C’était le contrat.'
            : 'La nuit s’arrête ici — pour l’instant.'
  const lignes = BILAN
    .filter(([f]) => typeof f === 'function' ? f() : a(f))
    .map(([, t]) => typeof t === 'function' ? t() : t)
  $('rideauBilan').textContent = lignes.length
    ? lignes.join('\n')
    : 'Rien ne vous suit. C’est plus rare que ça n’en a l’air.'
  rideau.hidden = false
}

demarre()
