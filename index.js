const Discord = require('discord.js')
const colors = require('colors')

console.log(colors.red('Hello, world!'))

const client = new Discord.Client({ 
    intents: Object.keys(Discord.GatewayIntentBits) 
})

client.on('guildMemberAdd', member => {
    console.log(colors.red('Hello, world!'))

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
    
})

client.login('CLIENT_TOKEN');
