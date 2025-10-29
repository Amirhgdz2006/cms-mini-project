const mongoose = require('mongoose');

const ContentTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  fields: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true, enum: ['string', 'number', 'boolean', 'date', 'text'] },
      required: { type: Boolean, default: false },
      unique: { type: Boolean, default: false }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContentType', ContentTypeSchema);
