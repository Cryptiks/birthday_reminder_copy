// require mongoose
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// my schema goes here!
var User = new mongoose.Schema({
  // username, password provided by plugin
  friends:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }]
});
User.plugin(passportLocalMongoose);

var Friend = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	firstName: {type: String, required: true},
  lastName: {type: String, required: true},
	birthday: { type: mongoose.Schema.Types.ObjectId, ref: 'Birthday', required: true},
	checked: {type: Boolean, default: false, required: true}
});

var Birthday = new mongoose.Schema({
  // user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  friend: {type: String, required: true},
  month: {type: String, required: true},
  day: {type: String, required: true},
  year: {type: String, required: false},
});

// "register" it so that mongoose knows about it
mongoose.model('User', User);
mongoose.model('Friend', Friend);
mongoose.model('Birthday', Birthday);

// connect
// mongoose.connect('mongodb://localhost/birthdaydb');
mongoose.connect('mongodb://birthdayadmin:ares1994@ds023213.mlab.com:23213/birthdaydb');
