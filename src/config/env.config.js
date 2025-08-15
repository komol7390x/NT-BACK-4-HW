import { config } from "dotenv"
config()

export const env = {
    BOT: {
        URL: process.env.BOT_URL,
        TOKEN: process.env.BOT_TOKEN
    },
    DATABASE: {
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USER,
        PASS: process.env.DB_PASSWORD,
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_PORT,
        DIALECT: process.env.DIALECT,
    }
}