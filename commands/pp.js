module.exports = {
  name: 'pp',
  description: 'changes pp length',
  execute(message, data, args, Discord, client) {
    if(args[1] != undefined ) {
      args.shift();
      args = args.toString();
      data.ppLength = args.replace(/,/g, " ");
      let embed = new MessageEmbed()
      .setTitle('UwU')
      .setColor(0xBF66E3)
      .setDescription("pp length set to **" + data.ppLength + "**");
      message.author.send(embed);
    }
    else {
      let embed = new MessageEmbed()
      .setTitle('Really dude')
      .setColor(0xB4DA55)
      .setDescription('Come on man, give me at least a little something to work with');
      message.channel.send(embed);
    }
    giveAchievements(message.author, data, "pp");
    return;
  }
};