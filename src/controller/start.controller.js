import { Markup } from 'telegraf'
import { startModel } from '../model/start.model.js'
import { arrInArr } from '../utils/loop.menu.js'
import { join } from 'path'

const result = Markup.keyboard(await arrInArr(startModel)).resize()

export const startController = async (ctx) => {
    try {
        const path = join(process.cwd(), 'image', 'burger.jpg')
        const name = ctx.message.chat?.first_name ?? ctx.message.chat.username
        return await ctx.replyWithPhoto(
            { source: path },
            {
                caption: `Assalomu alaykum hurmatli mijoz ${name}\nQuyidaglarni birini tanlang! 👇🏼`,
                ...result
            }
        );
    } catch (error) {
        console.log(error.message);
    }
}