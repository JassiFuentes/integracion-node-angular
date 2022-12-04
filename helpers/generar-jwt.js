const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {
    return new Promise (( resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '300h'

        }, ( err, token) => {

            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve( token );//sera mi idToken
            }

        })

    }) 

}


module.exports = {
    generarJWT
}