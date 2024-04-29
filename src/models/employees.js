const mongoose = require('mongoose')
const validator = require('validator')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    }, 
    email: {
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
    position: {
        type: String,
        required: true,
        trim: true
    },
    branch: {
        type: String,
        required: true,
        trim: true
    },

})
