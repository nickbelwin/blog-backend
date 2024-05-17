const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
    },
    date:  {
        type: String,
    },
    author:  {
        type: String,
    },
    category:  {
        type: String,
    },
    image:  {
        type: String,
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model("BlogData", blogSchema);