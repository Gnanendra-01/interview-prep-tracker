const mongoose = require('mongoose');

async function checkUsers() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/interview-tracker');
    console.log('Connected to MongoDB');

    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log(`Found ${users.length} users:`);
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} - ${user.email}`);
    });

    const progress = await mongoose.connection.db.collection('progresses').find({}).toArray();
    console.log(`Found ${progress.length} progress records`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUsers();