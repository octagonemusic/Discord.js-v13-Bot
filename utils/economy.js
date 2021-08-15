const mongo = require('../handler/mongoose')
const profileSchema = require('../schemas/profile-schema')

const coinsCache = {} 
const bankCache = {}

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, OctaCreds) => {

      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            OctaCreds,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      console.log('RESULT:', result)

      coinsCache[`${guildId}-${userId}`] = result.OctaCreds

      return result.OctaCreds
}

module.exports.addBank = async (guildId, userId, BankCreds) => {

  const result = await profileSchema.findOneAndUpdate(
    {
      guildId,
      userId,
    },
    {
      guildId,
      userId,
      $inc: {
        BankCreds,
      },
    },
    {
      upsert: true,
      new: true,
    }
  )

  console.log('RESULT:', result)

  bankCache[`${guildId}-${userId}`] = result.BankCreds

  return result.BankCreds
}

module.exports.getBank = async (guildId, userId) => {
  const cachedBank = bankCache[`${guildId}-${userId}`]
  if (cachedBank) {
    return cachedBank
  }

  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOne()')

      const result = await profileSchema.findOne({
        guildId,
        userId,
      })

      console.log('RESULT:', result)

      let BankCreds = 0
      if (result) {
        BankCreds = result.BankCreds
      } else {
        console.log('Inserting a document')
        await new profileSchema({
          guildId,
          userId,
          BankCreds,
        }).save()
      }

      bankCache[`${guildId}-${userId}`] = BankCreds

      return BankCreds
    } catch(err) {
      console.log(err)
    }
  })
}

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOne()')

      const result = await profileSchema.findOne({
        guildId,
        userId,
      })

      console.log('RESULT:', result)

      let OctaCreds = 0
      if (result) {
        OctaCreds = result.OctaCreds
      } else {
        console.log('Inserting a document')
        await new profileSchema({
          guildId,
          userId,
          OctaCreds,
        }).save()
      }

      coinsCache[`${guildId}-${userId}`] = OctaCreds

      return OctaCreds
    } catch(err) {
      console.log(err)
    }
  })
}