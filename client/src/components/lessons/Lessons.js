import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Segment, Header } from 'semantic-ui-react';
import getClasses from '../../utils/getClasses';
import { actions as subjectsActions } from '../../reducers/subjects';
import { actions as lessonsActions } from '../../reducers/lessons';
import SubjectsList from '../subjects/subjectsList';
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
	getSubjects = (value) => {
		this.props.setFilter(value);
	};
	setLesson = (value) => {
		console.log('==============setLesson================');
		console.log(value);
		console.log('====================================');
		//this.props.setFilter(value);
	};
	setSubject = (value) => {
		const { filter, getLessons } = this.props;

		getLessons(filter, value);
	};
	render() {
		const { current, filter, loading } = this.props;
		const classitems = classes.map(({ text, value }) => (
			<Menu.Item active={filter === value} color="blue" key={value} onClick={(e, d) => this.getSubjects(value)}>
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
					<Segment placeholder={current === ''} textAlign={current ? 'left' : 'center'} loading={loading}>
						{current ? (
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
	current: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.auth.errors,
	subjects: state.subjects.subjects,
	filter: state.subjects.filter,
	current: state.subjects.current,
	loading: state.lessons.loading
});
export default connect(mapStateToProps, { ...subjectsActions, ...lessonsActions })(Lessons);
