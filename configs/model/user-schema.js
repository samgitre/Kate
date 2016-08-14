var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



var userSchema = new Schema({
    firstName: { type: String,
            Required : true
    },
    lastName: {
        type: String,
        Required: true
    },
    email: { type: String,
            Required : true
    },
    password: { type: String,
               Required : true
    }
});

//declaring password hashing methods for user schema

userSchema.method.encryptUserPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.method.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('Users', userSchema);