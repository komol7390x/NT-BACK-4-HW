export const deleteMessageTelegram = (bot) => {
    // Har bir chatdagi barcha xabar ID’larini saqlash
    const allMessages = new Map(); // chatId -> [message_id, ...]

    bot.on('text', async (ctx) => {
        const chatId = ctx.chat.id;

        // Agar chat uchun massiv bo‘lmasa, yaratamiz
        if (!allMessages.has(chatId)) {
            allMessages.set(chatId, []);
        }

        // Foydalanuvchi xabarini ham ro‘yxatga qo‘shamiz
        allMessages.get(chatId).push(ctx.message.message_id);

        // Barcha saqlangan xabarlarni o‘chirib tashlaymiz
        for (const id of allMessages.get(chatId)) {
            try {
                await ctx.deleteMessage(id);
            } catch (e) {
                // Xatoni e'tiborsiz qoldiramiz (masalan, ruxsat yo‘q bo‘lsa)
            }
        }

        // Oxirida massivni tozalaymiz (hammasi o‘chdi)
        allMessages.set(chatId, []);
    });
};
