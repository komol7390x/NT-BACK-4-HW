import { Markup } from 'telegraf'
import { startModel } from '../model/start.model.js'
export const startController = async (ctx) => {
    const name = ctx.message.chat?.first_name ?? ctx.message.chat.username
    // return ctx.reply('Assalumu alaykum hurmatli ' + name,
    //     Markup.keyboard([['Menu', 'Sozlamalar']]).resize())
}