import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

import Header from "./components/Header.js";
import Login from "./components/Login.js";
import AdminHome from "./components/AdminHome.js";
import Survey from "./components/Survey.js";
import ForgotPassword from "./components/ForgotPassword.js";
import ActiveCollectionPeriod from "./components/ActiveCollectionPeriod.js";
import ScheduledCollectionPeriod from "./components/ScheduledCollectionPeriod.js";
import AuthenticatedRoute from "./components/AuthenticatedRoute.js";
import AdminSurveyHasEnded from "./components/AdminSurveyHasEnded.js";
import StudentSurveyHasEnded from "./components/StudentSurveyHasEnded.js";

import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		return (
				<div className="App" {...this.props}>
					<Header />
					<Router>
						<Switch>
							<AuthenticatedRoute path="/admin" component={AdminHome} />
							<Route path="/login" component={Login} />
							<Route path="/survey" component={Survey} />
							<Route path="/forgot" component={ForgotPassword} />
							<Route path="/active" component={ActiveCollectionPeriod} />
							<Route path="/scheduled" component={ScheduledCollectionPeriod} />
							<Route path="/download" component={AdminSurveyHasEnded} />
							<Route path="/end" component={StudentSurveyHasEnded} />
							<Redirect exact from="/" to="/login" />
						</Switch>
					</Router>
					<header className="App-header">
					</header>
				</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
