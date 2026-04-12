const express = require('express');
const Topic = require('../models/Topic');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(auth);

router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find().sort({ subject: 1, title: 1 });
    const progress = await Progress.find({ userId: req.user.id });
    const progressMap = progress.reduce((map, item) => {
      map[item.topicId.toString()] = item.status;
      return map;
    }, {});

    let mergedTopics = topics.map((topic) => ({
      _id: topic._id,
      subject: topic.subject,
      title: topic.title,
      notes: topic.notes,
      resources: topic.resources,
      status: progressMap[topic._id.toString()] || 'not-started'
    }));

    // Apply status filter if provided
    if (req.query.status && req.query.status !== 'all') {
      mergedTopics = mergedTopics.filter(topic => topic.status === req.query.status);
    }

    res.json(mergedTopics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { subject, title, notes, resources } = req.body;
    if (!subject || !title) {
      return res.status(400).json({ error: 'Subject and title are required' });
    }

    const topic = new Topic({ subject, title, notes: notes || '', resources: resources || '' });
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add topic' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['not-started', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    const progress = await Progress.findOneAndUpdate(
      { userId: req.user.id, topicId: id },
      { status },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({
      _id: topic._id,
      subject: topic.subject,
      title: topic.title,
      notes: topic.notes,
      resources: topic.resources,
      status: progress.status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update topic status' });
  }
});

module.exports = router;
