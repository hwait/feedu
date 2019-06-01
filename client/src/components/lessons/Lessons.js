import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Segment, Header } from 'semantic-ui-react';
import getClasses from '../../utils/getClasses';
import { actions as subjectsActions } from '../../reducers/subjects';
import { actions as lessonsActions } from '../../reducers/lessons';
import { actions as booksActions } from '../../reducers/books';
import { getSubjectsByClass } from '../../reducers/subjects';
import SubjectsList from '../subjects/SubjectsList';
import CoursesList from '../courses/CoursesList';
import LessonsList from './LessonsList';
import isempty from '../../utils/isempty';
const classes = getClasses();

class Lessons extends Component {
	componentDidMount() {
		if (this.props.subjects.length === 0) {
			this.props.init();
		}
		if (!this.props.isAuthentificated) {
			this.props.history.push('/');
		}
	}

	setLesson = (value) => {
		this.props.lessonSetCurrent(value);
		this.props.history.push('/lesson');
	};
	setSubject = (value) => {
		const { setCurrent } = this.props;
		setCurrent(value);
	};
	setCourse = (value) => {
		const { lessonsGet, booksGet } = this.props;
		lessonsGet(value);
		booksGet(value);
	};
	render() {
		const { curSubject, curCourse, subjects, loading } = this.props;

		return (
			<div className="dashboard">
				<Segment.Group horizontal>
					<Segment textAlign="left">
						<SubjectsList setSubject={this.setSubject} subjects={subjects} />
					</Segment>
					<Segment
						placeholder={isempty(curSubject)}
						textAlign={!isempty(curSubject) ? 'left' : 'center'}
						loading={loading}
					>
						{!isempty(curSubject) ? (
							<CoursesList setCourse={this.setCourse} />
						) : (
							<Header as="h1" disabled>
								Courses
							</Header>
						)}
					</Segment>
					<Segment
						placeholder={isempty(curCourse)}
						textAlign={!isempty(curCourse) ? 'left' : 'center'}
						loading={loading}
					>
						{!isempty(curCourse) ? (
							<LessonsList setLesson={this.setLesson} />
						) : (
							<Header as="h1" disabled>
								Lessons
							</Header>
						)}
					</Segment>
				</Segment.Group>
			</div>
		);
	}
}
Lessons.propTypes = {
	subjects: PropTypes.array.isRequired,
	curSubject: PropTypes.object.isRequired,
	curCourse: PropTypes.object.isRequired,
	curLesson: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.lessons.errors,
	subjects: getSubjectsByClass(state),
	curSubject: state.subjects.current,
	curCourse: state.course.course,
	curLesson: state.lessons.current,
	loading: state.lessons.loading,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, { ...subjectsActions, ...lessonsActions, booksGet: booksActions.booksGet })(
	Lessons
);
