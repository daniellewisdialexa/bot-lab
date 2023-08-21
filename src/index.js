const {Client, IntentsBitField, messageLink} = require('discord.js')
require('dotenv').config()
const tokens = require('./tokens.json')

const client  = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.tag}`, ' is ready')
})
 
client.on('messageCreate',(msg) =>{
    if(msg.author.bot){
        return
    }
    if(msg.content === 'hello'){
        msg.reply('hello')
    }
} );  
 
client.login(tokens.HELLO_WORLD_TOKEN) 