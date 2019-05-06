import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SubjectsClassesList extends Component {
	choose = (sid, cn) => {
		const { setSubjectClass } = this.props;
		setSubjectClass(sid, cn);
	};

	classitems = (sid, cls, cle) => {
		const { filter, current } = this.props;
		const classes = Array.from(Array(cle + 1).keys()).slice(cls);
		return classes.map((x) => (
			<Menu.Item
				active={current === sid && filter === x}
				color="red"
				key={`${sid}${x}`}
				onClick={(e, s, c) => this.choose(sid, x)}
			>
				{x}
			</Menu.Item>
		));
	};

	render() {
		const { subjects, current } = this.props;
		const items = subjects.map(({ id, name, cf, ct }) => {
			return (
				<List.Item active={id === current} key={id}>
					<b>{name}</b>
					<List.Content floated="right">
						<Menu compact>{this.classitems(id, cf, ct)}</Menu>
					</List.Content>
				</List.Item>
			);
		});
		return (
			<List divided selection verticalAlign="middle" size="large">
				{items}
			</List>
		);
	}
}
const mapStateToProps = (state) => ({
	filter: state.subjects.filter,
	current: state.subjects.current
});
SubjectsClassesList.propTypes = {
	filter: PropTypes.number.isRequired,
	subjects: PropTypes.array.isRequired,
	current: PropTypes.string.isRequired
};
export default connect(mapStateToProps, null)(SubjectsClassesList);
