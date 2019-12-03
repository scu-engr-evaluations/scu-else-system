import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, Tab, Tabs, Modal } from "react-bootstrap";
import AdminSurveyTable from "./AdminSurveyTable.js";
import AdminAddRowForm from "./AdminAddRowForm.js";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

class AdminHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			prompt: "",
			questionType: "",
			rows: [],
			showModal: false,
			startDate: "",
			endDate: "",
		}
	}

	componentDidMount() {
		//axios.get("http://127.0.0.1:8000/api/")
		axios.get("http://scu-else.herokuapp.com/api/")
			.then(res => {
				this.setState({
					rows: res.data
				});
			})
	}

	handleFormSubmit  = (event) => {
		event.preventDefault();
		let rows = [...this.state.rows];
		rows.push({
			readOnly: true,
			prompt: this.state.prompt,
			questionType: this.state.questionType ? this.state.questionType : "RR",
		});

		//axios.post("http://127.0.0.1:8000/api/", {
		axios.post("http://scu-else.herokuapp.com/api/", {
			readOnly: true,
			prompt: this.state.prompt,
			questionType: this.state.questionType ? this.state.questionType : "RR",
		})
		.then(res => console.log(res))
		//.catch(error => console.err(error));

		this.setState({
			rows,
			prompt: "",
			questionType: "",
		});
	}

	handleInputChange = (event) => {
		const {name, value}=  event.target;

		this.setState({
			[name]: value
		})
	}

	handleRemove = (event, id, dataID) => {
		var rows = [...this.state.rows];

		//axios.delete(`http://127.0.0.1:8000/api/${dataID}/`);
		axios.delete(`http://scu-else.herokuapp.com/api${dataID}/`);

		rows.splice(id, 1);
		this.setState({rows: rows});
		this.forceUpdate();
	}

	handleEdit = (event, id) => {
		var rows = [...this.state.rows];
		rows[id].readOnly = false;
		this.setState({rows: rows,});
	}

	handleSave = (event, id, prompt, questionType, dataID) => {
		var rows = [...this.state.rows];
		rows[id].readOnly = true;
		rows[id].prompt = prompt;
		rows[id].questionType = questionType;

		//axios.put(`http://127.0.0.1:8000/api/${dataID}/`, {
		axios.put(`http://scu-else.herokuapp.com/api/${dataID}/`, {
			readOnly: true,
			prompt: prompt,
			questionType: questionType,
		})
		.then(res => console.log(res))
		//.catch(error => console.err(error));

		this.setState({
			rows,
		});
	}

	handleCancel = (event, id) => {
		var rows = [...this.state.rows];
		rows[id].readOnly = true;
		this.setState({rows: rows,});
	}

	modalClose = () => {
		this.setState({
			showModal: false,
		})
	}

	modalOpen = () => {
		this.setState({
			showModal: true,
		})
	}

	render() {
		return (
			<div className = "PageContainer">
				<section>
					<a href="/login" onClick={this.props.logout}>
						Logout
					</a>
				</section>
				<h1 className = "PageHeader">
					Home
				</h1>
				<section>
					<h2>
						Import Spreadsheet
					</h2>
					<p>Select a file: <input type="file" name="masterSpreadsheet" /></p>
				</section>
				<section>
					<h2>
						Survey Questions
					</h2>
					<AdminSurveyTable rows={this.state.rows}
						handleRemove={this.handleRemove}
						handleEdit={this.handleEdit}
						handleSave={this.handleSave}
						handleCancel={this.handleCancel}
						handleInputChange={this.handleInputChange}
						readOnly={this.state.readOnly}
					/>
				</section>
				<section>
					<h2>
						Add a Question
					</h2>
					<AdminAddRowForm handleFormSubmit={this.handleFormSubmit}
						handleInputChange={this.handleInputChange}
						prompt={this.state.prompt}
						questionType={this.state.questionType}
					/>
				</section>
				<section>
					<h2>
						Manage Survey
					</h2>
					<Tabs defaultActiveKey="auto">
						<Tab eventKey="auto" title="Auto">
							<Row style={spacing}>
								<Col>
									<span>Start Date:</span>
									<input type="date" name="startDate" defaultValue={this.state.startDate} onChange={this.handleInputChange} />
								</Col>
								<Col>
									<span>End Date: </span>
									<input type="date" name="endDate" defaultValue={this.state.endDate} onChange={this.handleInputChange} />
								</Col>
							</Row>
							<Row style={group}>
								<Button variant="red" onClick={this.modalOpen} >Confirm</Button>
							</Row>
						</Tab>
						<Tab eventKey="manual" title="Manual">
							<Row style={group}>
								<Button variant="red" onClick={this.modalOpen} >Start Now</Button>
							</Row>
						</Tab>
					</Tabs>
					<Modal
						show={this.state.showModal}
						onHide={this.modalClose}
						centered
					>
						<Modal.Header closeButton></Modal.Header>
						<Modal.Body>
							<p>Would you like to schedule your survey to start at 12:00AM on {this.state.startDate} and end at 11:59PM on {this.state.endDate}?</p>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="gray" onClick={this.modalClose}>Close</Button>
							<Button variant="red" onClick={this.modalClose} href="/scheduled" >OK</Button>
						</Modal.Footer>
					</Modal>
				</section>
			</div>
		);
	}
}

var group = {
	margin: "2%",
	flexDirection: "column",
	alignItems: "center",
}

var spacing = {
	margin: "2%",
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	}
}

export default connect(null, mapDispatchToProps)(AdminHome);
