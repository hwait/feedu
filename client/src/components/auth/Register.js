import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Segment, Grid, Checkbox, Message } from 'semantic-ui-react';

import { actions as authActions } from '../../reducers/auth';

const options = [
	{ key: 0, text: 'Student', value: 0 },
	{ key: 1, text: 'Teacher', value: 1 },
	{ key: 2, text: 'Parent', value: 2 }
];
const classes = [
	{ key: 0, text: 'All', value: 0 },
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
const subjects = [
	{
		classfrom: 10,
		classto: 11,
		extendable: 1,
		id: 51,
		name: 'Алгебра и начала анализа',
		reshid: 51
	},
	{
		classfrom: 7,
		classto: 11,
		extendable: 1,
		id: 17,
		name: 'Геометрия',
		reshid: 17
	},
	{
		classfrom: 1,
		classto: 6,
		extendable: 1,
		id: 12,
		name: 'Математика',
		reshid: 12
	},
	{
		classfrom: 7,
		classto: 9,
		extendable: 1,
		id: 16,
		name: 'Алгебра',
		reshid: 16
	},

	{
		classfrom: 2,
		classto: 11,
		extendable: 1,
		id: 11,
		name: 'Английский язык',
		reshid: 11
	},

	{
		classfrom: 1,
		classto: 11,
		extendable: 0,
		id: 13,
		name: 'Русский язык',
		reshid: 13
	},
	{
		classfrom: 5,
		classto: 11,
		extendable: 0,
		id: 14,
		name: 'Литература',
		reshid: 14
	},
	{
		classfrom: 1,
		classto: 4,
		extendable: 0,
		id: 32,
		name: 'Литературное чтение',
		reshid: 32
	},
	{
		classfrom: 5,
		classto: 11,
		extendable: 0,
		id: 3,
		name: 'История',
		reshid: 3
	},
	{
		classfrom: 5,
		classto: 11,
		extendable: 0,
		id: 4,
		name: 'География',
		reshid: 4
	},
	{
		classfrom: 6,
		classto: 11,
		extendable: 0,
		id: 24,
		name: 'Обществознание',
		reshid: 24
	},
	{
		classfrom: 10,
		classto: 11,
		extendable: 0,
		id: 40,
		name: 'Экология',
		reshid: 40
	},
	{
		classfrom: 10,
		classto: 11,
		extendable: 0,
		id: 42,
		name: 'Россия в мире',
		reshid: 42
	},
	{
		classfrom: 10,
		classto: 11,
		extendable: 0,
		id: 41,
		name: 'Право',
		reshid: 41
	},
	{
		classfrom: 1,
		classto: 4,
		extendable: 0,
		id: 43,
		name: 'Окружающий мир',
		reshid: 43
	},
	{
		classfrom: 8,
		classto: 11,
		extendable: 0,
		id: 23,
		name: 'ОБЖ',
		reshid: 23
	},
	{
		classfrom: 10,
		classto: 11,
		extendable: 0,
		id: 38,
		name: 'Экономика',
		reshid: 38
	},
	{
		classfrom: 7,
		classto: 11,
		extendable: 1,
		id: 28,
		name: 'Физика',
		reshid: 28
	},
	{
		classfrom: 8,
		classto: 11,
		extendable: 1,
		id: 29,
		name: 'Химия',
		reshid: 29
	},
	{
		classfrom: 5,
		classto: 11,
		extendable: 1,
		id: 5,
		name: 'Биология',
		reshid: 5
	},
	{
		classfrom: 10,
		classto: 11,
		extendable: 0,
		id: 33,
		name: 'Естествознание',
		reshid: 33
	}
];

class Register extends Component {
	state = {
		subjectCheckboxes: [],
		subjectSelected: [],
		name: '',
		surname: '',
		email: '',
		password: '',
		password2: '',
		role: 1,
		errors: {}
	};

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
		const arr = subjects
			.filter((x) => x.classfrom <= value && x.classto >= value)
			.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
			.map((x) => {
				return x.extendable === 0 ? (
					<Form.Group inline style={{ height: '16px' }}>
						<Form.Field key={`subj${x.reshid}`} control={Checkbox} label={x.name} />
					</Form.Group>
				) : (
					<Form.Group inline style={{ height: '16px' }}>
						<Form.Field key={`subj${x.reshid}`} control={Checkbox} label={x.name} />
						<Checkbox key={`subjext${x.reshid}`} />
					</Form.Group>
				);
			});
		this.setState({ subjectCheckboxes: arr });
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
	| // TODO: Toggle check all visible
	| // TODO: Class must be hidden by default
	| // TODO: Select Parent should hide checkboxes and class selector
	| // TODO: Select Teacher should hide class selector and show all subjects
	|--------------------------------------------------
	*/
	render() {
		const { subjectCheckboxes } = this.state;
		console.log(this.props);
		const { role } = this.props.user;
		const { errors } = this.props;

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
									<Form.Select
										fluid
										label="Class"
										options={classes}
										placeholder="Class"
										onChange={this.getSubjects}
									/>
								</Grid.Column>
								<Grid.Column textAlign="left">
									<Form.Group inline style={{ height: '16px' }}>
										<Form.Field control={Checkbox} />
									</Form.Group>
									{subjectCheckboxes}
								</Grid.Column>
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
	errors: state.auth.errors
});
export default connect(mapStateToProps, { ...authActions })(Register);
