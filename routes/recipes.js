//Rutas para recetas
const { Router } = require('express');
const { obtenerRecetas, guardarRecetas } = require('../controllers/recipe');
const { validarJWT, validarCampos } = require('../middlewares');


const routerRecipe = Router();

//obtener las recetas
routerRecipe.get('/', [ validarJWT, validarCampos],
obtenerRecetas)

//guardar recetas
routerRecipe.put('/',[ validarJWT, validarCampos], guardarRecetas)


module.exports = {
    routerRecipe
}


