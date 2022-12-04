const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

    //agrupar los errores de mdw
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}