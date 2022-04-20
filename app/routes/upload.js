const { Router } = require('express');

const { postPhoto, getPhoto, getPhotos, getPhotosAdmin } = require('../controllers/upload');

const router = Router();

router.post( '/', postPhoto );

router.get('/:name', getPhoto);

router.get('/', getPhotos);

router.get('/', getPhotosAdmin);

module.exports = router;