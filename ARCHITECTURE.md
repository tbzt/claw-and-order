# Architecture

Ce document décrit la **forme** du jeu : les pièces et la façon dont elles se
parlent. Il ne décrit pas son état d'avancement, ni le contenu des tableaux.

Trois contraintes ont produit tout le reste :

1. **Aucune image.** Décors, personnages, portraits : tout est du CSS.
2. **Aucune dépendance.** Pas de framework, pas de CDN, pas de police distante.
3. **Aucune étape de build.** Ce qui est dans le dépôt est ce qui s'exécute.

## Le chargement

`index.html` n'est qu'une coquille : le HUD (verbes, équipe, inventaire,
carnet, journal), les trois filtres SVG de pixelisation, et un `#decor` vide.
Aucun décor n'y figure.

```
index.html
  └─ js/main.js  (module)
       ├─ js/data/scenes.js     le registre : { bar, quai, greffe, retour, planque }
       └─ fetch(scene.markup) → injecté dans #decor
```

Chaque tableau est un module qui exporte un objet, et ce module désigne son
propre markup :

```js
export const bar = {
  markup: 'scenes/bar.html',
  ouverture: [ /* les lignes dites à l'entrée */ ],
  hotspots: { /* les cibles */ },
}
```

Ajouter un tableau, c'est ajouter une ligne à `scenes.js`. Le moteur ne connaît
rien d'autre.

> Le `fetch` implique un serveur : ouvrir `index.html` par un double clic ne
> marchera pas. Voir [CONTRIBUTING.md](CONTRIBUTING.md).

## La résolution

C'est le cœur. Une interaction est un triplet — **verbe × cible × runner
actif** — et `js/interact.js` le résout en lignes attribuées à un locuteur.

```
clic sur [data-hotspot="mccarthy"]
  → scene.hotspots.mccarthy[etat.verbe]
      ├─ absent   → refus, dit dans la voix du runner actif
      └─ présent  → règle(contexte) → réaction
```

Une règle reçoit un **contexte** volontairement pauvre — `{ a, tient, sait,
astral, qui }` — et rend soit une chaîne, soit un tableau de lignes, soit un
objet `{ texte, qui, flags, objets, retire, visuels, dialogue, fin }`.

Une réaction peut se dédoubler : la clé `tous` est la caméra, elle parle en
récit ; une clé au nom d'un runner est sa voix à lui, ajoutée derrière.

```js
regarder: ({ a }) => ({
  tous: 'Le vieil ork tourne son verre sans le boire.',
  trash: 'Son aura tremble. Il a peur, et pas de nous.',
})
```

Chaque ligne porte son locuteur, ce qui permet la couleur par voix, le
portrait qui suit la parole, et deux runners qui se coupent la parole dans une
même réaction. La paire `['drakk', 'du texte']` attribue une ligne à quelqu'un
d'autre, où qu'on l'écrive.

## L'état

`js/state.js` tient tout ce qui traverse les tableaux, et rien d'autre :

| | |
|---|---|
| `flags` | ce que le joueur sait |
| `inventaire` | ce qu'il porte |
| `fiches` | ce qu'il a versé au carnet |
| `visuels` | ce que le décor doit montrer |
| `actif` | quel runner agit |

Le reste du moteur ne fait que lire ça. Une règle de scène ne peut pas y
toucher directement : elle *déclare* ce qu'elle change, dans sa réaction.

## Les lentilles

Les quatre runners ne sont pas quatre skins : chacun est une vue.

```js
const VUES = { hercules: 'physique', trash: 'astrale', rabbit: 'ra', drakk: 'tactique' }
```

Sélectionner un runner pose `data-vue` sur `#stage`, et le CSS fait le reste —
ce que Trash voit dans l'astral n'existe pas pour Hercules. La loi qui gouverne
ça se cite verbatim : **une lentille ajoute, elle ne retire jamais.** Une vue
révèle des choses ; elle n'en cache aucune.

## Les sprites

`css/sprites.css` est **généré** et ne se modifie pas à la main.

Ses sources sont des cartes ASCII — une palette, puis une grille où un
caractère vaut un pixel — compilées en SVG inline posé en `background`. Des
rectangles vectoriels à coordonnées entières restent nets à n'importe quelle
échelle.

L'intérêt n'est pas technique, il est humain : l'illustration est un fichier
texte, relisible et diffable.

Ces cartes et leur compilateur vivent **hors de ce dépôt** — voir plus bas.

## La frontière

Ce dépôt ne contient que ce qui est nécessaire pour que la page tourne.

Tout le reste — documents de conception, bancs d'essai, cartes ASCII,
outillage Python — vit dans un **atelier hors dépôt**, versionné séparément,
posé à côté de celui-ci sur le disque. C'est la règle qui décide de tout
ajout : voir [CONTRIBUTING.md](CONTRIBUTING.md).
