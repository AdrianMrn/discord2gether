const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith('w2g')) {
        return;
    }
    
    // could use regex here instead
    const videoUrl = msg.replace('w2g', '').trim();

    getWatchTogetherLink(videoUrl).then(url => msg.reply(`Ewa, hier is uw link bruur: ${url}`));
});

client.login(process.env.DISCORD_TOKEN);

async function getWatchTogetherLink(videoUrl = '') {
    const body = new FormData();

    body.append("api_key", process.env.W2G_API_KEY);
    body.append("share", videoUrl);

    const response = await fetch("https://w2g.tv/rooms/create.json", {
        method: "POST",
        body,
    });

    const res = await response.json();

    return `https://w2g.tv/rooms/${res.streamkey}`;
}
