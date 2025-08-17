export const command = async (bot) => {
    const commands = [
        { command: 'start', description: 'Botni ishga tushirish' },
        { command: 'help', description: 'Yordam kerak bo\'lsa' },
        { command: 'empty', description: 'Command bo\'sh ekan' },
        { command: 'reset', description: 'Ro\'yxatdan o\'tishni bekor qilish' },
        { command: 'cancel', description: 'Barchasini bekor qilish' },
    ];

    bot.telegram.setMyCommands(commands)
        .catch(err => console.error(err));
}