const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js')
const discord = require("discord.js");
const { Poru } = require("poru");
require("dotenv").config()
const client = new discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "GUILDS","GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});
client.login(process.env.TOKEN)



client.config = require("./config.json");
client.poru = new Poru(client, client.config.nodes,{
  reconnectTime: 0,
  defaultPlatform: "scsearch",
  spotify:{
  clientID:"d28262dc64004ede89fecd6d95d8de41",
  clientSecret:"d238fbd707a645e898c96bc03889e028",
  playlistLimit:5
   },
  apple:{
    playlistLimit:5
  }
  
})
const player = client.poru.players.get(oldVoice.guild.id);

client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.channelId !==  oldState.guild.me.voice.channelId || newState.channel){
      return(0); 
  }
  if(!oldState.channel.members.size -2){

      oldVoice.player.destroy(); 
  }
});



client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.slash = new discord.Collection();


['events', 'slash', 'PoruEvent'].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

