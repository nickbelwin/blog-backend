const express= require('express');
const app = express();
const cors = require('cors');
const corsConfig={
    origin:"*",
    credential:true,
    methods: ["GET","POST","PUT","PATCH","DELETE"],
}
require('dotenv').config();
const port= process.env.PORT ;


app.use(cors());
app.use(express.json());
const dbConnect= require('./database');
dbConnect();

const blogRoute= require("./routes/blogRoute");

app.use(blogRoute);

app.listen(port, ()=>{
    console.log("listening at port",port);
})