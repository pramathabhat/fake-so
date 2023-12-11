import React, { useState, useEffect } from "react";
import AskAQuestionButton from "../questions/AskAQuestion/AskAQuestionButton";
import { useContext } from "react";
import { PageContext } from "../PageContext";
import "./answersCSS.css";
import { getAnswers, updateAnswer } from "./answersCalls.js";
import { getComments, createNewComment, updateComment } from "./commentsCall.js";
import { getAllQuestions, updateQuestion } from "../questions/questionsCalls.js";
import { useDispatch, useSelector } from "react-redux";
import { findUser } from "../users/users";
import { getTags } from "../tags/tagsCalls.js";
import QuestionTags from "../questions/QuestionTags";
import { updateUserThunk } from "../users/usersThunks";

// eslint-disable-next-line react/prop-types
const ViewAnswer = ({ questionId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    const fetchedQuestions = await getAllQuestions();
    setQuestions(fetchedQuestions);
  };

  const [answers, setAnswers] = useState([]);
  const getAllAnswers = async () => {
    const fetchedAnswers = await getAnswers();
    console.log(fetchedAnswers);
    setAnswers(fetchedAnswers);
  };
  const [currentCommentsPage, setCurrentCommentsPage] = useState(1);
  const itemsPerCommentsPage = 3;

  const [numberofanswers, setNumberofAnswers] = useState(0);
  const [questionHeading, setQuestionHeading] = useState("");
  const [questionBodyContent, setQuestionBodyContent] = useState("");
  const [formattedAnswers, setFormattedAnswers] = useState([]);
  // const [formattedQComments, setFormattedQComments] = useState([]);
  const [asked_by, setUser] = useState(null);

  const getUser = async (ques_asked_by) => {
    const newUser = await findUser(ques_asked_by);
    console.log(newUser);
    setUser(newUser);
  };
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);

  const getAllTags = async () => {
    const tags = await getTags();
    setTags(tags);
  };

  const fetchCommentUserDetails = (comment) => {
    return findUser(comment.createdBy).then((commentUser) => ({
      ...comment,
      commentUser,
    }));
  };

  const getAllComments = async () => {
    const comments = await getComments();
    const commentsWithUserDetails = await Promise.all(
      comments.map((comment) => fetchCommentUserDetails(comment))
    );
    setComments(commentsWithUserDetails);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllTags();
      await getQuestions();
      await getAllAnswers();
      await getAllComments();
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();
  if (currentUser) {
    const upvote = document.getElementById("upvote" + questionId);
    const downvote = document.getElementById("downvote" + questionId);
    if (currentUser.upvotedQuestions.includes(questionId)) {
      if (upvote) {
        upvote.disabled = true;
      }
    }
    if (currentUser.downvotedQuestions.includes(questionId)) {
      if (downvote) {
        downvote.disabled = true;
      }
    }
  }
  const handleCommentUpvote = async (comment) => {
    const upvote = document.getElementById("upvote" + comment._id);
    let updatedComment = {};
    if (currentUser.points < 50) {
      if (upvote) {
        const noRepError = document.getElementById("no-rep-error" + comment._id);
        noRepError.textContent = "Need 50 rep to vote";
        return;
      }
    }
    updatedComment = { ...comment, votes: comment.votes + 1 };

    await updateComment(updatedComment);
    let updatedUser = {
      ...currentUser,
      points: currentUser.points + 5,
      upvotedComments: [...currentUser.upvotedComments, comment._id],
    };

    await dispatch(updateUserThunk(updatedUser));
    if (upvote) {
      upvote.disabled = true;
    }
    await getAllComments();
  };

  const handleAnswerUpvote = async (answer) => {
    const upvote = document.getElementById("upvote" + answer._id);
    const downvote = document.getElementById("downvote" + answer._id);
    let updatedAnswer = {};
    if (currentUser.points < 50) {
      if (upvote) {
        const noRepError = document.getElementById("no-rep-error" + answer._id);
        noRepError.textContent = "Need 50 rep to vote";
        return;
      }
    }
    if (downvote) {
      if (downvote.disabled === false) {
        updatedAnswer = { ...answer, votes: answer.votes + 1 };
      }
      if (downvote.disabled === true) {
        updatedAnswer = { ...answer, votes: answer.votes + 2 };
      }
    }
    await updateAnswer(updatedAnswer);
    let updatedUser = {};
    if (downvote) {
      if (downvote.disabled === false) {
        updatedUser = {
          ...currentUser,
          points: currentUser.points + 5,
          upvotedAnswers: [...currentUser.upvotedAnswers, answer._id],
        };
      }
      if (downvote.disabled === true) {
        updatedUser = {
          ...currentUser,
          points: currentUser.points + 10,
          upvotedAnswers: [...currentUser.upvotedAnswers, answer._id],
          downvotedAnswers: currentUser.downvotedAnswers.filter((answer) => answer !== answer._id),
        };
      }
    }

    await dispatch(updateUserThunk(updatedUser));
    if (downvote) {
      downvote.disabled = false;
    }
    if (upvote) {
      upvote.disabled = true;
    }
    await getAllAnswers();
  };

  const handleAnswerDownvote = async (answer) => {
    const upvote = document.getElementById("upvote" + answer._id);
    const downvote = document.getElementById("downvote" + answer._id);
    let updatedAnswer = { ...answer, votes: answer.votes - 1 };
    if (currentUser.points < 50) {
      if (downvote) {
        const noRepError = document.getElementById("no-rep-error" + answer._id);
        noRepError.textContent = "Need 50 rep to vote";
        return;
      }
    }
    if (upvote) {
      if (upvote.disabled === false) {
        updatedAnswer = { ...answer, votes: answer.votes - 1 };
      }
      if (upvote.disabled === true) {
        updatedAnswer = { ...answer, votes: answer.votes - 2 };
      }
    }
    await updateAnswer(updatedAnswer);
    let updatedUser = {};
    if (upvote) {
      if (upvote.disabled === false) {
        updatedUser = {
          ...currentUser,
          points: currentUser.points - 10,
          downvotedAnswers: [...currentUser.downvotedAnswers, answer._id],
        };
      }
      if (upvote.disabled === true) {
        updatedUser = {
          ...currentUser,
          points: currentUser.points - 20,
          downvotedAnswers: [...currentUser.downvotedAnswers, answer._id],
          upvotedAnswers: currentUser.upvotedAnswers.filter((answer) => answer !== answer._id),
        };
      }
    }
    await dispatch(updateUserThunk(updatedUser));
    if (downvote) {
      downvote.disabled = true;
    }
    if (upvote) {
      upvote.disabled = false;
    }
    await getAllAnswers();
  };

  const handleUpvote = async (currentQuestion) => {
    const upvote = document.getElementById("upvote" + questionId);
    const downvote = document.getElementById("downvote" + questionId);
    let updatedQuestion = {};
    if (currentUser.points < 50) {
      if (upvote) {
        const noRepError = document.getElementById("no-rep-error" + questionId);
        noRepError.textContent = "Need 50 rep to vote";
        return;
      }
    }
    if (downvote) {
      if (downvote.disabled === false) {
        updatedQuestion = { ...currentQuestion, votes: currentQuestion.votes + 1 };
      }
      if (downvote.disabled === true) {
        updatedQuestion = { ...currentQuestion, votes: currentQuestion.votes + 2 };
      }
    }
    await updateQuestion(updatedQuestion);
    let updatedUser = {};
    if (downvote) {
      if (downvote.disabled === false) {
        updatedUser = {
          ...currentUser,
          points: currentUser.points + 5,
          upvotedQuestions: [...currentUser.upvotedQuestions, questionId],
        };
      }
      if (downvote.disabled === true) {
        updatedUser = {
          ...currentUser,
          points: currentUser.points + 10,
          upvotedQuestions: [...currentUser.upvotedQuestions, questionId],
          downvotedQuestions: currentUser.downvotedQuestions.filter(
            (question) => question !== questionId
          ),
        };
      }
    }

    await dispatch(updateUserThunk(updatedUser));
    if (downvote) {
      downvote.disabled = false;
    }
    if (upvote) {
      upvote.disabled = true;
    }
    await getQuestions();
  };

  const handleDownvote = async (currentQuestion) => {
    const upvote = document.getElementById("upvote" + questionId);
    const downvote = document.getElementById("downvote" + questionId);
    let updatedQuestion = { ...currentQuestion, votes: currentQuestion.votes - 1 };
    if (currentUser.points < 50) {
      if (downvote) {
        const noRepError = document.getElementById("no-rep-error" + questionId);
        noRepError.textContent = "Need 50 rep to vote";
        return;
      }
    }
    if (upvote) {
      if (upvote.disabled === false) {
        updatedQuestion = { ...currentQuestion, votes: currentQuestion.votes - 1 };
      }
      if (upvote.disabled === true) {
        updatedQuestion = { ...currentQuestion, votes: currentQuestion.votes - 2 };
      }
    }
    await updateQuestion(updatedQuestion);
    let updatedUser = {};
    if (upvote) {
      if (upvote.disabled === false) {
        updatedUser = {
          ...currentUser,
          points: currentUser.points - 10,
          downvotedQuestions: [...currentUser.downvotedQuestions, questionId],
        };
      }
      if (upvote.disabled === true) {
        updatedUser = {
          ...currentUser,
          points: currentUser.points - 20,
          downvotedQuestions: [...currentUser.downvotedQuestions, questionId],
          upvotedQuestions: currentUser.upvotedQuestions.filter(
            (question) => question !== questionId
          ),
        };
      }
    }
    await dispatch(updateUserThunk(updatedUser));
    if (downvote) {
      downvote.disabled = true;
    }
    if (upvote) {
      upvote.disabled = false;
    }
    await getQuestions();
  };

  const handleNextCommentsPage = async (relevantCommentsLen) => {
    setCurrentCommentsPage((prevPage) =>
      prevPage >= Math.ceil(relevantCommentsLen / itemsPerCommentsPage) ? 1 : prevPage + 1
    );
    await getAllComments();
  };

  const handlePrevCommentsPage = async () => {
    setCurrentCommentsPage((prevPage) => Math.max(prevPage - 1, 1));
    await getAllComments();
  };

  const [answerCommentsPages, setAnswerCommentsPages] = useState({});
  const itemsPerAnswerCommentsPage = 3;
  const setAnswerCommentsPage = (answerId, page) => {
    setAnswerCommentsPages((prevPages) => ({
      ...prevPages,
      [answerId]: page,
    }));
  };

  const getAnswerCommentsPage = (answerId) => {
    return answerCommentsPages[answerId] || 1;
  };

  const handleNextAnswerCommentsPage = async (answerId, answerCommentsLen) => {
    const nextPage =
      getAnswerCommentsPage(answerId) >= Math.ceil(answerCommentsLen / itemsPerAnswerCommentsPage)
        ? 1
        : getAnswerCommentsPage(answerId) + 1;
    await getAllComments();
    setAnswerCommentsPage(answerId, nextPage);
  };

  const handlePrevAnswerCommentsPage = async (answerId) => {
    const prevPage = Math.max(getAnswerCommentsPage(answerId) - 1, 1);
    await getAllComments();
    setAnswerCommentsPage(answerId, prevPage);
  };

  useEffect(() => {
    const currentQuestion = questions.find((q) => q._id === questionId);
    if (!currentQuestion) {
      console.error("Question not found");
      return;
    } else {
      getUser(currentQuestion.asked_by);
      const questionTags = tags.filter((tag) => currentQuestion.tags.includes(tag._id));
      const numberOfAnswersText =
        currentQuestion.answers.length === 1
          ? currentQuestion.answers.length + " answer"
          : currentQuestion.answers.length + " answers";
      setNumberofAnswers(numberOfAnswersText);
      setQuestionHeading(currentQuestion.title);

      const relevantComments = comments
        .filter((comment) => currentQuestion.comments.includes(comment._id))
        .sort((a, b) => new Date(b.comment_date_time) - new Date(a.comment_date_time));

      const relevantCommentsLen = relevantComments.length;
      const commentsDisplay = relevantComments
        .slice(
          (currentCommentsPage - 1) * itemsPerCommentsPage,
          currentCommentsPage * itemsPerCommentsPage
        )
        .map((comment) => (
          <div key={comment._id} className="commentStyle">
            <div className="commentHeader">
              {currentUser && (
                <div id={"no-rep-error" + `${comment._id}`} className={"error-format"}></div>
              )}
              <b>
                <div className="commentVotes">
                  {currentUser && (
                    <button
                      id={"upvote" + `${comment._id}`}
                      onClick={() => handleCommentUpvote(comment)}
                      disabled={currentUser.upvotedComments.includes(comment._id)}
                    >
                      &#9650; {/* Up arrow */}
                    </button>
                  )}
                  {comment.votes == 1 ? comment.votes + " vote" : comment.votes + " votes"}
                </div>
              </b>
              <div>
                <span className="commentUsername">{comment.commentUser.username}</span>
                <br />
                <span className="commentDate">{formatDate(comment.comment_date_time)}</span>
              </div>
            </div>
            <div className="commentText">{comment.text}</div>
          </div>
        ));

      const handleQuestionCommentSubmit = async (comment) => {
        if (comment.length > 140) {
          document.getElementById("quesErrorMessage").innerText =
            "Comment length cannot be more than 140 characters";
          document.getElementById("qComment").value = "";
        } else if (currentUser && currentUser.points <= 50) {
          document.getElementById("quesErrorMessage").innerText =
            "Comment rejected because user reputation is less than 50";
          document.getElementById("qComment").value = "";
        } else {
          try {
            const updatedQuestionComment = await createNewComment({
              text: comment,
              createdBy: currentUser,
              comment_date_time: new Date(),
            });
            const updatedQuestion = {
              ...currentQuestion,
              active_date: new Date(),
              comments: [updatedQuestionComment._id, ...currentQuestion.comments],
            };
            let newUser = {
              ...currentUser,
              comments: [...currentUser.comments, updatedQuestionComment._id],
            };
            await dispatch(updateUserThunk(newUser));
            await updateQuestion(updatedQuestion);

            await getQuestions();
            await getAllAnswers();
            await getAllComments();
          } catch (error) {
            console.error("An error occurred while updating the accepted answer:", error);
          }
          document.getElementById("qComment").value = "";
          document.getElementById("quesErrorMessage").innerText = "";
        }
      };

      const bodyContent = (
        <>
          <div className="so-upper-div">
            <div style={{ width: "10%" }}>
              {currentUser && (
                <div>
                  <button
                    id={"upvote" + `${currentQuestion._id}`}
                    onClick={() => handleUpvote(currentQuestion)}
                  >
                    &#9650; {/* Up arrow */}
                  </button>
                </div>
              )}
              <b>
                <span id="numberofviews">{currentQuestion.views}</span> views
              </b>
              <br />
              <b>
                <span id="numberofvotes">{currentQuestion.votes}</span>{" "}
                {currentQuestion.votes == 1 ? "vote" : "votes"}
              </b>
              {currentUser && (
                <div>
                  <button
                    id={"downvote" + `${currentQuestion._id}`}
                    onClick={() => handleDownvote(currentQuestion)}
                  >
                    &#9660; {/* Down arrow */}
                  </button>
                </div>
              )}
              {currentUser && (
                <div
                  id={"no-rep-error" + `${currentQuestion._id}`}
                  className={"error-format"}
                ></div>
              )}
            </div>
            <div style={{ width: "70%" }}>
              <div
                id="questioncontent"
                dangerouslySetInnerHTML={{ __html: transformLinks(currentQuestion.text) }}
              />
              <div className={"tagStyle"}>
                {questionTags.map((tag) => (
                  <QuestionTags key={tag._id} tag={tag} />
                ))}
              </div>
            </div>
            <div style={{ width: "20%" }}>
              <span style={{ color: "crimson" }} id="questionby">
                {asked_by ? asked_by.username : ""}
              </span>
              <br />
              <span style={{ color: "gray" }} id="questionpostedby">
                {formatDate(currentQuestion.ask_date_time)}
              </span>
            </div>
          </div>
          <div className="so-currentQComments">{commentsDisplay}</div>
          <button
            id={"prev"}
            className={"page-scroll-style"}
            disabled={currentCommentsPage === 1}
            onClick={handlePrevCommentsPage}
          >
            Prev
          </button>
          <button
            id={"next"}
            className={"page-scroll-style"}
            onClick={() => handleNextCommentsPage(relevantCommentsLen)}
          >
            Next
          </button>
          {currentUser && (
            <>
              <div className="so-question-comment">
                <span className="so-commentText">Add comment:</span>
                <textarea
                  id="qComment"
                  rows="1"
                  cols="60"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleQuestionCommentSubmit(e.target.value);
                    }
                  }}
                  placeholder="Enter Comment"
                ></textarea>
              </div>
              <div className="quesErrorMessage" id="quesErrorMessage"></div>
            </>
          )}
          <div className="so-dotted-line"></div>
        </>
      );
      setQuestionBodyContent(bodyContent);

      const handleAcceptAnswer = async (answerId) => {
        try {
          const updatedQuestion = { ...currentQuestion, accepted_answer: answerId };
          await updateQuestion(updatedQuestion);
          await getQuestions();
          await getAllAnswers();
        } catch (error) {
          console.error("An error occurred while updating the accepted answer:", error);
        }
      };
      const getAnswerById = (answerId) => {
        return answers.find((a) => a._id === answerId);
      };
      const handleAnswerCommentSubmit = async (answerId, comment) => {
        const currentAnswer = getAnswerById(answerId);

        if (!currentAnswer) {
          console.error("Answer not found");
          return;
        }

        if (comment.length > 140) {
          document.getElementById("error" + answerId).innerText =
            "Comment length cannot be greater than 140 characters";
        } else if (currentUser && currentUser.points <= 50) {
          document.getElementById("error" + answerId).innerText =
            "Comment rejected because user reputation is less than 50";
        } else {
          try {
            const updatedAnswerComment = await createNewComment({
              text: comment,
              createdBy: currentUser,
              comment_date_time: new Date(),
            });

            const updatedAnswer = {
              ...currentAnswer,
              active_date: new Date(),
              comments: [updatedAnswerComment._id, ...currentAnswer.comments],
            };
            let newUser = {
              ...currentUser,
              comments: [...currentUser.comments, updatedAnswerComment._id],
            };
            await dispatch(updateUserThunk(newUser));
            await updateAnswer(updatedAnswer);

            await getQuestions();
            await getAllAnswers();
            await getAllComments();
          } catch (error) {
            console.error("An error occurred while updating the answer comment:", error);
          }
          document.getElementById(answerId).value = "";
        }
      };

      const sortedAnswers = currentQuestion.answers
        .map((ansId) => answers.find((a) => a._id === ansId))
        .sort((a, b) => new Date(b.ans_date_time) - new Date(a.ans_date_time));
      if (currentQuestion.accepted_answer != null) {
        const acceptedAnswer = answers.find((a) => a._id === currentQuestion.accepted_answer);

        const acceptedAnswerIndex = sortedAnswers.findIndex(
          (answer) => answer && answer._id === currentQuestion.accepted_answer
        );

        if (acceptedAnswer && acceptedAnswerIndex !== -1) {
          sortedAnswers.splice(acceptedAnswerIndex, 1);
          sortedAnswers.unshift(acceptedAnswer);
        }
      }
      (async () => {
        const formattedAnswersArray = await Promise.all(
          sortedAnswers.map(async (answer) => {
            const user = answer && answer.ans_by ? await findUser(answer.ans_by) : null;
            return {
              _id: answer && answer._id,
              answerText: answer && answer.text,
              user: user,
              ansDateTime: answer && answer.ans_date_time,
              votes: answer && answer.votes,
              comments: answer && answer.comments,
            };
          })
        );
        const updatedFormattedAnswers = formattedAnswersArray.map((answer) => (
          <>
            <div className="so-upper-div">
              {currentUser && (
                <div>
                  <button
                    className="so-answer-upvote"
                    id={"upvote" + `${answer._id}`}
                    onClick={() => handleAnswerUpvote(answer)}
                    disabled={currentUser.upvotedAnswers.includes(answer._id)}
                  >
                    &#9650; {/* Up arrow */}
                  </button>
                </div>
              )}
              {answer.votes != null ? (
                <div className="answerVotes" style={{ width: "10%" }}>
                  <b>
                    <span>
                      {answer.votes == 1 ? answer.votes + " vote" : answer.votes + " votes"}
                    </span>
                  </b>
                </div>
              ) : (
                <p></p>
              )}
              {currentUser && (
                <div>
                  <button
                    className="so-answer-downvote"
                    id={"downvote" + `${answer._id}`}
                    onClick={() => handleAnswerDownvote(answer)}
                    disabled={currentUser.downvotedAnswers.includes(answer._id)}
                  >
                    &#9660; {/* Down arrow */}
                  </button>
                </div>
              )}
              {currentUser && (
                <div id={"no-rep-error" + `${answer._id}`} className={"error-format"}></div>
              )}
              {answer.answerText ? (
                <div
                  style={{ width: "60%" }}
                  className="answerText"
                  dangerouslySetInnerHTML={{ __html: transformLinks(answer.answerText) }}
                />
              ) : (
                <p></p>
              )}
              <div style={{ width: "20%" }} className="answerAuthor">
                {answer.user ? (
                  <span className="so-questionby-color">{answer.user.username}</span>
                ) : (
                  <p></p>
                )}
                <br />
                {answer.ansDateTime ? (
                  <span className="so-questiondate-color">{formatDate(answer.ansDateTime)}</span>
                ) : (
                  <p></p>
                )}
              </div>
              {answer &&
              currentUser &&
              currentUser.questions.includes(questionId) &&
              ((currentQuestion.accepted_answer != null &&
                currentQuestion.accepted_answer != answer._id) ||
                currentQuestion.accepted_answer == null) ? (
                <div style={{ width: "10%" }} className="acceptButton">
                  <button
                    id={"acceptAnswer"}
                    className={"accept-answer"}
                    onClick={() => handleAcceptAnswer(answer._id)}
                  >
                    Accept Answer
                  </button>
                </div>
              ) : (
                <></>
              )}
              {answer &&
              currentQuestion.accepted_answer != null &&
              currentQuestion.accepted_answer == answer._id ? (
                <div style={{ width: "10%" }} className="acceptButton">
                  <p className="so-acceptedAnswerText">Accepted answer</p>
                </div>
              ) : (
                <></>
              )}
            </div>
            {answer.comments && answer.comments.length > 0 && (
              <div className="so-answer-comments">
                {answer.comments
                  .slice(
                    (getAnswerCommentsPage(answer._id) - 1) * itemsPerAnswerCommentsPage,
                    getAnswerCommentsPage(answer._id) * itemsPerAnswerCommentsPage
                  )
                  .map((commentId) => {
                    const comment = comments.find((c) => c._id === commentId);
                    if (!comment) {
                      return null;
                    }

                    return (
                      <div key={comment._id} className="commentStyle">
                        <div className="commentHeader">
                          {currentUser && (
                            <div
                              id={"no-rep-error" + `${comment._id}`}
                              className={"error-format"}
                            ></div>
                          )}
                          <b>
                            <div className="commentVotes">
                              {currentUser && (
                                <button
                                  id={"upvote" + `${comment._id}`}
                                  onClick={() => handleCommentUpvote(comment)}
                                  disabled={currentUser.upvotedComments.includes(comment._id)}
                                >
                                  &#9650; {/* Up arrow */}
                                </button>
                              )}
                              {comment.votes == 1
                                ? comment.votes + " vote"
                                : comment.votes + " votes"}
                            </div>
                          </b>
                          <div>
                            <span className="commentUsername">{comment.commentUser.username}</span>
                            <br />
                            <span className="commentDate">
                              {formatDate(comment.comment_date_time)}
                            </span>
                          </div>
                        </div>
                        <div className="commentText">{comment.text}</div>
                      </div>
                    );
                  })}
                <button
                  id={`prevAnswerComments${answer._id}`}
                  className={"page-scroll-style"}
                  disabled={getAnswerCommentsPage(answer._id) === 1}
                  onClick={() => handlePrevAnswerCommentsPage(answer._id)}
                >
                  Prev
                </button>
                <button
                  id={`nextAnswerComments${answer._id}`}
                  className={"page-scroll-style"}
                  onClick={() => handleNextAnswerCommentsPage(answer._id, answer.comments.length)}
                >
                  Next
                </button>
              </div>
            )}
            {currentUser && (
              <div className="answerComments">
                <span className="commentText">Add comment:</span>
                <textarea
                  id={answer._id}
                  rows="1"
                  cols="60"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAnswerCommentSubmit(answer._id, e.target.value);
                    }
                  }}
                  placeholder="Enter Comment"
                ></textarea>
              </div>
            )}
            <div className="quesErrorMessage" id={"error" + answer._id}></div>
            <div className="so-dotted-line"></div>
          </>
        ));
        // setFormattedQComments(commentsDisplay);
        setFormattedAnswers(updatedFormattedAnswers);
      })();
    }
  }, [questions, answers, comments]);

  const transformLinks = (text) => {
    const linkRegex = /\[([^\]]+)\]\((https:\/\/[^)]+)\)/g;
    const transformedText = text.replace(
      linkRegex,
      (match, linkText, url) => `<a href="${url}" target="_blank">${linkText}</a>`
    );
    return transformedText;
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Invalid date";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const months = [
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

    const now = new Date();
    const timeDifference = now - date;
    const secondsPassed = Math.floor(timeDifference / 1000);
    const minutesPassed = Math.floor(secondsPassed / 60);
    const hoursPassed = Math.floor(minutesPassed / 60);

    if (secondsPassed < 60) {
      return "0 seconds ago";
    } else if (minutesPassed < 60) {
      return `${minutesPassed} ${minutesPassed === 1 ? "minute" : "minutes"} ago`;
    } else if (hoursPassed < 24) {
      return `${hoursPassed} ${hoursPassed === 1 ? "hour" : "hours"} ago`;
    }

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${month} ${formattedDay}, ${year} ${hours}:${formattedMinutes}`;
  };

  const { setPage, setQuestionId } = useContext(PageContext);

  function answerQuestion() {
    setQuestionId(questionId);
    setPage(7);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const maxPages = Math.ceil(formattedAnswers.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = formattedAnswers.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage % maxPages) + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => ((prevPage - 2 + maxPages) % maxPages) + 1);
  };

  return (
    <div className="column right" id="answerPage">
      <div id="answersHeader" className="so-upper-div">
        <div>
          <b>{numberofanswers}</b>
        </div>
        <div>
          <b>{questionHeading}</b>
        </div>
        <div className="top-right">{currentUser && <AskAQuestionButton />}</div>
      </div>
      <div id="questionBody">{questionBodyContent}</div>
      <div id="formattedAnswers">{currentItems}</div>
      <div>
        <div>
          <button id={"prev"} className={"page-scroll-style"} onClick={handlePrevPage}>
            Prev
          </button>
          <button id={"next"} className={"page-scroll-style"} onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
      {currentUser && (
        <button id="answerQuestion" className="so-answer-question" onClick={answerQuestion}>
          Answer Question
        </button>
      )}
    </div>
  );
};

export default ViewAnswer;
