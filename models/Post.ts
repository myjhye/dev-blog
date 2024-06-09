// 게시물 스키마

import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            // 문자열 앞뒤 공백 자동 제거
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            // 유일 값
            unique: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            // 문자열 배열
            type: [String],
        },
        thumbnail: {
            type: Object,
            // 썸네일 이미지 url
            url: String,
            // 썸네일 이미지 id
            public_id: String,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        // 생성, 수정 시간 자동 기록
        timestamps: true,
    }
);

// Post 모델(테이블)
const Post = models?.Post || model('Post', PostSchema);

export default Post;