import "../../stylesheets/index.css"
import "./homepageCSS.css"
import React, {useContext} from "react";
import {PageContext} from "../PageContext";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../users/usersThunks";
import {useNavigate} from "react-router";

const NavigationBar = () => {

	const {page, setPage} = useContext(PageContext);

	const { currentUser } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const route = useNavigate();

	const logout = async () => {
		try {
			await dispatch(logoutThunk());
			route("/");
		} catch (e) {
			alert(e);
		}
	};

	function navigate(e) {
		if (e.target.innerText === "Questions") {
			setPage(1);
		}
		if (e.target.innerText === "Tags") {
			setPage(2);
		}
		if (e.target.innerText === "Login") {
			route("/login");
		}
		if (e.target.innerText === "Profile") {
			setPage(9);
		}
		if (e.target.innerText === "Register") {
			route("/register");
		}
		if (e.target.innerText === "Logout") {
			logout();
			route("/");
		}
	}

	return(
		<div className={"column left navbar-border"}>
			<div className={"menu"} id="sideBarNav">
				<ul>
					<li><a id="questionsLink" className={`link-format ${(page === 1 || page === 5) ? "nav-active-color" : ""}`} onClick={navigate} >Questions</a></li>
					<li><a id="tagsLink" className={`link-format ${page === 2 ? "nav-active-color" : ""}`}  onClick={navigate}>Tags</a></li>
					{!currentUser && <li><a id="loginLink"
											className={`link-format ${page === 9 ? "nav-active-color" : ""}`}
											onClick={navigate}>Login</a></li>}
					{!currentUser && <li><a id="registerLink" className={`link-format`} onClick={navigate}>Register</a></li>}
					{currentUser && <li><a id="profileLink"
											className={`link-format ${[9, 11,12,13,14,15,16].includes(page) ? "nav-active-color" : ""}`}
											onClick={navigate}>Profile</a></li>}
					{currentUser && <li><a id="logoutLink" className={`link-format`} onClick={navigate}>Logout</a></li>}
				</ul>
			</div>
		</div>
	);
}

export default NavigationBar;