const express=require('express');
const router=express.Router();

const insertBlog= require('../controller/addBlog');

router.get('/', (req,res)=>{
    try {
        res.status(200).send(" Hello I'm get response from server");
    } catch (error) {
        res.status(400).send(error);
    }

});
router.post('/insertBlog', insertBlog);

module.exports=router;