import React, { Component } from "react";
import { Button } from "react-bootstrap";

class AdminSurveyHasEnded extends Component {
	constructor() {
		super()
		this.state = {
			username: "",
			password: ""
		}
	}

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
	}

	render() {
		return (
			<div className = "PageContainer">
				<h1 className = "PageHeader">
					Previous Survey Collection Period Has Ended
				</h1>
				<p style={group}>
					The collection period for the previous survey has ended. Click Download to download a copy of all responses, and click Done when you are finished. Please note that you will not be able to access response data for the previous survey after the collection period has ended.
				</p>
				<section style={group}>
					<Button variant="gray" href="/admin">Done</Button>
					&nbsp;
					<Button variant="red">Download</Button>
				</section>
			</div>
		);
	}
}

var group = {
	flexDirection: "column",
	textAlign: "center"
}

export default AdminSurveyHasEnded;
