import connectDB from "./db.js";

let client;

export async function getCollection() {
  if (!client) {
    client = await connectDB();
  }
  return client.db("taskflow").collection("users");
}

export async function getUserByUsername(username) {
  const collection = await getCollection();
  return await collection.findOne({ username });
}

export async function addUser(
  firstName,
  lastName,
  email,
  username,
  hashedPassword,
  phone
) {
  const collection = await getCollection();
  await collection.insertOne({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
    phone,
    createdAt: new Date()
  });
}
