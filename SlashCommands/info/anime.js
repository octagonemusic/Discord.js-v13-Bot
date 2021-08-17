const { MessageEmbed } = require("discord.js")
const malScraper = require("mal-scraper")

module.exports = {
    name: "anime",
    description: "Fetches information about the specified anime.",
    options: [
       {
        name: "name",
        description: "Type the name of the anime",
        type: "STRING",
        required: true
        }
    ],
    run: async(client, interaction, args) => {
        const [name] = args
        if(!name) return interaction.followUp("Please specify name of anime!")
        if(name === `boku no pico`) return interaction.followUp(`Don't search cursed stuff, you sick ass bastard`)


        malScraper.getInfoFromName(name)
        .then((data) => {
            console.log(data)
            let string = data.synopsis
            const synopsis = string.substring(0, 900) + `...[Read More](${data.url})`
            if(data.genres.includes('Hentai')) return interaction.followUp("Fucking pervert")
            const embed = new MessageEmbed()
            .setAuthor(interaction.guild.name)
            .setTitle(`Anime Details!`)
            .setURL(data.url)
            .addFields(
                {
                    name: `Title`,
                    value: `${data.title} (${data.japaneseTitle})`
                },
                {
                    name: `Synopsis`,
                    value: synopsis
                }
            )
            .addField(`Other Info`, `**Genres: \`${[data.genres]}\`\nRating: \`${data.rating}\`\nEpisodes: \`${data.episodes}\`\nStatus: \`${data.status}\`\nAired: \`${data.aired}\`\nStudios: \`${[data.studios]}\`\n**`, true)
            .addField(`MAL Stats`, `**Score: \`${data.score}\`\nNumber of scores: \`${data.scoreStats}\`\nRanked: \`${data.ranked}\`\nPopularity: \`${data.popularity}\`\nMembers: \`${data.members}\`\nFavorites: \`${data.favorites}\`**`, true)
            .setImage(data.picture)
            .setColor("RANDOM")
            interaction.followUp({embeds: [embed]})
        })
        .catch((err) => console.log(err))
    }
}