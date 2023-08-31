const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt')
let hh = {}

exports.verifyUserToken = (req, res, next) => {
  const token = req.cookies.authcookie; // Use optional chaining to check if authcookie exists

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    hh = decoded
    next();
    
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};


exports.IsUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: hh.email });

    console.log(req.user.email, req.user.role);

    if (!user || user.role !== 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// exports.IsAdmin = async (req, res, next) => {
  
//   const user = await User.findOne({ email: hh.email });

//   if (!user || user.role !== 1) {
//       console.log("User is an admin");
//       next();
//   } else {
//       console.log("User is not an admin");
//       return res.status(401).send("Unauthorized!");
//   }
// };

exports.IsAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: hh.email });

    if (!user || user.role !== 1) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
