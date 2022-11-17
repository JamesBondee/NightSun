const discord = require("discord.js")
const ms = require("ms")
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports.run = async (client, player, track) => {



    let button1 = new MessageButton()
    .setLabel(`Пауза`)
    .setCustomId(`pause`)
    .setEmoji("937063426121936907")
    .setStyle("DANGER");

    let button2 = new MessageButton()
    .setLabel(`Продолжить`)
    .setCustomId(`resume`)
    .setEmoji("937063455612096523")
    .setStyle("SUCCESS");
          
    let button3 = new MessageButton()
    .setLabel(`Пропустить`)
    .setCustomId(`skip`)
    .setEmoji("937265413463605278")
    .setStyle("SUCCESS");
 
    let button4 = new MessageButton()
    .setLabel(`Пауза`)
    .setCustomId(`dpause`)
    .setDisabled(true)
    .setEmoji("937063426121936907")
    .setStyle("SECONDARY");

     let button5 = new MessageButton()
    .setLabel(`Продолжить`)
    .setCustomId(`dresume`)
    .setEmoji("937063455612096523")
    .setDisabled(true)
    .setStyle("SECONDARY");

     let button6 = new MessageButton()
    .setLabel(`Пропустить`)
    .setCustomId(`dskip`)
    .setEmoji("937265413463605278")
    .setDisabled(true)
    .setStyle("SECONDARY");

    let button7 = new MessageButton()
    .setLabel(`Повтор`)
    .setCustomId(`stop`)
    .setEmoji("937063815286226985")
    .setStyle("PRIMARY");

    let button8 = new MessageButton()
    .setLabel(`Повтор`)
    .setCustomId(`dstop`)
    .setEmoji("937063815286226985")
    .setDisabled(true)
    .setStyle("SECONDARY");




let rowss = new MessageActionRow()
    .addComponents(button4, button5, button6, button8);


    let row = new MessageActionRow()
    .addComponents(button1, button3, button7);

    let rows = new MessageActionRow()
    .addComponents(button2, button3);


   const embed = new discord.MessageEmbed()
                    .setColor("YELLOW")
                    .setAuthor('Начал играть:','https://cdn.discordapp.com/attachments/1018893750522621964/1042806573589868554/record1.gif')
                    .setThumbnail(track.info.image)
                    .addFields(
                      { name: `**Продолжительность песни:** ${ms(track.info.length)}` },
                      { name: `**Статус:** **Играю**` },
                    )
                    .setTimestamp()
                    .setDescription(`**Название:** [${track.info.title}](${track.info.uri})    \n\n *Зайди ко мне войс если хочешь управлять кнопками*`)

                    const embed3 = new discord.MessageEmbed()
                    .setColor("YELLOW")
                    .setAuthor('Музыка была завершена','https://cdn.discordapp.com/attachments/1018893750522621964/1042806573589868554/record1.gif')
                    .setThumbnail(track.info.image)
                    
                    .setTimestamp()
                    .setDescription(`**Название:** [${track.info.title}](${track.info.uri}) \n\n **Продолжительность песни:** ${ms(track.info.length)}   \n\n **Статус:** **Закончил** `)

const MESSAGE = await player.textChannel.send({ embeds: [embed], components: [row]});

  const ttt = `${track.info.length}`
  
   const filter = i => i.guild.me.voice.channel == i.member.voice.channel


  const collector = MESSAGE.channel.createMessageComponentCollector({ filter, time: ttt });
      collector.on('collect', async i => {

 const embed4 = new discord.MessageEmbed()
                    .setColor("#2F3136")
                    .setTitle('Начал играть:')
                    .setThumbnail(track.info.image)
                    .setTimestamp()
                    .setDescription(`**Название:** [${track.info.title}](${track.info.uri}) \n\n **Продолжительность песни:** ${ms(track.info.length)}   \n\n **Статус:** Возобновлено <@${i.user.id}> \n\n *Люди в <#${i.guild.me.voice.channel.id}> могут использовать кнопку* `)


      const embed2 = new discord.MessageEmbed()
                    .setColor("#2F3136")
                    .setTitle('Музыка приостановлена')
                    .setThumbnail(track.info.image)
                    .setTimestamp()
                    .setDescription(`**Название:** [${track.info.title}](${track.info.uri}) \n\n **Продолжительность песни:** ${ms(track.info.length)}   \n\n **Статус:** Приостановлено <@${i.user.id}> \n\n *Люди в <#${i.guild.me.voice.channel.id}> могут использовать кнопку* `)
  

                     const embed5 = new discord.MessageEmbed()
                    .setColor("#2F3136")
                    .setTitle('Музыка пропущена')
                    .setThumbnail(track.info.image)
                    .setTimestamp()
                    .setDescription(`**Название:** [${track.info.title}](${track.info.uri}) \n\n **Продолжительность песни:** ${ms(track.info.length)}   \n\n **Статус:** Пропущено <@${i.user.id}> `)
 
	if (i.customId === 'pause') {

       
         if (i.guild.me.voice.channel !== i.member.voice.channel) {
           await i.reply({ content: 'Ты должен зайди в мой войс', ephemeral: true});
          }
		
	await i.deferUpdate();
    if(player.isPaused){
      await i.reply({ content: 'Музыка уже приостановлена', ephemeral: true});
    }  
    
    if (!player.isPaused)  {
      
      player.pause(true)
    	await i.editReply({ embeds: [embed2], components: [rows]});
    }
	}

        	if (i.customId === 'resume') {
		await i.deferUpdate();
            

      player.pause(false)
      	await i.editReply({ embeds: [embed4], components: [row]});
    
           
            
	}

        	if (i.customId === 'skip') {
		await i.deferUpdate();   
            
            player.stop();
              await i.editReply({ embeds: [embed5], components: [rowss]});
      
   
    
    }
            
             
           

        	if (i.customId === 'stop') {
            await i.deferUpdate();
              player.destroy()
      	await i.editReply({ embeds: [embed3], components: [rowss]});
            
                  
  
	}
});

collector.on('end', async (i) => {
        await MESSAGE.edit({ embeds: [embed3], components: [rowss]});
    })


}