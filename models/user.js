// const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

// const userSchema = new mongoose.Schema({
//   username: {
//       type: String,
//       unique: true,
//       required: true,
//       minLength: 3
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   passwordHash: String,
//   blogs: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Blog'
//     }
//   ],
// })

// userSchema.plugin(uniqueValidator)
// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//     // the passwordHash should not be revealed
//     delete returnedObject.passwordHash
//   }
// })

// const User = mongoose.model('User', userSchema)

// module.exports = User

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    minLength: [3, 'username is too short'],
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [3, 'password is too short']
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

// userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)