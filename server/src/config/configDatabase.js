const mongoose = require('mongoose');

function connectDatabase() {
  // mongoose
  //   .connect('mongodb://localhost:27017/', {
  //     dbName: 'lights-store'
  //   })

  //mongodb+srv://KrasenBoychev:<db_password>@cluster0.zovge.mongodb.net/

  mongoose
  .connect('mongodb+srv://KrasenBoychev:KrasenBoychev@cluster0.zovge.mongodb.net/', {
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
