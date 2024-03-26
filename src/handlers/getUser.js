const connectionDb = require("../database/db");
const User = require("../models/user");
module.exports.handler = async (event, context) => {
  try {
    const { email } = event.pathParameters;
    await connectionDb();
    let userObj = { email };
    userObj = await User.findOne(userObj);
    if (userObj) {
      return {
        statusCode: 201,
        body: JSON.stringify(userObj),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "The requested data is not present" }),
      };
    }
  } catch (error) {
    console.error("Error", error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
