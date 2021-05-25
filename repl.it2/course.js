const mongoose =require('mongoose');

const courseSchema = new mongoose.Schema({
    ID:{
        type: "number",
        require: true
    },
    semester:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    room:{
        type:Number,
        require:true
    },
    day:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    className:{
        type:String,
        require:true
    },
    credits:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;