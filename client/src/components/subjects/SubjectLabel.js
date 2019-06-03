import React, { Component } from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SubjectLabel extends Component {
	render() {
		const { color, name, icon } = this.props.subject;

		return (
			<Label size="big" style={{ color: 'white', background: `#${color}`, whiteSpace: 'nowrap' }}>
				<Icon className={`sf-icon-${icon}`} size="large" />
				<Label.Detail className="menu-item">{name}</Label.Detail>
			</Label>
		);
	}
}
SubjectLabel.propTypes = {
	subject: PropTypes.object.isRequired
};
export default SubjectLabel;
