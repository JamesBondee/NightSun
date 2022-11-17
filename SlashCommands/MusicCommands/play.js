const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { MessageEmbed, Permissions } = require("discord.js");
const ms = require("ms")
module.exports = {
  name: "play",
  description: "Слушай свои любимые треки",
  inVc: true,
  sameVc: true,
  options: [{
    name: 'название',
    type: ApplicationCommandOptionType.String,
    description: 'Название трека или ссылка',
    required: true,
  }],
  run: async (client, interaction, args, track) => {
    await interaction.deferReply();

    if (!interaction.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`У меня недостаточно прав для выполнения этой команды! пожалуйста, дайте мне разрешение \`Подключатся\` или \`Говорить\`.`)] });
    const { channel } = interaction.member.voice;
    if (!interaction.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`У меня недостаточно прав, чтобы подключиься к вашему войс каналу. Пожалуйста, дайте мне разрешение \`Подключатся\` или \`Говорить\`.`)] });
    
    const memberChannel = interaction.member.voice.channelId

  
    const player = await client.poru.createConnection({
      guild: interaction.guildId,
      voiceChannel: interaction.member.voice.channelId,
      textChannel: interaction.channel,
      selfDeaf: true,
      selfMute: false,
    })

   
    const resolve = await client.poru.resolve(interaction.options.getString('название', true))
    const { loadType, tracks, playlistInfo } = resolve;
    if (loadType === "PLAYLIST_LOADED") {

      for (let x of resolve.tracks) {
         x.info.requester = interaction.member;
          player.queue.add(x);

      }
      interaction.editReply({ 
        embeds: [{
          color: 'YELLOW',
          author: {
            iconURL: 'https://cdn.discordapp.com/attachments/1018893750522621964/1042806573589868554/record1.gif',
          },
          description: `**Добавлено:** ${resolve.tracks.length} трека из плейлиста: ${resolve.playlistInfo.name}`,
          timestamp: new Date().toISOString(),
        }] });
      if (!player.isPlaying && !player.isPaused) return player.play();

    }else if(loadType ==="SEARCH_RESULT"|| loadType ==="TRACK_LOADED"){
      const track = tracks.shift();
    track.info.requester = interaction.member;

     player.queue.add(track);
        interaction.editReply({ embeds: [{
          color: 'YELLOW',
          author: {
            name: `Добавлено:`,
            iconURL: `https://cdn.discordapp.com/attachments/1018893750522621964/1042806573589868554/record1.gif`,
          },
          description: `[${track.info.title}](${track.info.uri}) \n\n **Продолжительность песни:** ${ms(track.info.length)}   \n\n **Статус:** **Ожидание** \n\n`,
          thumbnail: {
            url: `${track.info.image}`,
          },
          timestamp: new Date().toISOString(),
        }] });
        if (!player.isPlaying && !player.isPaused) return player.play();
        
    }else{
      
       return interaction.editReply({ embeds: [{
        color: 'YELLOW',
        description: `Нечего не найдено по вашему запросу`,
        timestamp: new Date().toISOString(),
      }] });
    }

  }}