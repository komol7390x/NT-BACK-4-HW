import { config } from "dotenv"
config()

export const env = {
  BOT: {
    URL: process.env.BOT_URL,
    TOKEN: process.env.BOT_TOKEN
  },
  DATABASE: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  }
};
