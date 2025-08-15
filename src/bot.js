import { Telegraf } from "telegraf";

import {env} from './config/env.config.js'
import { command } from "./command/bot.command.js";
import { router } from "./routes/index.route.js";
const token=env.BOT.TOKEN

const bot=new Telegraf(String(token))

await command(bot)
// await createDatabasa()
await router(bot)


bot.launch()
console.log('Bot started');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
