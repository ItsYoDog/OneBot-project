import DiscordJS, { Intents } from "discord.js"
import WOKcommands from "wokcommands"
import path from "path"
import dotenv from "dotenv"
dotenv.config()

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
})

console.log("OneBot is attempting to load client...")

client.on("ready", () => {
  console.log("OneBot is ready to login.")

  console.log("Loading commands...")

  new WOKcommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    typescript: true
  })

  const guildId = "894227369483726930"
  const guild = client.guilds.cache.get(guildId)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }

  //Ping command
  commands?.create({
    name: "ping",
    description: "Replies with pong if the bot is functioning.",
  })
  console.log("1 loaded.")

  //Version command
  commands?.create({
    name: "version",
    description: "Shows the version and changelog.",
  })
  console.log("2 loaded.")
})

//"listening" to commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const { commandName, options } = interaction

  //Ping command
  if (commandName === "ping") {
    interaction.reply({
      content: "Pong!",
      ephemeral: true,
    })
  }

  //Version command
  if (commandName === "version") {
    interaction.reply({
      content: (
        (process.env.VERSION) + "\r\n" + "**Last updated**: " + (process.env.TIMEUPDATE) + "\r\n" + "Unknown"
      ),
    })
  }

})

console.log("Scripts loaded! Attempting to inject code...")
client.login(process.env.TOKEN)
console.log("Token: "+  process.env.TOKEN)
