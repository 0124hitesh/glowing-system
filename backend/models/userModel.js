const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// const multer = require("multer");

const userSchema = mongoose.Schema(
    {
      pic: {
        data: Buffer,
        contentType: String,
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      mail: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      }
    },
    {
      timestamps: true,
    }
  );

  // save image
  // const imgstorage = multer.diskStorage({
  //   destination: function (req, file, callback) {
  //     callback(null, './assets/images');
  //   },
  //   filename: function (req, file, callback) {
  //     callback(null, file.originalname);
  //   }
  // });
  
  // const upload = multer({ storage: imgstorage });
  

  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // will encrypt password everytime its saved
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  const user = mongoose.model('USer', userSchema)
  module.exports = {user}