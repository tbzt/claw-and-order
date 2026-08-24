/* Le registre des tableaux. Le moteur ne connaît que ça : un identifiant,
   un module. Ajouter un tableau, c'est ajouter une ligne. */
import { bar } from './bar.js'
import { quai } from './quai.js'
import { quaiVoilier } from './quai-voilier.js'
import { greffe } from './greffe.js'
import { greffeCellule } from './greffe-cellule.js'
import { retour } from './retour.js'
import { planque } from './planque.js'
import { herwick } from './herwick.js'
import { sarah } from './sarah.js'
import { duke } from './duke.js'
import { tribunal } from './tribunal.js'
import { tribunalSalle } from './tribunal-salle.js'
import { carte } from './carte.js'

export const scenes = { bar, quai, 'quai-voilier': quaiVoilier, greffe, 'greffe-cellule': greffeCellule, retour, planque, herwick, sarah, duke, tribunal, 'tribunal-salle': tribunalSalle, carte }
export const depart = 'bar'
