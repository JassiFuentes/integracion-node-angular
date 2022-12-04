const mongoose = require('mongoose')

const dbConection = async() =>{
    //conexion a mongodb
    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })

        console.log('Base de Datos Online');
        
    } catch (error) {
        console.log(error);
        // process.exit(1)//DEtiene la app
        throw new Error('Error a la hora de inicializar la base de datos');
        
    }
}


module.exports = {
    dbConection
}