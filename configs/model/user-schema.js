var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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

module.exports = mongoose.model('Users', userSchema);