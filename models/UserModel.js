const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = 'secret';
const SALT_FACTOR = 10;

const { Schema } = mongoose;

const UserSchema = new Schema({
  login: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    set: rawPassword => bcrypt.hashSync(rawPassword, SALT_FACTOR)
  },
  orderMenu: {
    type: Array
  }
});

UserSchema.methods.auth = function (password) {
  return bcrypt.compare(password, this.password).then(result => {
    if(result) {
      return jwt.sign({ _id: this._id }, secret);
    }
  })
}

UserSchema.statics.verifyToken = function (token) {
  return new Promise((res, rej) => {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) return rej(err);
      return res(decoded);
    });
  })
};


const UserModel = mongoose.model('admins', UserSchema);

module.exports = UserModel;