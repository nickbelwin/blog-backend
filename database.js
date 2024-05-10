require('dotenv').config();
const mongoose= require('mongoose');
const MongoUrl= process.env.MONGO_URL;

async function connectDatabase(){
    try {
        await mongoose.connect(`${MongoUrl}`);
        console.log("connection established with database"); 
    } catch (error) { 
        console.log(error); 
    }
}

module.exports = connectDatabase;