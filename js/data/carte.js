/* ============================================================
   LA CARTE — chantier 13, PLAN_CARTE_NAVIGATION.md § 6-7.

   « La carte est un tableau, pas un menu » (§ 2). Un décor, une
   ouverture, des cibles qui se survolent et qui portent un nom — comme
   n'importe quel autre lieu du jeu. Et elle a un auteur : c'est la
   carte de Drakk, dessinée à la main, jamais deux fois pareille — ce
   qui justifie en fiction qu'elle n'ait ni menu ni liste, seulement des
   points sur un plan.

   PORTÉE DE CE CHANTIER : deux nœuds seulement, bar et quai, aller-
   retour. « Valider le geste avant d'en dépendre » (CONCEPTION § 12,
   déjà cité pour le carnet et le réseau) — les cinq nœuds, les
   fermetures horaires et le tribunal terminal sont le chantier 17.

   L1 — le temps est la seule ressource : chaque trajet porte son coût
   en minutes, prélevé au moment où on CHOISIT la destination sur la
   carte, pas au moment où on quitte le lieu de départ (voir bar.js et
   quai.js : leurs sorties n'avancent plus l'horloge elles-mêmes).
   L5 — le trajet se joue : l'heure affichée dans l'étiquette au survol
   avance déjà virtuellement (`formateHeure(heure + coût)`), et la ligne
   de récit du trajet se lit après le clic, avant l'arrivée. */

import { formateHeure } from '../state.js'

/* Le registre des nœuds. Même forme que `scenes.js` : ajouter un lieu,
   c'est ajouter une ligne — `x`/`y` (en unités d'art, 256 x 144) sont
   la position de vérité ; `scenes/carte.html` et `css/scene-carte.css`
   les reprennent à la main, comme le reste du décor du jeu (aucun
   tableau ne se génère depuis ses données, celui-ci non plus).

   Les positions viennent de la carte d'Anarchy v2 p. 281, dont les
   douze districts ont été extraits de la page et vectorisés (voir
   scenes/carte.html) : `x`/`y` sont le centre du JALON numéroté de
   chaque district — 6 pour Downtown, 10 pour Tacoma, les numéros du
   livre. McNeil (le greffe) est dans Outremer, le district des îles
   du Puget Sound — le livre l'y range explicitement (« McNeil (une
   énorme prison) », p. 282), ce qui est cohérent avec « par la mer,
   les airs ou la route » (SCENARIO_SOURCE.md) et avec les 26-40
   minutes de traversée déjà écrites dans quai-voilier.js. Loveland,
   le taudis où le corps est déposé, est un quartier de PUYALLUP
   (p. 282) — utile au chantier 17, et à l'acte IV. */
export const lieux = {
  bar: {
    nom: 'Le Claw & Order',
    ou: 'Downtown',
    x: 42.3, y: 53.3,
    minutes: { quai: 35 },
  },
  quai: {
    nom: 'Le Sunnyside Beach Park',
    ou: 'Tacoma',
    x: 32.7, y: 89.7,
    minutes: { bar: 35 },
  },
}

/* Le récit du trajet, par sens — c'est la ligne que portait autrefois
   la porte du bar (« Tacoma est à quarante minutes… ») avant que le
   coût ne s'en détache : elle vivait au mauvais endroit (40 minutes de
   texte pour 35 minutes d'horloge, un écart jamais remarqué parce que
   jamais affiché ailleurs) et elle présumait la destination avant que
   le joueur l'ait choisie. Corrigé aux deux : le chiffre suit le coût
   réel, et la ligne ne se dit plus qu'une fois la carte consultée. */
const RECITS = {
  'bar|quai': ['Vous sortez sous la pluie. Tacoma est à trente-cinq minutes, et le Sunnyside Beach Park est au bout.'],
  'quai|bar': ['Vous reprenez la route vers Downtown. Le Claw & Order n’a pas fermé — pas encore.'],
}

const coutDe = (depuis, vers) => lieux[depuis]?.minutes?.[vers]

function noeud(id) {
  return {
    nom: ({ depuis, heure }) => depuis === id
      ? `${lieux[id].nom} — vous y êtes`
      : `${lieux[id].nom} — ${coutDe(depuis, id)} min → ${formateHeure(heure + coutDe(depuis, id))}`,

    regarder: ({ depuis }) => depuis === id
      ? { tous: `${lieux[id].nom}, ${lieux[id].ou}. C’est là que vous êtes déjà.` }
      : { tous: `${lieux[id].nom}, ${lieux[id].ou}. À ${coutDe(depuis, id)} minutes d’ici.`,
          drakk: `« ${coutDe(depuis, id)} minutes de route, si personne ne nous arrête en chemin. »` },

    utiliser: ({ depuis }) => depuis === id
      ? { tous: 'Vous y êtes déjà.' }
      : { tous: RECITS[`${depuis}|${id}`] ?? `Vous prenez la route vers ${lieux[id].nom}.`,
          minutes: coutDe(depuis, id),
          va: id },
  }
}

export const carte = {
  markup: 'scenes/carte.html',

  /* Drakk étale un vrai plan, à chaque fois qu'on y revient — mais on ne
     le regarde pas deux fois de la même façon. `visite` vient de
     `charge()` (chantier 13) : 1 la première fois, davantage ensuite.
     Ce n'est pas encore une « seconde fenêtre » (chantier 19, qui
     réécrit les LIEUX eux-mêmes) — seulement la carte qui ne ment pas
     sur le fait qu'on l'a déjà dépliée. */
  ouverture: (ctx, visite) => visite > 1
    ? [['drakk', '« La province ne change pas de forme. Seule l’heure y change de visage. »']]
    : ['Drakk étale un plan sur ses genoux — dessiné à la main, jamais le même deux fois.',
       ['drakk', '« Ce n’est pas une carte. C’est une PROVINCE. La vôtre, cette nuit. »'],
       'Deux lieux y sont marqués pour l’instant. Le reste attend d’être découvert autrement qu’en le devinant.'],

  hotspots: {
    bar: noeud('bar'),
    quai: noeud('quai'),
  },

  dialogues: {},
}
