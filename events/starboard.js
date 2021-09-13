const { StarboardClient } = require("reconlx")
const client = require("../index")

const starboardClient = new StarboardClient({
    client: client,
    Guilds: [
        {
            id: "703669357632290946",
            options: {
                starCount: 5,
                starboardChannel: "833230201478447104",
            },
        },
    ],
})

module.exports = starboardClient