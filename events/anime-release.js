const client = require("../index")
let Parser = require('rss-parser');
let parser = new Parser();
const moment = require("moment-timezone")

client.on("ready", async () => {

    let latestnews = " "

    setInterval(async() => {
        let feed = await parser.parseURL('https://www.livechart.me/feeds/episodes');
        let displaynews = feed.items[0].title

        if (displaynews !== latestnews) {
            latestnews = displaynews
            client.channels.cache.get("867089759288426496").send(`**📰 | ${feed.items[0].title}**\n\n${feed.items[0].link}`)
        }
    }, 10000)
    

})