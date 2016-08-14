var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    title :{
        type : String,
        Required: true
    },
    category :{
        type : String,
        Required: true
    },
    color :{
        type : String,
        Required: true
    },
    price :{
        type : Number,
        Required: true
    },
    quantity:{
        type : Number,
        Required: true
    },
    photo:{
        data : Buffer,
        contentType: String
    }
});
module.exports = mongoose.model('Product', userSchema);


