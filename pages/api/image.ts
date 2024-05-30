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
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Formidable error:", err);
            return res.status(500).json({ error: err.message });
        }

        console.log("Fields:", fields);
        console.log("Files:", files);

        if (!files.image || !Array.isArray(files.image) || files.image.length === 0) {
            console.error("Image file is missing or incorrect format");
            return res.status(400).json({ error: "Image file is missing or incorrect format" });
        }

        const imageFile = files.image[0] as File;
        console.log("Image file received:", imageFile);

        try {
            const result = await cloudinary.uploader.upload(imageFile.filepath, {
                folder: "dev-blogs",
            });

            console.log("Cloudinary upload result:", result);
            res.json({ image: result.secure_url, url: result.url });
        } catch (uploadError) {
            console.error("Cloudinary upload error:", (uploadError as Error).message);
            res.status(500).json({ error: (uploadError as Error).message });
        }
    });
};

const readAllImages: NextApiHandler = (req, res) => {
    res.status(501).json({ error: "Not implemented" });
};

export default handler;
