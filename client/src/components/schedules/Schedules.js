import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { actions as subjectsActions, getSubjects } from '../../reducers/subjects';
import { actions as calendarsActions } from '../../reducers/calendar';
import { Segment, Header, Icon, Label } from 'semantic-ui-react';

import { actions as schedulesActions } from '../../reducers/schedules';
import Schedule from './Schedule';
import SchedulesDocx from './SchedulesDocx';

class Schedules extends Component {
	componentDidMount() {
		const {
			subjects,
			calendars,
			uid,
			init,
			calendarsGet,
			schedulesGet,
			isAuthentificated,
			history,
			curWeek
		} = this.props;
		if (!isAuthentificated) {
			history.push('/login');
		}
		if (subjects.length === 0) {
			init();
		}
		if (calendars.length === 0) {
			calendarsGet();
		}
		schedulesGet(uid, moment(curWeek.ds), moment(curWeek.ds).add(7, 'd'));
	}
	setCurWeek = (n, ds) => {
		const { weekSet, schedulesGet, uid } = this.props;
		weekSet(n);
		schedulesGet(uid, moment(ds), moment(ds).add(7, 'd'));
	};
	saveToDocx = () => {
		const { schedules, curWeek } = this.props;
		SchedulesDocx(schedules, curWeek.ds);
	};
	schedulesHtml = () => {
		let ss = [],
			lds,
			c = 1;
		for (let i = 0; i < this.props.schedules.length; i++) {
			const x = this.props.schedules[i];
			const cds = moment(x.ts).format('MMM DD');
			if (cds !== lds) {
				ss.push(
					<Segment key={`schedhdr${i}`}>
						<Header as="h1">{cds}</Header>
					</Segment>
				);
				c = 1;
			}
			ss.push(<Schedule i={c} schedule={x} key={`sched${i}`} />);
			c++;
			lds = cds;
		}
		return ss;
	};
	schedulesDays = () => {
		const { curWeek, schedules } = this.props;
		let ss = [];
		let date = moment(curWeek.ds);
		for (let i = 0; i < 7; i++) {
			const items = schedules.filter((x) => x.ts.includes(date.format('YYYY-MM-DD')));
			if (items.length > 0)
				ss.push(<Schedule schedules={items} date={date.format('YYYY-MM-DD')} key={`sched${i}`} />);
			date.add(1, 'day');
		}

		return ss;
	};
	render() {
		const { weeks, curWeek } = this.props;
		const scheduleItems = this.schedulesDays();
		const weeknItems = weeks.map(({ n, ds }) => (
			<Label
				as="a"
				color={n === curWeek.n ? 'blue' : undefined}
				onClick={(e, s, d) => this.setCurWeek(n, ds)}
				key={`week${n}`}
				style={{ margin: '1px' }}
			>
				{moment(ds).format('MMM DD')}
			</Label>
		));
		return (
			<div className="dashboard">
				<Segment>
					{weeknItems}
					<Label attached="bottom right" as="a" onClick={this.saveToDocx} color="green">
						<Icon name="download" />
						docx
					</Label>
				</Segment>
				{scheduleItems}
			</div>
		);
	}
}
Schedules.propTypes = {
	uid: PropTypes.string.isRequired,
	schedules: PropTypes.array.isRequired,
	weeks: PropTypes.array.isRequired,
	curWeek: PropTypes.object.isRequired,
	calendars: PropTypes.array.isRequired,
	subjects: PropTypes.array.isRequired,

	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	uid: state.auth.user.id,
	schedules: state.schedules.schedules,
	calendars: state.calendar.calendars,
	subjects: getSubjects(state),

	weeks: state.calendar.weeks,
	curWeek: state.calendar.week,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, {
	...subjectsActions,
	...calendarsActions,
	...schedulesActions
})(Schedules);
