const mongoose = require('mongoose');
const { Schema } = mongoose;

const PictureSchema = new Schema({
  text: {
    type: String,
  },
  price: {
    type: String,
  },
  images: {
    type: Array,
  },
  type: {
    type: String,
  }
});

module.exports = {
  PictureModel: mongoose.model('picture', PictureSchema)
};