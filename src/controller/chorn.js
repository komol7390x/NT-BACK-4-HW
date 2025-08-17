import { Markup, Scenes, session } from 'telegraf'

export const registerController = async (bot) => {
    const regWizard = new Scenes.WizardScene(
        'reg-wizard',
        // 0: Ismni so‘rash
        async (ctx) => {
            ctx.scene.state.data = {};
            await ctx.reply("1/3: Iltimos, to‘liq ismingizni MATN tarzida yuboring.");
            return ctx.wizard.next();
        },
        // 1: Ismni qabul qilish
        async (ctx) => {
            if (ctx.message.text === '/reset') {
                ctx.scene.leave();
                await ctx.reply("♻️ Sessiya tozalandi. Qayta boshlash uchun /start bosing.");
                return; // ❗️ bu juda muhim, keyingi stepga o'tmaslik uchun
            }
            if (!ctx.message || !('text' in ctx.message)) {
                await ctx.reply("❗️ Faqat matn yuboring: ismingizni yozing.");
                return;
            }
            ctx.scene.state.data.fullName = ctx.message.text.trim();

            await ctx.reply(
                "2/3: Endi telefon raqamingizni tugma orqali yuboring.",
                Markup.keyboard([[Markup.button.contactRequest('📱 Raqamni yuborish')]])
                    .resize()
                    .oneTime()
            );
            return ctx.wizard.next();
        },
        // 2: Telefonni qabul qilish
        async (ctx) => {
            if (ctx.message.text === '/reset') {
                ctx.scene.leave();
                await ctx.reply("♻️ Sessiya tozalandi. Qayta boshlash uchun /start bosing.");
                return; // ❗️ bu juda muhim, keyingi stepga o'tmaslik uchun
            }
            if (!ctx.message || !('contact' in ctx.message)) {
                await ctx.reply(
                    "❗️ Pastdagi tugma orqali o‘zingizning kontaktingizni yuboring.",
                    Markup.keyboard([[Markup.button.contactRequest('📱 Raqamni yuborish')]]).resize()
                );
                return;
            }

            const c = ctx.message.contact;
            if (c.user_id && ctx.from && c.user_id !== ctx.from.id) {
                await ctx.reply("⚠️ Faqat o‘zingizning kontaktingizni yuboring.");
                return;
            }

            ctx.scene.state.data.phone = c.phone_number;

            await ctx.reply(
                "3/3: Lokatsiyangizni yuboring.",
                Markup.keyboard([[Markup.button.locationRequest('📍 Lokatsiyani yuborish')]])
                    .resize()
                    .oneTime()
            );
            return ctx.wizard.next();
        },
        // 3: Lokatsiyani qabul qilish
        async (ctx) => {
            if (!ctx.message || !('location' in ctx.message)) {
                await ctx.reply(
                    "❗️ Pastdagi tugma orqali lokatsiyani yuboring.",
                    Markup.keyboard([[Markup.button.locationRequest('📍 Lokatsiyani yuborish')]]).resize()
                );
                return;
            }
            if (ctx.message.text === '/reset') {
                ctx.scene.leave();
                await ctx.reply("♻️ Sessiya tozalandi. Qayta boshlash uchun /start bosing.");
                return; // ❗️ bu juda muhim, keyingi stepga o'tmaslik uchun
            }
            const { latitude, longitude } = ctx.message.location;
            const data = ctx.scene.state.data;
            const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;

            await ctx.reply(
                [
                    "✅ Ma’lumotlar qabul qilindi:",
                    `• Ism: ${data.fullName}`,
                    `• Telefon: ${data.phone}`,
                    `• Lokatsiya: ${latitude}, ${longitude}`,
                    `• Xarita: ${mapsLink}`
                ].join('\n'),
                Markup.removeKeyboard()
            );

            return ctx.scene.leave();
        }
    );

    const stage = new Scenes.Stage([regWizard]);
    bot.use(session());
    bot.use(stage.middleware());

    // start komandasi
    bot.start((ctx) => ctx.scene.enter('reg-wizard'));

    // reset / cancel komandalar
    bot.command('reset', async (ctx) => {
        await ctx.scene.leave(); // hozirgi jarayonni to‘xtat
        await ctx.reply("♻️ Sessiya tozalandi. Qayta boshlaymiz...");
        return ctx.scene.enter('reg-wizard'); // boshidan qayta boshlash
    });

    // /cancel komandasi - faqat chiqib ketadi
    bot.command('cancel', async (ctx) => {
        await ctx.scene.leave();
        return ctx.reply("❌ Jarayon bekor qilindi. Qayta boshlash uchun /start bosing.", Markup.removeKeyboard());
        return ctx.scene.enter('reg-wizard'); // boshidan qayta boshlash
    });
}

// -------------------------------------------------------------

const { Telegraf, Scenes, session } = require('telegraf')

// 3 bosqichli ro‘yxatdan o‘tish
const registration = new Scenes.WizardScene(
    'registration_user',
    async (ctx) => {
        await ctx.reply('Ismingiz?')
        return ctx.wizard.next() // 2-bosqichga
    },
    async (ctx) => {
        ctx.wizard.state.name = ctx.message.text
        await ctx.reply('Telefon raqamingiz?')
        return ctx.wizard.next() // 3-bosqichga
    },
    async (ctx) => {
        ctx.wizard.state.phone = ctx.message.text
        await ctx.reply(`Rahmat, ${ctx.wizard.state.name}! Ro‘yxatdan o‘tdingiz.`)
        // Ro‘yxatdan o‘tish tugadi -> keyingi sceniya
        return ctx.scene.enter('next_step')
    }
)

// Keyingi sceniya (misol)
const nextStep = new Scenes.BaseScene('next_step')
nextStep.enter((ctx) => ctx.reply('Keyingi bosqichga xush kelibsiz!'))

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Scenes.Stage([registration, nextStep])

bot.use(session())
bot.use(stage.middleware())
bot.start((ctx) => ctx.scene.enter('registration_user'))

bot.launch()
