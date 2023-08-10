const mongoose = require('mongoose');

//------------------ User schema to store the users ---------
const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: [5, "Title must be 5 char long "], maxlength: [80, "Title mustn't 150 char long"] },

    description: { type: String, required: true, minlength: [12, "Description must be 5 char long "], maxlength: [200, "Description mustn't 150 char long"] },

    lectures: [{
        title: { type: String, required: true, minlength: [5, "Title must be 5 char long "], maxlength: [80, "Title mustn't 150 char long"] },

        description: { type: String, required: true, minlength: [12, "Description must be 5 char long "], maxlength: [200, "Description mustn't 150 char long"] },

        videos: {
            public_id: String, url: String,
        },
        poster: {
            public_id: String, url: String,
        },
        views: Number,
        // isPremium : {
        //     type: Boolean,
        //     default: false
        // }
    }],

    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    poster: {
        public_id: String, url: String,
    },

    totalVideos: {
        type: Number, default: 0, required: true, validate: {
            validator: function (value) {
                if (value < 0)
                    throw new Error("total videos can't be negative")
            }
        }
    },

    category: {
        type: String,
        enum: {
            values: ['webdevelopment', 'backend', 'frontend', 'appdevelopment', 'machinelearning', 'artificial intelligence'],
            message: `{VALUE} is not support as a category of the course`
        }
    },


}, { timestamps: true })


//Modal to which collection form we save the data
const CourseModal = mongoose.model('Course', CourseSchema)

module.exports = CourseModal