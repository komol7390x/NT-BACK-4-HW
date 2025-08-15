export const startController=async(ctx)=>{
    const name = ctx.message.chat?.first_name ?? ctx.message.chat.username
        return ctx.reply('Assalumu alaykum hurmatli ' + name)
        
}