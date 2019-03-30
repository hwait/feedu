import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import { getSubjectsByClass } from '../../reducers/subjects';
import { actions as subjectsActions } from '../../reducers/subjects';
import PropTypes from 'prop-types';

class SubjectsDropdown extends Component {
	render() {
		const { subjects, current, setSubject } = this.props;
		const items = subjects.map(({ id, name }) => {
			return (
				<List.Item as="a" active={id === current} key={id} onClick={(e, d) => setSubject(id)}>
					{name}
				</List.Item>
			);
		});
		return (
			<List selection verticalAlign="middle">
				{items}
			</List>
		);
	}
}
const mapStateToProps = (state) => ({
	subjects: getSubjectsByClass(state),
	current: state.subjects.current
});
SubjectsDropdown.propTypes = {
	subjects: PropTypes.array.isRequired,
	current: PropTypes.string.isRequired
};
export default connect(mapStateToProps, { ...subjectsActions })(SubjectsDropdown);
