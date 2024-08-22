import mysql from "mysql2"

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: "chat_app"
}).promise(); 

console.log("Connected to the database");

async function runQuery(query, params) {

    const [rows] = await pool.query(query, params);
    return rows;

}

export default runQuery;
