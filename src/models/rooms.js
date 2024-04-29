const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const roomSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        trim: true

    }, 
    name: {
        type: String,
        unique: true,
        required: true,
        lowercase: true ,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('This is not a valid Email')
            }
        }
        
    },
    location: {
        type: timestamp,
        required: true,
        trim: true

    }
})