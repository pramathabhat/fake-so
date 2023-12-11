import "./AskQuestionCSS.css"
import React, {useContext, useEffect, useState} from "react";
import {PageContext} from "../../PageContext";
import {createNewQuestion, getAllQuestions} from "../questionsCalls";
import {createNewTag, findOneTag, getTags} from "../../tags/tagsCalls.js";
import {useDispatch, useSelector} from "react-redux";
import {updateUserThunk} from "../../users/usersThunks";

const AskAQuestion = () => {

	const { currentUser } = useSelector((state) => state.user);

	const {setPage} = useContext(PageContext);

	const [tags, setTags] = useState([]);

	const dispatch = useDispatch();

	const GetAllTags = async () => {
		const tags = await getTags();
		setTags(tags)
	}

	useEffect(() => {
		GetAllTags();
	}, []);

	async function PostQuestion(tags) {

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
				if (currentUser.points >= 50) {
					let t = { name: text, createdBy: currentUser };
					await (async function addNewTag(tag) {
						await createNewTag(tag);
					})(t);
					await (async function addTagToUser(user, tag) {
						let newTagWithID = await findOneTag(tag.name);
						let newUser = {...user, tags: [...currentUser.tags, newTagWithID._id]};
						dispatch(updateUserThunk(newUser));
					})(currentUser, t);
					tagNames.push(t.name);
				} else {
					tagError.textContent = "Must have over 50 reputation points to add new tags";
					return
				}
			}
		}
		const finalTags = await getTags();

		let tagsToUse = finalTags.filter((tag) => tagNames.includes(tag.name));

		const q = {
			title: title,
			text: text,
			tags: tagsToUse,
			asked_by: currentUser,
			ask_date_time: new Date(),
			active_date: new Date(),
		};
		await (async function addNewQuestion(question) {
			await createNewQuestion(question);
		})(q);
		await (async function addQuestionToUser(user, question) {
			let addQuestion = await getAllQuestions();
			addQuestion = addQuestion.filter((q) => q.title === question.title);
			let newUser = {...user, questions: [...currentUser.questions, addQuestion[0]._id]};
			await dispatch(updateUserThunk(newUser));
		})(currentUser, q);
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
					/>
					<div id="titleError" className={"error-format"}/>

					<label htmlFor="formTextInput"
					><b className={"titles-format"}>Question Text*</b><br /><i>Add details</i></label
					><br />
					<textarea id="formTextInput" rows="4" className="text-textarea-format" required></textarea>
					<div id="textError" className={"error-format"}/>

					<label htmlFor="formTagInput"
					><b className={"titles-format"}>Tags*</b><br /><i
					>Add keywords separated by whitespace</i></label
					><br />
					<textarea id="formTagInput" rows="4" className="tag-textarea-format"></textarea>
					<div id="tagError" className={"error-format"}/>

					<button type="submit" className="so-background-cornflowerblue" id="postButton" onClick={() => PostQuestion(tags)}>
						Post Question</button
					><label className="indication-format">* indicates mandatory fields</label>

				</div>
			</div>
		</div>
	);
}

export default AskAQuestion;