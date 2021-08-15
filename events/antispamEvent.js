const client = require("../index")
const usersMap = new Map();
const LIMIT = 5;
const TIME = 7000;
const DIFF = 3000;

client.on('messageCreate', async(message) => {
    if(message.author.bot) return;
    const antispamSchema = require("../schemas/antispam-schema")
    const params = {
      guildId: message.guild.id
    }

    antispamSchema.findOne(params, async(err, data) => {
      if(data) {
        const enabled = data.enabled === 1

        if(enabled) {
          if (['832515573991866410', '832520603872657408', '832520734458642482', '832520693559722003', '832523883500273684', '832521864513060904'].includes(message.channel.id)) 
            return;
          if(usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            let msgCount = userData.msgCount;
            console.log(difference);
    
            if(difference > DIFF) {
                clearTimeout(timer);
                console.log('Cleared Timeout');
                userData.msgCount = 1;
                userData.lastMessage = message;
                userData.timer = setTimeout(() => {
                    usersMap.delete(message.author.id);
                    console.log('Removed from map.')
                }, TIME);
                usersMap.set(message.author.id, userData)
            }
            else {
                ++msgCount;
                if(parseInt(msgCount) === LIMIT) {
                    let muterole = message.guild.roles.cache.find(role => role.name === 'Muted');
                    message.member.roles.add(muterole);
                    message.channel.bulkDelete(parseInt(msgCount))
                    message.channel.send('You have been muted!');
                    setTimeout(() => {
                        message.member.roles.remove(muterole);
                        message.channel.send('You have been unmuted!')
                    }, TIME);
                } else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData);
                }
            }
        }
        else {
            let fn = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage : message,
                timer : fn
            });
        }
    
        } else {
          return
        }
      } else {
        return
      }
    })
})