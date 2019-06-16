import React, { Component } from 'react';
import { List, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class LessonsList extends Component {
	render() {
		const { lessons, setLesson, incLesson, current } = this.props;

		const items = lessons.map(({ _id, nmb, name }) => {
			return (
				<List.Item active={current === _id} key={_id}>
					<Icon name="resize vertical" onClick={(e, d) => incLesson(nmb)} color="teal" />
					<List.Content>
						<List.Description onClick={(e, d) => setLesson(_id)}>{`№${nmb}: ${name}`}</List.Description>
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
LessonsList.propTypes = {
	lessons: PropTypes.array.isRequired,
	current: PropTypes.string.isRequired
};
export default LessonsList;
