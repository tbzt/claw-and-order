/* ============================================================
   TABLEAU 6 — LE TRIBUNAL, LA SALLE D'AUDIENCE.

   Chantier 20 redéfini par `PLAN_TRAME_ACTES_III_IV.md` §5 : le tribunal
   n'est plus un nœud terminal, mais un PIVOT qui se joue deux fois. Ce
   fichier ne construit que la première moitié de la première audience —
   décidé le 2026-08-22 pour valider la pièce la plus risquée avant le
   reste : `depose()`, le troisième verbe de la même grammaire que
   `frotte()` (carnet) et `appelle()` (réseau).

   Le parvis (`tribunal.js`, chantier 20b) est livré : `entree.utiliser`
   y mène ici sans coût, comme `quai` → `quai-voilier` (chantier 25).
   `reculer`, plus bas, fait le chemin inverse — même geste, même
   gratuité.

   CHANTIER DE RANG 4 (`PLAN_TRAME_ACTES_III_IV.md` §6) : l'abordage.
   « On remet Lester à l'abri » descend maintenant vers `retour`
   (`js/data/retour.js`), qui rejoue le tableau 4 en second passage — la
   seconde tentative de Chimera que le texte source prévoit pendant la
   traversée retour vers McNeil. « Le contrat est rempli » reste la seule
   vraie fin ici : la retombée 0.

   CE QUE CE FICHIER NE FAIT TOUJOURS PAS :
   - l'art du décor — un placeholder fonctionnel, pas un pixel dessiné,
     comme celui du parvis (voir les deux `css/scene-tribunal*.css`). */

export const tribunalSalle = {
  markup: 'scenes/tribunal-salle.html',

  ouverture: [
    'La salle d’audience. Lester est déjà au banc, en combinaison orange, les mains à plat sur la table.',
    'Le dossier de l’accusation tient sur trois pages. Personne, dans la salle, ne semble y croire tout à fait.',
  ],

  hotspots: {

    juge: {
      nom: 'Le juge',
      regarder: {
        tous: ['Il écoute. C’est tout ce qu’il fait, et c’est énorme : personne d’autre dans cette salle n’a pris la peine.',
               'Il n’a encore rien signé.'],
        hercules: '« Un juge qui prend des notes est un juge qui doute. Il en prend beaucoup. »',
        drakk: '« Voilà un homme qui pèse, et qui ne l’a pas encore montré. »',
      },
    },

    defense: {
      nom: 'L’avocate de la défense',
      regarder: {
        tous: 'Wú Chen. C’est elle qui a fait verser le rapport d’autopsie au dossier — la seule pièce qui ne va pas dans le sens de l’accusation.',
        trash: '« Elle se bat avec ce qu’on lui donne. On peut lui donner mieux. »',
      },
    },

    accusation: {
      nom: 'Le procureur',
      regarder: {
        tous: ['Il lit son propre dossier comme s’il le découvrait. Trois pages, et il en a déjà tourné deux.',
               'Ce n’est pas un homme qui veut gagner. C’est un homme qui veut que ce soit fini.'],
        rabbit: '« Le manque de conviction est mesurable. Le sien est élevé. »',
      },
    },

    lester: {
      nom: 'Lester, au banc',
      regarder: {
        tous: 'On ne peut plus rien lui dire d’ici. Il regarde ses mains, puis le juge, puis ses mains.',
        drakk: '« Il a déjà fait la moitié du chemin, tout seul, dans une laverie. Le reste ne dépend plus de nous. »',
      },
    },

    galerie: {
      nom: 'La galerie',
      regarder: {
        tous: ['Quelques avocats au bord de la crise, des familles de victimes d’autres affaires, un garde qui change de pied trop souvent.',
               'Personne, ici, n’est venu pour Lester. C’est bien le problème.'],
      },
    },

    /* Le retour, dessiné (règle 2) : le même geste que `quai-voilier`
       (chantier 25), gratuit dans les deux sens. */
    reculer: {
      nom: 'Le fond de la salle',
      regarder: {
        tous: 'Les portes, entrebâillées sur le parvis.',
      },
      utiliser: {
        tous: 'Vous redescendez vers le parvis.',
        va: 'tribunal',
      },
    },

    /* ══ LA BARRE — la scène-thèse ═══════════════════════════════════
       L'interaction ne passe pas par un clic ici : on choisit la fiche
       dans le carnet (C), puis on clique « Déposer à la barre » — le
       bouton qui n'existe que dans ce tableau (voir `rendCarnet()` dans
       `main.js`). Ce hotspot ne fait que le dire, et rappeler l'état. */
    barre: {
      nom: 'La barre des témoins',
      regarder: {
        tous: ['Un pupitre de bois clair, un micro qu’on n’a pas encore allumé.',
               'C’est ici que le carnet cesse d’être un carnet.'],
      },
      utiliser: {
        tous: 'Ouvre le carnet, choisis une fiche, et dépose-la — le bouton est là pour ça.',
      },
    },

    /* ══ LA SORTIE — la récusation, en deux temps ═════════════════════
       Premier clic : McCarthy appelle, le juge s'est récusé. Second
       clic, une fois le choix fait au téléphone : on part vraiment, et
       c'est ici — pas dans le dialogue — que la nuit se termine
       (`fin: true` est un contrat de RÉACTION, pas de sujet : voir
       `choisit()` dans `main.js`, qui ne fait que refermer la
       conversation). */
    sortir: {
      nom: 'La sortie',
      regarder: {
        tous: 'Le couloir, et au bout, la rue. Le commlink de McCarthy vibre déjà dans sa poche.',
      },
      utiliser: ({ a }) => {
        if (!a('recusation-dite'))
          return { tous: 'Le marteau tombe. « L’audience est repoussée. » McCarthy est déjà debout, le commlink à l’oreille.',
                   dialogue: 'mccarthy' }
        return a('recuse-abri')
          ? { tous: ['« On le ramène à McNeil, » dit McCarthy. « Nouveau passeur, ce soir. »',
                     'Ce que ça veut dire pour la traversée, personne ne le dit encore à voix haute.'],
              va: 'retour' }
          : { tous: ['« Le contrat est rempli, » dit McCarthy. « Il sera vivant à dix heures. C’était le prix demandé. »',
                     'La nuit s’arrête là, pour vous. Pas pour lui.'],
              fin: true }
      },
    },
  },

  dialogues: {
    /* La récusation, dite au téléphone plutôt qu'à la barre : McCarthy
       est le seul PNJ que l'équipe a revu depuis le bar (§5.2 du plan),
       et c'est lui qui porte la nouvelle, comme il a porté le contrat. */
    mccarthy: {
      qui: 'mccarthy',
      accueil: ['« Le juge s’est récusé. Ne me demandez pas pourquoi, je ne le sais pas encore. »',
                '« L’audience est repoussée. De plusieurs jours. Ce qui veut dire qu’on a le temps — et qu’on n’a plus le choix de s’en servir. »'],
      retour: ['« L’audience est repoussée. C’est tout ce que je sais de plus que tout à l’heure. »'],
      sujets: [
        {
          id: 'abri',
          titre: '« On le remet à l’abri. »',
          quand: ({ a }) => !a('recusation-dite'),
          flags: ['recusation-dite', 'recuse-abri'],
          fin: true,
          texte: ['« … D’accord. » Un silence, puis : « Je préviens McNeil. Un nouveau passeur, ce soir. »',
                  '« Vous savez ce que vous ouvrez, en disant ça ? »'],
        },
        {
          id: 'contrat',
          titre: '« Le contrat est rempli. On s’arrête là. »',
          quand: ({ a }) => !a('recusation-dite'),
          flags: ['recusation-dite', 'recuse-contrat'],
          fin: true,
          texte: ['« … Très bien. » Il ne discute pas. « Il sera vivant à dix heures. C’est ce qu’on vous a payés à faire. »',
                  'Il raccroche avant vous.'],
        },
      ],
    },
  },

  /* ══ LA BARRE, LE MÉCANISME ═══════════════════════════════════════
     Quatre fiches ont une réponse écrite — trois qui TIENNENT, une qui
     SE RETOURNE — pour valider les trois registres (§5.3 du plan) avant
     d'écrire les autres. C'est la même règle qu'au chantier 31 : deux
     contacts avaient suffi à valider le geste du réseau ; quatre
     réponses suffisent ici. Le reste tombe dans `refus`, dans la voix
     du runner qui vient d'essayer — jamais un buzzer, jamais générique
     au sens où le carnet l'entend déjà.

     RESTE (backlog, pas ce chantier) : les autres fiches en main à cet
     instant — teresa, dossier-vide, navette-huit-heures, deux-mains,
     ordre-anterieur, deux-plans, et tout ce que l'acte IV ajoutera —
     tombent pour l'instant dans le refus générique. Leur écrire une
     réponse propre est le même travail que les 32 réponses du réseau
     (chantier 32) : à budget égal, mieux vaut d'abord le prouver ici. */
  barre: {
    reponses: {
      'elfe-autopsie': {
        registre: 'tient',
        dit: {
          tous: 'Tu déposes le rapport d’autopsie sur le pupitre. Le juge le lit deux fois, plus lentement la seconde.',
          hercules: '« Un elfe a étranglé cette fille. Mon client est un ork. Ce n’est pas un détail, Votre Honneur — c’est une contradiction. »',
          trash: '« Les mains ne mentent pas, même quand tout le reste ment. »',
          rabbit: '« Le rapport est formel. Personne ne l’avait contesté parce que personne ne l’avait lu. »',
          drakk: '« Le rapport dit une chose, l’accusation en dit une autre. L’un des deux se trompe, et ce n’est pas le rapport. »',
        },
      },
      'registre-anterieur': {
        registre: 'tient',
        dit: {
          tous: 'Tu poses le registre du greffe. L’heure du transfert y est antérieure à l’arrestation elle-même, et personne ne l’a corrigée depuis.',
          hercules: '« Quelqu’un a écrit la fin avant qu’on écrive le début, Votre Honneur. Ce n’est pas une preuve contre mon client. C’en est une contre le dossier. »',
          trash: '« Un registre ne ment pas sur une date. Il n’a aucune raison de le faire. »',
          rabbit: '« L’horodatage se vérifie en deux clics. Je vous invite à les faire. »',
          drakk: '« Le piège était tendu avant l’entrée dans la taverne. Voici l’acte de naissance. »',
        },
      },
      'pas-de-proces': {
        registre: 'tient',
        dit: {
          tous: 'Tu déposes le rapprochement lui-même : un dossier vide, un transfert déjà verrouillé avant qu’il n’existe. Le juge relit les deux pièces côte à côte.',
          hercules: '« On ne cherche pas à le faire condamner, Votre Honneur. On cherche à ce qu’il n’y ait pas d’audience du tout. Vous êtes en train d’assister à l’échec de ce plan. »',
          trash: '« Personne ne veut sa mort par un jury. Quelqu’un veut sa mort avant le jury. »',
          rabbit: '« Deux systèmes ne devraient jamais raconter la même histoire par accident. Ceux-là, si. »',
          drakk: '« La fosse était creusée sur le chemin, avant même le gibet. »',
        },
      },
      guilde: {
        registre: 'retourne',
        flags: ['aveu-guilde'],
        dit: {
          tous: 'Tu hésites, puis tu le dis quand même : une bouteille payée au bar, tendue au gamin en pleine traversée, avant qu’il vienne témoigner. Le juge pose son stylo.',
          hercules: '« Ce n’était pas pour l’influencer. » Ça sonne faux, même à ses propres oreilles.',
          trash: '« On voulait qu’il tienne debout. On ne l’a pas formulé comme ça sur le moment. »',
          rabbit: '« Officiellement, ça s’appelle une altération de témoin. Officieusement aussi, en fait. »',
          drakk: '« Une compagnie partage sa gourde. Un tribunal appelle ça autrement. »',
        },
      },
    },

    refus: {
      hercules: [
        '« Objection retirée avant même d’être faite. » Le juge hoche la tête, poliment, et passe à autre chose.',
        'Le greffier note. Personne d’autre ne réagit. Ce n’est pas ce dossier-ci qu’elle sert.',
      ],
      trash: [
        'Vrai, sûrement. Mais pas à cette barre, pas aujourd’hui.',
        'Le juge l’écoute avec les yeux de quelqu’un qui pense déjà à autre chose.',
      ],
      rabbit: [
        'Fait exact. Pertinence nulle pour ce dossier-ci. Le juge le classe sans le relire.',
        'Recevable en théorie. Ignoré en pratique.',
      ],
      drakk: [
        'Le juge écoute la légende et ne la retient pas. Ce n’est pas son procès à elle.',
        'Une vérité de plus, posée devant qui ne la demandait pas.',
      ],
    },
  },
}
