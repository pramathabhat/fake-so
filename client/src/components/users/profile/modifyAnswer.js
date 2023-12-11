import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { PageContext } from "../../PageContext";
import "../../answers/PostNewAnswer/postNewAnswerCSS.css";
import {deleteAnswer, updateAnswer} from "../../answers/answersCalls.js";
import {getAllQuestions, updateQuestion} from "../../questions/questionsCalls.js";
// import {updateUser} from "../users";
import {useDispatch, useSelector} from "react-redux";
import {updateUserThunk} from "../usersThunks";


function ModifyAnswer(answer) {

	const { currentUser } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const [questions, setQuestions] = useState([]);

	const getQuestions = async () => {
		const fetchedQuestions = await getAllQuestions();
		setQuestions(fetchedQuestions);
	};

	// const updateThisAnswer = async (answer) => {
	// 	await updateAnswer(answer);
	// };

	const updateAQuestion = async (question) => {
		await updateQuestion(question);
	};

	useEffect(() => {
		const fetchData = async () => {
			await getQuestions();
		};
		fetchData();
	}, []);

	const [answertext, setAnswerText] = useState("");
	const [enterAnswerError, setEnterAnswerError] = useState("");
	const { setPage } = useContext(PageContext);

	let question = questions.filter((question) => question.answers.includes(answer.answer._id));

	const handleUpdateAnswer = async () => {

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


		// console.log(answer.answer);
		const newAnswer = {
			...answer.answer,
			text: answertext,
		};
		// console.log(newAnswer);
		await updateAnswer(newAnswer);
		setAnswerText("");
		setPage(13);
	};

	const handleDeleteAnswer = async () => {
		await updateAQuestion({...question[0], answers: question[0].answers.filter((qAnswer) => qAnswer !== answer.answer._id), active_date: new Date()});
		// await updateUser({...currentUser, answers: currentUser.answers.filter((cAnswer) => cAnswer !== answer.answer._id)});
		await dispatch(updateUserThunk({...currentUser, answers: currentUser.answers.filter((cAnswer) => cAnswer !== answer.answer._id)}));
		await deleteAnswer(answer.answer);
		setAnswerText("");
		setPage(13);
	}

	const handleRepostAnswer = async () => {
		await updateAQuestion({...question[0], active_date: new Date()});
		await updateAnswer({...answer.answer, active_date: new Date()})
		setPage(13);
	}

	return (
		<div id="answerQuestions" className="column right">
			<div className="so-margintop-40px">
			</div>
			<div className="so-margintop-40px">
				<span className="so-fontsize-30px">Answer Text*</span>
				<br />
				<textarea
					rows="5"
					cols="39"
					id="answerTextInput"
					// value={answertext}
					defaultValue={answer.answer.text}
					onChange={(e) => setAnswerText(e.target.value)}
				/>
				<span id="enteranswererror" className="so-text-red">
          {enterAnswerError}
        </span>
			</div>
			<div className="so-margintop-40px">
				<button
					className="so-background-cornflowerblue so-text-white so-padding-15px"
					id="updateAnswer"
					type="submit"
					onClick={handleUpdateAnswer}
				>
					Update Answer
				</button>
				<button
					className="so-background-darkred so-text-white so-padding-15px"
					id="deleteAnswer"
					type="submit"
					onClick={handleDeleteAnswer}
				>
					Delete Answer
				</button>
				<button
					className="so-background-darkslategrey so-text-white so-padding-15px"
					id="repostAnswer"
					type="submit"
					onClick={handleRepostAnswer}
				>
					Repost Answer
				</button>
				<p className="so-display-inline so-margin-left-5p so-text-red">
					* indicates mandatory fields
				</p>
			</div>
		</div>
	);
}

export default ModifyAnswer;