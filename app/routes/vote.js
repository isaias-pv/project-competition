const { Router } = require('express');
const { check } = require('express-validator');

const { postVote, getVote, getVotes, getVoteUser, getVotesPhoto, getStatistics } = require('../controllers/vote');
const { validateFields, validateJWT, validateIsAdmin } = require('../middleware/validate');

const router = Router();

router.post('/', [
    validateJWT,
    check('userIp', 'La ip es obligatoria').not().isEmpty(),
    check('photo', 'El id de la foto es obligatoria o es incorrecto').not().isEmpty().isMongoId(),
    validateFields
], postVote);

router.get('/:id', [validateJWT, validateIsAdmin], getVote);

router.get('/user/:user', [validateJWT, validateIsAdmin], getVoteUser);

router.get('/photo/:photo', [validateJWT, validateIsAdmin], getVotesPhoto);

router.get('/statistics', [validateJWT, validateIsAdmin], getStatistics); //Falta por hacer

router.get('/', [validateJWT, validateIsAdmin], getVotes);

module.exports = router;