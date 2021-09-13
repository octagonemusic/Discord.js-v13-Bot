const client = require("../index")
let Parser = require('rss-parser');
let parser = new Parser();

client.on("ready", async () => {

    let latestnews = " "

    while (true) {

        let feed = await parser.parseURL('https://www.animenewsnetwork.com/news/rss.xml?ann-edition=in');
        let displaynews = feed.items[0].title

        if (displaynews !== latestnews) {
            latestnews = displaynews
            client.channels.cache.get("815941349911166976").send(`**📰 | ${feed.items[0].title}**\n\n${feed.items[0].link}\n\n<@&820979331677028382>`)
        }
    }

})