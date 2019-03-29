import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Grid, Checkbox } from 'semantic-ui-react';
import { getSubjectsByClassByUser } from '../../reducers/subjects';
import { actions as authActions } from '../../reducers/auth';
import PropTypes from 'prop-types';

class SubjectsCheckboxes extends Component {
	setSubject = (e, value) => {
		const { subjects, changeSubjects } = this.props;
		changeSubjects(subjects.map((x) => x.id), value.checked);
	};
	render() {
		const { subjects, changeSubject } = this.props;
		const checkboxes = subjects.map((x) => {
			return (
				<Form.Group key={x.id} inline style={{ height: '16px' }}>
					<Form.Field
						key={x.id}
						control={Checkbox}
						label={x.name}
						onChange={(e, d) => changeSubject(x.id)}
						checked={x.checked}
					/>
				</Form.Group>
			);
		});
		return (
			<Grid.Column textAlign="left">
				<Form.Group inline style={{ height: '16px' }}>
					<Form.Field control={Checkbox} onChange={this.setSubject} />
				</Form.Group>
				{checkboxes}
			</Grid.Column>
		);
	}
}
const mapStateToProps = (state) => ({
	subjects: getSubjectsByClassByUser(state)
});
SubjectsCheckboxes.propTypes = {
	subjects: PropTypes.array.isRequired
};
export default connect(mapStateToProps, { ...authActions })(SubjectsCheckboxes);
