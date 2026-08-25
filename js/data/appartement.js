/* ============================================================
   TABLEAU 9 — L'APPARTEMENT DE TERESA BANKS. Un studio au-dessus d'un
   pressing, à Loveland, sous scellés RA depuis trois jours.

   CHANTIER 26 — `PLAN_TRAME_ACTES_III_IV.md` § 7.1-7.2, RANG 6 DU § 10.
   La première des trois ancres du scénario source : « c'est le VRAI lieu
   du crime ; la Lone Star a relevé l'ADN et ne l'a jamais versé au
   dossier ». Second tableau de l'acte IV, après le local de répétition
   (chantier 28).

   ══ LE MORCEAU DE BRAVOURE DE WHITE_RABBIT (§ 7.2) ═══════════════════
   > « C'est le seul maillon MATRICIEL de la chaîne de preuves, et le
   > seul qu'aucune des trois ancres géographiques ne porte à elle
   > seule… Le jeu a un decker, une lentille RA, et un mécanisme de nœud
   > déjà écrit cinq fois. C'est son morceau de bravoure, et il faut le
   > lui garder ENTIER. »

   Entier veut dire : pas un clic. Trois gestes, sur deux cibles, dont
   un qui n'a rien de matriciel —

     1. `maglock.regarder` — le boîtier journalise, mais il ne GARDE
        rien : l'archive est chez un prestataire tiers (`maglock-lu`).
        C'est le fait que le scénario source donne, et c'est ce qui
        empêche le maillon d'être gratuit.
     2. `courrier.regarder` — la référence de contrat du prestataire est
        sur une facture, dans une pile de courrier que personne n'a
        relevée (`bail-numero`). N'importe quel runner peut la lire :
        le fil n'est pas réservé à White_Rabbit, seule sa FIN l'est.
     3. `maglock.utiliser` — l'intrusion, White_Rabbit seul, et
        seulement une fois les deux premiers faits.

   Chaque étape manquante se refuse EN VOIX et dit ce qui manque
   (règle 11) : c'est ce qui fait la différence entre un verrou et une
   énigme.

   ══ CE QUE ÇA COÛTE, ET POURQUOI PAS `trace-matricielle` ════════════
   « Chaque intrusion s'accumule » (§ 6 du plan). Mais `trace-matricielle`
   est DÉJÀ pris : il porte l'ordre de transfert réécrit au greffe, il
   fait apparaître la vedette de la Star au détroit, et le bilan lui
   donne une ligne qui nomme le greffe (« Un ordre de transfert porte une
   heure que personne n'a signée »). Le reposer ici ferait mentir le
   bilan sur une intrusion qui n'a pas eu lieu. Drapeau neuf, donc :
   `trace-archive`, sa propre ligne, et la deuxième marque au compteur
   d'un decker qui en laisse une à chaque fois.

   ══ L'ADRESSE VIENT DU DOSSIER, ET ELLE N'EST PAS UN VERROU ═════════
   Elle venait de Herwick à la livraison de ce chantier, et l'utilisateur
   l'a refusé le jour même : une équipe qui tient le dossier de police
   d'une victime de meurtre n'a pas besoin d'un antiquaire pour savoir
   où elle habitait. Corrigé — `adresse-teresa` sort de la lecture du
   dossier (`lectureDossier`, `planque.js`), donc des cinq lieux où
   l'équipe attend l'audience, donc de n'importe quelle partie.

   Ça reste sans verrou : lire le dossier est facultatif, et ne pas
   l'avoir lu coûte trois quarts d'heure à chercher l'immeuble, pas
   l'accès. Le garde-fou D12 est respecté par construction — aucune
   planque ne décide plus de rien ici — et la règle 12 aussi : le
   dossier ouvre une porte de RÉCIT, jamais un obstacle.

   Ce que Herwick garde, `appart-teresa`, est maintenant le bail : qui
   paie, et pourquoi la patronne du pressing ne pose pas de question.
   Ça se paie en texte, à deux endroits — l'ouverture, et la sortie.

   ══ LE FRONT DU TÍR AVANCE, ET SANS COMPTEUR (§ 7.4) ════════════════
   Le plan veut que les runners du Tír progressent « quand on passe dans
   un lieu qu'ils surveillent — l'appartement, LES AMIS », avec trois
   présages : ils retracent le parcours → ils interrogent les amis →
   l'enregistrement disparaît. D9 demande un compteur d'exposition pour
   ça, et il n'existe pas.

   Il n'en a pas besoin ici : avec deux lieux surveillés, PASSER PAR LES
   DEUX est déjà le compteur. `tir-prevenu` tombe au local (chantier 28)
   ou ici, au premier geste qui laisse une trace ; et s'il tombait DÉJÀ
   au local, alors en repartant d'ici on apprend qu'ils sont retournés
   voir les quatre amis — `tir-retour`, le second présage du § 7.4, posé
   par le seul fait d'avoir fait les deux visites. Le compteur restera à
   écrire pour le troisième lieu ; celui-là se paie tout seul.

   ══ CE QUE CE TABLEAU NE FAIT PAS ═══════════════════════════════════
   Il ne construit toujours pas la carte de l'acte IV. Il y a maintenant
   DEUX lieux d'enquête, donc la réécriture du chantier 17 devient due —
   mais elle demande de refaire `noeud()` (`carte.js`), qui parle en
   MINUTES et en heures d'horloge, illisibles depuis que D8 compte en
   tours. C'est un chantier, pas une note de bas de page. En attendant,
   la sortie retombe sur `fin: true`, avec la même honnêteté déclarée
   que `retour.js` puis `amis.js` avant elle. */

import { equipiers } from './equipiers.js'

export const appartement = {
  markup: 'scenes/appartement.html',

  /* D8 — un tour de plus. Deuxième lieu de l'acte IV, donc « jour 1 —
     après-midi » quand on arrive du local le même jour. */
  acte: 4,

  ouverture: ({ a, sait }) => [
    ...(sait('adresse-teresa')
      ? ['2214 South Sheridan. C’était écrit en page deux du dossier depuis le début : un pressing au rez-de-chaussée, deux étages au-dessus, la porte du fond.']
      : ['Il a fallu trois quarts d’heure pour trouver l’immeuble — personne n’avait lu le dossier jusqu’à la page où son adresse est écrite. Un pressing au rez-de-chaussée, deux étages au-dessus, et aucun nom sur les boîtes aux lettres.']),
    ...(a('appart-teresa')
      ? ['La patronne du pressing vous regarde monter et ne dit rien. Herwick avait prévenu : c’est elle qui encaisse le loyer, et c’est pour ça qu’on la paie.']
      : []),
    'La porte du studio n’est pas fermée à clé. Elle porte, en travers, deux rubans jaunes qui n’existent qu’en réalité augmentée : SCÈNE PLACÉE SOUS SCELLÉS — LONE STAR. Physiquement, il n’y a rien. On passe la main au travers.',
    'Dedans, une pièce et demie, et l’odeur du détachant qui monte du pressing. Rien n’a bougé depuis trois jours. Rien du tout.',
    ...(a('su:hayden')
      ? ['Vous savez maintenant qui elle voyait. Vous êtes dans la pièce où il venait.']
      : []),
    'OBJECTIF — trouver ce que la Lone Star a trouvé, et qu’elle n’a pas versé au dossier.',
  ],

  /* Comme au local (chantier 28) : tout ce qui change ici se décide
     PENDANT la visite, donc rien dans `entree()` — `derive()` est
     recalculé à chaque `rafraichit()`, et c'est ce qui permet au décor
     de bouger sous les yeux du joueur. */
  derive: ({ a, sait }) => {
    const rendus = ['rubans-intacts', 'draps-emportes', 'affaires-homme',
                    'maglock-journal', 'valise-faite'].filter(sait).length
    return [
      rendus === 0 ? 'appart-froid' : rendus < 3 ? 'appart-lu' : 'appart-compris',
      ...(a('su:lester-innocent') ? ['innocent'] : []),
      ...(a('maglock-lu') ? ['maglock-lu'] : []),
      ...(a('bail-numero') ? ['bail-numero'] : []),
      /* `trace-archive` n'est PAS ici, et c'est délibéré : il est marqué
         `visuel:` sur la ligne de l'intrusion elle-même, parce que le
         boîtier doit s'allumer AU MOMENT où White_Rabbit dit ce qu'elle
         trouve, pas au rafraîchissement suivant. Le mettre aux deux
         endroits le faisait apparaître deux fois dans `data-etat` —
         inoffensif pour le CSS, mais c'est deux sources pour un même
         état, et c'est comme ça qu'on finit par en contredire une. */
      ...(a('tir-prevenu') ? ['tir-prevenu'] : []),
    ]
  },

  vues: {
    physique: [
      'Une pièce que personne n’a rangée et que personne n’a fouillée. Les deux à la fois, c’est rare — ça veut dire qu’on est venu chercher une chose précise et qu’on est reparti avec.',
      '« Trois jours. Un studio à Loveland vide pendant trois jours, avec la porte ouverte, et rien n’a disparu. Ça, c’est un quartier qui a peur de quelque chose. »',
    ],
    astrale: [
      'Il reste de la peur, en couche mince, à hauteur d’homme, et elle est vieille de trois jours. Rien d’autre. Personne n’est repassé assez longtemps pour laisser quoi que ce soit.',
      '« Elle est morte ici. Je ne peux pas le prouver, et je n’ai aucun doute. »',
    ],
    ra: [
      'Deux rubans de scellés, un lecteur mural sur le palier, et une pile de courrier qui clignote doucement parce que personne ne l’a accusée réception.',
      '« Cette pièce est morte côté réseau, et la cage d’escalier ne l’est pas du tout. C’est dehors qu’il faut regarder. »',
    ],
    tactique: [
      'Une pièce, une porte, une fenêtre sur rue. Pas de seconde issue. Celui qui est entré ici savait qu’il n’aurait pas à repartir en courant.',
      '« On ne choisit pas cet endroit pour tuer quelqu’un. On y tue quelqu’un parce qu’on y était déjà. »',
    ],
  },

  hotspots: {

    ...equipiers('appartement'),

    /* ══ LA PORTE ET SES SCELLÉS — une chose du monde, une seule cible.
       Regarder rend la fiche ; utiliser fait sortir. ═════════════════ */
    porte: {
      nom: 'La porte, sous scellés',
      sortie: true,
      regarder: ({ a }) => a('rubans-intacts')
        ? { tous: 'Les deux rubans jaunes, toujours en travers, toujours horodatés du premier jour.',
            rabbit: '« Et toujours pas rompus. Personne. »' }
        : { tous: ['Les deux rubans de RA portent leur horodatage de pose, en petit, dans le coin : le matin du premier jour.',
                   'Un scellé de la Star journalise chaque rupture. Celui-ci n’en a aucune — ce qui veut dire que depuis qu’ils l’ont posé, personne du service n’est revenu. Pas une fois en trois jours.'],
            hercules: '« Trois jours sans repasser sur une scène de crime. Ce n’est pas de la négligence, ça. La négligence, ça revient une fois pour la forme. »',
            trash: '« Ils ont fermé la porte et ils ont cessé d’y penser le même jour. Je connais ce geste : c’est celui qu’on fait sur quelqu’un dont on a décidé qu’il ne comptait pas. »',
            rabbit: '« Aucune rupture au journal du scellé. Zéro. Ils ont posé ça et ils sont partis pour de bon. »',
            drakk: '« Le sceau est intact. Nul n’est revenu lever le corps du regard. »',
            flags: ['rubans-intacts'],
            fiches: ['rubans-intacts'] },
      utiliser: ({ a }) => ({
        tous: [
          ...(a('su:lester-innocent')
            ? ['Vous ressortez avec ce que la Lone Star avait trouvé le premier jour, et qu’elle a rangé dans un tiroir.']
            : ['Vous ressortez du studio. Les deux rubans jaunes se referment tout seuls derrière vous, comme ils l’ont fait pendant trois jours.']),
          ...(a('tir-prevenu')
            ? [{ texte: 'En bas, le pressing tourne. La patronne vous regarde passer, décroche son commlink avant même que vous ayez atteint le trottoir, et compose un numéro qu’elle connaît par cœur.',
                 visuel: 'tir-dehors' },
               'Ils avaient laissé leur carte à quatre endroits du quartier. Elle en fait partie.',
               ...(a('appart-teresa')
                 ? [['drakk', '« Elle encaisse le loyer et elle ne pose pas de question. Herwick nous l’avait dit. Il ne nous avait pas dit à qui elle en pose, elle. »']]
                 : []),
               ...(a('local-quitte')
                 ? ['Trente secondes plus tard, à trois kilomètres de là, quelqu’un pousse un rideau de fer qui ne redescend plus et demande à quatre personnes en deuil si des gens sont venus leur poser des questions.']
                 : [])]
            : [{ texte: 'En bas, le pressing tourne. La patronne vous regarde passer, décroche son commlink avant même que vous ayez atteint le trottoir, et compose un numéro qu’elle connaît par cœur.',
                 visuel: 'tir-dehors' },
               'Vous ne saviez pas qu’ils avaient laissé leur carte dans ce quartier. Maintenant si.']),
        ],
        ...(a('trace-archive')
          ? { rabbit: '« Quelqu’un, un jour, verra que l’archive a été lue. Pas aujourd’hui. »' }
          : {}),
        /* LE FRONT DU TÍR, SANS COMPTEUR (voir l'en-tête). Passer ici
           suffit à se faire voir : `tir-prevenu` tombe toujours, comme
           il tombait au local au premier mot adressé à un ami. Et s'il
           était DÉJÀ tombé là-bas, alors les deux visites se recoupent
           chez eux comme elles se recoupent au carnet — ils remontent
           le parcours, et le second présage du §7.4 se pose tout seul :
           `tir-retour`. Deux lieux surveillés font un compteur à deux
           crans, et il n'a rien coûté à écrire. */
        flags: ['appart-quitte', 'tir-prevenu',
                ...(a('tir-prevenu') && a('local-quitte') ? ['tir-retour'] : [])],
        fin: true,
      }),
    },

    /* ══ LE LIT — « les draps emportés (ils ONT relevé) », § 7.1.
       La fiche la plus lourde du tableau : elle ne dit pas qu'elle est
       morte ici, elle dit qu'ILS LE SAVENT. ═══════════════════════════ */
    lit: {
      nom: 'Le lit',
      regarder: ({ a }) => a('draps-emportes')
        ? { tous: 'Un matelas nu, et de la poudre grise sur la tête de lit. On a déjà tout dit.' }
        : { tous: ['Le lit est fait — sauf qu’il n’y a rien dessus. Pas de draps, pas de housse, pas d’oreiller. Un matelas nu dans un studio où tout le reste est resté en place.',
                   'Sur le montant de la tête de lit, une poudre grise, appliquée au pinceau, en aplats réguliers. Personne ne l’a essuyée.'],
            hercules: ['« Ça, c’est un relevé. Un vrai, fait par des techniciens payés à l’heure. »',
                       '« On ne relève pas les empreintes d’un lieu où il ne s’est rien passé. Et on ne PART pas avec les draps si on ne compte pas les analyser. »',
                       '« Donc quelque part, il y a un rapport. Et il n’est pas au dossier. »'],
            trash: '« Il n’y a pas de sang. Il n’y en a jamais eu : on ne saigne pas quand on est étranglé. C’est pour ça que la pièce a l’air normale, et c’est pour ça qu’elle ne l’est pas. »',
            rabbit: '« Poudre à empreintes, scellés RA, draps emportés sous sachet. C’est une procédure complète. Il existe un numéro de scène pour cet endroit, et il n’apparaît nulle part. »',
            drakk: '« Ils ont emporté le linceul et laissé la couche. C’est qu’ils savaient ce qu’ils cherchaient dessus. »',
            flags: ['draps-emportes'],
            fiches: ['draps-emportes'] },
      utiliser: {
        tous: 'Rien sous le matelas, rien dans le sommier. Ils ont regardé avant vous, et eux avaient le temps.',
        drakk: '« Fouiller après les fouilleurs. Le pire moment d’une expédition. »',
      },
    },

    /* ══ LE PLACARD À PHARMACIE — « la vie qu'elle avait », § 7.1.
       Détourné d'un demi-pas : ce que le placard raconte, c'est qu'ils
       étaient DEUX. C'est ce qui le fait se recouper avec ce que Nita
       dit au local, et avec ce que Sarah dit au cabinet. ══════════════ */
    pharmacie: {
      nom: 'Le placard à pharmacie',
      regarder: ({ a }) => a('affaires-homme')
        ? { tous: 'Le rasoir, le flacon sans étiquette, la seconde brosse à dents. Toujours là, toujours à lui.' }
        : { tous: ['Un placard de salle de bain, vingt centimètres de large : du paracétamol, une plaquette de contraceptifs, du dentifrice.',
                   'Et un rasoir de sûreté en acier massif, une seconde brosse à dents, et un flacon sans étiquette contenant six gélules blanches.'],
            hercules: ['« Le rasoir vaut plus cher que tout le reste de la pièce. On ne l’achète pas, on se le fait offrir. »',
                       '« Il ne dormait pas ici. Il se RASAIT ici. Ce n’est pas la même chose et c’est beaucoup plus intime. »'],
            trash: ['« Le flacon n’est pas une ordonnance. Ce sont des stimulants, et pas ceux qu’on trouve en pharmacie. »',
                    '« Chez moi, on appelle ça “tenir son rang”. Ça se prend le soir, avant de sortir, quand on doit être brillant. »'],
            rabbit: '« Pas d’étiquette, pas de code-barres, pas de traçabilité. Ce n’est pas illégal, c’est mieux que ça : c’est invisible. »',
            drakk: '« Deux brosses à dents. Toute une histoire d’amour tient dans ce détail, et personne ne l’a versée au dossier. »',
            flags: ['affaires-homme'],
            fiches: ['affaires-homme'] },
      utiliser: {
        tous: 'Tu refermes le placard. Ce qui est dedans a déjà tout dit.',
        trash: '« Non. Je ne prends rien d’ici. »',
      },
    },

    /* ══ LA VALISE — ce que le procédural ne dit pas ══════════════════
       Aucun des quatre points du § 7.1 ne raconte QUI elle était en
       train de devenir. Cette fiche-là est le raccord avec ce que Sarah
       dit au cabinet (`teresa-cliente` : « elle voulait savoir comment
       on disparaît proprement ») — deux tableaux qui ne se visitent
       jamais dans la même heure et qui se répondent au carnet. */
    valise: {
      nom: 'La valise, sous le lit',
      regarder: ({ a }) => a('valise-faite')
        ? { tous: 'Toujours là, toujours à moitié faite, toujours prête à ne servir à rien.' }
        : { tous: ['Une valise cabine, sous le lit, à moitié faite. Des vêtements pliés, pas jetés. Une trousse de toilette déjà fermée.',
                   'Il manque le dessus : ce qu’on met en dernier, le matin du départ.'],
            hercules: '« Elle ne fuyait pas. On ne plie pas ses affaires quand on fuit. Elle PARTAIT — elle avait une date. »',
            trash: ['« Il n’y a rien de sentimental dedans. Pas une photo, pas un objet. »',
                    '« Elle ne partait pas en voyage. Elle partait pour de bon, et elle savait qu’il ne fallait rien emporter qui puisse la faire reconnaître. »'],
            rabbit: '« Pas de commlink dans la trousse. Elle comptait en changer. C’est la première chose qu’on fait quand on veut ne plus être suivi, et c’est la dernière qu’on ose. »',
            drakk: '« Le baluchon du départ, bouclé aux trois quarts. Il ne manque que le courage, et il en manque toujours. »',
            flags: ['valise-faite'],
            fiches: ['valise-faite'] },
      utiliser: {
        tous: 'Tu remets la valise sous le lit, à l’endroit exact où elle était. Ça ne sert à rien et ça se fait quand même.',
      },
    },

    /* ══ LE COURRIER — l'étape 2 du fil maglock, et la seule qui ne
       demande PAS White_Rabbit (§ 7.2 : le fil est à lui, pas
       l'enquête). Pas de fiche : c'est un moyen, pas un fait. ════════ */
    courrier: {
      nom: 'Le courrier',
      regarder: ({ a }) => a('bail-numero')
        ? { tous: 'La facture est ressortie de la pile, posée bien à plat sur la table. PUYALLUP LOCKWORKS — contrat 4471-B.',
            rabbit: '« Je l’ai. Je peux travailler avec ça. »' }
        : { tous: ['Une pile de courrier papier — un immeuble de Loveland, personne n’a de boîte matricielle ici — glissée sous la porte et poussée en tas contre le mur.',
                   'Des publicités, une relance du pressing du dessous, et une facture trimestrielle : PUYALLUP LOCKWORKS — MAINTENANCE ACCÈS IMMEUBLE — CONTRAT 4471-B.'],
            hercules: '« Un prestataire de serrures qui facture au trimestre. Donc il archive. Personne ne facture un service qu’il ne peut pas prouver. »',
            trash: '« Trois jours de courrier. Personne n’est venu le ramasser, pas même le propriétaire. Il sait ce qui s’est passé ici, et il attend que ça se tasse. »',
            rabbit: ['« Contrat 4471-B. C’est une clé, ça. »',
                     '« Les journaux d’accès de l’immeuble ne sont pas dans la serrure : ils sont chez eux, avec une référence de contrat en guise d’index. »'],
            drakk: '« Un parchemin de comptes, oublié au seuil. C’est toujours dans les comptes que les royaumes se trahissent. »',
            flags: ['bail-numero'] },
      utiliser: {
        tous: 'Tu remues la pile. Rien d’autre que des factures et du papier commercial — sa vie ne passait pas par là.',
      },
    },

    /* ══ LE MAGLOCK — le morceau de bravoure, en trois gestes ════════
       Cible du PALIER, pas du studio : c'est la serrure de la porte de
       l'immeuble, celle que le scénario source nomme. Elle est visible
       par la porte restée ouverte, en haut de l'escalier.

       `regarder` pose l'étape 1 pour tout le monde (le fait existe même
       si on ne peut pas s'en servir) ; `utiliser` exige White_Rabbit ET
       les deux étapes, et chaque manque se dit dans la voix du runner
       actif au lieu de ne rien faire (règle 11). */
    maglock: {
      nom: 'Le lecteur du hall',
      regarder: ({ a }) => a('maglock-lu')
        ? { tous: 'Le lecteur, en bas de l’escalier. Il journalise, et il ne garde rien.',
            rabbit: '« Tout est chez Puyallup Lockworks. Il me faut leur référence de contrat. »' }
        : { tous: ['Par la porte restée ouverte, l’escalier, et en bas la porte de l’immeuble. À côté d’elle, un lecteur mural — le genre de boîtier gris qu’on ne regarde jamais.',
                   'Il est vieux, il est mal posé, et il fonctionne : chaque ouverture depuis la rue passe par lui.'],
            hercules: '« Cet immeuble ferme. C’est une information : quelqu’un est entré chez elle, et quelqu’un lui a ouvert ou avait de quoi ouvrir. »',
            trash: '« Je ne lis rien là-dessus. C’est du métal et de l’électricité, et ça ne se souvient de rien à ma façon. »',
            rabbit: ['« Modèle à journal. Il horodate chaque ouverture depuis la rue, avec le porteur. »',
                     '« Sauf qu’il ne GARDE rien : il pousse tout chez le prestataire, une fois par jour, et il oublie. »',
                     '« Ce qui veut dire que les trois jours qui nous intéressent sont archivés quelque part, chez quelqu’un que personne n’a jamais pensé à interroger. »'],
            drakk: '« Le portier de la tour tient un registre, et il ne le garde pas par-devers lui. Il l’envoie au château. »',
            /* Pas de `visuels` en double : `derive()` allume le
               boîtier à partir du drapeau. Une seule source pour un
               même état — la faute avait été faite ici et se relisait
               à l'écran, `data-etat` portant deux fois le même mot. */
            flags: ['maglock-lu'] },
      utiliser: ({ a, qui }) => {
        if (a('maglock-journal'))
          return { tous: 'C’est lu. Deux fois n’ajouterait rien, et laisserait une seconde trace.',
                   rabbit: '« Une visite par archive. C’est déjà une de trop. »' }

        if (qui !== 'rabbit')
          return { tous: 'Il faudrait un deck, et savoir chez qui frapper.',
                   hercules: '« Ce n’est pas mon rayon. Je peux appeler quelqu’un ; elle, elle peut entrer. »',
                   trash: '« Ce monde-là n’est pas le mien. Le mien ne garde pas d’archives. »',
                   drakk: '« Je sais forcer une porte. Pas un livre de comptes qui vit dans l’air. »' }

        if (!a('maglock-lu'))
          return { tous: [],
                   rabbit: ['« Attends. »',
                            '« Je ne sais même pas encore ce que ce boîtier fait de ce qu’il enregistre. Laisse-moi le lire d’abord. »'] }

        if (!a('bail-numero'))
          return { tous: [],
                   rabbit: ['« Puyallup Lockworks archive les journaux de la moitié de Loveland. »',
                            '« Sans référence de contrat, je cherche trois jours dans huit mille immeubles. Il me faut le numéro, et il traîne forcément quelque part ici. »'] }

        return {
          tous: ['White_Rabbit s’assoit par terre, dos au mur du palier, et ne bouge plus pendant deux minutes.',
                 { texte: 'Puyallup Lockworks. Contrat 4471-B. Trois jours de journal, dans un tiroir que personne n’a jamais eu de raison d’ouvrir.',
                   visuel: 'trace-archive' },
                 '« 22:04 — elle rentre. C’est la dernière fois qu’elle passe cette porte. »',
                 '« 22:51 — une seconde ouverture. Pas son porteur à elle. »',
                 '« 23:58 — une troisième, encore un autre porteur. Et puis les deux ressortent à 00:26, à une minute d’intervalle. »',
                 'Personne ne dit rien pendant un moment.',
                 '« Deux hommes sont entrés chez elle après sa mort, et ils sont repartis ensemble. »'],
          rabbit: ['« Et ça, c’est dans une archive commerciale, en clair, depuis trois jours. »',
                   '« Personne n’est allé le chercher. Personne. »'],
          flags: ['maglock-journal', 'trace-archive'],
          fiches: ['maglock-journal'],
        }
      },
    },

    /* ══ LA CUISINE — la cible qui ne rend rien, et sans laquelle le
       tableau n'est qu'une procédure ══════════════════════════════════ */
    cuisine: {
      nom: 'Le coin cuisine',
      regarder: {
        tous: ['Deux plaques électriques, un évier, et dedans deux verres et deux assiettes, lavés et posés à l’envers pour égoutter.',
               'Ils ont séché depuis longtemps. Personne n’est venu les ranger.'],
        hercules: '« Deux couverts, lavés. Ils ont dîné ici, et ils ont fait la vaisselle ensemble. On ne fait pas la vaisselle avec quelqu’un qu’on va tuer. »',
        trash: '« … Non. Pas tout de suite. On ne le décide pas en montant l’escalier, ce genre de chose. »',
        rabbit: '« Deux verres. J’aimerais qu’il y en ait trois, parce que trois voudrait dire une fête, et deux ne veut dire qu’une seule chose. »',
        drakk: '« Le dernier repas. Dans les histoires, on le raconte toujours après. Nous, nous arrivons par le mauvais bout. »',
      },
      utiliser: {
        tous: 'Tu ne touches pas à la vaisselle de quelqu’un qui est mort. C’est idiot, et c’est comme ça.',
      },
    },

    /* ══ LA FENÊTRE — Loveland, et ce que le quartier fait de vous ═══ */
    fenetre: {
      nom: 'La fenêtre',
      regarder: ({ a }) => ({
        tous: a('tir-prevenu')
          ? ['La rue, deux étages plus bas, et l’enseigne du pressing qui grésille en plein jour.',
             'Sur le trottoir d’en face, quelqu’un est adossé à un mur depuis un moment, et ne fait rien de particulier.']
          : ['La rue, deux étages plus bas, et l’enseigne du pressing qui grésille en plein jour. Loveland en après-midi ressemble à Loveland la nuit, avec plus de détails qu’on préférerait ne pas voir.',
             'À deux rues d’ici, le taudis où on l’a retrouvée. On voit le toit.'],
        hercules: '« Deux rues. Ils ont porté un corps sur deux rues, en pleine nuit, dans un quartier où tout le monde regarde par la fenêtre. Et personne n’a rien vu. »',
        trash: '« Personne n’a rien vu parce que tout le monde a très bien vu. Ce n’est pas la même chose, et ça ne se dit pas à un flic. »',
        rabbit: '« Aucune caméra municipale dans cette rue. Trois caméras privées, toutes tournées vers leur propre porte. On ne surveille pas Loveland : on s’y protège. »',
        drakk: '« Deux rues. Le trajet le plus court entre où elle est morte et où on a voulu qu’elle meure. »',
      }),
      utiliser: {
        tous: 'Tu ouvres la fenêtre. L’odeur du détachant sort, celle de la rue entre, et rien de plus.',
      },
    },
  },

  dialogues: {},
}
