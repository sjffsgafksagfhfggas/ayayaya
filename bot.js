const { time } = require('console');
const Discord = require('discord.js');
const got = require('got');
const db = require('quick.db');
const axios = require('axios')
const Commando = require('discord.js-commando')

const client = new Discord.Client()

const prefix = '/';
      
const fs = require('fs');
const { type } = require('os');
const { match } = require('assert');
const { get } = require('http');
const { url } = require('inspector');

client.on('ready', () => {
  console.log('Fucking bot is on!')
});
client.on('message', async Message => {
  if(!Message.content.startsWith(prefix) || Message.author.bot) return;
  const args = Message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "invite"){
    const invite = new Discord.MessageEmbed()
        .setColor('#7c00ff')
        .setThumbnail(Message.author.displayAvatarURL())
        .setAuthor(`${Message.author.tag}`, `${Message.author.displayAvatarURL()}`)
        .setDescription('Invite link: https://discord.gg/8bjz4ZJ')
        .setTimestamp(Date.now());
    Message.channel.send(invite);
  }
//  else if(command == 'ping'){
//    Message.reply('درحال گرفتن پینگ...').then((resultMessage) => {
//      const ping = resultMessage.createdTimestamp - Message.createdTimestamp
//      resultMessage.edit(`پینگ شما: ${client.ws.ping}`)
//    })
//}
//}
  else if(command == 'c'){
    if(Message.member.permissions.has("MANAGE_MESSAGES")){
      const nonumc = new Discord.MessageEmbed()
      .setColor('#7c00ff')
      .setDescription('لطفا برای پاک کردن پیامی عددی را وارد کنید!')
      if(isNaN(args[0]) || parseInt(args[0]) <= 0) { return Message.channel.send(nonumc) }
      if(parseInt(args[0]) > 100) {
        const morec = new Discord.MessageEmbed()
        .setColor('#7c00ff')
        .setDescription('شما بیشتر از 100 پیام را نمیتوانید پاک کنید!')
        return Message.channel.send(morec)
      } else {
        deleteAmount = parseInt(args[0]);
      }
  
      Message.channel.bulkDelete(deleteAmount + 1, true);
      const delsec = new Discord.MessageEmbed()
      .setColor('#7c00ff')
      .setTitle('موفق')
      .setDescription(`با موفقیت ${deleteAmount} پیام پاک شد!`)
      Message.author.send(delsec)
      }else {
        const cem = new Discord.MessageEmbed()
        .setTitle('ناموفق')
        .setDescription('شما اجازه ی پاک کردن پیام ها را ندارید!')
        .setColor('#7c00ff')
        .setTimestamp(Date.now())
        Message.channel.send(cem)
    }
  }
  else if(command == 'status'){
    if(Message.author.id == '614874230042918931'){
      const content = Message.content.replace('/status ', '')
      Message.delete()
      client.user.setPresence({
        activity: {
          name: content,
          type: "STREAMING",
          url: "https://www.twitch.tv/https://discord.gg/8bjz4ZJ"
        }
      })
    }
    else{
      const statusno = new Discord.MessageEmbed()
      .setTitle('شرمنده داداش')
      .setDescription('فقظ دولوپر میتونه استوسو عوض کنه!')
      .setColor('7c00ff')
      Message.channel.send(statusno)
    }
  }
  else if(command == 'help'){
    const help = new Discord.MessageEmbed()
    .setTitle('راهنما')
    .addField('/invite', 'برای گرفتن لینک اینوایت')
    .addField('/info', 'برای دیدن مشخصات خود')
    .addField('/scmds', 'برای دیدن کامند های سرگرم کننده')
    .addField('/bot', 'برای دیدن مشخضات بات')
    .addField('/user + fard', 'برای دیدن مشخصات کسی')
    .addField('/mdt', 'برای دیدن کامند های ادمین')
    .setColor('#7c00ff')
    .setTimestamp(Date.now())
    .setFooter('Developed by Abbas ST')
    Message.channel.send(help)
  }
  else if(command == 'scmds'){
    const scmds = new Discord.MessageEmbed()
    .setTitle('کامند های سرگرم کننده')
    .addField('/meme', 'برای دیدن میم')
    .addField('/man', 'برای استفاده از هوش مصنوعی برای خود')
    .addField('/oon', 'برای استفاده هوش مصنوعی برای پروفایل دیگران')
    .setColor('#7c00ff')
    .setTimestamp(Date.now())
    Message.channel.send(scmds)
  }
  else if(command == 'mdt'){
    if(Message.member.permissions.has("ADMINISTRATOR")){
      const mdt = new Discord.MessageEmbed()
      .setTitle('کامند های ادمین ها')
      .addField('/c + num', 'برای پاک کردن تعدادی پیام')
      .addField('/kick', 'برای کیک کردن کسی')
      .addField('/ban', 'برای بن کردن کسی')
      .setColor('#7c00ff')
      .setTimestamp(Date.now())
      const mdtc = new Discord.MessageEmbed()
      .setDescription('کامند ها در پیوی شما ارسال شد!')
      .setColor('#7c00ff')
      Message.channel.send(mdtc)
      Message.author.send(mdt)
    }
    else{
      const mdte = new Discord.MessageEmbed()
      .setDescription('شما ادمین نیستید!')
      .setColor('#7c00ff')
      Message.channel.send(mdte)
    }
  }
  else if (command == 'meme'){
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/memes/random/.json').then(response => {
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;
      let memeNumComments = content[0].data.children[0].data.num_comments;
      embed.setColor('RANDOM')
      embed.setImage(memeImage)
      embed.setColor('#7c00ff')
      embed.setTimestamp(Date.now())
      Message.channel.send(embed)
    }).catch(console.error);
}
else if(command == 'man'){
  const fetch = require("node-fetch");
  fetch(`https://api.codebazan.ir/caption/?pic=${Message.author.displayAvatarURL({ dynamic: true, size: 2048})}`).then(res => res.json())
      .then(json => {
          Message.channel.send(new Discord.MessageEmbed().setColor('#7c00ff').setTitle(`
          ${json.messagefa} 
           `).setImage(Message.author.displayAvatarURL({ dynamic: true, size: 2048})))
      })
}
else if(command == 'oon'){
  let user = Message.mentions.users.first() || Message.author
  const fetch = require("node-fetch");
  fetch(`https://api.codebazan.ir/caption/?pic=${user.displayAvatarURL({ dynamic: true, size: 2048})}`).then(res => res.json())
      .then(json => {
          Message.channel.send(new Discord.MessageEmbed().setColor('#7c00ff').setTitle(`
          ${json.messagefa} 
           `).setImage(user.displayAvatarURL({ dynamic: true, size: 2048})))
      })
    }
  else if(command == 'user'){
    let user = Message.mentions.users.first() || Message.author
    const usere = new Discord.MessageEmbed()
    .setTitle('مشخصات')
    .setAuthor(`${user.tag}`, `${user.displayAvatarURL()}`)
    .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
    .setTimestamp(Date.now())
    .setColor('#7c00ff')
    .addField('تاریخ ساخت اکانت دیسکورد: ', user.createdAt.toDateString())
    .addField('یوزرنیم: ', user.tag)
    .addField('آیدی عددی: ', user.id)
    .addField('وضعیت: ', user.presence !== null && user.presence.status !== null ? user.presence.status : "آفلاین")
    Message.channel.send(usere);
  }
  else if(command == 'info'){
    const info = new Discord.MessageEmbed()
    .setTitle('مشخصات')
    .setAuthor(`${Message.member.user.tag}`, `${Message.member.user.displayAvatarURL()}`)
    .setImage(Message.author.displayAvatarURL({ size: 2048, dynamic: true }))
    .setTimestamp(Date.now())
    .setColor('#7c00ff')
    .addField('تاریخ ساخت اکانت دیسکورد: ', Message.member.user.createdAt.toDateString())
    .addField('تاریخ ورود به سرور: ', Message.member.joinedAt.toDateString())
    .addField('یوزرنیم: ', Message.author.tag)
    .addField('آیدی عددی: ', Message.author.id)
    .addField('بالاترین رول: ', Message.member.roles.highest.name)
    .addField('وضعیت: ', Message.member.presence !== null && Message.member.presence.status !== null ? Message.member.presence.status : "آفلاین")
    Message.channel.send(info);
  }
  else if(command == 'bot'){
    const botinfo = new Discord.MessageEmbed()
    .setTitle('مشخصات بات')
    .addField('یوزرنیم بات: ',client.user.tag)
    .addField('آیدی عددی: ', client.user.id)
    .addField('دولوپر: ', 'Abbas ST#2442')
    .addField('اونر بات: ', 'Abbas ST#2442')
    .setTimestamp(Date.now())
    .setColor('#7c00ff')
    .setImage(client.user.avatarURL({ size: 2048, dynamic: true }))
    Message.channel.send(botinfo)
    }
  else if(command == 'bib'){
    if (!Message.guild.member(client.user).hasPermission('ATTACH_FILES')) return message.reply('Sorry, i dont have the perms to do this cmd i need ATTACH_FILES. :x:')
    const rp = require('request-promise-native')
      return rp.get('http://api.oboobs.ru/boobs/0/1/random').then(JSON.parse).then(function(res){
          return rp.get({
              url:'http://media.oboobs.ru/' + res[0].preview,
              encoding: null
          });
        }).then(function(res)   {
          if (Message.channel.nsfw) return Message.channel.send({ files: [{ attachment: res, name: 'tits.png' }] }).catch(console.error);
      });
  }
  else if(command == 'kick'){
    if(Message.member.permissions.has("KICK_MEMBERS")){
      const user = Message.mentions.users.first();
      if (user) {
        const member = Message.guild.member(user);
        if (member) {
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              const emmofki = new Discord.MessageEmbed()
              .setColor('#7c00ff')
              .setTitle('موفق!')
              .setDescription('با موفق فرد مورد نظر کیک شد!')
              .setTimestamp(Date.now())
              Message.reply(emmofki);
            })
            const cantk = new Discord.MessageEmbed()
            .setTitle('ناموفق')
            .setDescription('من اجازه یکیک کردن کسی رو ندارم!')
            .setColor('#7c00ff')
            .catch(err => {
              Message.channel.send(cantk);
              console.error(err);
            });
        } else {
          Message.reply("That user isn't in this guild!");
        }
      } else {
        const menk = new Discord.MessageEmbed()
        .setTitle('ناموفق')
        .setDescription('کسی را برای کیک کردن منشن کنید!')
        .setColor('#7c00ff')
        Message.channel.send(menk);
      }
    }else{
      const naembed = new Discord.MessageEmbed()
      .setTitle('ناموفق')
      .setAuthor(`${Message.author.tag}`, `${Message.author.displayAvatarURL()}`)
      .setThumbnail(Message.author.displayAvatarURL({dynamic: true,format: "png", size: 1024}))
      .setDescription('شما اجازه ی کیک کردن را ندارید!')
      .setColor('#7c00ff')
      .setTimestamp(Date.now())
      Message.channel.send(naembed)
    }
  }
  else if(command == 'ban'){
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        const secban = new Discord.MessageEmbed()
        .setTitle('موفق')
        .setDescription('فرد مورد نظر با موفقیت بن شد!')
        .setColor('#7c00ff')
        message.channel.send(secban)
      } else {
        const mensb = new Discord.MessageEmbed()
        .setTitle('ناموفق')
        .setDescription('یک نفر را برای بن کردن منشن کنید!')
        .setColor('#7c00ff')
        message.channel.send(mensb)
      }
    } else {
      const ycanb = new Discord.MessageEmbed()
      .setTitle('ناموفق')
      .setDescription('شما اجازه ی بن کردن کسی را نذارید!')
      .setColor('#7c00ff')
      message.channel.send(ycanb)
    }
  }
else if(command == 'say'){
  const say = args.join(" ");
  Message.delete().catch(O_o => {});
  Message.channel.send(`${say}`);
}
//else if(command == 'dm'){
//  if (!Message.member.hasPermission("ADMINISTRATOR"))  return;
//  let args = Message.content.split(" ").slice(1);
//  var argresult = args.join(' '); 
//  Message.author.send(m => {
//    m.send(`${argresult}\n ${m}`);
//});
//}
//else if(command == `user`){
//  Message.guild.members.cache.forEach(member => {
//  const info = new Discord.MessageEmbed()
//  .setTitle('Profile')
//  .setAuthor(`${Message.author.tag}`, `${Message.author.displayAvatarURL()}`)
//  .setThumbnail('https://cdn.discordapp.com/attachments/634682986767319040/767641137653350430/bf1b4b5616393f72.gif')
//  .setImage(Message.author.displayAvatarURL({ size: 2048, dynamic: true }))
//  .setTimestamp(Date.now())
//  .setColor('#7c00ff')
//  .addField('Username: ', Message.author.tag)
//  .addField('Id: ', Message.author.id)
//  Message.channel.send(info)
//}
});
///////////////////////////////////////////
const channelIdm = '769113582796800031'
const updateMembers = (guild) => {
  if (guild) {
    const channel = guild.channels.cache.get(channelIdm)
    if (channel) {
      channel.setName(`「👥」Members: ${guild.memberCount.toLocaleString()}`)
    }
  }
}
client.on('guildMemberAdd', (member) => updateMembers(member.guild))
client.on('guildMemberRemove', (member) => updateMembers(member.guild))
const guild = client.guilds.cache.get('626815637242642449')
updateMembers(guild)
//////////////////////////////////////////////
const channelId = '768764242177556480'
client.on('guildMemberAdd', (member) => {
  const welcomeembed = new Discord.MessageEmbed()
  .setColor('#7c00ff')
  .setAuthor(member.user.username, member.user.avatarURL())
  .setTitle('خوش آمدید')
  .setImage(member.guild.iconURL({dynamic: true,format: "png", size: 1024}))
  .setDescription(`سلام ${member} خوش اومدی به سرور ما🤩🥳`)
  .setThumbnail(member.user.displayAvatarURL({dynamic: true,format: "png", size: 1024}))
  .setTimestamp(Date.now())
  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) return;
  channel.send(welcomeembed);
})
  const channelIdb = '768764385656569856'
  client.on('guildMemberAdd', (member) => {
    const byeembed = new Discord.MessageEmbed()
    .setColor('#7c00ff')
    .setDescription(`${member.user.tag} کاش از پیشمون نمیرفتی🙁`)
    const channel = member.guild.channels.cache.get(channelIdb);
    if (!channel) return;
    channel.send(byeembed);
});
client.login(process.env.TOKEN);