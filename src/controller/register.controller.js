import { Markup, Scenes, session } from 'telegraf'
import { step } from '../const/step.js'
import axios from 'axios';

const markLocation = Markup.keyboard([[Markup.button.locationRequest('📍 Lokatsiyani yuborish')]]).resize().oneTime();
const markContact = Markup.keyboard([[Markup.button.contactRequest('📱 Raqamni yuborish')]]).resize().oneTime();
const access = Markup.keyboard([['✅ Tasdiqlash', '❌ Rad etish']]).resize().oneTime()

export const registerController = async (bot) => {
    const registration = new Scenes.WizardScene(step.register,
        async (ctx) => {
            try {
                // state bosh massivga tenglashtrib qo'yiladi
                ctx.scene.state.register = {};
                // foydalanuvchidan ism so'raladi 
                const name = ctx.from?.first_name ?? ctx.from?.last_name ?? ctx.from?.username ?? 'USER'
                await ctx.reply('Iltimos ismingizni kiriting matn shaklida yuboring!',
                    Markup.keyboard([[name]]).resize().oneTime())
                return ctx.wizard.next()
            } catch (error) {
                return ctx.reply('Error: ' + error.message)

            }
        },

        async (ctx) => {
            try {
                let name = ctx.from?.first_name ?? ctx.from?.last_name ?? ctx.from?.username ?? 'USER'
                if (!ctx.message || !('text' in ctx.message)) {
                    return await ctx.reply('Faqat matn yuboring ismingizni aniq kiriting',
                        Markup.keyboard([[name]]).resize().oneTime()
                    )
                }
                ctx.scene.state.register.fullName = ctx.message.text
                await ctx.reply('Iltimos telefon raqamngizni yuboring',
                    markContact
                )
                return ctx.wizard.next()
            } catch (error) {
                return ctx.reply('Error: ' + error.message)
            }
        },

        async (ctx) => {
            try {
                if (!ctx.message || !('contact' in ctx.message)) {
                    return await ctx.reply('Iltimos telefongizni pastgi tugma orqali yuboring',
                        markContact
                    )
                }
                const contact = ctx.message.contact
                if (ctx.from.id != contact.user_id) {
                    return ctx.reply('⚠️ Iltimos o\'zingizni telefon raqamngizni yuboring',
                        markContact
                    )
                }
                ctx.scene.state.register.phoneNumber = contact.phone_number
                await ctx.reply('Iltimos lokatsiyani pastgi tugma orqali yuboring',
                    markLocation
                )
                return ctx.wizard.next()
            } catch (error) {
                return await ctx.reply('Error: ' + error.message)
            }
        },

        async (ctx) => {
            try {
                if (!ctx.message || !('location' in ctx.message)) {
                    return await ctx.reply('Iltimos pastgi tugma orqali to\'g\'ri lokatsiyani yuboring')
                }
                const { latitude, longitude } = ctx.message.location
                const mapLocation = (`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                const req = await axios.get(mapLocation)

                ctx.scene.state.register.address = req?.data.display_name.split(',').reverse().slice(2).join(',\n')
                ctx.scene.state.register.location = mapLocation

                const info = ctx.scene.state?.register

                await ctx.reply(`Ism: ${info.fullName ?? 'User'}\nTel: +${info.phoneNumber}\n-------------------------\nLokatsiya\n${info.address}`,
                    access
                )
                return ctx.wizard.next()
            } catch (error) {
                return await ctx.reply('Error: ' + error.message)
            }
        },

        async (ctx) => {
            try {
                if (ctx.message) {
                    if (ctx.message.text == '✅ Tasdiqlash') {
                        // console.log('Tasdiqlash');
                    } else if (ctx.message.text == '❌ Rad etish') {
                        ctx.reply('Barcha so\'rovlar rad etildi \nQayta boshlash uchun /start tugmasini bosing!')
                        delete ctx.scene.state.register
                        return ctx.wizard.next()
                    } else {
                        return ctx.reply('Iltmos pastigi ikki tugmadan birini bosing',
                            access
                        )
                    }
                } else {
                    return ctx.reply('Iltmos pastigi ikki tugmadan birini bosing',
                        access
                    )
                }

            } catch (error) {
                return await ctx.reply('Error: ' + error.message)
            }
        }

    )
    const stage = new Scenes.Stage([registration])
    bot.use(stage.middleware())
    bot.start((ctx) => ctx.scene.enter(step.register))
}
