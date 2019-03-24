import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions as authActions } from '../../reducers/auth';
import { actions as subjectsActions } from '../../reducers/subjects';
import ProfileForm from './ProfileForm';

class Register extends Component {
	componentDidMount() {
		if (this.props.subjects.length === 0) {
			this.props.init();
		}
	}
	componentDidUpdate() {
		if (this.props.path === 'home') {
			this.props.history.push('/');
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

	getSubjects = (e, { value }) => {
		this.props.fc('classn', value);
	};
	/**
	|--------------------------------------------------
	| // TODO: Make Profile page (similar to this one)
	| // TODO: Message about successfull signup on the Login page
	|--------------------------------------------------
	*/
	render() {
		console.log(this.props);

		const { user } = this.props;
		const { role } = user;
		const { errors, filter } = this.props;

		return (
			<ProfileForm
				onChange={this.onChange}
				errors={errors}
				user={user}
				setRole={this.setRole}
				getSubjects={this.getSubjects}
				submitUser={this.submitUser}
				filter={filter}
			/>
		);
	}
}
const mapStateToProps = (state) => ({
	path: state.auth.path,
	user: state.auth.user,
	errors: state.auth.errors,
	subjects: state.subjects.subjects,
	filter: state.subjects.filter
});
export default connect(mapStateToProps, { ...authActions, ...subjectsActions })(Register);
