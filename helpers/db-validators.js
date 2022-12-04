const User = require('../models/user');

const emailExiste = async ( email  = '' ) => {
    //Verificar si el correo existe
    const existeEmail = await User.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`Este correo: ${ email } ya esta registrado`);
    }
}

const existeUsuarioPorID = async ( id ) => {
    const existeUsuario = await User.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id: ${ id } no existe`);
    }
}

module.exports = {
    emailExiste,
    existeUsuarioPorID    
}