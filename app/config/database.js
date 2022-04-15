const mongoose = require('mongoose');



const dbConnection = async( url) => {

    try {

        await mongoose.connect( url );
    
        return 'On'

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}
