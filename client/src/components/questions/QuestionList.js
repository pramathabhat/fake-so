import "./questionCSS.css";
import QuestionTags from "./QuestionTags";
import { PageContext } from "../PageContext";
import React, { useContext, useEffect, useState } from "react";
import { getTags } from "../tags/tagsCalls.js";
import { updateQuestion } from "./questionsCalls.js";
import {findUser} from "../users/users";
import {useDispatch, useSelector} from "react-redux";
import {updateUserThunk} from "../users/usersThunks";

function formatQuestionMetadata(username, questionDate) {
  const msInSecond = 1000;
  const msInMinute = 60 * msInSecond;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;

  let currentDate = new Date();

  const timeDifference = currentDate - questionDate;

  if (timeDifference < msInMinute) {
    const secondsAgo = Math.floor(timeDifference / msInSecond);
    return `${username} asked ${secondsAgo} seconds ago`;
  } else if (timeDifference < msInHour) {
    const minutesAgo = Math.floor(timeDifference / msInMinute);
    return `${username} asked ${minutesAgo} minutes ago`;
  } else if (timeDifference < msInDay) {
    const hoursAgo = Math.floor(timeDifference / msInHour);
    return `${username} asked ${hoursAgo} hours ago`;
  } else {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const questionMonth = monthNames[questionDate.getMonth()];
    let questionDay = questionDate.getDate();
    if (questionDay < 10) {
      questionDay = "0" + String(questionDay);
    }
    const questionYear = questionDate.getFullYear();
    const questionHour = questionDate.getHours();
    const questionMinute = questionDate.getMinutes();

    return `${username} asked ${questionMonth} ${questionDay}${
      questionYear !== currentDate.getFullYear() ? `, ${questionYear}` : ""
    } at ${questionHour.toString().padStart(2, "0")}:${questionMinute.toString().padStart(2, "0")}`;
  }
}

const QuestionList = (question) => {

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);

  const getAllTags = async () => {
    const tags = await getTags();
    setTags(tags);
  };

  const updateAQuestion = async (question) => {
    const updateQues = {
      ...question,
      views: question.views + 1,
    };
    await updateQuestion(updateQues);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  let q = question.question;
  const questionTags = tags.filter((tag) => q.tags.includes(tag._id));
  const { setPage, setQuestionId } = useContext(PageContext);
  function displayAnswer() {
    setQuestionId(q._id);
    setPage(6);
  }

  const [user, setUser] = useState(null)

  const getUser = async () => {
    const newUser = await findUser(q.asked_by);
    setUser(newUser);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (currentUser) {
    const upvote = document.getElementById("upvote" + `${q._id}`);
    const downvote = document.getElementById("downvote" + `${q._id}`);
    if (currentUser.upvotedQuestions.includes(q._id)) {
      if (upvote) {
        upvote.disabled = true;
      }
    }
    if (currentUser.downvotedQuestions.includes(q._id)) {
      if (downvote) {
        downvote.disabled = true;
      }
    }
  }

  const handleUpvote = async () => {
    const upvote = document.getElementById("upvote" + `${q._id}`);
    const downvote = document.getElementById("downvote" + `${q._id}`);
    let updatedQuestion = {};
    if (currentUser.points < 50) {
      if (upvote) {
        const noRepError = document.getElementById("no-rep-error" + `${q._id}`);
        noRepError.textContent = "Need 50 rep to vote";
        return;
      }
    }
    if (downvote) {
      if (downvote.disabled === false) {
        updatedQuestion = {...q, votes: q.votes + 1};
      }
      if (downvote.disabled === true) {
        updatedQuestion = {...q, votes: q.votes + 2};
      }
    }
    await updateQuestion(updatedQuestion)
    let updatedUser = {};
    if (downvote) {
      if (downvote.disabled === false) {
        updatedUser = {...currentUser, points: currentUser.points + 5, upvotedQuestions: [...currentUser.upvotedQuestions, q._id]};
      }
      if (downvote.disabled === true) {
        updatedUser = {...currentUser, points: currentUser.points + 10, upvotedQuestions: [...currentUser.upvotedQuestions, q._id], downvotedQuestions: currentUser.downvotedQuestions.filter((question) => question !== q._id)};
      }
    }

    await dispatch(updateUserThunk(updatedUser));
    if (downvote) {
      downvote.disabled = false;
    }
    if (upvote) {
      upvote.disabled = true;
    }
  }

  const handleDownvote = async () => {
    const upvote = document.getElementById("upvote"  + `${q._id}`);
    const downvote = document.getElementById("downvote"  + `${q._id}`);
    let updatedQuestion = {...q, votes: q.votes - 1};
    if (currentUser.points < 50) {
      if (downvote) {
        const noRepError = document.getElementById("no-rep-error" + `${q._id}`);
        noRepError.textContent = "Need 50 rep to vote";
        return;
      }
    }
    if (upvote) {
      if (upvote.disabled === false) {
        updatedQuestion = {...q, votes: q.votes - 1};
      }
      if (upvote.disabled === true) {
        updatedQuestion = {...q, votes: q.votes - 2};
      }
    }
    await updateQuestion(updatedQuestion)
    let updatedUser = {};
    if (upvote) {
      if (upvote.disabled === false) {
        updatedUser = {...currentUser, points: currentUser.points - 10, downvotedQuestions: [...currentUser.downvotedQuestions, q._id]};
      }
      if (upvote.disabled === true) {
        updatedUser = {...currentUser, points: currentUser.points - 20, downvotedQuestions: [...currentUser.downvotedQuestions, q._id], upvotedQuestions: currentUser.upvotedQuestions.filter((question) => question !== q._id)};
      }
    }
    await dispatch(updateUserThunk(updatedUser));
    if (downvote) {
      downvote.disabled = true;
    }
    if (upvote) {
      upvote.disabled = false;
    }
  }

  if (user) {
    return (
        <li>
          <div id="questionList" className="questionList-format">
            <div className={"box"}>
              <div className={"postStats questionList-left view-count-format"}>
                { currentUser && <div>
                  <button id={"upvote" + `${q._id}`} onClick={handleUpvote}>&#9650; {/* Up arrow */}</button>
                </div>}
                <div>{q.answers.length} answers</div>
                <div>{q.views} views</div>
                <div id={"votes"}>{q.votes} {q.votes ===  1 ? "point" : "points"}</div>
                { currentUser && <div>
                  <button id={"downvote" + `${q._id}`} onClick={handleDownvote}>&#9660; {/* Down arrow */}</button>
                </div>}
                { currentUser && <div id={"no-rep-error" + `${q._id}`} className={"error-format"}></div> }
              </div>
              <div className={"questionList-middle"}>
                <a
                    className={"postTitle question-title-format"}
                    onClick={async () => {
                      await updateAQuestion(q);
                      displayAnswer();
                    }}
                >
                  {q.title}
                </a>
                <div className={"tagStyle"}>
                  {questionTags.map((tag) => (
                      <QuestionTags key={tag._id} tag={tag} />
                  ))}
                </div>
              </div>
              <div className={"lastActivity questionList-right activity-format"}>
                {formatQuestionMetadata(user.username, new Date(q.ask_date_time))}
              </div>
            </div>
          </div>
        </li>
    );
  }
};

export default QuestionList;
