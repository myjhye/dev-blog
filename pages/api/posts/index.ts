// 데이터베이스 처리, 유효성 검증

import dbConnect from "@/pages/api/dbConnect";
import Joi from "joi";
import { NextApiHandler } from "next";

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

    // 스키마 유효성 검증
    const schema = Joi.object().keys({
        title: Joi.string().required().messages({
            'string.empty': 'Title cannot be empty!',
            'any.required': 'Title is a required field!',
        }), 
        content: Joi.string().required(),
    });

    const { error } = schema.validate(body, {
        errors: { 
            label: 'key',
            wrap: {
                label: false,
                array: false,
            },
        },
    });

    // 유효성 검사 실패 시
    if (error) {
        const errorMessage = error.details[0].message
        return res.status(400).json({ error: errorMessage })
    }

    res.json({ ok: true })
}

export default handler;