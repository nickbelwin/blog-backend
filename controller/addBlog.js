

const BlogData= require('../models/blogDataSchema');

async function insertBlog(req,res){
    // console.log(req.body);
    const {title, description}= req.body;
    try {
        if(title,description){
            let res= await BlogData.create({
                title,description
            })
            console.log(res);
            res.status(200).json({ message:"Success", data: res}); 
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