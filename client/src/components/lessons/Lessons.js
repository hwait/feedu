import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Segment, Header } from 'semantic-ui-react';
import getClasses from '../../utils/getClasses';
import { actions as subjectsActions } from '../../reducers/subjects';
import { actions as lessonsActions } from '../../reducers/lessons';
import { actions as booksActions } from '../../reducers/books';
import SubjectsList from '../subjects/subjectsList';
import LessonsList from './LessonsList';

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
	getSubjects = (value) => {
		this.props.setFilter(value);
	};
	setLesson = (value) => {
		this.props.lessonSetCurrent(value);
		this.props.history.push('/lesson');
	};
	setSubject = (value) => {
		const { filter, lessonsGet, booksGet } = this.props;
		lessonsGet(filter, value);
		booksGet(filter, value);
	};
	render() {
		const { curSubject, filter, loading } = this.props;
		const classitems = classes.map(({ text, value }) => (
			<Menu.Item active={filter === value} color="red" key={value} onClick={(e, d) => this.getSubjects(value)}>
				{text}
			</Menu.Item>
		));
		return (
			<div className="dashboard">
				<Segment.Group horizontal>
					<Menu compact vertical>
						{classitems}
					</Menu>
					<Segment placeholder={filter === 0} textAlign={filter === 0 ? 'center' : 'left'}>
						{filter > 0 ? (
							<SubjectsList setSubject={this.setSubject} />
						) : (
							<Header as="h1" disabled>
								Subjects
							</Header>
						)}
					</Segment>
					<Segment
						placeholder={curSubject === ''}
						textAlign={curSubject ? 'left' : 'center'}
						loading={loading}
					>
						{curSubject ? (
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
	filter: PropTypes.number.isRequired,
	subjects: PropTypes.array.isRequired,
	curSubject: PropTypes.string.isRequired,
	curLesson: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.lessons.errors,
	subjects: state.subjects.subjects,
	filter: state.subjects.filter,
	curSubject: state.subjects.current,
	curLesson: state.lessons.current,
	loading: state.lessons.loading,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, { ...subjectsActions, ...lessonsActions, booksGet: booksActions.booksGet })(
	Lessons
);
