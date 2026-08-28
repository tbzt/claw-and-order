/* ============================================================
   TABLEAU 5 QUATER — LE SOUS-SOL DE DUKE. Choisi par White_Rabbit au
   conseil de la traversée (`retour.js`, dialogue `conseil`, sujet
   `duke`). Six heures et quelques.

   CHANTIER 37 — PLAN_PLANQUES.md § 3.4, ÉTAPE D DU § 8 : « Sarah, puis
   Duke, dans cet ordre : … le sous-sol en demande le plus (l'attaque
   change de nature). » Le troisième et dernier des trois décors annoncés
   par le chantier 35 à devenir réels, après Herwick (36) et Sarah (37,
   première moitié).

   ══ CE QUI SE CHOISIT, CE N'EST PAS D'ÉVITER LE TIR (§1 du plan) ═════
   Ici plus qu'ailleurs, parce que ce décor n'a PAS de ligne de tir : « pas
   de fenêtre… Chimera ne peut pas tirer de loin. Alors quelqu'un entre. »
   L'attaque ne se négocie donc pas — ni précaution, ni décision ne
   l'évite, contrairement à Herwick (comptage) : elle est fixe, comme le
   coût de la boutique de Herwick (`herwick-touche`). `ganger-touche` et
   `dette-duke` tombent TOUJOURS, au premier passage à la porte.

   ══ CE QUE CE DÉCOR AJOUTE : UN PRIX QUI SE PAIE AVANT ═══════════════
   « Duke ne fait pas crédit : il demande maintenant. » Le gain — Chimera
   confirmé, Toralf nommé, qui a payé — n'existe qu'après paiement : le
   créditube, l'arme de Wilson, ou un nom (McCarthy). Les trois sont
   équivalents mécaniquement (un seul drapeau, `duke-paye`), et
   différents dans ce qu'ils racontent — voir `dialogues.duke` plus bas.

   ══ LE MÉCANISME TRANCHÉ : LA CONFIANCE QUI COÛTE (§9 du plan) ═══════
   Le plan lui-même laissait la question ouverte : « Duke qui coûte une
   source de confiance — est-ce que ça ne double pas le créditube ? À
   trancher avant d'écrire le sous-sol, pas pendant. » Tranché ici,
   PENDANT ce chantier (aucun arbitrage n'était venu avant, et en
   reporter un de plus aurait bloqué le chantier lui-même) :

   `duke-malaise` — posé par le PAIEMENT lui-même, pas par le lieu ni par
   la présence de gens armés. « Le prix se paie DEVANT Lester » (§3.4) :
   ce n'est pas le sous-sol qui coûte, c'est de le voir se conclure sous
   ses yeux. Un drapeau séparé de `conf-perdue` (pas une réutilisation) :
   les deux racontent la même arithmétique — la confiance recule de deux
   points — mais des GESTES différents (offrir de l'argent À LESTER,
   contre régler une dette devant lui), et le plan demande explicitement
   que celui-ci se regagne : `duke-rassure`, posé en en parlant à Lester
   après coup (`dialogues.lester`, sujet `duke`), annule le malus tant
   qu'il n'a pas été posé. `conf-perdue`, lui, reste définitif ailleurs —
   ce n'est pas une incohérence, c'est exactement la nuance que le plan
   demandait : « il faut qu'elle se regagne autrement, en paroles, dans
   la même pièce » ne décrivait que CE geste-ci, pas le refus de Lester
   qu'on essaie de lui acheter directement. */

import { equipiers } from './equipiers.js'
/* Le dossier se lit dans les cinq décors où l'équipe attend l'audience,
   et c'est le MÊME dossier : son texte vit chez celui qui l'a écrit en
   premier (`planque.js`), et on ne passe ici que le meuble. */
import { lectureDossier } from './planque.js'

/* ══ LE G5, REPRIS DE `planque.js` / `herwick.js` ═════════════════════ */
const GRATUITES = ['conf-job', 'conf-question', 'conf-silence']
const CHAINEES  = ['conf-teresa', 'conf-guilde', 'conf-bras',
                   'conf-mccarthy', 'conf-deduction', 'conf-dossier',
                   'conf-duke']

const compte = (a) =>
  Math.min(GRATUITES.filter((f) => a(f)).length, 2) +
  CHAINEES.filter((f) => a(f)).length -
  (a('conf-perdue') ? 2 : 0) -
  (a('duke-malaise') && !a('duke-rassure') ? 2 : 0)

export const duke = {
  markup: 'scenes/duke.html',

  ouverture: ({ a }) => [
    'Un sous-sol de béton brut, sous un garage qui n’a plus vendu une seule pièce détachée depuis des années. Pas une fenêtre. Un escalier, une porte blindée, et huit personnes qui vous regardent entrer sans poser leurs armes.',
    'Duke ne s’est pas levé. « Assis, ou vous partez. » Ce n’est pas une hostilité — c’est une politesse, dans ce sous-sol-là.',
    a('lester-blesse')
      ? 'Lester s’est assis contre le mur du fond, son bras contre lui, à regarder huit inconnus armés comme il regarderait huit issues.'
      : 'Lester s’est assis contre le mur du fond, à regarder huit inconnus armés comme il regarderait huit issues.',
    'OBJECTIF — tenir jusqu’à l’audience, sans que ça coûte à celui qui a ouvert la porte. Il reste trois heures et quelques.',
  ],

  entree: ({ a }) => [
    ...(a('duke-paye') ? ['duke-paye'] : []),
    ...(a('ganger-touche') ? ['ganger-touche'] : []),
  ],

  derive: ({ a }) => {
    const c = compte(a)
    return [c <= 0 ? 'lester-ferme' : c < 3 ? 'lester-ecoute' : 'lester-ouvert']
  },

  vues: {
    physique: [
      'Huit personnes qui n’ont pas rangé leurs armes en vous voyant entrer, et une seule qui a le droit de parler la première — ça se voit à qui se tait.',
      '« Ici, on ne charme personne. On paie, et on se tait au bon moment. Je sais faire les deux, cette nuit je préférerais ne faire que le premier. »',
    ],
    astrale: [
      'Huit auras armées, serrées dans une pièce sans issue rapide — chacune prête depuis si longtemps qu’elle ne le remarque plus elle-même.',
      '« Ce n’est pas de la colère. C’est de la routine. Ça devrait me rassurer, et je crois que c’est pire. »',
    ],
    ra: [
      'Quatre caméras, toutes tournées vers l’escalier — le seul chemin d’entrée, ce qui explique pourquoi personne ici ne s’inquiète d’une fenêtre qu’il n’y a pas.',
      '« Duke ne surveille qu’une seule porte. C’est soit de la confiance dans ses murs, soit il n’a jamais eu besoin d’en surveiller une seconde. »',
    ],
    tactique: [
      'Pas une fenêtre, un escalier, une porte blindée : ce sous-sol n’a qu’une sortie, et huit personnes armées la tiennent avec vous à l’intérieur.',
      '« Une seule issue, compagnon, et elle est déjà tenue par eux. Si le fer doit chanter ici, il chantera pour eux, pas pour nous. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('duke'),

    /* ══ LESTER — le même G5, dans un quatrième lieu ══════════════════ */
    lester: {
      nom: 'Lester',
      regarder: ({ a }) => ({
        tous: a('ganger-touche')
          ? ['Il regarde le gars de Duke qu’on vient de recoucher sur un matelas, une main sur sa propre épaule sans s’en rendre compte.',
             '« Il a quel âge ? » Personne ne lui répond tout de suite, parce que la réponse est la même que la sienne.']
          : a('lester-blesse')
            ? ['Contre le mur du fond, le bras contre lui, il compte les huit personnes armées de la pièce sans en avoir l’air.',
               'C’est la première fois de la nuit qu’il est dans une pièce où être armé est la norme, pas l’exception.']
            : ['Contre le mur du fond, il compte les huit personnes armées de la pièce sans en avoir l’air.',
               'C’est la première fois de la nuit qu’il est dans une pièce où être armé est la norme, pas l’exception.'],
        hercules: a('duke-malaise') && !a('duke-rassure')
          ? '« Il a vu passer l’argent, ou l’arme, ou le nom. Il n’a rien dit. C’est ça qui m’inquiète : il a l’habitude de voir ce genre de choses se régler sans lui. »'
          : '« Un gamin qui compte des armes au lieu de compter des visages. On lui a appris ça avant qu’on le rencontre. »',
        trash: compte(a) >= 3
          ? ['« Son aura a doublé depuis le bateau, et elle est tournée vers nous. »',
             '« Il a décidé quelque chose, et il ne l’a encore dit à personne. »',
             '« Ce qu’il dira à la barre, il vient de le décider ici. »']
          : compte(a) >= 1
            ? ['« Son aura est plus grande qu’au bateau. Elle est tournée vers nous, pas ouverte. »',
               '« Il regarde huit personnes armées défendre sa vie et il essaie de comprendre ce que ça dit de la sienne. »']
            : ['« Son aura est serrée sur elle-même, comme au bateau. »',
               '« Il est dans la pièce la plus armée de la nuit et c’est peut-être celle où il se sent le moins en sécurité. »'],
        rabbit: '« Vingt ans, et il regarde huit personnes qui lui ressemblent plus que nous, sur le papier. Ça doit faire une drôle de nuit. »',
        drakk: '« Il compte les épées de la salle du trône. C’est un réflexe de survie que je reconnais. »',
      }),
      parler: { texte: [], dialogue: 'lester' },
      utiliser: 'Non. Il a passé la nuit à être déplacé par des mains.',
      objets: {
        bouteille: ({ a }) => a('guilde')
          ? { tous: 'Elle est restée sur le voilier. Ici, quelqu’un lui a déjà tendu une canette sans rien demander en échange.' }
          : { tous: 'Personne ne réagit. Dans ce sous-sol, une bouteille passée à un gamin n’étonne personne.' },
        arme: ({ a }) => a('duke-paye')
          ? { tous: 'Elle a déjà changé de main. Ce n’est plus la vôtre à donner.' }
          : { tous: 'Non. Pas devant huit inconnus armés, et pas devant un gamin à qui on doit encore beaucoup d’explications.' },
      },
    },

    /* ══ DUKE — l'hôte, qui ne fait jamais crédit ═════════════════════ */
    duke: {
      nom: 'Duke',
      regarder: ({ a }) => ({
        tous: a('duke-paye')
          ? ['Il n’a toujours pas bougé du fauteuil défoncé qui lui sert de trône, mais il a rangé ce qu’il tenait à la main. La dette est réglée ; le reste peut attendre.',
             '« Vous avez ce que vous êtes venus chercher. Asseyez-vous, maintenant. »']
          : ['Un humain, la trentaine large, assis dans un fauteuil défoncé comme si c’était un trône, entouré de gens qui le regardent avant de regarder n’importe qui d’autre.',
             'Il n’a pas encore demandé pourquoi vous êtes là. Il attend que ce soit vous qui le disiez.'],
        hercules: a('duke-paye')
          ? '« Un homme d’affaires, au fond. Le produit change, la politesse commerciale reste identique. Je peux travailler avec ce genre de logique. »'
          : '« Il ne va rien nous offrir avant qu’on ait posé quelque chose sur la table. Ce n’est pas de l’hostilité, c’est un tarif. »',
        trash: '« Son aura ne bouge pas d’un millimètre. Ce n’est pas du calme. C’est un homme qui a déjà décidé de toutes les issues possibles de cette conversation avant qu’elle commence. »',
        rabbit: '« Il m’a jamais fait crédit, même quand j’avais rien à offrir d’autre que du temps. Il a raison de ne pas commencer ce soir. »',
        drakk: '« Un seigneur de guerre sans couronne, qui n’a besoin d’aucun trône pour qu’on sache où s’adresser. »',
      }),
      parler: ({ a }) => a('duke-paye')
        ? { tous: 'Il a déjà dit ce qu’il avait à dire. Le reste, il le garde pour ses propres affaires.' }
        : { texte: [], dialogue: 'duke' },
      utiliser: 'On ne fouille pas un homme qui a huit personnes armées à portée de voix.',
      objets: {
        creditube: ({ a }) => a('duke-paye')
          ? { tous: 'Il a déjà été payé. Lui en proposer un second ne ferait qu’une chose : lui apprendre que vous en aviez un de plus.' }
          : {
              tous: ['Vous posez le créditube sur la caisse qui lui sert de table. Il le soupèse sans l’ouvrir — il connaît déjà le chiffre au poids.',
                     '« Voilà qui est civilisé. » Il le fait disparaître dans une poche, et pour la première fois de la nuit, quelque chose se détend dans la pièce.',
                     '« Chimera. Toralf, pour le tireur — vous le retrouverez pas, il est déjà reparti au nord. Payé par un compte qui remonte à une famille corpo. Telestrian, si le nom vous dit quelque chose. »'],
              drakk: '« Deux mille nuyens pour un nom. J’ai payé plus cher pour moins, dans des tables bien pires que celle-ci. »',
              flags: ['duke-paye', 'duke-malaise'],
              /* `visuels`, pas seulement `flags` : `data-etat` (dont
                 `scene-duke.css` lit `duke-paye`) vient de `visuels`, pas
                 des drapeaux — le même bug que `salle-videe` au premier
                 tableau de ce chantier, trouvé ici en vérifiant. */
              visuels: ['duke-paye'],
              fiches: ['duke-toralf'],
            },
        arme: ({ a }) => a('duke-paye')
          ? { tous: 'Il a déjà été payé. Lui en proposer une seconde ne ferait qu’une chose : lui apprendre que vous en aviez une de plus.' }
          : {
              tous: ['Vous posez l’arme de Wilson sur la caisse. Duke la retourne une fois, lit le numéro de série effacé, et hoche la tête — il sait reconnaître une pièce propre.',
                     '« Ça, c’est mieux qu’un chiffre. Ça se revend, et ça ne se trace pas. »',
                     '« Chimera. Toralf, pour le tireur — vous le retrouverez pas, il est déjà reparti au nord. Payé par un compte qui remonte à une famille corpo. Telestrian, si le nom vous dit quelque chose. »'],
              hercules: '« L’arme du mort pour payer l’enquête sur sa propre mort. Il y a une justice là-dedans que je préfère ne pas trop regarder en face. »',
              flags: ['duke-paye', 'duke-malaise'],
              visuels: ['duke-paye'],
              fiches: ['duke-toralf'],
            },
      },
    },

    /* ══ L'ESCALIER — le seul chemin d'entrée, et celui de l'attaque ═══
       Pas de fenêtre, pas de ligne de tir (§3.4 du plan) : la cible qui,
       ailleurs, porterait le tir de 8 h 40 est ici un passage physique.
       `porte.utiliser`, plus bas, y renvoie le texte du moment venu ;
       cette cible-ci ne fait que le montrer avant et après. */
    escalier: {
      nom: 'L’escalier, vers le garage',
      regarder: ({ a }) => ({
        tous: a('ganger-touche')
          ? 'La rambarde porte une éraflure neuve, à hauteur d’épaule. Quelqu’un est descendu plus vite qu’il ne comptait le faire.'
          : 'Douze marches de béton, une seule ampoule, et deux gardes qui ne le quittent jamais des yeux.',
        rabbit: '« Le seul chemin depuis la rue. Duke n’a jamais eu besoin d’en surveiller un second, et ça, ça devrait l’inquiéter plus que moi. »',
      }),
      utiliser: 'Ce n’est pas votre garde à monter ou à descendre.',
    },

    /* ══ LE COFFRE — où se lit le dossier ═════════════════════════════
       Même geste, mêmes trois fiches qu'ailleurs (garde-fou § 4.2). */
    coffre: {
      nom: 'Une caisse de munitions, retournée en table basse',
      regarder: ({ a }) => ({
        tous: a('dossier-lu')
          ? ['Une caisse de munitions vide, retournée, qui sert de table basse depuis plus longtemps qu’elle n’a servi de caisse.',
             'Le dossier est étalé dessus, en trois tas, et personne ne l’a refermé.']
          : ['Une caisse de munitions vide, retournée, qui sert de table basse — assez grande pour y étaler quelque chose.'],
      }),
      utiliser: 'Tu t’y appuies. Elle tient, comme tout ici depuis longtemps.',
      objets: {
        dossier: lectureDossier('sur la caisse retournée, entre deux chargeurs vides'),
      },
    },

    /* ══ LE DÉCOR AMBIANT ══════════════════════════════════════════════ */
    armurerie: {
      nom: 'Un râtelier d’armes',
      regarder: {
        tous: 'Plus de fusils que de personnes dans la pièce. Chacun entretenu, aucun décoratif.',
        rabbit: '« Rien de connecté là-dedans. Duke ne fait pas confiance aux gâchettes intelligentes, et honnêtement, ce soir, je le comprends. »',
        drakk: '« Un arsenal sans armoirie. Ça ne les rend pas moins impressionnants, seulement moins bavards sur qui les possède. »',
      },
      utiliser: 'Tu ne touches pas au matériel d’un homme qui a huit amis armés dans la même pièce.',
    },

    moniteurs: {
      nom: 'Un mur de moniteurs',
      regarder: {
        tous: 'Quatre écrans, tous braqués sur l’escalier, sous des angles légèrement différents. Aucun ne montre autre chose.',
        rabbit: '« Une seule idée fixe, sur quatre écrans. Ça en dit plus sur ce qu’il craint que dix minutes de conversation. »',
      },
      utiliser: 'Ce n’est pas à vous de toucher à sa sécurité.',
    },

    /* ══ LA SORTIE — le verrou du tableau ═════════════════════════════
       Comme Sarah, aucun dilemme ne bloque la sortie après le tir : le
       seul geste qui compte ici (payer) se prend AVANT, avec Duke. Une
       fois l'attaque encaissée, la porte applique directement le seuil
       de confiance (G5). */
    porte: {
      nom: 'La porte blindée, vers le garage',
      sortie: 'tribunal',
      regarder: {
        tous: ['Une porte renforcée, avec une barre de sécurité qu’il faut lever à deux mains. Le tribunal est à vingt minutes, une fois dehors.',
               'Il est un peu plus de six heures. On peut partir quand on veut, et c’est le problème : il faut savoir quand.'],
        drakk: '« Une porte qui se défend elle-même. J’apprécie l’honnêteté du geste. »',
      },
      utiliser: ({ a }) => {
        /* Duke l'a dit d'entrée (`dialogues.duke`, accueil) : « je fais
           pas crédit ». La barre de sécurité ne se lève pas tant que
           `duke-paye` n'est pas posé — le seul verrou physique de ce
           tableau, cohérent avec ce que le dialogue promet déjà. */
        if (!a('duke-paye'))
          return { tous: 'La barre de sécurité ne se lève pas sans un mot de Duke, et Duke n’a pas dit ce mot.',
                   drakk: '« Il tient sa porte aussi fermement qu’il tient sa parole. Il faudra payer. »' }

        /* ══ HUIT HEURES QUARANTE, AUTREMENT ═══════════════════════════
           « Pas de ligne de tir : Chimera ne peut pas tirer de loin.
           Alors quelqu'un entre. » (§3.4 du plan) — l'attaque ne se
           négocie pas, ni précaution ni décision : elle est fixe, comme
           le coût des deux autres décors. `ganger-touche` et
           `dette-duke` tombent TOUJOURS, indépendamment de `duke-paye`. */
        if (!a('ganger-touche')) {
          return {
            tous: ['Huit heures quarante. Une des caméras de l’escalier crachote une demi-seconde, et personne dans la pièce ne le prend pour un hasard.',
                   'Deux des gens de Duke sont debout avant que quiconque d’autre ait compris pourquoi.',
                   { texte: 'La porte du garage cède plus vite qu’elle n’aurait dû. Un homme descend les douze marches en courant, arme haute, et n’arrive pas en bas.',
                     visuel: 'ganger-touche' },
                   'Ce n’est pas vous qui avez tiré. C’est le plus jeune de la bande de Duke, à peu près l’âge de Lester, qui prend une balle à l’épaule en couvrant l’escalier — et qui reste debout.',
                   'L’intrus, lui, ne redescend pas les marches. Il ne les remonte pas non plus.'],
            drakk: '« Un contre huit, dans un escalier sans issue. Ce n’était pas du courage. C’était une erreur de calcul, de leur côté. »',
            hercules: '« Ils savaient qu’on serait ici. La question n’a jamais été de savoir s’ils viendraient. C’était de savoir combien de portes ils auraient à choisir. »',
            trash: '« Personne ne meurt ce soir. Ça ne veut pas dire que personne ne saigne pour nous. »',
            flags: ['ganger-touche', 'dette-duke'],
            fiches: ['tir-duke'],
          }
        }

        const c = compte(a)
        const commun = ['Duke lève lui-même la barre de sécurité, sans un mot, et vous laisse sortir dans le garage vide.',
                        'Lester passe devant lui sans savoir quoi dire, et ne dit rien.']
        return c >= 3
          ? { tous: [...commun,
                     '« Bon. »',
                     '« Je vais leur dire. Pas ce qu’ils veulent entendre — ce qui s’est passé. »',
                     'Il regarde une dernière fois l’escalier, et le matelas où on a recouché un gars qui a son âge.',
                     '« S’ils demandent qui m’a protégé cette nuit, je dirai la vérité. Toute la vérité, pas juste la partie qui vous arrange. »'],
              hercules: '« Voilà quelqu’un qui vient de décider quelque chose tout seul. C’est plus rare que ça n’en a l’air. »',
              flags: ['lester-temoigne'], fiches: ['lester-temoigne'], va: 'tribunal' }
          : { tous: [...commun,
                     'Il ne dit rien. Il sort le premier, la tête basse.',
                     'Il ira au tribunal. Il sera vivant à dix heures. C’était le contrat.',
                     'Ce qu’il dira à la barre, personne ici ne le sait — et lui non plus.'],
              trash: '« On l’a assis dans une pièce où quelqu’un a saigné pour nous, et on ne lui a pas parlé. On l’a juste transporté, une pièce de plus loin. »',
              va: 'tribunal' }
      },
    },
  },

  dialogues: {

    /* ══ LESTER — le même G5, repris de `planque.js` / `herwick.js`
       ═══════════════════════════════════════════════════════════════
       Trois sujets ouverts à tout le monde, quatre paient des chaînes
       plantées ailleurs dans la nuit, un septième — `conf-duke` —
       n'existe qu'ici, gardé par `ganger-touche`. Un sujet de plus,
       `duke`, ne pose pas de confiance : il EN REND une, en effaçant le
       malus de `duke-malaise` (voir l'en-tête du fichier). Il en faut
       TROIS chaînes/gratuites sur sept pour ouvrir G5, indépendamment de
       ce huitième sujet qui ne fait que réparer ce que le paiement a
       coûté. */
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
          texte: ['Personne ne parle. Quelque part dans la pièce, quelqu’un vérifie un chargeur, par habitude plus que par besoin.',
                  '« Ils m’ont posé la même question pendant trois jours. »',
                  '« Chaque fois que je répondais pas, ils écrivaient quelque chose. »',
                  '« Vous, vous écrivez rien. C’est bizarre. »'],
        },
        {
          id: 'question',
          titre: '« Pose-la, ta question. »',
          quand: ({ a }) => a('conf-job') && !a('conf-question'),
          flags: ['conf-question'],
          texte: ['« Pourquoi eux ? Duke, sa bande, là. »',
                  '« Pourquoi huit personnes armées gardent la porte pour un gamin qu’elles ont jamais vu ? »',
                  'La vraie réponse tient en un mot, White_Rabbit. On la lui donne.',
                  '« … D’accord. Au moins c’est une réponse. »'],
        },
        {
          id: 'teresa',
          titre: '« Teresa Banks. Tu la connaissais ? »',
          quand: ({ a }) => a('sait-teresa') && !a('conf-teresa'),
          flags: ['conf-teresa'],
          texte: ['Long silence. Quelque part, une radio grésille en sourdine.',
                  '« Elle dormait deux étages au-dessus. Elle descendait fumer parce qu’en haut ça tirait. »',
                  '« On s’est parlé quatre fois. Peut-être cinq. »',
                  '« Personne m’a demandé ça non plus. Ils m’ont demandé où j’étais. Jamais qui elle était. »'],
        },
        {
          id: 'bras',
          titre: '« Montre ce bras. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => a('lester-blesse') && !a('conf-bras'),
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
        /* CE QUE DUKE LUI APPREND SANS UN MOT — propre à ce décor
           (garde-fou § 4.3 du plan). Gardé par `ganger-touche`. */
        {
          id: 'duke-confiance',
          titre: '« Il a ton âge, celui qui vient de se prendre une balle pour toi. »',
          quand: ({ a }) => a('ganger-touche') && !a('conf-duke'),
          flags: ['conf-duke'],
          texte: ['Il regarde longtemps vers le matelas, avant de répondre.',
                  '« Il me ressemble pas juste sur l’âge. »',
                  '« Il aurait pu être moi, dans une autre rue. J’aurais pu être lui, dans celle-ci. »',
                  '« … C’est la première fois que quelqu’un que je connais pas prend un coup pour moi sans me demander mon avis. »'],
        },
        /* CE QUI RÉPARE CE QUE LE PAIEMENT A COÛTÉ — voir l'en-tête du
           fichier. Ne pose PAS de confiance (aucun `conf-*`) : annule le
           malus de `duke-malaise` sans ajouter de source neuve, exactement
           ce que le plan demandait (« se regagner, pas s'ajouter »). */
        {
          id: 'duke',
          titre: '« Ce qu’on vient de faire, avec Duke. On te le doit, une explication. »',
          quand: ({ a }) => a('duke-malaise') && !a('duke-rassure'),
          flags: ['duke-rassure'],
          texte: ['Il ne dit rien tout de suite. Il a déjà vu passer l’objet, ou entendu le nom — il attendait juste de voir si quelqu’un le lui dirait en face.',
                  '« C’était pour Chimera. Pas pour vous acheter, moi. »',
                  '« … Je sais faire la différence. Je l’ai pas toujours faite, avant cette nuit. »',
                  '« Merci de me l’avoir dit quand même. »'],
        },
        {
          id: 'assez',
          titre: '(Le laisser tranquille.)',
          fin: true,
          texte: ['Il regarde l’escalier, ou ce qui vient de s’y passer.'],
        },
      ],
    },

    /* ══ DUKE — le prix qui se paie avant, § 3.4 du plan ══════════════
       Ouvert par `duke.parler` tant que `duke-paye` n'est pas posé. Le
       nom (McCarthy) est la troisième voie de paiement — verbale, donc
       ici plutôt que dans `objets` (voir l'en-tête du fichier). */
    duke: {
      qui: 'duke',
      accueil: ['Il ne se lève pas. « Je fais pas crédit. Vous voulez quelque chose, vous payez avant, pas après. »',
                '« Créditube, matériel, ou un nom qui vaut quelque chose. Choisissez. »'],
      retour: ['« Toujours pas payé. »'],
      sujets: [
        {
          id: 'nom',
          titre: '« C’est McCarthy. Un flic de la brigade criminelle. »',
          quand: ({ a }) => !a('duke-paye'),
          fin: true,
          flags: ['duke-paye', 'duke-malaise'],
          visuels: ['duke-paye'],
          fiches: ['duke-toralf'],
          texte: ['Duke ne bouge pas un muscle, mais quelque chose change dans la pièce — les huit autres l’ont entendu aussi.',
                  '« Un nom de flic. Ça vaut plus cher que vous ne le pensez, et moins cher que vous ne l’espérez. »',
                  '« Chimera. Toralf, pour le tireur — vous le retrouverez pas, il est déjà reparti au nord. Payé par un compte qui remonte à une famille corpo. Telestrian, si le nom vous dit quelque chose. »',
                  'Lester n’a rien dit. Il a tout entendu.'],
        },
        {
          id: 'silence',
          titre: '(Ne rien payer, pour l’instant.)',
          fin: true,
          quand: ({ a }) => !a('duke-paye'),
          texte: ['« Comme vous voulez. La porte reste fermée jusqu’à ce que vous changiez d’avis. »',
                  'Personne ne bouge pour vous en empêcher. Personne ne bouge pour vous aider non plus.'],
        },
        {
          id: 'apres',
          titre: '(Rien à ajouter.)',
          quand: ({ a }) => a('duke-paye'),
          fin: true,
          texte: ['Il a déjà dit ce qu’il avait à dire.'],
        },
      ],
    },
  },
}
