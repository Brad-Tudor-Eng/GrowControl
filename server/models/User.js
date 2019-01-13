const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const validator= require('validator');

const UserSchema = new Schema({
  username: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        validate: {
          validator: validator.isEmail,
          message: `{VALUE} is not a valid email`
        }
      },
      password: {
        type: String,
        require: true,
        minlength: 3
      }
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;