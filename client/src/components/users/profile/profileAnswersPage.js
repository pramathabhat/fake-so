import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { PageContext } from "../../PageContext";
import "../../answers/answersCSS.css";
import { getAnswers } from "../../answers/answersCalls.js";
import { getAllQuestions } from "../../questions/questionsCalls.js";
import {useSelector} from "react-redux";

// eslint-disable-next-line react/prop-types
const ProfileAnswers = () => {

	const { currentUser } = useSelector((state) => state.user);

	const [questions, setQuestions] = useState([]);
	const getQuestions = async () => {
		const fetchedQuestions = await getAllQuestions();
		setQuestions(fetchedQuestions);
	};

	const [answers, setAnswers] = useState([]);
	const getAllAnswers = async () => {
		const fetchedAnswers = await getAnswers();
		setAnswers(fetchedAnswers);
	};

	const [numberofanswers, setNumberofAnswers] = useState(0);
	const [questionHeading, setQuestionHeading] = useState("");
	const [questionBodyContent, setQuestionBodyContent] = useState("");
	const [formattedAnswers, setFormattedAnswers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await getQuestions();
			await getAllAnswers();
		};

		fetchData();
	}, []);

	useEffect(() => {
		// const currentQuestion = questions.find((q) => q._id === questionId);
		if (!currentUser) {
			console.error("No User, not sure how you got here but good for you!");
			return;
		} else {
			const numberOfAnswersText =
				currentUser.answers.length === 1
				? currentUser.answers.length + " answer"
				: currentUser.answers.length + " answers";
			setNumberofAnswers(numberOfAnswersText);
			setQuestionHeading(`${currentUser.username}'s Answers`);
			const bodyContent = (
				<>
					<div className="so-upper-div">
						{/*<div style={{ width: "10%" }}>*/}
						{/*	<b>*/}
						{/*		<span id="numberofviews">{currentQuestion.views}</span> views*/}
						{/*	</b>*/}
						{/*</div>*/}
						{/*<div*/}
						{/*	style={{ width: "70%" }}*/}
						{/*	id="questioncontent"*/}
						{/*	dangerouslySetInnerHTML={{ __html: transformLinks(currentQuestion.text) }}*/}
						{/*/>*/}
						<div style={{ width: "20%" }}>
              {/*<span style={{ color: "crimson" }} id="questionby">*/}
              {/*  {currentQuestion.asked_by}*/}
              {/*</span>*/}
							<br />
							<span style={{ color: "gray" }} id="questionpostedby">
                {/*{formatDate(currentQuestion.ask_date_time)}*/}
              </span>
						</div>
					</div>
					<div className="so-dotted-line"></div>
				</>
			);
			setQuestionBodyContent(bodyContent);

			const sortedAnswers = currentUser.answers
				.map((ansId) => answers.find((a) => a._id === ansId))
				.sort((a, b) => new Date(b.ans_date_time) - new Date(a.ans_date_time));

			const formattedAnswersArray = sortedAnswers.map((answer) => (
				<>
					<div className="so-flex-row-container">
						{answer && answer.text ? (
							<a onClick={() => modifyAnswer(answer)}
								className="answerText"
								dangerouslySetInnerHTML={{ __html: transformLinks(answer.text) }}
							/>
						) : (
							<p>Answer text not available</p>
						)}
						<div className="answerAuthor">
							{answer && currentUser.username ? (
								<span className="so-questionby-color">{currentUser.username}</span>
							) : (
								<p>Answer text not available</p>
							)}
							<br />
							{answer && answer.ans_date_time ? (
								<span className="so-questiondate-color">{formatDate(answer.ans_date_time)}</span>
							) : (
								<p>Answer text not available</p>
							)}
						</div>
					</div>
					<div className="so-dotted-line"></div>
				</>
			));
			setFormattedAnswers(formattedAnswersArray);
		}
	}, [questions, answers]);

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

	const { setPage, setAnswer } = useContext(PageContext);


	function modifyAnswer(answer) {
		setAnswer(answer)
		setPage(14);
	}

	return (
		<div className="column right" id="answerPage">
			<div id="answersHeader" className="so-upper-div">
				<div>
					<b>{numberofanswers}</b>
				</div>
				<div>
					<b>{questionHeading}</b>
				</div>
			</div>
			<div id="questionBody" >{questionBodyContent}</div>
			<div id="formattedAnswers">{formattedAnswers}</div>
		</div>
	);
};

export default ProfileAnswers;
