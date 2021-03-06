const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const musicianSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter your Name",
  },
  contact: {
    type: String,
    trim: true,
    required: "Enter a contact note",
  },
  phone: {
    type: Number,
    trim: true,
    required: "Enter a phone number",
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  password: {
    type: String,
    unique: false
  },
  genre: {
    type: String,
    trim: true,
    required: "Enter a genre",
  },
  instrument: {
    type: String,
    trim: true,
    required: "Enter an instrument",
  },
  imageURL: {
    type: String,
    trim: true,
    required: "Enter an image URL",
  },
  bio: {
    type: String,
    trim: true,
    required: "Enter bio",
  },
  city:{
    type: String,
    trim: true,
    required: "Enter the city you live in"
  }
});

musicianSchema.methods = {
  checkPassword: function(input){
    return bcrypt.compareSync(input, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

musicianSchema.pre('save', function (next) {
  if(!this.password) {
    console.log('NO PASSWORD PROVIDED')
    next()
  } else {
    console.log('hashPassword in pre save');
    this.password = this.hashPassword(this.password)
    next()
  }
})

const musician = mongoose.model("Musician", musicianSchema);
module.exports = musician;