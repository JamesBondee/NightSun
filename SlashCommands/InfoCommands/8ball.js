const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

  module.exports = {
    name: "8ball",
    description: "Волшебный шар",
    options: [
        {
            name: "вопрос",
            description: "Укажите вопрос, каторый вы хотите задать шару",
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],
    run: async (client, interaction, args) => {
      
      var fortunes = [
        "Да.",
        "Это точно.",
        "Это решительно так.",
        "Без сомнения.",
        "Определенно да.",
        "Вы можете положиться на него.",
        "Как я вижу, да.",
        "Более вероятный.",
        "Перспектива хорошая.",
        "Знаки указывают на да.",
        "Ответ туманный, попробуйте еще раз",
        "Спросите позже.",
        "Лучше не говорить тебе сейчас...",
        "Сейчас не могу предсказать.",
        "Сконцентрируйся и спроси еще раз.",
        "Не рассчитывай на это.",
        "Мой ответ - нет",
        "Мои источники говорят нет.",
        "Перспектива не очень...",
        "Очень сомнительно.",
        "Нет.",
      ];
      
      await interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#2F3136')
            .addField(`Твой вопрос:`, interaction.options.getString('вопрос'))
            .addField(`Мой ответ:`,  fortunes[Math.floor(Math.random() * fortunes.length)])
        ]
      });
    },
  };

