// passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  getUserByEmail,
  getUserById,
  createUser,
} = require("../services/userServices");
const { generateToken } = require("../utils/tokenUtils");
const { token } = require("morgan");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await getUserByEmail(email);

        if (!user) {
          const password = generateRandomPassword();
          user = await createUser({
            email: email,
            password: password,
          });
        }

        // Generate a token for the user
        const token = generateToken({
          id: user.id,
          email: user.email,
        });
        console.log("This is the token =" + " " + token);

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

function generateRandomPassword() {
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return password;
}

module.exports = passport;
