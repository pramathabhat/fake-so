import React, {useContext} from "react";
import {useSelector} from "react-redux";
import "./profile.css";
import {PageContext} from "../../PageContext";

function Profile() {

	const { currentUser } = useSelector((state) => state.user);

	const {setPage} = useContext(PageContext);

	function daysSinceCreation(creationDate) {
		const specificDateObject = new Date(creationDate);
		const currentDate = new Date();
		const timeDifference = currentDate - specificDateObject;
		return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	}

	let days = daysSinceCreation(new Date(currentUser.createDate));

	let points = currentUser.points;

	const viewUserQuestions = () => {
		setPage(12);
	}

	const viewUserAnswers = () => {
		setPage(13);
	}

	const viewUserTags = () => {
		setPage(15);
	}

	return(
		<div className={"profile-page-format column right"}>
			<div className={"profile-container-format"}>
				<div className={"profile-header-format"}>User Profile</div>
				<div className={"profile-sub-header-format"}>User Information</div>
				<p className={"profile-info-format"}><b>Username:</b> {currentUser.username}</p>
				<p className={"profile-info-format"}><b>Email:</b> {currentUser.email}</p>
				<p className={"profile-info-format"}><b>Member for:</b> {days} days</p>
				<p className={"profile-info-format"}><b>Reputation:</b> {points}</p>
				<p className={"profile-sub-header-format"}>What you have made</p>

				<div className={"profile-link-format"}>
					<a onClick={viewUserQuestions}>Your Questions</a>
				</div>
				<div className={"profile-link-format"}>
					<a onClick={viewUserAnswers}>Your Answers</a>
				</div>
				<div className={"profile-link-format"}>
					<a onClick={viewUserTags}>Your Tags</a>
				</div>
			</div>
		</div>
	);
}

export default Profile;