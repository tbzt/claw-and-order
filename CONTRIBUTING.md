# Contribuer

## La règle qui décide de tout : où va ce fichier ?

Ce dépôt contient **uniquement ce qui est nécessaire pour que la page
tourne.** Rien d'autre. Devant tout nouveau fichier, une seule question :

> *Si je le retire, est-ce que le jeu cesse de fonctionner dans un navigateur ?*

**Oui → ici.** Non → à l'atelier.

| Ça va **ici** | Ça va à l'**atelier** |
|---|---|
| un tableau, ses données, son markup | un document de conception |
| une feuille de style chargée par `index.html` | un banc d'essai, une planche de comparaison |
| un module importé par la chaîne d'`index.html` | un script qui *génère* quelque chose |
| `ARCHITECTURE.md`, `CLAUDE.md`, ce fichier | une carte ASCII de sprite |

L'atelier est **hors de ce dépôt** : un dossier voisin,
`../claw-and-order-atelier/`, qui porte le sien. Les deux arborescences
restent côte à côte sur le disque — l'outillage sait donc écrire dans `css/`
sans qu'on ait à le lui dire — mais une seule des deux est publiée, et
l'autre ne peut pas s'y glisser par accident.

Si tu le ranges ailleurs, l'outillage suit :

```bash
CLAW_JEU=/chemin/vers/claw-and-order python3 outils/sprite.py
```

Un fichier qui ne sert qu'à *vérifier* quelque chose (une page qui met
`index.html` dans une iframe pour le sonder) est un banc d'essai. Il va à
l'atelier, même s'il est minuscule, même s'il est temporaire.

## Lancer

Le jeu charge ses décors par `fetch` : il lui faut un serveur.

```bash
python3 -m http.server --directory . 8607
```

Puis <http://localhost:8607/>.

> Si tu viens de modifier un module et que le comportement n'a pas bougé,
> change de port avant de conclure quoi que ce soit. Les modules ES se mettent
> en cache agressivement, et on mesure alors l'ancien code.

## Régénérer les sprites

`css/sprites.css` est généré. Il ne se modifie **jamais** à la main — la
prochaine régénération écraserait la retouche sans prévenir.

```bash
python3 ../claw-and-order-atelier/outils/sprite.py
```

Le script lit `art/*.txt` de l'atelier et écrit `css/sprites.css`. Sans
l'atelier, la feuille reste utilisable telle qu'elle est versionnée, mais
n'est plus régénérable.

Un contrôle existe et il vaut la peine d'être lancé avant tout commit qui
touche à `sprites.css` :

```bash
python3 ../claw-and-order-atelier/outils/verifie.py
```

Il recompile les cartes et compare le résultat à l'octet près. Tant qu'il
passe, la source et l'artefact ne peuvent pas avoir divergé.

## Ajouter une cible

Une cible, c'est deux choses qui doivent coïncider : un `data-hotspot` dans le
markup du décor, et une clé du même nom dans les `hotspots` du module.

```html
<div class="chose" data-hotspot="horloge"></div>
```

```js
horloge: {
  nom: 'Une horloge murale',
  regarder: () => 'Elle retarde de vingt minutes. Personne ne l’a signalé.',
  utiliser: ({ qui }) => ({ tous: '…', flags: ['vu:horloge'] }),
},
```

Le **clic gauche joue le verbe principal** de la cible, le clic droit regarde.
Le principal se déduit sans rien écrire : `parler` s'il existe, sinon
`utiliser`, sinon `regarder`. On ne pose `principal:` que pour renverser ce
défaut — et il accepte une fonction quand les deux gestes s'enchaînent :

```js
principal: ({ a }) => (a('poste-vigie') ? 'parler' : 'utiliser'),
```

Trois cibles du jeu en portent un. C'est mesuré : sur les 245 cibles qui ont un
verbe, 33 en ont deux, et 29 de ces 33 ont un `utiliser` qui n'est qu'un refus
écrit. Le choix n'existait presque jamais — mais là où il existe, il coûte cher
de se tromper. Un `principal:` en chaîne qui nomme un verbe absent est crié au
chargement.

Quatre conventions, non négociables, chacune payée par un bug réel :

**`flags`, `objets`, `retire`, `visuels` vont DANS la réaction**, jamais à côté
de `regarder`/`utiliser`/`parler`. Le moteur contrôle ce point au chargement et
crie dans la console si on se trompe.

**Une chose du monde, une seule cible.** Deux `data-hotspot` pour un même objet
— l'un pour son aura, l'autre pour lui-même — produisent une cible que le
joueur ne peut pas atteindre de façon fiable.

**Jamais de règle `animation` sur `.pj`.** Chaque sprite en porte déjà une, son
attente. Une seconde déclaration écrase les précédentes d'un coup.

**Ne pas faire dépendre un état visuel d'une transition sur une classe qu'on
retire.** Si la page ne composite pas, la transition reste coincée à mi-course.

## Ajouter un tableau

1. `js/data/montableau.js` — exporte `{ markup, ouverture, hotspots }`
2. `scenes/montableau.html` — le markup, sans `<html>` ni `<body>`
3. `css/scene-montableau.css` — et son `<link>` dans `index.html`
4. une ligne dans `js/data/scenes.js`

## Vérifier

Le projet a une règle qui a trouvé à peu près tous ses bugs :

> **On n'annonce jamais un chiffre sans l'avoir calculé.**

Une console sans erreur ne prouve pas qu'un tableau est jouable. Ce qui le
prouve, c'est de parcourir la grille verbe × cible × runner et de compter les
trous. L'outillage de mesure vit à l'atelier.

## Commiter

Un commit de ce dépôt ne porte **qu'un seul auteur : Thomas.**

> Pas de `Co-Authored-By:` pour un modèle, pas de pied de message généré,
> aucune mention d'outil dans le corps du commit.

L'outillage change tous les six mois ; la responsabilité du code, non. Un
`git log` qui nomme un assistant raconte par quel moyen le texte a été tapé —
pas qui répond de ce qu'il fait. Seul le second renseignement mérite d'être
versionné.
