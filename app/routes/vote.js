const { Router } = require('express');
const { check } = require('express-validator');

const { postVote, getVote, getVotes, getVoteUser, getVotesPhoto, getResults } = require('../controllers/vote');
const { validateFields, validateJWT, validateIsAdmin } = require('../middleware/validate');

const router = Router();

router.post('/', [
    validateJWT,
    check('userIp', 'La ip es obligatoria').not().isEmpty(),
    check('photo', 'El id de la foto es obligatoria o es incorrecto').not().isEmpty().isMongoId(),
    validateFields
], postVote);

router.get('/user/:user', [validateJWT, validateIsAdmin], getVoteUser);

router.get('/photo/:photo', [validateJWT, validateIsAdmin], getVotesPhoto);

router.get('/info', [validateJWT, validateIsAdmin], getResults);

router.get('/:id', [validateJWT, validateIsAdmin], getVote);

router.get('/', [validateJWT, validateIsAdmin], getVotes);

module.exports = router;