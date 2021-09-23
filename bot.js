// My first discord bot :  
//                                     -------- JACOBOT --------
// made by yannis-mlgrn the 05/04/21 

// import the discord lib and config
const { Client, Intents, MessageEmbed } = require('discord.js');
const fs = require('fs');

let configso = null;
try {
    configso = fs.readFileSync("./config.json").toString();
} catch(e) {
    console.warn("Error when reading config (missing one ?), attempting to create a generic one, you'll need to put the bot's token inside.");
    fs.writeFileSync("./config.json", JSON.stringify({
        "prefix": "!",
        "token": "your token"
    }, null, 4));
    process.exit(1);
}
const config = require('./config.json');

// create the client
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// type info
console.log('my github : https://github.com/yannis-mlgrn/bot-lph/ \nmade by yannis-mlglrn');
console.log('[!] bot starting...');

// check all message
bot.on('ready', () =>{

	bot.user.setActivity('sors sors sors !');
	console.log('[!] Connected!');
    console.log(`[!] Logged in as ${bot.user.tag}!`);
    console.log('[!] Ready !');

})
bot.on("messageCreate", message => {

    if (message.author.bot) return;
    // when message begin by a !
    //if (message.content.indexOf("!") !== 0) return;

    const usedPrefix = message.content[0];
    // cut the command for take all arguments
    const channel = message.channel;
    const args = message.content.substring(1, message.content.length).trim().split(/ +/s);
    // take the command 
    // kinda weird (and somewhat unoptimized) implementation, but is needed in order for prefixless commands to work
    const command = usedPrefix === config.prefix ? args.shift().toLowerCase() : args.shift().substring(0, 0); // this thing is needed to perform the shift anyways and still return a string

    // take the username of message author
    const author = message.author.username;
    const authorId = message.author;

    if (command == 'atelier') {
        // send message with all important link
        //message.channel.send("\n lien visio : https://mdl29.net/visio \nlien framapad : https://annuel.framapad.org/p/LPH");
        var msgatelier = new MessageEmbed()
            .setColor('#E70739')
            .setTitle('Liens importants pour les séances :')
            .setAuthor('Jacobot","https://media.giphy.com/media/3XR0chfiSTtAI/giphy.gif')
            .setDescription('lien visio : https://mdl29.net/visio \nlien framapad : https://annuel.framapad.org/p/LPH');
        channel.send({ embeds: [msgatelier] });  
        console.log(`[*] ${author} sent !atelier command`);
    } 
    // simple ping pong
    if (command === 'ping') {
        message.channel.send('pong')
        console.log(`[*] ${author} sent !ping command`);
    }
    // Send the user's avatar URl
    if (command === 'avatar') {
        //message.reply(message.author.displayAvatarURL());
        var msgavatar = new MessageEmbed()
        .setColor('#E70739')
        .setTitle("L'avatar de "+author+" :")
        .setAuthor('Jacobot',"https://media.giphy.com/media/3XR0chfiSTtAI/giphy.gif")
        .setImage(message.author.displayAvatarURL());
        channel.send({ embeds: [msgavatar] });  
        console.log(`[*] ${author} sent !avatar command`);
    }
    if (command == 'help') {
        // send all command and explain how to use it
        //message.channel.send("les commandes :\n- !atelier : renvoi les liens importants (visio,pad...)\n- !random max : renvoi un nombre aléatoir entre 1 et le nombre inscrit\n- 
        //!avatar : renvoi l'image de ton avatar\n- !ping : le bot te répond pong\n- !yesno : créer un sondage de type yesno, ne pas oublier de mettre la question entre deux doubles cote\n- !activity : change l'activitée du bot, ne pas oublier de mettre l'activitée entre les deux doubles cote\n");
        const msghelp = new MessageEmbed()
        .setColor('#E70739')
        .setTitle("les commandes du bot :")
        .setAuthor('Jacobot',"https://media.giphy.com/media/3XR0chfiSTtAI/giphy.gif")
        .setDescription("**!atelier :** renvoi les liens importants (visio,pad...)\n**!random max :** renvoi un nombre aléatoir entre 1 et le nombre inscrit\n **!avatar :** renvoi l'image de ton avatar\n**!ping :** le bot te répond pong\n**!yesno :** créer un sondage de type yesno, ne pas oublier de mettre la question entre deux doubles cote");
        channel.send({ embeds: [msghelp] });  
        console.log(`[*] ${author} sent !help command`);
    }
    // random command 
    if (command === "random") {
        let i = args[0]; // get the first argument  
        const random = Math.floor((Math.random() * i) + 1); // random command and return a int
        //message.reply('le résultat est : '+random);
        console.log(`[*] ${author} sent !random command`);
        var msgrandom = new MessageEmbed()
        .setColor('#E70739')
        .setTitle("random :")
        .setAuthor('Jacobot',"https://media.giphy.com/media/3XR0chfiSTtAI/giphy.gif")
        .setDescription(`chiffre aléatoire entre 0 et ${i} .\n Le résultat est : **${random}**`);
        channel.send({ embeds: [msgrandom] });  
    }
    if (message.content.match(/quoi\s*[?!.,]*\s*$/i) && message.author.id != '299165255639105536') { // if the message finish by quoi the bot reply "feur !". I use a regular expression
        message.channel.send("feur !"); // then send "feur !"
    }
    if (command === "yesno") {
        // er --> "\"(.+?)\""g
        const mess = message.content.slice(config.prefix).trim();
        const q = mess.match(/"(.+?)"/g).map(v => v.replace(/^"(.+)"$/, "$1"));// get the content between "" 
        const question = q[0] ;

        let msgyesno = new MessageEmbed()
        .setColor('#E70739')
        .setTitle(":bar_chart: "+question)
        .setAuthor('Jacobot',"https://media.giphy.com/media/3XR0chfiSTtAI/giphy.gif")
        channel.send({ embeds: [msgyesno] }).then(sentMessage => { // create content with user react
            sentMessage.react('👍');
            sentMessage.react('👎');
            sentMessage.react('🍺');
        });
        console.log(`[*] ${author} sent !yesno command`);
      }
      if (command === "activity") {
        // er --> "\"(.+?)\""g
        const mess = message.content.slice(config.prefix).trim();
        const z = mess.match(/"(.+?)"/g).map(v => v.replace(/^"(.+)"$/, "$1"));// get the content between "" 
        const new_activity = z[0] ;
        bot.user.setActivity(new_activity);
        //message.channel.send('<@'+authorId+'>'+" à mis à jour l'activité du bot\n- Nouvelle activitée --> "+new_activity);
        var msgact = new MessageEmbed()
        .setColor('#E70739')
        .setTitle(author+" à mis a jours l'activité du bot !")
        .setAuthor('Jacobot',"https://media.giphy.com/media/3XR0chfiSTtAI/giphy.gif")
        .setDescription(`*nouvelle activitée* **-->** ${new_activity}`);
        channel.send({ embeds: [msgact] });  
        console.log(`[*] ${author} send !activity command\n    -> New activity : ${new_activity}`);
      }
      if (command === "flm") {
            message.channel.send("https://cdn.discordapp.com/attachments/835565603636248586/856257280466616400/out.mp4");
            console.log(`[*] ${author} send !flm command`);
      }
});

// connect the bot ( YOU MUST HAVE A TOKEN )
bot.login(config.token);
