/* Catalogue global. Les objets survivent aux tableaux — ils ne peuvent
   donc pas appartenir à l'un d'eux.

   `icone` désigne une règle `.objet__<icone>` d'engine.css. Une icône par
   objet, jamais partagée : le joueur qui tend « quelque chose » au pêcheur
   doit savoir ce qu'il tend sans avoir à survoler. */
export const objets = {
  contrat:   { nom: 'Contrat de prestation', icone: 'contrat' },
  mandat:    { nom: 'Mandat de transfert',   icone: 'mandat' },
  /* LE TROISIÈME FEUILLET. Le scénario source place l'amorce de la
     contre-enquête exactement ici : c'est en ÉTUDIANT le dossier, pendant
     les heures d'attente à la planque, que l'équipe voit que les faits ne
     collent pas. Le jeu donnait le contrat et le mandat, et gardait le
     seul des trois qui raconte quelque chose.
     Voir PLAN_TRAME_ACTES_III_IV § 4. */
  dossier:   { nom: 'Le dossier de Lester',  icone: 'dossier' },
  passe:     { nom: 'Passe des amarres',     icone: 'passe' },
  creditube: { nom: 'Créditube — 2 000 ¥',   icone: 'tube' },
  arme:      { nom: 'Arme de poing',         icone: 'arme' },
  /* Chantier 46, le portique. Ce que les quatre fiches portent depuis le
     début de la nuit — pas un ramassage, une donnée de personnage — et
     qu'aucune scène ne matérialisait avant le tribunal. Voir
     PLAN_LE_PORTIQUE.md § 1. */
  epees:     { nom: 'Les deux épées de Drakk',        icone: 'epees' },
  focus:     { nom: 'Le focus de maintien de Trash',  icone: 'focus' },
  deck:      { nom: 'Le deck de White_Rabbit',        icone: 'deck' },
  kit:       { nom: 'Le kit d’effraction d’Hercules', icone: 'kit' },
  /* Ce qui s'achète au Claw & Order. C'est White_Rabbit qui paie —
     décision T5 de TRAME.md : aucun compteur d'argent, une action de
     dialogue, et une réplique qui coûte autre chose que des nuyens. */
  bouteille: { nom: 'Bouteille du rang du haut', icone: 'bouteille' },
  filtre:    { nom: 'Filtre d’ORA',              icone: 'filtre' },
}
