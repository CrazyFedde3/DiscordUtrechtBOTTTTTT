const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;
const api = require('imageapi.js')

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}meme gebruikt!`);
            console.log("----------------");

            let subreddits = [
                "comedyheaven",
                "dank",
                "memes",
                "meme",
                "MemeEconomy",
                "dankmemes",
                "PrequelMemes",
                "terriblefacebookmemes",
                "funny"
            ]
            let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))]
            let img = await api(subreddit);

            var Embed = new discord.MessageEmbed()
            .setTitle(`Meme van r/${subreddit}`)
            .setURL(`https://reddit.com/r/${subreddit}`)
            .setColor("#0099ff")
            .setImage(img);
            message.channel.send(Embed);
}

module.exports.help = {
    name: "meme",
    description: "Krijg een meme.",
    category: "Fun"
}