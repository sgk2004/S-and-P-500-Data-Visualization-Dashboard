// csv= 'finance/S&P500.csv'
// d3.csv(csv).then( data =>{
//     console.log(data)
// });

// url='mongodb+srv://stockUser:stockUser2020@cluster0-h88wh.mongodb.net/test?retryWrites=true&w=majority'
// d3.json(url).then(data => {
//     console.log(data)
// }); 


const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = 'mongodb+srv://stockUser:stockUser2020@cluster0-h88wh.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = "stocksDB";
 
 
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;
 
app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("personnel");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});