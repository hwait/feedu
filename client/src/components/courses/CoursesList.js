import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class CoursesList extends Component {
	render() {
		const { courses, current, setCourse } = this.props;
		const items = courses.map(({ _id, name }) => {
			return (
				<List.Item active={_id === current._id} key={_id} onClick={(e, d) => setCourse(_id)}>
					<List.Content>
						<List.Description>{name}</List.Description>
					</List.Content>
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
CoursesList.propTypes = {
	courses: PropTypes.array.isRequired,
	current: PropTypes.object.isRequired
};
export default CoursesList;
