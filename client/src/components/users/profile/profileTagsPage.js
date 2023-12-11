import React, {useContext, useEffect, useState} from "react";
import {PageContext} from "../../PageContext";
import {getTags} from "../../tags/tagsCalls";
import {getAllQuestions} from "../../questions/questionsCalls";
import {useSelector} from "react-redux";

function ProfileTagsPage() {

	const { setPage, setTag } = useContext(PageContext);

	const { currentUser } = useSelector((state) => state.user);

	const [tags, setTags] = useState([]);

	const userTags = tags.filter((tag) => currentUser.tags.includes(tag._id));

	const getAllTags = async () => {
		const tags = await getTags();
		setTags(tags);
	};

	const [questions, setQuestions] = useState([]);
	const getQuestions = async () => {
		const questions = await getAllQuestions();
		setQuestions(questions);
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

	const handleTagClick = (tag) => {
		setTag(tag);
		setPage(16);
	};

	const renderTagNodes = () => {
		const tagNodes = [];

		for (let i = 0; i < userTags.length; i += 3) {
			const tagRow = [];
			for (let j = 0; j < 3 && i + j < userTags.length; j++) {
				const tag = userTags[i + j];
				// console.log(tag);
				tagRow.push(
					<div key={tag._id} className="tagNode">
						<a onClick={() => handleTagClick(tag)}>{tag.name + " "}</a>
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
				<div className="grid-container tagsPage-format">
					<div className="so-tags-upper-div">
						<div>
							<b>{userTags.length === 1 ? userTags.length + " Tag" : userTags.length + " Tags"}</b>
						</div>
						<div>
							<b>{currentUser.username}&apos;s Tags</b>
						</div>
					</div>
					<div className="so-tags-content-div">{renderTagNodes()}</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileTagsPage