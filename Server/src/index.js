if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const express_session = require("express-session");
const passport = require("passport");
const RedisStore = require("connect-redis");
const { createClient } = require("redis");

const PORT = process.env.PORT ?? 3000;
require("./Util/auth");
const app = express();
const router = require("./routes/index");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// ===> session & AUTH
let redisClient = createClient({
  legacyMode: true,
});
redisClient.connect().catch(console.error);

let sessionStore = new (RedisStore(express_session))({
  client: redisClient,
});

app.use(
  express_session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET ?? "HARDKEY123",
    store: sessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ===> CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// ====================================================

app.use("/api", router);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.meta) {
    return res.status(500).json({ message: "Database error", meta: err.meta });
  }
  const code =
    typeof Number(err.code) === "number" && !isNaN(Number(err.code))
      ? Number(err.code)
      : 500;
  return res
    .status(code)
    .json({ err, message: err?.message, method: err.method });
});

const server = app.listen(PORT, () =>
  console.log(`Server started with ${PORT}`)
);
