const jwt = require("jsonwebtoken");

const createUnsubscribeUrl = (email) => {
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return `https://weylor.world/unsubscribe?token=${token}`;
};

module.exports = { createUnsubscribeUrl };
