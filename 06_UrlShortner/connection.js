const mongoose = require("mongoose");

async function connectMongoDB(mongoUrl) {
  return mongoose.connect(mongoUrl);
}

module.exports = {
  connectMongoDB,
};
