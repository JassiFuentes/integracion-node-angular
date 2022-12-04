
const Recipe = require('../models/recipe')


//hacemos peticion a la base de datos
const obtenerRecetas = async (req, res) => {

    try {
        
        //las bucamos
        const recipes = await Recipe.find();
        //devolvemos un json al cliente
        res.json(recipes)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
        
    }
}

const guardarRecetas = async (req, res) => {
    try {
        const recipes = req.body;

        await Recipe.deleteMany({});

		recipes.forEach(async element => {
			const recipe = new Recipe(element);
			await recipe.save();
		});

		res.status(201).json({
			msg: 'Guardado con exito'
		});

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');        
    }
}


module.exports = {
    obtenerRecetas,
    guardarRecetas,
}