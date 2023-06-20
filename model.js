const mongoose = module.require('mongoose');

const studentSchema = mongoose.Schema({
      firstname:{
            type:String,
            max_length:255,
            required:true,
      },
      lastname:{
        type:String,
        max_length:255,
        required:true,

      },

        email:{
        type:String,
        max_length:255,
        required:true,
        unique:true,

      },

        phone:{
        type:String,
        max_length:255,
        required:true,
        unique:true,

      },

        course:{
        type:String,
        max_length:255,
        require:true,

      },

        status:{
        type:String,
        max_length:12,
        require:true,

      },


})

module.exports = mongoose.model('students',  studentSchema)