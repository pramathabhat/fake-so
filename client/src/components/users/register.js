import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { registerUserThunk } from "./usersThunks";
import {useNavigate} from "react-router";
import "./users.css"
import {findAllUsers} from "./users";

function Register() {

	const navigate = useNavigate()

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeat] = useState("");
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		const allUsers = await findAllUsers();
		console.log(allUsers);
		setUsers(allUsers);
	}

	useEffect(() => {
		getUsers();
	}, []);

	const dispatch = useDispatch();

	let usernameError = document.getElementById("usernameError");

	let emailError = document.getElementById("emailError");

	let repeatPasswordError = document.getElementById("repeatPasswordError");

	const handleRegister = async () => {
		let emailTest = emailChecker(email);
		if (!emailTest) {
			emailError.textContent = "Must be a valid email";
			return;
		}
		if (password !== repeatPassword) {
			repeatPasswordError.textContent = "Both passwords must match"
			return;
		}
		const userExistsTest = users.filter((user) => user.username === username);
		if (userExistsTest.length !== 0) {
			usernameError.textContent = "This user already exists";
			return;
		}
		const emailExistsTest = users.filter((user) => user.email === email);
		if (emailExistsTest.length !== 0) {
			emailError.textContent = "This email already exists";
			return;
		}
		try {
			await dispatch(registerUserThunk({ username, email, password}));
			navigate("/login");
		} catch (e) {

			alert(e);
		}
	};

	function emailChecker(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	return (
		<div>
			<div id="formContainer" className="add-user-format">
				<b className={"header-format"}>Register Screen</b>
				<div>
					<b className={"titles-format"}>Username</b>
					<input id="username" className="form-control textarea-format" type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
				</div>
				<div id="usernameError" className={"error-format"}/>
				<div>
					<b className={"titles-format"}>Email</b>
					<input id="email" className="form-control textarea-format" type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
				</div>
				<div id="emailError" className={"error-format"}/>
				<div>
					<b className={"titles-format"}>Password</b>
					<input id="password" className="form-control textarea-format" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
				</div>
				<div id="passwordError" className={"error-format"}/>
				<div>
					<b className={"titles-format"}>Re-Enter Password</b>
					<input id="repeatPassword" className="form-control textarea-format" type="password" value={repeatPassword} onChange={(event) => setRepeat(event.target.value)}/>
				</div>
				<div id="repeatPasswordError" className={"error-format"}/>
				<button id={"registerButton"} className="btn btn-primary mt-2"
						onClick={handleRegister}>
					Register
				</button>
			</div>

		</div>
	);
}
export default Register;