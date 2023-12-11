import React, { useContext, useState, useEffect } from "react";
import { PageContext } from "../PageContext";
import AskAQuestionButton from "../questions/AskAQuestion/AskAQuestionButton";
import "./tagsCSS.css";
import { getTags } from "./tagsCalls";
import { getAllQuestions } from "../questions/questionsCalls.js";
import { useSelector } from "react-redux";

const TagsQuestion = () => {
  const { setPage } = useContext(PageContext);
  const [tags, setTags] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const getAllTags = async () => {
    try {
      const tags = await getTags();
      setTags(tags);
    } catch (error) {
      setError("Error fetching the data. Please try again later.");
    }
  };

  const getQuestions = async () => {
    try {
      const questions = await getAllQuestions();
      setQuestions(questions);
    } catch (error) {
      setError("Error fetching the data. Please try again later.");
    }
  };

  useEffect(() => {
    getAllTags();
    getQuestions();
  }, []);

  const searchBar = document.getElementById("searchBar");
  if (searchBar) searchBar.value = "";

  const countQuestionsByTagName = (tagId, questions) => {
    let count = 0;
    for (const question of questions) {
      if (question.tags.includes(tagId)) {
        count++;
      }
    }
    return count;
  };

  const handleTagClick = (tagName) => {
    const searchBar = document.getElementById("searchBar");
    searchBar.value = `[` + tagName.name + `]`;
    // setSearch(`[` + tagName.name + `]`);
    setPage(5);
  };

  const renderTagNodes = () => {
    const tagNodes = [];

    for (let i = 0; i < tags.length; i += 3) {
      const tagRow = [];
      for (let j = 0; j < 3 && i + j < tags.length; j++) {
        const tag = tags[i + j];
        tagRow.push(
          <div key={tag._id} className="tagNode" onClick={() => handleTagClick(tag)}>
            <a>{tag.name + " "}</a>
            <span>
              {countQuestionsByTagName(tag._id, questions)}{" "}
              {countQuestionsByTagName(tag._id, questions) === 1 ? "question" : "questions"}
            </span>
          </div>
        );
      }

      tagNodes.push(
        <div key={i / 3} className="so-flex-row-container so-tags-justify-content">
          {tagRow}
        </div>
      );
    }

    return tagNodes;
  };

  return (
    <div className="column right">
      <div id="tagsPage">
        {error && <div className="error-message">{error}</div>}
        {!error && (
          <div className="grid-container tagsPage-format">
            <div className="so-tags-upper-div">
              <div>
                <b>{tags.length === 1 ? tags.length + " Tag" : tags.length + " Tags"}</b>
              </div>
              <div>
                <b>All Tags</b>
              </div>
              <div className="top-right">{currentUser && <AskAQuestionButton />}</div>
            </div>
            <div className="so-tags-content-div">{renderTagNodes()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsQuestion;
