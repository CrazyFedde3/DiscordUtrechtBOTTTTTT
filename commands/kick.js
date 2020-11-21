const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    // !kick @spelerNaam redenen

    var args = message.content.slice(prefix.length).split(/ +/);

    var kickpermsembederror = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("jij hebt hier geen permissions voor! ❌");

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(kickpermsembederror);

    var botpermserror = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("de bot heeft geen permissions. ❌");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(botpermserror);

    var gebruikeropgevenerrorembed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Gebruiker niet opgegeven. ❌");

    if (!args[1]) return message.reply(gebruikeropgevenerrorembed);

    var redenerror = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Reden niet opgegeven. ❌");

    if (!args[2]) return message.reply(redenerror);

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var kickReason = args.slice(2).join(" ");

    var gebruikernietkunnenvindenerrorEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Gebruiker niet gevonden. ❌");

    if (!kickUser) return message.reply(gebruikernietkunnenvindenerrorEmbed);

    var stafflidheeftpermsduskunjenietkickenEmbed = new discord.MessageEmbed()
            .setTitle("Foutmelding")
            .setColor("#0099ff")
            .setDescription("Dit is een stafflid, die kun je niet kicken! ❌");

    if(kickUser.hasPermission("MANAGE_MESSAGES")) return message.reply(stafflidheeftpermsduskunjenietkickenEmbed);

            console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}kick gebruikt!`);
            console.log("----------------");

    var kickEmbedVraag = new discord.MessageEmbed()
        .setColor("#0099ff")
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setTitle("Gelieve binnen 30 seconden te reageren.")
        .setDescription(`Weet je zeker dat je ${kickUser} wilt kicken om deze reden: ${kickReason}?`);

    var embed = new discord.MessageEmbed()
        .setColor("#0099ff")
        .setFooter(message.member.displayName, message.author.avatarURL)
        .setTimestamp()
        .setThumbnail("https://bit.ly/2xn6LXy")
        .addFields(
            { name: "Kicked user:", value: `${kickUser} (${kickUser.id})` },
            { name: "Kicked door:", value: message.author },
            { name: "Reden:", value: kickReason }
        );

    message.channel.send(kickEmbedVraag).then(async msg => {

        var emoji = await promtMessage(msg, message.author, 30, ["✅", "❌"]);

        if (emoji === "✅") {

            var logEmbed = new discord.MessageEmbed()
                .setTitle("Kick")
                .setColor("#0099ff")
                .setThumbnail("https://bit.ly/2xn6LXy")
                .addFields(
                    { name: "Kicked user:", value: `${kickUser} (${kickUser.id})` },
                    { name: "Kicked door:", value: message.author },
                    { name: "Reden:", value: kickReason }
                )
                .setFooter(message.member.displayName, message.author.avatarURL)
                .setTimestamp();

                var logKanaal = message.member.guild.channels.cache.find(channels => channels.name === "logs");
                logKanaal.send(logEmbed);

            msg.delete();

            kickUser.kick(kickReason).catch(err => {
                if(err) return message.reply("het is niet goed gegaan! ❌");
            });

            message.channel.send(embed);

        } else if(emoji === "❌"){
            msg.delete();

            return message.reply("Kick geannuleerd! ❌").then(m => m.delete(5000));
        }

    })
}

module.exports.help = {
    name: "kick",
    description: "Gooi iemand uit de server.",
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