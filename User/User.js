const mongoose = require('mongoose');

mongoose.model('User', {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber:{
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})