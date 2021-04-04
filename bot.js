// My first discord bot

const Discord = require('discord.js');
var bot = new Discord.Client();
bot.on('message', function (message) {

    // send when have a event
    if (message.content == '!atelier') {
        message.channel.send("\n lien visio : https://mdl29.net/visio \nlien framapad : https://annuel.framapad.org/p/LPH");
        console.log(" someone send !atelier")
    } 
    // simple ping pong
    if (message.content == 'ping') {
        message.channel.send('pong')
    }
    // Send the user's avatar URL
    if (message.content == '!avatar') {
        message.reply(message.author.displayAvatarURL());
    }
});

bot.login("token");
