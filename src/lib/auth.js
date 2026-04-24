import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.AUTH_DB_URI);

let db;

async function connectDB() {
  if (!db) {
    await client.connect(); // ✅ THIS LINE FIXES YOUR ERROR
    db = client.db();
    console.log("MongoDB connected");
  }
  return db;
}

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(await connectDB(), {
    client,
  }),
});