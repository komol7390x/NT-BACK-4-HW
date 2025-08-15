import { config } from "dotenv"
config()

export const env={
    BOT:{
        URL:process.env.BOT_URL,
        TOKEN:process.env.BOT_TOKEN
    }
}