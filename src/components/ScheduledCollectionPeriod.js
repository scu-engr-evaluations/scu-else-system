import React, { Component } from "react";
import { Button } from "react-bootstrap";

class ScheduledCollectionPeriod extends Component {
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
					Scheduled Collection Period
				</h1>
				<p style={group}>There is currently a scheduled collection period. If you would like to edit or stop the scheduled collection period, click Stop. Otherwise, click Logout.</p>
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

export default ScheduledCollectionPeriod;
