import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions as authActions } from '../../reducers/auth';
import { actions as subjectsActions } from '../../reducers/subjects';
import ProfileForm from './ProfileForm';

class Register extends Component {
	componentDidMount() {
		if (this.props.subjects.length === 0) {
			this.props.init();
		}
		if (this.props.isAuthenticated) {
			this.props.pathChange('dashboard');
			this.props.history.push('/dashboard');
		}
	}
	componentDidUpdate() {
		if (this.props.path === 'dashboard') {
			this.props.history.push('/dashboard');
		}
	}
	onChange = (e) => {
		const { name, value } = e.target;
		this.props.fc(name, value);
	};

	submitUser = (e) => {
		e.preventDefault();
		this.props.signup(this.props.user);
	};

	setRole = (e, { value }) => {
		this.props.fc('role', value);
	};

	/**
	|--------------------------------------------------
	| // TODO: Message about successfull signup on the Login page
	|--------------------------------------------------
	*/
	render() {
		const { errors, user } = this.props;
		return (
			<ProfileForm
				butname="Sign Up"
				onChange={this.onChange}
				errors={errors}
				user={user}
				setRole={this.setRole}
				getSubjects={this.getSubjects}
				submitUser={this.submitUser}
			/>
		);
	}
}
Register.propTypes = {
	fc: PropTypes.func.isRequired,
	signup: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	path: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	path: state.auth.path,
	user: state.auth.user,
	errors: state.auth.errors,
	subjects: state.subjects.subjects
});
export default connect(mapStateToProps, { ...authActions, ...subjectsActions })(Register);
