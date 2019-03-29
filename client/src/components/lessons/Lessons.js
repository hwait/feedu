import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Segment } from 'semantic-ui-react';
import getClasses from '../../utils/getClasses';
import { actions as subjectsActions } from '../../reducers/subjects';
import { actions as lessonsActions } from '../../reducers/lessons';
import SubjectsDropdown from '../subjects/subjectsDropdown';
import LessonsList from './LessonsList';

const classes = getClasses();

class Lessons extends Component {
	componentDidMount() {
		if (this.props.subjects.length === 0) {
			this.props.init();
		}
		if (this.props.isAuthenticated) {
			this.props.changePath('dashboard');
			this.props.history.push('/dashboard');
		}
	}
	componentDidUpdate() {
		if (this.props.path === 'dashboard') {
			this.props.history.push('/dashboard');
		}
	}
	getSubjects = (e, { value }) => {
		this.props.setFilter(value);
	};
	setLesson = (value) => {
		console.log('==============setLesson================');
		console.log(value);
		console.log('====================================');
		//this.props.setFilter(value);
	};
	setSubject = (e, { value }) => {
		const { filter, getLessons } = this.props;
		console.log('==============setSubject================');
		console.log(filter, value);
		console.log('====================================');
		getLessons(filter, value);
	};
	render() {
		const { errors, filter } = this.props;
		return (
			<div className="dark-overlay landing-inner">
				<Segment placeholder className="work-container">
					<Form error={Object.keys(errors).length > 0}>
						<Form.Group>
							<Form.Select
								label="Class"
								options={classes}
								placeholder="Class"
								value={filter}
								onChange={this.getSubjects}
							/>
							<SubjectsDropdown setSubject={this.setSubject} />
						</Form.Group>
						<LessonsList setLesson={this.setLesson} />
					</Form>
				</Segment>
			</div>
		);
	}
}
Lessons.propTypes = {
	filter: PropTypes.number.isRequired,
	subjects: PropTypes.array.isRequired,
	//current: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.auth.errors,
	subjects: state.subjects.subjects,
	filter: state.subjects.filter
	//current: state.subjects.current
});
export default connect(mapStateToProps, { ...subjectsActions, ...lessonsActions })(Lessons);
