import "../questionCSS.css"
import React, {useContext} from "react";
import {PageContext} from "../../PageContext";

const AskAQuestionButton = () => {

	const {setPage} = useContext(PageContext);

	function AskQuestion() {
		setPage(3);
	}

	return(
		<div>
			<button id="askQuestion" className="ask-button-format" onClick={AskQuestion}>Ask a Question</button>
		</div>

	);
}

export default AskAQuestionButton;