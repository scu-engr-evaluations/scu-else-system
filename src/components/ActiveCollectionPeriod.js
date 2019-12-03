import React, { Component } from "react";
import { Button } from "react-bootstrap";

class ActiveCollectionPeriod extends Component {
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
					Active Collection Period
				</h1>
				<p style={group}>There is currently an active collection period. If you would like to stop the collection period immediately, click Stop. Otherwise, click Logout.</p>
				<section style={group}>
					<Button variant="gray" href="/admin">Stop</Button>
					&nbsp;
					<Button variant="red" href="/login">Logout</Button>
				</section>
			</div>
		);
	}
}

var group = {
	flexDirection: "column",
	textAlign: "center"
}

export default ActiveCollectionPeriod;
