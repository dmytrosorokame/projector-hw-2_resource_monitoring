const express = require("express");
const { MongoClient } = require("mongodb");
const { Client: ElasticClient } = require("@elastic/elasticsearch");

const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_DATABASE = process.env.MONGO_INITDB_DATABASE;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_COLLECTION = process.env.MONGO_COLLECTION;

const APP_PORT = process.env.APP_PORT;

const URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
const client = new MongoClient(URI);
const db = client.db(MONGO_DATABASE);
const collection = db.collection(MONGO_COLLECTION);

const ELASTIC_HOST = process.env.ELASTIC_HOST;
const ELASTIC_PORT = process.env.ELASTIC_PORT;
const ELASTIC_USER = process.env.ELASTIC_USER;
const ELASTIC_PASSWORD = process.env.ELASTIC_PASSWORD;

const elasticClient = new ElasticClient({
  node: `http://${ELASTIC_HOST}:${ELASTIC_PORT}`,
  auth: {
    username: ELASTIC_USER,
    password: ELASTIC_PASSWORD,
  },
});

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/mongo", async (req, res) => {
  await client.connect();

  const docs = await collection.findOne();

  res.send(JSON.stringify(docs));
});

app.get("/elastic", async (req, res) => {
  const health = await elasticClient.cluster.health({});

  res.send(JSON.stringify(health));
});

app.listen(APP_PORT, () => {
  console.log("Server is listening on port", APP_PORT);
});
