import React, { Component } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { Spin, Icon } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth"

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Header extends Component {
	constructor() {
		super()
		this.state = {
			username: "",
			password: "",
		}
	}

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onAuth(event.target.username.value, event.target.password.value);
		if (this.props.isAuthenticated) {
			this.props.history.push('/admin');
		}
	}

	render() {
		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<span>{this.props.error.message}</span>
			);
		}

		return (
			<div className = "PageContainer">
				<h1 className = "PageHeader">
					ELSE System Login
				</h1>
				<Alert variant="danger" show={this.props.error}>
					{errorMessage}
				</Alert>
					<Form style={group} onSubmit={this.handleSubmit} >
						<Form.Row controlId="formGroupUsername" style={spacing}>
							<Form.Label>Username</Form.Label>
							<Form.Control placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
						</Form.Row>
						<Form.Row controlId="formGroupPassword" style={spacing}>
							<Form.Label>Password</Form.Label>
							<Form.Control placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
						</Form.Row>
						<Form.Row style={group}>
							<p><a href="/forgot">Forgot Your Password?</a></p>
							<Button variant="red" type="submit">Submit</Button>
						</Form.Row>
					</Form>
					{
						this.props.loading ?
							<Spin indicator={antIcon} />
							:
							null
					}
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

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.token !== null,
		loading: state.loading,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username, password))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
