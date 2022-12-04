const express = require('express');
const cors = require('cors');

const { dbConection } = require('../database/config');
//importar rutas que manejare login,signin recipes lo hago directamente abajo como fernando

const  routerAuth = require('../routes/users');
const { routerRecipe } = require('../routes/recipes');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //RUTAS debo tenr rutas de login/auth,save, fetch        
        this.authPath = '/api/auth'
        this.recipePath = '/api/recipes'

        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConection()
    }

    middlewares(){

        // CORS
        this.app.use( cors());

        //lectura y parseo del body
        this.app.use( express.json() );

        //directorio Publico
        this.app.use( express.static('public'));
    }

    routes() {
        //primer arg la ruta, segundo arg de donde lo solicito su contenido-ubicacion, hago una importacion directa
        this.app.use(this.authPath, routerAuth);

        this.app.use(this.recipePath, routerRecipe)
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;