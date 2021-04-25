const { Client, MessageEmbed, ReactionCollector } = require("discord.js");
const { config } = require("dotenv");
const fetch = require("node-fetch");
const prefix = ".";

const client = new Client();

config({
    path: __dirname+ "/.env"
});

client.on("ready", () => {
    console.log("Bot is ready for use");

    client.user.setPresence({
        status: "online",
        game: {
            name: "Factorio",
            type: "WATCHING"
        }
    });
})

client.on("message", async message => {
    if(message.author.bot) return; 
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;

    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmds = args.shift().toLowerCase();

    if(cmds === "say") {
        if(message.deletable) message.delete();
        const toSay = args.slice(0).join(" ");
        message.channel.send(message.author.username + " said: " + toSay);
    }

    if(cmds == "giverole") {
        const user = message.mentions.users.first();
        const {guild} = message;
        const member = guild.members.cache.get(user.id);
        const roleToSet = args.shift()
        const roleName = args.join(' ');

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName;
        })

        if(!role) {
            message.reply("There is no role with that name!!");
        }
        member.roles.add(role);
    }

    if(cmds == "removerole") {
        const user = message.mentions.users.first();
        const {guild} = message;
        const member = guild.members.cache.get(user.id);
        const roleToSet = args.shift()
        const roleName = args.join(' ');

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName;
        })

        if(!role) {
            message.reply("There is no role with that name!!");
        }
        member.roles.remove(role);
    }

    if(cmds == "kick") {
        const user = message.mentions.users.first();
        const {guild} = message;
        const member = guild.members.cache.get(user.id);
        
        if(member.username === "M4TY") {
            message.reply("I can not kick my own creator");
            console.log("#################################");
        } else {
            member.kick();
        }
       
    }

    if(cmds == "pepegay") {
        var i;
        for(i = 0; i <= 10; i++) {
            message.channel.send("Pepé je gay");
        }
    }

    if(cmds == "help") {
        const exampleEmbed = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Kdo jsem?')
	        .setDescription('Mé jméno je Simba a jsem mnohem užitečnější bot, nežli Pepé, můžeš použít rovnou několik commandů, ale většina z nich, je přísutpná jen pro mého majitele, Matyho.')
	        .setImage('https://data.whicdn.com/images/335962346/original.jpg')
	        .setTimestamp()

        message.channel.send(exampleEmbed);
    }

    if(cmds == "dadjoke") {
        const joke = await generateDadJoke();
        message.channel.send(joke);
    }

    if(cmds == "programmerjoke") {
        const joke = await generateProgrammerJoke();
        message.channel.send(joke);
    }

    if(cmds == "randomjoke") {
        const joke = await generateRandomJoke();
        message.channel.send(joke);
    }
    
})

async function generateDadJoke() {
    const jokeRes = await fetch('https://icanhazdadjoke.com', {
        headers: {
            'Accept': 'application/json'
        }
    });
    const joke = await jokeRes.json();
    return joke.joke;
}

async function generateProgrammerJoke() {
    const jokeRes2 = await fetch('https://official-joke-api.appspot.com/jokes/programming/random', {
         headers: {
             'Accept': 'application/json'
         }
    });
    const joke = await jokeRes2.json();
    
    const returnString = `Here is a programmer joke!\n${joke[0].setup} ${joke[0].punchline}`
    return returnString;
}

async function generateRandomJoke() {
    const jokeRes3 = await fetch('https://official-joke-api.appspot.com/random_joke', {
         headers: {
             'Accept': 'application/json'
         }
    });
    const joke = await jokeRes3.json();
    
    const returnString = `Here is a random joke!\n${joke.setup} ${joke.punchline}`
    return returnString;
}

client.login(process.env.TOKEN);