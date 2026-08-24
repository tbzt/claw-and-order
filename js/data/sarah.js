/* ============================================================
   TABLEAU 5 TER — LE CABINET DE SARAH CARPENTER. Choisi par Trash au
   conseil de la traversée (`retour.js`, dialogue `conseil`, sujet
   `sarah`). Six heures moins le quart.

   CHANTIER 37 — PLAN_PLANQUES.md § 3.3, ÉTAPE D DU § 8 : « Sarah, puis
   Duke, dans cet ordre : le cabinet demande moins de moteur neuf. » Le
   second des trois décors annoncés par le chantier 35 à devenir réels,
   après Herwick (chantier 36) et l'étape C qui a mesuré le moteur
   commun (« qui paie ») sans le trouver déséquilibré.

   ══ CE QUI SE CHOISIT, CE N'EST PAS D'ÉVITER LE TIR (§1 du plan) ═════
   Le coup part TOUJOURS, ici comme à la laverie et chez Herwick. Ce qui
   change, c'est QUI encaisse — et ici, c'est un choix à deux visages :
   « qui paie : la salle d'attente, ET le cabinet » (§3, le tableau du
   plan). Le CABINET paie toujours (`sarah-brulee`, fixe, comme
   `herwick-touche`) ; la SALLE D'ATTENTE paie seulement si elle n'a pas
   été vidée (`patient-touche`, variable, comme les précautions
   ailleurs) — sauf que la variable, ici, n'est pas un compte de
   précautions prises : c'est UNE décision, tranchée avant le tir, pas
   pendant.

   ══ LE G5 SE REJOUE ICI, PAS SEULEMENT À LA LAVERIE ═══════════════
   Mêmes trois sujets gratuits et six chaînés qu'à la laverie et chez
   Herwick, mêmes noms de drapeau (une seule scène planque se visite par
   partie, ils ne se croisent jamais) ; un septième, `conf-sarah`, propre
   à ce décor (garde-fou § 4.3 du plan), payé par `lester-soigne` — le
   seul endroit du jeu où la confiance se gagne en soignant, pas en
   parlant d'abord.

   ══ LE DOSSIER SE LIT ICI AUSSI (garde-fou § 4.2) ═════════════════
   Mêmes trois fiches qu'à la laverie et chez Herwick (`corps-loveland`,
   `crime-crapuleux`, `appart-hors-dossier`). Ce que Sarah ajoute
   PAR-DESSUS, c'est double : le bras de Lester vraiment soigné
   (`lester-soigne`, un geste, pas une fiche) et une fiche neuve,
   `teresa-cliente` — Teresa est déjà venue dans ce cabinet, et Sarah
   est la seule personne du jeu qui puisse le dire.

   ══ LA DÉCISION, PAS DES PRÉCAUTIONS (§3.3 du plan) ═══════════════
   Herwick et la laverie comptent des précautions ; ce décor n'en compte
   aucune. Le dilemme est binaire, tranché en parlant à Sarah, avant le
   tir : vider la salle d'attente (trois inconnus dehors sous la pluie,
   dont un qui attend depuis quatre heures et ne reviendra pas) ou la
   laisser pleine (un patient prend la balle destinée à personne en
   particulier). « Choisir … et le faire soi-même, à voix haute, devant
   eux » (§3.3) : c'est un geste de Trash, comme proposer ce lieu l'a été
   au conseil — même grammaire, « il faut ÊTRE ce runner » (§2). */

import { equipiers } from './equipiers.js'

/* ══ LE G5, REPRIS DE `planque.js` / `herwick.js` ═════════════════════ */
const GRATUITES = ['conf-job', 'conf-question', 'conf-silence']
const CHAINEES  = ['conf-teresa', 'conf-guilde', 'conf-bras',
                   'conf-mccarthy', 'conf-deduction', 'conf-dossier',
                   'conf-sarah']

const compte = (a) =>
  Math.min(GRATUITES.filter((f) => a(f)).length, 2) +
  CHAINEES.filter((f) => a(f)).length -
  (a('conf-perdue') ? 2 : 0)

/* La décision de la salle : deux drapeaux mutuellement exclusifs,
   tranchés en parlant à Sarah (`dialogues.sarah`, sujets `vider` /
   `garder`), jamais en comptant des gestes. */
const decidee = (a) => a('salle-videe') || a('salle-pleine')

export const sarah = {
  markup: 'scenes/sarah.html',

  ouverture: ({ a }) => [
    'Le cabinet de Sarah Carpenter, au-dessus d’une supérette qui ne ferme jamais tout à fait. Deux pièces : une salle d’attente à trois chaises, et un cabinet avec une table d’examen et un autoclave qui date d’avant elle.',
    'Une clinique de rue ne ferme pas, même à six heures moins le quart. Il y a déjà trois personnes dans la salle d’attente, dont une qui patiente depuis quatre heures.',
    a('lester-blesse')
      ? 'Lester s’est assis près de la porte du cabinet, son bras contre lui, sans qu’on ait besoin de le lui montrer.'
      : 'Lester s’est assis près de la porte du cabinet, les mains sur les genoux, à regarder les trois inconnus qui attendent aussi.',
    'Sarah n’a pas discuté le prix : elle a regardé Trash, une seconde, et elle a désigné la pièce du fond.',
    'OBJECTIF — tenir jusqu’à l’audience, sans que ça coûte à celui qui a ouvert la porte. Il reste trois heures et quelques.',
  ],

  entree: ({ a }) => [
    ...(a('salle-videe') ? ['salle-videe'] : []),
    ...(a('sarah-brulee') ? ['sarah-brulee'] : []),
    ...(a('patient-touche') ? ['patient-touche'] : []),
    ...(a('lester-soigne') ? ['lester-soigne'] : []),
  ],

  derive: ({ a }) => {
    const c = compte(a)
    return [c <= 0 ? 'lester-ferme' : c < 3 ? 'lester-ecoute' : 'lester-ouvert']
  },

  vues: {
    astrale: [
      'Ici, pas de meuble pour cacher une aura : rien qu’une pièce nue, et de la peur qui s’est accumulée dedans depuis des années, une nuit après l’autre.',
      '« Je vois tout, cette fois. C’est presque pire. La salle d’attente d’une clinique de rue, à l’astral, c’est juste de la peur empilée, en rangs, comme des chaises. »',
    ],
    ra: [
      'Un vieux terminal de dossiers patients, sur le bureau du fond, qui synchronise ses fiches vers un serveur d’assurance-maladie une fois par nuit — le genre de service que Sarah ne peut pas se permettre de couper, parce que c’est lui qui la paie.',
      '« Ça bavarde, mais ça bavarde pour elle, pas contre nous. Je laisse. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('sarah'),

    /* ══ LESTER — le même G5, dans une troisième pièce ════════════════ */
    lester: {
      nom: 'Lester',
      regarder: ({ a }) => ({
        tous: a('lester-soigne')
          ? ['Le bras dans une vraie attelle, propre, serrée juste ce qu’il faut. Il la regarde comme un objet qu’on ne lui a encore jamais offert neuf.',
             'Il ne bouge plus le bras pour vérifier que ça tient. Il sait déjà que ça tient.']
          : a('lester-blesse')
            ? ['Assis près de la porte du cabinet, le bras contre lui, à regarder les trois inconnus de la salle d’attente comme s’il cherchait à savoir lequel d’entre eux est le plus fatigué.',
               'C’est la première fois de la nuit qu’il est dans une pièce où quelqu’un d’autre attend aussi.']
            : ['Assis près de la porte du cabinet, les mains sur les genoux, à regarder les trois inconnus de la salle d’attente comme s’il cherchait à savoir lequel d’entre eux est le plus fatigué.',
               'C’est la première fois de la nuit qu’il est dans une pièce où quelqu’un d’autre attend aussi.'],
        hercules: '« Un gamin qui compte les gens plus fatigués que lui. Il en trouve toujours un. Ça devrait le rassurer et ça ne le rassure jamais. »',
        trash: compte(a) >= 3
          ? ['« Son aura a doublé depuis le bateau, et elle est tournée vers nous. »',
             '« Il a décidé quelque chose, et il ne l’a encore dit à personne. »',
             '« Ce qu’il dira à la barre, il vient de le décider ici. »']
          : compte(a) >= 1
            ? ['« Son aura est plus grande qu’au bateau. Elle est tournée vers nous, pas ouverte. »',
               '« Il attend de voir ce qu’on fait de cette salle d’attente, et des gens qui y sont. »']
            : ['« Son aura est serrée sur elle-même, comme au bateau. »',
               '« Il regarde trois inconnus attendre et il se demande s’il compte plus qu’eux. Moi non plus je ne sais pas répondre. »'],
        rabbit: '« Vingt ans, et personne ne lui avait jamais proposé une vraie attelle avant ce soir. »',
        drakk: '« Il regarde les trois autres comme un compagnon compte les rangs ennemis. Il essaie de savoir combien d’entre eux comptent plus que lui, dans cette histoire. »',
      }),
      parler: { texte: [], dialogue: 'lester' },
      utiliser: 'Non. Il a passé la nuit à être déplacé par des mains.',
      objets: {
        bouteille: ({ a }) => a('guilde')
          ? { tous: 'Elle est restée sur le voilier. Ici, il n’y a que des gobelets d’eau et une pile de magazines périmés.' }
          : { tous: 'Sarah l’a vue et n’a rien dit. Elle a juste rapproché son fauteuil du sien.' },
        arme: 'Non. Pas devant une salle d’attente pleine d’inconnus, et pas dans le cabinet de la femme qui vient de vous ouvrir sa porte.',
      },
    },

    /* ══ SARAH — l'hôte, et la seule à pouvoir dire ce que le dossier
       tait ══════════════════════════════════════════════════════════ */
    sarah: {
      nom: 'Sarah Carpenter',
      regarder: ({ a }) => ({
        tous: a('sarah-brulee')
          ? ['Elle a fini de désinfecter le comptoir deux fois, sans qu’il en ait eu besoin une seule. Ses mains ne s’arrêtent jamais tout à fait.',
             '« Ce n’est rien », dit-elle, avant même qu’on lui demande. Elle le dit à la pièce entière, pas à quelqu’un en particulier.']
          : ['Une elfe d’un âge qu’elle ne donne à personne, blouse tachée, cernes qu’aucun sommeil ne rattrapera plus. Elle bouge vite, sans jamais courir.',
             'Elle a déjà fait le tri entre les urgences et les autres, dans sa tête, avant même que vous ayez fini de vous présenter.'],
        hercules: a('sarah-brulee')
          ? '« Une femme qui vient de perdre le seul endroit du quartier où personne ne pose de question. Elle range quand même. C’est une manière de tenir debout que je respecte trop pour la commenter. »'
          : '« Une clinique de rue ne demande jamais qui paie. C’est un métier qui coûte cher, et je ne parle pas de l’autoclave. »',
        trash: a('sarah-brulee')
          ? '« Son aura ne tremble pas. Elle est juste plus petite qu’il y a une heure. »'
          : '« Elle m’a soigné trois fois sans jamais me demander mon vrai nom. Je le lui ai donné quand même, la troisième fois. »',
        rabbit: '« Un terminal patient à jour, un autoclave d’un autre siècle. Elle dépense là où ça soigne, pas là où ça brille. »',
        drakk: '« Une guérisseuse sans temple, qui soigne quiconque franchit sa porte. Il y a un mot pour ça, dans toutes les tables. Je crois que c’est “sainte”. »',
      }),
      parler: ({ a }) => {
        if (a('sarah-brulee') && decidee(a))
          return { tous: 'Elle a la main sur le comptoir et le regard sur la salle vidée, ou sur celle qui ne l’est pas. Elle n’a plus rien à ajouter — pas ce matin.' }
        return { texte: [], dialogue: 'sarah' }
      },
      utiliser: 'On ne fouille pas le cabinet d’une femme qui vient de vous l’ouvrir.',
    },

    /* ══ LA SALLE D'ATTENTE — le vrai dilemme se tranche avec Sarah, pas
       ici : cette cible établit le poids moral, elle ne le résout pas. */
    salle: {
      nom: 'La salle d’attente',
      regarder: ({ a }) => ({
        tous: decidee(a)
          ? a('salle-videe')
            ? ['Trois chaises vides. La pluie contre la vitre est le seul bruit de la pièce, maintenant.',
               'Quelqu’un a laissé un ticket de passage sur une chaise, avec un numéro que personne ne rappellera.']
            : ['Les trois mêmes personnes, toujours là. Celle qui attend depuis quatre heures n’a pas bougé de sa chaise.',
               'Personne ne leur a rien dit. C’est peut-être pour ça qu’ils sont restés.']
          : ['Trois personnes attendent sur des chaises dépareillées. L’une d’elles patiente depuis quatre heures, et elle le sait précisément — elle regarde une horloge que personne d’autre ne regarde.',
             'Aucune des trois ne sait qui vous êtes, ni pourquoi un gamin menotté aux poignets par la fatigue est assis parmi eux.'],
        hercules: decidee(a)
          ? (a('salle-videe')
              ? '« On les a mis dehors sous la pluie à six heures du matin. Je l’ai déjà fait, dans une autre vie, pour des raisons bien pires. Ça ne l’a jamais rendu facile. »'
              : '« On les a laissés. Ça a un prix aussi. On l’a juste choisi de ne pas le voir tout de suite. »')
          : '« Trois inconnus, un gamin qu’on protège, et une décision que personne ne veut prendre à notre place. C’est à nous de la prendre. »',
        trash: '« Celle qui attend depuis quatre heures a une aura épuisée jusqu’à l’os. Elle ne reviendra pas, quoi qu’on décide ici. Ça, c’est déjà vrai. »',
      }),
      parler: { tous: 'Ils ne vous répondront pas. Ce n’est pas à eux qu’il faut le dire — c’est à Sarah, avant qu’il ne soit trop tard pour le lui dire.' },
      utiliser: { tous: 'Ce n’est pas une chose qu’on déplace. C’est une décision qu’on prend, à voix haute, devant celle qui la subira.' },
    },

    /* ══ LA TABLE D'EXAMEN — où `lester-soigne` se joue, dans le dialogue
       `sarah`, pas ici : la cible montre le résultat, elle ne le
       déclenche pas (même logique que `salle`, ci-dessus). */
    table: {
      nom: 'La table d’examen',
      regarder: ({ a }) => ({
        tous: a('lester-soigne')
          ? 'Une compresse usagée et un rouleau de bande entamé, encore sur le plateau. Le reste a servi.'
          : 'Métal froid, une lampe articulée, un plateau d’instruments qui ont vu passer plus de monde que n’importe quel meuble de ce quartier.',
      }),
      utiliser: ({ a }) => a('lester-blesse') && !a('lester-soigne')
        ? { tous: 'Ce n’est pas à vous de vous en servir. C’est à Sarah — parlez-lui.' }
        : { tous: 'Tu t’y appuies. Elle est froide, et elle tient.' },
    },

    /* ══ LE BUREAU — où se lit le dossier ═════════════════════════════
       Même geste, mêmes trois fiches qu'à `planque.js` et `herwick.js`
       (garde-fou § 4.2 du plan) : c'est le même dossier, lu dans une
       troisième pièce. */
    bureau: {
      nom: 'Le bureau de consultation',
      regarder: ({ a }) => ({
        tous: a('dossier-lu')
          ? ['Un bureau métallique couvert de formulaires d’assurance en retard.',
             'Le dossier est étalé dessus, en trois tas, et personne ne l’a refermé.']
          : ['Un bureau métallique couvert de formulaires d’assurance en retard — assez grand, une fois dégagé, pour y étaler quelque chose.'],
      }),
      utiliser: 'Tu t’y appuies. Il tient, comme tout ici depuis longtemps.',
      objets: {
        dossier: ({ a }) => a('dossier-lu')
          ? { tous: 'Vous l’avez lu. Trois fois, à quatre. Il ne dira rien de plus ici.',
              rabbit: '« Ce qui manque dedans ne va pas apparaître parce qu’on rouvre la chemise. »' }
          : {
              tous: ['Hercules étale la chemise sur le bureau, entre deux relances d’assureur, et la partage en trois tas.',
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

    /* ══ LE DÉCOR AMBIANT ══════════════════════════════════════════════ */
    autoclave: {
      nom: 'Un autoclave qui date',
      regarder: {
        tous: 'Un modèle qu’on ne fabrique plus, entretenu à la main depuis des années par quelqu’un qui n’a jamais eu de quoi le remplacer.',
        rabbit: '« Aucune puce, aucun cycle connecté. C’est le seul objet de la nuit que je ne peux pas espionner, et ça me plaît plus que ça ne le devrait. »',
        trash: '« Elle le fait tourner tous les matins, qu’il y ait un instrument à stériliser ou non. Un rituel, pas une nécessité. J’aime les gens qui en ont. »',
      },
      utiliser: 'Tu ne touches pas au matériel d’une femme qui te soigne gratuitement.',
    },

    fenetre: {
      nom: 'La fenêtre, sur la supérette',
      regarder: ({ a }) => ({
        tous: a('sarah-brulee')
          ? 'Une étoile de fêlures dans le double vitrage, et en bas, la vitrine de la supérette porte la même marque, plus large.'
          : 'Elle donne sur l’enseigne de la supérette, en bas, allumée toute la nuit. Il pleut encore.',
        rabbit: '« Une caméra à l’angle de la supérette, tournée vers la rue, pas vers cette fenêtre. Pour l’instant. »',
      }),
      utiliser: 'On ne l’ouvre pas. Il pleut, et il fait déjà assez froid comme ça.',
    },

    /* ══ LA SORTIE — le verrou du tableau ═════════════════════════════
       Contrairement à Herwick, aucun dilemme ne bloque la sortie APRÈS
       le tir : la décision de Sarah (`salle-videe` / `salle-pleine`) se
       prend AVANT, dans le dialogue `sarah`. Une fois le tir encaissé,
       la porte applique directement le seuil de confiance (G5) — même
       geste en deux temps que `planque.js`. */
    porte: {
      nom: 'La porte du cabinet, vers l’escalier de service',
      regarder: {
        tous: ['Une porte métallique qui donne sur l’escalier au-dessus de la supérette. Le tribunal est à vingt-cinq minutes, à pied.',
               'Il est un peu plus de six heures. On peut partir quand on veut, et c’est le problème : il faut savoir quand.'],
        rabbit: '« Une seule caméra dans cet escalier, tournée sur la porte de la supérette, pas sur celle-ci. »',
      },
      utiliser: ({ a }) => {
        /* ══ HUIT HEURES QUARANTE ═══════════════════════════════════
           Le coup part TOUJOURS, et le cabinet paie TOUJOURS
           (`sarah-brulee`, fixe — le pendant de `herwick-touche`). Ce
           qui varie, c'est la salle d'attente : vidée, personne ne
           prend le tir ; pleine, un patient le prend
           (`patient-touche`). La décision a été prise AVANT, dans
           `dialogues.sarah` — si elle ne l'a pas été, la salle est
           restée pleine par défaut, exactement ce que § 3.3 décrit
           comme l'état de départ. */
        if (!a('sarah-brulee')) {
          const debout = [
            'Huit heures quarante. Sarah relève la tête de son formulaire, une seconde avant que quiconque comprenne pourquoi.',
            'C’est à ce moment précis que le coup part.',
          ]
          if (a('salle-videe'))
            return { tous: [...debout,
                            'Le carreau siffle à travers la salle d’attente vide, ricoche sur le dossier d’une chaise, et continue sa route à travers la vitrine de la supérette, en bas.',
                            { texte: 'Personne n’était assis là pour le recevoir. La chaise, elle, ne s’en relèvera pas tout à fait droite.',
                              visuel: 'sarah-brulee' },
                            'En bas, quelqu’un crie. Ce n’est pas un cri de douleur — c’est un cri de vitrine cassée, à six heures du matin, et ça suffit largement pour que tout le quartier sache qu’il s’est passé quelque chose ici.'],
                     drakk: '« Une salle vidée à temps. La flèche a traversé une pièce vide pour aller casser une autre vitre. C’est presque un gâchis, vu sous cet angle. »',
                     hercules: '« Une clinique de rue qui fait la une pour un coup de feu ne rouvre pas le lendemain. On vient de fermer son cabinet aussi sûrement qu’avec une balle. »',
                     flags: ['sarah-brulee'],
                     fiches: ['tir-sarah'] }
          return { tous: [...debout,
                          'Le carreau traverse la salle d’attente, où trois personnes n’ont pas bougé parce que personne ne leur avait rien dit.',
                          { texte: 'Celle qui attendait depuis quatre heures tombe de sa chaise, une main sur le mollet, plus surprise que la douleur elle-même.',
                            visuel: 'sarah-brulee' },
                          'Sarah est déjà à genoux à côté d’elle avant que quiconque d’autre ait bougé — pas Lester, pas vous. Un inconnu, d’abord.'],
                   trash: '« On l’a laissée là. On savait, et on l’a laissée là. »',
                   hercules: '« Une pièce pleine se lit depuis la rue exactement comme une pièce vide. Nous, on savait ce qu’il y avait dedans. Le tireur, non. »',
                   flags: ['sarah-brulee', 'patient-touche'],
                   fiches: ['tir-sarah'] }
        }

        const c = compte(a)
        const commun = ['Sarah tient la porte, une main sur le chambranle, et ne dit presque rien.',
                        'Lester passe devant elle sans savoir quoi dire, et ne dit rien.']
        return c >= 3
          ? { tous: [...commun,
                     '« Bon. »',
                     '« Je vais leur dire. Pas ce qu’ils veulent entendre — ce qui s’est passé. »',
                     'Il regarde une dernière fois la salle, vide ou pleine selon ce qu’elle est devenue.',
                     '« Si vous êtes encore là quand je sortirai, je repasserai. Pour elle, ou pour vous. »'],
              hercules: '« Voilà quelqu’un qui vient de décider quelque chose tout seul. C’est plus rare que ça n’en a l’air. »',
              flags: ['lester-temoigne'], fiches: ['lester-temoigne'], va: 'tribunal' }
          : { tous: [...commun,
                     'Il ne dit rien. Il sort le premier, la tête basse.',
                     'Il ira au tribunal. Il sera vivant à dix heures. C’était le contrat.',
                     'Ce qu’il dira à la barre, personne ici ne le sait — et lui non plus.'],
              trash: '« On l’a assis dans une pièce où quelqu’un a payé pour nous, et on ne lui a pas parlé. On l’a juste transporté, une pièce de plus loin. »',
              va: 'tribunal' }
      },
    },
  },

  dialogues: {

    /* ══ LESTER — le même G5, repris de `planque.js` / `herwick.js` ═══
       Trois sujets ouverts à tout le monde, quatre paient des chaînes
       plantées ailleurs dans la nuit, un septième — `conf-sarah` — n'existe
       qu'ici, payé en étant vraiment soigné plutôt qu'en parlant. Il en
       faut TROIS sur sept. */
    lester: {
      qui: 'lester',
      accueil: ['Il ne lève pas la tête tout de suite.',
                '« C’est chez qui, ici ? »'],
      retour: ['« … »'],
      sujets: [
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
          texte: ['Personne ne parle. Dans la salle d’attente, quelqu’un tousse une fois, poliment, et se rendort presque.',
                  '« Ils m’ont posé la même question pendant trois jours. »',
                  '« Chaque fois que je répondais pas, ils écrivaient quelque chose. »',
                  '« Vous, vous écrivez rien. C’est bizarre. »'],
        },
        {
          id: 'question',
          titre: '« Pose-la, ta question. »',
          quand: ({ a }) => a('conf-job') && !a('conf-question'),
          flags: ['conf-question'],
          texte: ['« Pourquoi elle ? La doctoresse, là. »',
                  '« Pourquoi une clinique de rue ouvre sa dernière place à cinq heures et demie pour un gamin qu’elle a jamais vu ? »',
                  'La vraie réponse tient en un mot, Trash. On la lui donne.',
                  '« … D’accord. Au moins c’est une réponse. »'],
        },
        {
          id: 'teresa',
          titre: '« Teresa Banks. Tu la connaissais ? »',
          quand: ({ a }) => a('sait-teresa') && !a('conf-teresa'),
          flags: ['conf-teresa'],
          texte: ['Long silence. Dans la salle d’attente, une chaise grince.',
                  '« Elle dormait deux étages au-dessus. Elle descendait fumer parce qu’en haut ça tirait. »',
                  '« On s’est parlé quatre fois. Peut-être cinq. »',
                  '« Personne m’a demandé ça non plus. Ils m’ont demandé où j’étais. Jamais qui elle était. »'],
        },
        {
          id: 'bras',
          titre: '« Montre ce bras. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => a('lester-blesse') && !a('lester-soigne') && !a('conf-bras'),
          flags: ['conf-bras'],
          texte: ['Trash lui prend le poignet sans demander, remonte la manche, et regarde longtemps sans rien dire.',
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
                  '« C’est marrant, ce mot. Il sert à tout le monde. »'],
        },
        {
          id: 'loveland',
          titre: '« Le taudis où on l’a trouvée. C’était ta rue. »',
          quand: ({ a }) => a('dossier-lu') && !a('conf-dossier'),
          flags: ['conf-dossier'],
          fiches: ['lester-loveland'],
          texte: ['« … Ouais. »',
                  '« C’est un endroit où personne va. Y a rien dedans. Même nous on y allait pas. »',
                  '« Ils m’ont demandé quinze fois où j’étais cette nuit-là. Ils m’ont jamais demandé si elle, elle avait une raison d’y être. »',
                  '« Elle en avait pas. »'],
        },
        {
          id: 'deduction',
          titre: '« Ils ne veulent pas te condamner. Ils veulent qu’il n’y ait pas d’audience. »',
          quand: ({ a }) => a('su:pas-de-proces') && !a('conf-deduction'),
          flags: ['conf-deduction'],
          texte: ['Long silence.',
                  '« Donc si j’y vais, et que je parle… »',
                  '« … c’est le pire truc qui puisse leur arriver. »',
                  'Il se redresse. Ce n’est pas du courage, c’est du calcul, et c’est peut-être mieux.',
                  '« Personne m’a jamais dit que je pouvais être un problème pour quelqu’un. »'],
        },
        /* CE QUE SARAH LUI DONNE SANS RIEN LUI DEMANDER EN ÉCHANGE —
           propre à ce décor (garde-fou § 4.3 du plan). Gardé par
           `lester-soigne` : la confiance se paie ici en soignant, pas
           en parlant d'abord — un septième chemin, différent des six
           autres. */
        {
          id: 'sarah',
          titre: '« Ça va, le bras ? »',
          quand: ({ a }) => a('lester-soigne') && !a('conf-sarah'),
          flags: ['conf-sarah'],
          texte: ['Il tourne l’attelle vers la lumière, comme s’il vérifiait qu’elle est toujours là.',
                  '« Personne m’avait jamais recousu correctement. »',
                  '« Elle m’a pas demandé si j’avais un SIN. Elle m’a juste demandé où ça faisait mal. »',
                  '« … Je crois que j’ai jamais vu personne faire ça pour rien non plus. »'],
        },
        {
          id: 'assez',
          titre: '(Le laisser tranquille.)',
          fin: true,
          texte: ['Il regarde la salle d’attente, ou ce qu’il en reste.'],
        },
      ],
    },

    /* ══ SARAH — le dilemme, § 3.3 du plan ═══════════════════════════
       Ouvert par `sarah.parler`. `soigner`, `teresa-patiente` et
       `autopsie` sont des gestes À PART, jamais exclusifs entre eux ni
       avec la décision de la salle — c'est CETTE dernière (`vider` /
       `garder`) qui ferme la scène, et elle doit se prendre AVANT le
       tir (`porte.utiliser`, plus haut), pas après. */
    sarah: {
      qui: 'sarah',
      accueil: ['Elle a déjà évalué les cinq nouveaux venus avant qu’ils aient fini de refermer la porte — qui saigne, qui ment, qui tient encore debout par habitude.',
                '« Trash m’a prévenue que ce serait vous. Il ne m’a pas dit pour le petit. »'],
      retour: ['« Toujours là. La salle aussi. »'],
      sujets: [
        {
          id: 'soigner',
          titre: '« Le bras de Lester. Vraiment, cette fois. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => a('lester-blesse') && !a('lester-soigne'),
          flags: ['lester-soigne'],
          minutes: 25,
          texte: ['Elle l’assoit sur la table d’examen sans lui demander la permission, et découpe la manche au lieu de la remonter.',
                  'Vingt-cinq minutes, une désinfection qui pique pour de vrai, trois points de suture et une attelle propre — pas une écharpe rayée nouée à la va-vite.',
                  '« Voilà. Ça, c’est du vrai travail. »',
                  '« … Ça change quoi, à l’audience ? »',
                  '« Rien, sur le papier. Tout, sur la façon dont tu vas te tenir en te levant pour prêter serment. »'],
        },
        {
          id: 'teresa-patiente',
          titre: '« Vous avez déjà entendu ce nom ? Teresa Banks. »',
          quand: ({ a }) => !a('teresa-cliente'),
          flags: ['teresa-cliente'],
          fiches: ['teresa-cliente'],
          texte: ['Elle s’arrête, une seconde de trop pour que ce soit rien.',
                  '« Elle est venue ici. Deux fois, cet automne. »',
                  '« Elle voulait savoir comment on disparaît proprement — des papiers, un nom qu’on ne peut pas retracer. Je lui ai dit que je ne faisais pas ça. »',
                  '« Elle est repartie avant que je puisse lui demander de qui elle se cachait. »',
                  '« Je n’ai jamais reparlé d’elle avec personne. Le dossier ne le dit sûrement pas non plus. »'],
        },
        {
          id: 'autopsie',
          titre: '« L’autopsie. Un elfe, ou un ork ? »',
          /* `sait()` teste le carnet directement — `elfe-autopsie` est une
             fiche, pas un drapeau. Aucun autre fichier de données ne s'en
             sert encore (ils passent tous par un drapeau-relais du genre
             `dossier-lu`), mais `contexte()` (state.js) l'expose depuis le
             début : c'est le bon outil pour éviter de reposer la même
             fiche en boucle sans inventer un drapeau qui ferait doublon. */
          quand: ({ sait }) => !sait('elfe-autopsie'),
          fiches: ['elfe-autopsie'],
          texte: ['« Un elfe. Je connais celle qui a fait le rapport, on partage le même labo depuis dix ans. »',
                  '« Mets un ork dans une navette pour ça, et c’est vous qui vous êtes trompés de dossier. »',
                  '« Je peux vous le répéter à la barre, si quelqu’un a besoin de l’entendre deux fois. »'],
        },
        {
          id: 'vider',
          titre: '« Videz la salle d’attente. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => !decidee(a),
          fin: true,
          flags: ['salle-videe'],
          /* `visuels`, pas seulement `flags` : `.patient { display:none }`
             (scene-sarah.css) lit `data-etat`, qui vient de `visuels`, pas
             des drapeaux — le bug exact que le chantier 36 avait trouvé
             sur `herwick-touche` (posé comme drapeau, jamais marqué comme
             visuel, donc invisible avant le prochain rechargement).
             Trouvé ici en vérifiant dans le navigateur, pas en relisant
             le code. */
          visuels: ['salle-videe'],
          texte: ['Trash ne le dit pas à Sarah. Il le dit à voix haute, tourné vers les trois chaises.',
                  ['trash', '« Il faut que vous partiez. Je suis désolé. Ce n’est pas juste, et je vous le dis quand même. »'],
                  'Deux se lèvent tout de suite, habitués à ce genre de phrase venant de n’importe où. La troisième — celle qui attend depuis quatre heures — met plus longtemps.',
                  '« … J’avais un rendez-vous. »',
                  '« Je sais. »',
                  'Elle sort la dernière, sous la pluie, et elle ne reviendra pas.',
                  'Sarah ne dit rien pendant un moment. Puis : « Trois dossiers de retard, maintenant. Trois. » Ce n’est pas un reproche. C’est un compte.'],
        },
        {
          id: 'garder',
          titre: '(Laisser la salle telle quelle.)',
          acteur: 'trash',
          quand: ({ a }) => !decidee(a),
          fin: true,
          flags: ['salle-pleine'],
          texte: ['Personne ne dit rien aux trois inconnus. Ils restent, sans savoir pourquoi cette décision-là vient d’être prise pour eux.',
                  'Sarah regarde Trash un long moment.',
                  '« Tu ne les fais pas partir. »',
                  '« Non. »',
                  '« … D’accord. » Elle ne demande pas pourquoi. Elle a déjà deviné, et elle n’aime pas la réponse plus que lui.'],
        },
        {
          id: 'silence',
          titre: '(En rester là, pour l’instant.)',
          fin: true,
          texte: ['Elle retourne à ses formulaires en retard.'],
        },
      ],
    },
  },
}
