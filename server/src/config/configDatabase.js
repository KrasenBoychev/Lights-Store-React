const mongoose = require('mongoose');
const { mongodbCredentials } = require('../credentials/mongodbCredentials');

function connectDatabase() {
  // mongoose
  //   .connect('mongodb://localhost:27017/', {
  //     dbName: 'lights-store'
  //   })

  mongoose
  .connect(`mongodb+srv://${mongodbCredentials}@cluster0.zovge.mongodb.net/`, {
    dbName: 'lights-store'
  })

    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      console.log('Connected to your database');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { connectDatabase };
