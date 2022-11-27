const { user, upload } = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/generateToken')

const fs = require('fs')
const path = require('path')

const registerUser = async (req, res) => {
    console.log('Signup request Called')
    // console.log(req.body.pic.path)

    const mail = req.body.mail
    const useExist = await user.findOne({ 'mail': mail }).then((d) => {
        return d;
    })

    if (useExist) {
        res.status(200).send('username already exists');
    }
    else {
        var picData;
        const picPath = 'F:\\userRe\\express\\assets\\images\\'
        if (req.body.pic.path) {
            picData = await fs.readFileSync(path.join(req.body.pic.path));

            // picData = await fs.readFileSync(path.join(picPath + req.file.filename));
            // fs.unlinkSync(path.join(picPath + req.file.filename))
        }
        else {
            picData = fs.readFileSync(path.join(picPath + "z.jpg"))
        }
        const d = new user({
            pic: {
                data: picData,
                contentType: req.file ? req.file.mimetype : 'image/jpg'
            },
            name: req.body.name,
            mail: req.body.mail,
            password: req.body.password,
        })
        d.save().then(() => {
            res.status(200).send('Registered')
        }).catch((e) => {
            res.status(200).send(e.message)
        })
    }
}

const authUser = asyncHandler(async (req, res) => {
    console.log('Login request Called')
    const { mail, password } = req.body
    const User = await user.findOne({ 'mail': mail });

    if (User) {
        if(await User.matchPassword(password)){
            res.status(201).json({
                _id: User._id,
                pic: User.pic,
                name: User.name,
                token: generateToken(user._id)
            })
        }
        else{
            res.status(400).send("Wrong Password")
        }
    }
    else {
        res.status(400).send('No such user registered')
    }
})

module.exports = { registerUser, authUser }