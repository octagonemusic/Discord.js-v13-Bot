module.exports = async (client) => {
    const guild = client.guilds.cache.get('832467028802797578');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('834401817721831444')
        channel.setName(`𝔐𝔢𝔪𝔟𝔢𝔯𝔰: ${memberCount.toLocaleString()}`)
    }, 5555);
}  