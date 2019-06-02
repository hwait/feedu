import React, { Component } from 'react';
import { Form, Button, Segment, Grid, Message } from 'semantic-ui-react';

import InputField from '../misc/InputField';

const options = [
	{ key: 0, text: 'Student', value: 0 },
	{ key: 1, text: 'Teacher', value: 1 },
	{ key: 2, text: 'Parent', value: 2 }
];
class ProfileForm extends Component {
	onChange = (e) => {
		const { name, value } = e.target;
		this.props.fc(name, value);
	};

	submitUser = (e) => {
		e.preventDefault();
		const { name, email, password, password2, surname, role } = this.props;
		const newUser = {
			name,
			email,
			password,
			password2,
			surname,
			role
		};

		this.props.signup(newUser);
	};

	setRole = (e, { value }) => {
		this.props.fc('role', value);
	};

	getSubjects = (e, { value }) => {
		this.props.setFilter(value);
	};

	render() {
		console.log(this.props);
		const { role, name, surname, email, password, password2 } = this.props.user;
		const { errors, onChange, submitUser, setRole, butname } = this.props;

		return (
			<div className="dark-overlay landing-inner">
				<Segment placeholder compact className="work-container">
					<Form error={Object.keys(errors).length > 0}>
						<Grid columns="equal" stackable textAlign="center" relaxed>
							<Grid.Row>
								<Grid.Column textAlign="left">
									<InputField
										name="name"
										label="Name"
										icon="user"
										value={name}
										errors={errors}
										onChange={onChange}
									/>
									<InputField
										name="surname"
										label="Surname"
										icon="user outline"
										value={surname}
										errors={errors}
										onChange={onChange}
									/>
									<InputField
										name="email"
										label="Email"
										icon="mail"
										value={email}
										errors={errors}
										onChange={onChange}
									/>
									{butname === 'Sign Up' && (
										<InputField
											name="password"
											type="password"
											label="Password"
											icon="lock"
											value={password}
											errors={errors}
											onChange={onChange}
										/>
									)}
									{butname === 'Sign Up' && (
										<InputField
											name="password2"
											type="password"
											label="Confirmation Password"
											icon="lock"
											value={password2}
											errors={errors}
											onChange={onChange}
										/>
									)}
									<Form.Select
										fluid
										label="Role"
										options={options}
										placeholder="Role"
										value={role}
										onChange={setRole}
									/>
								</Grid.Column>
							</Grid.Row>

							<Grid.Row>
								<Grid.Column>
									{errors.hasOwnProperty('code') && <Message error content={errors.code} />}
									<Button
										content={butname}
										icon="save"
										labelPosition="left"
										primary
										onClick={submitUser}
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

export default ProfileForm;
