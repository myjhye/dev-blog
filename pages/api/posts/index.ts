// 데이터베이스 처리, 유효성 검증

import dbConnect from "@/pages/api/dbConnect";
import { NextApiHandler } from "next";
import { postValidationSchema, validateSchema } from "../validator";

const handler: NextApiHandler = async (req, res) => {
    const { method } = req
    switch(method) {
        case 'GET': {
            await dbConnect();
            res.json({ ok: true });
        }
        case 'POST': {
            return createNewPost(req, res)
        }
    }
};

// 새 게시물 생성
const createNewPost: NextApiHandler = (req, res) => {
    // 요청 본문
    const { body } = req
    // 유효성 검증 실행
    const validationError = validateSchema(postValidationSchema, body);
    if (validationError) {
        // 유효성 검증 실패 시 400 상태 코드와 함께 오류 메시지 반환
        return res.status(400).json({ error: validationError });
    }

    res.json({ ok: true })
}

export default handler;