const connectionDb = require('../database/db');
const User = require('../models/user')
module.exports.handler = async (event,context) => {
  try {
    // const { name, email, password } = JSON.parse(event.body);
    await connectionDb();
    // let userObj = {}
    const userObj = await User.find();
    console.log("userObj", userObj)
    return {
      statusCode: 201,
      body : JSON.stringify(userObj)
    }
  } catch (error) {
    console.error("Error",error);
    return {
      statusCode : error.statusCode || 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }
  };
  