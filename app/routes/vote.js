const { Router } = require('express');
const { postVote, getVote } = require('../controllers/vote');

const router = Router();

router.post('/', postVote);

router.get('/', getVote);
module.exports = router;