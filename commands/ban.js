const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}ban gebruikt!`);
    console.log("----------------");

    // !kick @spelerNaam redenen

    var args = message.content.slice(prefix.length).split(/ +/);

    var permsspelerembed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("jij hebt hier geen permissions voor! ❌");

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(permsspelerembed);

    var permsbotembed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("de bot heeft geen permissions. ❌");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(permsbotembed);

    var args1embed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("gebruiker niet opgegeven. ❌");

    if (!args[1]) return message.reply(args1embed);

    var args2embed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("geen reden opgegeven. ❌");

    if (!args[2]) return message.reply(args2embed);

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var banReason = args.slice(2).join(" ");

    var gebruikerEmbed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("gebruiker niet gevonden. ❌");

    if (!banUser) return message.reply(gebruikerEmbed);

    var stafferrorembed = new discord.MessageEmbed()
    .setTitle("Foutmelding")
    .setColor("#0099ff")
    .setDescription("dit is een stafflid, die kun je niet verbannen! ❌");

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.reply(stafferrorembed);

    var banEmbedVraag = new discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Gelieve binnen 30 seconden te reageren.")
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setDescription(`Weet je zeker dat je ${banUser} wilt bannen om deze reden: ${banReason}?`);

    var banEmbed = new discord.MessageEmbed()
        .setColor("#0099ff")
        .setFooter(message.member.displayName, message.author.avatarURL)
        .setTimestamp()
        .setThumbnail("https://bit.ly/2xn6LXy")
        .addFields(
            { name: "Banned user:", value: `${banUser} (${banUser.id})` },
            { name: "Banned door:", value: message.author },
            { name: "Reden:", value: banReason }
        );



    message.channel.send(banEmbedVraag).then(async msg => {

        var emoji = await promtMessage(msg, message.author, 30, ["✅", "❌"]);

        if (emoji === "✅") {

                var logEmbed = new discord.MessageEmbed()
                .setTitle("Ban")
                .setColor("#0099ff")
                .setThumbnail("https://bit.ly/2xn6LXy")
                .addFields(
                    { name: "Banned user:", value: `${banUser} (${banUser.id})` },
                    { name: "Banned door:", value: message.author },
                    { name: "Reden:", value: banReason }
                )
                .setFooter(message.member.displayName, message.author.avatarURL)
                .setTimestamp();

                var logKanaal = message.member.guild.channels.cache.find(channels => channels.name === "logs");
                logKanaal.send(logEmbed);

            msg.delete();

            banUser.ban(banReason).catch(err => {
                
                if(err) console.log(err);
            });

            message.channel.send(banEmbed);

        } else if (emoji === "❌") {
            msg.delete();

            return message.reply("ban geannuleerd! ❌").then(m => m.delete(5000));
        }

    })


}

module.exports.help = {
    name: "ban",
    description: "Verban iemand uit de server.",
    category: "Moderatie"
}

async function promtMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name)

}