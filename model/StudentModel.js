const mongoose = require('mongoose');

let StudentSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        degree: String,
        avg: String,
    },
    {
        strict:false
    }
)

const StudentModel = mongoose.model("StudentSchema",StudentSchema);

module.exports = StudentModel;