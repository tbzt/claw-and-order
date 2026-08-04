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

/* Les huit sources. Le moteur ne compte que les drapeaux `conf-*`. */
const CONFIANCE = ['conf-job', 'conf-question', 'conf-silence',
                   'conf-teresa', 'conf-guilde', 'conf-bras',
                   'conf-mccarthy', 'conf-deduction']

const compte = (a) => CONFIANCE.filter((f) => a(f)).length - (a('conf-perdue') ? 2 : 0)

import { equipiers } from './equipiers.js'

export const planque = {
  markup: 'scenes/planque.html',

  ouverture: ({ a }) => [
    'Une laverie automatique de Tacoma, ouverte vingt-quatre heures. Six heures cinq.',
    'Néons, faïence, six machines et deux séchoirs. C’est le premier endroit de la nuit où l’on voit clairement les visages.',
    'C’est aussi une pièce éclairée avec une baie vitrée sur la rue. Personne ne le dit à voix haute.',
    a('lester-blesse')
      ? 'Lester s’est assis le plus loin possible de la vitre. Il tient son bras et il ne s’appuie pas au dossier.'
      : 'Lester s’est assis le plus loin possible de la vitre. Il ne s’appuie pas au dossier.',
    'OBJECTIF — tenir jusqu’à l’audience. Il reste trois heures cinquante-cinq.',
  ],

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
        trash: ['« Son aura est plus grande qu’au bateau. Il prend de la place, maintenant. »',
                '« Et elle est tournée vers nous. Pas ouverte : tournée. Il attend de voir. »',
                '« Ce qu’il décidera ce matin, il le décidera dans les deux heures qui viennent. Pas au tribunal. »'],
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
      regarder: {
        tous: ['Une porte vitrée qui donne sur le trottoir. Le tribunal est à trente minutes, à Downtown, angle de la 5e.',
               'Il est six heures. On peut partir quand on veut, et c’est le problème : il faut savoir quand.'],
        drakk: '« Unique issue. Je l’ai en visuel depuis que nous sommes entrés et je ne l’ai pas lâchée. »',
        hercules: '« Trop tôt, on attend dehors sous la pluie. Trop tard, on court. Il n’y a pas de bonne heure, il y a une moins mauvaise. »',
      },
      utiliser: ({ a }) => {
        const c = compte(a)
        const commun = ['Neuf heures moins le quart. Hercules regarde l’horloge murale et hoche la tête une fois.',
                        'Lester se lève sans qu’on ait à le lui dire.']
        /* Il vient TOUJOURS. Ce qui change, c'est ce qu'il emporte. */
        return c >= 3
          ? { tous: [...commun,
                     '« Bon. »',
                     '« Je vais leur dire. Pas ce qu’ils veulent entendre — ce qui s’est passé. »',
                     '« Si vous êtes encore là quand je sortirai, je vous paierai un truc. J’aurai rien pour payer, mais je vous le paierai. »',
                     'Il pousse la porte le premier.'],
              hercules: '« Voilà quelqu’un qui vient de décider quelque chose tout seul. C’est plus rare que ça n’en a l’air. »',
              flags: ['lester-temoigne'], fiches: ['lester-temoigne'], fin: true }
          : { tous: [...commun,
                     'Il ne dit rien. Il attend qu’on ouvre la porte et il sort derrière Drakk.',
                     'Il ira au tribunal. Il sera vivant à dix heures. C’était le contrat, et le contrat sera rempli.',
                     'Ce qu’il dira à la barre, personne ici ne le sait — et lui non plus.'],
              trash: '« On l’a sorti de sa cellule et on ne lui a pas parlé. On l’a juste transporté. »',
              fin: true }
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
      utiliser: {
        tous: 'Ce n’est pas ton linge, et tu n’as pas de linge.',
        drakk: '« On n’ouvre pas le coffre d’un autre. C’est écrit dans toutes les tables. »',
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
    },

    rue: {
      nom: 'La rue, derrière la vitre',
      regarder: {
        tous: ['Il pleut encore. Un bus passe, presque vide. Le jour ne se lèvera pas avant sept heures et demie.',
               'De l’extérieur, cette pièce est un aquarium éclairé au néon.'],
        drakk: ['« Nous sommes dans une vitrine. Je le dis depuis vingt minutes et personne ne bouge. »',
                '« Éclairés, à hauteur d’œil, derrière une vitre, dans une rue droite. »',
                '« Le seul couvert est le mur de machines, et il est du mauvais côté. »',
                '« Je ne dis pas qu’on nous cherche ici. Je dis que si on nous cherche, on nous trouve. »'],
        rabbit: '« Trois caméras dans la rue, dont deux municipales. La troisième est celle d’ici, et elle regarde dehors. »',
        hercules: '« Personne ne cherche cinq personnes dans une laverie. On cherche cinq personnes qui se cachent. »',
      },
      utiliser: 'On ne sort pas. Pas encore.',
    },

    enseigne: {
      nom: 'L’enseigne, à l’envers',
      regarder: {
        tous: 'Vue de l’intérieur, l’enseigne rouge se lit à l’envers et bat un peu. LAV’O’MATIC.',
        trash: '« Elle bat au même rythme que le néon du fond. Ils sont sur le même circuit. Tout ici est sur le même circuit. »',
        drakk: '« Une bannière rouge. De mauvais augure, mais je commence à croire que je dis ça de tout. »',
      },
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
    },

    table: {
      nom: 'La table pliante',
      regarder: {
        tous: 'Une table à plier le linge, en formica, avec quarante ans de brûlures de cigarette.',
        hercules: '« C’est là qu’on discutera, si on discute. Une table basse, c’est plus facile qu’un comptoir. »',
      },
      utiliser: 'Tu t’y appuies. Elle tient.',
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
      utiliser: 'On ne va pas monter sur une machine pour dévisser un néon.',
    },

    /* ── Astral ─────────────────────────────────────────────────────── */
    passage: {
      nom: 'Le seuil',
      regarder: {
        tous: 'Devant la porte, une usure violette et diffuse.',
        trash: ['« Des milliers de passages, tous pareils, tous pressés. »',
                '« Personne n’a jamais rien vécu ici. C’est peut-être exactement ce qu’il nous faut. »'],
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
                 flags: ['camera-aveugle'] }
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
          quand: ({ a, qui }) => qui === 'trash' && a('lester-blesse') && !a('conf-bras'),
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
          quand: ({ a, qui }) => qui === 'drakk' && a('guilde') && !a('conf-guilde'),
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
