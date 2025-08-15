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
const filePath=join(process.cwd(),'1.png')
const foods=[
    {
        id:1,
        name:'Mastava',
        image:filePath
    },
    {
        id:2,
        name:'Osh',
        image:filePath
    },
    {
        id:3,
        name:'Shorva',
        image:filePath
    },
    {
        id:4,
        name:'Xonim',
        image:filePath
    },
]

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
