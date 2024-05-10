

const BlogData= require('../models/blogDataSchema');

async function insertBlog(req,res){
    // console.log(req.body);
    const {title, description}= req.body;
    try {
        if(title,description){
            let response= await BlogData.create({
                title,description
            })
            console.log(response);
            res.status(200).json({ message:"Success", data: response}); 
        }
    } catch (error) { 
        console.log(error);
        res.status(400).send(error);
    }

}

async function getBlogs(req,res){
    try {
        const getData= await BlogData.find();
        res.status(200).json({ message:"Success", data: getData});
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}

module.exports= {
    insertBlog,
    getBlogs,
}