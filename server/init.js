// Setup database with initial test data.
let userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith("mongodb")) {
  console.log("ERROR: You need to specify a valid mongodb URL as the first argument");
  return;
}

let Tag = require("./models/tags");
let Answer = require("./models/answers");
let Question = require("./models/questions");
let User = require("./models/users");
let Comment = require("./models/comments");

let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let tags = [];
let answers = [];
function tagCreate(name, user) {
  let tag = new Tag({ name: name, createdBy: user });
  return tag.save();
}

function answerCreate(text, ans_by, ans_date_time, active_date) {
  answerdetail = { text: text };
  if (ans_by != false) answerdetail.ans_by = ans_by;
  if (ans_date_time != false) answerdetail.ans_date_time = ans_date_time;
  if (active_date != false) answerdetail.active_date = active_date;

  let answer = new Answer(answerdetail);
  return answer.save();
}

function questionCreate(title, text, tags, answers, asked_by, ask_date_time, active_date, views) {
  qstndetail = {
    title: title,
    text: text,
    tags: tags,
    asked_by: asked_by,
  };
  if (answers != false) qstndetail.answers = answers;
  if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
  if (active_date != false) qstndetail.active_date = active_date;
  if (views != false) qstndetail.views = views;

  let qstn = new Question(qstndetail);
  return qstn.save();
}

function userCreate(
  username,
  email,
  password,
  questions,
  answers,
  tags,
  comments,
  upvotedQuestions,
  downvotedQuestions,
  points,
  createDate
) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  usrdetail = {
    username: username,
    email: email,
    password: hashedPassword,
  };

  if (questions !== false) {
    usrdetail.questions = questions;
  }
  if (answers !== false) {
    usrdetail.answers = answers;
  }
  if (tags !== false) {
    usrdetail.tags = tags;
  }
  if (comments !== false) {
    usrdetail.comments = comments;
  }
  if (points !== false) {
    usrdetail.points = points;
  }
  if (createDate !== false) {
    usrdetail.createDate = createDate;
  }

  if (upvotedQuestions !== false) {
    usrdetail.upvotedQuestions = upvotedQuestions;
  }

  if (downvotedQuestions !== false) {
    usrdetail.downvotedQuestions = downvotedQuestions;
  }

  let usr = new User(usrdetail);

  return usr.save();
}

const populate = async () => {
  let u1 = await userCreate(
    "cmorgan",
    "email@email.com",
    "1234",
    false,
    false,
    false,
    false,
    false,
    false,
    76,
    new Date("2023-02-13T09:36:00")
  );
  let u2 = await userCreate(
    "mjn0830",
    "fake@fake.com",
    "abcd",
    false,
    false,
    false,
    false,
    false,
    false,
    21,
    new Date("2023-01-02T11:47:00")
  );
  let u3 = await userCreate(
    "test1234",
    "email@fake.com",
    "wxyz",
    false,
    false,
    false,
    false,
    false,
    false,
    553,
    new Date("2022-12-29T06:33:00")
  );
  let t1 = await tagCreate("react", u1);
  let t2 = await tagCreate("javascript", u1);
  let t3 = await tagCreate("android-studio", u2);
  let t4 = await tagCreate("shared-preferences", u2);
  let a1 = await answerCreate(
    "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
    u2,
    new Date("2023-11-26T03:24:42"),
    new Date("2023-11-26T03:24:42")
  );
  let a2 = await answerCreate(
    "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    u2,
    new Date("2023-11-25T08:24:00"),
    new Date("2023-11-25T08:24:00")
  );
  let a3 = await answerCreate(
    "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.",
    u1,
    new Date("2023-11-18T09:24:00"),
    new Date("2023-11-18T09:24:00")
  );
  let a4 = await answerCreate(
    "YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);",
    u1,
    new Date("2023-11-12T03:30:00"),
    new Date("2023-11-12T03:30:00")
  );
  let a5 = await answerCreate(
    "I just found all the above examples just too confusing, so I wrote my own. ",
    u1,
    new Date("2023-11-02T15:24:19"),
    new Date("2023-11-02T15:24:19")
  );
  let a6 = await answerCreate(
    "Test Answer for Active sort",
    u2,
    new Date("2023-11-27T15:24:19"),
    new Date("2023-11-27T15:24:19")
  );
  let q1 = await questionCreate(
    "Programmatically navigate using React router",
    "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate.",
    [t1, t2],
    [a1, a2],
    u1,
    new Date("2023-11-24T03:24:00"),
    new Date("2023-11-26T03:24:42"),
    false
  );
  let q2 = await questionCreate(
    "android studio save string shared preference, start activity and load the saved string",
    "I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.",
    [t3, t4, t2],
    [a3, a4, a5],
    u2,
    new Date("2023-11-01T11:24:30"),
    new Date("2023-11-18T09:24:00"),
    121
  );
  let q3 = await questionCreate(
    "Cypress delete testing data after testing",
    "I have just created a test file (MERN stack) on cypress, and after I run the test, I want to delete it from my Mongoose database. Are there any ways that I can delete that data right after the test runs successfully? I don't want to do it manually.",
    [t4, t2],
    [],
    u3,
    new Date("2023-11-01T11:24:30"),
    new Date("2023-11-01T11:24:30"),
    23
  );
  let q4 = await questionCreate(
    "Cypress delete testing data after testing",
    "I have just created a test file (MERN stack) on cypress, and after I run the test, I want to delete it from my Mongoose database. Are there any ways that I can delete that data right after the test runs successfully? I don't want to do it manually.",
    [t4, t2],
    [],
    u3,
    new Date("2023-11-01T11:24:30"),
    new Date("2023-11-01T11:24:30"),
    23
  );
  let q5 = await questionCreate(
    "Cypress delete testing data after testing",
    "I have just created a test file (MERN stack) on cypress, and after I run the test, I want to delete it from my Mongoose database. Are there any ways that I can delete that data right after the test runs successfully? I don't want to do it manually.",
    [t4, t2],
    [],
    u3,
    new Date("2023-11-01T11:24:30"),
    new Date("2023-11-01T11:24:30"),
    23
  );
  let q6 = await questionCreate(
    "Cypress delete testing data after testing",
    "I have just created a test file (MERN stack) on cypress, and after I run the test, I want to delete it from my Mongoose database. Are there any ways that I can delete that data right after the test runs successfully? I don't want to do it manually.",
    [t4, t2],
    [],
    u3,
    new Date("2023-11-01T11:24:30"),
    new Date("2023-11-01T11:24:30"),
    23
  );
  let q7 = await questionCreate(
    "This is the end of the list, unless active sorted, then it is the start",
    "I have just created a test file (MERN stack) on cypress, and after I run the test, I want to delete it from my Mongoose database. Are there any ways that I can delete that data right after the test runs successfully? I don't want to do it manually.",
    [t3],
    [a6],
    u3,
    new Date("2023-11-01T11:24:29"),
    new Date("2023-11-27T15:24:19"),
    23
  );
  await User.findOneAndUpdate(
    { username: u1.username },
    { questions: [q1], answers: [a3, a4, a5], tags: [t1, t2], comments: [] }
  );
  await User.findOneAndUpdate(
    { username: u2.username },
    { questions: [q2], answers: [a1, a2, a6], tags: [t3, t4], comments: [] }
  );
  await User.findOneAndUpdate(
    { username: u3.username },
    { questions: [q3, q4, q5, q6, q7], answers: [], tags: [], comments: [] }
  );
  if (db) db.close();
  console.log("done");
};

populate().catch((err) => {
  console.log("ERROR: " + err);
  if (db) db.close();
});

console.log("processing ...");
