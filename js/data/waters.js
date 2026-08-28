/* ============================================================
   TABLEAU 11 — WATERS SOUND. Un studio d'enregistrement de quartier, à
   Puyallup, entre une teinturerie et un armurier fermé depuis des
   années.

   CHANTIER 43 — `PLAN_TRAME_ACTES_III_IV.md` § 7.1, RANG 8 DU § 10.
   Quatrième lieu de l'acte IV, après le local (28), l'appartement (26)
   et le Shameless (27) — mais PAS une quatrième ancre : les trois
   déductions réservées à l'acte IV sont déjà posées (`hayden`,
   `lester-innocent`, `amant-secret`). Ce que ce tableau rend n'est pas
   une déduction. C'est un LEVIER — la table du § 7.1 le dit au mot
   près : « l'enregistrement… (pas une déduction : un levier) ».

   ══ LA PRÉMISSE, VÉRIFIÉE AVANT D'ÉCRIRE UNE LIGNE ═══════════════════
   Le tableau n'improvise rien : `amis.js` a posé la fiche
   `enregistrement-waters` (Psych, contre un créditube OU gratuitement
   en parlant chant) et un sujet entier, `waters` (chez Psych), qui
   annonce déjà les trois éléments du § 7.1 :

     « Il a un coffre dans la salle de montage… tout le monde le sait. »
     « Faites attention avec sa matrice. Il a mis un truc dessus… il
       était très fier. »

   Ce fichier ne fait donc qu'honorer ce que `amis.js` promettait déjà —
   même discipline que le chantier 27, qui n'a rien dû changer à
   `noeud()` parce que le 17 l'avait écrit générique. Le COMMLINK
   « sorti d'usine et coupé » du § 7.1 n'est pas un objet à part : c'est
   littéralement pourquoi l'enregistrement ne peut pas se voler à
   distance — Teresa l'a acheté neuf, jamais connecté, exprès pour
   qu'aucune trace matricielle ne remonte jusqu'à Hayden. La seule
   « bombe matricielle » du tableau est donc sur le COFFRE qui le
   contient, pas sur l'appareil lui-même.

   ══ CE QUE WATERS EST, ET CE QU'IL N'EST PAS ═════════════════════════
   Ni un deuil (Herwick, Iris) ni une loyauté (Mark) ni une cause
   (Nita) : Psych l'a déjà dit — « il aime personne, en fait ». Un
   collectionneur paranoïaque et vaniteux, qui protège moins Teresa que
   sa propre réputation de coffre-fort. La faute qui le ferme n'est donc
   PAS payer (à l'inverse de Mark/Iris, un quatrième « ne payez pas »
   aurait été une répétition) : c'est l'INSULTER en le traitant comme un
   fourgueur qu'on achète, quand ce qu'il veut, c'est qu'on reconnaisse
   ce qu'il a fait. Trois routes, une seule ferme les deux autres :

     `troisieme-prise`  (si `sait('enregistrement-waters')`) — utiliser
                        exactement le détail que Psych a donné en plus,
                        gratuitement, en répondant à SA question. Une
                        récompense pour avoir écouté jusqu'au bout.
     `metier` (Trash)   — lire sa solitude plutôt que son coffre. Une
                        route de secours qui ne demande rien de plus
                        que d'avoir emmené Trash.
     `creditube`        — la faute. Ferme les deux routes ci-dessus pour
                        de bon (`waters-vexe`), sans fermer le tableau :
                        il reste la voie technique, plus chère.

   ══ LE COFFRE — DEUX ROUTES, MÊME PRIX, PAS LA MÊME QUALITÉ ══════════
   Encore une fois « ce qui se choisit, ce n'est pas SI on obtient »
   (garde-fou des planques, § 1 de `PLAN_PLANQUES.md`) — ici transposé :
   ce qui se choisit, c'est INTACT ou ABÎMÉ. Convaincu, Waters ouvre
   lui-même : rien ne se déclenche, parce que rien n'est forcé. Forcé
   par White_Rabbit (seul compétent, comme la caisse chez Herwick ou
   le maglock à l'appartement) : la bombe matricielle fait ce que
   Waters l'a payée pour faire, et l'enregistrement — comme
   White_Rabbit — en ressort abîmé. Les deux routes sont désarmées si
   `enregistrement-recupere` est déjà posé.

   ══ CE QUE CE TABLEAU NE FAIT PAS ═════════════════════════════════════
   Il ne construit ni Renfield (rang 9) ni la 2ᵉ audience et ses quatre
   retombées (rang 10, `PLAN_TRAME_ACTES_III_IV.md` § 8) : ce que
   l'équipe fait de ce levier — la tractation contre le silence de
   Chimera, ou son abandon — reste à écrire quand le tribunal rouvrira.
   Il ne construit pas non plus le compteur d'exposition de D9, toujours
   dû, toujours pour la même raison notée aux chantiers 27 et 28 :
   inventer ce que Chimera menace réellement à l'acte IV sans que le
   plan ait tranché serait la même erreur que le 17 d'origine (D11). */

import { equipiers } from './equipiers.js'

export const waters = {
  markup: 'scenes/waters.html',

  acte: 4,

  /* L3, comme aux trois lieux précédents. Aucune surveillance du Tír
     ici (§ 7.4 : seuls l'appartement et les amis le sont), donc pas de
     `tir-prevenu` à ce tableau — la seconde visite change seulement ce
     que Waters a eu le temps de digérer. */
  ouverture: ({ a }, visite) => visite > 1 ? [
    a('enregistrement-recupere')
      ? ['Waters n’ouvre même plus la bouche en vous voyant entrer. Le coffre est vide, la porte est ouverte, et il n’y a plus rien entre vous à négocier.',
         'OBJECTIF — plus rien, ici. Il ne reste qu’à repartir.']
      : ['La casquette est toujours vissée sur le crâne, les bras toujours croisés. Rien n’a changé, et c’est mauvais signe : ça veut dire qu’il a eu tout ce temps pour se convaincre qu’il avait raison de refuser.',
         'OBJECTIF — reprendre ce qu’on n’a pas obtenu la première fois.'],
  ] : [
    'Un studio d’enregistrement de quartier, coincé entre une teinturerie et un armurier fermé depuis des années. L’enseigne dit WATERS SOUND — le S final a lâché il y a longtemps, et personne n’a jamais payé pour le remplacer.',
    ['waters', '« Psych a appelé. Il a dit que des gens viendraient poser des questions sur une fille. Il a pas dit lesquelles, ni combien. »'],
    'Reginald Waters ne s’écarte pas encore de la porte — casquette usée, cardigan élimé sur une chemise autrefois repassée, une paire de gros écouteurs en permanence autour du cou, comme un stéthoscope qu’il aurait cessé d’utiliser sur des vivants.',
    'OBJECTIF — repartir avec ce qu’il garde. Il ne le donnera à personne qui le lui demande mal.',
  ],

  /* Comme aux trois lieux précédents : tout se décide PENDANT la
     visite, jamais à l'entrée. Trois états pour l'ambiance générale du
     studio, et les drapeaux individuels qui suivent pour ce que la
     scène doit relire (règle du playtest du 2026-08-22). */
  derive: ({ a }) => [
    a('enregistrement-recupere') ? 'studio-ouvert' : a('waters-convaincu') || a('bombe-declenchee') ? 'studio-entrouvert' : 'studio-ferme',
    ...(a('waters-vexe') ? ['waters-vexe'] : []),
    ...(a('bombe-declenchee') ? ['bombe-declenchee'] : []),
  ],

  vues: {
    sociale: [
      'Une console de mixage qui a dû coûter cher il y a vingt ans, un mur de disques encadrés dont la moitié ne sont sans doute même pas d’or, et une cabine vitrée qui n’a pas vu de musicien depuis un moment.',
      '« Il vit là-dedans plus qu’il n’y travaille. »',
      '« La poussière est partout, sauf sur ce qui compte pour lui. On apprend beaucoup d’un homme en regardant ce qu’il essuie. »',
    ],
    astrale: [
      'Une pièce saturée de petites vanités empilées, année après année. Chaque disque encadré est accroché face à la porte.',
      '« Il est seul depuis longtemps. »',
      '« Il a fini par préférer les enregistrements. »',
    ],
    ra: [
      'Un réseau domestique modeste, et une seule icône qui détonne : un verrou électronique, sur le mur du fond, avec une signature de sécurité bien plus lourde que le reste du studio.',
      '« Ça, c’est payé cher. Le reste tourne sur du matériel des années 2060. »',
      '« Il a mis toutes ses économies sur une seule porte. »',
    ],
    materielle: [
      'Une entrée, un fond de salle sans autre issue visible, et un homme seul qui n’a manifestement jamais eu à défendre cet endroit contre personne.',
      '« Aucune ligne de tir à couvrir. »',
      '« Ce qu’il y a de dangereux ici est enfermé dans un mur. »',
    ],
  },

  hotspots: {

    /* Les quatre équipiers, catalogue commun (js/data/equipiers.js). */
    ...equipiers('waters'),

    /* ══ WATERS — collectionneur, pas endeuillé (voir l'en-tête) ══════
       Trois routes vers `waters-convaincu`, une seule les ferme toutes
       les deux (`creditube`, dans `objets`, plus bas). Il n'y a pas de
       chemin qui échoue pour de bon — seulement un qui coûte plus cher
       (la bombe matricielle, sur le coffre). */
    waters: {
      nom: 'Reginald Waters',
      regarder: ({ a }) => ({
        tous: a('enregistrement-recupere')
          ? ['Assis sur le tabouret de sa console, il ne regarde plus la porte du fond. Il regarde ses propres mains, comme s’il cherchait ce qu’elles avaient fait de mal.',
             'Le studio est aussi silencieux qu’à l’arrivée. C’est juste devenu un silence différent.']
          : a('waters-convaincu')
            ? ['Il a arrêté de croiser les bras. Ce n’est pas de la confiance — c’est de la résignation, avec une pointe de quelque chose qui ressemble presque à du soulagement.',
               'Personne, avant vous, ne lui avait demandé de PARLER de ce qu’il gardait. Seulement de le rendre.']
            : ['Un homme d’une soixantaine d’années, casquette vissée, cardigan élimé, une paire d’écouteurs autour du cou qu’il ne retire jamais — même pour dormir, à en juger par leur usure.',
               'Il vous regarde comme on regarde un client qui n’a pas de rendez-vous : avec l’attention polie de quelqu’un qui a déjà décidé de refuser.'],
        hercules: a('waters-vexe')
          ? '« Je viens de perdre trente ans de métier sur une seule phrase. Cet homme ne voulait pas d’argent. J’ai insisté quand même. »'
          : '« Un homme qui n’a jamais vendu ce qu’il a de plus précieux, et qui en meurt d’envie qu’on le lui demande bien. Ça, je sais faire. »',
        trash: '« Son aura est toute repliée sur elle-même, comme celle d’un homme qui vit seul depuis si longtemps qu’il a oublié le son de sa propre voix quand elle n’explique rien à personne. »',
        rabbit: '« Zéro trace en ligne à son nom depuis quinze ans. Un type qui a arrêté d’exister pour tout le monde sauf pour ceux qui viennent frapper à sa porte. »',
        drakk: '« Le gardien du trésor qui n’a plus de compagnie à impressionner. Il continue de le garder quand même — certains serments ne demandent pas de témoin. »',
      }),
      parler: ({ a }) => {
        if (a('enregistrement-recupere'))
          return { tous: 'Il regarde le coffre vide, puis vous. « On a fini, non ? »' }
        return { texte: [], dialogue: 'waters' }
      },
      utiliser: 'On ne met pas la main sur un homme qui a fini par vous ouvrir sa porte, même à contrecœur.',
      objets: {
        /* LA FAUTE PROPRE À CE DÉCOR (voir l'en-tête) — pas la même que
           Mark/Iris. Elle ne perd pas la fiche : elle ferme les deux
           routes sociales et laisse la route technique, plus chère. */
        creditube: ({ a }) => {
          if (a('enregistrement-recupere'))
            return { tous: 'Il ne le regarde même pas. « C’est réglé, ça, ou ça l’est plus. »' }
          if (a('waters-vexe'))
            return { tous: 'Il ne le regarde toujours pas. « J’ai rien de plus à vous dire, et vous n’avez rien de plus à m’offrir. »' }
          return {
            tous: ['Tu poses le créditube sur la console, entre les deux VU-mètres.',
                   'Il le regarde une seconde de trop, et quelque chose se ferme dans son visage — pas de la colère, quelque chose de plus vieux.',
                   ['waters', '« … Vous croyez que je fais ça pour l’argent. »'],
                   ['waters', '« Trente ans que je mets ce que les gens ont de plus vrai dans une boîte, et vous croyez que c’est un tarif. »'],
                   'Il repousse le tube sans le toucher, et retourne s’asseoir face à sa console, dos à vous.'],
            hercules: '« Reprends ça. Range-le, tout de suite — j’aurais dû le voir venir. »',
            trash: '« Ce n’était jamais une histoire d’argent. On vient de le lui prouver de la pire façon. »',
            flags: ['waters-vexe'],
          }
        },
        bouteille: 'Il secoue la tête sans se retourner. « Pas dans cette pièce. Rien qui puisse tomber sur le matériel. »',
        arme: 'Non. Pas sur un homme qui n’a jamais rien fait d’autre que refuser d’ouvrir une porte.',
      },
    },

    /* ══ LE COFFRE — le levier du § 7.1, dans la salle de montage ═════
       Psych en a déjà donné l'existence ET l'emplacement (`amis.js`) :
       rien à découvrir ici, seulement à ouvrir. Deux routes, un seul
       verrou — voir l'en-tête. */
    coffre: {
      nom: 'Le coffre, dans la salle de montage',
      regarder: ({ a }) => ({
        tous: a('enregistrement-recupere')
          ? 'Porte ouverte, vide — il ne reste que la mousse qui protégeait ce qu’il y avait dedans, et la forme, en creux, d’un boîtier de commlink.'
          : 'Encastré dans le mur du fond de la salle de montage, derrière une étagère de bandes qu’il a fallu pousser pour le voir. Waters ne l’a jamais vraiment caché — juste rendu ennuyeux à trouver, ce qui n’est pas la même chose.',
        rabbit: a('enregistrement-recupere')
          ? undefined
          : '« Verrou électronique, pas mécanique. Et quelque chose dessus qui n’aime pas qu’on le regarde de trop près — exactement ce que Psych avait décrit. Il a payé cher, et ça se voit dans le code. »',
        hercules: a('enregistrement-recupere')
          ? undefined
          : '« Un coffre qu’on cache mal exprès, pour qu’on croie l’avoir trouvé tout seul. C’est une vieille ruse de vendeur : laisser le client penser qu’il a gagné quelque chose. »',
      }),
      utiliser: ({ a, qui }) => {
        if (a('enregistrement-recupere'))
          return { tous: 'Il est vide. Il n’y a plus rien à en tirer.' }

        /* LA ROUTE PROPRE : Waters ouvre lui-même, rien ne se déclenche
           parce que rien n'est forcé. */
        if (a('waters-convaincu'))
          return {
            tous: ['Waters se lève sans un mot, va jusqu’à la salle de montage, et pousse l’étagère de bandes.',
                   'Il compose un code de tête, sans le cacher — la première fois de la visite qu’il ne se méfie plus de personne dans la pièce.',
                   'Le coffre s’ouvre sur un boîtier de commlink tout simple, encore dans son emballage d’origine entamé, jamais connecté à rien.',
                   ['waters', '« Elle me l’a apporté neuf. Elle a dit : “Comme ça, il n’existe nulle part sauf ici.” Elle avait raison. »'],
                   'Il vous le tend. Ce n’est pas un objet précieux à regarder — c’est un commlink comme il s’en vend cent par jour. C’est tout ce qu’il contient qui ne l’est pas.',
                   ['waters', '« Quatre titres. Elle chantait, entre les prises. Prenez-en soin. »']],
            hercules: '« Voilà quelqu’un qui vient de se faire confiance à lui-même plus qu’à personne d’autre dans cette pièce. Ça ne s’achète pas. Je viens de le vérifier deux fois cette nuit. »',
            drakk: ['« Le gardien remet lui-même la clé. »', '« Personne ne la lui a prise. »'],
            flags: ['enregistrement-recupere'],
            fiches: ['enregistrement-recupere'],
          }

        /* LA ROUTE TECHNIQUE : seul White_Rabbit sait faire. Depuis le
           chantier 47, cliquer ici ne résout plus rien tout seul — ça
           lance le plongeon. La résolution (les deux issues, la même
           décharge) vit maintenant dans `matrice-waters.js`, avec un
           lieu où se jouer ; ce hotspot ne fait plus que l'introduire.
           Le prix se paie sur l'objet lui-même — pas sur une personne,
           comme au reste des planques (§4.3 du plan des planques),
           mais sur ce que la nuit devait rapporter. */
        if (qui === 'rabbit')
          return {
            tous: a('waters-vexe')
              ? ['Waters se jette presque devant la porte de la salle de montage. « Non — pas comme ça, pas — » Trop tard.',
                 'White_Rabbit est déjà dans le verrou.']
              : ['White_Rabbit s’agenouille devant le verrou sans attendre d’y être invité. Waters ne dit rien — il regarde ailleurs, ce qui est sa façon à lui de ne pas regarder.',
                 'Le lien se pose, net, et la salle de montage cesse d’être ce qui compte.'],
            rabbit: '« Je reviens. »',
            va: 'matrice-waters',
          }

        return {
          tous: 'Il faudrait soit convaincre Waters de l’ouvrir lui-même, soit un deckeur pour passer le verrou — et personne d’autre ici n’a les mains pour ça.',
          drakk: '« Une porte fermée à double sens. Sociale, ou technique. Je ne sais laquelle je préfère éviter. »',
        }
      },
    },

    /* ══ LA CONSOLE — décor, texture matricielle pour Rabbit ═════════ */
    console: {
      nom: 'La console de mixage',
      regarder: {
        tous: ['Des dizaines de curseurs usés à l’endroit exact où une main revient sans cesse. Vingt ans de matériel qui a plus servi qu’il n’a jamais rapporté.',
               'Un cendrier plein, jamais vidé, à côté d’un casque qui ne quitte jamais son crochet — celui autour du cou de Waters est son seul, son vrai casque.'],
        hercules: '« Ce matériel a coûté une fortune il y a vingt ans et n’en vaut plus rien aujourd’hui. Il ne l’a jamais changé. Certains hommes gardent leurs outils comme d’autres gardent des photos. »',
        rabbit: '« Rien de connecté là-dedans, à part le strict nécessaire. Un studio entier qui a choisi de rester hors ligne, curseur par curseur. »',
        drakk: '« Un autel à un dieu qui n’écoute plus. Il continue de faire les offrandes. »',
      },
      utiliser: 'Tu ne touches pas au matériel de quelqu’un d’autre — encore moins celui-là.',
    },

    /* ══ L'ARCHIVE — « il garde tout », dit littéralement (Psych) ═════ */
    archive: {
      nom: 'Les rayonnages de bandes',
      regarder: {
        tous: ['Des étagères entières de bandes et de disques durs, étiquetés à la main, par date — pas par nom d’artiste. Waters classe par jour, jamais par personne.',
               'Des centaines d’heures de prises ratées, de silences entre deux chansons, de voix qui ne savaient pas qu’on les gardait. Il garde tout. Psych ne mentait pas.'],
        hercules: '« Une vie entière rangée par date plutôt que par nom. Ça devrait me sembler pratique. Ça me semble surtout très seul. »',
        trash: '« Il y a plus de gens vivants là-dedans, en un sens, que dans le reste de cette pièce. Ce ne sont que des voix, mais ce sont des voix qu’il a choisi de ne jamais laisser partir. »',
        rabbit: ['« Aucun de ces disques n’est indexé nulle part en ligne. »', '« Il n’a jamais rien mis là où on pourrait le chercher. »'],
      },
      utiliser: 'Il y a des centaines d’heures là-dedans, et vous n’en cherchez qu’une. Fouiller au hasard ne trouverait rien qu’un refus de Waters ne trouve pas plus vite.',
    },

    /* ══ LE MUR DE DISQUES — son ego, exposé ══════════════════════════ */
    murs: {
      nom: 'Le mur de disques encadrés',
      regarder: {
        tous: ['Une douzaine de disques encadrés, certains dorés, la plupart de groupes que personne dans la pièce n’a jamais entendu nommer.',
               'Une photo, plus petite que les autres, glissée dans un coin du cadre le plus visible : un homme plus jeune, une guitare, une scène. Ce n’est pas un client. C’est lui.'],
        hercules: '« Un mur entier de preuves qu’il a réussi quelque chose, et une seule photo, minuscule, de la fois où il a essayé d’être celui qu’on encadre. Je connais ce mur-là. Le mien tiendrait sur un timbre. »',
        trash: '« Il a arrêté de jouer et il a commencé à enregistrer les autres. Ce mur n’est pas de la fierté. C’est un deuil qu’il a appris à accrocher au lieu de le pleurer. »',
        drakk: '« Le barde qui a rangé son instrument pour devenir le scribe de tous les autres bardes. Il en existe dans chaque taverne. Je ne les ai jamais trouvés heureux. »',
      },
      utiliser: 'Tu ne décroches rien. Ce mur est la seule chose de la pièce qu’il regarde encore avec plaisir.',
    },

    /* ══ LA CABINE — vitrée, vide, texture ═══════════════════════════ */
    cabine: {
      nom: 'La cabine d’enregistrement',
      regarder: {
        tous: ['Une petite cabine vitrée, insonorisée, un pied de micro sans micro dessus. La mousse acoustique aux murs a jauni par plaques.',
               'Personne n’a chanté là-dedans depuis un moment. La poussière sur le pied de micro le confirme mieux que Waters ne le dirait.'],
        trash: '« C’est ici qu’elle s’asseyait, entre deux prises, à lui parler de tout sauf de la chanson. Il n’a jamais retiré le tabouret. »',
        rabbit: '« Isolée du réseau, comme le reste. Une cabine qui n’enregistre que ce qui s’y dit à voix haute, jamais ce qui en sort par un câble. »',
      },
      utiliser: 'Tu entres une seconde. Le silence, là-dedans, est un silence différent de celui du reste de la pièce — plus épais, plus volontaire.',
    },

    /* ══ LA PORTE — la sortie, sans gate (comme au local, à
       l'appartement et au Shameless) ══════════════════════════════════ */
    porte: {
      nom: 'La porte d’entrée',
      sortie: 'carte',
      regarder: {
        tous: ['La porte par laquelle vous êtes entrés, sous l’enseigne au S manquant.',
               'Dehors, Puyallup n’a pas bougé — la même rue grise, le même armurier fermé depuis des années.'],
        drakk: '« Une seule entrée, une seule sortie. Ce studio ressemble déjà à son propriétaire. »',
      },
      utiliser: {
        tous: 'Vous ressortez de chez Waters. L’enseigne au S manquant grince une fois derrière vous, et se tait.',
        va: 'carte',
      },
    },
  },

  dialogues: {

    /* ══ WATERS ═════════════════════════════════════════════════════
       `motif` est libre et ouvre la tension (le Tír est déjà passé —
       même écho que `nova`/`denny` ailleurs dans l'acte IV). Les trois
       routes vers `waters-convaincu` sont détaillées dans l'en-tête du
       fichier ; une seule ferme les deux autres, et ce n'est pas celle
       qu'on croit. */
    waters: {
      qui: 'waters',
      accueil: ['Il ne s’écarte toujours pas complètement de la porte.',
                '« Alors. Vous êtes de quel côté, vous — celui qui la protège, ou celui qui l’exploite ? Parce que j’ai déjà eu les deux cette semaine. »'],
      retour: ['« Je suis toujours là. Vous voyez bien que je n’ai pas bougé. »'],
      sujets: [
        {
          id: 'motif',
          titre: '« On cherche à prouver qu’un innocent n’a rien fait. »',
          texte: ['Il vous regarde longtemps, sans rien répondre tout de suite.',
                  '« C’est la première fois de la semaine que quelqu’un me dit ça avec cette tête-là. »',
                  '« Y a trois jours, trois elfes sont passés. Polis. Ils ont posé les mêmes questions que vous, dans le même ordre, et j’ai rien aimé du tout. »',
                  '« J’ai rien dit. Mais j’ai commencé à mieux fermer ma porte. »'],
        },
        {
          id: 'troisieme-prise',
          titre: '« La troisième prise. C’est toujours la bonne, avec elle. »',
          quand: ({ sait, a }) => sait('enregistrement-waters') && !a('waters-convaincu') && !a('waters-vexe') && !a('enregistrement-recupere'),
          flags: ['waters-convaincu'],
          texte: ['Il se fige, une demi-seconde de trop pour que ce soit anodin.',
                  '« … Qui vous a dit ça. »',
                  '« Personne dit jamais ça. Les gens demandent le nom, l’adresse, ce qu’elle a dit. Personne demande jamais COMMENT elle chantait. »',
                  'Il retire enfin les écouteurs de son cou, comme s’ils venaient de devenir inutiles.',
                  '« Vous êtes les premiers en trois jours à me parler d’elle plutôt que de ce que je peux vous donner. »',
                  '« D’accord. Venez. »'],
        },
        {
          id: 'metier',
          titre: '« Vous ne les gardez pas pour l’argent. Vous les gardez parce que personne d’autre ne le fera. » (Trash)',
          acteur: 'trash',
          quand: ({ a }) => !a('waters-convaincu') && !a('waters-vexe') && !a('enregistrement-recupere'),
          flags: ['waters-convaincu'],
          texte: ['Trash ne dit rien d’autre. Il ne pose pas de question — il constate, et il attend.',
                  'Waters met un long moment avant de répondre.',
                  '« … J’ai arrêté de jouer à vingt-huit ans. J’étais pas mauvais. J’étais pas assez bon non plus, et la différence, ça vous ronge lentement. »',
                  '« Alors j’enregistre ceux qui essaient encore. C’est pas de la charité. C’est la seule chose qui me reste qui ressemble à en faire partie. »',
                  '« Elle, elle avait ce que j’ai jamais eu. Je vais pas laisser des elfes polis décider ce qu’il en reste. »',
                  '« Venez. »'],
        },
        {
          id: 'apres',
          titre: '« Pourquoi vous, et pas les autres ? »',
          quand: ({ a }) => a('waters-convaincu') || a('enregistrement-recupere'),
          texte: ['« Y en a eu deux, avant vous — pas les elfes, avant eux. Ils m’ont proposé de l’argent direct, sans un mot pour elle. J’ai rien donné. »',
                  '« Vous, vous avez fini par demander la bonne chose. C’est déjà plus que ce que la plupart des gens pensent à faire. »',
                  'Il hausse les épaules, presque gêné de l’avoir dit à voix haute.'],
        },
        {
          id: 'assez',
          titre: '(Ne rien ajouter.)',
          fin: true,
          texte: ['Il retourne à sa console, ou à ce qu’il en reste.'],
        },
      ],
    },
  },
}
