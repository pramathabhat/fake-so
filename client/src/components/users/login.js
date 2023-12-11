import React, {useContext, useState} from "react";
import {useDispatch} from "react-redux";
import { loginThunk } from "./usersThunks";
import {PageContext} from "../PageContext";
import {useNavigate} from "react-router";

function Login() {

	const { setPage } = useContext(PageContext);

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const handleLogin = async () => {

		const passwordError = document.getElementById("passwordError");

		try {
			let login = await dispatch(loginThunk({ username, password }));
			if (login.payload === undefined) {
				passwordError.textContent = "Username or Password is incorrect"
			} else {
				navigate("/home");
				setPage(1);
			}
		} catch (e) {
			alert(e);
		}
	}

	return (
		<div id="formContainer" className="add-user-format">
			<b className={"header-format"}>Login</b>
			<div>
				<b className={"titles-format"}>Username</b>
				<input id="username" className="form-control textarea-format" type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
				<div id="usernameError" className={"error-format"}/>
			</div>
			<div>
				<b className={"titles-format"}>Password</b>
				<input id="password" className="form-control textarea-format" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
				<div id="passwordError" className={"error-format"}/>
			</div>
			<button id="loginButton" onClick={handleLogin}>
				Login
			</button>
		</div>
	);
}

export default Login;