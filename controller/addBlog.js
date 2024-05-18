

const BlogData = require('../models/blogDataSchema');
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = '/tmp/uploads';

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Multer upload instance
const upload = multer({ storage: storage });

async function insertBlog(req, res) {
    // console.log(req.body);
    // let image= 

    const { title, date, author, category, description } = req.body;
    let image = req.file;
    const imagePath = path.join('/tmp/uploads', image.filename); // Assuming filename is available in req.file
    // const imagePath = path.join(__dirname, "./uploads", image.path);
    // const imageData = fs.readFileSync(imagePath);
    // image = image.path;
    console.log(title, date, author, category, imagePath, description);
    try {
        if (title, description) {
            let response = await BlogData.create({
                title, date, author, category, image: imagePath, description
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
    upload,
}