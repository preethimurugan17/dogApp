var mongoose=require('mongoose');
var schema = mongoose.Schema;

var DogSchema = new schema( {
    name : String
});


module.exports= mongoose.model('Dog',DogSchema);