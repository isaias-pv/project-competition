const { request, response } = require('express');

const { User } = require('../models');

const postUser = async( req = request, res = response ) => {
    const data = req.body;

        const user = new User({
            idFacebook: data.idFacebook,
            name: data.name,
            email: data.email
        });

        await user.save();

        res.status(201).json({
            user
        });
}

const getUser = async ( req = request, res = response ) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if( !user ) res.status(400).json({msg: "User not found"});
    else res.json({user});
}

const getUsers = async ( req = request, res = response ) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( skip ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        users
    });
}   

module.exports = {
    postUser, 
    getUsers,
    getUser
}