# NOX

Un point & click à l'ancienne, en CSS et pixel art, dans l'univers de
Shadowrun. Cinq tableaux enchaînés — un bar, un quai, un greffe, un retour,
une planque — quatre runners, et une enquête à mener en regardant, en
utilisant et en parlant.

**Aucune image.** Tout ce qui s'affiche est du CSS : les décors, les sprites,
les portraits, les animations. Les personnages sont écrits à la main dans des
fichiers texte où un caractère vaut un pixel, puis compilés en SVG inline.

**Aucune dépendance.** Pas de framework, pas de CDN, pas de police distante,
pas d'étape de build : du HTML, du CSS et des modules ES natifs.

## Jouer

Le jeu charge ses décors par `fetch`, il lui faut donc un serveur — un double
clic sur `index.html` ne suffira pas.

```bash
python3 -m http.server --directory . 8607
```

Puis <http://localhost:8607/>.

## Ce qu'il y a dedans

| | |
|---|---|
| `index.html` | la coquille : le HUD, les filtres de pixelisation |
| `css/` | le moteur, une feuille par tableau, et `sprites.css` |
| `js/` | le moteur de résolution, l'état, les dialogues, l'ambiance |
| `js/data/` | les tableaux : cibles, réactions, répliques |
| `scenes/` | le markup de chaque décor, injecté à l'entrée |

`css/sprites.css` est **généré**. Ses sources sont des cartes ASCII qui vivent
hors de ce dépôt, avec le reste de l'atelier (documents de conception, bancs
d'essai, outillage).

## Droits

Projet amateur, non officiel et non commercial.

Le scénario adapté — *La parole est à la défense*, dans **Les Dossiers
McCarthy** — et les personnages prétirés d'**Anarchy 2.0** sont l'œuvre de
leurs éditeurs. **Shadowrun** est une marque de The Topps Company, publiée en
français par Black Book Éditions. Ce dépôt n'est affilié à aucun d'eux, ne
reproduit aucun de leurs livres, et ne se substitue pas à leur achat.
