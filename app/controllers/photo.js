const path = require('path');
const fs   = require('fs');

const { response } = require('express');
const { uploadPhoto } = require('../helpers/uploadFile');

const { Photo, User } = require('../models');

const postPhoto = async(req, res = response) => {

    try {
        
        const { description, user } = req.body;

        const name = await uploadPhoto( req.files, undefined, 'imgs' );

        const photo = new Photo({
            description,
            user,
            name,
            url: process.env.APP_URLS + '/photo/' + name
        });


        await photo.save();

        res.json({ photo });

    } catch (msg) {
        res.status(400).json({ msg: "Error" });
    }

}

const getPhoto = async( req, res = response ) =>{
    const { name } = req.params;

    const photo = await Photo.find({ name });

    try {
        if ( photo[0].name ) {
            const pathImagen = path.join( __dirname, '../uploads/imgs/', photo[0].name );
            if ( fs.existsSync( pathImagen ) ) {
                return res.sendFile( pathImagen )
            }
        }
    } catch (error) {
        const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
        res.status(404).sendFile( pathImagen )
    }
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
    const query = { status: true, validation: true};

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

const validatePhoto = async ( req = request, res = response ) => {
    const { id } = req.params;
    const { validation } = req.body;

    if(await Photo.findById(id)){
        const photo = await Photo.findByIdAndUpdate(id, {validation});

        if ( await Photo.countDocuments({ user: photo.user}) >= 2 ) 
            await User.findByIdAndUpdate(photo.user, {rol: 'PARTICIPANT'})
        else await User.findByIdAndUpdate(photo.user, {rol: 'USER'})

        res.status(200).json({
            photo
        })
    }else{
        res.status(404).json({
            msg: "Error, no existe la foto"
        })
    }
}


module.exports = {
    postPhoto,
    getPhoto, 
    getPhotos,
    getPhotosAdmin,
    validatePhoto
}