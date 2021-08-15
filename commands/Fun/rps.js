const djsgames = require("djs-games")

module.exports = {
    name: "rps",
    description: "Play a game of rock paper scissors.",
    run: async(client, message, args) => {
        const RockPaperScissors = new djsgames.RockPaperScissors()
        RockPaperScissors.startGame(message)
    }
}