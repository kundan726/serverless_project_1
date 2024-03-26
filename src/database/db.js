const mongoose = require("mongoose");

let conn = null;

module.exports = async function (event, context) {
  try {
    console.log("111111111111111");

    if (conn == null) {
      console.log("Creating new connection...");
      // conn = await mongoose.createConnection(process.env.DB_URL,{dbName: 'student'}, {
      //   serverSelectionTimeoutMS: 30000
      // });
      conn = mongoose
        .connect(process.env.DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => console.log("Database connected!"))
        .catch((err) => console.log(err));
      console.log("Connection established successfully.");
      return conn;
    } else {
      console.log("Connection already established, reusing the connection.");
      return conn;
    }
  } catch (error) {
    console.error("Error establishing connection:", error);
    throw error; // Rethrow the error to propagate it
  }
};
