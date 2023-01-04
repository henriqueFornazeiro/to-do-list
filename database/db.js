const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(
      "mongodb+srv://root:JG11GB2dW1OX4Qem@todolist.jnscjdw.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("MongoDB Atlas Conectado");
    })
    .catch((err) => {
      console.log(err)
    });
};

module.exports = connectToDb;
