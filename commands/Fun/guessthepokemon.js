const { Pokemon } = require('djs-games')
const { config } = require('../..')

module.exports = {
    name: "guessthepokemon",
    description: "Play a game of guess the pokemon!",
    run: async(client, message, args) => {
        const game = new Pokemon({
            message: message,
            token: config.dagpi, // Get Your Api Token at https://dagpi.xyz/dashboard
            }) 
            game.start()
    }
}