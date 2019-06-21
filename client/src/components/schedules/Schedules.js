import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Segment, Header, Select, Label, Button, List, Checkbox } from 'semantic-ui-react';

import { actions as schedulesActions } from '../../reducers/schedules';

class Schedules extends Component {
	render() {
		return (
			<div className="dashboard">
				<Header as="h1" disabled>
					Schedules
				</Header>
			</div>
		);
	}
}
Schedules.propTypes = {
	uid: PropTypes.string.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	uid: state.auth.user.id,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, {
	...schedulesActions
})(Schedules);
