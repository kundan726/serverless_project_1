const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Please set a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        trim: true,
        select: false
    }
});

userSchema.pre('save', async function(next) {
    try {
        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);
