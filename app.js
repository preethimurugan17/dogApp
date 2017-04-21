
// call all the packages we need
var express= require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require ("mongoose");
var config=require("./config/config");
var Dog = require("./models/dog");

// configure our app to use bodyParser
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

//create an instance for the express router
var router= express.Router();

//middleware to use for all the requests.
// use this if you want to do something every time a 
router.use(function(req,res,next){
    console.log("Something something is happening here man");
    next(); //this ensures to access the next routes instead of stopping here
})

// create a route , define the roots here. 
// this route can be accessed at http://localhost:3029/api
router.get('/',function(req,res){
      res.status(200).sendFile(__dirname + '/client/index.html');
})

// on routes that end in /dogs
router.route('/dogs')
.post(function(req,res){
    var dog =new Dog();  //create a new instance for the Dog object
       dog.name=req.body.name; //get the name from the request body
dog.save(function(err,data){
    if(err) {
        console.error(err);
    }
    else {
        console.log("dog created");
        res.send(data);
    }
})
})

//get all the dogs here (localhost:3029/api/dogs)

.get(function(req,res){
Dog.find(function(err,data){
    if(err)
    {
        res.senddog(err);
    }else{
        res.json(data);
    }
});
});


//To update, to get a dog by it's id and to delete, we need to pass
//the id along with the url. i.e, route is going to be '/dogs/:dog_id'

router.route('/dogs/:dog_id')
.get(function(req,res){
    Dog.findById(req.params.dog_id, function(err,data){
        if(err){
            res.send(err);
        }else {
            res.json(data);
        }
    })
})

.put(function(req,res){
    Dog.findByIdAndUpdate(req.params.dog_id,{$set : {name : req.body.name}},{new:true},function(err,data){
       
      // if(err)
      // res.send(err);
       //dog.name=req.body.name;

        if(err){
            console.error(err);
        }else {
            res.json({message: 'dog updated'});
        }
    })
})

.delete(function(req,res){
    Dog.remove({ _id : req.params.dog_id},function(err,data){
        if(err){res.send(err)
     2   } else {
            res.json({message:'successfully deleted'});
        }
    });
});

router.route('/login')

.get(function(req,res){
    //res.json({message :'this is your login page'})
  res.status(200).sendFile(__dirname + '/client/login.html');
})

//apply these routes to a root url.
app.use('/api',router);

//establish mongodb connection 
config.connectDB();







//define the port where the server has to listen from
app.listen(3029);
console.log('Magic happens on port 3029');


