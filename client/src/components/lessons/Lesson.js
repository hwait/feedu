import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Header, Checkbox } from 'semantic-ui-react';
import { actions as lessonsActions, getCurrentLesson } from '../../reducers/lessons';
import { getSubjectName } from '../../reducers/subjects';

class Lesson extends Component {
	render() {
		const { subject, toggleExtended } = this.props;
		const { classn, isextended, _id, name, nmb, videos, papers, tasks } = this.props.lesson;

		return (
			<div className="dashboard">
				<Segment.Group horizontal>
					<Segment>
						<Header as="h2">{`${subject} ${classn} класс.`}.</Header>
					</Segment>
					<Segment>
						<Checkbox toggle checked={isextended} onChange={toggleExtended} />
					</Segment>
				</Segment.Group>
			</div>
		);
	}
}
Lesson.propTypes = {
	subject: PropTypes.string.isRequired,
	lesson: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.lessons.errors,
	lesson: getCurrentLesson(state),
	subject: getSubjectName(state)
});
export default connect(mapStateToProps, { ...lessonsActions })(Lesson);
