const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const prefix = botConfig.prefix

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();
client.login(botConfig.token);

fs.readdir("./commands" , (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <=0) {
        console.log("Geen bestanden kunnen vinden!");
        return;
    }
    
    jsFiles.forEach((f,i) => {

        var fileGet = require(`./commands/${f}`);
        
        console.log(`|${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet)

    })

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get(`662694728487403570`);

    if(!role) return;

    member.roles.add(role);

    var kanaaltwee = member.guild.channels.cache.get(`779442144095109151`);
    var kanaal = member.guild.channels.cache.get(`662976354404270101`);

    if(!kanaaltwee) return;
    if(!kanaal) return;

    var welkomEmbed = new discord.MessageEmbed()
            .setTitle("Speler gejoind.")
            .setColor("#48ff00")
            .setDescription(`Welkom in Utrecht, ${member.user.username}! Ik hoop dat je een fijne tijd hebt! Lees voordat je begint de ${member.guild.channels.cache.get(`707676092630040656`)}! \n\n We zijn nu met ${member.guild.memberCount} spelers in Utrecht! \n\n Roles gegeven: ${member.guild.roles.cache.get(`662694728487403570`)}`)
            .setThumbnail(client.users.cache.get(member.id).displayAvatarURL())
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();

            var welcomeEmbed = new discord.MessageEmbed()
            .setTitle("Player joined!")
            .setColor("#48ff00")
            .setDescription(`Welcome in Utrecht, ${member.user.username}! I hope you have great time here!`)
            .setThumbnail(client.users.cache.get(member.id).displayAvatarURL())
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();

            console.log("----------------");
            console.log(`${member.user.username} is in de server gekomen.`);
            console.log("----------------");

            var DMWelkomEMBED = new discord.MessageEmbed()
            .setTitle("Welkom in Utrecht.")
            .setColor("#48ff00")
            .setDescription(`Welkom in Utrecht, ${member.user.username}! Ik hoop dat je een fijne tijd hebt! Lees voordat je begint de ${member.guild.channels.cache.get(`707676092630040656`)}! \n\n Heb veel plezier in Utrecht! \n\n Roles gegeven: Speler`)
            .setThumbnail(client.users.cache.get(member.id).displayAvatarURL())
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();

            member.send(DMWelkomEMBED);
            kanaaltwee.send(welcomeEmbed)
            return kanaal.send(welkomEmbed);

});

client.on("guildMemberRemove", member => {
    var bkanaal = member.guild.channels.cache.get(`662976354404270101`);
    var bkanaal2 = member.guilds.channels.cache.get(`779442144095109151`)

    if(!bkanaal) return;

    var bEmbed = new discord.MessageEmbed()
            .setTitle("Speler weggegaan.")
            .setColor("#ff0000")
            .setDescription(`Helaas is er iemand weggegaan! Ik hoop dat je snel terug komt ${member.user.username}! \n\n We zijn nu met ${member.guild.memberCount} spelers in Utrecht! \n\n Roles verwijderd: ${member.guild.roles.cache.get(`662694728487403570`)}`)
            .setThumbnail(client.users.cache.get(member.id).displayAvatarURL())
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();

            var leaveEmbedENG = new discord.MessageEmbed()
            .setTitle("Player left!")
            .setColor("#ff0000")
            .setDescription(`Sadly someone left the server! I hope you come back soon ${member.user.username}!`)
            .setThumbnail(client.users.cache.get(member.id).displayAvatarURL())
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();
            
            console.log("----------------");
            console.log(`${member.user.username} is uit de server gegaan.`);
            console.log("----------------");
            bkanaal2.send(leaveEmbedENG)
            return bkanaal.send(bEmbed);
})

client.on("ready", async () => {

    console.log(`|${client.user.username} is volledig online!`);
    console.log("-----------------------------");
    client.user.setActivity(`${prefix}help | Utrecht, NL`, { type: "PLAYING" });

});

var swearWords = ["gae", "kanker", "k anker", "ka nker", "kan ker", "kank er", "kanke r", "tyfus", "tering", "pleures", "kkr", "fuck", "kut", "kan ker", "k a n k e r", "mogool", "mongool", "aids", "downie", "beff", "bef", "beffen", "neuk", "lul", "piemol", "piemel", "konthaar", "anus", "godver", "verdomme", "suck", "god ver", "god"];

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;


    var msg = message.content.toLowerCase();

    for (let i = 0; i < swearWords.length; i++) {
        
        if(msg.includes(swearWords[i])){

            console.log("----------------");
            console.log(`${message.author.username} heeft iets gezegt dat hij niet mag zeggen: ${swearWords[i]}!`);
            console.log(`Volledige zin: ${message}`);
            console.log("----------------");

            message.delete();

            var logEmbed = new discord.MessageEmbed()
            .setTitle("Iemand heeft iets gezegt wat niet mag!")
            .setDescription(`${message.author} heeft iets gezegt dat hij niet mag zeggen: ${swearWords[i]} \n\n Volledige zin: ${message}`)
            .setThumbnail("https://bit.ly/2xn6LXy")
            .setFooter("© Utrecht, The Netherlands", "https://bit.ly/2xn6LXy")
            .setTimestamp();

            var logKanaal = message.member.guild.channels.cache.find(channels => channels.name === "logs");
                logKanaal.send(logEmbed);

                var berichtverwijderreden = `Je hebt iets gezegt, wat je niet mag zeggen. \n\n Het gaat om dit woord: ${swearWords[i]}.`

                var berichtverwijderdoorwat = new discord.MessageEmbed()
                .setTitle("Hallo!")
                .setColor("#0099ff")
                .setDescription(`Beste ${message.author}, je bericht is verwijderd om de volgende reden: ${berichtverwijderreden}`);

            return message.reply(berichtverwijderdoorwat).then(msg => msg.delete({timeout: 4000}));

        }

    }


    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

if(message.content.startsWith("U!")) message.reply(`De prefix is: ${prefix}. Dus met een kleine u. onthoud dat.`);

    if(!message.content.startsWith(prefix)) return;



    // Command handler
    var arguments = messageArray.slice(1);
    var commands = client.commands.get(command.slice(prefix.length));
    if(commands) commands.run(client,message,arguments)







});
