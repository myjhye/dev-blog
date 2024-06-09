import Joi, { ObjectSchema } from "joi";

export const errorMessages = {
    INVALID_TITLE: "Title is missing!",
    INVALID_TAGS: "Tags must be array of strings!",
    INVALID_SLUG: "Slug is missing!",
    INVALID_META: "Meta description is missing!",
    INVALID_CONTENT: "Post content is missing!",
};

// 데이터 검증하는 스키마 정의
export const postValidationSchema = Joi.object().keys({
    // 데이터가 비어있거나, 누락 시 반환하는 메세지
    title: Joi.string().required().messages({
        'string.empty': errorMessages.INVALID_TITLE,
        'any.required': errorMessages.INVALID_TITLE,
    }), 
    content: Joi.string().required().messages({
        'string.empty': errorMessages.INVALID_CONTENT,
        'any.required': errorMessages.INVALID_CONTENT,
    }), 
    slug: Joi.string().required().messages({
        'string.empty': errorMessages.INVALID_SLUG,
        'any.required': errorMessages.INVALID_SLUG,
    }), 
    meta: Joi.string().required().messages({
        'string.empty': errorMessages.INVALID_META,
        'any.required': errorMessages.INVALID_META,
    }),
    // 데이터가 비어있거나, 문자열 배열이 아닐 때 반환하는 메세지  
    tags: Joi.array().items(Joi.string()).messages({
        'string.empty': errorMessages.INVALID_TAGS,
        'string.base': errorMessages.INVALID_TAGS,
    }) 
})


// 요청 본문 데이터 유효성 검증
export const validateSchema = (schema: ObjectSchema, value: any) => {
    const { error } = schema.validate(value, {
        errors: {
            // 오류 메세지에 필드 이름을 포함
            label: "key",
            wrap: {
                // 필드 이름을 따옴표로 감싸지 않음
                label: false,
                // 배열 항목을 따옴표로 감싸지 않음
                array: false
            },
        },
        // 스키마에 정의되지 않은 필드를 허용 - thumbnail..
        allowUnknown: true,
    });

    // 오류 발생 시 첫 번째 오류 메세지 반환
    if (error) {
        return error.details[0].message;
    }

    return "";
}