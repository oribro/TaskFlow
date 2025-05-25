import connectDB from "./db.js";

let client;

export async function getCollection() {
  if (!client) {
    client = await connectDB();
  }
  return client.db("taskflow").collection("tasks");
}

export async function postTask(title, description, username) {
    try {
      const collection = await getCollection();
      await collection.insertOne({
        title,
        description,
        username,
        createdAt: new Date()
      });
  
    } catch (err) {
      console.log(err);
      throw err;
    } 
  }

  export async function getUserTasks(username) {
    try {
      const collection = await getCollection();
      const tasks = await collection.find({
        username: username
      });
     
      return tasks;
  
    } catch (err) {
      console.log(err);
      throw err;
    } 
  }

  export async function updateTask(title, description) {
    try {
      const collection = await getCollection();
      await collection.updateOne({
        title: title
      }, {
        $set: {
            title: title,
          description: description
        }
      });
  
    } catch (err) {
      console.log(err);
      throw err;
    } 
  }

  export async function deleteTask(title) {
    try {
      const collection = await getCollection();
      await collection.deleteOne({
        title: title
      });
  
    } catch (err) {
      console.log(err);
      throw err;
    } 
  }