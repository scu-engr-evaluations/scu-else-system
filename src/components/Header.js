import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import logo from "../images/scu_seal.png";
import scu from "../images/scu_header.png";

class Header extends Component {
	render() {
		return (
			<Navbar expand="sm" bg="light" variant="light">
				<Navbar.Brand>
					<div className="brand">
						<img
							style={spacing}
							src={logo}
							width="50"
							alt="SCU Seal"
						/>
						<img
							style={spacing}
							src={scu}
							width="250"
							alt="SCU"
						/>
					</div>
				</Navbar.Brand>
			</Navbar>
		);
	}
}

var spacing = {
	padding: "2%",
}

export default Header;
