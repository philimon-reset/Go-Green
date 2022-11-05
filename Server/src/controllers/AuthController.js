const passport = require('passport');

class AuthController {
  static async signup(req, res, next) {
    passport.authenticate('signup', (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          message: 'Signup failed',
          err,
          info,
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({
          message: 'signup successful',
          user: user,
        });
      });
    })(req, res, next);
  }

  static async login(req, res, next) {
    passport.authenticate('login', (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          message: 'Login failed',
          err: err,
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({
          message: 'login successful',
          user,
        });
      });
    })(req, res, next);
  }

  static async logout(req, res, next) {
    if (req.isAuthenticated()) {
      // Logout user
      req.logout((err) => {
        if (err) {
          return next(err);
        }

        res.json({
          message: 'Logout successful',
        });
      });
    } else {
      res.status(401).json({
        message: 'Unauthenticated',
      });
    }
  }

  static async me(req, res, next) {
    return res.json(req.user);
  }
}

module.exports = AuthController;