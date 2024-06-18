const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const studentSchema = new Schema ({

firstName: {
    type: String
},
lastName:{
    type:String
},
email:{
    type:String
},
phone:{
    type: String
},
linkedinUrl:{
    type: String
},
languages:{
    type:Array
},
program:{
    type: String
},
background:{
    type: String
},
image:{
    type: String,
    default:" https://i.imgur.com/r8bo8u7.png"
},
cohort:{
    type: ObjectId
},
projects:{
    type: Array
} 


})
const Student = mongoose.model("Student", studentSchema)

module.exports = Student



    