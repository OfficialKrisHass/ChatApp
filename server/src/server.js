import express from "express"

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

import runQuery from "./database.js"

const APIInfo = {
    name: "Chat app API",
    version: "0.1",
}

const app = express();

app.use(express.json());

app.get("/", (req, res) => {

    res.status(200).json(APIInfo);

})

app.post("/api/auth", async (req, res) => {

    const { email, password } = req.body;

    runQuery("SELECT name, email FROM users WHERE email=? OR name=?", [email, name]).then(result => {

        if (result.length === 0)
            registerUser();
        else
            res.status(400).json({
                status: -2,
                msg: "User already registered, please log in."
            });

    });

    const registerUser = () => {

        runQuery("INSERT INTO users(name, email, password) VALUES(?, ?, ?)", [name, email, bcrypt.hashSync(password, 10)])
        .then(result => {

            const token = jwt.sign({
                email,
                signInTime: Date.now(),
            }, process.env.JWT_SECRET_KEY);

            res.status(200).json({
                status: 1,
                msg: "Successfuly registered user",
                token
            });

        }).catch((err) => {

            console.error(`An error has occured while trying to register user ${name} with email ${email}: ${err}`);
            res.status(400).json({
                status: -1,
                msg: err
            });

        });


    }


})

app.listen(process.env.PORT, () => {

    console.log(`Server listening on port ${process.env.PORT}`);

})
