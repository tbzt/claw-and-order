/* AMBIANCE — trois sources, zéro fichier.

   Le § 10 de CONCEPTION coupe le doublage et le TTS. Il ne coupe pas le
   son. Or le texte d'ouverture du bar décrit précisément un silence qui
   tombe — « les fléchettes s'arrêtent en même temps que les
   conversations » — et on ne l'entendait pas tomber.

   Tout est synthétisé : du bruit filtré et des enveloppes. Aucun asset,
   rien à charger, rien à versionner. C'est la même économie que les
   décors en CSS et les sprites en fichiers texte.

   L'AudioContext ne démarre qu'au premier geste du joueur : les
   navigateurs refusent le son avant, et c'est très bien ainsi. */

let ctx = null
let maitre = null
let salle = null            // la rumeur de la salle
let flechettes = null       // le minuteur des lancers
let scene = null

/* Une seconde de bruit, fabriquée une fois et rejouée en boucle. */
function mémoireDeBruit(secondes = 2) {
  const n = ctx.sampleRate * secondes
  const tampon = ctx.createBuffer(1, n, ctx.sampleRate)
  const c = tampon.getChannelData(0)
  /* Bruit brun : plus sourd que du blanc, donc plus proche d'une salle
     pleine de gens qui parlent bas que d'un souffle de ventilation. */
  let dernier = 0
  for (let i = 0; i < n; i++) {
    const blanc = Math.random() * 2 - 1
    dernier = (dernier + 0.02 * blanc) / 1.02
    c[i] = dernier * 3.5
  }
  return tampon
}

function demarre() {
  const Audio = window.AudioContext || window.webkitAudioContext
  if (!Audio) return false
  ctx = new Audio()
  maitre = ctx.createGain()
  maitre.gain.value = 0.5
  maitre.connect(ctx.destination)

  /* ── 1. La rumeur ────────────────────────────────────────────────
     Un bar à flics à 23 h est « plus calme qu'une bibliothèque » : on
     veut une présence, pas une foule. Passe-bas serré, gain très bas. */
  const source = ctx.createBufferSource()
  source.buffer = mémoireDeBruit()
  source.loop = true
  const filtre = ctx.createBiquadFilter()
  filtre.type = 'lowpass'
  filtre.frequency.value = 340
  filtre.Q.value = 0.6
  salle = ctx.createGain()
  salle.gain.value = 0
  source.connect(filtre).connect(salle).connect(maitre)
  source.start()

  /* Une très lente respiration : sans elle, la boucle s'entend. */
  const houle = ctx.createOscillator()
  const profondeur = ctx.createGain()
  houle.frequency.value = 0.07
  profondeur.gain.value = 90
  houle.connect(profondeur).connect(filtre.frequency)
  houle.start()

  return true
}

/* ── 2. Une fléchette qui touche le liège ───────────────────────────
   Un clic mat : bruit très court, passe-bande haut, chute immédiate.
   C'est le seul son ponctuel de la scène, et il n'existe que pour
   pouvoir S'ARRÊTER. */
function lancer(volume = 1) {
  if (!ctx) return
  const s = ctx.createBufferSource()
  s.buffer = mémoireDeBruit(0.12)
  const f = ctx.createBiquadFilter()
  f.type = 'bandpass'
  f.frequency.value = 900 + Math.random() * 500
  f.Q.value = 5
  const g = ctx.createGain()
  const t = ctx.currentTime
  g.gain.setValueAtTime(0.5 * volume, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.11)
  s.connect(f).connect(g).connect(maitre)
  s.start(t)
  s.stop(t + 0.14)
}

function programmeFlechettes(cadence = 1) {
  clearTimeout(flechettes)
  if (!ctx || scene !== 'bar') return
  const attente = (1400 + Math.random() * 2600) / cadence
  flechettes = setTimeout(() => { lancer(0.7 + Math.random() * 0.3); programmeFlechettes(cadence) }, attente)
}

function rampe(param, vers, secondes) {
  const t = ctx.currentTime
  param.cancelScheduledValues(t)
  param.setValueAtTime(param.value, t)
  param.linearRampToValueAtTime(vers, t + secondes)
}

/* ── 3. La coupure ──────────────────────────────────────────────────
   « Les fléchettes s'arrêtent en même temps que les conversations. »
   On entre : tout tombe d'un coup, on tient le silence trois secondes,
   puis la salle repart — moins fort qu'avant, parce qu'on est là. */
export function entre(idScene) {
  scene = idScene
  if (!ctx) return
  clearTimeout(flechettes)
  if (idScene !== 'bar') { rampe(salle.gain, 0.05, 1.2); return }

  rampe(salle.gain, 0.22, 0.35)          // la salle, telle qu'on l'entend en poussant la porte
  setTimeout(() => {
    if (!ctx) return
    rampe(salle.gain, 0.015, 0.45)       // le silence tombe
    setTimeout(() => {
      if (!ctx) return
      rampe(salle.gain, 0.12, 2.6)       // ça repart, à voix basse
      programmeFlechettes(0.7)
    }, 3000)
  }, 900)
}

/* Le premier geste du joueur ouvre le son. Un seul branchement, retiré
   aussitôt : on ne veut pas d'un écouteur qui traîne. */
export function eveille(idScene) {
  const ouvre = () => {
    removeEventListener('pointerdown', ouvre)
    removeEventListener('keydown', ouvre)
    if (demarre()) entre(idScene ?? scene ?? 'bar')
  }
  addEventListener('pointerdown', ouvre, { once: true })
  addEventListener('keydown', ouvre, { once: true })
}
