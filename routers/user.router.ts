import 'dotenv/config'
import {Router} from "express";
import {check, validationResult} from "express-validator";
import {UserRecord} from "../records/user.record";
import {v4 as uuid} from 'uuid'

const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


export const UserRouter = Router()
    .get('/', (req, res) => {
        res.json('Witamy w panelu użytkownika')
    })

    .post('/register', [
        check('name', 'Name must be at least 3 chars long').isLength({min: 3}),
        check("email", "Invalid Email").isEmail(),
        check("password", "Password must be at least 3 chars long").isLength({min: 3,}),
    ], async (req, res) => {

        const {email, password, name} = req.body;

        // Validate user input
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        // Validate is user already exists

        const user = await UserRecord.getUser(email)

        if(user !== null) {
            return res.status(200).json({
                errors: [
                    {
                        email: user.email,
                        msg: 'User with this email already exists',
                    },
                ],
            });
        }

        // return res.json('można zalozyc konto')

        // Hash password before saving to DB

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Add user to DB
        const newUser = new UserRecord({...req.body, password: hashedPassword, userId: uuid()})
        await newUser.addUsertoDB()

        const acessToken = await JWT.sign(
            {email, name},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "60m"}
        );

        res.json(acessToken)


    })

    .post('/login', async (req, res) => {

    })