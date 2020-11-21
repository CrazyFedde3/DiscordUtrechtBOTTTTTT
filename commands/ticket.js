const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}new gebruikt!`);
    console.log("----------------");

    const categoryID = "663847265231831040";

    var onderwerp = args.join(" ");

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            ticketBestaat = true

            var replyMessageEmbed = new discord.MessageEmbed()
                .setTitle("Fout melding")
                .setColor("#0099ff")
                .setDescription("Je hebt nog een ticket open staan!")
                .setThumbnail("https://bit.ly/2xn6LXy")
                .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
                .setTimestamp();

            message.reply(replyMessageEmbed);

            return;
        }

    });

    if (ticketBestaat) return;

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    var embed = new discord.MessageEmbed()
        .setTitle("Succes melding")
        .setColor("#0099ff")
        .setDescription(`Hallo, ` + message.author.username + `! \n Je ticket is succesvol aangemaakt: ${settedParent} \n\n Dit is je onderwerp: ${onderwerp}`)
        .setThumbnail("https://bit.ly/2xn6LXy")
        .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
        .setTimestamp();


    message.author.send(embed);
    message.channel.send(embed);

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });


                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    settedParent.updateOverwrite(message.guild.roles.cache.get(`663846986474061844`), {
                        CREATE_INSTANT_INVITE: false,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    var TicketSupportROle = message.guild.roles.cache.get(`663846986474061844`)

                    var embedParent = new discord.MessageEmbed()
                    .setTitle(`Hoi ${message.author.username}!`)
                    .setDescription(`Staff zal zo snel mogelijk contact met u opnemen. \n Onderwerp: ${onderwerp}`)
                    .setColor("#0099ff")
                    .setThumbnail("https://bit.ly/2xn6LXy")
                    .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
                    .setTimestamp();

                    settedParent.send(`${TicketSupportROle}`);
                    settedParent.send(embedParent);

                }
            ).catch(err => {
                message.channel.send("Er is iets mis gegaan! ❌");
                console.log(err);
            });
        }
    ).catch(err => {
        message.channel.send("Er is iets mis gegaan! ❌");
        console.log(err);
    });

}

module.exports.help = {
    name: "ticket",
    description: "Maak een ticket.",
    category: "Tickets"
}