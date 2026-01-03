import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

async function dbConnect() {
    if (isConnected) {
        console.log("Already Connected to Database")
        return
    }
  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1

    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
