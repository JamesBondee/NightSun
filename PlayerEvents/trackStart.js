const discord = require("discord.js")
const ms = require("ms")
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports.run = async (client, player, track) => {



    let button1 = new MessageButton()
    .setLabel(`Пауза`)
    .setCustomId(`pause`)
    .setEmoji("1037030294085189693")
    .setStyle("PRIMARY");

    let button2 = new MessageButton()
    .setLabel(`Продолжить`)
    .setCustomId(`resume`)
    .setEmoji("1037030147188084867")
    .setStyle("SUCCESS");
          
    let button3 = new MessageButton()
    .setLabel(`Пропустить`)
    .setCustomId(`skip`)
    .setEmoji("1037030462205464576")
    .setStyle("SUCCESS");
 
    let button4 = new MessageButton()
    .setLabel(`Пауза`)
    .setCustomId(`dpause`)
    .setDisabled(true)
    .setEmoji("1037030294085189693")
    .setStyle("SECONDARY");

     let button5 = new MessageButton()
    .setLabel(`Продолжить`)
    .setCustomId(`dresume`)
    .setEmoji("1037030147188084867")
    .setDisabled(true)
    .setStyle("SECONDARY");

     let button6 = new MessageButton()
    .setLabel(`Пропустить`)
    .setCustomId(`dskip`)
    .setEmoji("1037030462205464576")
    .setDisabled(true)
    .setStyle("SECONDARY");

    let button7 = new MessageButton()
    .setLabel(`Завершить`)
    .setCustomId(`stop`)
    .setEmoji("1037031321752576121")
    .setStyle("DANGER");

    let button8 = new MessageButton()
    .setLabel(`Завершить`)
    .setCustomId(`dstop`)
    .setEmoji("1037031321752576121")
    .setDisabled(true)
    .setStyle("SECONDARY");


    let button9 = new MessageButton()
    .setLabel(`Повтор`)
    .setCustomId(`loop`)
    .setEmoji("1037402903008251924")
    .setDisabled(true)
    .setStyle("SECONDARY");

    let button10 = new MessageButton()
    .setLabel(`Повтор`)
    .setCustomId(`dloop`)
    .setEmoji("1037402903008251924")
    .setDisabled(true)
    .setStyle("SECONDARY");




let rowss = new MessageActionRow()
    .addComponents(button4, button5, button6, button8, button10);


    let row = new MessageActionRow()
    .addComponents(button1, button3, button7, button9);

    let rows = new MessageActionRow()
    .addComponents(button2, button3);


   const embed = new discord.MessageEmbed()
                    .setColor("#2F3136")
                    .setTitle('Начал играть:')
                    .setAuthor({
                      iconURL: 'https://thumbs.gfycat.com/BlushingBrownLamb-size_restricted.gif'
                    })
                    .setThumbnail(track.info.image)
                    .setTimestamp()
                    .setDescription(`**Название:** [${track.info.title}](${track.info.uri}) \n\n **Продолжительность песни:** ${ms(track.info.length)}   \n\n **Статус:** **Играю** \n\n *Зайди ко мне войс если хочешь управлять кнопками*`)

                    const embed3 = new discord.MessageEmbed()
                    .setColor("#2F3136")
                    .setTitle('Музыка была завершена')
                    .setAuthor({
                      iconURL: 'https://thumbs.gfycat.com/BlushingBrownLamb-size_restricted.gif'
                    })
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