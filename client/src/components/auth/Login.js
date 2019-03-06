import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class Login extends Component {
	render() {
		return (
			<Form>
				<Form.Input icon="mail" iconPosition="left" placeholder="Email" />
				<Form.Input icon="lock" iconPosition="left" placeholder="Password" type="password" />

				<Button content="Sign In" icon="sign in" labelPosition="left" primary />
			</Form>
		);
	}
}

export default Login;
