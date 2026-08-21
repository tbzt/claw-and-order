/* Le registre des tableaux. Le moteur ne connaît que ça : un identifiant,
   un module. Ajouter un tableau, c'est ajouter une ligne. */
import { bar } from './bar.js'
import { quai } from './quai.js'
import { quaiVoilier } from './quai-voilier.js'
import { greffe } from './greffe.js'
import { retour } from './retour.js'
import { planque } from './planque.js'

export const scenes = { bar, quai, 'quai-voilier': quaiVoilier, greffe, retour, planque }
export const depart = 'bar'
