import React, {useContext, useEffect, useState} from "react";
import {PageContext} from "../../PageContext";
import {getTags} from "../../tags/tagsCalls";
import QuestionTags from "../../questions/QuestionTags";
import {useSelector} from "react-redux";

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

function ProfileQuestionList(question) {

	const { currentUser } = useSelector((state) => state.user);

	const {setPage, setQuestionId} = useContext(PageContext);

	const [tags, setTags] = useState([]);

	const getAllTags = async () => {
		const tags = await getTags();
		setTags(tags);
	};

	useEffect(() => {
		getAllTags();
	}, []);

	let q = question.question;
	const questionTags = tags.filter((tag) => q.tags.includes(tag._id));

	const modifyQuestion = () => {
		setQuestionId(question);
		setPage(11)
	}

	return (
		<li>
			<div id="questionList" className="questionList-format">
				<div className={"box"}>
					<div className={"postStats questionList-left view-count-format"}>
						<div>{q.answers.length} answers</div>
						<div>{q.views} views</div>
						<div>{q.votes} points</div>
					</div>
					<div className={"questionList-middle"}>
						<a className={"postTitle question-title-format"} onClick={modifyQuestion}>
							{q.title}
						</a>
						<div className={"tagStyle"}>
							{questionTags.map((tag) => (
								<QuestionTags key={tag._id} tag={tag} />
							))}
						</div>
					</div>
					<div className={"lastActivity questionList-right activity-format"}>
						{formatQuestionMetadata(currentUser.username, new Date(q.ask_date_time))}
					</div>
				</div>
			</div>
		</li>
	);
}

export default ProfileQuestionList;