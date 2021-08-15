const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    timeout: 5,
    description: 'Searches the internet for images related to your query.',
    usage: '<query>',
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.reply('Please enter a search query')

        const results = await google.scrape(query, 1)
        message.reply(results[0].url);
    }
}