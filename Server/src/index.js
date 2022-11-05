if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const router = require("./routes/index");
const express = require('express')
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT ?? 3000;
const app = express()


app.use(express.json())
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}))

app.use(router);

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

const server = app.listen(3000, () =>
  console.log(`Server started with ${PORT}`)
)
