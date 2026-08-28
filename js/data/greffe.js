/* ============================================================
   TABLEAU 3 — LE GREFFE DE McNEIL. ~4 H DU MATIN.

   Au texte : « Là-bas, ils devront présenter le mandat de transfert
   pour extraire la cible. » Tout le conflit tient dans une ligne de
   registre : le transfert y est inscrit à 08:00, par la navette. Or
   c'est précisément dans la navette de huit heures que Lester doit
   mourir — McCarthy l'a dit au tableau 1.

   Le gardien n'est pas un ennemi. Il est seul, il a sommeil, et il a
   peur de son règlement. C'est ça qu'il faut résoudre.

   DEUX ROUTES, et elles ne coûtent pas la même chose :
     A — social : Trash lit POURQUOI il refuse, ou Drakk voit qu'il est
         seul ; Hercules s'en sert pour lui offrir une couverture.
     B — matrice : White_Rabbit réécrit l'ordre. Plus rapide, plus sale,
         et ça laisse une trace qui resservira contre eux.
   ============================================================ */

import { equipiers } from './equipiers.js'

export const greffe = {
  markup: 'scenes/greffe.html',

  /* Chantier 33 : `visite` vient de `charge()`. La projection astrale de
     Trash (cible `sas`, ci-dessous) fait un aller-retour vers un second
     tableau (`greffe-cellule`) — même bug de principe que celui trouvé au
     chantier 13 sur `quai`, corrigé ici avant qu'il n'existe. */
  ouverture: ({ a }, visite) => visite > 1
    ? ['Le guichet, encore. Le gardien n’a pas bougé. Trash cligne des yeux, une seconde de trop pour que ce soit juste un clignement.']
    : [
        a('esprit-eau')
          ? 'Greffe de l’établissement pénitentiaire de McNeil. 3 h 46. Vous avez de l’avance, et personne n’a l’habitude d’en avoir.'
          : 'Greffe de l’établissement pénitentiaire de McNeil. 4 h 12.',
        'Néons trop blancs, murs vert administration, un banc pour ceux qui attendent. Personne n’attend.',
        'Derrière la vitre du guichet, un seul homme de garde. Il vous a vus, et il n’a pas l’air content d’être vu.',
        'OBJECTIF — faire sortir Lester maintenant. Pas à huit heures.',
      ],

  vues: {
    sociale: ['Un guichet, un homme seul derrière, et une pancarte « PAS DE SERVICE APRÈS MINUIT » que personne n’a retirée depuis des années.',
               '« Il est seul, il est fatigué, et il n’a personne à qui rendre des comptes avant sept heures. »',
               '« C’est un homme, pas une porte. »'],
    astrale: ['Le lieu est propre, au sens astral : rien n’est passé ici depuis longtemps.',
              '« Sauf lui. Regarde-le. »'],
    ra: ['Le réseau interne est cloisonné, mais le guichet public ne l’est pas.',
         '« Le registre des mouvements est consultable. »',
         '« Consultable, donc modifiable. »'],
    materielle: ['Une vitre à l’épreuve, un comptoir en U, une seule porte entre le hall et le couloir des cellules. Personne ici n’a jamais eu à la défendre.',
               '« Un donjon sans monstre. »',
               '« Ce qui va nous coûter cher ici, c’est le registre. »'],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js).

       Chacun a une ligne dans la voix de chacun des trois autres. */

    ...equipiers('greffe'),


    hygiaphone: {
      nom: 'L’hygiaphone',
      regarder: {
        tous: 'Une vitre épaisse, une grille de laiton, et un plateau tournant en dessous pour passer les papiers.',
        drakk: '« Un guichet de forteresse. On parle au gardien, on ne le touche pas. »',
      },
      /* Une fois `sas-ouvert`, il n'a plus rien à négocier : revenir au
         guichet ne doit plus rouvrir le dialogue (§ boucle constatée en
         playtest le 2026-08-21 — le joueur y retournait faute d'un
         signal clair que la porte, elle, était déjà ouverte). */
      utiliser: ({ a }) => a('sas-ouvert')
        ? 'Il ne lève plus les yeux. Il a déjà fait son geste.'
        : a('parle:gardien')
          ? 'Vous avez déjà parlé. Il attend de voir ce que vous allez faire.'
          : { tous: 'Tu te penches vers la grille. Le gardien lève les yeux de son écran.',
              dialogue: 'gardien' },
      parler: ({ a }) => a('sas-ouvert')
        ? 'Il ne lève plus les yeux. Il a déjà fait son geste.'
        : { texte: [], dialogue: 'gardien' },
    },

    gardien: {
      nom: 'Le gardien de nuit',
      regarder: {
        tous: ['Uniforme de l’administration pénitentiaire, brassard, et une tasse à côté du clavier.',
               'Il a trente-cinq ans et l’air d’en avoir cinquante à cette heure-ci.'],
        hercules: ['« Il ne nous déteste pas. Il ne veut pas d’ennuis. »', '« Ce n’est pas la même serrure, et je préfère largement celle-là. »'],
        drakk: ['« Un seul défenseur, et une porte double derrière lui. »', '« C’est lui qui tient le pont. »'],
      },
      parler: ({ a }) => a('sas-ouvert')
        ? 'Il ne lève plus les yeux. Il a déjà fait son geste.'
        : { texte: [], dialogue: 'gardien' },
      utiliser: 'Il y a huit centimètres de vitre. Et ce serait une très mauvaise idée.',
    },

    /* ══ LESTER ═══════════════════════════════════════════════════════
       Avant : le sas ouvert menait droit à `va: 'retour'`, et son
       arrivée n'était qu'une ligne de texte au milieu de la sortie —
       jamais un corps à l'écran. Il entre maintenant EN DEUX TEMPS
       (même geste qu'au voilier, chantier 25) : la porte s'ouvre et il
       apparaît, puis un second clic sur `sas` fait vraiment partir. */
    lester: {
      nom: 'Lester',
      regarder: {
        tous: ['Il sort du sas en clignant des yeux — la lumière du couloir est la première chose vive qu’il voit depuis longtemps.',
               'Combinaison de détention, deux tailles trop grande. Il compte les quatre visages devant lui, un par un.'],
        hercules: '« Vingt ans. Et il compte les gens avant de compter les issues. J’aurais fait pareil. »',
        trash: '« Son aura est petite, serrée sur elle-même. Elle vient de comprendre qu’elle a le droit d’occuper un peu plus de place. »',
        rabbit: '« Aucun SIN. Officiellement, il n’existe pas. On vient de faire sortir quelqu’un qui n’existe pas. »',
        drakk: ['« Il ne remercie pas. »', '« Il vérifie d’abord qu’on n’a pas besoin d’un autre otage. »'],
      },
      parler: ({ a }) => a('parle:lester-greffe')
        ? '« … » Il n’a plus rien à ajouter, pas ici.'
        : { tous: 'Personne ne sait par où commencer, alors Hercules commence par le plus simple.',
            hercules: '« On te sort d’ici. On t’explique en marchant. »',
            flags: ['parle:lester-greffe'] },
      utiliser: 'On ne le prend pas par le bras. Il vous suit, à son rythme.',
    },

    registre: {
      nom: 'Le registre des mouvements',
      regarder: ({ a }) => a('vu-registre')
        ? 'Toujours 08:00. Toujours la navette.'
        : { tous: ['Un listing papier posé sur le comptoir, tourné vers lui. En le lisant à l’envers :',
                   'LESTER — TRANSFERT TRIBUNAL DOWNTOWN — 08:00 — NAVETTE.'],
            hercules: '« Huit heures. La navette. Exactement ce que le vieux flic voulait éviter. »',
            trash: '« Écrit à l’avance, et pas par lui. La ligne est plus ancienne que sa prise de service. »',
            flags: ['vu-registre'], fiches: ['registre-anterieur'] },
      utiliser: 'Il est de son côté de la vitre.',
    },

    sas: {
      nom: 'Le sas',
      /* Deux destinations possibles (`greffe-cellule` en projection
         astrale, `retour` une fois Lester sorti) selon l'état — pas une
         seule chaîne connue d'avance. `true` reste générique : l'étape B
         (`PLAN_LISIBILITE.md` §3.3) ne nomme la destination QUE si elle
         est fixe, jamais en la devinant. */
      sortie: true,
      regarder: {
        tous: 'Deux battants blindés, un verrou électromagnétique de chaque côté, et une vitre longue comme une main.',
        drakk: ['« Verrou double. Il ne cède ni à l’épaule ni au levier. »', '« Celui-là s’ouvre par la parole. »'],
        rabbit: '« Commandé depuis le poste, pas depuis le réseau. Je ne peux pas l’ouvrir d’ici. »',
        /* La lentille annonce, la main exécute (PLAN_CAPACITES § 2) : la
           projection astrale n'est atteignable qu'après avoir été montrée
           ici, dans la voix de Trash — même geste que `aura-gardien` et
           `ordre` plus bas pour Drakk et White_Rabbit. */
        trash: '« Le battant est plein. L’astral, lui, ne l’est pas. Je peux passer voir, si vous voulez. »',
      },
      /* Chantier 33 — la projection astrale (PLAN_CAPACITES § 3, Trash).
         Avant que le sas ne s'ouvre pour de vrai, Trash peut y aller SEUL,
         sans corps : `va: 'greffe-cellule'`, gratuit (D3 — voir n'est pas
         agir), et son corps reste ici, debout, pendant ce temps-là — les
         trois autres le constatent s'ils cliquent ailleurs qu'sur lui. */
      utiliser: ({ a, qui }) => {
        if (!a('sas-ouvert')) {
          if (qui === 'trash')
            return { tous: ['Trash pose une main à plat sur le battant froid, et ferme les yeux.',
                             'Son corps reste debout, contre la vitre. Le reste de lui passe au travers, sans bruit.'],
                     trash: '« Je reviens. »',
                     va: 'greffe-cellule' }
          return { tous: 'Verrouillé. Il s’ouvre depuis le poste, et le poste ne veut pas.',
                   drakk: '« Inutile de pousser. J’ai déjà poussé. »' }
        }
        if (!a('lester-arrive'))
          return { tous: ['Le sas s’ouvre en deux temps, avec le bruit d’un frigo qu’on débranche.',
                          'On vous amène Lester. Il a l’air d’avoir vingt ans, et d’en avoir seize.',
                          'Il ne demande pas qui vous êtes. Il regarde la porte derrière vous, celle par laquelle on repart.'],
                   flags: ['lester-arrive'], visuels: ['lester-arrive'] }
        return { tous: 'Le voilier est au ponton, la pluie n’a pas cessé, et Tacoma est de l’autre côté du détroit.',
                 minutes: 35, va: 'retour' }
      },
    },

    banc: {
      nom: 'Le banc',
      regarder: {
        tous: 'Un banc de bois vissé au sol, poli par des années de gens qui attendaient de mauvaises nouvelles.',
        trash: ['« Beaucoup de peur est passée là. Vieille, tassée. »', '« Ce n’est plus de la trace. »'],
      },
      utiliser: '« On s’assoit quand on a réussi », dit quelqu’un, et personne ne s’assoit.',
    },

    camera: {
      nom: 'La caméra',
      regarder: {
        tous: 'Un dôme noir dans l’angle, au-dessus du guichet.',
        rabbit: '« Elle enregistre en local, écrasement toutes les soixante-douze heures. Personne ne la regarde en direct à quatre heures du matin. »',
      },
      utiliser: {
        tous: 'Un dôme fixe, à trois mètres du sol. Rien à quoi se raccrocher.',
        rabbit: '« Je pourrais la geler une minute. Je ne peux pas effacer ce qu’elle a déjà vu, et ce n’est pas ce soir qu’il faut essayer. »',
      },
    },

    horloge: {
      nom: 'L’horloge',
      /* L'heure d'arrivée dépend de la route prise au voilier (§ D13,
         26 min avec l'esprit de l'eau contre 40 sans) — déjà reflété
         dans `ouverture`, ici recalculé pour rester d'accord avec elle.
         La ligne de Trash ne vaut, elle, que s'il s'est épuisé pour ça. */
      regarder: ({ a }) => ({
        tous: a('esprit-eau')
          ? '3 h 46. Six heures quatorze avant l’audience.'
          : '4 h 12. Cinq heures quarante-huit avant l’audience.',
        trash: a('trash-epuise') ? '« J’ai mal au bras. Ne me demandez pas de recommencer. »' : undefined,
        hercules: '« Et une heure de bateau au retour. On a moins de marge que ça n’en a l’air. »',
      }),
      utiliser: 'La régler ne ferait pas gagner une minute, et vous n’êtes pas de son quart.',
    },

    /* ── Astral ─────────────────────────────────────────────────── */
    /* D13 — L'ESPRIT DE L'EAU SE PAIE ICI.
       Appeler l'esprit au quai fait gagner quatorze minutes et évite une
       patrouille. C'était gratuit : `trash-epuise` était posé et ne
       coûtait rien. Il coûte maintenant la lecture astrale du gardien —
       c'est-à-dire la clé la plus directe de la route sociale. Il reste
       celle de Drakk (`angle-mort`), plus lente et moins sûre.
       Un pouvoir gratuit n'est pas un choix. */
    'aura-gardien': {
      nom: 'L’aura du gardien',
      regarder: ({ a }) => a('trash-epuise')
        ? { tous: 'Autour de lui, quelque chose de serré et de jaune. La couleur ne veut rien dire tant que personne ne la lit.',
            trash: ['« Je ne peux pas. »',
                    '« J’ai laissé mon bras dans l’eau du port et je ne l’ai pas encore récupéré. Tout est flou de ce côté-là. »',
                    '« Demandez à Drakk. Lui, il compte les gens. »'] }
        : { tous: 'Autour de lui, quelque chose de serré et de jaune.',
            trash: ['« Il n’est pas hostile. Il est terrifié. »',
                    '« Pas de nous : de son propre règlement. Il a quelque chose à perdre et il ne veut pas le perdre cette nuit. »',
                    '« Ne le menacez pas. Couvrez-le. »'],
            flags: ['sait-peur-gardien'] },
      utiliser: {
        tous: 'On ne touche pas une aura. On la lit, et on agit avec ce qu’elle dit.',
        trash: '« Elle ne se force pas. Elle se croit. »',
      },
    },

    /* ── RA ─────────────────────────────────────────────────────── */
    ordre: {
      nom: 'L’ordre de transfert',
      regarder: {
        tous: 'Au-dessus du registre, une fiche ambrée : ORDRE DE MOUVEMENT — 08:00.',
        rabbit: ['« Le guichet est public. La fiche est en lecture… et l’horodatage n’est pas signé. »',
                 '« Je peux la passer à 04:30. Ça prend quarante secondes. »',
                 '« Ça laissera une trace, et quelqu’un la trouvera. Mais pas cette nuit. »'],
      },
      utiliser: ({ a, qui }) => {
        if (a('sas-ouvert')) return 'C’est fait. Inutile d’y toucher deux fois.'
        if (qui !== 'rabbit')
          return { tous: 'Il faudrait un deck et savoir où poser les mains.',
                   hercules: '« Ce n’est pas mon rayon. C’est le sien. »' }
        return {
          tous: ['White_Rabbit pose deux doigts sur son deck et ne bouge plus pendant quarante secondes.',
                 'La fiche clignote une fois. ORDRE DE MOUVEMENT — 04:30.',
                 'Derrière la vitre, le gardien fronce les sourcils, relit son écran, hausse les épaules, et tend la main vers le bouton du sas.'],
          rabbit: '« C’est propre. Ce n’est pas invisible, mais c’est propre. »',
          flags: ['sas-ouvert', 'trace-matricielle'],
          visuels: ['sas-ouvert'],
        }
      },
    },

    /* ── Tactique ───────────────────────────────────────────────── */
    'angle-mort': {
      nom: 'Le champ de la caméra',
      regarder: {
        tous: 'Un cône rouge part du dôme et couvre tout le guichet.',
        drakk: ['« Elle voit le guichet, pas le banc. Et lui, il est seul. »',
                '« Pas de second garde, pas de relève avant l’aube. S’il appelle du renfort, il attend vingt minutes comme nous. »',
                '« Ce qui veut dire qu’il ne veut pas appeler. Il veut que ça se passe bien. »'],
        flags: ['sait-gardien-seul'],
      },
      utiliser: {
        tous: 'Un angle mort ne se force pas, il se garde en tête.',
        drakk: '« Je le tiens. Si quelqu’un doit s’approcher sans qu’il sursaute, c’est par là. »',
      },
    },

    salle: {
      nom: 'Le greffe',
      regarder: 'Un couloir d’attente, un guichet, un sas. Rien n’a été repeint depuis vingt ans et tout est propre.',
      utiliser: 'On ne réaménage pas un greffe à quatre heures du matin. On sort, ou on reste sages.',
    },
  },

  dialogues: {
    gardien: {
      qui: 'gardien',
      accueil: ['« C’est fermé. Le greffe rouvre à sept heures. »'],
      retour: ['« Toujours là. »'],
      sujets: [
        /* Quatre façons de glisser un papier sous une vitre de huit
           centimètres. Le gardien lit le même feuillet et rend la même
           réponse — c'est un mur — mais il ne regarde pas la même
           personne, et c'est ça qu'on voit. */
        {
          id: 'mandat',
          titre: {
            tous: '(Présenter le mandat de transfert.)',
            hercules: '(Poser le mandat sur le plateau, sans se presser.)',
            trash: '(Glisser le mandat sous la vitre.)',
            rabbit: '(Présenter le mandat, et regarder son écran pendant qu’il lit.)',
            drakk: '(Présenter le mandat de transfert.)',
          },
          quand: ({ a, tient }) => tient('mandat') && !a('sas-ouvert'),
          flags: ['mandat-presente'],
          texte: {
            tous: ['Il fait tourner le plateau, prend le feuillet, le lit deux fois.',
                   '« Il est bon. Signé McCarthy, brigade criminelle. »',
                   '« Mais le mouvement est enregistré à huit heures. Par la navette. »',
                   '« Alors revenez à huit heures. »'],
            hercules: ['« Vous l’avez lu deux fois. »',
                       ['gardien', '« Je lis tout deux fois. »'],
                       '« Bien sûr. »'],
            trash: [['gardien', '« Restez derrière la ligne jaune. »']],
            /* Il ne pirate rien : il regarde un écran à l'envers à
               travers une vitre, ce que n'importe qui peut faire. Ce
               qu'il en tire est petit, et c'est déjà quelque chose. */
            rabbit: ['« Sa ligne est déjà remplie. Il l’a pas tapée ce soir. »',
                     ['gardien', '« Regardez pas mon écran. »'],
                     '« Je regarde le mur derrière. »'],
            drakk: [['gardien', '« Reculez d’un pas, vous. »'],
                    'Drakk recule d’un pas.',
                    ['gardien', '« Voilà. »']],
          },
        },
        /* AUCUNE VARIANTE NE DOIT OUVRIR LE SAS. Deux sujets exclusifs
           le font déjà — `couverture` pour Hercules, `menacer` pour
           Drakk — et le premier demande d'avoir appris quelque chose sur
           cet homme. Ici, les quatre échouent : Hercules tente l'angle
           faible et se le fait renvoyer (c'est ce qui lui donne l'idée
           du bon), Drakk pousse un peu et s'arrête tout seul. */
        {
          id: 'urgence',
          titre: {
            tous: '« Il ne doit pas monter dans cette navette. »',
            hercules: '« Vous savez ce qui arrive aux gens qu’on transfère à huit heures ? »',
            trash: '« Vous êtes seul ici toute la nuit ? »',
            rabbit: '« Cette ligne à huit heures, elle est datée de quand ? »',
            drakk: '« Il ne doit pas monter dans cette navette. »',
          },
          quand: ({ a }) => a('mandat-presente') && !a('sas-ouvert'),
          texte: {
            tous: ['« Je sais pas ce que vous racontez et je veux pas le savoir. »',
                   '« Moi j’ai un registre. Le registre dit huit heures. »',
                   '« Qui l’a écrit, cette ligne ? Elle était là quand j’ai pris mon service. Je regarde pas qui signe. »'],
            /* Il attaque par la peur du gamin. Mauvais angle : ce n'est
               pas le gamin qui inquiète le gardien, c'est lui-même. Le
               gardien le lui dit sans le savoir, et Hercules l'entend. */
            hercules: [['gardien', '« Il leur arrive ce qui est écrit sur le registre. »'],
                       '« Et si c’était mal écrit ? »',
                       ['gardien', '« Alors c’est pas moi qui l’ai mal écrit. »'],
                       '« … Ah. »'],
            /* Trash ne plaide pas. Il demande à l'homme s'il est seul,
               et l'homme répond à côté — ce qui est une réponse. */
            trash: [['gardien', '« Y a une relève à six heures. »'],
                    '« Ce n’est pas ce que j’ai demandé. »',
                    ['gardien', '« Je sais. »'],
                    'Il se remet à son écran, et il ne le regarde pas.'],
            rabbit: [['gardien', '« J’en sais rien. »'],
                     '« Vous pouvez le voir. C’est marqué à côté. »',
                     ['gardien', '« Je vais rien regarder du tout. »'],
                     '« Non. Vous allez pas. »'],
            /* Il monte d'un cran et redescend seul : sa vraie tentative
               est un autre sujet, et il le sait sans se le formuler. */
            drakk: ['« Vous tenez une porte. C’est un poste honorable. »',
                    ['gardien', '« C’est un poste payé. »'],
                    '« … Oui. »'],
          },
        },
        {
          id: 'couverture',
          titre: '« Un ordre signé vous couvre. La navette, non. » (Hercules)',
          acteur: 'hercules',
          quand: ({ a }) => a('mandat-presente') && !a('sas-ouvert')
                            && (a('sait-peur-gardien') || a('sait-gardien-seul')),
          flags: ['sas-ouvert'],
          visuels: ['sas-ouvert'],
          texte: ['« Vous avez peur d’être celui qui a signé la sortie. Je comprends. »',
                  '« Mais réfléchissez à l’autre côté : si ce gamin monte dans la navette et qu’il n’en descend pas, on cherchera qui l’y a mis. »',
                  '« Là, vous aurez un mandat signé par un inspecteur, et une heure notée de votre main. C’est vous qui serez couvert. »',
                  '« … »',
                  'Il regarde le mandat. Il regarde l’horloge. Il note quelque chose, et sa main va vers le bouton du sas.'],
        },
        {
          id: 'menacer',
          titre: '« Ouvrez cette porte. » (Drakk)',
          acteur: 'drakk',
          quand: ({ a }) => a('mandat-presente') && !a('sas-ouvert'),
          texte: ['Drakk se penche vers la grille. La vitre fait huit centimètres.',
                  '« Ouvrez ce pont-levis, gardien. »',
                  '« … C’est ça. Et je préviens la relève, aussi. »',
                  'Ça n’a pas marché. Ça n’a rien cassé non plus, ce qui est déjà beaucoup.'],
        },
        /* Le signal qui manquait : une fois `sas-ouvert`, c'est la SEULE
           option qui reste, et elle dit où aller — au lieu de laisser
           mandat/urgence tourner en boucle sans plus rien à offrir. */
        {
          id: 'ouvert',
          titre: '(Y aller.)',
          quand: ({ a }) => a('sas-ouvert'),
          fin: true,
          texte: ['Il ne lève plus les yeux. Le sas, derrière vous, est déjà en train de s’ouvrir.'],
        },
        {
          id: 'partir',
          titre: '(Se taire une seconde.)',
          quand: ({ a }) => !a('sas-ouvert'),
          fin: true,
          texte: ['Il retourne à son écran.'],
        },
      ],
    },
  },
}
