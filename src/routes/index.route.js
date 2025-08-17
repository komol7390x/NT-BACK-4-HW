import { startController } from '../controller/start.controller.js'
import { startModel } from '../model/start.model.js'
import { arrayMenu } from '../utils/loop.menu.js'
import { menuController } from '../controller/menu.controller.js'

const arr = await arrayMenu(startModel)

export const router = async (bot) => {
    bot.start(ctx => {
        startController(ctx)
    })

    bot.hears(arr, (ctx) => {
        const name = ctx.update.message.text
        ctx.reply(`Siz ${name} tanlandingiz  😊`)
        if (name == 'Menu') {
            menuController(ctx)
        } else if (name == 'Yordam') {
            console.log(name);
        } else if (name == 'Sozlamalar') {
            console.log(name);
        } else if (name == 'Buyurtmalar tarixi') {
            console.log(name);
        }
    });

    bot.help(ctx => {
        if (ctx.message) {
            const name = ctx.message.chat?.first_name ?? ctx.message.chat.username
            return ctx.reply('Hurmatli ' + name + '\nBiz bilan bog\'lanish uchun!\n@Komol7390x bog\'laning :)')
        }
    })

}

