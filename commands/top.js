const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {

  data: new SlashCommandBuilder()
  .setName('top')
  .setDescription('gets top sending user'),
  async execute(interaction, Discord, client, con, arguments) {

    data = arguments.data;


    //query gets the person with the most words sent
    con.query('SELECT id, SUM(words) AS words FROM users GROUP BY id ORDER BY words DESC', async (err, rows) => {
      for(let i in rows) {
        try {
          let embed = new Discord.MessageEmbed()
          .setTitle('')
          .setColor(0xBF66E3)
          .setDescription('Top User')
          .setFooter('Requested by ' + interaction.user.tag)
          .setThumbnail('https://cdn.discordapp.com/avatars/' + rows[i].id + '/' + client.users.cache.get(rows[i].id).avatar + '.png')
          .addField(client.users.cache.get(rows[i].id).username, '__**' + rows[i].words + '**__ sent');

          //if the top users is an "og" it will get them a different color for the embed
          let ogs = new Set();
          for(var o = 0; o < data.ogs.length; o++) {
            ogs.add(data.ogs[o]);
          }

          if(ogs.has(rows[i].id)) {
            embed.setColor(0xFFA417);
          }
          //custom colors for pog people
          if(rows[i].id === '445668261338677248') {
            embed.setColor(0xFF1CC5);
          }
          if(rows[i].id === '448269007800238080') {
            embed.setColor(0x17FF1B);
          }
          if(rows[i].id === '656755471847260170') {
            embed.setColor(0x17D1FF);
          }

          await interaction.reply({embeds: [embed]});
          break;
        }
        catch(err) {

        }
      }

    });
    return;
  }
};
