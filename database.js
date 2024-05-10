const { config } = require('dotenv');
const mongoose= require('mongoose');
const MongoUrl= config.MONGO_URL;

async function connectDatabase(){
    console.log("=====>");
    console.log(MongoUrl);
    try {
        await mongoose.connect("mongodb+srv://belwalkarsarvesh4:GPwf6tnUcltETFYS@blogging.b1ca7yy.mongodb.net/blogging?retryWrites=true&w=majority&appName=blogging");
        console.log("connection established with database"); 
    } catch (error) { 
        console.log(error); 
    }
}

module.exports = connectDatabase;