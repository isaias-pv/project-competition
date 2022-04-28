const { Router } = require('express');
const { check } = require('express-validator');

const { postPhoto, getPhoto, getPhotos, getPhotosAdmin, validatePhoto, putPhoto, deletePhoto } = require('../controllers/photo');
const { validateFields, validateJWT, validateIsAdmin } = require('../middleware/validate');

const router = Router();

router.post( '/', [
    validateJWT,
    check('user', 'Hay un error con el ID de usuario').not().isEmpty().isMongoId(),
    validateFields
], postPhoto );

router.get('/all', [validateJWT, validateIsAdmin], getPhotosAdmin);

router.get('/:name', getPhoto);

router.get('/', [validateJWT], getPhotos);

router.put('/validate/:id', [
    validateJWT,
    check('validation', 'Hay un error al cambiar la validación').not().isEmpty(),
    validateIsAdmin
], validatePhoto);

router.put('/:id', [validateJWT], putPhoto);

router.delete('/:id', [validateJWT, validateIsAdmin], deletePhoto);

module.exports = router;