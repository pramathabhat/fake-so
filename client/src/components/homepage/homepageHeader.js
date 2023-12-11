import "./homepageCSS.css"
import React from "react";
import SearchBar from "./searchBar";

const HomepageHeader = () => {

	return(
		<div id="header" className={"header"}>
			<div className={"header-title-format"}>
				<h1>Fake Stack Overflow</h1>
			</div>
			<SearchBar/>
		</div>
	);
}

export default HomepageHeader;