const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  subject: { type: String, required: true, enum: ['DSA', 'DBMS', 'OS', 'CN'] },
  title: { type: String, required: true, unique: true },
  notes: { type: String, default: '' },
  resources: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);
