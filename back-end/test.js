const { MongoClient } = require("mongodb");

mongoose.connect(
  "mongodb+srv://benedict_db_user:we28092007@cluster0.q75cjqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected!");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

run();