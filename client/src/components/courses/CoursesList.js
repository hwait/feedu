import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import { actions as coursesActions } from '../../reducers/courses';
import PropTypes from 'prop-types';

class CoursesList extends Component {
	render() {
		const { courses, current, setCourse } = this.props;
		const items = courses.map(({ id, name }) => {
			return (
				<List.Item active={id === current.id} key={id} onClick={(e, d) => setCourse(id)}>
					{name}
				</List.Item>
			);
		});
		return (
			<List selection verticalAlign="middle" size="large">
				{items}
			</List>
		);
	}
}
const mapStateToProps = (state) => ({
	current: state.courses.current
});
CoursesList.propTypes = {
	courses: PropTypes.array.isRequired,
	current: PropTypes.object.isRequired
};
export default connect(mapStateToProps, { ...coursesActions })(CoursesList);
