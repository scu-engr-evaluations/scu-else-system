import React, { Component } from "react";
import { Button } from "react-bootstrap";

class StudentSurveyHasEnded extends Component {
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
					Survey Collection Period Has Ended
				</h1>
				<p>
					Thank you for your interest. This survey collection period has already ended.
				</p>
			</div>
		);
	}
}

export default StudentSurveyHasEnded;
