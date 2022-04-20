const path = require('path');
const fs   = require('fs');

const { response } = require('express');
const { uploadPhoto } = require('../helpers/uploadFile');

const { Photo } = require('../models');

const postPhoto = async(req, res = response) => {

    try {
        
        const { description, user } = req.body;

        const name = await uploadPhoto( req.files, undefined, 'imgs' );

        const photo = new Photo({
            description,
            user,
            url: name
        });


        await photo.save();

        res.json({ photo });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const getPhoto = async( req, res = response ) =>{
    const { name } = req.params;

    const photo = await Photo.find({ url: name});

    if ( photo[0].url ) {
        const pathImagen = path.join( __dirname, '../uploads/imgs/', photo[0].url );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}

const getPhotosAdmin = async ( req = request, res = response ) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true};

    const [ total, photos ] = await Promise.all([
        Photo.countDocuments(query),
        Photo.find(query)
            .skip( Number( skip ))
            .limit(Number( limit ))
            .populate('user')
    ]);

    res.json({
        total,
        photos
    });
}   

const getPhotos = async ( req = request, res = response ) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true, validate: true};

    const [ total, photos ] = await Promise.all([
        Photo.countDocuments(query),
        Photo.find(query)
            .skip( Number( skip ))
            .limit(Number( limit ))
            .populate('user')
    ]);

    res.json({
        total,
        photos
    });
}   


module.exports = {
    postPhoto,
    getPhoto, 
    getPhotos,
    getPhotosAdmin
}