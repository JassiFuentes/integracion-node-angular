const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const {
    singup,
    login
} = require('../controllers/users');


const { 
    emailExiste, 
     } = require('../helpers/db-validators');

    

//Instancia debo manejar los usuarios y nuevos usuario
const routerAuth = Router();


//Crea un nuevo usuario
routerAuth.post('/signup', [
    //valido las cosas requerida que me manda del body
    check('password', 'El password es requerido').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail().custom( emailExiste ),
    validarCampos
], singup);

//Loggin usuario
routerAuth.post('/login', [
    check('password', 'la contraseña es obligatorio').not().isEmpty(),
    check('email').isEmail(),
    validarCampos
],login);







module.exports = routerAuth ;