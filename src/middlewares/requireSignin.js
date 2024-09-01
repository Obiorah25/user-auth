const { verifyToken } = require("../helpers/jwtHelpers");
const { JWT_SECRET } = require("../config/index");
const requireSignin = (req, res, next) => {
  try {
    // destructure access token from req.cookie object
    console.log(req.cookies);
    const { accessToken } = req.cookies;
    // return 401 error if cookie is not provided by client
    if (!accessToken) {
      return res.status(401).json({ error: "Access Denied" });
    }
    // verify token with verifyToken helpers function using the accessToken and the accessToken Secret
    const payLoad = verifyToken(accessToken, JWT_SECRET);
    // payload is the user information....what was encoded in the token

    // If payload is not returned from the verifyToken function, return 403 error
    if (!payLoad) {
      return res.status(403).json({ error: "Access Denied" });
    }
    // append payload to api req(request) object
    req.user = payLoad;
    // call the next function to move forward
    next();
  } catch (error) {
    res.status(403).json({ error: "invalid token" });
  }
};

module.exports = requireSignin;
