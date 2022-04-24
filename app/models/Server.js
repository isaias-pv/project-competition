const Express = require('express');
const cors    = require('cors');
const fileUpload = require('express-fileupload');

const { APP_NAME, APP_PORT, APP_URLS, PATHS, APP_MODB } = require('../config');
const { dbConnection } = require('../config/database');
const ROUTER = require('../routes');

class Server{

    constructor(){
        
        this.app = Express();
        
        this.middlewares();

        this.router();

        this.connectDB();

    }

    middlewares(){
        this.app.use(cors());

        this.app.use(Express.urlencoded({ extended: false }));

        this.app.use(Express.json());

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    async connectDB(){
        await dbConnection(APP_MODB)
    }

    router(){
        this.app.use(PATHS.user, ROUTER.user);

        this.app.use(PATHS.photo, ROUTER.upload);

        this.app.use(PATHS.vote, ROUTER.vote);

        this.app.use(PATHS.auth, ROUTER.auth);
    }

    listen(){
        this.app.listen(APP_PORT, () => {
            console.log(
            `
            Name        : ${APP_NAME}
            Server      : On
            Port        : ${APP_PORT}
            URLs        : ${APP_URLS}
            `
            );
        });
    }
}

module.exports = Server;