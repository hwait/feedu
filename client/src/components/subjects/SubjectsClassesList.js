import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment, Select, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import isempty from '../../utils/isempty';
class SubjectsClassesDropdown extends Component {
	subjectChoose = (e, { value }) => {
		const { setSubject } = this.props;
		setSubject(value);
	};
	choose = (sid, cn) => {
		const { setSubjectClass } = this.props;
		setSubjectClass(sid, cn);
	};
	classitems = (sid, cls, cle) => {
		const { filter, current } = this.props;
		const curid = isempty(current) ? null : current.id;
		const classes = Array.from(Array(cle + 1).keys()).slice(cls);
		return classes.map((x) => (
			<Menu.Item
				active={curid === sid && filter === x}
				color="red"
				key={`${sid}${x}`}
				onClick={(e, s, c) => this.choose(sid, x)}
			>
				{x}
			</Menu.Item>
		));
	};

	render() {
		const { subjects, current, save, days } = this.props;
		const sitems = subjects.map(({ id, name }) => ({ key: id, text: name, value: id }));
		const items = isempty(current) ? null : (
			<Menu compact className="left-spaced">
				{this.classitems(current.id, current.cf, current.ct)}
			</Menu>
		);
		return (
			<Segment>
				<Select
					label="Subjects"
					options={sitems}
					placeholder="Subjects"
					value={isempty(current) ? null : current.id}
					onChange={this.subjectChoose}
				/>
				{items}
				<Label size="large" className="left-spaced">
					Total:
					<Label.Detail>{days}</Label.Detail>
				</Label>
				<Button
					content="Save"
					icon="save"
					labelPosition="left"
					onClick={save}
					positive
					className="left-spaced"
				/>
			</Segment>
		);
	}
}
const mapStateToProps = (state) => ({
	filter: state.subjects.filter,
	current: state.subjects.current
});
SubjectsClassesDropdown.propTypes = {
	save: PropTypes.func.isRequired,
	days: PropTypes.number.isRequired,
	filter: PropTypes.number.isRequired,
	subjects: PropTypes.array.isRequired,
	current: PropTypes.object.isRequired
};
export default connect(mapStateToProps, null)(SubjectsClassesDropdown);
