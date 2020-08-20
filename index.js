const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content !== 'w2g') {
        return;
    }

    getWatchTogetherLink().then(url => msg.reply(`Ewa, hier is uw link bruur: ${url}`));
});

client.login(process.env.DISCORD_TOKEN);

async function getWatchTogetherLink() {
    const response = await fetch('https://w2g.tv/rooms/create', {method: 'POST', redirect: 'manual'});

    const body = await response.text();

    const [url] = body.match(/https(.*)\?lang\=en/);

    return url;
}
