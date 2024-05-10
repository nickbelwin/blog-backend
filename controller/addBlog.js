

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
            res.status(200).json({ success:"Success", res}); 
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}

module.exports=insertBlog;