import dotenv from 'dotenv';
dotenv.config()
import { MongoClient, ServerApiVersion } from 'mongodb';

// Make sure these environment variables are set in your .env file
if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
    console.error('MongoDB credentials are missing in .env file');
    process.exit(1);
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.icwum82.mongodb.net/taskflow?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");
        return client;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default connectDB;
