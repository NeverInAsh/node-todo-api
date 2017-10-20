var mongoose = require('mongoose');

var userlistDB = mongoose.model('userlistDB',{
	email:{ //custom validators for emails can also be added like checking of @ symbol
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}	
});

module.exports = {
	userlistDB
}