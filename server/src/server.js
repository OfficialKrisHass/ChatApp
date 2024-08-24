import express from "express";

import runQuery from "./database.js";

const APIInfo = {
    name: "Chat app API",
    version: "0.1",
}

const app = express();

app.get("/", (req, res) => {

    res.status(200).json(APIInfo);

})

app.listen(process.env.PORT, () => {

    console.log(`Server listening on port ${process.env.PORT}`);

})
