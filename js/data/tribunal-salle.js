/* ============================================================
   TABLEAU 6 — LE TRIBUNAL, LA SALLE D'AUDIENCE.

   Chantier 20 redéfini par `PLAN_TRAME_ACTES_III_IV.md` §5 : le tribunal
   n'est plus un nœud terminal, mais un PIVOT qui se joue deux fois. La
   1ʳᵉ audience (2026-08-22) a validé la pièce la plus risquée en premier :
   `depose()`, le troisième verbe de la même grammaire que `frotte()`
   (carnet) et `appelle()` (réseau).

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

   ══ RANG 10 (`PLAN_TRAME_ACTES_III_IV.md` §8-10) — LA 2ᵉ AUDIENCE ═════
   Même tableau, même markup, deuxième visite — pas un fichier neuf
   (D7 : « une conséquence ajoute »). `carte.js` y mène pour de vrai
   depuis le nœud `audience`, en posant `enquete-close`. `ouverture`
   distingue les deux visites par `etat.visites` (l'idiome déjà établi
   par `carte.js` et `quai-voilier.js`), et `acte` — un getter, pas un
   champ statique — ne vaut 4 (donc ne consomme un TOUR, D8) qu'une fois
   `enquete-close` posé : la 1ʳᵉ audience se joue toujours en MINUTES,
   avant que l'acte IV n'existe.

   `barre.reponses` gagne les quatre fiches de l'acte IV — additif, les
   quatre réponses de la 1ʳᵉ audience ne changent pas. `hayden` seule est
   une fonction : Chimera (`chimera-avance`, D9, `appelle()` dans
   `main.js`) ne peut plus atteindre ni Lester (McNeil) ni l'équipe (pas
   de combat, §11) — il ne peut plus qu'abîmer un témoignage, et c'est le
   seul qui NOMME quelqu'un.

   `sortir.utiliser` gagne un troisième étage, après la récusation
   (1ʳᵉ audience) : à `enquete-close`, il calcule la retombée 2
   (`enregistrement-recupere` déposé), 3 (`hayden` déposé ET confirmé,
   plus une ancre) ou 1 (ni l'un ni l'autre) — « 2 et 3 ne s'excluent
   pas » (§8) ouvre le dialogue `verdict`, un choix, pas un tirage.

   CE QUE CE FICHIER NE FAIT TOUJOURS PAS :
   - l'art du décor — un placeholder fonctionnel, pas un pixel dessiné,
     comme celui du parvis (voir les deux `css/scene-tribunal*.css`) ;
   - le compteur d'exposition dans son sens d'origine (D9 le remplace
     ici par une conséquence narrative précise, pas un chiffre affiché). */

import { a } from '../state.js'
import { equipiers } from './equipiers.js'

export const tribunalSalle = {
  markup: 'scenes/tribunal-salle.html',

  /* Un getter, pas un champ : la 1ʳᵉ audience se joue avant que l'acte IV
     n'existe (D8 — le tour n'a de sens qu'à partir de l'abordage), donc
     `charge()` ne doit incrémenter `etat.tour` qu'à la seconde visite,
     une fois `enquete-close` posé par `carte.js`. */
  get acte() { return a('enquete-close') ? 4 : undefined },

  /* `charge()` VIDE `etat.visuels` à chaque entrée : sans ce bloc, un
     aller-retour par le parvis (`reculer` → `tribunal`, puis `entree` →
     ici) effacerait la fiche retournée. C'est le seul chemin de retour
     possible entre la récusation et la sortie, et il est ouvert.

     ⚠️ ET IL EST FERMÉ À LA 2ᵉ AUDIENCE, ce qui est tout l'intérêt de la
     garde `!a('enquete-close')`. Trois jours plus tard, l'audience est
     bel et bien EN COURS ; laisser la fiche annoncer « repoussée »
     pendant que le juge écoute aurait été pire que de ne rien afficher.
     `enquete-close` est posé par `carte.js` et c'est la condition d'entrée
     de la seconde audience (voir le getter `acte` juste en dessous). */
  entree: ({ a }) => a('recusation-dite') && !a('enquete-close') ? ['recusation-dite'] : [],

  ouverture: (ctx, visite) => visite > 1
    ? [ctx.a('renfield-retourne')
        ? 'La même salle, trois jours plus tard. Lester est encore au banc, mais il se tient autrement — quelqu’un lui a déjà dit qu’un vieil homme parlait, en ce moment même, à des parents qui ne savaient pas encore avoir un fils à pleurer.'
        : 'La même salle, trois jours plus tard. Le dossier de l’accusation n’a pas changé d’une page. Vous, si.',
       'Le juge n’a pas oublié où il en était. Personne, ici, ne fait comme si c’était une nouvelle affaire.']
    : [
        'La salle d’audience. Lester est déjà au banc, en combinaison orange, les mains à plat sur la table.',
        'Le dossier de l’accusation tient sur trois pages. Personne, dans la salle, ne semble y croire tout à fait.',
      ],

  /* ── LES QUATRE REGARDS ───────────────────────────────────────────
     Écrit le 2026-08-27, en même temps que ceux du bar : c'étaient les
     deux seuls tableaux entiers du jeu à porter trois calques de
     lentille et pas une ligne à dire quand on change de regard. Les
     calques datent du 14ᵉ lot du chantier 23 ; ces quatre entrées les
     mettent en mots.

     ⚠️ CE BLOC N'AJOUTE AUCUN ÉTAT VISUEL. `vues:` est lu par
     `selectionne()` (`main.js`) et ne touche ni `etat.visuels` ni
     `data-etat` — ce tableau n'en a toujours aucun, et la bascule de la
     fiche du rôle au marteau reste due (voir le bas de
     `css/scene-tribunal-salle.css` et le backlog du plan). */
  vues: {
    sociale: [
      'Trois pages de dossier d’un côté, une avocate de l’autre, et entre les deux un garçon en combinaison orange à qui personne n’a rien demandé.',
      '« Il n’y a pas d’argent dans cette pièce. Première fois de la nuit. »',
      '« On n’achètera personne. Il va falloir leur donner quelque chose de vrai, et ce n’est pas l’outil que je sais tenir. »',
    ],
    astrale: [
      'Personne, dans cette salle, n’a peur pour soi. La seule chose qui ait laissé quelque chose ici, c’est le pupitre au milieu de l’allée : un à un, pendant des années, et ça s’y est empilé exactement comme au portique du parvis.',
      '« Derrière nous, la galerie ne sent rien du tout. »',
      '« Ils attendent leur affaire à eux. Celle du gamin est ce qu’il y a avant. »',
    ],
    ra: [
      'Cinq icônes, aucune réclame — un palais de justice ne loue pas de mètre carré de réalité augmentée. La transcription tourne en direct et n’est signée par personne ; le micro de la barre n’est pas encore allumé.',
      '« Trois pages au dossier de l’accusation. Deux déjà tournées sur son terminal. »',
      '« Il aura fini avant le juge. »',
    ],
    materielle: [
      'Deux issues, des tables assez lourdes pour arrêter quelque chose, une estrade qui domine toute la salle. Tout ce qu’il faut pour tenir une pièce.',
      '« Et rien à y tenir. »',
      '« Un donjon où l’on gagne en parlant. Je n’ai aucune idée de la façon dont on y protège quelqu’un. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('tribunal-salle'),

    /* ══ LES CIBLES DE CALQUE — R4, premier des onze décors ══════════
       Mesuré le 2026-08-28 : onze décors portaient 218 éléments de
       calque et **zéro** cible. Celui-ci en gagne deux, pas trois, et
       le manquant est un constat, pas un oubli : **les six éléments du
       calque astral désignent tous une chose qui a déjà sa cible dans
       le décor** — le pupitre est `barre`, les quatre auras sont leurs
       quatre personnes, l'indifférence est `galerie`. La règle « une
       chose du monde, une seule cible » interdit de les doubler ; ce
       que l'astral a à dire ici se dit donc dans la voix de Trash sur
       ces cibles-là, où elle est déjà écrite.

       Comme toute cible de calque, elles ne sont atteignables que par
       leur runner : `tous` + une voix, jamais quatre. */
    transcription: {
      nom: 'La transcription',
      principal: 'regarder',
      regarder: {
        tous: 'La transcription défile en direct au-dessus du banc du greffe, ligne à ligne, à trois mots de retard sur ce qui se dit.',
        rabbit: ['« Elle tourne, elle horodate, et elle n’est signée par personne. »',
                 '« Personne n’a mis son nom en bas. Pas encore, en tout cas — »'],
        flags: ['transcription-vue'],
      },
      utiliser: {
        tous: 'Elle défile, et rien de ce qu’on ferait ne la ferait défiler autrement.',
        rabbit: '« Je pourrais y écrire une ligne. Je ne vais pas faire ça. »',
      },
    },

    'issue-laterale': {
      nom: 'L’issue latérale',
      principal: 'regarder',
      regarder: {
        tous: 'Une porte basse derrière l’estrade, sans poignée de ce côté-ci. Elle ne mène pas dehors.',
        drakk: ['« Pas de poignée, pas de serrure visible, et elle s’ouvre de l’autre côté. »',
                '« Celle-là ne sert qu’une fois, et pas à nous. C’est par là qu’ils l’emmèneront. »'],
      },
      utiliser: {
        tous: 'Elle n’a pas de poignée de ce côté. C’est le principe.',
        drakk: '« On ne force pas une porte devant un juge. »',
      },
    },

    juge: {
      nom: 'Le juge',
      /* R4 : `transcription-vue` se paie ici. La ligne « il n'a encore
         rien signé » était dans le texte depuis le premier jour ; elle
         attendait quelqu'un qui sache ce que « signé » veut dire dans
         cette salle. White_Rabbit n'avait aucune voix sur le juge — il
         en gagne une, et seulement une fois qu'il a lu la transcription. */
      regarder: ({ a }) => ({
        tous: ['Il écoute. C’est tout ce qu’il fait, et c’est énorme : personne d’autre dans cette salle n’a pris la peine.',
               'Il n’a encore rien signé.'],
        hercules: '« Un juge qui prend des notes est un juge qui doute. Il en prend beaucoup. »',
        drakk: '« Voilà un homme qui pèse, et qui ne l’a pas encore montré. »',
        ...(a('transcription-vue')
          ? { rabbit: '« Tout ce qui se dit ici attend sa signature à lui. C’est le seul endroit du dossier où quelqu’un assume ce qu’il écrit. »' }
          : {}),
      }),
    },

    defense: {
      nom: 'L’avocate de la défense',
      regarder: {
        tous: 'Wú Chen. C’est elle qui a fait verser le rapport d’autopsie au dossier — la seule pièce qui ne va pas dans le sens de l’accusation.',
        trash: '« Elle se bat avec ce qu’on lui donne. »',
      },
    },

    accusation: {
      nom: 'Le procureur',
      regarder: {
        tous: ['Il lit son propre dossier comme s’il le découvrait. Trois pages, et il en a déjà tourné deux.',
               'Ce n’est pas un homme qui veut gagner. C’est un homme qui veut que ce soit fini.'],
        rabbit: '« Il a relu sa déposition deux fois avant de la dire. »',
      },
    },

    lester: {
      nom: 'Lester, au banc',
      /* Fonction depuis le rang 10 : la 2ᵉ audience le retrouve au même
         endroit, mais pas dans le même état — il sait maintenant ce que
         l'équipe a trouvé, ou n'a pas trouvé, pendant trois jours. */
      regarder: ({ a }) => a('enquete-close')
        ? { tous: 'Trois jours plus tard, même banc. Il ne regarde plus ses mains — il vous regarde, vous, en attendant de savoir ce que vous avez apporté.',
            drakk: a('chimera-avance')
              ? '« Il sait qu’on a cherché. Il ne sait pas encore que quelqu’un d’autre a cherché plus vite. »'
              : '« Il a arrêté d’espérer tout seul. Ça se voit, à la façon dont il attend maintenant. »' }
        : { tous: 'On ne peut plus rien lui dire d’ici. Il regarde ses mains, puis le juge, puis ses mains.',
            drakk: '« Il a déjà fait la moitié du chemin, tout seul, dans une laverie. Le reste ne dépend plus de nous. »' },
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
      sortie: 'tribunal',
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
      /* Mène à `retour` (recusé, refuge dénoncé) ou `fin: true` (le
         contrat rempli) selon `recuse-abri` : deux issues, pas une
         chaîne fixe — `true` générique (§3.3 du plan). */
      sortie: true,
      regarder: {
        tous: 'Le couloir, et au bout, la rue. Le commlink de McCarthy vibre déjà dans sa poche.',
      },
      utiliser: ({ a }) => {
        if (!a('recusation-dite'))
          return { tous: 'Le marteau tombe. « L’audience est repoussée. » McCarthy est déjà debout, le commlink à l’oreille.',
                   dialogue: 'mccarthy' }
        if (!a('enquete-close'))
          return a('recuse-abri')
            ? { tous: ['« On le ramène à McNeil, » dit McCarthy. « Nouveau passeur, ce soir. »',
                       'Ce que ça veut dire pour la traversée, personne ne le dit encore à voix haute.'],
                va: 'retour' }
            : { tous: ['« Le contrat est rempli, » dit McCarthy. « Il sera vivant à dix heures. C’était le prix demandé. »',
                       'La nuit s’arrête là, pour vous. Pas pour lui.'],
                fin: true }

        /* ══ RANG 10 — LA 2ᵉ AUDIENCE, LE VERDICT ═══════════════════════
           Même geste en deux temps que la récusation : si les retombées
           2 ET 3 sont réunies (`§8` : « 2 et 3 ne s'excluent pas »), un
           premier clic ouvre `verdict` — un choix, pas un tirage — et un
           second, une fois le choix posé, referme vraiment. Sinon, un
           seul clic suffit : il n'y a rien à choisir. */
        const texteVerite = ['« Le nom que vous portez ce soir n’est pas celui du dossier, » dit le juge. « Ça va prendre du temps. »',
                              'Ça en a déjà pris trois jours de trop.']
        const texteTractation = ['Personne, dans la salle, ne sait ce que vous venez de garder en poche.',
                                  'McCarthy vous regarde sortir sans poser de question. Il a appris, cette nuit-là, à ne pas en poser.']
        const texteEchec = a('chimera-avance')
          ? ['Le juge referme le dossier. « Rien de nouveau, » dit-il — et de son point de vue à lui, c’est exact.',
             'McCarthy raccroche vite. Trop vite pour que ce soit une bonne nouvelle.',
             /* Nœud 1, chantier 53 : `hayden-conteste` ne peut être vrai
                que dans cette branche (`chimera-avance`), et implique
                `!hayden-confirme` — donc toujours l'échec, jamais la
                vérité ni la tractation. */
             ...(a('hayden-conteste')
               ? ['Le témoin qui devait confirmer ce nom n’est jamais arrivé jusqu’ici, et personne, ce soir non plus, n’a pris sa place.']
               : [])]
          : ['Le juge referme le dossier. « Rien de nouveau, » dit-il, et pour une fois il n’a pas tort.',
             'Vous ressortez du palais avec ce que vous y aviez apporté. Ce n’était pas assez.']

        if (a('denouement-verite')) return { tous: texteVerite, fin: true }
        if (a('denouement-tractation')) return { tous: texteTractation, fin: true }

        const verite = a('hayden-confirme') && (a('depose:lester-innocent') || a('depose:amant-secret'))
        const tractation = a('depose:enregistrement-recupere')

        if (verite && tractation)
          return { tous: ['La salle attend. Vous avez de quoi faire les deux — dire la vérité, ou la garder pour un usage plus utile qu’un tribunal. Ce n’est pas au juge de trancher ça.'],
                   dialogue: 'verdict' }
        if (verite) return { tous: texteVerite, flags: ['denouement-verite'], fin: true }
        if (tractation) return { tous: texteTractation, flags: ['denouement-tractation'], fin: true }

        /* Le geste en deux temps, motif déjà écrit trois fois (le sas,
           la porte de la laverie, la récusation) : la défaite reste
           possible, mais elle devient décidée plutôt que subie en un
           clic. `sortie-annoncee` est transitoire — relu ici seulement,
           pas de ligne de bilan : il raconte une hésitation, pas un
           fait. */
        if (!a('sortie-annoncee'))
          return { tous: 'Le juge attend. Vous n’avez rien posé sur ce pupitre qui change son dossier.',
                   flags: ['sortie-annoncee'] }
        return { tous: texteEchec, flags: ['denouement-echec'], fin: true }
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
                '« L’audience est repoussée. De plusieurs jours. Ce qui veut dire qu’on a le temps — et qu’on n’a plus le choix de s’en servir. »',
                /* Chantier 48.c (`PLAN_NOEUDS_DE_CHAOS` § E0) : le sujet
                   `contrat` reste un choix à l'aveugle sans cette ligne —
                   McCarthy annonçait la récusation, jamais ce qu'elle
                   ouvrait. Les deux sujets ne changent pas : `contrat`
                   referme (`fin: true`, `sortir.utiliser`), `abri`
                   continue (`va: 'retour'`). */
                '« Vous le renvoyez à McNeil, le contrat est rempli, et vous rentrez. Ou vous cherchez qui a fait ça, et je paie les jours. »'],
      retour: ['« L’audience est repoussée. C’est tout ce que je sais de plus que tout à l’heure. »'],
      sujets: [
        {
          id: 'abri',
          titre: '« On le remet à l’abri. »',
          quand: ({ a }) => !a('recusation-dite'),
          flags: ['recusation-dite', 'recuse-abri'],
          /* Le VISUEL en plus du drapeau, jamais l'un sans l'autre :
             `data-etat` lit `etat.visuels`, pas `etat.flags`, et c'est lui
             que `scene-tribunal-salle.css` interroge pour retourner la fiche
             du rôle. `choisit()` (`main.js`) honore `sujet.visuels`. */
          visuels: ['recusation-dite'],
          fin: true,
          texte: ['« … D’accord. » Un silence, puis : « Je préviens McNeil. Un nouveau passeur, ce soir. »',
                  '« Vous savez ce que vous ouvrez, en disant ça ? »'],
        },
        {
          id: 'contrat',
          titre: '« Le contrat est rempli. On s’arrête là. »',
          quand: ({ a }) => !a('recusation-dite'),
          flags: ['recusation-dite', 'recuse-contrat'],
          /* Le VISUEL en plus du drapeau, jamais l'un sans l'autre :
             `data-etat` lit `etat.visuels`, pas `etat.flags`, et c'est lui
             que `scene-tribunal-salle.css` interroge pour retourner la fiche
             du rôle. `choisit()` (`main.js`) honore `sujet.visuels`. */
          visuels: ['recusation-dite'],
          fin: true,
          texte: ['« … Très bien. » Il ne discute pas. « Il sera vivant à dix heures. C’est ce qu’on vous a payés à faire. »',
                  'Il raccroche avant vous.'],
        },
      ],
    },

    /* ══ LE VERDICT — rang 10, §8 : « 2 et 3 ne s'excluent pas » ═══════
       Aucun interlocuteur, comme `conseil` (`retour.js`, chantier 35) :
       c'est l'équipe qui décide, d'où `qui: 'recit'`. Ouvert seulement
       quand les deux retombées sont réunies (`sortir.utiliser`) — sinon
       il n'y a rien à choisir, et le tableau tranche tout seul. */
    verdict: {
      qui: 'recit',
      accueil: ['Deux issues, et aucune n’efface l’autre. La dire, ici, devant tout le monde — ou la garder, et la vendre plus tard à qui a le plus à perdre à ce qu’elle se dise.'],
      retour: ['La décision n’est toujours pas prise.'],
      sujets: [
        {
          id: 'verite',
          titre: '« On le dit. Ici, maintenant, à voix haute. »',
          acteur: 'trash',
          fin: true,
          flags: ['denouement-verite'],
          texte: [
            ['trash', '« Hayden Telestrian a tué Teresa Banks. On a de quoi le montrer, et on ne le vendra à personne. »'],
            'Le juge ne dit rien. Le procureur, pour la première fois de la nuit, prend une note qui compte.',
          ],
        },
        {
          id: 'tractation',
          titre: '« On garde ça pour une meilleure table. »',
          acteur: 'hercules',
          fin: true,
          flags: ['denouement-tractation'],
          texte: [
            ['hercules', '« On ne dit rien ici. On le dit ailleurs, à quelqu’un qui a plus à perdre qu’un procureur fatigué. »'],
            'Personne, dans la salle, ne remarque ce qui vient de ne pas se passer.',
          ],
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
          trash: '« Regardez ses mains. »',
          rabbit: '« Le rapport est formel. Personne ne l’avait contesté parce que personne ne l’avait lu. »',
          drakk: ['« Le rapport dit une chose. L’accusation en dit une autre. »', '« Le rapport a été écrit par quelqu’un qui regardait le corps. »'],
        },
      },
      'registre-anterieur': {
        registre: 'tient',
        dit: {
          tous: 'Tu poses le registre du greffe. L’heure du transfert y est antérieure à l’arrestation elle-même, et personne ne l’a corrigée depuis.',
          hercules: '« Quelqu’un a écrit la fin avant qu’on écrive le début, Votre Honneur. Ce n’est pas une preuve contre mon client. C’en est une contre le dossier. »',
          trash: '« La date est dans le registre. »',
          rabbit: '« L’horodatage se vérifie en deux clics. Je vous invite à les faire. »',
          drakk: ['« Le piège était tendu avant qu’il entre. »', '« Voilà quand. »'],
        },
      },
      'pas-de-proces': {
        registre: 'tient',
        dit: {
          tous: 'Tu déposes le rapprochement lui-même : un dossier vide, un transfert déjà verrouillé avant qu’il n’existe. Le juge relit les deux pièces côte à côte.',
          hercules: '« On ne cherche pas à le faire condamner, Votre Honneur. On cherche à ce qu’il n’y ait pas d’audience du tout. Vous êtes en train d’assister à l’échec de ce plan. »',
          trash: '« Quelqu’un ne veut pas qu’il arrive jusqu’au jury. »',
          rabbit: '« Deux systèmes séparés. La même heure, à la seconde près. »',
          drakk: '« Ils savaient où ça finirait avant de commencer. »',
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

      /* ══ RANG 10 — LES QUATRE FICHES DE L'ACTE IV ═══════════════════
         Additif, comme le reste du chantier (D7) : les quatre réponses
         ci-dessus, écrites pour la 1ʳᵉ audience, ne changent pas d'une
         ligne. `hayden` seule est une fonction — la seule fiche que
         Chimera peut encore atteindre (D9, `chimera-avance`, posé dans
         `appelle()`, `main.js`) : il ne peut plus toucher ni Lester
         (McNeil) ni l'équipe (pas de combat, §11), seulement ce
         témoignage-là, parce que c'est le seul qui NOMME quelqu'un. */
      'lester-innocent': {
        registre: 'tient',
        dit: {
          tous: 'Tu déposes le journal du maglock, à côté de ce que la Lone Star a relevé et jamais versé. Le juge lit les deux pièces dans l’ordre, puis les relit dans l’autre sens.',
          hercules: '« La Lone Star savait, Votre Honneur. Avant nous, avant lui, avant vous. Elle a choisi d’écrire un autre nom à la place. »',
          trash: ['« Ils l’ont eue entre les mains. »', '« Ils l’ont rangée. »'],
          rabbit: ['« Un journal d’accès, un relevé d’ADN, trois jours de silence entre les deux. »', '« Horodaté deux fois. »'],
          drakk: ['« Ils savaient qui c’était depuis le début. »', '« Ils ont pris le plus proche. »'],
        },
      },
      'amant-secret': {
        registre: 'tient',
        dit: {
          tous: 'Tu déposes ce que le Shameless a rendu : une voiture qui ne se garait jamais deux fois au même endroit, un commlink coupé avant chaque rendez-vous. Le juge fronce les sourcils — pour la première fois, pas contre Lester.',
          hercules: '« Elle protégeait quelqu’un, Votre Honneur. Ce n’était pas mon client. »',
          trash: '« Quelqu’un le lui avait appris. »',
          rabbit: ['« Beaucoup de prudence, pour une liaison ordinaire. »', '« Ce n’est pas elle qui payait la discrétion. »'],
          drakk: '« Elle portait le secret de quelqu’un d’autre. Voilà un motif que personne n’avait cherché. »',
        },
      },
      'enregistrement-recupere': (ctx) => ({
        registre: 'tient',
        dit: {
          tous: ctx.a('bombe-declenchee')
            ? 'Tu déposes ce qu’il en reste — une bande abîmée, à moitié lisible, mais sa voix y est encore. Le juge demande qu’on l’écoute en chambre, pas en pleine salle.'
            : 'Tu déposes l’enregistrement, intact. Quatre titres, et elle qui parle entre les prises — une voix que ce dossier n’avait jamais portée.',
          hercules: '« Ce n’est pas une preuve, Votre Honneur. C’est elle. Personne, ici, ne l’avait encore entendue. »',
          trash: ['« Je ne dépose pas ça pour gagner le procès. »', '« Elle chantait. Il fallait que quelqu’un l’entende ici. »'],
          rabbit: ['« Authentifié, non modifié. »', '« Il y a sa voix dessus. Ce n’est pas dans les trois pages. »'],
          drakk: '« Elle parle encore, entre deux prises. »',
        },
      }),
      /* Nœud 1, chantier 53 : le ternaire passe de deux à trois branches.
         La 3ᵉ, sous `chimera-avance` ET `renfield-retourne`, rattrape la
         2ᵉ — non par un objet ni un re-essai, mais par une décision
         sociale prise des tours plus tôt (`carte.js`). Renfield
         n'apparaît pas dans la salle : son absence est précisément ce
         qui agit, cohérente avec l'ouverture déjà écrite plus haut
         (`ouverture`, la 2ᵉ visite). */
      hayden: (ctx) => {
        if (ctx.a('chimera-avance') && ctx.a('renfield-retourne'))
          return {
            registre: 'tient',
            flags: ['hayden-confirme', 'renfield-temoigne'],
            dit: {
              tous: 'Tu prononces le nom — Hayden Telestrian — et personne, du côté de la famille, ne se lève pour le contester. Ils le savent déjà : quelqu’un le leur a dit cette nuit, dans une voix qu’ils écoutent depuis quarante ans.',
              hercules: '« Personne ne conteste, Votre Honneur. Ils savaient déjà — quelqu’un les a devancés, cette nuit même. »',
              trash: '« Ils l’ont su avant nous. Tant mieux, pour une fois. »',
              rabbit: '« Zéro objection au dossier. Je n’ai jamais vu — »',
              drakk: '« Un vieil homme a parlé à des parents avant que nous ayons parlé au juge. »',
            },
          }
        if (ctx.a('chimera-avance'))
          return {
            registre: 'retourne',
            flags: ['hayden-conteste'],
            dit: {
              tous: 'Tu prononces le nom — Hayden Telestrian — et tu attends le témoin qui devait le confirmer. Il ne vient pas. Quelqu’un lui a parlé avant vous.',
              hercules: '« On avait un nom, Votre Honneur. On n’a plus que ça, à présent. »',
              trash: '« Il a eu peur. On n’a pas été assez rapides. »',
              rabbit: ['« Le témoin s’est rétracté ce matin. »', '« Quelqu’un a gagné du temps. »'],
              drakk: ['« Le nom tient toujours. »', '« C’est la bouche qui devait le dire qui manque. »'],
            },
          }
        return {
          registre: 'tient',
          flags: ['hayden-confirme'],
          dit: {
            tous: 'Tu déposes le nom, et ce qui le tient debout : un prénom mal écrit, un nom de famille que tout le Tír connaît, et personne dans cette salle pour le contredire.',
            hercules: '« Hayden Telestrian, Votre Honneur. Ce n’est plus une rumeur — c’est un nom, avec une adresse derrière. »',
            trash: '« Je connais cette famille. Je sais ce qu’elle fait, d’habitude, de ce qui la gêne. Cette fois, elle n’a pas eu le temps. »',
            rabbit: '« Deux témoins indépendants. La même faute d’orthographe. »',
            drakk: '« Nous avions le nom depuis Loveland. La salle l’a, enfin. »',
          },
        }
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
