module.exports = {
  name: 'global',
  description: 'gets the global leaderboard',
  async execute(message, Discord, client, con, arguments) {

    args = arguments.args;

    let embed = new Discord.MessageEmbed()
    .setColor(0xBF66E3)
    .setTitle('Global Leaderboard')
    .setDescription('Loading leaderboard')
    .setFooter({text: 'Requested by ' + message.author.tag});

      con.query("SELECT id, SUM(words) AS 'words' FROM users GROUP BY id ORDER BY words DESC;", async (err, response) => {

        const m = await message.channel.send({embeds: [embed]});

        //getTop(message, response, embed);


          let inTop = false;
          let pos = 1;
          let o = 0;
          let set = args[1];
          if(set === undefined) {
            set = 0;
          }
          set = (set * 10) - 10;
          if (set < 0) {
            set = 0;
          }
          setpos = set/10;


          for(let i = 0; i < response.length; i++) {
            try{
              let user = client.users.cache.get(response[i].id.toString());
              //get user and server
              i = parseInt(i);
              filler = user.username
              o++;
              //add user positions, max of 10, from json object
              if(user.id === message.author.id) {
                embed.addField('#' + (o) + ' `' + message.author.username + '`', response[i].words.toString());
                inTop = true;
              } else {
                if(o < 11+set & o > 0+set) {
                  embed.addField('#' + (o) + ' ' + user.username, response[i].words.toString());
                }
              }

              if(inTop === false && user.id === message.author.id) {
                embed.addField('#' + (i+1) + ' `' + message.author.username + '`', response[i].words.toString(), true);
                break;
              } else if(pos === 10+setpos) {
                break;
              }
              pos++;
            }
            catch(err) {

            }

          }
          embed.setDescription('The top-sending users world-wide\nThis uses a collection of all messages these users have sent')
          m.edit({embeds: [embed]});

      });
      //getGlobalTop(message);
      return;

  }
};
