require('dotenv').config();

const connectDB = require('./db/connect');
const Job = require('./models/Job');

const data = require('./mock.json');

// console.log('data', data);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Job.deleteMany();
        await Job.insertMany(data);
        console.log('Sucess!');
        process.exit(1);
    } catch (error) {
        console.log('ALGO DEU ERRADO');
    }
}

start();