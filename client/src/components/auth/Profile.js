import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as authActions } from '../../reducers/auth';
import { actions as subjectsActions } from '../../reducers/subjects';
import ProfileForm from './ProfileForm';

class Profile extends Component {
	componentDidMount() {
		if (this.props.subjects.length === 0) {
			this.props.init();
		}
	}
	componentDidUpdate() {
		if (this.props.path === 'home') {
			this.props.history.push('/');
		}
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
		this.props.save(this.props.user);
	};

	setRole = (e, { value }) => {
		this.props.fc('role', value);
	};

	/**
	|--------------------------------------------------
	| // TODO: protected call 
	| // TODO: Message about successfull signup on the Login page
	|--------------------------------------------------
	*/
	render() {
		const { errors, user } = this.props;
		return (
			<ProfileForm
				butname="Save"
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
Profile.propTypes = {
	fc: PropTypes.func.isRequired,
	save: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { ...authActions, ...subjectsActions })(Profile);
