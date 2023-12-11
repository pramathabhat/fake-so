import React, {useContext} from "react";
import {PageContext} from "../PageContext";

function SearchBar() {

	const {setPage} = useContext(PageContext);

	// const [search, setEventSearch] = useState("")

	function Search(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			setPage(5);
		}
	}

	// function onChangeHandler(e) {
		// setEventSearch(e.target.value);
		// setSearch(search);
	// }

	// onChange={onChangeHandler}

	// value={search}

	return(
		<form>
			<div className={"header-searchbar-format"}>
				<input type="text" id="searchBar" placeholder="Search..." onKeyDown={Search}/>
				<label htmlFor="searchBar"></label>
			</div>
		</form>
	);
}

export default SearchBar;