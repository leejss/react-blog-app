import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

UserSchema.methods = {
  setPassword: async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
  },
  checkPassword: async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
  },
  // hide hasehd password
  serialize: function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
  },
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.methods.generateToken = function () {
  // token에 id와 username을 담는다.
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    config.jwtSecret,
    {
      expiresIn: '7d',
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
