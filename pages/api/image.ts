import { NextApiHandler } from "next";
import formidable, { File } from "formidable";
import cloudinary from "./cloudinary";

export const config = {
    api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "POST":
            return uploadNewImage(req, res);
        case "GET":
            return readAllImages(req, res);
        default:
            return res.status(404).send("Not Found!");
    }
};

const uploadNewImage: NextApiHandler = (req, res) => {
    
    const form = formidable({ 
        multiples: true, 
        keepExtensions: true 
    });

    form.parse(req, async (err, fields, files) => {
        
        if (err) {
            console.error("Formidable error:", err);
            return res.status(500).json({ error: err.message });
        }

        if (!files.image || !Array.isArray(files.image) || files.image.length === 0) {
            return res.status(400).json({ error: "Image file is missing or incorrect format" });
        }

        const imageFile = files.image[0] as File;

        try {
            const result = await cloudinary.uploader.upload(imageFile.filepath, {
                folder: "dev-blogs",
            });

            res.json({ 
                image: result.secure_url, 
                url: result.url 
            });

        } catch (uploadError) {
            res.status(500).json({ error: (uploadError as Error).message });
        }
    });
};

const readAllImages: NextApiHandler = async (req, res) => {

    try {
        // https://res.cloudinary.com/dynf7v52s/image/upload/v1717075859/dev-blogs/nveow20l9cresufj.png
        const { resources } = await cloudinary.api.resources({
            resource_type: 'image',
            type: 'upload',
            prefix: "dev-blogs",
        });
    
        const images = resources.map(({ secure_url }: any) => {
            return { src: secure_url };
        });
        res.json({ images });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    };
};

export default handler;
