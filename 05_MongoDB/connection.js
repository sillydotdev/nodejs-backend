const mongoose = require("mongoose");

async function connectMongoDb(url) {
  // connect MongoDB
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDb,
};
