// My first discord bot :  
//                                     -------- JACOLOT BOT --------
// made by yannis-mlgrn the 05/04/21 

const Discord = require('discord.js');
var bot = new Discord.Client();

console.log("bot starting... \nmy github : https://github.com/yannis-mlgrn/bot-lph/ \nmade by yannis-mlglrn")

// check all message
bot.on("message", message => {

    if (message.author.bot) return;
    // when message begin by a !
    //if (message.content.indexOf("!") !== 0) return;
    
    // cut the command for take all arguments
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
    // random command 
    if (command === "!random") {
        let i = args[0]; // Remember arrays are 0-based!
        const random = Math.floor((Math.random() * i) + 1);
        message.reply('le résultat est : '+random);
      }
    // when a user finish him message by the word "quoi" , the bot reply "feur"
    if (message.content.match(/quoi\s*[?!.,]*\s*$/i)) {
        message.channel.send("feur");
    }
});

// connect the bot ( YOU MUST HAVE A TOKEN )
bot.login("token");