/* ============================================================
   LA MATRICE DE WATERS, DE L'AUTRE CÔTÉ DU VERROU.

   Chantier 47 — PLAN_LE_SECOND_ESPACE.md, chantier A : « Trash a un
   second espace. White_Rabbit n'en a pas. » `greffe-cellule.js`
   (chantier 33) existait déjà pour une seule chose — que quelqu'un
   aille voir là où l'équipe ne peut pas entrer. C'est la deuxième fois
   que ce geste sert, jamais la première : MÊME MÉCANIQUE TECHNIQUE,
   un second markup du même geste que `charge()`, gratuit, hors de
   `carte.js`. Aucun `.pj` dans le markup, ici non plus.

   CE QUI CHANGE, C'EST QUI Y VA — White_Rabbit seul, jamais les quatre —
   et c'est ce qu'écrit chaque hotspot ci-dessous quand `qui !== 'rabbit'`.
   Le corps de White_Rabbit reste dans la salle de montage, chez Waters
   (`js/data/waters.js`) ; ses coéquipiers le constatent, ils ne voient
   pas ce qu'il voit.

   PAS DE MÉCANIQUE NEUVE. La résolution du coffre — deux issues, la
   même decharge, la même fiche `enregistrement-recupere` — existait déjà
   dans `waters.js:coffre.utiliser` (chantier 43) ; elle est simplement
   RELOGÉE ici, avec un lieu où se jouer, au lieu de se résoudre en un
   seul clic sur la cible du monde physique. `waters.js` ne fait plus que
   l'introduire et y renvoyer (`va: 'matrice-waters'`).

   PAS DE FLAG NEUF NON PLUS. `etat.visites['matrice-waters']` (posé par
   `charge()`) distingue premier passage et retour — seulement utile si
   on plonge, qu'on regarde, et qu'on ressort par `revenir` sans avoir
   forcé : `coffre.utiliser` ne redonne l'accès que tant que
   `enregistrement-recupere` n'est pas posé.
   ============================================================ */

export const matriceWaters = {
  markup: 'scenes/matrice-waters.html',

  ouverture: (ctx, visite) => visite > 1
    ? ['La Matrice de Waters, encore. Le verrou n’a pas changé de forme — il attend, exactement comme la première fois.']
    : ['Aucun décor, aucune distance : la géométrie froide d’un hôte qui n’existe que pour protéger une seule chose.',
       'Ici, personne d’autre ne voit ce que White_Rabbit voit. C’est la première fois de la nuit que ça arrive à quelqu’un.'],

  hotspots: {

    verrou: {
      nom: 'Le verrou',
      regarder: ({ qui }) => qui !== 'rabbit'
        ? { tous: 'Tu regardes White_Rabbit. Une main posée à plat sur le coffre, les yeux ouverts sur rien — et rien d’autre à en dire d’ici.',
            hercules: '« Je déteste ce moment. On ne sait jamais si ça se passe bien, de l’intérieur. »',
            drakk: '« Un duel sans lame visible. Je garde les miennes. »',
            trash: '« Son aura ne bouge pas d’ici. Ce qui se joue, ça se joue ailleurs. »' }
        : { tous: ['Une géométrie de refus, disposée en couches — un verrou qui n’a jamais eu besoin d’être compliqué. Juste cher.',
                   'Et derrière les couches, quelque chose qui attend qu’on force, pas qu’on demande.'],
            rabbit: '« Il a payé pour que ça morde. Il n’a pas payé pour que ça pense. »' },
      utiliser: ({ qui, a }) => {
        if (qui !== 'rabbit')
          return { tous: 'On ne force pas ce qu’on ne peut pas voir.',
                   hercules: '« Celui-là, ce n’est pas mon métier. »' }
        return a('waters-vexe')
          ? { tous: ['White_Rabbit pousse, et le verrou pousse en retour — une décharge qui remonte droit dans le deck.',
                     'Le coffre cède quand même. Ça ne change rien à ce que ça vient de coûter.'],
              rabbit: '« … Ça, je l’ai senti jusque dans les dents. »',
              flags: ['bombe-declenchee', 'enregistrement-recupere'],
              fiches: ['enregistrement-recupere'],
              va: 'waters' }
          : { tous: ['White_Rabbit pousse la première couche, puis la seconde — et sur la troisième, quelque chose qui attendait se réveille.',
                     'Une décharge remonte le long du lien, jusqu’au poignet, dans le monde réel.'],
              rabbit: '« … Il l’a payé cher. Je viens de payer la différence. »',
              flags: ['bombe-declenchee', 'enregistrement-recupere'],
              fiches: ['enregistrement-recupere'],
              va: 'waters' }
      },
    },

    revenir: {
      nom: 'Se retirer',
      sortie: 'waters',
      regarder: { tous: 'Le lien qui tient White_Rabbit à son corps, dans la salle de montage — fin, mais entier.' },
      utiliser: {
        tous: 'White_Rabbit se retire, sans avoir rien forcé. Le verrou n’a rien vu passer.',
        va: 'waters',
      },
    },
  },

  dialogues: {},
}
