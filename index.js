const Discord = require('discord.js')
const colors = require('colors')

console.log(colors.red('Hello, world!'))

const client = new Discord.Client({ 
    intents: Object.keys(Discord.GatewayIntentBits) 
})

// Logger function
const logger = message => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

client.on('guildMemberAdd', member => {
  console.log(colors.red('Someone was added.'))

  // Check if the user has the specific ID
  if (member.id === 'USER_ID') {
    // Ban the user if they have the specific ID
    member.ban()
      .then(() => {
        console.log(colors.red(`Banned user with ID ${member.id} (${member.user.tag})`))
      })
      .catch(err => {
        console.log(colors.red(`Error banning user with ID ${member.id} (${member.user.tag}): ${err}`))
      })
  } else {
    // Log a message if the user does not have the specific ID
    console.log(colors.green(`Not the one. Welcome, ${member.displayName}!`))
  }
});

client.on('message', message => {
  // Ignore messages from other bots
  if (message.author.bot) return;

  // Check if message starts with the command prefix
  if (!message.content.startsWith('auto!')) return;

  // Extract the command and arguments from the message
  const args = message.content.slice('auto!'.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Log the command and arguments
  logger(`Command: ${command}, Args: ${args}`);

  // Call the appropriate command handler
  if (command === 'help') {
    message.channel.send(`Here are the available commands:
    - auto!say: Makes the bot say something
    - auto!ping: Pings the bot
    - Other things you may like...`);
  } else if (command === 'say') {
    // Check if user provided a message to say
    if (!args.length) {
      return message.channel.send(`You didn't provide a message to say, ${message.author}!`);
    }

    // Send the message
    message.channel.send(`${args.join(' ')}`);
  } else if (command === 'ping') {
    message.channel.send('Pong!');
  } else {
    message.channel.send(`Invalid command: ${command}`);
  }
});

client.login('CLIENT_TOKEN');
