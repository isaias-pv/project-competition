const { Router } = require('express');
const { check } = require('express-validator');

const { auth } = require('../controllers/auth');
const { validateFields } = require('../middleware/validate');

const router = Router();

router.post('/', [
    check('idFacebook', 'ID Facebook es obligatorio').not().isEmpty(),
    check('name', 'ID Facebook es obligatorio').not().isEmpty(),
    check('email', 'ID Facebook es obligatorio').not().isEmpty(),
    validateFields
], login);

module.exports = router;