const client = require("../index");

client.on("interactionCreate", async(interaction) => {
    if(interaction.isButton()) {
        
        await interaction.deferReply({ ephemeral: true }).catch(() => {})

        if(interaction.customId === "male") {
       
      
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'male')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "female") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'female')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "transgender") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'non-binary')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "asia") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'asia')
           
            if(!role) return interaction.editReply("This role is not found")
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "europe") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'europe')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "NA") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'north america')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "SA") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'south america')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "africa") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'africa')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "oceania") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'oceania')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "music") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'music')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "reading") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'reading')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "art") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'art')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "gaming") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'gaming')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "piano") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'piano')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "guitar") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'guitar')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
      
          if(interaction.customId === "violin") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'violin')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "drums") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'drums')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "singing") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'singing')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "others") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'other instruments')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "below18") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'below 18')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "above18") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'above 18')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "livestreamping") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'live stream ping')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "deadchatping") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'dead chat ping')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
          if(interaction.customId === "movienightping") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'movie night ping')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
      
    } else return 
})