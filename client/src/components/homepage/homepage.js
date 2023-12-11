import "../../stylesheets/index.css"
import "./homepageCSS.css"
import HomepageHeader from "./homepageHeader";
import NavigationBar from "./NavigationBar";
import HomepageSwitcher from "./HomepageSwitcher";
import React from "react"

const Homepage = () => {

	return(
		<div>
			<HomepageHeader/>
			<div>
				<NavigationBar/>
				<HomepageSwitcher/>
			</div>
		</div>
	);
}

export default Homepage;