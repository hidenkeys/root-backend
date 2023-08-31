"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Otp = require('../models/Otp');

var bcrypt = require('bcrypt');

var axios = require('axios');

var Cart = require('../models/Cart');

var cookieParser = require('cookie-parser');

function generateRandomSixDigitNumber() {
  var min = 100000; // Minimum value (inclusive)

  var max = 999999; // Maximum value (inclusive)

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var randomNumber = generateRandomSixDigitNumber();

exports.register = function _callee(req, res, next) {
  var _req$body, fullName, email, phoneNumber, alternatePhoneNumber, alternatePhoneNumber2, _req$body2, password, confirmPassword, salt, hashedPassword, registeredUser, user, cart, _user, payload, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, fullName = _req$body.fullName, email = _req$body.email, phoneNumber = _req$body.phoneNumber, alternatePhoneNumber = _req$body.alternatePhoneNumber, alternatePhoneNumber2 = _req$body.alternatePhoneNumber2;
          _req$body2 = req.body, password = _req$body2.password, confirmPassword = _req$body2.confirmPassword;

          if (!(password !== confirmPassword)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Passwords do not match'
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 7:
          salt = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 10:
          hashedPassword = _context.sent;
          password = hashedPassword;
          confirmPassword = 'xxxxxxxxx';
          role = 0;
          registeredUser = ''; // Create a new user instance

          if (!(role === 0)) {
            _context.next = 26;
            break;
          }

          user = new User({
            fullName: fullName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            alternatePhoneNumber: alternatePhoneNumber,
            confirmPassword: confirmPassword,
            alternatePhoneNumber2: alternatePhoneNumber2,
            role: role
          }); // Save the user to the database using await

          _context.next = 19;
          return regeneratorRuntime.awrap(user.save());

        case 19:
          registeredUser = _context.sent;
          cart = new Cart({
            user: registeredUser._id
          });
          _context.next = 23;
          return regeneratorRuntime.awrap(cart.save());

        case 23:
          console.log("this is it : ".concat(cart._id));
          _context.next = 31;
          break;

        case 26:
          if (!(role === 1)) {
            _context.next = 31;
            break;
          }

          _user = new User({
            fullName: fullName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            alternatePhoneNumber: alternatePhoneNumber,
            confirmPassword: confirmPassword,
            alternatePhoneNumber2: alternatePhoneNumber2,
            role: role
          }); // Save the user to the database using await

          _context.next = 30;
          return regeneratorRuntime.awrap(_user.save());

        case 30:
          registeredUser = _context.sent;

        case 31:
          // Generate an access token using jwt.sign
          payload = {
            id: registeredUser._id,
            email: email,
            role: role,
            phoneNumber: phoneNumber
          };
          token = jwt.sign(payload, process.env.JWT_TOKEN); // Respond with the token

          res.cookie('authcookie', token, {
            maxAge: 900000,
            httpOnly: true
          });
          res.status(200).send("registered succesffuly");
          _context.next = 41;
          break;

        case 37:
          _context.prev = 37;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 41:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 37]]);
};

exports.login = function _callee2(req, res) {
  var user, validPass, payload, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: "Invalid mobile"
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 8:
          validPass = _context2.sent;

          if (validPass) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: "Mobile/Email or Password is wrong"
          }));

        case 11:
          // Create and assign token
          payload = {
            id: user._id,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber
          };
          token = jwt.sign(payload, process.env.JWT_TOKEN);
          res.cookie('authcookie', token, {
            maxAge: 900000,
            httpOnly: true
          });
          res.status(200).json({
            message: "Login successful"
          });
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Server error"
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.userEvent = function (req, res) {
  res.status(200).send("user event accessed by user");
};

exports.adminEvent = function (req, res) {
  res.status(200).send("admin event accessed by admin");
};

exports.otpEvent = function _callee3(req, res) {
  var token, decoded, hh, otp, user, email, phoneNumber, sendMessage, pass;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          token = req.cookies.authcookie;
          decoded = jwt.verify(token, process.env.JWT_TOKEN);
          req.user = decoded;
          hh = decoded;
          console.log(decoded);
          otp = randomNumber;
          _context4.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: hh.email
          }));

        case 8:
          user = _context4.sent;
          email = hh.email;
          phoneNumber = hh.phoneNumber;

          sendMessage = function sendMessage(msg) {
            var _len,
                phoneNumber,
                _key,
                requestBody,
                headers,
                response,
                _args3 = arguments;

            return regeneratorRuntime.async(function sendMessage$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    for (_len = _args3.length, phoneNumber = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                      phoneNumber[_key - 1] = _args3[_key];
                    }

                    requestBody = {
                      from: process.env.SINCH_NUMBER,
                      to: phoneNumber,
                      body: msg
                    };
                    headers = {
                      Authorization: "Bearer ".concat(process.env.API_TOKEN),
                      "Content-Type": "application/json"
                    };
                    _context3.prev = 3;
                    _context3.next = 6;
                    return regeneratorRuntime.awrap(axios({
                      url: process.env.API_URL,
                      method: "post",
                      headers: headers,
                      data: requestBody
                    }));

                  case 6:
                    response = _context3.sent;
                    console.log(response.data);
                    _context3.next = 13;
                    break;

                  case 10:
                    _context3.prev = 10;
                    _context3.t0 = _context3["catch"](3);
                    throw new Error("something went wrong: ", _context3.t0);

                  case 13:
                  case "end":
                    return _context3.stop();
                }
              }
            }, null, null, [[3, 10]]);
          };

          pass = new Otp({
            email: email,
            phoneNumber: phoneNumber,
            oneTP: otp
          });
          _context4.next = 15;
          return regeneratorRuntime.awrap(pass.save());

        case 15:
          sendMessage("your otp has been sent ".concat(otp), phoneNumber).then(res.status(200).send("Your otp has been sent"))["catch"](function (err) {
            return res.status(400).send("problem sending otp ".concat(err));
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.verifyOtp = function _callee4(req, res) {
  var token, decoded, hh, otp;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = req.cookies.authcookie;
          decoded = jwt.verify(token, process.env.JWT_TOKEN);
          req.user = decoded;
          hh = decoded;
          console.log(hh);
          _context5.next = 7;
          return regeneratorRuntime.awrap(Otp.findOne({
            email: hh.email
          }));

        case 7:
          otp = _context5.sent;
          console.log(otp);
          typedOtp = req.body.typedOtp;
          checkOtp = otp.oneTP;

          if (checkOtp == typedOtp) {
            otp.deleteOne({
              email: hh.email
            }, function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log('valid otp done and fghj');
                res.status(200).send("valid otp");
              }
            });
          } else {
            res.status(400).send("invalid");
          }

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  });
};