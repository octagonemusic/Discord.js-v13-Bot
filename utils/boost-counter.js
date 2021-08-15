module.exports = async (client) => {
    const guild = client.guilds.cache.get('832467028802797578');
    setInterval(() => {
        const boostCount = guild.premiumSubscriptionCount || '0';
        const channel = guild.channels.cache.get('856458253974372373')
        channel.setName(`𝔅𝔬𝔬𝔰𝔱𝔰: ${boostCount.toLocaleString()}`)
    }, 5555);
}  