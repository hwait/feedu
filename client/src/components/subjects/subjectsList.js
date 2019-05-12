import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import { actions as subjectsActions } from '../../reducers/subjects';
import PropTypes from 'prop-types';

class SubjectsList extends Component {
	render() {
		const { subjects, current, setSubject } = this.props;
		const items = subjects.map(({ id, name }) => {
			return (
				<List.Item active={id === current.id} key={id} onClick={(e, d) => setSubject(id)}>
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
	current: state.subjects.current
});
SubjectsList.propTypes = {
	subjects: PropTypes.array.isRequired,
	current: PropTypes.object.isRequired
};
export default connect(mapStateToProps, { ...subjectsActions })(SubjectsList);
