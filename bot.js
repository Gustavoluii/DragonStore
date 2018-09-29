const Discord = require("discord.js");
const bot = new Discord.Client();

const PREFIX = "!";

bot.login(process.env.BOT_TOKEN);

bot.on("ready", async => {
    console.log(`${bot.user.username} Está online!`)
    bot.user.setPresence({ status: 'STREAMING', game: { name: `www.mineluii.com`, url: "https://www.twitch.tv/gustavoluii"}});         
});

bot.on("guildMemberAdd", member => {
    console.log(`${member.user.username} entrou no servidor.`);
    var role = member.guild.roles.find("name", "❌ Não Registrado");
    member.addRole(role)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = PREFIX
    if(message.content.startsWith(prefix)){
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (message.content == `<@${bot.user.id}>`) {
        message.channel.send("Olá");
    }
        
    if (message.content.includes("https://discord.gg/")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.delete();
            message.reply("Divulgação.);
        }

    }

if(cmd === `${prefix}r`) { 
    if(!message.member.hasPermission("MANAGE_ROLES")) return;
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Não foi possível encontrar esse usuário.").then(a=>a.delete(5000));
    let gRole = message.guild.roles.find(`name`, `💸 Cliente`);
    let aRole = message.guild.roles.find(`name`, `❌ Não Registrado`);
  
    if(rMember.roles.has(gRole.id)) return message.reply("Esse membro já possui um registro.").then(a=>a.delete(5000));
    await(rMember.addRole(gRole.id));
    message.channel.send(":white_check_mark:  | Membro registrado com sucesso.").then(a=>a.delete(15000));
    await(rMember.removeRole(aRole.id));
    message.delete().catch();
  
    try{
      await rMember.send(`Parabéns <@${rMember.id}>, você foi registrado com sucesso!`)
    }catch(e){
      message.channel.send(` `)
    }
  
    return;
  }

  if(cmd === `${prefix}loading`){
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
      let embed = new Discord.RichEmbed()
      .setColor("RED")
      .setFooter("Aguardando REGISTRO...", "https://i.imgur.com/oWQ1Na3.gif")
      message.channel.send(embed);
  }
  if(cmd === `${prefix}limpar`){
    if (message.channel.type === "dm") return;
    if (message.channel.permissionsFor(message.author).has('MANAGE_MESSAGES')) {
        if (args.length === 0) {
            return;
        } else if (args.length === 1) {
            message.channel.fetchMessages({
                limit: parseInt(args[0]) + 1
            }).then((messages) => {
                message.channel.bulkDelete(messages);
            });
        } else if (args.length === 2) {
            message.channel.fetchMessages({
                limit: parseInt(args[0]) + 1
            }).then((messages) => {
                let bulkMessages = [];
                messages.forEach((i) => {
                    if (i.author.id === args[1].replace(/@|<|>/g, "")) {
                        bulkMessages.push(i);
                    }
                });
                message.channel.bulkDelete(bulkMessages);
            });
        }
  }
}

}
});
