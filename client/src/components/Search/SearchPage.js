import AskAQuestionButton from "../questions/AskAQuestion/AskAQuestionButton";
import QuestionList from "../questions/QuestionList";
import {getAllQuestions} from "../questions/questionsCalls";
import React, {useEffect, useState} from "react";
import {getTags} from "../tags/tagsCalls.js";
import {useSelector} from "react-redux";
// import {PageContext} from "../PageContext";

const SearchPage = () => {

	const { currentUser } = useSelector((state) => state.user);

	// const { search } = useContext(PageContext);

	const searchBar = document.getElementById("searchBar");

	let searchText = searchBar.value;

	// let searchText = search;

	const [q, setQuestions] = useState([]);
	const [tags, setTags] = useState([])

	const getQuestions = async () => {
		const questions = await getAllQuestions();
		setQuestions(questions);
	}

	const getAllTags = async () => {
		const tags = await getTags();
		setTags(tags)
	}

	useEffect(() => {
		getQuestions();
		getAllTags();
	}, []);

	let questions = q;

	let textTitleSearchQuestions = [];

	if (!searchText || searchText.replace(" ", "") === "") {
		return (
			<div className="column right">
				<div id="searchPage">
					<div className="grid-container questionsPage-format">
						<div className="top-left">
							<h2 id="questionPageHeader" className="allQuestions">
								Search Results
							</h2>
						</div>
						<div className="top-right">
							{currentUser && <AskAQuestionButton/>}
						</div>
						<div className="bottom-left">
							<div className="totalQuestions">
								<h3 id="numQuestionsHeader">
									<span id="totalQuestionsCount">{textTitleSearchQuestions.length}</span>{" "}
									{textTitleSearchQuestions.length === 1 ? "question" : "questions"}{" "}
								</h3>
							</div>
						</div>
						<div className="bottom-right">
							<div className="sortButtons-format">
								<div className="sortButtons">
									<button id="newestButton" className="sortButton-format">
										Newest
									</button>
									<button id="activeButton" className="sortButton-format">
										Active
									</button>
									<button id="unansweredButton" className="sortButton-format">
										Unanswered
									</button>
								</div>
							</div>
						</div>
					</div>
					<ul>{<h2>No Questions Found</h2>}</ul>
				</div>
			</div>
		);
	}

	if (!searchText.includes("[") || !searchText.includes("]")) {
		textTitleSearchQuestions = questions.filter(
			(question) =>
				question.title.toUpperCase().includes(searchText.toUpperCase()) ||
				question.text.toUpperCase().includes(searchText.toUpperCase())
		);
	}
	if (searchText.includes("[") || searchText.includes("]")) {
		if (searchText.split(" ").length === 1) {
			let singleSearch = searchText.replace("[]", '');
			tags.forEach((tag) => {
				if (singleSearch.toUpperCase().includes(tag.name.toUpperCase())) {
					questions.forEach((question) => {
						if (question.tags.includes(tag._id) && !textTitleSearchQuestions.includes(question)) {
							textTitleSearchQuestions.push(question);
						}
					});
				}
			});
			textTitleSearchQuestions = textTitleSearchQuestions.sort((a, b) => new Date(b.ask_date_time) - new Date(a.ask_date_time));
		} else {
			const regex = /\b\w+\b(?![^[]*])/g;
			let inputString = searchText.replace(regex, "");
			const nonTag = searchText.match(regex);
			inputString = inputString.replace(" ", "");
			let searchBarArray = inputString.split("][");
			for (let i = 0; i < searchBarArray.length; i++) {
				searchBarArray[i] = searchBarArray[i].replace("[", "");
				searchBarArray[i] = searchBarArray[i].replace("]", "");
				searchBarArray[i] = searchBarArray[i].toUpperCase();
			}
			tags.forEach((tag) => {
				if (searchBarArray.includes(tag.name.toUpperCase())) {
					questions.forEach((question) => {
						if (question.tags.includes(tag._id) && !textTitleSearchQuestions.includes(question)) {
							textTitleSearchQuestions.push(question);
						}
					});
				}
			});
			questions.forEach((question) => {
				if (
					(question.text.includes(nonTag) || question.title.includes(nonTag)) &&
					!textTitleSearchQuestions.includes(question)
				) {
					textTitleSearchQuestions.push(question);
				}
			});
			textTitleSearchQuestions = textTitleSearchQuestions.sort((a, b) => new Date(b.ask_date_time) - new Date(a.ask_date_time));
		}
	}

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const maxPages = Math.ceil(questions.length / itemsPerPage);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const currentItems = textTitleSearchQuestions.slice(indexOfFirstItem, indexOfLastItem);

	const handleNextPage = () => {
		setCurrentPage((prevPage) => (prevPage % maxPages) + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => (prevPage - 2 + maxPages) % maxPages + 1);
	};

	return(
		<div className="column right">
			<div id="searchPage">
				<div className="grid-container questionsPage-format">
					<div className="top-left">
						<h2 id="questionPageHeader" className="allQuestions">Search Results</h2>
					</div>
					<div className="top-right">
						{currentUser && <AskAQuestionButton/>}
					</div>
					<div className="bottom-left">
						<div className="totalQuestions">
							<h3 id="numQuestionsHeader"><span id="totalQuestionsCount">{textTitleSearchQuestions.length}</span> {textTitleSearchQuestions.length === 1 ? "question" : "questions"} </h3>
						</div>
					</div>
					<div className="bottom-right">
						<div className="sortButtons-format">
							<div className="sortButtons">
								<button id="newestButton" className="sortButton-format">Newest</button>
								<button id="activeButton" className="sortButton-format">Active</button>
								<button id="unansweredButton" className="sortButton-format">Unanswered</button>
							</div>
						</div>
					</div>
				</div>
				<ul>
					{textTitleSearchQuestions.length === 0 ? <h2>No Questions Found</h2> : currentItems.map(question => <QuestionList key={question._id} question={question}/>)}
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
}

export default SearchPage;
