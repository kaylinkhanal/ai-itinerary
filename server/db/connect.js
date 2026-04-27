import mongoose from 'mongoose';

connectDb().catch(err => console.log(err));

async function connectDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tripaidb');
    console.log('Connected to MongoDB');
}

export default connectDb;