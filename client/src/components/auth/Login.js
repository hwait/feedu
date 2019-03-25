import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actions as authActions } from '../../reducers/auth';
import InputField from '../misc/InputField';

class Login extends Component {
	state = {
		email: '',
		password: ''
	};

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.changePath('dashboard');
			this.props.history.push('/dashboard');
		}
	}

	componentDidUpdate() {
		if (this.props.isAuthentificated) {
			// TODO: should remove it to Profile component
			this.props.changePath('dashboard');

			this.props.history.push('/dashboard');
		}
	}
	submitUser = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		this.props.login(email, password);
	};
	onChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	};
	render() {
		const { email, password } = this.state;
		const { errors } = this.props;
		console.log('====================================');
		console.log(this.props);
		console.log('====================================');
		return (
			<Form>
				<InputField
					name="email"
					label="Email"
					icon="mail"
					value={email}
					errors={errors}
					noLabel
					onChange={this.onChange}
				/>
				<InputField
					name="password"
					label="Password"
					icon="lock"
					type="password"
					value={password}
					errors={errors}
					noLabel
					onChange={this.onChange}
				/>

				<Button content="Sign In" icon="sign in" labelPosition="left" primary onClick={this.submitUser} />
			</Form>
		);
	}
}
Login.propTypes = {
	changePath: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	isAuthentificated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthentificated: state.auth.isAuthentificated,
	errors: state.auth.errors
});
export default connect(mapStateToProps, { ...authActions })(withRouter(Login));
