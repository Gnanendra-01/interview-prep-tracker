const mongoose = require('mongoose');

async function checkTopics() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/interview-tracker');
    console.log('Connected to MongoDB');

    const topics = await mongoose.connection.db.collection('topics').find({}).toArray();
    console.log(`Found ${topics.length} topics:`);
    topics.forEach((topic, index) => {
      console.log(`${index + 1}. ${topic.subject} - ${topic.title}`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkTopics();