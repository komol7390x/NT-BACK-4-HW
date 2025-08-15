import { Telegraf } from "telegraf";
import {env} from './config/env.config.js'
import { join } from "path";
import { command } from "./command/bot.command.js";

const token=env.BOT.TOKEN

const bot=new Telegraf(String(token))

const baseKeyboard=[
    'Menu','Sozlamalar','Biz haqimizada','Savat'
]
await command(bot)

bot.start(ctx=>{
    const name=ctx.message.chat?.first_name??ctx.message.chat.username
    return ctx.reply('Assalumu alaykum hurmatli '+name)
})

bot.help(ctx=>{
    if(ctx.message){
        const name=ctx.message.chat?.first_name??ctx.message.chat.username
        return ctx.reply('Hurmatli '+name+'\nBiz bilan bog\'lanish uchun!\n@Komol7390x bog\'laning :)')
    }
})

bot.launch()
console.log('Bot started');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
