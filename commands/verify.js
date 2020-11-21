const Discord = require("discord.js")
const rbx = require("noblox.js")
const botConfig = require("../botconfig.json");
var prefix = botConfig.prefix;

module.exports.run = async (client, message, args) => {
    console.log("----------------");
            console.log(`${message.author.username} heeft ${prefix}verify gebruikt!`);
            console.log("----------------");

            let msg = await message.channel.send("Aan het wachten op de prompt...") // Send a message for awaiting.
  
  
  function makeid() {
    var text = "";
    var selectFruit = [' button', ' head', ' vase', ' wall', ' and', ' roblox', ' house', ' smell', ' key', ' why', ' live']; // Emoji list This can be used for words.
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)]; // This will random the emojis 
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    return text;
  }

  const filter = m => m.author.id === message.author.id
  const collector = message.channel.createMessageCollector(filter, { max: '1', maxMatches: "1", time: "200000" }) //This is the collector to collect the Message for getting the username.
  const robloxEmbed = new Discord.MessageEmbed()
.setColor("#0099ff")
.setTitle("Prompt")
.setThumbnail("https://bit.ly/2xn6LXy")
.setDescription("❓ Wat is je roblox gebruikersnaam?")
.setFooter("Deze prompt annuleert automatisch over 200 seconden.")
.setTimestamp()
 msg.channel.send(robloxEmbed) //Send the first Embed
  
 collector.on("collect", m => {
   if(m.content === 'cancel' || m.content === 'Cancel') {
     message.channel.send('**Prompt geannuleerd.**')
     return
   } //Collector1 End
   rbx.getIdFromUsername(m.content).then(foundId => { //Get the userID from username
     const Id = foundId
     const newString = `Utrecht` + makeid() + makeid() + makeid() + makeid() + makeid() //Emoji thing
   const foundUsername = new Discord.MessageEmbed()
.setColor("#0099ff")
.setTitle("Prompt")
.setThumbnail("https://bit.ly/2xn6LXy")
.setDescription("Hallo **" + m.content + "**, om te verifiëren dat je een echt persoon bent moet je het volgende doen: \n Vul dit in als je profielinformatie \n `" + newString + "`\n\n Zeg **done** als je klaar bent.\n Zeg **cancel** om te annuleren. ")
.setFooter("Speler ID is " + foundId)
.setTimestamp()
 msg.channel.send(foundUsername) //The part where it asks you to add the Code
       const collector2 = message.channel.createMessageCollector(filter, { max: '1', maxMatches: "1", time: "200000" }) // Collector2
collector2.on('collect', async mag => {
      if(mag.content.includes('done') & mag.content.includes("done") || mag.content.includes('Done') && mag.author.id == message.author.id) {
        const fetchingBlurb = new Discord.MessageEmbed()
.setColor("#0099ff")
.setTitle("Prompt")
.setThumbnail("https://bit.ly/2xn6LXy")
.setDescription("Tekst aan het controleren. Wacht totdat ik klaar ben.")
.setFooter("Fetching..")
.setTimestamp()
         msg.channel.send(fetchingBlurb) //Checks the Blurb / Status
        setTimeout(function() { //Timeout Stuff
rbx.getStatus(foundId).then(status => { //Check status
            console.log(status) //Console.log the status
          rbx.getBlurb(foundId).then(blurb => { // Checks the blurb
            if(status.includes(newString) || blurb.includes(newString)) { // If code is in blurb procceds with operation
              const verified = new Discord.MessageEmbed()
.setColor("#0099ff")
.setTitle("Prompt")
.setThumbnail("https://bit.ly/2xn6LXy")
.setDescription("Je bent nu geverifieerd! Wacht eventjes totdat ik de Verified role heb toegevoegd!")
.setFooter("Verifying..")
.setTimestamp() 
msg.channel.send(verified) // Sent if user has put code
message.member.roles.add(message.guild.roles.cache.find(r => r.name == "Verified")) // Add the users role
message.member.setNickname(m.content) // Sets the users nickname



               } else {
               message.channel.send("Kan de tekst niet vinden.") // Sent if user has not put code
               }
          })
        }, 5000)
      })
      } else
        if(mag.content.includes('cancel') && mag.author.id == message.author.id) {
          message.channel.send('**Prompt geannuleerd.**') // If user says `Cancel`
                               return
        }
    })
 })
})
};

module.exports.help = {
    name: "verify",
    description: "Verifieer jezelf met Roblox.",
    category: "Informatie"
}