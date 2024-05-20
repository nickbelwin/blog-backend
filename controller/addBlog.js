const BlogData = require('../models/blogDataSchema');
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

const uploadDir = '/tmp/uploads';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY,
    process.env.CLOUDINARY_API_SECRET,);

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // supports promises as well
        public_id: (req, file) => Date.now() + '-' + file.originalname,
        format: async (req, file) => {
            // Get the MIME type of the file
            const mimeType = file.mimetype;

            // Map MIME types to corresponding image formats
            const mimeToFormat = {
                'image/jpeg': 'jpg',
                'image/png': 'png',
                'image/webp': 'webp',
                // Add more MIME types and corresponding image formats as needed
            };

            // Return the corresponding format based on the MIME type
            return mimeToFormat[mimeType];
        },
    },
});

const upload = multer({ storage: storage });

// Ensure the directory exists
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// // Multer upload instance
// const upload = multer({ storage: storage });

async function insertBlog(req, res) {
    // console.log(req.body);
    // let image= 

    const { title, date, author, category, description } = req.body;
    const image = req?.file?.path;
    // const imagePath = path.join('/tmp/uploads', image.filename); // Assuming filename is available in req.file
    // const imagePath = path.join(__dirname, "./uploads", image.path);
    // const imageData = fs.readFileSync(imagePath);
    // image = image.path;
    console.log(title, date, author, category, image, description);
    if (!title) {
        res.status(400).json({ message: "Title is required!" });
    }
    else if (!author) {
        res.status(400).json({ message: "Author is required!" });
    }
    else if (!category) {
        res.status(400).json({ message: "Category is required!" });
    }
    else if (!date) {
        res.status(400).json({ message: "Date is required!" });
    }
    else if (!image) {
        res.status(400).json({ message: "Image is required!" });
    }
    else if (!description) {
        res.status(400).json({ message: "Description is required!" });
    }
    else if (title && date && author && Array.isArray(category) && category?.length >= 1 && image && description) {
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
    else {
        res.status(400).json({ message: "Internal server error!" });

    }

}

// get all blogs

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

// get blog by id

async function getBlogById(req,res){
    try {
        const blog = await BlogData.findById(req.params.id);
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }
        res.status(200).send({message:"success", data:blog});
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
}



module.exports = {
    insertBlog,
    getBlogs,
    upload,
    getBlogById,
}