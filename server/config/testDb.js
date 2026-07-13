const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const startTestMongo = async () => {
  mongoServer = await MongoMemoryServer.create();
  return mongoServer.getUri();
};

const stopTestMongo = async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
};

module.exports = { startTestMongo, stopTestMongo };
