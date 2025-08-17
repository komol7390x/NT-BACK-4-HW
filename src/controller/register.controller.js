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
    bot.command('reset', (ctx) => {
        ctx.scene.leave();
        ctx.reply("♻️ Sessiya tozalandi. Qayta boshlash uchun /start bosing.");
    });

    bot.command('cancel', (ctx) => {
        ctx.scene.leave();
        ctx.reply("❌ Bekor qilindi. Qayta boshlash uchun /start bosing.", Markup.removeKeyboard());
    });
}