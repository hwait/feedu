import React, { Component } from 'react';
import { Form, Button, Segment, Grid, Checkbox } from 'semantic-ui-react';

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
	state = { subjectCheckboxes: [] };
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
	render() {
		const { subjectCheckboxes } = this.state;
		return (
			<div class="dark-overlay landing-inner">
				<Segment placeholder compact className="work-container">
					<Form>
						<Grid columns="equal" stackable textAlign="center" relaxed>
							<Grid.Row>
								<Grid.Column textAlign="left">
									<Form.Input label="Name" icon="user" iconPosition="left" placeholder="Name" />
									<Form.Input
										label="Surname"
										icon="user outline"
										iconPosition="left"
										placeholder="Surname"
									/>
									<Form.Input label="Email" icon="mail" iconPosition="left" placeholder="Email" />
									<Form.Input
										label="Password"
										icon="lock"
										iconPosition="left"
										placeholder="Password"
										type="password"
									/>
									<Form.Input
										label="Confirm Password"
										icon="lock"
										iconPosition="left"
										placeholder="Confirm Password"
										type="password"
									/>
									<Form.Select fluid label="Role" options={options} placeholder="Role" />
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
									<Button content="Sign Up" icon="signup" labelPosition="left" primary />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form>
				</Segment>
			</div>
		);
	}
}

export default Register;