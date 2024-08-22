import express from "express";

import runQuery from "./database.js";

const app = express();

app.listen(process.env.PORT, () => {

    console.log(`Server listening on port ${process.env.PORT}`);

})
