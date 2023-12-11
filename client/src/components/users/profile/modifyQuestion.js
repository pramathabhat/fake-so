import "../../questions/AskAQuestion/AskQuestionCSS.css"
import React, {useContext, useEffect, useState} from "react";
import {PageContext} from "../../PageContext";
import {deleteQuestion, updateQuestion} from "../../questions/questionsCalls";
import {createNewTag, getTags} from "../../tags/tagsCalls.js";
import {useDispatch, useSelector} from "react-redux";
// import {updateUser} from "../users";
import {updateUserThunk} from "../usersThunks";

const ModifyQuestion = (questionId) => {

	let question = questionId.questionId.question;

	const { currentUser } = useSelector((state) => state.user);

	const {setPage} = useContext(PageContext);

	const dispatch = useDispatch();

	const [tags, setTags] = useState([]);

	const GetAllTags = async () => {
		const tags = await getTags();
		setTags(tags)
	}

	useEffect(() => {
		GetAllTags();
	}, []);

	let questionTags = tags.filter((tag) => question.tags.includes(tag._id));
	let questionTagText = questionTags.map((tag) => tag.name)
	questionTagText = questionTagText.join(" ");

	async function UpdateQuestion(tags) {

		let title = document.getElementById("formTitleInput").value;
		let titleError = document.getElementById("titleError");
		if (title.length > 100) {
			titleError.textContent = "Title cannot be more than 100 characters";
			return;
		}
		if (title === "") {
			titleError.textContent = "Title cannot be empty";
			return;
		}
		let text = document.getElementById("formTextInput").value;
		const pattern = /\[([^\]]+)]\(\s*(https?:\/\/[^\s)]+)\)/
		let hyper = text.match(pattern);
		let textError = document.getElementById("textError");
		if (hyper) {
			if (!hyper[2].includes("https://")) {
				textError.textContent = "Invalid Hyperlink";
				return;
			}
		}
		if (text.length === 0) {
			textError.textContent = "Question text cannot be empty";
			return;
		}
		let questionTags = document.getElementById("formTagInput").value;
		let tagsTexts = questionTags.split(" ");
		let tagError = document.getElementById("tagError");
		if (tagsTexts.length > 5) {
			tagError.textContent = "Cannot have more than 5 tags";
			return;
		}
		if (questionTags === "" || questionTags === " ") {
			tagError.textContent = "There must be tags associated with a question";
			return;
		}
		let tagNames = []
		for (let i=0;i<tagsTexts.length; i++) {
			let text = tagsTexts[i];
			if (text.length > 20) {
				tagError.textContent = "New tag length cannot be more than 20";
				return;
			}
			if (tags.filter((tag) => tag.name.toUpperCase() === text.toUpperCase()).length > 0) {
				let tag = tags.find((tag) => tag.name.toUpperCase() === text.toUpperCase());
				tagNames.push(tag.name)
			} else {
				let t = { name: text, createdBy: currentUser };
				await (async function addNewTag(tag) {
					await createNewTag(tag);
				})(t);
				await (async function addTagToUser(user, tag) {
					let newUser = {...user, tags: [...currentUser.tags, tag._id]};
					await dispatch(updateUserThunk(newUser));
				})(currentUser, t);
				tagNames.push(t.name);
			}
		}

		const finalTags = await getTags();

		let tagsToUse = finalTags.filter((tag) => tagNames.includes(tag.name));

		const q = {
			...question,
			title: title,
			text: text,
			tags: tagsToUse
		};
		await (async function callUpdate(newQuestion) {
			await updateQuestion(newQuestion);
		})(q);
		setPage(1);
	}

	const removeQuestion = async () => {
		await dispatch(updateUserThunk({...currentUser, questions: currentUser.questions.filter(() => question !== question._id)}));
		await deleteQuestion(question._id)
		setPage(1);
	}

	const repostQuestion = async () => {
		await dispatch(updateUserThunk({...currentUser}));
		await updateQuestion({...question, active_date: new Date()})
		setPage(1);
	}

	return(
		<div className="column right">
			<div id="formContainer" className="add_question-format">
				<div id="questionForm" className="add_question-format">
					<label htmlFor="formTitleInput"
					><b className={"titles-format"}>Question Title*</b><br /><i
					>Limit title to 100 characters or less</i
					></label><br />
					<textarea
						id="formTitleInput"
						rows="2"
						className="title-textarea-format"
						required
						minLength="2"
						defaultValue={question.title}
					/>
					<div id="titleError" className={"error-format"}/>

					<label htmlFor="formTextInput"
					><b className={"titles-format"}>Question Text*</b><br /><i>Add details</i></label
					><br />
					<textarea id="formTextInput" defaultValue={question.text} rows="4" className="text-textarea-format" required></textarea>
					<div id="textError" className={"error-format"}/>

					<label htmlFor="formTagInput"
					><b className={"titles-format"}>Tags*</b><br /><i
					>Add keywords separated by whitespace</i></label
					><br />
					<textarea id="formTagInput" rows="4" className="tag-textarea-format" defaultValue={questionTagText}></textarea>
					<div id="tagError" className={"error-format"}/>

					<button type="submit" className="so-background-cornflowerblue" id="postButton" onClick={() => UpdateQuestion(tags)}>
						Update Question</button
					><label className="indication-format">* indicates mandatory fields</label>

					<button className="delete-button-format" onClick={removeQuestion}>Delete Question</button>

					<button className="repost-button-format" onClick={repostQuestion}>Repost Question</button>

				</div>
			</div>
		</div>
	);
}

export default ModifyQuestion;