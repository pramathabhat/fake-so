import "../../stylesheets/index.css";
import "./questionCSS.css";
import QuestionList from "./QuestionList";
import AskAQuestionButton from "./AskAQuestion/AskAQuestionButton";
import React, {useEffect, useState} from "react";
import {getAllQuestions} from "./questionsCalls";
import {useSelector} from "react-redux";

const QuestionPage = () => {

  const { currentUser } = useSelector((state) => state.user);

  const [q, setQuestions] = useState([]);
  const [sortMethod, setSortMethod] = useState("newest");

  let questions = [...q];

  const getQuestions = async () => {
    const questions = await getAllQuestions();
    setQuestions(questions);
  }

  useEffect(() => {
    getQuestions();
  }, [currentUser, sortMethod]);

  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.value = "";
  }

  function sortQuestions(questions) {
    if (sortMethod === "newest") {
      return questions.sort((a, b) => new Date(b.ask_date_time) - new Date(a.ask_date_time));
    } else if (sortMethod === "active") {
      return questions.sort((a, b) => new Date(b.active_date) - new Date(a.active_date));
    } else if (sortMethod === "unanswered") {
      return questions.filter((question) => question.answers.length === 0);
    }
    return questions;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const maxPages = Math.ceil(questions.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  questions = sortQuestions(questions)

  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage % maxPages) + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 2 + maxPages) % maxPages + 1);
  };

  return (
      <div className="column right">
        <div id="questionsPage">
          <div className="grid-container questionsPage-format">
            <div className="top-left">
              <h2 id="questionPageHeader" className="allQuestions">
                All Questions
              </h2>
            </div>
            <div className="top-right">
              {currentUser  &&  <AskAQuestionButton/>}
            </div>
            <div className="bottom-left">
              <div className="totalQuestions">
                <h3 id="numQuestionsHeader">
                  <span id="totalQuestionsCount">{questions.length}</span>{" "}
                  {questions.length === 1 ? "question" : "questions"}
                </h3>
              </div>
            </div>
            <div className="bottom-right">
              <div className="sortButtons-format">
                <div className="sortButtons">
                  <button id="newestButton" className="sortButton-format" onClick={() => {
                    setSortMethod("newest");
                  }
                  }>
                    Newest
                  </button>
                  <button id="activeButton" className="sortButton-format" onClick={() => {
                    setSortMethod("active");
                  }
                  }>
                    Active
                  </button>
                  <button id="unansweredButton" className="sortButton-format" onClick={() => {
                    setSortMethod("unanswered");
                  }
                  }>
                    Unanswered
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ul id={"questionsList"}>
            {currentItems.map((question) => (
                <QuestionList key={question._id} question={question} />
            ))}
          </ul>
          <div>
            <div>
              <button id={"prev"} className={"page-scroll-style"} onClick={handlePrevPage}>Prev</button>
              <button id={"next"} className={"page-scroll-style"} onClick={handleNextPage}>Next</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default QuestionPage;
