const mongoose = require('mongoose');
const {isEmail, isStrongPassword} = require('validator');
const bcrypt = require('bcrypt');

const YetkiliSchema = mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:isEmail
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        validate:isStrongPassword
    }
})

YetkiliSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const Yetkili = mongoose.model('yetkili',YetkiliSchema)

module.exports = Yetkili;