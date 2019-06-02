import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';
import { actions as subjectsActions } from '../../reducers/subjects';
import { actions as coursesActions, getCoursesBySubject } from '../../reducers/courses';
import { actions as lessonsActions } from '../../reducers/lessons';
import { actions as booksActions } from '../../reducers/books';
import { getSubjects } from '../../reducers/subjects';
import SubjectsList from '../subjects/SubjectsList';
import CoursesList from '../courses/CoursesList';
import LessonsList from './LessonsList';
import isempty from '../../utils/isempty';

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
		const { setCurrent, coursesGet } = this.props;
		setCurrent(value);
		coursesGet(value);
	};
	setCourse = (value) => {
		const { lessonsGet, booksGet, curSubject, courseChoose } = this.props;
		courseChoose(value);
		lessonsGet(value);
		booksGet(curSubject.id);
	};
	render() {
		const { curSubject, courses, curCourse, lessons, curLesson, subjects, loading } = this.props;
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
							<CoursesList setCourse={this.setCourse} current={curCourse} courses={courses} />
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
							<LessonsList setLesson={this.setLesson} current={curLesson} lessons={lessons} />
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
	courses: PropTypes.array.isRequired,
	lessons: PropTypes.array.isRequired,
	curSubject: PropTypes.object.isRequired,
	curCourse: PropTypes.object.isRequired,
	curLesson: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.lessons.errors,
	subjects: getSubjects(state),
	curSubject: state.subjects.current,
	courses: state.courses.courses,
	lessons: state.lessons.lessons,
	curCourse: state.courses.course,
	curLesson: state.lessons.current,
	loading: state.lessons.loading,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, {
	...subjectsActions,
	...lessonsActions,
	...coursesActions,
	booksGet: booksActions.booksGet
})(Lessons);
