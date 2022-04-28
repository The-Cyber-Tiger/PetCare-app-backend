import { Router } from 'express'
import controllers from './pet-controller'

const router = Router() //Creamos un objeto router para redireccionar las peticiones entrantes.


router // path: www.../api/pet/...
    .route('/') // Peticiones a la ruta general.
    .get(controllers.getMany) // Controlador getMany para devolver varios contactos.
    .post(controllers.createOne) // Controlador createOne para crear un nuevo contacto.

router // path: www.../api/pet/last
    .route('/last')
    .get(controllers.getLast)

router // path: www.../api/pet/:id
    .route('/:id') // Peticiones a la ruta con parametro ID.
    .get(controllers.getOne) // Controlador getOne para devolver contacto por ID.
    .put(controllers.updateOne) // Controlador updateOne para actualizar contacto por ID.
    .delete(controllers.removeOne) // Controlador removeOne para eliminar contacto por ID.


export default router