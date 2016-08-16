var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productsSchema = new Schema({
    title :{
        type : String,
        required: true
    },
    category :{
        type : String,
        required: true
    },
    color :{
        type : String,
        required: true
    },
    price :{
        type : Number,
        required: true
    },
    quantity:{
        type : Number,
        required: true
    },
    image :{
        data : Buffer,
        contentType: String
    }
});
module.exports = mongoose.model('Product', productsSchema);


