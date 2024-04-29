const mongoose = require('mongoose')
const validator = require('validator')

const eventsSchema = new mongoose.Schema({
    employerID: {
        type: String,
        required: true,
        trim: true

    }, 
    eventName: {
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
    startTime: {
        type: timestamp,
        required: true

    },
    endTime: {
        type: timestamp,
        required: true

    },
})