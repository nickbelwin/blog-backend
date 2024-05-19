const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    date:  {
        type: String,
        required:true
    },
    author:  {
        type: String,
        required:true
    },
    category:  {
        type: String,
        required:true
    },
    image:  {
        type: String,
    },
    description: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model("BlogData", blogSchema);