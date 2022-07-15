import {NextFunction, Request, Response} from "express";

require("dotenv").config();
const JWT = require('jsonwebtoken');


const authToken = async (req: Request, res: Response, next: NextFunction) => {

    // get token
    const token = req.header("x-auth-token");

    // if token not found, send error message

    if (!token) {
        return res.status(401).json({
            errors: [
                {
                    msg: "Token not found",
                },
            ],
        });
    }

    // Authenticate token
    try {
        const user = await JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //@ts-ignore
        req.user = user.email;
        next();
    } catch (error) {
        return res.status(403).json({
            errors: [
                {
                    msg: "Invalid token"
                }
            ]
        })
    }
}

module.exports = authToken;