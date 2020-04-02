// var MongoClient  = require('mongodb').MongoClient;
// const url = "mongodb+srv://ilay:<password>@gabaynet-jpsbj.mongodb.net/test?retryWrites=true&w=majority";
// var client = new MongoClient(url, { useNewUrlParser: true});

// client.connect(err =>{
//     if(err) throw err;
//     const collection = client.db("test").collection("devices");
//     console.log('database created');
//     client.close();
// });




const MongoClient = require('mongodb').MongoClient;
const SeferTora = require('./SeferTora');
const hebcal = require('hebcal');

const uri = "mongodb+srv://ilay:asdfgmnbvc@gabaynet-jpsbj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true });

var sefer1  = new SeferTora("levi", [new hebcal.HDate(27,'Adar',5775)]);


client.connect(err => {
    if(err) throw err;
    const collection = client.db("test").collection("sefarim");
    // perform actions on the collection object
    console.log('database created');
    collection.insertOne(sefer1, function(err,res){
        if(err) throw err;
        console.log('inserrt document');
    })

  client.close();
});




// MongoClient.connect(url, function (err, db){
//     if(err) throw err;
//     console.log('database created');
//     db.close();
// })