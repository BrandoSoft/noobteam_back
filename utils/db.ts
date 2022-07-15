import {createPool} from "mysql2/promise";

// export const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'noobteamdb',
//     namedPlaceholders: true,
//     decimalNumbers: true
// })

export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    namedPlaceholders: true,
    decimalNumbers: true
})