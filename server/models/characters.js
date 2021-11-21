const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
  skin: {
    type: String,
    required: true,
  },
});

const Character = model('Character', characterSchema);

module.exports = Character;


