const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");



//Crear ususario y guardarlo en base de datos
const singup = async (req, res) => {

    //recibo lo que mande el usuario
    const { email, password } = req.body;
    //instacia de mi modelo de usuario
    const user = new User({
        email,
        password,      
    });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    //Generar el JWT
    const token = await generarJWT( user.id );//guardo en el payload el user.idToken
    //el token es el valor de mi idToken
    user.idToken = token;

    //Grabar el registro en mongoDB
    await user.save();


    res.status(200).json({

        email: user.email,

        localId: user.localId,

        idToken: user.idToken,

        expiresIn: user.expiresIn

    })
}

const login = async( req = request, res = response ) => {

    const { email, password } = req.body;
    
    try {
        //Verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            })

        }

        
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })  
        }


        

        res.status(200).json({

            email: user.email,

            localId: user.localId,

            idToken: user.idToken,

            expiresIn: user.expiresIn

        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }

}


module.exports = {
    singup,
    login
}