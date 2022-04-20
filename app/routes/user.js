const { Router } = require('express');
const { postUser, getUser, getUsers } = require('../controllers/user');

const router = Router();

router.post('/', postUser);

router.get('/:id',  getUser);

router.get('/',  getUsers);

module.exports = router;