import {startController} from '../controller/start.controller.js'
export const router = async (bot) => {    
    bot.start(ctx => {
        startController(ctx)
    })

    bot.help(ctx => {
        if (ctx.message) {
            const name = ctx.message.chat?.first_name ?? ctx.message.chat.username
            return ctx.reply('Hurmatli ' + name + '\nBiz bilan bog\'lanish uchun!\n@Komol7390x bog\'laning :)')
        }
    })
}