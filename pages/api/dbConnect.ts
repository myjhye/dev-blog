// 데이터베이스 연결

import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string
const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(uri);
        console.log(connection);
    } catch (error) {
        console.log('db connection failed ', error);
    }
};

export default dbConnect;

