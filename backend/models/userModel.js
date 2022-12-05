const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Your Name "],
    maxLength: [30, "Name cannot be more than 30 character"],
    minLength: [4, "Name cannot be less than 4 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "please enter 8 character password"],
    select: false,
  },
  avatar: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare Password

userSchema.methods.comparePassword = async function (password) {
  // console.log(await bcrypt.compare(password, this.password));
  return await bcrypt.compare(password, this.password);
};

//Generating Password reset token

userSchema.methods.getResetPasswordToken = function () {
  //generating token

  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to the userSchema

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
