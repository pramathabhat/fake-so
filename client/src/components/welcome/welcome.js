import React from 'react'
import {useNavigate} from "react-router";
import "./welcome.css"

function Welcome() {

	const navigate = useNavigate();

	return(
		<div className={"welcome-page-format"}>
			<h1>Welcome to our Fake Stack Overflow</h1>
			<h2>Please select an option:</h2>
			<ul>

				<button onClick={() => {
					navigate("/register");
				}}>Register as a new user</button>

				<button onClick={() => {
					navigate("/login")
				}}>Login as an existing user</button>

				<button onClick={() => {
					navigate("/home")
				}}>Continue as a guest user</button>
			</ul>
		</div>
	);
}

export default Welcome;