const { User } = require('../models');

const idFacebookExist = async( idFacebook = '' ) => {

    const idFacebook = await User.findOne({ idFacebook });

    if ( existeEmail ) {
        throw new Error(`Este usuario ya existe -  ${ idFacebook }`);
    }

}

const userExist = async( id ) => {

    const user = await User.findById(id);
    if ( !user ) {
        throw new Error(`El usuario no existe -  ${ id }`);
    }
}

module.exports = {
    idFacebookExist,
    userExist
}