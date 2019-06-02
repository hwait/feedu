import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class LessonsList extends Component {
	render() {
		const { lessons, setLesson, current } = this.props;

		const items = lessons.map(({ _id, nmb, name }) => {
			return (
				<List.Item
					as="a"
					active={current === _id}
					key={_id}
					onClick={(e, d) => setLesson(_id)}
				>{`№${nmb}: ${name}`}</List.Item>
			);
		});
		return (
			<List selection verticalAlign="middle" size="large">
				{items}
			</List>
		);
	}
}
LessonsList.propTypes = {
	lessons: PropTypes.array.isRequired,
	current: PropTypes.string.isRequired
};
export default LessonsList;
