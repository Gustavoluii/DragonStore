var fila = []
const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "!";
const LOGO = "https://i.imgur.com/Hk5HzH5.png";

bot.login(process.env.BOT_TOKEN);

bot.on("ready", () => {
    bot.user.setGame("dragoncss.com")
});

bot.on("ready", function() {
    console.log("Estou online!");
});

bot.on('message', function (message) {
    var achar = fila.indexOf(message.author.id)
    if (achar >= 0 ) return
    else if (0 >= achar){
    fila.push(message.author.id)
    setTimeout(() =>{
    var achar2 = fila.indexOf(message.author.id)
    if (achar2 == null ) return
    fila.splice(achar2,1)
    },3000)
}
    if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);
	
	let args = message.content.split(" ").slice(1);
    
    if (command === "anunciar") {
        if (message.member.hasPermission("ADMINISTRATOR")) {

            const text = args.slice(0.5).join(" ");
             if (text.length < 0.5) return message.channel.send("Você precisa por alguma mensagem!").then((value) => {
               setTimeout(() => {
                    value.delete();
                }, 5000);
            });
            const embed = new Discord.RichEmbed()
            .setColor("#FFBF00")
            .setAuthor("Anúncio - DragonStore", LOGO)
            .setFooter(`• Anúncio feito por: ${message.author.username}`,message.member.user.displayAvatarURL)
            .setDescription(text);
            message.channel.send("@everyone")
            message.delete().catch();
            message.channel.send({embed})
        
        }
    
    }
})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    if(cmd === `${prefix}ban`){
  
     let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!bUser) return message.channel.send("Membro não encontrado.");
     let bReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("❌ | Você não tem permissão!");
     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("❌ | Essa pessoa não pode ser banida, porque ele possui um cargo superior ao meu.");
  
     let banEmbed = new Discord.RichEmbed()
     .setDescription("⛔ | Banimento:")
     .setColor("#bc0000")
     .setImage("https://i.imgur.com/VNY0oqd.gif")
     .addField("Membro Banido:", `${bUser}`)
     .addField("Banido por:", `<@${message.author.id}>`)
     .addField("Motivo:", bReason)
  
     let incidentchannel = message.guild.channels.find(`name`, "punições");
     if(!incidentchannel) return message.channel.send("Não foi possível encontrar o canal de punições.");
  
     message.guild.member(bUser).ban(bReason);
     incidentchannel.send(banEmbed);
     message.channel.send("⚠ | Membro Banido!");
    
  
     return;
    }
    if(cmd === `${prefix}kick`){


        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Membro não encontrado.");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ | Você não tem permissão!");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ | Essa pessoa não pode ser expulsa.");
      
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Expulso:")
        .setColor("#e56b00")
        .addField("Membro Expulso", `${kUser} ID ${kUser.id}`)
        .addField("Expulso por", `<@${message.author.id}> ID ${message.author.id}`)
        .addField("Expulso no Chat", message.channel)
        .addField("Data e Hora", message.createdAt)
        .addField("Motivo", kReason);
      
        let kickChannel = message.guild.channels.find(`name`, "punições");
        if(!kickChannel) return message.channel.send("Não foi possível encontrar o canal de punições.");
      
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
        message.channel.send("⚠ | Membro Expulso!");
      
        return;
      }

      if(cmd === `${prefix}setartag`){

        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Você não possui permissão para fazer isso.");
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.reply("Não foi possível encontrar esse usuário.");
        let role = args.join(" ").slice(22);
        if(!role) return message.reply("Especifique um cargo!");
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.reply("Cargo não encontrado.");
      
        if(rMember.roles.has(gRole.id)) return message.reply("Esse membro já possui esse cargo.");
        await(rMember.addRole(gRole.id));
        message.channel.send(":white_check_mark: | Cargo setado!");
      
        try{
          await rMember.send("Parabéns, agora você possui o cargo `" + gRole.name +"` em nosso Discord.")
        }catch(e){
          message.channel.send(`Parabéns <@${rMember.id}>, agora você possui o cargo ${gRole.name}. em nosso Discord.`)
        }
      
        return;
      }
      
      if(cmd === `${prefix}removertag`){
      
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Você não possui permissão para fazer isso.");
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.reply("Não foi possível encontrar esse usuário.");
        let role = args.join(" ").slice(22);
        if(!role) return message.reply("Especifique um cargo!");
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.reply("Cargo não encontrado.");
        message.channel.send(":white_check_mark: | Cargo removido!");
      
        if(!rMember.roles.has(gRole.id)) return message.reply("Esse membro não possui nenhum cargo.");
        await(rMember.removeRole(gRole.id));
      
        return;
      }
      
      if(cmd === `${prefix}limpar`){
      
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
      if(!args[0]) return message.channel.send("Especifique quantas linhas.").then(msg => msg.delete(5000));
      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Limpei ${args[0]} mensagens.`).then(msg => msg.delete(5000));
      });
      }

      if(cmd === `${prefix}loja`){
          let lojaembed = new Discord.RichEmbed()
          .setAuthor("DragonStore - Loja", LOGO)
          .setDescription("❌ | Site em manutenção! para fazer a compra chame o **@dragon#7632** no Privado.")
          //.setTitle(`Clique aqui para acessar a loja! :moneybag:`)
         // .setURL("https://dragoncss.com")
          .setColor("#FFBF00");
          message.channel.sendEmbed(lojaembed);
      }

      if(cmd === `${prefix}produtos`){
          let produtosembed = new Discord.RichEmbed()
          .setAuthor("DragonStore - Produtos", LOGO)
          .addField("Produtos e Preços", "\nMinecraft Full Acesso: **R$14,99**\nCapa da Optifine: **R$20**\nConta Alternativa: **R$1,50**\n")
          .setFooter("Para mais informações acesse dragoncss.com ou #produtos.")
          .setColor("#FFBF00");
          message.channel.sendEmbed(produtosembed);
      }
});
