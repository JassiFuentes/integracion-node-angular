const { request, response } = require('express')
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const validarJWT = async( req = request, res = response, next) => {

    const { auth } = req.query;

	if (!auth) {
		return res.status(401).json({
			msg: "No hay token en la peticion"
		});
	}

	try {
		const { uid } = jwt.verify(auth, process.env.SECRETORPRIVATEKEY);
		const user = await User.findById(uid);

		req.user = user;
		next();
	} catch (error) {
		console.log(error);

		return res.status(401).json({
			msg: "Token invalido"
		});
	}
}



module.exports = {
    validarJWT
}