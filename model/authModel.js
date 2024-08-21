const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { type } = require('os');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter email"],
        // unique: true,
        // validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        maxlength: [10, "Password cannot exceed 6 characters"],
        select: false,
    },
    name: {
        type: String,
    },
    contact_no: {
        type: String,
    },
    classes: {
        type: String,
    },
    department: {
        type: String,
    },

    role: {
        type:String,
        enum: ['admin', 'student','mentor'],
    },
    action:{
        type:String,
        enum: ['yes','no'],
        default:'yes'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
});
//   userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_TIME,
//     });
//   };

//   userSchema.methods.getRefreshToken = function () {
//     const refreshToken = jwt.sign({ id: this.id }, process.env.JWT_REFRESH_SECRET, {
//       expiresIn: process.env.JWT_REFRESH_EXPIRES_TIME,
//     });
//     return refreshToken;
//   };

userSchema.methods.isValidPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

//   userSchema.methods.getResetToken = function () {
//     //Generate Token
//     const token = crypto.randomBytes(20).toString("hex");

//     //Generate Hash and set to resetPasswordToken
//     this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

//     //Set token expire time
//     this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

//     return token;
//   };
let userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
