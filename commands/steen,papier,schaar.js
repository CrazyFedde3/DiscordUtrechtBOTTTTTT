const discord = require("discord.js");
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
    console.log(`${message.author.username} heeft ${prefix}sps gebruikt!`);
    console.log("----------------");

    if (!args[0]) return message.reply(`gebruik ${prefix}sps (steen, papier of schaar)`);

    var options = ["steen", "papier", "schaar"];

    var result = options[Math.floor(Math.random() * options.length)];

    if(args[0].toUpperCase() == "STEEN"){

        if(result == "papier"){
            return message.channel.send(`:notepad_spiral: Ik had ${result}! Dus ik heb gewonnen! :notepad_spiral:`);
        } else if(result == "steen"){
            return message.channel.send(`:moyai: Ik had ook ${result}! Dus niemand heeft gewonnen! :moyai:`);
        } else if (result == "schaar"){
            return message.channel.send(`:scissors: Ik had ${result}! Dus jij hebt gewonnen :scissors:`);
        }

    }
    else if(args[0].toUpperCase() == "PAPIER"){

        if(result == "papier"){
            return message.channel.send(`:notepad_spiral: Ik had ook ${result}! Dus niemand heeft gewonnen! :notepad_spiral:`);
        } else if(result == "steen"){
            return message.channel.send(`:moyai: Ik had ${result}! Dus jij hebt gewonnen! :moyai:`);
        } else if (result == "schaar"){
            return message.channel.send(`:scissors: Ik had ${result}! Dus ik heb gewonnen :scissors:`);
        }

    }else if(args[0].toUpperCase() == "SCHAAR"){

        if(result == "papier"){
            return message.channel.send(`:notepad_spiral: Ik had ${result}! Dus jij hebt gewonnen! :notepad_spiral:`);
        } else if(result == "steen"){
            return message.channel.send(`:moyai: Ik had ${result}! Dus ik heb gewonnen! :moyai:`);
        } else if (result == "schaar"){
            return message.channel.send(`:scissors: Ik had ook ${result}! Dus niemand heeft gewonnen :scissors:`);
        }

    }

}

module.exports.help = {
    name: "sps",
    description: "Doe steen, papier, schaar.",
    category: "Fun"
}