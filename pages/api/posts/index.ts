import dbConnect from "@/pages/api/dbConnect";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    const { method } = req
    switch(method) {
        case 'GET': {
            await dbConnect();
            res.json({ ok: true });
        }
    }
};

export default handler;