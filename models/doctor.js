const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specializations:{type:String,required:false},
  mobile:{type:String,required:true},
  profileImg: { type: String, required: false } 
});

module.exports = mongoose.model('Doctor', doctorSchema);
