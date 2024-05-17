

const BlogData = require('../models/blogDataSchema');
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

async function insertBlog(req, res) {
    // console.log(req.body);
    // let image= 

    const { title, date, author, category, description } = req.body;
    let image = req.file;

    // const imagePath = path.join(__dirname, "./uploads", image.path);
    // const imageData = fs.readFileSync(imagePath);
    image = image.path;
    console.log(title, date, author, category, image, description);
    try {
        if (title, description) {
            let response = await BlogData.create({
                title, date, author, category, image, description
            })
            console.log(response);
            res.status(200).json({ message: "Success", data: response });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

async function getBlogs(req, res) {
    try {
        const getData = await BlogData.find();
        let result = getData.reverse();
        res.status(200).json({ message: "Success", data: result });

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}

module.exports = {
    insertBlog,
    getBlogs,
}