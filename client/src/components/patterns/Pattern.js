import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Menu, Segment, Label, Table } from 'semantic-ui-react';
import { actions as subjectsActions, getSubjectsByUser } from '../../reducers/subjects';
import { actions as patternsActions } from '../../reducers/patterns';
import { actions as calendarsActions, calendarsGet } from '../../reducers/calendar';
import SubjectsClassesList from '../subjects/SubjectsClassesList';
import calendar from '../../reducers/calendar';
import isempty from '../../utils/isempty';
class Pattern extends Component {
	setCurrentPattern = (value) => {
		console.log('============setCurrentPattern=================');
		console.log(value);
		console.log('====================================');
	};
	addPattern = (value) => {
		let ts = moment('0800', 'Hmm');
		ts.add(20 * value, 'm');
		console.log('============addPattern=================');
		console.log(value, ts.format('HHmm'));
		console.log('====================================');
	};
	removePattern = (value) => {
		let ts = moment('0800', 'Hmm');
		ts.add(20 * value, 'm');
		console.log('============removePattern=================');
		console.log(value, ts.format('HHmm'));
		console.log('====================================');
	};
	getGrid = () => {
		const scheduled = [
			{
				student: '',
				calendar: '',
				subject: '',
				weekday: 0,
				ts: 14,
				duration: 3,
				color: '#992555',
				name: 'Математика-6'
			},
			{
				student: '',
				calendar: '',
				subject: '',
				weekday: 0,
				ts: 18,
				duration: 2,
				color: '#656588',
				name: 'Химия-8'
			},
			{
				student: '',
				calendar: '',
				subject: '',
				weekday: 0,
				ts: 41,
				duration: 3,
				color: '#656588',
				name: 'Химия-8'
			}
		];
		let ts = moment('0800', 'Hmm');
		let bgc = '',
			pref = '',
			max = 0,
			cell = null;
		const tt = [];
		for (let i = 0; i <= 41; i++) {
			if (i % 3 === 0) {
				pref = pref === 'odd' ? 'even' : 'odd';
			}
			const cln = `c${i % 3}-${pref}`;
			const x = scheduled.find((x) => x.ts === i);
			let cell = <Table.Cell className={cln} onClick={(e, t) => this.addPattern(i)} />;
			if (!isempty(x)) {
				console.log(i, 'start rowspan');
				cell = (
					<Table.Cell rowSpan={x.duration} style={{ backgroundColor: x.color, color: '#FFF' }}>
						{x.name}
						<Label
							size="mini"
							as="a"
							color="red"
							className="left-spaced"
							onClick={(e, t) => this.removePattern(i)}
						>
							X
						</Label>
					</Table.Cell>
				);
				max = x.ts + x.duration;
				x = {};
			} else if (i < max) {
				cell = null;
			} else if (i === max) {
				max = 0;
			}
			tt.push(
				<Table.Row key={`a${i}`} style={{ height: '5px' }}>
					{i % 3 === 0 && (
						<Table.Cell collapsing rowSpan={3} className={cln}>
							{ts.format('HH')}
						</Table.Cell>
					)}
					{cell}
				</Table.Row>
			);

			ts.add(20, 'm');
		}
		return tt;
	};
	render() {
		//const { curSubject, subjects, calendars, calendar, loading, setCurrent } = this.props;
		const tt = this.getGrid();
		return (
			<Segment>
				<Table celled padded compact="very" size="small">
					<Table.Body>{tt}</Table.Body>
				</Table>
			</Segment>
		);
	}
}
Pattern.propTypes = {
	subjects: PropTypes.array.isRequired,
	calendars: PropTypes.array.isRequired,
	curSubject: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.patterns.errors,
	calendar: state.calendar.calendar,
	calendars: calendarsGet(state),
	subjects: getSubjectsByUser(state),
	curSubject: state.subjects.current,
	loading: state.patterns.loading,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, {
	...subjectsActions,
	...patternsActions,
	...calendarsActions
})(Pattern);
