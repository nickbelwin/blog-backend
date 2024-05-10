const mongoose=require('mongoose');

const blogSchema= mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    }
});

module.exports=mongoose.model("BlogData", blogSchema);