import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class LessonsList extends Component {
	render() {
		const { lessons, setLesson } = this.props;
		const buttons = lessons.map((x) => {
			return <Form.Button key={x.id} label={`№${x.nmb}: ${x.name}`} onChange={(e, d) => setLesson(x.id)} />;
		});
		return buttons;
	}
}
const mapStateToProps = (state) => ({
	lessons: state.lessons.lessons
});
LessonsList.propTypes = {
	lessons: PropTypes.array.isRequired
};
export default connect(mapStateToProps, null)(LessonsList);
