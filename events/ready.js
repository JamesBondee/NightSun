module.exports.run = async (client) => {
 
  client.poru.init(client)
  console.log(` ${client.user.username} готов ${client.guilds.cache.size} в серверох`);
 
    setInterval(() => {
      const statuses = [
        `/play`, `/help`, `YouTube`, `Spotify`, `Apple`, `Soundcloud`, `Ютуб`, `себя`, `рикролл`, `треки чебурека`, `чебурека`, `NightShine`, `SunShine`, `Майнкрафт`, `а ой э`, `Музыку`
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "WATCHING" });
    }, 60000);

}