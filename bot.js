// My first discord bot

const Discord = require('discord.js');
var bot = new Discord.Client();
bot.on("message", message => {
    if (message.author.bot) return;
    // This is where we'll put our code.
    if (message.content.indexOf("!") !== 0) return;
   
    const args = message.content.slice("!").trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == '!atelier') {
        message.channel.send("\n lien visio : https://mdl29.net/visio \nlien framapad : https://annuel.framapad.org/p/LPH");
    } 
    // simple ping pong
    if (command == '!ping') {
        message.channel.send('pong')
    }
    // Send the user's avatar URL
    if (command == '!avatar') {
        message.reply(message.author.displayAvatarURL());
    }
    if (command === "!random") {
        let i = args[0]; // Remember arrays are 0-based!
        const random = Math.floor((Math.random() * i) + 1);
        message.reply('le résultat est : '+random);
      }
});

bot.login("token");