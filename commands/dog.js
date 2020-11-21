const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;
const api = require('imageapi.js')

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}dog gebruikt!`);
            console.log("----------------");

            let subreddits = [
                "dogpictures"
            ]
            let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))]
            let img = await api(subreddit);

            var Embed = new discord.MessageEmbed()
            .setTitle(`Hond`)
            .setURL(`https://reddit.com/r/${subreddit}`)
            .setColor("#0099ff")
            .setImage(img);
            message.channel.send(Embed);
}

module.exports.help = {
    name: "dog",
    description: "Krijg een plaatje van een hond.",
    category: "Fun"
}