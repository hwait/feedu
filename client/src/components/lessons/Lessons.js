import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Header, Label, Icon } from 'semantic-ui-react';
import { actions as subjectsActions } from '../../reducers/subjects';
import { actions as coursesActions } from '../../reducers/courses';
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
	componentDidUpdate() {
		const { errors, curCourse } = this.props;
		if (errors && errors.success) this.setCourse(curCourse._id);
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
	addLesson = () => {
		this.props.lessonNew();
		this.props.history.push('/lesson');
	};
	incLesson = (value) => {
		console.log('incLesson', value);
		const { lessonsInc, curCourse } = this.props;
		lessonsInc({ cid: curCourse._id, nstart: value });
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
						placeholder={!curCourse._id}
						textAlign={curCourse._id ? 'left' : 'center'}
						loading={loading}
					>
						{curCourse._id ? (
							[
								<LessonsList
									key="key1"
									setLesson={this.setLesson}
									incLesson={this.incLesson}
									current={curLesson}
									lessons={lessons}
								/>,
								<Label as="a" attached="top right" onClick={this.addLesson} color="blue" key="key2">
									<Icon name="add" />
								</Label>
							]
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
