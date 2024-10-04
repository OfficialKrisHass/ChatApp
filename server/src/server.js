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

    console.log(`${email} ${password}`);

    runQuery("SELECT email, password FROM users WHERE email=?", [email]).then(result => {

        if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {

            res.status(400).json({ errMsg: "Invalid credentials bozo" });
            return;

        }

        const token = jwt.sign({
            email,
            signInTime: Date.now()
        }, process.env.JWT_SECRET_KEY);

        res.status(200).json({
            token,
            msg: "Successfully logged in"
        });

        return;

    }).catch(err => {

        console.log(`An error has occured while trying to auth user.\n${err}`);
        res.status(500).json({ errMsg: "A server error has occured" });

        return;

    });

})

app.listen(process.env.PORT, () => {

    console.log(`Server listening on port ${process.env.PORT}`);

})
