import "./questionCSS.css"
import React from "react";

const QuestionTags = (tag) => {
	let name = tag.tag.name
	return(
			<button>{name}</button>
	);
}

export default QuestionTags;