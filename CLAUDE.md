# Pour l'agent

Ce dépôt a une doctrine, et elle est plus vieille que toi. Ce fichier ne la
répète pas : il dit **où elle est** et **quand on la lit.**

## La règle qui commande ce fichier

> **On lit avant d'écrire, pas après.**

Une doctrine consultée pour justifier du texte déjà pondu ne sert à rien : elle
approuve tout. Elle sert à décider *quoi* écrire — donc elle s'ouvre avant la
première ligne, et le document consulté se nomme dans la réponse.

## Où elle est

Deux corpus, deux natures.

**Dans le dépôt** — la forme du code. `CONTRIBUTING.md` (où va un fichier,
comment on ajoute une cible, comment on vérifie, comment on commite) et
`ARCHITECTURE.md` (les pièces et la façon dont elles se parlent). Ce sont des
règles **mécaniques** : on peut dire si elles sont respectées.

**Hors du dépôt** — le fond. Un dossier de conception, versionné à part et
posé ailleurs sur le disque : `REFERENCE/` (la doctrine), `PLANS/`, `AUDITS/`,
et `PLAN_EXECUTION.md` en index actif. Ce sont des règles **de jugement** :
elles posent des questions, elles ne rendent pas de verdict.

> Son chemin n'est pas écrit ici — ce dépôt est public. Le demander, ou le
> lire dans les réglages locaux.

## Ce qu'on ouvre, selon ce qu'on touche

| Tu touches | Tu lis d'abord, dans `REFERENCE/` |
|---|---|
| une réplique, un refus, une ligne dite | `Claw & Order — Doctrine des dialogues.md`, puis `BIBLE DES VOIX — ÉQUIPIERS.md` au chapitre de celui qui parle |
| ce qu'un runner voit — une lentille | `DOCTRINE — LES QUATRE REGARDS.md` |
| un PNJ, ce qu'il sait, ce qu'il laisse voir | `FICHES_PERSONNAGES.md` — les quatre niveaux d'information, et « visible ≠ connu » |
| une scène neuve, un obstacle, une issue | `Doctrine — scénario organique.md`, puis `Méthode — matrice des options.md` |
| un échec, une alerte, une bagarre | `Système — dégénérescence des scènes.md` et `DOCTRINE — LES SITUATIONS QUI DÉGÉNÈRENT.md` |
| une conséquence, un drapeau, un bilan | `Claw & Order — Agentivité, conséquences et mystère.md` |
| le ton, quand tu hésites sur l'intention | `Claw & Order — Boussole artistique.md` |
| un fait de la trame, une date, un nom | `SCENARIO_SOURCE.md` — il tranche |
| un sprite, une carte ASCII, une couleur | `ATELIER_PERDU.md`, et l'atelier voisin |
| la forme du code, l'ajout d'une cible | `CONTRIBUTING.md` et `ARCHITECTURE.md`, ici |

`DOCTRINE_REGLES.md` rassemble les règles numérotées survivantes (10, 11, 12,
17, 19) et les décisions nommées. C'est le plus court : à lire en entier quand
on ne sait pas par où commencer.

## Quand deux documents ne disent pas la même chose

L'ordre de priorité est fixé — `Claw & Order — Hiérarchie des références
artistiques.md` :

1. le scénario et les personnages existants
2. la cohérence du monde et de Shadowrun
3. la voix propre de chaque personnage
4. la Boussole artistique
5. la Doctrine des dialogues
6. l'agentivité et le mystère
7. les quatre regards
8. l'Audit anti-IA

Le texte qui existe déjà bat la règle qui le juge. Ce n'est pas un détail de
procédure : c'est ce qui empêche une passe de doctrine de raboter le jeu.

## Ce que la doctrine interdit de faire *avec* la doctrine

Trois garde-fous, écrits dans les documents eux-mêmes, et qui visent
précisément un agent qui voudrait bien faire :

**Ne pas appliquer un document comme une check-list.** Ces textes donnent des
questions à poser, pas des réponses à appliquer. Un passage qui fonctionne ne
se réécrit pas pour devenir conforme.

**Ne pas surcorriger.** Si tous les personnages se mettent à esquiver, se taire
et se contredire, on a remplacé une formule par une autre.

**Ne jamais rendre le texte moins bon pour qu'il paraisse moins IA.** Une phrase
brillante reste si elle appartient au personnage.

Et avant toute intervention : **montrer le passage, diagnostiquer, puis
seulement proposer.** Pas l'inverse.

## Ce qui n'est pas négociable

Les quatre conventions de `CONTRIBUTING.md` — chacune payée par un bug réel —
et la règle de mesure :

> **On n'annonce jamais un chiffre sans l'avoir calculé.**

Le moteur en contrôle une partie tout seul, au chargement : `verifieScene()`,
`verifieCarnet()`, `verifieReseau()`, `verifieBarre()` dans `js/main.js` crient
dans la console. **Ouvrir la console fait partie de la vérification** — et si
tu ajoutes une convention vérifiable, elle va là, pas dans un document.

Un garde-fou qui crie à tort sur du code juste apprend à ne plus le lire. Il
vaut mieux pas de contrôle qu'un contrôle bruyant.

## Vérifier

Le jeu se sert par un serveur (`fetch`), et les modules ES se mettent en cache
agressivement : **changer de port** avant de conclure qu'un comportement n'a pas
bougé. Voir `CONTRIBUTING.md` § « Lancer ».

## Commiter

Un seul auteur : Thomas. Pas de `Co-Authored-By:`, pas de pied de message
généré. Voir `CONTRIBUTING.md` § « Commiter ».
