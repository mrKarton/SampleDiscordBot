const discord = require('discord.js');  //
const bot = new discord.Client();       // connecting to discord
const config = require('./conf.json');  // loading configuration from conf.json

bot.on('ready', ()=> {
    console.log('Bot is ready to use.');// when bot is ready, message it
    bot.generateInvite(["ADMINISTRATOR"]).then((link)=>{console.log("My link: " + link)});//when invition link created, messgae it
});

bot.login(config.token); //logining with token from config

bot.on('message', (message)=>{  //adding message listener
    if(message.content.startsWith(config.prefix));  // checking messages for starting with prefix
    {
        var commands = splitForBot(message.content);// spliting commands and arguments (function on string 47)
        if(commands != 0)                           // NOTICE: If cannot split message function returns 0
        {
            switch(commands[0].toLowerCase())       //switching comands
            {
                case "test":                        
                    message.channel.send("I am working.");//send for channel
                    if(commands[1] != null)               //if have argument
                    {
                        message.channel.send("And supporting multiple commands");
                    }
                break;

                case "is_admin":
                    if(isAdmin(message.author, message.guild))//checking for amin
                    {
                        message.channel.send("You are admin");
                    }
                    else
                    {
                        message.channel.send("No");
                    }
                break;

                default: //unexpected command
                    message.channel.send("Unregistred command: " + commands[0]);
                break;
            }
        }
    }
});

function splitForBot(content)
{
    if(typeof(content) == typeof("String")) //Checking for type of content (we need a string)
    {
        var step1 = content.split(config.prefix);//spliting prefix
        if(step1[1] != null)                     //if there are comands
        {
            var step2 = step1[1].split(" ");     //spliting arguments
            var step3 = step2.filter(element => element != '');//remove empty entries
            return step3; //return
        }
        else
        {
            return 0; //return 0 if error
        }
    }
    else
    {
        return 0;    //return 0 if error
    }
}

function isAdmin(member, guild)
{
    return bot.guilds.cache.get(guild).member(member).hasPermission("ADMINISTRATOR");//get guild -> get member -> check premmissins
}