const { request, response } = require("express");

const { User } = require('../models');
const { generateJWT } = require('../helpers/jwt');

const auth = async( req = request, res = response) => {
    const { idFacebook, name, email } = req.body;

    try{
        const user = await User.findOne({ idFacebook });
        
        if(!user){
            const userNew = new User({
                idFacebook,
                name,
                email
            })
            
            await userNew.save();
            
            const token = await generateJWT( userNew.id );

            return res.json({
                userNew,
                token
            })


        }

        if(!user?.status) return res.status(400).json({ msg: 'Usuario inactivo' });

        const token = await generateJWT( user.id );
        
        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }   
}

module.exports = {
    auth
}