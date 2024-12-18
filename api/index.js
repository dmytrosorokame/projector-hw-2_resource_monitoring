const express = require("express");
const { MongoClient } = require("mongodb");
const { Client: ElasticClient } = require("@elastic/elasticsearch");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DATABASE = process.env.MONGO_INITDB_DATABASE;
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION;

const ELASTIC_URI = process.env.ELASTIC_URI;

const client = new MongoClient(MONGODB_URI);
const db = client.db(MONGODB_DATABASE);
const collection = db.collection(MONGODB_COLLECTION);

const elasticClient = new ElasticClient({
  node: ELASTIC_URI,
});

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.get("/mongo", async (_, res) => {
  await client.connect();

  const docs = await collection.findOne();

  res.send(JSON.stringify(docs));
});

app.get("/elasticsearch", async (_, res) => {
  const health = await elasticClient.cluster.health({});

  res.send(JSON.stringify(health));
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
