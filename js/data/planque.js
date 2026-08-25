/* ============================================================
   TABLEAU 5 — LA PLANQUE. Une laverie automatique de Tacoma, 6 h.

   Le scénario dit : « se planquer, et enfin se pointer à l'heure à
   l'audience. » Deux heures à tuer dans un endroit ouvert la nuit, avec
   un gamin qu'on vient de sortir de prison et qu'on ne connaît pas.

   ══ G5, LE VERROU-MANIFESTE ══════════════════════════════════════════
   > « G5 ne s'ouvre qu'en parlant : c'est le verrou-manifeste du jeu,
   >   celui qui dit qu'un gamin terrifié n'est pas une serrure. »
   >   — CONCEPTION.md § 7

   Et il faut le lire avec la règle 19 : une conséquence AJOUTE, elle ne
   retire jamais. Donc le verrou ne dépend d'AUCUNE chaîne. Lester
   accepte toujours d'aller au tribunal — c'est le job, et il n'a nulle
   part ailleurs où aller.

   Ce qui change, c'est s'il PARLERA une fois là-bas. `lester-temoigne`
   est le seul enjeu de ce tableau, et il se gagne en écoutant.

   Trois sources de confiance sont ouvertes à tout le monde, dans cette
   scène, sans rien avoir fait avant. Cinq autres sont des paiements de
   chaînes plantées ailleurs. Il en faut TROIS.

   ══ ET UNE QUI COÛTE ═════════════════════════════════════════════════
   Lui proposer de l'argent lui retire de la confiance. C'est le seul
   endroit du jeu où une action en enlève, et c'est précisément le
   propos : on ne l'achète pas.
   ============================================================ */

/* ══ LES SOURCES DE CONFIANCE, ET CE QU'ELLES PÈSENT ═══════════════════
   Trois sujets sont ouverts à tout le monde sans rien avoir fait avant ;
   les autres paient des chaînes plantées ailleurs dans la nuit. Le seuil
   est de TROIS.

   Mesuré le 2026-08-22, et c'était le trou : trois sources gratuites pour
   un seuil de trois. Un joueur qui n'avait rien fait de la nuit — pas une
   fiche, pas un recoupement, Lester blessé, la Star sur le dos — obtenait
   la meilleure fin en trois clics de dialogue dans la dernière pièce, et
   les cinq chaînes plantées ailleurs ne pouvaient rien ajouter à un
   compteur déjà plein. Vérifié en jeu, pas déduit.

   LE PLAFOND, ET RIEN D'AUTRE. Les gratuites comptent pour deux au
   maximum : la décence ordinaire mène au bord, jamais de l'autre côté.
   Il faut donc AU MOINS UNE chaîne — six existent, chacune ouverte par un
   runner ou un geste différent, et deux d'entre elles (`conf-teresa`,
   `conf-dossier`) sont atteignables dans n'importe quelle partie. Personne
   ne peut se retrouver bloqué ; personne ne peut y arriver sans avoir
   écouté au moins une fois. */
const GRATUITES = ['conf-job', 'conf-question', 'conf-silence']
const CHAINEES  = ['conf-teresa', 'conf-guilde', 'conf-bras',
                   'conf-mccarthy', 'conf-deduction', 'conf-dossier',
                   /* Elle se mérite en éteignant une pièce pour quelqu'un —
                      mais elle se GAGNE en le lui laissant dire. Posée par
                      la réaction du tir, elle ouvrait la posture de Lester
                      avant le coup de feu qui la justifie (`joue()` applique
                      les drapeaux avant le texte), et elle était la seule
                      source de confiance à ne pas passer par la parole, ce
                      que G5 refuse. C'est donc un sujet, et il n'existe
                      qu'après. */
                   'conf-abri']

/* ══ LES TROIS PRÉCAUTIONS ═════════════════════════════════════════════
   Ce qu'on peut faire d'une pièce éclairée avant que quelqu'un tire
   dedans. Une par runner, et chacune était déjà à moitié écrite dans le
   décor — c'est le geste qui manquait, pas le texte.

     `camera-aveugle`   CAM-04 et son flux sortant   — White_Rabbit
     `lumiere-coupee`   néon et enseigne, même circuit — Drakk
     `sechoirs-lances`  six sources de chaleur        — Hercules

   Trash n'en a pas, et c'est voulu : sa contribution est de DIRE que
   l'enseigne et le néon sont sur le même circuit. Il voit, les autres
   font. C'est la répartition du tableau depuis le début. */
const PRECAUTIONS = ['camera-aveugle', 'lumiere-coupee', 'sechoirs-lances']
const prises = (a) => PRECAUTIONS.filter((f) => a(f)).length

const compte = (a) =>
  Math.min(GRATUITES.filter((f) => a(f)).length, 2) +
  CHAINEES.filter((f) => a(f)).length -
  (a('conf-perdue') ? 2 : 0)

import { equipiers } from './equipiers.js'

export const planque = {
  markup: 'scenes/planque.html',

  ouverture: ({ a, qui }) => [
    'Une laverie automatique de Tacoma, ouverte vingt-quatre heures. Six heures cinq.',
    'Néons, faïence, six machines et deux séchoirs. C’est le premier endroit de la nuit où l’on voit clairement les visages.',
    'C’est aussi une pièce éclairée avec une baie vitrée sur la rue. Personne ne le dit à voix haute.',
    a('lester-blesse')
      ? 'Lester s’est assis le plus loin possible de la vitre. Il tient son bras et il ne s’appuie pas au dossier.'
      : 'Lester s’est assis le plus loin possible de la vitre. Il ne s’appuie pas au dossier.',
    /* SENS DU DANGER (Hercules, `signature: 'sens-du-danger'`).
       Le crochet du chantier 30, posé au `retour`, sert ici pour la
       seconde fois — et pour la même raison : la laverie est l'autre
       tableau du jeu bâti autour d'une menace encore cachée à l'entrée.
       Un adepte ressent SANS détail : la ligne ne pointe ni la vitre, ni
       la caméra, ni l'heure. Gardée par `attaque-laverie`, parce que
       pressentir un danger déjà encaissé serait un mensonge du moteur. */
    ...(qui === 'hercules' && !a('attaque-laverie') ? [
      ['hercules', '« Je n’aime pas cette pièce. »'],
      ['hercules', '« Je ne saurais pas dire pourquoi, et c’est exactement ce qui me gêne. »'],
    ] : []),
    'OBJECTIF — tenir jusqu’à l’audience. Il reste trois heures cinquante-cinq.',
  ],

  /* `visuels` est vidé à chaque `charge()` : ce qui a été acquis doit
     se reposer à l'entrée, sinon une reprise après F5 rallume la
     caméra qu'on a aveuglée. */
  entree: ({ a }) => [
    ...(a('camera-aveugle') ? ['camera-aveugle'] : []),
    ...(a('lumiere-coupee') ? ['lumiere-coupee'] : []),
    ...(a('sechoirs-lances') ? ['sechoirs'] : []),
    ...(a('attaque-laverie') ? ['vitre-brisee', 'impacts-mur'] : []),
  ],

  /* ══ LA CONFIANCE SE VOIT ═════════════════════════════════════════
     Il en faut trois sur huit pour qu'il témoigne, et le joueur
     l'apprenait AU RIDEAU : on découvrait à la fin qu'on avait joué
     pour quelque chose qu'on ne voyait pas (audit du 22/08).

     Pas de jauge — la doctrine l'interdit, et elle a raison : un
     chiffre transformerait une conversation en score. Trois postures,
     donc, qui se lisent comme du langage du corps et pas comme des
     crans : fermé, il écoute, il a décidé. Le seuil de 3 tombe sur le
     dernier palier — quand il s'ouvre, c'est qu'il parlera.

     Dérivé, pas posé : `conf-perdue` retire deux points, et une marque
     cumulative ne sait pas redescendre. Lui proposer de l'argent le
     REFERME, à l'écran, et c'est tout le propos de ce verrou. */
  derive: ({ a }) => {
    const c = compte(a)
    return [c <= 0 ? 'lester-ferme' : c < 3 ? 'lester-ecoute' : 'lester-ouvert']
  },

  vues: {
    astrale: ['Une laverie ouverte la nuit est un lieu sans mémoire : des milliers de gens y ont passé une heure sans rien y vivre.',
              '« C’est plat. Complètement plat. Sauf lui. »'],
    ra: ['Quatre icônes, dont trois qui essaient de vous vendre du séchage.',
         '« La quatrième ne devrait pas être là. »'],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js).

       Chacun a une ligne dans la voix de chacun des trois autres. */

    ...equipiers('planque'),


    /* ══ LESTER ═══════════════════════════════════════════════════════ */
    lester: {
      nom: 'Lester',
      regarder: ({ a }) => ({
        tous: a('lester-blesse')
          ? ['Assis sur une chaise en plastique orange trop basse pour lui. Il tient son bras contre lui.',
             'Le sang a séché sur la manche et il n’a pas demandé qu’on regarde.']
          : ['Assis sur une chaise en plastique orange trop basse pour lui, dos à la machine du fond.',
             'Il regarde la porte toutes les deux minutes. Pas la vitre : la porte.'],
        hercules: '« Il a choisi la chaise la plus loin de la rue et la plus près de la sortie. Personne ne lui a appris ça à l’école. »',
        /* La lentille DIT ce qu'elle montre. Elle récitait la même
           chose du début à la fin de la scène, pendant que l'aura
           changeait de taille sous les yeux du joueur : Trash décrivait
           un état qui n'était plus le bon. Il lit maintenant le palier
           où l'on en est — sans jamais donner de chiffre, c'est un
           chaman, pas un compteur. */
        trash: a('conf-perdue')
          ? ['« Elle s’est refermée. D’un coup, comme une main. »',
             '« C’était le créditube. Je l’ai vue partir et je n’ai rien dit. »',
             '« Elle se rouvrira peut-être. Pas ce matin. »']
          : compte(a) >= 3
            ? ['« Son aura a doublé depuis le bateau, et elle est tournée vers nous. »',
               '« Pas ouverte par politesse : tournée. Il a décidé quelque chose et il ne l’a encore dit à personne. »',
               '« Ce qu’il dira à la barre, il vient de le décider ici. »']
            : compte(a) >= 1
              ? ['« Son aura est plus grande qu’au bateau. Il prend de la place, maintenant. »',
                 '« Et elle est tournée vers nous. Pas ouverte : tournée. Il attend de voir. »',
                 '« Ce qu’il décidera ce matin, il le décidera dans les deux heures qui viennent. Pas au tribunal. »']
              : ['« Son aura est serrée sur elle-même. Exactement comme au bateau, et il est descendu du bateau il y a une heure. »',
                 '« Il est assis avec nous et il n’est avec personne. »',
                 '« Si on le laisse comme ça, il ira au tribunal et il se taira. »'],
        rabbit: '« Vingt ans. Il a passé plus de temps enfermé cette semaine que moi de toute ma vie, et j’ai grandi dans une tour. »',
        drakk: '« Il ne dort pas alors qu’il pourrait. C’est un homme qui monte encore la garde tout seul. »',
      }),
      parler: { texte: [], dialogue: 'lester' },
      utiliser: 'Non.',
      objets: {
        /* LE REFUS QUI COMPTE. Aucun objet n'ouvre G5, et celui-là ferme
           un peu ce qui était ouvert. C'est le seul endroit du jeu où
           une action retire quelque chose au joueur — et c'est assumé :
           c'est exactement ce que le verrou dit. */
        creditube: ({ a }) => a('conf-perdue')
          ? { tous: 'Tu as déjà essayé. Il n’a pas changé d’avis, et toi non plus tu ne devrais pas.' }
          : { tous: ['Tu poses le créditube sur la table pliante et tu le pousses vers lui.',
                     'Il le regarde longtemps. Puis il regarde chacun de vous, l’un après l’autre.',
                     '« … Ah. »',
                     '« C’est pour que je dise quelque chose, ou pour que je dise rien ? »',
                     'Il ne le prend pas. Il ne le repousse pas non plus. Il le laisse là, et il arrête de vous regarder.'],
              hercules: '« Non — non, ce n’est pas… » Il ne finit pas. C’est la première fois de la nuit.',
              trash: '« C’était une erreur. Je l’ai vue partir et je n’ai rien dit. »',
              flags: ['conf-perdue'] },
        bouteille: {
          tous: 'Il en a déjà bu une gorgée sur le bateau. Il a toussé. Ça a suffi.',
          drakk: '« La compagnie est scellée. On ne rescelle pas. »',
        },
        arme: 'Non. Absolument pas.',
      },
    },

    /* ══ LA PORTE — la sortie, qui s'ouvre toujours ═══════════════════ */
    porte: {
      nom: 'La porte de la laverie',
      sortie: 'tribunal',
      regarder: {
        tous: ['Une porte vitrée qui donne sur le trottoir. Le tribunal est à trente minutes, à Downtown, angle de la 5e.',
               'Il est six heures. On peut partir quand on veut, et c’est le problème : il faut savoir quand.'],
        drakk: '« Unique issue. Je l’ai en visuel depuis que nous sommes entrés et je ne l’ai pas lâchée. »',
        hercules: '« Trop tôt, on attend dehors sous la pluie. Trop tard, on court. Il n’y a pas de bonne heure, il y a une moins mauvaise. »',
      },
      utiliser: ({ a }) => {
        /* ══ NEUF HEURES ═══════════════════════════════════════════════
           EN DEUX TEMPS, comme le sas au greffe et la cabine au voilier :
           le premier clic lève tout le monde, et c'est le mouvement qui
           déclenche le tir ; le second fait vraiment partir.

           Le coup part TOUJOURS. Ce qui change, c'est ce que le tireur
           arrive à lire de la pièce — donc ce que les trois précautions
           ont retiré à sa lunette. Règle 17 : personne ne meurt, ça coûte
           un état ; règle 19 : la vitre ne se répare pas.

           AUCUN `visuels` SUR LA RÉACTION, et c'est le sujet : il
           s'applique AVANT que le texte commence, donc les deux trous
           apparaissaient dans le mur pendant qu'Hercules regardait
           encore l'horloge. La persistance est déjà assurée par
           `entree()`, qui les repose depuis `attaque-laverie` ; ici,
           seules les lignes marquent, et chacune marque ce qu'elle
           dit. */
        if (!a('attaque-laverie')) {
          const n = prises(a)
          const debout = [
            'Huit heures quarante. Hercules regarde l’horloge murale et hoche la tête une fois.',
            'Lester se lève sans qu’on ait à le lui dire. Pour la première fois de la nuit, les cinq sont debout en même temps.',
            { texte: 'La baie vitrée part d’un seul coup, et le bruit n’arrive qu’après — un claquement plat, très loin, de l’autre côté de la rue.',
              visuel: 'vitre-brisee' },
          ]

          /* DEUX PRÉCAUTIONS OU PLUS : il tire sur une pièce qu'il ne
             lit pas. C'est le seul cas où l'on gagne quelque chose, et
             ce qu'on gagne n'est pas de la sécurité — c'est que Lester
             a vu qu'on éteignait une pièce pour lui. */
          if (n >= 2)
            return { tous: [...debout,
                            { texte: 'Deux trous dans le carrelage du fond, à un mètre au-dessus de la tête de personne.',
                              visuel: 'impacts-mur' },
                            'Il n’a pas visé large. Il a visé juste, à l’endroit où il croyait qu’on était — et on n’y était pas depuis un moment.',
                            'Puis plus rien. Un toit quelque part, une seule fenêtre de tir, et une équipe qui ne se laisse plus lire.'],
                     drakk: '« Il avait un plan de la pièce. Il n’avait plus la pièce. »',
                     hercules: '« On ne l’a pas empêché de tirer. On l’a empêché de savoir sur quoi. C’est tout ce qu’on peut faire à cette distance. »',
                     trash: '« Il est déjà en train de descendre l’escalier. Il ne ressent toujours rien. »',
                     rabbit: '« Il a tiré sur la dernière image qu’il avait. Elle datait de deux heures. »',
                     flags: ['attaque-laverie', 'laverie-manquee'],
                     fiches: ['chimera-nous-suit'] }

          /* UNE SEULE : il tire à côté, et le verre fait le reste. */
          if (n === 1)
            return { tous: [...debout,
                            { texte: 'Un trou dans le carrelage, à hauteur d’épaule, à deux pas de l’endroit où Lester était assis.',
                              visuel: 'impacts-mur' },
                            'Il a la joue ouverte par un éclat de verre. Il ne crie pas : il se met à quatre pattes et il attend qu’on lui dise quoi faire.',
                            '« C’est la deuxième fois cette nuit », dit quelqu’un, et personne ne relève.'],
                     hercules: '« On a fait une chose sur trois. Ça se voit. »',
                     drakk: '« J’avais dit vitrine. J’aurais dû dire cible. »',
                     flags: ['attaque-laverie', 'lester-coupe'],
                     fiches: ['chimera-nous-suit'] }

          /* AUCUNE : il avait l'image, la lumière et le froid. */
          return { tous: [...debout,
                          { texte: 'Le second tir arrive avec le premier. Lester tombe en arrière contre la table pliante, qui cède.',
                            visuel: 'impacts-mur' },
                          a('lester-blesse')
                            ? 'C’est le même bras qu’au goulet. Le pansement de Trash est parti avec la manche.'
                            : 'Il se tient l’épaule à deux mains et il regarde ses doigts comme si c’était arrivé à quelqu’un d’autre.',
                          'Personne n’a bougé assez vite. Il n’y avait rien à bouger : la pièce était éclairée, chaude au bon endroit, et filmée.'],
                   hercules: '« Une pièce comme celle-là se lit depuis la rue. Je le savais. Je n’ai rien fait avec. »',
                   rabbit: '« Il nous regardait. Littéralement. Je pouvais l’aveugler et je ne l’ai pas fait. »',
                   trash: '« Ne le déplacez pas encore. Laissez-moi une minute. »',
                   flags: ['attaque-laverie', 'lester-touche-laverie', 'lester-blesse'],
                   fiches: ['chimera-nous-suit'] }
        }

        const c = compte(a)
        const commun = ['Il reste vingt minutes de marche, et personne n’attend plus l’heure.',
                        'Lester enjambe le verre sans le regarder.']
        /* Il vient TOUJOURS. Ce qui change, c'est ce qu'il emporte.

           D6 (PLAN_TRAME_ACTES_III_IV §3, validée le 2026-08-22) : le
           tribunal n'est plus terminal. Cette réaction quittait la nuit
           ici (`fin: true`) ; elle descend maintenant d'un cran, vers
           le parvis (`tribunal.js`, chantier 20b). La nuit ne s'arrête
           plus à la laverie — elle s'arrête à la récusation. */
        return c >= 3
          ? { tous: [...commun,
                     '« Bon. »',
                     '« Je vais leur dire. Pas ce qu’ils veulent entendre — ce qui s’est passé. »',
                     '« Si vous êtes encore là quand je sortirai, je vous paierai un truc. J’aurai rien pour payer, mais je vous le paierai. »',
                     'Il pousse la porte le premier.'],
              hercules: '« Voilà quelqu’un qui vient de décider quelque chose tout seul. C’est plus rare que ça n’en a l’air. »',
              flags: ['lester-temoigne'], fiches: ['lester-temoigne'], va: 'tribunal' }
          : { tous: [...commun,
                     'Il ne dit rien. Il attend qu’on ouvre la porte et il sort derrière Drakk.',
                     'Il ira au tribunal. Il sera vivant à dix heures. C’était le contrat.',
                     'Ce qu’il dira à la barre, personne ici ne le sait — et lui non plus.'],
              trash: '« On l’a sorti de sa cellule et on ne lui a pas parlé. On l’a juste transporté. »',
              va: 'tribunal' }
      },
    },

    /* ══ Le décor ═════════════════════════════════════════════════════ */
    machines: {
      nom: 'Le mur de machines',
      regarder: {
        tous: ['Quatre laveuses et deux séchoirs. Trois tournent à vide — quelqu’un a payé et n’est jamais revenu chercher son linge.',
               'C’est le seul bruit de la pièce, et il rend le silence des gens beaucoup plus fort.'],
        hercules: '« Deux heures à tuer avec un bruit de machine. J’ai passé des nuits pires, et pas beaucoup. »',
        trash: '« Ça tourne, ça tourne, ça ne va nulle part. Je vois l’image, merci, je m’en serais passé. »',
        rabbit: '« Cycle 3, quarante et une minutes restantes. Quelqu’un reviendra. Espérons pas maintenant. »',
        drakk: '« Six coffres qui grondent. Une salle de forge sans forgeron. »',
      },
      /* SIX SOURCES DE CHALEUR. Le scénario source fait rater le tireur
         à cause d'une cigarette allumée, qui gêne sa lunette thermique.
         Le jeu n'a pas de cigarette ; il a deux séchoirs et quatre
         laveuses, et il le dit dès sa première ligne de description
         (« trois tournent à vide »). Le même effet, dans le vocabulaire
         du décor. */
      utiliser: ({ a, qui }) => {
        if (a('sechoirs-lances')) return { tous: 'Les six tournent. La pièce sent le linge chaud et il fait dix degrés de plus qu’en entrant.',
                                           hercules: '« Voilà. Maintenant on est une buanderie et pas cinq personnes. »' }
        if (qui !== 'hercules')
          return { tous: 'Ce n’est pas ton linge, et tu n’as pas de linge.',
                   drakk: '« On n’ouvre pas le coffre d’un autre. C’est écrit dans toutes les tables. »',
                   trash: '« Je ne vois pas ce que je ferais tourner, ni pourquoi. »',
                   rabbit: '« Je peux les lancer sans payer. Ça ne nous avance à rien. »' }
        return {
          tous: ['Hercules fait le tour des six machines et les lance toutes, à vide, l’une après l’autre.',
                 'Personne ne comprend, et il ne l’explique qu’après.'],
          hercules: ['« J’ai passé six mois à faire du renseignement dans un service qui n’en faisait pas. »',
                     '« Une pièce chaude, c’est une pièce qu’on ne lit pas. Ni au thermique, ni autrement. »',
                     '« Et si je me trompe, on aura eu chaud pendant deux heures. C’est déjà ça. »'],
          flags: ['sechoirs-lances'],
          visuels: ['sechoirs'],
        }
      },
    },

    horloge: {
      nom: 'L’horloge murale',
      regarder: ({ a }) => ({
        tous: ['Six heures cinq. Trois heures cinquante-cinq avant l’audience.',
               'C’est la première fois de la nuit qu’il reste plus de temps qu’il n’en faut.'],
        hercules: '« Trois heures pour convaincre un gamin de vingt ans que le monde n’est pas exactement ce qu’il croit. Il a raison, en plus. »',
        trash: a('trash-epuise')
          ? '« Trois heures. Je vais dormir vingt minutes. Réveillez-moi si l’eau revient. »'
          : '« Trois heures. C’est long quand on n’a rien à faire et court quand on a quelqu’un à écouter. »',
        drakk: '« La veille avant la bataille. C’est toujours le meilleur moment, et personne ne le sait jamais sur le coup. »',
      }),
      utiliser: 'La régler ne raccourcirait rien. Autant la laisser dire la vérité.',
    },

    /* UNE CHOSE DU MONDE, UNE SEULE CIBLE. La baie a trois âges dans ce
       tableau — la vitrine, le trou noir, et le trou tout court — et ils
       vivent tous les trois ICI. Une cible « ce qui reste de la vitre »
       posée par-dessus celle-ci aurait produit exactement la cible que
       le joueur ne peut pas atteindre de façon fiable. */
    rue: {
      nom: 'La rue, derrière la vitre',
      regarder: ({ a }) => {
        /* Après le tir : ce qu'on regarde, c'est la mesure de ce qu'on
           a fait avant. */
        if (a('attaque-laverie')) return {
          tous: a('laverie-manquee')
            ? ['Une étoile de fêlures autour d’un trou de la taille d’un ongle, et deux marques dans le carrelage du fond.',
               'Entre les deux, la ligne passe à un mètre au-dessus de l’endroit où tout le monde était.']
            : ['Une étoile de fêlures autour d’un trou de la taille d’un ongle. Le reste de la baie tient encore, pour l’instant.',
               'Entre le trou et le mur du fond, la ligne passe exactement par les chaises.'],
          drakk: a('laverie-manquee')
            ? '« Un mètre. C’est beaucoup, un mètre, quand on tire de loin sur une pièce qu’on ne voit pas. »'
            : '« Il n’a pas eu besoin d’être bon. Nous lui avons tout donné : la lumière, la chaleur, l’image. »',
          rabbit: '« Verre feuilleté. Ce n’est pas une balle de rue. »',
          hercules: '« Personne n’a rien entendu partir. Ça veut dire loin, et ça veut dire quelqu’un dont c’est le métier. »',
          trash: '« Pas de colère là-dedans. Pas d’aura, pas de résidu. C’est le même vide qu’au goulet. »',
        }
        /* Avant : la vitrine, ou le trou noir qu'on en a fait. */
        return a('lumiere-coupee')
          ? { tous: ['Il pleut encore. Un bus passe, presque vide.',
                     'De l’extérieur, cette pièce n’est plus qu’un rectangle noir dans une rue éclairée. C’est la rue qui est en vitrine, maintenant.'],
              drakk: '« Voilà. On peut attendre. »',
              rabbit: '« Deux caméras municipales dans la rue. Elles filment un magasin fermé. »',
              hercules: '« Une laverie éteinte à sept heures du matin, ça ne se remarque pas. Une laverie allumée avec cinq personnes dedans, si. »' }
          : { tous: ['Il pleut encore. Un bus passe, presque vide. Le jour ne se lèvera pas avant sept heures et demie.',
                     'De l’extérieur, cette pièce est un aquarium éclairé au néon.'],
              drakk: ['« Nous sommes dans une vitrine. Je le dis depuis vingt minutes et personne ne bouge. »',
                      '« Éclairés, à hauteur d’œil, derrière une vitre, dans une rue droite. »',
                      '« Le seul couvert est le mur de machines, et il est du mauvais côté. »',
                      '« Je ne dis pas qu’on nous cherche ici. Je dis que si on nous cherche, on nous trouve. »'],
              rabbit: '« Trois caméras dans la rue, dont deux municipales. La troisième est celle d’ici, et elle regarde dehors. »',
              hercules: '« Personne ne cherche cinq personnes dans une laverie. On cherche cinq personnes qui se cachent. »' }
      },
      utiliser: ({ a }) => a('attaque-laverie')
        ? { tous: 'On ne touche pas à du verre feuilleté qui tient encore. Il tombera tout seul, et pas sur nous.',
            drakk: '« Laissez-la. Elle nous dit d’où ça venait. »' }
        : 'On ne sort pas. Pas encore.',
    },

    enseigne: {
      nom: 'L’enseigne, à l’envers',
      regarder: ({ a }) => a('lumiere-coupee')
        ? { tous: 'Éteinte. De la rue, on ne lit plus rien du tout — ni l’enseigne, ni ce qu’il y a derrière.',
            trash: '« Elle est partie avec le néon, comme je l’avais dit. C’est agréable, une fois de temps en temps. »' }
        : { tous: 'Vue de l’intérieur, l’enseigne rouge se lit à l’envers et bat un peu. LAV’O’MATIC.',
            trash: '« Elle bat au même rythme que le néon du fond. Ils sont sur le même circuit. Tout ici est sur le même circuit. »',
            drakk: '« Une bannière rouge. De mauvais augure, mais je commence à croire que je dis ça de tout. »' },
      utiliser: 'On ne redresse pas une enseigne depuis l’intérieur.',
    },

    distributeur: {
      nom: 'Le distributeur',
      regarder: {
        tous: ['Lessive en dosettes, adoucissant, et une rangée de barres chocolatées qui doivent dater.',
               'Il prend les paiements sans contact et il a un écran qui insiste.'],
        hercules: '« Le gamin n’a rien mangé depuis McNeil. Personne ne lui a demandé. »',
        rabbit: '« Je peux le faire tomber sans payer. Ce serait la chose la plus illégale que j’aurai faite ce soir, ce qui est vexant. »',
      },
      utiliser: {
        tous: ['Tu prends une barre chocolatée et tu la poses sur la table pliante, à côté de Lester.',
               'Il ne la prend pas tout de suite. Il la prend au bout de dix minutes, quand plus personne ne regarde.'],
        hercules: '« On ne demande pas à quelqu’un s’il a faim. On pose la chose et on regarde ailleurs. »',
        flags: ['conf-question'],
      },
    },

    affichette: {
      nom: 'Une affichette',
      regarder: {
        tous: 'RÈGLEMENT — NE PAS DORMIR SUR PLACE — NE PAS LAISSER LE LINGE SANS SURVEILLANCE — MERCI.',
        rabbit: '« Ne pas dormir sur place. Écrit à la main, et récemment. »',
        trash: '« Quelqu’un a eu besoin d’écrire ça. C’est plus triste que le règlement. »',
        drakk: '« Un édit. Trois lois, dont deux nous concernent. »',
      },
      utiliser: 'Tu ne corriges pas le règlement d’une laverie à six heures du matin.',
    },

    table: {
      nom: 'La table pliante',
      regarder: ({ a }) => ({
        tous: a('dossier-lu')
          ? ['Une table à plier le linge, en formica, avec quarante ans de brûlures de cigarette.',
             'Le dossier est étalé dessus, en trois tas, et personne ne l’a refermé.']
          : ['Une table à plier le linge, en formica, avec quarante ans de brûlures de cigarette.',
             'Assez grande pour y étaler quelque chose.'],
        hercules: '« C’est là qu’on discutera, si on discute. Une table basse, c’est plus facile qu’un comptoir. »',
      }),
      utiliser: 'Tu t’y appuies. Elle tient.',
      objets: {
        /* ══ LA LECTURE DU DOSSIER ═══════════════════════════════════
           Le scénario source fait démarrer la contre-enquête ici, et
           pas ailleurs : trois heures d'attente, un gamin, et une
           chemise cartonnée que personne n'a relue depuis qu'on l'a
           fermée. C'est le seul endroit du jeu où l'équipe a le temps.

           Quatre lectures dans la même réaction, parce que c'est
           exactement ce que le jeu prétend être : les mêmes pages ne
           disent pas la même chose selon qui les tient. Trois fiches
           en sortent, et aucune ne conclut — le dossier ouvre une
           question, il ne la referme pas. Les recoupements qu'elles
           permettent sont des `presque`, pas des déductions : la
           réponse n'est pas dans ces pages, et c'est le sujet. */
        dossier: ({ a }) => a('dossier-lu')
          ? { tous: 'Vous l’avez lu. Trois fois, à quatre. Il ne dira rien de plus ici.',
              rabbit: '« Ce qui manque dedans ne va pas apparaître parce qu’on rouvre la chemise. »' }
          : {
              tous: ['Hercules étale la chemise sur le formica et la partage en trois tas, par réflexe de bureaucrate.',
                     'Pendant deux heures, personne ne dit grand-chose. Les machines tournent.',
                     'Le dossier tient en trois faits, et les trois se regardent de travers.',
                     'UN — le corps a été trouvé dans un taudis de Loveland, à deux rues de chez Lester.',
                     'DEUX — l’accusation appelle ça une agression de rue. Ça règle la question du mobile en la supprimant.',
                     'TROIS — son appartement à elle n’est nulle part dans ces pages. Ni photo, ni relevé, ni ligne.'],
              hercules: '« Trente ans d’administration. Un dossier qui ne verse pas une adresse, ce n’est pas un dossier bâclé. C’est un dossier arbitré. »',
              trash: '« Il y a un endroit dans cette histoire où quelqu’un est mort, et il n’est pas écrit ici. Ça me gêne physiquement. »',
              rabbit: ['« Trois jours de procédure, zéro pièce matérielle sur le lieu du décès. »',
                       '« Ce n’est pas un trou. Un trou, c’est rond. Celui-là a des bords droits. »'],
              drakk: '« On a désigné un coupable, puis on a bâti la carte autour de lui. J’ai fait pire, comme maître de jeu. Jamais avec un vrai gamin. »',
              flags: ['dossier-lu'],
              fiches: ['corps-loveland', 'crime-crapuleux', 'appart-hors-dossier'],
            },
      },
    },

    chaises: {
      nom: 'Les chaises',
      regarder: {
        tous: 'Trois chaises en plastique orange vissées à une barre. Lester est sur celle du bout.',
        drakk: '« Il a pris la place du bout. On ne peut le prendre que d’un côté. »',
        trash: '« Il n’a pas choisi de s’asseoir loin de nous. Il a choisi de s’asseoir loin de la vitre. Ce n’est pas pareil. »',
      },
      utiliser: {
        tous: 'Tu t’assois. Ça fait du bien et ça ne dure pas.',
        hercules: '« Quarante ans que je m’assois dans des endroits comme celui-ci. »',
      },
    },

    neon: {
      nom: 'Le tube qui bat',
      regarder: {
        tous: 'Le troisième néon est en fin de vie. Il bat toutes les cinq secondes environ, et jamais deux fois pareil.',
        trash: '« À chaque battement, les ombres bougent. Au bout de deux heures, on croit voir quelqu’un dehors. »',
        rabbit: '« Ballast fatigué. Ça ne se répare pas, ça se remplace, et personne ne le remplacera. »',
      },
      /* LE CIRCUIT COMMUN. Trash le dit sur l'enseigne avant qu'on y
         touche — « elle bat au même rythme que le néon du fond, ils sont
         sur le même circuit » — et c'est ce qui rend le geste payant :
         un tube dévissé éteint aussi la vitrine. L'information est à
         Trash, la main est à Drakk : il est le seul à atteindre le
         plafond sans monter sur une machine. */
      utiliser: ({ a, qui }) => {
        if (a('lumiere-coupee')) return { tous: 'La pièce est noire, l’enseigne est morte, et la rue est plus claire que nous.',
                                          drakk: '« C’est mieux ainsi. On voit moins bien, on est moins bien vus. Le compte est bon. »' }
        if (qui !== 'drakk')
          return { tous: 'Le tube est à trois mètres. Il faudrait monter sur une machine, et elles tournent.',
                   drakk: '« Ou alors quelqu’un de grand tend le bras. »',
                   hercules: '« Il y a quelqu’un ici qui n’a pas besoin de monter. »',
                   rabbit: '« Je peux couper un flux de données. Pas un ballast. »',
                   trash: '« Éteins celui-là et tu éteins l’enseigne. C’est le même circuit. Je le dis, je ne le fais pas. »' }
        return {
          tous: ['Drakk tend le bras sans se hausser sur la pointe des pieds, prend le tube à pleine main et le dévisse d’un quart de tour.',
                 'Les trois néons s’éteignent ensemble. Dehors, l’enseigne rouge meurt en même temps.',
                 'La pièce devient un trou noir avec une rue éclairée au fond. Personne ne dit rien pendant un moment.'],
          drakk: '« Nous étions dans une vitrine. Nous sommes maintenant dans une embuscade. C’est la même pièce et ce n’est pas le même endroit. »',
          trash: '« Voilà. Merci. Je n’avais plus d’ombres qui bougent. »',
          flags: ['lumiere-coupee'],
          visuels: ['lumiere-coupee'],
        }
      },
    },

    /* ── Astral ─────────────────────────────────────────────────────── */
    passage: {
      nom: 'Le seuil',
      regarder: {
        tous: 'Devant la porte, une usure violette et diffuse.',
        trash: ['« Des milliers de passages, tous pareils, tous pressés. »',
                '« Personne n’a jamais rien vécu ici. C’est peut-être exactement ce qu’il nous faut. »'],
      },
      utiliser: {
        tous: 'Une usure ne se gratte pas. Elle raconte, elle ne s’efface pas.',
        trash: '« Rien à en tirer de plus. C’est un sol qu’on a beaucoup foulé, pas un sol qui a un secret. »',
      },
    },

    /* ── RA ─────────────────────────────────────────────────────────── */
    reseau: {
      nom: 'Le réseau de la laverie',
      regarder: {
        tous: 'Une icône bleue au-dessus des machines : LAV’O’MATIC — 24 H — PAIEMENT SANS CONTACT.',
        rabbit: ['« Nœud de commerce, mis à jour en 2078, jamais depuis. »',
                 '« Il enregistre les paiements et il les envoie une fois par jour. Personne ne les lit. »'],
      },
      utiliser: ({ a, qui }) => {
        if (a('vu-reseau-laverie')) return 'Toujours le même nœud. Il n’a rien de plus à donner.'
        if (qui !== 'rabbit')
          return { tous: 'Il faudrait un deck, et une raison d’y entrer.',
                   hercules: '« Laisse-la faire. C’est son rayon. »' }
        return { tous: ['White_Rabbit se glisse dans le nœud de paiement, par acquit de conscience.',
                        'Des lessives, des pièces, un abonnement résilié en mars. Rien qui ressemble à un problème.'],
                 rabbit: '« Ce nœud-là dit la vérité : cet endroit ne cache rien. C’est même reposant. »',
                 flags: ['vu-reseau-laverie'] }
      },
    },

    camera: {
      nom: 'Une icône qui ne devrait pas être là',
      regarder: ({ a }) => ({
        tous: 'Une fiche rouge clignote au-dessus de la porte : CAM-04 — FLUX SORTANT.',
        rabbit: a('star-nous-connait')
          ? ['« Flux sortant. Une laverie de quartier n’a pas de flux sortant : elle enregistre en local et elle écrase. »',
             '« Celle-ci envoie. Vers un relais municipal, qui la partage avec les services qui en font la demande. »',
             '« Et il y en a un qui a notre numéro de coque depuis cette nuit. »']
          : ['« Flux sortant. Une laverie de quartier n’a pas de flux sortant. »',
             '« Elle envoie vers un relais municipal. C’est légal, c’est automatique, et personne ne regarde. »',
             '« Personne ne regarde tant que personne ne demande. »'],
        trash: '« Je vois une lumière rouge. Ce n’est pas mon plan, et j’en suis soulagé. »',
      }),
      utiliser: ({ a, qui }) => {
        if (a('camera-aveugle')) return 'Elle enregistre le plafond depuis vingt minutes.'
        if (qui !== 'rabbit')
          return { tous: 'Il faudrait un deck et savoir quoi chercher.',
                   hercules: '« C’est son rayon. Et pour une fois j’aimerais autant qu’il le fasse. »' }
        return { tous: ['White_Rabbit pose deux doigts sur son deck et ne bouge plus pendant vingt secondes.',
                        'La fiche clignote une fois. CAM-04 — FLUX SORTANT — 06:11.',
                        'Elle enverra la même image pendant deux heures. Un plafond, deux néons, personne.'],
                 rabbit: '« Ce n’est pas propre non plus. Mais je commence à comprendre que rien ne l’est. »',
                 flags: ['camera-aveugle'], visuels: ['camera-aveugle'] }
      },
    },
  },

  dialogues: {

    /* ══ LESTER — G5 ══════════════════════════════════════════════════
       Trois sujets ouverts à tout le monde, cinq qui paient des chaînes
       plantées ailleurs. Il en faut TROIS, et il y en a huit : personne
       ne peut se retrouver bloqué, et personne ne les aura tous. */
    lester: {
      qui: 'lester',
      accueil: ['Il ne lève pas la tête tout de suite.',
                '« On attend combien de temps ? »'],
      retour: ['« Ouais. »'],
      sujets: [

        /* ── Ouverts à tout le monde ──────────────────────────────── */
        {
          id: 'job',
          titre: '« On est payés. Par un flic. Pour te livrer vivant. »',
          quand: ({ a }) => !a('conf-job'),
          flags: ['conf-job'],
          texte: ['« Je sais. »',
                  '« … Non, en fait je savais pas. Je m’en doutais. C’est pas pareil. »',
                  '« Merci de l’avoir dit avant que je le devine. »'],
        },
        {
          id: 'ecouter',
          titre: '(Ne rien dire, et attendre.)',
          quand: ({ a }) => a('conf-job') && !a('conf-silence'),
          flags: ['conf-silence'],
          texte: ['Personne ne parle. Une machine finit son cycle et se tait, et c’est très long.',
                  '« Ils m’ont posé la même question pendant trois jours. »',
                  '« Chaque fois que je répondais pas, ils écrivaient quelque chose. »',
                  '« Vous, vous écrivez rien. C’est bizarre. »',
                  'Il s’appuie au dossier pour la première fois.'],
        },
        {
          id: 'question',
          titre: '« Pose-la, ta question. »',
          quand: ({ a }) => a('conf-job') && !a('conf-question'),
          flags: ['conf-question'],
          texte: ['« Pourquoi vous ? »',
                  '« Pourquoi c’est des gens comme vous qui viennent me chercher, et pas… je sais pas. Quelqu’un d’officiel. »',
                  'La vraie réponse est qu’il n’y avait personne d’autre. On la lui donne.',
                  '« … D’accord. Au moins c’est une réponse. »'],
        },

        /* ── Ce qui se paie ici, planté ailleurs ───────────────────── */
        {
          id: 'teresa',
          titre: '« On sait comment elle s’appelait. Teresa. »',
          quand: ({ a }) => a('sait-teresa') && !a('conf-teresa'),
          flags: ['conf-teresa'],
          texte: ['Il ferme les yeux.',
                  '« Vous êtes les deuxièmes à dire son nom devant moi. »',
                  '« Le premier, c’était le vieux flic. Il l’a dit une fois, à voix basse, en relisant son dossier. Il croyait que je dormais. »',
                  '« Tout le monde dit “la victime”. C’est plus court. »'],
        },
        {
          id: 'bras',
          titre: '« Montre ce bras. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => a('lester-blesse') && !a('conf-bras'),
          flags: ['conf-bras'],
          texte: ['Trash lui prend le poignet sans demander, remonte la manche, et regarde longtemps sans rien dire.',
                  'Puis il déchire le bas de son écharpe rayée — celle qu’il porte depuis le début — et il en fait un pansement.',
                  '« Tu vas garder une marque. »',
                  '« … J’en ai d’autres. »',
                  '« Celle-là, tu sauras d’où elle vient. Ce n’est pas rien. »'],
        },
        {
          id: 'guilde',
          titre: '« Tu fais partie de la compagnie, maintenant. » (Drakk)',
          acteur: 'drakk',
          quand: ({ a }) => a('guilde') && !a('conf-guilde'),
          flags: ['conf-guilde'],
          texte: ['« C’était quoi, sur le bateau ? La bouteille. »',
                  '« Un serment », dit Drakk, avec un sérieux absolu.',
                  '« … Ah. »',
                  '« Vous êtes un peu bizarre. »',
                  '« On me le dit. Cela ne change rien au serment. »',
                  'Lester sourit. C’est court, et c’est le premier.'],
        },
        {
          id: 'mccarthy',
          titre: '« Le flic qui nous paie ne croit pas à son dossier. »',
          quand: ({ a }) => a('mccarthy-avoue') && !a('conf-mccarthy'),
          flags: ['conf-mccarthy'],
          texte: ['« Alors pourquoi il l’a signé. »',
                  'Personne n’a de bonne réponse. Quelqu’un donne la mauvaise : parce que c’est son travail.',
                  '« … Ouais. »',
                  '« C’est ce que le gardien m’a dit aussi, quand j’ai demandé pourquoi il fermait la porte. »',
                  '« C’est marrant, ce mot. Il sert à tout le monde. »'],
        },
        /* CE QUE NEUF HEURES OUVRE. Le seul sujet du jeu qui paie des
           gestes et pas des mots — mais il les paie EN MOTS, parce que
           c'est lui qui doit faire le calcul, pas nous. Il n'existe que
           si les précautions ont tenu : rater le tir de peu et rater le
           tir de loin ne se racontent pas pareil. */
        {
          id: 'apres',
          titre: '« Ça va ? »',
          quand: ({ a }) => a('laverie-manquee') && !a('conf-abri'),
          flags: ['conf-abri'],
          texte: ['Il est assis par terre, dos au mur de machines, et il n’a pas encore décidé de se relever.',
                  '« Vous avez éteint. »',
                  '« Avant. Vous avez éteint la lumière, et les machines vous les avez toutes lancées, et j’ai rien compris et j’ai rien demandé. »',
                  '« … C’était pour ça. »',
                  'Il regarde le trou dans le carrelage, puis les chaises, puis le trou. Il refait la ligne tout seul, avec les yeux.',
                  '« Personne fait ça pour un dossier. »'],
        },
        /* CE QUE LE DOSSIER OUVRE. Il ne dit pas où elle est morte —
           mais il dit où on a mis son corps, et ça, Lester connaît :
           c'est sa rue. Le seul témoin du dossier que personne n'a
           interrogé sur le seul fait qu'il pouvait vérifier. */
        {
          id: 'loveland',
          titre: '« Le taudis où on l’a trouvée. C’était ta rue. »',
          quand: ({ a }) => a('dossier-lu') && !a('conf-dossier'),
          flags: ['conf-dossier'],
          fiches: ['lester-loveland'],
          texte: ['« … Ouais. »',
                  '« C’est un endroit où personne va. Y a rien dedans. Même nous on y allait pas. »',
                  '« Ils m’ont demandé quinze fois où j’étais cette nuit-là. Ils m’ont jamais demandé si elle, elle avait une raison d’y être. »',
                  'Il regarde la table, les trois tas, et il comprend en même temps que vous ce que ça veut dire.',
                  '« Elle en avait pas. »'],
        },
        /* RÈGLE 12 en action : une déduction ouvre la PAROLE. Elle n'a
           ouvert aucune porte de tout le jeu, et elle ouvre celle-ci. */
        {
          id: 'deduction',
          titre: '« Ils ne veulent pas te condamner. Ils veulent qu’il n’y ait pas d’audience. »',
          quand: ({ a }) => a('su:pas-de-proces') && !a('conf-deduction'),
          flags: ['conf-deduction'],
          texte: ['Long silence. Deux machines tournent.',
                  '« Donc si j’y vais, et que je parle… »',
                  '« … c’est le pire truc qui puisse leur arriver. »',
                  'Il se redresse. Ce n’est pas du courage, c’est du calcul, et c’est peut-être mieux.',
                  '« Personne m’a jamais dit que je pouvais être un problème pour quelqu’un. »'],
        },

        {
          id: 'assez',
          titre: '(Le laisser tranquille.)',
          fin: true,
          texte: ['Il regarde les machines tourner.'],
        },
      ],
    },
  },
}
