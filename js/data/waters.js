/* ============================================================
   TABLEAU 11 — WATERS SOUND. Un studio de simsens SEMI-PRO, à Puyallup,
   entre une teinturerie et un armurier fermé depuis des années — et à
   quelques blocs de l'appartement de Teresa.

   Le scénario est net sur ce qui s'y tourne et sur ce qu'est Reginald
   Waters : « un petit studio de simsens semi-pro à Puyallup où la scène
   a été tournée », dont le patron est l'un des participants, « fièrement
   crédité sous le nom de Male Stud Number 3 ». Ce n'était pas un studio
   de musique et il n'est pas un musicien.

   LE JEU EST EXPLICITE ET NE MONTRE RIEN. On lit son pseudonyme sur son
   mur, il en parle sans gêne, le plateau est décrit comme un décor de
   chambre vide qu'on a passé à la serpillière. Aucune image, jamais.

   ET IL N'EST PAS EN DEUIL. Il a compris qu'une morte vaut plus cher
   qu'une vivante et il compte s'en servir ; ce qui le retient est qu'il
   commence à avoir peur d'être dans la pièce quand on comptera les
   noms. C'est ça qu'on retourne, jamais sa dignité.

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
   en parlant d'elle) et un sujet entier, `waters` (chez Psych), qui
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
   (Nita). Psych dit « il aime personne, en fait » : il a raison sur le
   fond et tort sur la raison, et le tableau le démontre en pire.

   Waters garde l'enregistrement parce qu'il vaut plus cher depuis
   qu'elle est morte, et il le sait. Ce qui le fait céder n'est donc
   jamais un hommage — c'est le calcul qui bascule. Trois routes, et une
   seule ferme les deux autres :

     `trace`   (si `sait('enregistrement-waters')`) — les elfes du Tír
               sont déjà passés et reviendront ; tant qu'il l'a, ils ont
               une raison de revenir chez lui. Se défaire de la chose,
               c'est du ménage, et il le dit comme ça.
     `dessus` (Trash) — lui rappeler qu'il FIGURE dessus, sous son
               pseudonyme encadré au mur. Il ne l'avait pas pensé dans
               cet ordre-là ; maintenant si.
     `creditube` — la faute, et elle a changé de nature. Il ne s'en
               vexe pas : il empoche, et il ouvre les enchères. On lui a
               appris qu'on payait, et il ne redescendra plus. Le drapeau
               garde son nom (`waters-vexe`) parce que des sauvegardes le
               portent, mais ce n'est plus une vexation — c'est un prix
               plancher. Il reste la voie technique, plus chère.

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
  /* ACTE IV — l'enquête, et c'est lui qui compte en tours (D8). */
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
    'Un local sans vitrine, coincé entre une teinturerie et un armurier fermé depuis des années. L’enseigne dit WATERS SOUND — le S final a lâché il y a longtemps, et personne n’a jamais payé pour le remplacer. Ce qu’on tourne là-dedans n’a pas besoin d’enseigne.',
    ['waters', '« Psych a appelé. Il a dit que des gens viendraient poser des questions sur une fille. Il a pas dit lesquelles, ni combien. »'],
    'Reginald Waters ne s’écarte pas encore de la porte — casquette usée, cardigan élimé, l’air d’avoir dormi ici. Il regarde vos mains avant vos visages, et il a déjà commencé à compter.',
    'OBJECTIF — repartir avec ce qu’il garde. Il ne le donnera pas par bonté : il faut qu’il ait plus peur de l’avoir que de le perdre.',
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
      'Un banc de montage racheté d’occasion, un mur de jaquettes encadrées, et au fond, derrière une vitre, une chambre montée pour qu’on la prenne en photo — pas pour qu’on y dorme.',
      '« Il vit là-dedans plus qu’il n’y travaille. »',
      '« La poussière est partout, sauf sur ce qui compte pour lui. On apprend beaucoup d’un homme en regardant ce qu’il essuie. »',
    ],
    astrale: [
      'Une pièce saturée de petites vanités empilées, année après année. Chaque jaquette encadrée est accrochée face à la porte, à hauteur d’œil.',
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
            : ['Un homme d’une soixantaine d’années, casquette vissée, cardigan élimé, l’air d’avoir dormi ici. Il s’écarte de la porte de quinze centimètres et pas d’un de plus.',
               'Il vous jauge en descendant, des chaussures aux mains, et il calcule. Ça ne prend pas longtemps et ça ne se cache pas.'],
        /* IL N'A PAS DE DIGNITÉ À BLESSER, ET C'EST LE SUJET. Ce qui le
           tient n'est ni le deuil ni le métier : c'est qu'il a compris
           tout seul qu'une fille morte vaut plus cher qu'une fille
           vivante, et qu'il a peur d'être le prochain nom sur la liste
           de quelqu'un. Les quatre le lisent, chacun par son bout. */
        hercules: a('waters-vexe')
          ? '« Je lui ai montré l’argent trop tôt. Maintenant il sait qu’on en a, et il va compter à voix haute. »'
          : ['« Il a déjà mis un prix dessus. Il l’avait avant qu’on frappe. »',
             '« Ce qui m’intéresse, c’est qu’il ait quand même l’air de mal dormir. »'],
        trash: ['« Il n’est pas en deuil. Je cherche, il n’y en a pas. »',
                '« Ce qu’il y a à la place, c’est de l’excitation et de la peur, et les deux tirent sur la même corde. »'],
        rabbit: ['« Zéro trace en ligne à son nom depuis quinze ans, et trois productions où il s’est distribué lui-même. »',
                 '« Il est dessus. S’il vend, il se vend avec. Je ne sais pas encore s’il l’a compris. »'],
        drakk: ['« Il garde le trésor et il fait partie du trésor. »',
                '« Je ne sais pas quel nom donner à ça. Chez nous il n’y en avait pas. »'],
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
          /* L'ARGENT NE LE VEXE PAS : IL LUI DONNE LE PRIX PLANCHER.
             C'est l'inverse exact de Mark et d'Iris, et c'est pour ça
             que la faute est ici la même en apparence et opposée en
             nature. On ne l'a pas insulté — on lui a appris qu'on payait,
             et il ne redescendra plus. `waters-vexe` garde son nom : des
             sauvegardes le portent, et c'est toujours la route fermée. */
          return {
            tous: ['Tu poses le créditube sur le banc de montage.',
                   'Il ne le repousse pas. Il le prend, le retourne, lit le solde, et le garde à la main pendant tout le reste de la conversation.',
                   ['waters', '« Deux mille. »'],
                   ['waters', '« C’est un bon début. C’est même un très bon début, pour quelqu’un qui vient d’arriver. »'],
                   'Il sourit pour la première fois. C’était une enchère, et vous venez de l’ouvrir tout seuls.'],
            hercules: ['« … J’ai ouvert. »',
                       '« Règle numéro un, et je viens de la casser devant vous : on ne montre jamais le premier chiffre. »'],
            trash: '« Il ne voulait pas d’argent tout à l’heure. Maintenant il en veut, et c’est nous qui le lui avons appris. »',
            rabbit: '« Il n’a même pas fait semblant d’hésiter. »',
            drakk: '« Nous venons d’acheter le droit de payer plus cher. »',
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
                   ['waters', '« Tout est dessus, rien n’est monté. Vous en faites ce que vous voulez — moi je l’ai plus. »']],
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
    /* ══ LE BANC DE MONTAGE ═══════════════════════════════════════════
       Le scénario : « un petit studio de simsens semi-pro à Puyallup où
       la scène a été tournée ». Semi-pro veut dire ce qu'il veut dire —
       du matériel de seconde main dans un local entre une teinturerie
       et un armurier fermé. On dit ce que c'est ; on ne montre rien. */
    montage: {
      nom: 'Le banc de montage',
      regarder: {
        tous: ['Un fauteuil éventré devant un banc de montage simsens de seconde main, deux couronnes de trodes posées dessus, dont une réparée au ruban.',
               'Un cendrier plein, jamais vidé. Les commandes sont usées à l’endroit exact où une main revient sans cesse.'],
        hercules: ['« Du matériel semi-pro racheté d’occasion, dans un local qu’il ne chauffe pas. Ce type ne gagne pas d’argent. »',
                   '« Ce qui rend beaucoup plus intéressant ce qu’il attend de nous. »'],
        trash: ['« Il y a des restes sur ces trodes. Pas des souvenirs — des sensations, mises là par des gens qui n’étaient pas contents d’y être. »',
                '« Je ne toucherai pas ça. »'],
        rabbit: ['« Banc de montage sensoriel, entrée directe. Ce qu’on enregistre là-dedans, ce n’est pas de l’image : c’est ce que la personne a senti. »',
                 '« Et ça se copie exactement comme le reste. »'],
        drakk: '« Un siège, deux couronnes, et de quoi mettre dans la tête d’un inconnu ce qu’un autre a vécu. Je préfère les livres. »',
      },
      utiliser: 'Tu ne touches pas au matériel de quelqu’un d’autre — encore moins celui-là.',
    },

    /* ══ LE CATALOGUE — « il garde tout », dit littéralement (Psych) ══ */
    archive: {
      nom: 'Le catalogue',
      regarder: {
        tous: ['Des rayonnages de puces en boîtiers plastique, étiquetés à la main, par date — pas par titre. Waters classe par jour de tournage.',
               'Les jaquettes sont sous film. Les titres se passent de commentaire, et personne dans la pièce n’a envie d’en lire un deuxième.'],
        hercules: '« Quinze ans de production rangés par date. Il sait exactement ce qu’il a et où c’est. Ça, ce n’est pas un collectionneur : c’est un stock. »',
        trash: ['« Il y a des gens là-dedans qui ne savaient pas ce qu’ils vendaient. »',
                '« On s’en va d’ici dès qu’on a ce qu’on est venus chercher. »'],
        rabbit: ['« Rien n’est indexé en ligne. Aucun de ces titres n’existe sur la Matrice sous ce nom-là. »',
                 '« Il ne vend pas au public. Il vend à des gens qui savent où frapper. »'],
      },
      utiliser: 'Il y a quinze ans de tournages là-dedans, et vous n’en cherchez qu’un. Fouiller au hasard ne trouverait rien qu’un refus de Waters ne trouve pas plus vite.',
    },

    /* ══ LE MUR — son ego, et l'aveu qu'il ne voit pas comme un aveu ══
       C'est ici que le jeu est FRANC : le scénario dit qu'il figure sur
       l'enregistrement de Teresa, « fièrement crédité sous le nom de
       Male Stud Number 3 ». On le lit sur son mur, avant même de lui
       parler — et rien n'est montré. */
    murs: {
      nom: 'Le mur encadré',
      regarder: {
        tous: ['Une douzaine de jaquettes encadrées, derrière verre, alignées avec soin. Des productions maison, tirées à peu d’exemplaires.',
               'Sur trois d’entre elles, la même ligne au bas de la distribution, en petits caractères : MALE STUD NUMBER 3. C’est le seul nom du mur qui revienne, et c’est le sien.'],
        hercules: ['« Il s’est encadré lui-même, sous un pseudonyme, et il l’a accroché à hauteur d’œil pour les visiteurs. »',
                   '« Cet homme n’a honte de rien. C’est une information, et elle va nous servir. »'],
        trash: '« Il regarde ce mur tous les jours. Ce n’est pas une pièce où l’on cache quelque chose : c’est une pièce où l’on expose. »',
        rabbit: ['« Trois productions sur douze où il s’est distribué lui-même. »',
                 '« Il est DESSUS. Sur celle qu’on vient chercher aussi, probablement. »'],
        drakk: '« Il a écrit son nom de guerre sous ses propres exploits, et il l’a mis sous verre. J’ai connu des seigneurs de guerre plus discrets. »',
      },
      utiliser: 'Tu ne décroches rien. Ce mur est la seule chose de la pièce qu’il regarde encore avec plaisir.',
    },

    /* ══ LE PLATEAU — vide, froid, et c'est tout ce qu'on en voit ═════
       Rien n'est montré, jamais : la pièce dit ce qui s'y fait par ses
       meubles et par le ménage, pas par une image. */
    plateau: {
      nom: 'Le plateau',
      regarder: {
        tous: ['Au fond, derrière une vitre, une pièce meublée pour ressembler à une chambre : un lit, deux lampes sur pied, un fauteuil qui ne va avec rien.',
               'Tout est propre. Les draps sont tirés, le sol a été passé, et rien là-dedans n’a l’air d’avoir servi à quelqu’un qui y habitait.'],
        hercules: '« Une chambre montée par quelqu’un qui n’a jamais dormi dedans. Tout est à quarante centimètres de là où ça devrait être. »',
        trash: ['« Il y a beaucoup de monde passé par cette pièce, et presque personne n’en est reparti content. »',
                '« Je préfère regarder ailleurs, si ça ne vous fait rien. »'],
        rabbit: '« Hors réseau, comme le reste. Ce qui se tourne là-dedans ne sort d’ici que dans la main de quelqu’un. »',
        drakk: '« Un décor de chambre, sans personne pour l’habiter. C’est plus triste qu’un champ de bataille, et je pèse ce que je dis. »',
      },
      utiliser: 'Tu n’as aucune raison d’entrer là-dedans, et trois de ne pas le faire.',
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
        /* CE QUI L'OUVRE N'EST PLUS UN HOMMAGE, C'EST LA PEUR. Il tient
           l'enregistrement parce qu'il compte le monnayer maintenant
           qu'elle est morte — et il dort mal parce qu'il commence à
           comprendre ce que ça fait de lui. Deux routes, et aucune n'est
           de la gentillesse : lui mettre le Tír sous les yeux, ou lui
           rappeler qu'il est DESSUS. */
        {
          id: 'trace',
          titre: '« Les elfes reviendront, et ils savent où c’est. »',
          quand: ({ sait, a }) => sait('enregistrement-waters') && !a('waters-convaincu') && !a('waters-vexe') && !a('enregistrement-recupere'),
          flags: ['waters-convaincu'],
          texte: ['Il arrête de sourire.',
                  '« Ils sont déjà venus. Trois. Polis. »',
                  '« Ils ont pas demandé à acheter. Ça, c’est ce qui m’a pas plu. Les gens qui achètent, tu sais ce qu’ils veulent. »',
                  'Il regarde la porte du fond, puis vous, puis la porte du fond.',
                  '« … Si je vous le donne, je l’ai plus. Si je l’ai plus, y a plus de raison de revenir ici. »',
                  '« C’est pas un cadeau que je vous fais. C’est du ménage. Venez. »'],
        },
        {
          id: 'dessus',
          titre: '« Vous êtes dessus. Male Stud Number 3. »',
          acteur: 'trash',
          quand: ({ a }) => !a('waters-convaincu') && !a('waters-vexe') && !a('enregistrement-recupere'),
          flags: ['waters-convaincu'],
          texte: ['Trash ne dit rien d’autre. Il ne pose pas de question — il constate, et il attend.',
                  'Waters met un long moment avant de répondre.',
                  '« C’est encadré sur le mur, hein. C’est pas un secret. »',
                  '« … Sauf que là, la fille est morte, et que la moitié de Seattle va vouloir savoir qui était dans la pièce. »',
                  'Il pose enfin le créditube, ou la casquette, ou ce qu’il tenait.',
                  '« J’avais pas pensé à ça dans cet ordre-là. Venez. »'],
        },
        {
          id: 'apres',
          titre: '« Pourquoi nous, et pas les elfes ? »',
          quand: ({ a }) => a('waters-convaincu') || a('enregistrement-recupere'),
          texte: ['« Parce que vous, vous repartez avec. Eux, ils repartaient avec ET ils revenaient. »',
                  '« Y a un môme en taule pour ça, il paraît. Un ork. »',
                  'Il hausse les épaules.',
                  '« Ça me fait rien. Mais si ça peut le sortir, ça me fait rien non plus. »'],
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
