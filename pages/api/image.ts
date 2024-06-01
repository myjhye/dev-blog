import { NextApiHandler } from "next";
import formidable, { File } from "formidable";
import cloudinary from "./cloudinary";

export const config = {
    api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
    const { method } = req;

    // http 메소드에 따라 다른 함수 호출
    switch (method) {
        // 이미지 업로드
        case "POST":
            return uploadNewImage(req, res);
        // 이미지 조회
        case "GET":
            return readAllImages(req, res);
        // 지원되지 않는 메소드
        default:
            return res.status(404).send("Not Found!");
    }
};


// 이미지 업로드
const uploadNewImage: NextApiHandler = (req, res) => {
    
    const form = formidable({
        // 여러 업로드 파일 허용 
        multiples: true, 
        // 파일 확장자 유지
        keepExtensions: true 
    });


    // formidable로 요청 파싱
    form.parse(req, async (err, fields, files) => {
        
        if (err) {
            console.error("Formidable error:", err);
            return res.status(500).json({ error: err.message });
        }

        // 이미지 파일이 있는지 확인
        if (!files.image || !Array.isArray(files.image) || files.image.length === 0) {
            return res.status(400).json({ error: "Image file is missing or incorrect format" });
        }

        // 첫 번째 이미지 가져오기
        const imageFile = files.image[0] as File;

        try {
            // cloudinary에 이미지 업로드
            const result = await cloudinary.uploader.upload(imageFile.filepath, {
                folder: "dev-blogs",
            });

            //** 업로드된 이미지 url을 json으로 반환
            res.json({ 
                src: result.url 
            });

        } catch (uploadError) {
            res.status(500).json({ error: (uploadError as Error).message });
        }
    });
};



// 이미지 조회
const readAllImages: NextApiHandler = async (req, res) => {

    try {
        // https://res.cloudinary.com/dynf7v52s/image/upload/v1717075859/dev-blogs/nveow20l9cresufj.png

        // cloudinary에서 이미지 목록 가져오기
        const { resources } = await cloudinary.api.resources({
            resource_type: 'image',
            type: 'upload',
            prefix: "dev-blogs",
        });
    
        //** 이미지 url 목록 생성
        const images = resources.map(({ secure_url }: any) => {
            return { src: secure_url };
        });

        //** 이미지 목록을 json으로 반환
        res.json({ images });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    };
};

export default handler;
