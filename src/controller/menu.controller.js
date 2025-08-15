import { Markup } from 'telegraf'
import { menuModel } from '../model/menu.model.js'
import { arrInArr, menuObj } from '../utils/loop.menu.js'
import { join } from 'path'

export const menuController = async (ctx) => {
    try {
        const name = ctx.message.chat?.first_name ?? ctx.message.chat.username
        ctx.reply(`Hurmatli ${name}\nQuyidaglarni birini tanlang! 👇🏼`)
        const menu = await menuObj(menuModel)
        for (let i = 0; i < menu.length; i++) {
            const path = join(process.cwd(), 'image', menu[i].image)
            await ctx.replyWithPhoto(
                { source: path },
                {
                    caption: `🥙:  ${menu[i].name}\n1️⃣-porsiyasi ${menu[i].price} so\'m\nTanlang 🙂`,
                    ...Markup.inlineKeyboard([
                        Markup.button.callback('🛒 Tanlash', `select_${menu[i].id}`)
                    ]).resize()
                }, {

            }
            );
        }
    } catch (error) {
        console.log(error.message);
    }
}