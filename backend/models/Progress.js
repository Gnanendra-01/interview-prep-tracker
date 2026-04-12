const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  topicId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Topic' },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started'
  }
}, { timestamps: true });

progressSchema.index({ userId: 1, topicId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
