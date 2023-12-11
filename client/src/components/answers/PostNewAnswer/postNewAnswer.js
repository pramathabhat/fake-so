import React, { useState, useContext, useEffect } from "react";
import { PageContext } from "../../PageContext";
import "./postNewAnswerCSS.css";
import { getAnswers, createNewAnswer } from "../answersCalls.js";
import { getAllQuestions, updateQuestion } from "../../questions/questionsCalls.js";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk } from "../../users/usersThunks";

// eslint-disable-next-line react/prop-types
const PostNewAnswer = ({ questionId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    const fetchedQuestions = await getAllQuestions();
    setQuestions(fetchedQuestions);
  };
  const dispatch = useDispatch();

  const [answers, setAnswers] = useState([]);
  const getAllAnswers = async () => {
    const fetchedAnswers = await getAnswers();
    setAnswers(fetchedAnswers);
  };
  const createNewAns = async (answer, questionIndex) => {
    const newAnswerResponse = await createNewAnswer(answer);
    questions[questionIndex].answers.push(newAnswerResponse._id);
    console.log(newAnswerResponse._id, questions[questionIndex]);
    const updatedQues = await updateAQuestion({
      ...questions[questionIndex],
      active_date: new Date(),
    });
    let newUser = {
      ...currentUser,
      answers: [...currentUser.answers, newAnswerResponse._id],
    };
    await dispatch(updateUserThunk(newUser));
    console.log(updatedQues);
    return newAnswerResponse;
  };
  const updateAQuestion = async (question) => {
    await updateQuestion(question);
  };
  useEffect(() => {
    const fetchData = async () => {
      await getQuestions();
      await getAllAnswers();
    };

    fetchData();
  }, []);

  const [answertext, setAnswerText] = useState("");
  const [enterAnswerError, setEnterAnswerError] = useState("");
  const [postAnswerError, setPostAnswerError] = useState("");

  const { setPage, setQuestionId } = useContext(PageContext);

  const handlePostAnswer = async () => {
    if (answertext.length === 0) {
      setEnterAnswerError("Answer text cannot be empty");
      return;
    } else {
      setEnterAnswerError("");
    }

    const pattern = /\[([^\]]*)]\((\S*)\)/;
    const matches = answertext.match(pattern);

    if (matches) {
      const [, linkText, url] = matches;

      if (!linkText.trim() || !url.trim() || !url.startsWith("https://") || url === "https://") {
        setEnterAnswerError("Invalid hyperlink constraints");
        return;
      }
    }

    const questionIndex = questions.findIndex((q) => q._id === questionId);

    const newAnswer = {
      text: answertext,
      ans_by: currentUser._id,
      ans_date_time: new Date(),
      active_date: new Date(),
      votes: 0,
    };

    try {
      await createNewAns(newAnswer, questionIndex);
      answers.push(newAnswer);
      setAnswerText("");
      setQuestionId(questionId);
      setPage(6);
    } catch (error) {
      setPostAnswerError("Error: Unable to post the answer. Please try again.");
      console.error(error);
    }
  };

  return (
    <div id="answerQuestions" className="column right">
      <div className="so-margintop-40px">
        <span className="so-fontsize-30px">Answer Text*</span>
        <br />
        <textarea
          rows="5"
          cols="39"
          id="answerTextInput"
          value={answertext}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Enter Answer"
        />
        <span id="enteranswererror" className="so-text-red">
          {enterAnswerError}
        </span>
      </div>
      <div className="so-margintop-40px">
        <button
          className="so-background-cornflowerblue so-text-white so-padding-15px"
          id="postanswer"
          type="submit"
          onClick={handlePostAnswer}
        >
          Post Answer
        </button>
        <p className="so-display-inline so-margin-left-5p so-text-red">
          * indicates mandatory fields
        </p>
        {postAnswerError && <p className="so-text-red">{postAnswerError}</p>}
      </div>
    </div>
  );
};

export default PostNewAnswer;
