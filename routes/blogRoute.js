const express=require('express');
const router=express.Router();
const multer  = require('multer')
// const upload = require("../controller/addBlog");

const addBlogs= require('../controller/addBlog');

router.get('/', (req,res)=>{
    try {
        res.status(200).send(" Hello I'm get response from server");
    } catch (error) {
        res.status(400).send(error);
    }

});
router.post('/insertBlog', addBlogs.upload.single('image'), addBlogs.insertBlog );
router.get('/getBlogs', addBlogs.getBlogs );


module.exports=router;
