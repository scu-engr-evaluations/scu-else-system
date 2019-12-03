import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

class AuthenticatedRoute extends Component {
	render() {
		if (localStorage.getItem('token')) {
			return (
				<Route {...this.props} />
			)
		}
		else {
			return (
				<Redirect to={{
					pathname: '/login',
					state: {from: this.props.location}
					}}
				/>
			)
		}
	}
}

export default withRouter(AuthenticatedRoute);
