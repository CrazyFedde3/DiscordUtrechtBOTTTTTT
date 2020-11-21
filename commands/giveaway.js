const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;
const ms = require("ms");

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}giveaway gebruikt!`);
            console.log("----------------");

            const { MessageEmbed } = require("discord.js");
  
    if (!args[0]) return message.channel.send(`Je hebt geen tijd opgegeven. :x:`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m") &&
      !args[0].endsWith("s")
    )
      return message.channel.send(
        `Je hebt niet de juiste tijd op gegeven. :x:`
      );
    if (isNaN(args[0][0])) return message.channel.send(`Dat is geen nummer! :x:`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `Ik kan dat kanaal niet vinden  :x:`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`Geen prijs opgegeven! :x:`);
    message.channel.send(`*Giveaway aangemaakt in ${channel}*`);
    let Embed = new MessageEmbed()
      .setTitle(`Nieuwe giveaway!`)
      .setDescription(
        `Host: ${message.author} \n Prijs: **${prize}**`
      )
      .setColor(`#0099ff`)
      .setThumbnail("https://bit.ly/2xn6LXy")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp(Date.now() + ms(args[0]));
      channel.send(`${message.guild.roles.cache.get(`710234800417669210`)}`)
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        channel.send(`Aantal gereageerde mensen: ${m.reactions.cache.get("🎉").count}`);
        return channel.send(
          `Niet genoeg mensen hebben gereageerd om te kunnen winnen! :x:`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `${winner} heeft **${prize}** gewonnen! Maak een ticket aan met: u!new/u!ticket in <#663845492928544821> om de prijs te claimen.`
      );
    }, ms(args[0]));
  },


module.exports.help = {
    name: "giveaway",
    description: "Maak een giveaway.",
    category: "Fun"
}