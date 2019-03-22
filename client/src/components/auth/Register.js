import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Segment, Grid, Message } from 'semantic-ui-react';

import { actions as authActions } from '../../reducers/auth';
import { actions as subjectsActions } from '../../reducers/subjects';
import SubjectsCheckboxes from '../subjects/subjectsCheckboxes';

const options = [
	{ key: 0, text: 'Student', value: 0 },
	{ key: 1, text: 'Teacher', value: 1 },
	{ key: 2, text: 'Parent', value: 2 }
];
const classes = [
	{ key: 1, text: '1', value: 1 },
	{ key: 2, text: '2', value: 2 },
	{ key: 3, text: '3', value: 3 },
	{ key: 4, text: '4', value: 4 },
	{ key: 5, text: '5', value: 5 },
	{ key: 6, text: '6', value: 6 },
	{ key: 7, text: '7', value: 7 },
	{ key: 8, text: '8', value: 8 },
	{ key: 9, text: '9', value: 9 },
	{ key: 10, text: '10', value: 10 },
	{ key: 11, text: '11', value: 11 }
];

class Register extends Component {
	componentDidMount() {
		if (this.props.subjects.length === 0) {
			this.props.init();
		}
	}

	onChange = (e) => {
		const { name, value } = e.target;
		this.props.fc(name, value);
	};

	submitUser = (e) => {
		e.preventDefault();
		const { name, email, password, password2, surname, role, subjects } = this.props;
		const newUser = {
			name,
			email,
			password,
			password2,
			surname,
			role,
			subjects
		};

		this.props.signup(newUser);
	};

	setRole = (e, { value }) => {
		this.props.fc('role', value);
	};

	getSubjects = (e, { value }) => {
		this.props.setFilter(value);
	};
	getInputField = (name, label, icon) => {
		const { errors } = this.props;
		const error = errors.filter((x) => x.key === name);
		const input = (
			<Form.Input
				label={label}
				name={name}
				icon={icon}
				iconPosition="left"
				placeholder={label}
				value={this.props.user[name]}
				onChange={this.onChange}
				error={error.length > 0}
			/>
		);
		if (error.length > 0) return [ input, <Message error content={error[0].msg} /> ];
		else return input;
	};
	/**
	|--------------------------------------------------
	| // TODO: Select Teacher should hide class selector and show all subjects
	|--------------------------------------------------
	*/
	render() {
		console.log(this.props);
		const { role } = this.props.user;
		const { errors, filter } = this.props;

		return (
			<div className="dark-overlay landing-inner">
				<Segment placeholder compact className="work-container">
					<Form error={errors.length > 0}>
						<Grid columns="equal" stackable textAlign="center" relaxed>
							<Grid.Row>
								<Grid.Column textAlign="left">
									{this.getInputField('name', 'Name', 'user')}
									{this.getInputField('surname', 'Surname', 'user outline')}
									{this.getInputField('email', 'Email', 'mail')}
									{this.getInputField('password', 'Password', 'lock')}
									{this.getInputField('password2', 'Confirm Password', 'lock')}
									<Form.Select
										fluid
										label="Role"
										options={options}
										placeholder="Role"
										value={role}
										onChange={this.setRole}
									/>
									{role < 2 && (
										<Form.Select
											fluid
											label="Class"
											options={classes}
											placeholder="Class"
											onChange={this.getSubjects}
										/>
									)}
								</Grid.Column>
								{filter > 0 && role < 2 && <SubjectsCheckboxes />}
							</Grid.Row>

							<Grid.Row>
								<Grid.Column>
									<Button
										content="Sign Up"
										icon="signup"
										labelPosition="left"
										primary
										onClick={this.submitUser}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form>
				</Segment>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	user: state.auth.user,
	errors: state.auth.errors,
	subjects: state.subjects.subjects,
	filter: state.subjects.filter
});
export default connect(mapStateToProps, { ...authActions, ...subjectsActions })(Register);
