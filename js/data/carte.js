/* ============================================================
   LA CARTE — chantier 13, PLAN_CARTE_NAVIGATION.md § 6-7.

   « La carte est un tableau, pas un menu » (§ 2). Un décor, une
   ouverture, des cibles qui se survolent et qui portent un nom — comme
   n'importe quel autre lieu du jeu. Et elle a un auteur : c'est la
   carte de Drakk, dessinée à la main, jamais deux fois pareille — ce
   qui justifie en fiction qu'elle n'ait ni menu ni liste, seulement des
   points sur un plan.

   PORTÉE DU CHANTIER 13 : deux nœuds seulement, bar et quai, aller-
   retour. « Valider le geste avant d'en dépendre » (CONCEPTION § 12,
   déjà cité pour le carnet et le réseau).

   ══ CHANTIER 17, RÉÉCRIT — DEUX REGISTRES DANS LA MÊME CARTE ════════
   Le 17 d'origine voulait « cinq nœuds, les `partir`, les fermetures
   horaires ». D11 l'a démoli le 2026-08-23 : le greffe, le détroit et
   la planque sont des passages scriptés à sens unique, pas des lieux
   d'enquête, et « seuls des lieux où l'on peut vouloir REVENIR méritent
   d'être navigables » (l'utilisateur, au mot près). Le chantier est
   resté suspendu à une condition : que l'acte IV existe.

   Il existe. Deux lieux d'enquête (chantiers 28 et 26), et ils se
   chaînaient en ligne droite — ce qui était juste tant qu'il n'y avait
   rien à choisir. Ce fichier porte donc maintenant DEUX REGISTRES DE
   DÉPLACEMENT, et c'est tout le contenu du 17 réécrit :

     LA NUIT      bar ⇄ quai. Le trajet coûte des MINUTES, l'étiquette
                  dit l'heure d'arrivée. Inchangé depuis le chantier 13.
     L'ENQUÊTE    le local ⇄ l'appartement ⇄ le palais de justice. Le
                  trajet coûte UN TOUR (D8), l'étiquette dit le moment
                  d'arrivée — « jour 1, soir ». Aucune minute : l'acte IV
                  dure des jours, et l'horloge de la nuit n'y veut plus
                  rien dire.

   Les deux registres ne se croisent jamais : `abordage-passe` bascule
   la carte de l'un à l'autre, et le CSS éteint les nœuds de l'autre
   registre (`display: none`, donc pas de cible fantôme sous le
   curseur). On ne revient pas au Claw & Order trois jours après, et on
   ne va pas chez Teresa à deux heures du matin.

   ══ CE QUE LE TROISIÈME NŒUD RÈGLE, ET IL FALLAIT Y PENSER ══════════
   Avec deux lieux qui se renvoient l'un à l'autre, plus rien ne termine
   l'acte IV : on ne peut plus jamais arrêter de chercher. Le nœud
   `audience` — le palais de justice, la seconde audience — est la
   sortie, et il change la nature du tableau : **arrêter l'enquête
   devient un CHOIX** au lieu d'être la conséquence d'avoir quitté la
   dernière pièce. Croisé avec le front du Tír, qui avance à chaque
   visite (§7.4 du plan des actes), c'est enfin l'arbitrage que l'acte IV
   devait porter : chercher plus, c'est se faire trouver.

   RANG 10 DU §10, LIVRÉ : `audience` mène maintenant à `tribunal-salle`
   pour de vrai (`va`, plus `fin`) — la 2ᵉ audience, où `depose()` lit les
   quatre fiches de l'acte IV et où les trois retombées (`PLAN_TRAME_
   ACTES_III_IV.md` §8) se tranchent. Voir `tribunal-salle.js`.

   ══ LES DEUX LOIS DE LA NUIT, INCHANGÉES ═══════════════════════════
   L1 — le temps est la seule ressource : chaque trajet porte son coût
   en minutes, prélevé au moment où on CHOISIT la destination sur la
   carte, pas au moment où on quitte le lieu de départ (voir bar.js et
   quai.js : leurs sorties n'avancent plus l'horloge elles-mêmes).
   L5 — le trajet se joue : l'heure affichée dans l'étiquette au survol
   avance déjà virtuellement (`formateHeure(heure + coût)`), et la ligne
   de récit du trajet se lit après le clic, avant l'arrivée.

   ══ CHANTIER 27 — LA TROISIÈME ANCRE REJOINT LE REGISTRE D'ENQUÊTE ═══
   `shameless` s'ajoute au registre : le local ⇄ l'appartement ⇄ le
   Shameless ⇄ le palais de justice. Rien dans `noeud()` n'a dû changer
   — c'est tout l'intérêt d'avoir écrit ce chantier en fonction générique
   plutôt qu'en cas particulier au 17. Le Shameless n'est pas à Loveland
   (§7.1 du plan : « entre le concert et chez elle ») : il est posé sur
   la route, dans Tacoma — ni chez elle, ni au tribunal, entre les deux.

   ══ CHANTIER 43 — LE QUATRIÈME LIEU, ET PAS UNE QUATRIÈME ANCRE ═════
   `waters` s'ajoute au registre à son tour, toujours sans rien changer
   à `noeud()`. Différence avec les trois précédents : les trois
   déductions réservées à l'acte IV sont déjà posées (`hayden`,
   `lester-innocent`, `amant-secret`) — ce lieu ne rend pas une
   déduction de plus, il rend le LEVIER que `amis.js` annonçait déjà
   (l'enregistrement chez Reginald Waters, §7.1 du plan). */

import { etat, formateHeure, formateTour } from '../state.js'

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

  /* ── LES NŒUDS DE L'ENQUÊTE (chantier 17 réécrit) ──────────────────
     `acte: 4` est la seule chose qui les distingue : pas de table de
     `minutes`, parce qu'un trajet de l'acte IV coûte un TOUR et que le
     tour est prélevé à l'ARRIVÉE, par `charge()`, sur la foi du
     `acte: 4` du tableau de destination. La carte n'a donc rien à
     facturer — elle annonce seulement ce que le prochain moment sera.

     LES DEUX PREMIERS SONT DANS LE MÊME DISTRICT, et c'est la
     géographie du texte : Loveland est un quartier de Puyallup
     (Anarchy v2 p. 282), le taudis où le corps a été déposé est à deux
     rues de l'appartement, et le local de répétition à trois kilomètres.
     Leurs jalons sont donc deux points serrés autour du 9, pas deux
     districts — la carte est à l'échelle du métroplexe et ces trois
     lieux tiennent dans un mouchoir. */
  amis: {
    nom: 'Le local de répétition',
    ou: 'Loveland, Puyallup',
    x: 36.0, y: 122.0,
    acte: 4,
  },
  appartement: {
    nom: 'L’appartement de Teresa',
    ou: 'Loveland, Puyallup',
    x: 48.5, y: 122.5,
    acte: 4,
  },
  /* LA TROISIÈME ANCRE (chantier 27) : « entre le concert et chez
     elle » (SCÉNARIO_SOURCE.md). Ni Downtown ni Loveland — un point sur
     la route entre les deux, dans Tacoma, comme le quai. Le club
     lui-même n'a rien de doré ; c'est la voiture qui détonnait dans SON
     quartier à lui, pas l'inverse. */
  shameless: {
    nom: 'Le Shameless',
    ou: 'Tacoma',
    x: 44.0, y: 97.0,
    acte: 4,
  },
  /* LE QUATRIÈME LIEU D'ENQUÊTE (chantier 43) — pas une quatrième
     ancre : les trois déductions de l'acte IV sont déjà posées, celui-
     ci rend un LEVIER (§7.1 du plan). « À Puyallup », comme le local et
     l'appartement, mais pas à Loveland : Waters n'a aucun lien avec le
     quartier de Teresa, seulement avec sa musique — le point est donc
     posé à part, au sud du jalon 9, pas dans le même mouchoir. */
  waters: {
    nom: 'Waters Sound',
    ou: 'Puyallup',
    x: 40.0, y: 136.0,
    acte: 4,
  },
  /* Le seul nœud du jeu qui ne mène nulle part : il REFERME l'acte IV.
     Downtown, à côté du 6 — le palais est à deux pas du Claw & Order,
     ce que le scénario dit et que le jeu n'avait jamais montré. */
  audience: {
    nom: 'Le palais de justice',
    ou: 'Downtown — la seconde audience',
    x: 46.8, y: 48.6,
    acte: 4,
    referme: true,
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
  /* L'ENQUÊTE. Les trajets ne se comptent plus en minutes : ils se
     comptent en ce qu'on abandonne pour les faire. Trois kilomètres
     dans Loveland, ce n'est pas une distance, c'est une décision. */
  'amis|appartement': ['Trois kilomètres dans Loveland. Personne ne parle dans la voiture, et personne ne met la radio.'],
  'appartement|amis': ['Vous refaites les trois kilomètres en sens inverse. Le rideau de fer sera toujours à mi-hauteur : il n’y a personne pour le baisser.'],
  'amis|shameless': ['Vous quittez Loveland pour un club qui n’a jamais eu besoin d’être beau pour tenir debout. Personne n’en parle. C’est peut-être pour ça.'],
  'shameless|amis': ['Vous laissez les basses du Shameless derrière vous et remontez vers Loveland. Trois kilomètres, et une nuit qui recommence à faire du bruit.'],
  'appartement|shameless': ['Vous quittez le studio de Teresa pour un club qui, lui, n’a jamais prétendu être un endroit innocent.'],
  'shameless|appartement': ['Vous laissez le Shameless derrière vous. L’appartement, lui, n’ira nulle part — il attend depuis trois jours, il peut attendre encore.'],
  'amis|waters': ['Vous quittez Loveland pour Puyallup, plus au sud. Pas la même adresse — la même affaire, vue par quelqu’un qui n’a jamais connu Teresa autrement qu’en musique.'],
  'waters|amis': ['Vous laissez Waters à sa console et remontez vers Loveland.'],
  'appartement|waters': ['Vous quittez le studio de Teresa vide pour un studio qui, lui, est resté habité.'],
  'waters|appartement': ['Vous laissez Waters Sound derrière vous pour l’appartement, qui n’attend toujours que vous.'],
  'shameless|waters': ['Vous quittez le Shameless pour Puyallup. Un club qui gardait un secret, un studio qui en garde un autre.'],
  'waters|shameless': ['Vous laissez Waters à sa console et redescendez vers le Shameless.'],
  'amis|audience': ['Vous laissez Loveland derrière vous et vous remontez vers Downtown. Ce que vous avez, vous l’avez.'],
  'appartement|audience': ['Vous laissez Loveland derrière vous et vous remontez vers Downtown. Ce que vous avez, vous l’avez.'],
  'shameless|audience': ['Vous laissez le Shameless derrière vous et vous remontez vers Downtown. Ce que vous avez, vous l’avez.'],
  'waters|audience': ['Vous laissez Puyallup derrière vous et vous remontez vers Downtown. Ce que vous avez, vous l’avez.'],
}

const coutDe = (depuis, vers) => lieux[depuis]?.minutes?.[vers]

/* Le moment d'arrivée d'un trajet d'enquête. Le tour n'est pas prélevé
   ici — `charge()` le fait à l'entrée du tableau, sur la foi de son
   `acte: 4` — donc l'étiquette annonce `tour + 1` et ne ment pas : elle
   dit ce que le HUD affichera dans deux secondes. */
const prochainMoment = () => formateTour((etat.tour ?? 0) + 1)

function noeud(id) {
  const enquete = lieux[id].acte === 4

  return {
    nom: ({ depuis, heure }) => depuis === id
      ? `${lieux[id].nom} — vous y êtes`
      : enquete
        ? `${lieux[id].nom} — un tour → ${prochainMoment()}`
        : `${lieux[id].nom} — ${coutDe(depuis, id)} min → ${formateHeure(heure + coutDe(depuis, id))}`,

    regarder: ({ depuis }) => depuis === id
      ? { tous: `${lieux[id].nom}, ${lieux[id].ou}. C’est là que vous êtes déjà.` }
      : enquete
        ? (lieux[id].referme
            ? { tous: [`${lieux[id].nom}, ${lieux[id].ou}.`,
                       'Y aller, c’est arrêter de chercher. Ce que vous avez à ce moment-là est ce avec quoi il entrera dans la salle.'],
                hercules: '« On n’a jamais assez. Le métier consiste à décider quand on arrête d’en manquer. »',
                drakk: '« La quête se referme quand la compagnie décide qu’elle se referme. Jamais avant, jamais toute seule. »' }
            : { tous: `${lieux[id].nom}, ${lieux[id].ou}. Une demi-journée pour y aller et en revenir.`,
                trash: '« Chaque fois qu’on se montre là-bas, quelqu’un d’autre l’apprend. Je ne dis pas de ne pas y aller. Je dis de le savoir. »' })
        : { tous: `${lieux[id].nom}, ${lieux[id].ou}. À ${coutDe(depuis, id)} minutes d’ici.`,
            drakk: `« ${coutDe(depuis, id)} minutes de route, si personne ne nous arrête en chemin. »` },

    utiliser: ({ depuis, a }) => depuis === id
      ? { tous: 'Vous y êtes déjà.' }
      : enquete && !a('renfield-croise') && a('su:hayden') &&
          (a('su:lester-innocent') || a('su:amant-secret'))
      ? { dialogue: 'renfield' }
      : lieux[id].referme
        ? { tous: [...(RECITS[`${depuis}|${id}`] ?? [`Vous prenez la route vers ${lieux[id].nom}.`]),
                   'Dix heures moins le quart, le lendemain matin. Le palais est ouvert, la salle est la même, et cette fois vous savez pourquoi vous y êtes.'],
            flags: ['enquete-close'],
            va: 'tribunal-salle' }
        : enquete
          ? { tous: RECITS[`${depuis}|${id}`] ?? `Vous prenez la route vers ${lieux[id].nom}.`,
              va: id }
          : { tous: RECITS[`${depuis}|${id}`] ?? `Vous prenez la route vers ${lieux[id].nom}.`,
              minutes: coutDe(depuis, id),
              va: id },
  }
}

/* ══ RENFIELD — rang 9, PLAN_TRAME_ACTES_III_IV.md §10 ═══════════════
   « Pas un lieu, une rencontre » (§2 du plan) : pas de nœud de carte
   neuf, pas de décor — Renfield a déjà son art (portrait et corps,
   `css/sprites.css`), câblé depuis longtemps (`VISAGES.renfield`,
   `main.js`) sans qu'aucune scène ne l'ait jamais fait parler.

   LE DÉCLENCHEUR SERT AUSSI DE CONDITION DE RETOURNEMENT — décidé avec
   l'utilisateur le 2026-08-25, pour ne pas avoir à inventer un compteur
   d'exposition séparé (le risque que D9 refusait déjà de coder sans
   trancher). La rencontre ne se déclenche QUE quand l'équipe a de quoi
   agir : `su:hayden` (le nom) et au moins une ancre de poids
   (`su:lester-innocent` ou `su:amant-secret`, la preuve). Un joueur qui
   fonce vers `audience` avec le seul nom ne croise jamais Renfield —
   cohérent avec « l'enquête reste optionnelle » (§11 du plan).

   MÊME GESTE EN DEUX TEMPS QUE `conseil` → `trancher-*` → `barre`
   (retour.js, chantiers 35-38) : les sujets de clôture ferment le
   dialogue (`fin: true`) sans jamais `va` — le joueur reclique le jalon
   qu'il visait, et cette fois `renfield-croise` bloque le
   redéclenchement, donc le trajet se joue normalement. Un seul dialogue
   pour les cinq destinations, pas cinq copies.

   Il ne construit ni la 2ᵉ audience (rang 10 — `audience` retombe
   toujours sur `fin: true` + `enquete-close`) ni aucune menace physique
   (le jeu n'ajoute pas de combat, §11, et Lester est déjà en sécurité à
   McNeil depuis le chantier 28 — la branche « Renfield monte une équipe
   pour l'exécuter » du texte source ne s'applique plus). */
const dialogueRenfield = {
  qui: 'renfield',
  accueil: [
    'Le jalon suivant attendra. Un homme âgé se tient là, immobile, appuyé contre un mur — il ne s’est pas caché. Il voulait qu’on le voie.',
    ['renfield', '« Vous cherchez un nom que vous avez déjà. Je le sais parce que je vous cherche depuis que vous l’avez trouvé. »'],
    ['renfield', '« Je m’appelle Renfield. Je rends service à une famille depuis plus longtemps qu’Hayden n’est né. Ce service, aujourd’hui, c’est vous. »'],
    ['drakk', '« On ne vous a rien demandé. »'],
    ['renfield', '« Non. C’est moi qui demande. Dites-moi ce que vous savez, et je déciderai quoi en faire — avant que quelqu’un d’autre ne décide à ma place. »'],
  ],
  retour: ['Il est toujours là, à attendre une réponse qu’on ne lui a pas encore donnée.'],
  sujets: [
    {
      id: 'hercules',
      titre: '« Un vieux chaman qui veut qu’on lui parle. Pourquoi ? » (Hercules)',
      acteur: 'hercules',
      texte: [
        ['hercules', '« Vous avez pisté cinq inconnus jusqu’ici pour qu’on vous raconte ce qu’on sait. Ça vaut cher, ou ça vaut rien. Lequel ? »'],
        ['renfield', '« Ni l’un ni l’autre. Ça vaut une décision que je ne veux pas prendre seul. »'],
        ['renfield', '« Vous croyez négocier. Vous ne négociez rien. Vous répondez, ou vous partez, et je continuerai sans vous. »'],
      ],
    },
    {
      id: 'drakk',
      titre: '« Vous trahissez votre client. Ça coûte, un geste pareil. » (Drakk)',
      acteur: 'drakk',
      texte: [
        ['drakk', '« Je connais le tarif d’un fixeur qui lâche son client. On ne retravaille plus jamais dans cette ville. »'],
        ['renfield', '« Je le sais mieux que vous. J’ai vécu assez longtemps pour voir ce tarif payé par d’autres. »'],
        ['renfield', '« Je ne le lâche pas pour vous. Je le lâche parce que ce que je porte depuis trois jours ne devrait pas se porter seul. »'],
      ],
    },
    {
      id: 'rabbit',
      titre: '« Personne ne nous a suivis jusqu’ici. Comment nous avez-vous trouvés ? » (White_Rabbit)',
      acteur: 'rabbit',
      texte: [
        ['rabbit', '« J’aurais vu une filature. Matricielle ou pas. »'],
        ['renfield', '« Vous auriez vu quelqu’un vous suivre. Je n’ai jamais eu besoin de vous suivre — juste de savoir où vous cherchiez, et pourquoi. »'],
        ['rabbit', '« Ça, ça ne s’improvise pas. Ça se prépare depuis le premier jour. »'],
      ],
    },
    {
      id: 'trash',
      titre: '« Un Éveillé qui sert des gens qu’il méprise. Je connais la forme. » (Trash)',
      acteur: 'trash',
      texte: [
        ['trash', '« Vous auriez pu monter une équipe. Vous êtes venu seul, et vous attendez. Je connais cette forme-là. Je la porte. »'],
        ['renfield', '« Alors vous savez pourquoi je n’ai pas encore choisi. »'],
        ['trash', '« Je le sais. Je sais aussi que ça ne s’arrête pas tout seul. »'],
      ],
    },
    {
      id: 'convaincre',
      titre: '« Il n’ira pas leur dire tout seul. Donnez-lui de quoi le faire. » (Trancher, Trash)',
      acteur: 'trash',
      fin: true,
      flags: ['renfield-croise', 'renfield-retourne'],
      texte: [
        ['trash', '« Hayden Telestrian. Un prénom mal écrit par une femme qui ne l’avait jamais vu épelé, un nom que tout le Tír connaît, et ce qu’ils cachaient tous les deux. Vous savez déjà tout ça. Ce qui manque, c’est quelqu’un pour le dire à voix haute. »'],
        'Il ne répond pas tout de suite. Vingt ans de silence, et pour la première fois, ça ne suffit plus.',
        ['renfield', '« Je le porte depuis trois jours parce que je le dois à ses parents, pas à lui. Je le leur dirai moi-même. Ils préféreront ça à l’apprendre autrement. »'],
        ['renfield', '« Ne me remerciez pas. Ce n’est pas pour vous que je le fais. »'],
      ],
    },
    {
      id: 'silence',
      titre: '(Le laisser partir.)',
      fin: true,
      flags: ['renfield-croise'],
      texte: ['Personne n’insiste. Renfield hoche la tête, une fois, et s’en va sans dire s’il a compris quelque chose ou seulement gagné du temps.'],
    },
  ],
}

export const carte = {
  markup: 'scenes/carte.html',

  /* Drakk étale un vrai plan, à chaque fois qu'on y revient — mais on ne
     le regarde pas deux fois de la même façon. `visite` vient de
     `charge()` (chantier 13) : 1 la première fois, davantage ensuite.
     Ce n'est pas encore une « seconde fenêtre » (chantier 19, qui
     réécrit les LIEUX eux-mêmes) — seulement la carte qui ne ment pas
     sur le fait qu'on l'a déjà dépliée. */
  ouverture: (ctx, visite) => ctx.a('abordage-passe')
    ? (visite > 1
        ? [['drakk', '« La province ne change pas de forme. Seuls les jours y changent de visage. »']]
        : ['Drakk ressort le plan. Ce n’est plus le même : cinq lieux y sont marqués, tous au crayon, et deux d’entre eux tiennent dans un mouchoir.',
           ['drakk', '« Loveland. Trois kilomètres de côté, et la moitié de l’affaire dedans. L’autre moitié boit ailleurs, et la dernière enregistre. »'],
           ['drakk', '« Le dernier point, c’est la sortie. Nous y allons quand nous décidons d’y aller, et pas quand nous n’avons plus le choix. »']])
    : visite > 1
    ? [['drakk', '« La province ne change pas de forme. Seule l’heure y change de visage. »']]
    : ['Drakk étale un plan sur ses genoux — dessiné à la main, jamais le même deux fois.',
       ['drakk', '« Ce n’est pas une carte. C’est une PROVINCE. La vôtre, cette nuit. »'],
       'Deux lieux y sont marqués pour l’instant. Le reste attend d’être découvert autrement qu’en le devinant.'],

  /* Quel registre la carte montre. `abordage-passe` est le basculement :
     il tombe au bout du goulet, juste avant que l'abordage ne rende la
     main à l'acte IV. Le CSS éteint les nœuds de l'autre registre en
     `display: none` — pas en `opacity`, pour qu'ils ne captent pas le
     curseur. */
  derive: ({ a }) => [a('abordage-passe') ? 'registre-enquete' : 'registre-nuit'],

  hotspots: {
    bar: noeud('bar'),
    quai: noeud('quai'),
    amis: noeud('amis'),
    appartement: noeud('appartement'),
    shameless: noeud('shameless'),
    waters: noeud('waters'),
    audience: noeud('audience'),
  },

  dialogues: {
    renfield: dialogueRenfield,
  },
}
