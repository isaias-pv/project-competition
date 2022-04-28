const { Router } = require('express');
const { check } = require('express-validator');
const { postUser, getUser, getUsers, getUserParticipant, validateUser, deleteUser } = require('../controllers/user');

const { validateFields, validateIsAdmin, validateJWT } = require('../middleware/validate');

const router = Router();

router.post('/', [
    check('name', 'El  nombre es obligatorio').not().isEmpty(),
    check('idFacebook', 'El ID Facebook es obligatorio').not().isEmpty(),
    validateFields
] ,postUser);

router.get('/', [validateJWT, validateIsAdmin], getUserParticipant);

router.put('/:id', [validateJWT, validateIsAdmin], validateUser);

router.delete('/:id', [validateJWT, validateIsAdmin], deleteUser);

router.get('/:id', [validateJWT] ,getUser);

router.get('/', [validateJWT, validateIsAdmin] ,getUsers);


module.exports = router;