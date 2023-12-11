// Application server
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const QuestionsController = require("./models/questionsController");
const AnswersController = require("./models/answersController");
const TagsController = require("./models/tagsController");
const CommentsController = require("./models/commentsController");
const { AuthController } = require("./models/AuthController");

const database = require("./models/database");
const { UsersController } = require("./models/usersController");

const app = express();

console.log("Server online. Database instance connected");

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

let secret = generateRandomString(32);

app.use(
  session({
    secret: secret,
    cookie: {
      httpOnly: true,
      sameSite: true,
      maxAge: 3600000,
    },
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore(),
  })
);

const port = 8000;

database.connect().then(() => {
  QuestionsController(app);
  AnswersController(app);
  TagsController(app);
  CommentsController(app);
  AuthController(app);
  UsersController(app);
  app.listen(port);

  function shutdown_server() {
    database.disconnect();
    console.log("Server closed. Database instance disconnected");
    process.exit(0);
  }

  process.on("SIGINT", shutdown_server);
});
