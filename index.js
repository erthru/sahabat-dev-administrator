const express = require("express");
const router = require("./router");
const dotEnv = require("dotenv");
const flash = require("connect-flash");
const localMiddleware = require("./middlewares/local");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");
const cors = require("cors");

dotEnv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
);

app.use(flash());
app.use(localMiddleware);
app.use(methodOverride("overrideMethod"));
app.use(router);
app.set("view engine", "ejs");

app.listen(Number(process.env.PORT), function () {
  console.log(`server run on port: ${process.env.PORT}`);
});
