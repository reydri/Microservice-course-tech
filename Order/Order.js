const mongoose = require('mongoose');

mongoose.model('Order', {
    UserID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    CourseID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require:true
    }
})