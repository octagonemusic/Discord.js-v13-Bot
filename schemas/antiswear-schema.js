const { Schema, model } = require('mongoose')

module.exports = model(
	"antiswear-toggle", 
	new Schema({
		
	    Guild: String,
        Enabled: Number
}))