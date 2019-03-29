import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { getSubjectsByClass } from '../../reducers/subjects';
import { actions as subjectsActions } from '../../reducers/subjects';
import PropTypes from 'prop-types';

class SubjectsDropdown extends Component {
	setSubject = (e, { value }) => {
		const { setCurrent } = this.props;
		setCurrent(value);
	};
	render() {
		const { subjects, current, setSubject } = this.props;
		const options = subjects.map(({ name, id }) => ({ text: name, value: id, key: id }));
		return (
			<Form.Select
				label="Subject"
				options={options}
				placeholder="Subject"
				value={current}
				onChange={setSubject}
			/>
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
