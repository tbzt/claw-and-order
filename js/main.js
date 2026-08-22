/* Boucle de jeu : survol, clic, texte, dialogue, inventaire.
   Ce fichier ne connaît aucun contenu — il ne sait que faire tourner
   une scène qu'on lui donne. */

import { etat, a, pose, donne, retire, marque, classe, sait, contexte, avance, formateHeure,
         sauvegarde, sauvegardeLisible, effaceSauvegarde, restaure, ficheslues } from './state.js'
import { scenes, depart } from './data/scenes.js'
import { objets } from './data/objets.js'
import { resous, nomDe, enLignes } from './interact.js'
import { equipe } from './data/equipe.js'
import { sujetsOuverts, estEpuise, retiens, entree } from './dialogue.js'
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
const carnet = $('carnet')
const reseau = $('reseau')
const portrait = $('portrait')
const journal = $('journal')
const repriseAuto = $('repriseAuto')

/* Qui a un visage. Un PNJ sans portrait parle quand même : la bulle
   suffit, et on ne dessine pas un visage pour une voix de radio. */
const VISAGES = {
  mccarthy: 'McCarthy',
  lester: 'Lester',
  gardien: 'Le gardien',
  barman: 'Le barman',
  renfield: 'Renfield',
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
const nomDuLocuteur = (qui) => equipe[qui]?.nom ?? VISAGES[qui] ?? contacts[qui]?.nom ?? ''

/* IL PARLE, ET ÇA SE VOIT.
   Le portrait d'un PNJ s'anime pendant qu'il parle. Les runners n'en ont
   pas, et il leur manquait donc la seule chose que le portrait apportait :
   qu'on VOIE qui parle. Chaque planche de runner porte deux images de
   parole en bout ; `.parle` les joue (voir `.pj.parle` dans engine.css).

   Un seul à la fois : celui qui vient de se taire retrouve son attente. */
function faitParler(qui) {
  seTait()
  if (equipe[qui]) decor.querySelector(`.p-${qui}`)?.classList.add('parle')
}

function seTait() {
  for (const el of decor.querySelectorAll('.pj.parle')) el.classList.remove('parle')
}


let file = []
let quiParle = 'recit'
let apresFile = null
let occupe = false
let minuteur = 0
let dialogue = null
let survolee = null
let derniereLigne = ''
/* La fiche posée dans le réseau, en attente d'un contact. Distincte de
   `etat.ficheActive` (le carnet) : les deux panneaux ne se ferment pas
   l'un l'autre, et partager l'état aurait fait retomber une sélection
   d'un panneau dans l'autre sans que rien ne le justifie. */
let ficheAppelActive = null

/* ── Chargement d'un tableau ─────────────────────────────────
   Le moteur ne connaît aucun décor : il en charge un par son nom, vide
   ce qui traînait, et rebranche. Changer de tableau ne réinitialise
   rien — l'inventaire, les flags et le runner actif traversent. */

let scene = scenes[depart]

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
  clearTimeout(minuteur)
  dialogue = null
  survolee = null
  etat.visuels.clear()
  decor.innerHTML = await (await fetch(scene.markup)).text()
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

const NOMS_LIEUX = {
  bar: 'Le Claw & Order',
  quai: 'Le Sunnyside Beach Park',
  'quai-voilier': 'Le voilier, de près',
  greffe: 'Le greffe de nuit',
  retour: 'Le détroit',
  planque: 'La laverie',
  tribunal: 'Le palais de justice',
  'tribunal-salle': 'La salle d’audience',
  carte: 'La carte',
}

/* Au démarrage, une automatique lisible se PROPOSE, elle ne se charge
   pas d'office (§4) : rouvrir l'onglet pour recommencer une nuit ne
   doit pas rejeter le joueur au milieu de celle d'hier. */
function proposeReprise(donnees) {
  $('repriseAutoLieu').textContent =
    `${NOMS_LIEUX[donnees.ou] ?? donnees.ou} — ${formateHeure(donnees.heure)}`
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
  verifieCarnet()
  verifieReseau()
  verifieBarre()
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
const VUES = { hercules: 'physique', trash: 'astrale', rabbit: 'ra', drakk: 'tactique' }

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
  if (etat.actif === idRunner) return
  etat.actif = idRunner
  etat.astral = VUES[idRunner] === 'astrale'
  rafraichit()

  /* On peut changer de runner EN PLEIN DIALOGUE, et la liste des sujets
     se recompose : c'est là qu'on voit que Trash a une question que
     Drakk n'aura jamais. Interdire la bascule ici rendrait la mécanique
     invisible au moment précis où elle compte. */
  if (dialogue) return montreChoix()

  const decouverte = scene.vues?.[VUES[idRunner]]
  if (decouverte && !a(`vue:${idRunner}`)) {
    pose(`vue:${idRunner}`)
    dis(decouverte, idRunner)
  }
}

/* ── Dialogue ────────────────────────────────────────────── */

function ouvreDialogue(idPnj) {
  dialogue = scene.dialogues[idPnj]
  dis(entree(dialogue, idPnj), dialogue.qui, montreChoix)
}

function montreChoix() {
  boiteChoix.replaceChildren()
  for (const sujet of sujetsOuverts(dialogue)) {
    const bouton = document.createElement('button')
    bouton.textContent = sujet.titre
    if (estEpuise(sujet)) bouton.classList.add('est-epuise')
    bouton.addEventListener('click', (e) => {
      e.stopPropagation()
      choisit(sujet)
    })
    boiteChoix.append(bouton)
  }
  boiteChoix.hidden = false
  rafraichit()
}

function choisit(sujet) {
  boiteChoix.hidden = true
  retiens(sujet)

  if (sujet.objets) donne(...sujet.objets)
  if (sujet.visuels) marque(...sujet.visuels)
  if (sujet.fiches && classe(...sujet.fiches)) signaleCarnet()
  const qui = dialogue.qui
  if (sujet.fin) {
    dialogue = null
    dis(sujet.texte ?? [], qui, sujet.va ? () => charge(sujet.va) : null)
    return
  }
  dis(sujet.texte, qui, montreChoix)
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

function basculeCarnet() {
  const ouvert = carnet.hidden
  carnet.hidden = !ouvert
  etat.ficheActive = null
  $('boutonCarnet').setAttribute('aria-pressed', String(ouvert))
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

  if (trouvee) {
    fiches[trouvee.donne.id] = trouvee.donne
    classe(trouvee.donne.id)
    pose(`su:${trouvee.donne.id}`)      /* le seul effet : la parole s'ouvre */
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
  rendCarnet()
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

/* Le bouton d'une fiche, partagé entre le carnet et le réseau — même
   carte, deux panneaux qui ne lui font pas dire la même chose. */
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

function rendCarnet() {
  peintProgres()
  const grille = $('carnetGrille')
  grille.replaceChildren()
  for (const id of etat.fiches) {
    if (!fiches[id]) continue
    grille.append(creeFicheBouton(id, etat.ficheActive === id, () => {
      if (!etat.ficheActive) { etat.ficheActive = id; return rendCarnet() }
      if (etat.ficheActive === id) { etat.ficheActive = null; return rendCarnet() }
      frotte(etat.ficheActive, id)
    }))
  }
  if (!etat.fiches.size)
    grille.innerHTML = '<p class="carnet__vide">Rien encore. Une fiche se mérite.</p>'

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

  const reponse = barre.reponses[idFiche]
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
    const b = document.createElement('button')
    b.className = 'contact'
    b.classList.toggle('est-indisponible', etat.actif !== c.runner)
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
  /* Le choix du runner compte hors du décor aussi : Alicia ne décroche
     pas pour Drakk. Le dire ici enseigne la règle sans faire échouer
     l'appel en silence. */
  if (etat.actif !== c.runner) {
    aide.textContent = `${c.nom} est le contact de ${equipe[c.runner].nom}. Bascule sur lui pour l’appeler.`
    aide.classList.remove('est-refus')
    return
  }

  const appel = appels[`${idContact}|${ficheAppelActive}`]
  ficheAppelActive = null

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
  stage.dataset.astral = etat.astral ? 'on' : 'off'
  const derives = scene?.derive?.(contexte()) ?? []
  stage.dataset.etat = [...etat.visuels, ...derives].join(' ')
  stage.classList.toggle('est-occupe', occupe || Boolean(dialogue))

  for (const bouton of document.querySelectorAll('.verbe'))
    bouton.classList.toggle('est-actif', !etat.objetActif && bouton.dataset.verbe === etat.verbe)

  /* Le décor doit savoir QUI agit, pas seulement quelle lentille est
     ouverte : c'est ce qui rend la règle 10 tangible dans le cadre au
     lieu de sous le cadre. Le CSS s'accroche aux classes `p-<runner>`,
     présentes dans tous les tableaux — le moteur n'a donc rien à
     toucher dans le markup d'une scène qu'il ne connaît pas. */
  stage.dataset.vue = VUES[etat.actif]
  stage.dataset.actif = etat.actif
  for (const bouton of document.querySelectorAll('.runner'))
    bouton.classList.toggle('est-actif', bouton.dataset.runner === etat.actif)

  rendInventaire()
  $('hudHeure').textContent = formateHeure()
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
  curseur.dataset.verbe = etat.verbe
  curseur.classList.toggle('porte-objet', Boolean(etat.objetActif))
  ecritEtiquette()

  if (estAuRepos()) sauvegarde()
}

function rendInventaire() {
  const boite = $('inventaire')
  boite.replaceChildren()
  for (const id of etat.inventaire) {
    const bouton = document.createElement('button')
    bouton.className = 'objet'
    bouton.title = objets[id].nom
    bouton.classList.toggle('est-actif', etat.objetActif === id)
    const icone = document.createElement('span')
    icone.className = `objet__${objets[id].icone}`
    bouton.append(icone)
    bouton.addEventListener('click', () => {
      etat.objetActif = etat.objetActif === id ? null : id
      rafraichit()
    })
    boite.append(bouton)
  }
}

function ecritEtiquette() {
  if (!survolee || occupe || dialogue) {
    etiquette.hidden = true
    curseur.classList.remove('est-sur-cible')
    return
  }
  const nom = nomDe(scene, survolee, contexte())
  etiquette.innerHTML = etat.objetActif
    ? `<em>${objets[etat.objetActif].nom}</em> sur ${nom}`
    : `${etat.verbe} · ${nom}`
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
  for (const [id, reponse] of Object.entries(salle.barre.reponses)) {
    if (!ficheConnue(id)) console.error(`[barre] « ${id} » : fiche inconnue.`)
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
    if (!carnet.hidden || !journal.hidden || !reseau.hidden) return
    if (occupe) return suivante()
    if (dialogue) return
    const cible = e.target.closest('[data-hotspot]')
    if (!cible) {
      if (etat.objetActif) { etat.objetActif = null; rafraichit() }
      return
    }
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
  for (const bouton of document.querySelectorAll('.verbe')) {
    bouton.addEventListener('click', () => {
      etat.verbe = bouton.dataset.verbe
      etat.objetActif = null
      rafraichit()
    })
  }

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
  $('boutonJournal').addEventListener('click', basculeJournal)
  $('boutonReseau').addEventListener('click', basculeReseau)
  $('boutonAllure').addEventListener('click', changeAllure)
  $('boutonDepose').addEventListener('click', () => {
    if (etat.ficheActive) depose(etat.ficheActive)
  })

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      etat.objetActif = null
      if (!carnet.hidden) basculeCarnet()
      else if (!journal.hidden) basculeJournal()
      else if (!reseau.hidden) basculeReseau()
      else rafraichit()
    }
    if (e.key === 'c' || e.key === 'C') basculeCarnet()
    if (e.key === 'j' || e.key === 'J') basculeJournal()
    if (e.key === 'r' || e.key === 'R') basculeReseau()
    if (e.key === 'a' || e.key === 'A') changeAllure()
    if (e.key === '1') { etat.verbe = 'regarder'; etat.objetActif = null; rafraichit() }
    if (e.key === '2') { etat.verbe = 'utiliser'; etat.objetActif = null; rafraichit() }
    if (e.key === '3') { etat.verbe = 'parler';   etat.objetActif = null; rafraichit() }
    /* Chiffres = verbes, F1-F4 = runners. Le clavier fait tout. */
    const rangs = ['hercules', 'trash', 'rabbit', 'drakk']
    const f = e.key.match(/^F([1-4])$/)
    if (f) { e.preventDefault(); selectionne(rangs[+f[1] - 1]) }
  })
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
  ['star-nous-connait', 'La Lone Star a votre numéro de coque et l’heure exacte. Ça se paiera.'],
  ['trace-matricielle', 'Un ordre de transfert porte une heure que personne n’a signée.'],
  ['esprit-demande',    'Quelque chose vous a suivis jusqu’à Tacoma sans rien demander. Ça aussi, ça se paie.'],
  ['lester-teresa',     'Vous savez comment elle s’appelait, et lui aussi. Vous êtes les seuls.'],
  ['lester-temoigne',   'Lester a décidé de parler à la barre. Personne ne l’a acheté : on l’a écouté.'],
  ['conf-perdue',       'Vous lui avez proposé de l’argent. Il ne l’a pas pris, et il n’a pas oublié.'],
  ['camera-aveugle',    'Une caméra municipale a filmé un plafond pendant deux heures.'],
  /* La récusation, chantier 20. */
  ['aveu-guilde',       'Vous avez avoué, à la barre, avoir soudoyé votre propre témoin. Le juge a arrêté de prendre des notes à ce moment précis.'],
  /* Neuf heures à la laverie. Le tir part toujours ; le bilan dit ce que
     la pièce lui a donné à lire. */
  ['laverie-manquee',   'Deux trous dans le carrelage d’une laverie, à un mètre de personne. La pièce était noire, chaude et aveugle.'],
  ['lester-coupe',      'Lester a la joue ouverte par un éclat de baie vitrée. Il n’a pas crié.'],
  ['lester-touche-laverie', 'On lui a tiré dessus une seconde fois, dans une pièce éclairée, et cette fois on ne l’avait rien fait pour l’empêcher.'],
]

function tombeRideau() {
  /* Depuis le chantier 20, la nuit ne s'arrête plus à la planque : elle
     s'arrête à la récusation, au tribunal. Les deux branches du dessous
     restent en secours pour un `fin: true` plus ancien qu'aucun chemin
     du jeu ne déclenche plus, mais qu'une sauvegarde antérieure au
     20 pourrait encore porter. */
  $('rideauLigne').textContent = a('recuse-abri')
    ? 'Le juge s’est récusé. L’audience est repoussée de plusieurs jours — et ce n’est pas fini.'
    : a('recuse-contrat')
      ? 'Le juge s’est récusé, l’audience est repoussée, et vous rentrez : le contrat était rempli, il ne vous doit rien de plus.'
      : a('lester-temoigne')
        ? 'Neuf heures moins le quart. Il pousse la porte le premier, et il sait ce qu’il va dire.'
        : a('goulet-passe')
          ? 'Neuf heures moins le quart. Il sera vivant à dix heures. C’était le contrat.'
          : 'La nuit s’arrête ici — pour l’instant.'
  const lignes = BILAN.filter(([f]) => a(f)).map(([, t]) => t)
  $('rideauBilan').textContent = lignes.length
    ? lignes.join('\n')
    : 'Rien ne vous suit. C’est plus rare que ça n’en a l’air.'
  rideau.hidden = false
}

demarre()
