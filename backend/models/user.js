const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    accountType: { type: String, enum: ['student', 'lab'], required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;