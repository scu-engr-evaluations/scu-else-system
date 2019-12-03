import React, { Component } from "react";
import { Form, Button, Table } from "react-bootstrap";

class AdminSurveyTable extends Component {
	render() {
		return (
			<div className = "tableContainer">
				<Table striped bordered hover>
						<tbody>
							<tr>
								<th>Number</th>
								<th>Question</th>
								<th>Type</th>
								<th>Actions</th>
							</tr>
							{this.props.rows.map((row, id) => (
									<tr key={id}>
										<td>{id + 1}</td>
										<td>{row.readOnly ?
											<span>{row.prompt}</span>
											:
											<Form.Control required type="text" ref={input=>this.textInput = input} defaultValue={row.prompt} onChange={this.props.handleInputChange} readOnly={row.readOnly} />
											}
										</td>
										<td>{row.readOnly ?
											<span>{row.questionType}</span>
											:
											<span>
												<Form.Control required as="select" ref={input=>this.optionInput = input} defaultValue={row.questionType} onChange={this.props.handleInputChange} disabled={row.readOnly} >
													<option disabled>Choose...</option>
													<option value="RR">Radio</option>
													<option value="FR">Free</option>
													<option value="DR">Dropdown</option>
												</Form.Control>
											</span>
											}
										</td>
										<td> {row.readOnly ?
											<span>
												<Button variant="gray" onClick={(event) => {this.props.handleEdit(event, id)}}>Edit</Button>
												&nbsp;
												<Button variant="gray" onClick={(event) => {this.props.handleRemove(event, id, row.id)}}>Delete</Button>
											</span>
											:
											<span>
												<Button variant="gray" onClick={(event) => {this.props.handleCancel(event, id)}}>Cancel</Button>
												&nbsp;
												<Button variant="gray" onClick={(event) => {this.props.handleSave(event, id, this.textInput.value, this.optionInput.value, row.id)}}>Save</Button>

											</span>
											}
										</td>
									</tr>
							))}
						</tbody>
				</Table>
			</div>
		);
	}
}

export default AdminSurveyTable;
