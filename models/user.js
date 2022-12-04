const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    //Preguntar de que es este a juan el que tinee por defecto
    localId: {
        type: String,
        required: false,
        default: 'G996DFgey3gSpvSzux04ySzErkR2'
    },
    expiresIn: {
        type: String,
        require: false,
        default: '3600'
    },
    idToken: {
        type: String,
        require: false,
        default: ''
    }
});



UserSchema.methods.toJSON = function() {
    const { __v, password, _id, localId, expireIn, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );