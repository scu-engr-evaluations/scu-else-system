import React, { Component } from "react";

class ForgotPassword extends Component {
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
				<section>
					<a href="/login">&lt; Back to Login</a>
				</section>
				<h1 className = "PageHeader">
					Forgot Your Password?
				</h1>
				<p style={group}>Please call the Technology Help Desk at (408) 554-5700, or visit them on the first floor of the SCU Library for help in recovering your password. Leave a message if the Technology Help Desk is closed.</p>
			</div>
		);
	}
}

var group = {
	flexDirection: "column",
	textAlign: "center"
}

export default ForgotPassword;
