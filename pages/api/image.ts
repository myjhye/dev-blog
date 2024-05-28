import { NextApiHandler } from "next"
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

export const config = {
    api: { bodyParser: false },
};

const handler : NextApiHandler = (req, res) => {
    const { method } = req
    
    switch(method) {
        case 'POST': 
            return uploadNewImage(req, res)
        case 'GET': 
            return readAllImages(req, res)

        default: return res.status(404).send("Not Found!");
    }
};

const uploadNewImage: NextApiHandler = (req, res) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        
        const imageFile = files.image;
        if (!imageFile || !Array.isArray(imageFile) && !(imageFile as formidable.File).filepath) {
            return res.status(400).json({
                error: "No image file uploaded"
            });
        }

        const uploadedFile = Array.isArray(imageFile) ? imageFile[0] : imageFile;
        res.status(200).json({
            message: "Image uploaded successfully",
            file: uploadedFile
        });

        
    });

};

const readAllImages: NextApiHandler = (req, res) => {
    
}

export default handler