import React, {useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getAllQuestions, updateQuestion} from "../../questions/questionsCalls";
import {deleteTag, updateTag} from "../../tags/tagsCalls";
import {PageContext} from "../../PageContext";
import {updateUser} from "../users";

function ModifyTag(tag) {

	// console.log(tag);

	const { currentUser } = useSelector((state) => state.user);

	const {setPage} = useContext(PageContext);

	const [tagText, setTagText] = useState("");

	const [questions, setQuestions] = useState([]);

	const getQuestions = async () => {
		const fetchedQuestions = await getAllQuestions();
		setQuestions(fetchedQuestions);
	};

	useEffect(() => {
		getQuestions();
	}, []);

	const handleUpdateTag = async () => {
		const tagTextInput = document.getElementById("tagTextInput");
		const tagError = document.getElementById("entertagrerror");
		if (tagTextInput.value === "" || tagTextInput.value === " ") {
			tagError.textContent = "Tag must have a value";
			return;
		}
		if (tagTextInput.value.length > 20) {
			tagError.textContent = "Tag length cannot be more than 20";
			return;
		}
		const newTag = {
			...tag.tag, name: tagText
		}
		console.log(tag.tag);
		console.log(newTag);
		await updateTag(newTag);
		setPage(15);
	}

	const handleDeleteTag = async () => {
		let questionsWithTags = questions.filter((question) => question.tags.includes(tag.tag._id));
		questionsWithTags.forEach(async (question) => {
			question.tags = question.tags.filter(currentTag => currentTag._id !== tag.tag._id);
			await updateQuestion(question);
		});
		let updatedUser = {...currentUser, tags: currentUser.tags.filter((userTag) => userTag !== tag.tag._id)}
		await updateUser(updatedUser);
		await deleteTag(tag.tag);
		setPage(15);
	}

	return(
		<div id="answerQuestions" className="column right">
			<div className="so-margintop-40px">
			</div>
			<div className="so-margintop-40px">
				<span className="so-fontsize-30px">Tag Name*</span>
				<br />
				<textarea
					rows="5"
					cols="39"
					id="tagTextInput"
					// value={tagText}
					defaultValue={tag.tag.name}
					onChange={(e) => setTagText(e.target.value)}
				/>
				<span id="entertagrerror" className="so-text-red">
        </span>
			</div>
			<div className="so-margintop-40px">
				<button
					className="so-background-cornflowerblue so-text-white so-padding-15px"
					id="updateTag"
					type="submit"
					onClick={handleUpdateTag}
				>
					Update Tag
				</button>
				<button
					className="so-background-darkred so-text-white so-padding-15px"
					id="deleteTag"
					type="submit"
					onClick={handleDeleteTag}
				>
					Delete Tag
				</button>
				<p className="so-display-inline so-margin-left-5p so-text-red">
					* indicates mandatory fields
				</p>
			</div>
		</div>
	);
}

export default ModifyTag;