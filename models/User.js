const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    fullName: {
        type: string,
        required: true,
    },
    email: {
        type: string,
        required: true,
        unique: true,
    },
    password: {
        type: string,
        required: true,
    }
})

UserSchema.pre('save', async function (next) {
    const user = this;
    const structFulltName = user.fullName[0].toLowerCase() + user.fullName.slice(1)
    user.account.fullName = structFulltName

    // if (user.account.password.length() < 33) {
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(user.account.password, salt)
    //     user.account.password = hashedPassword
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword

    next();
})

UserSchema.post("save", function (err, doc, next) {
    const user = this;
})

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;