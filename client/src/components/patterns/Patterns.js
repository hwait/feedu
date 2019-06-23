import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Segment, Header, Select, Label, Button, List, Checkbox } from 'semantic-ui-react';
import { actions as subjectsActions, getSubjects } from '../../reducers/subjects';
import { actions as coursesActions, getCourses } from '../../reducers/courses';
import { actions as patternsActions, getCourseDays } from '../../reducers/patterns';
import { actions as schedulesActions } from '../../reducers/schedules';
import {
	actions as calendarsActions,
	getCalendarsByGroup,
	calendarDaysInWeeks,
	calendarsGroupsGet,
	getDatesSelected
} from '../../reducers/calendar';
import Pattern from './Pattern';
import isempty from '../../utils/isempty';
import moment from 'moment';

class Patterns extends Component {
	componentDidMount() {
		const { subjects, calendars, uid, init, calendarsGet, patternsGet, isAuthentificated, history } = this.props;

		if (subjects.length === 0) {
			init();
		}
		if (calendars.length === 0) {
			calendarsGet();
		}
		patternsGet(uid);
		if (!isAuthentificated) {
			history.push('/');
		}
	}
	componentDidUpdate() {
		const { errors, patternsGet, uid } = this.props;
		if (errors && errors.success) patternsGet(uid);
	}
	setSubject = (e, { value }) => {
		const { setCurrent, coursesGet } = this.props;
		setCurrent(value);
		coursesGet(value);
	};
	setCourse = (e, { value }) => {
		const { courseChoose } = this.props;
		courseChoose(value);
	};
	setDuration = (dur) => {
		this.props.patternDuration(dur);
	};
	setCurWeek = (n) => {
		this.props.weekSet(n);
	};
	toggleCalendar = (id) => {
		this.props.calendarToggle(id);
	};
	save = () => {
		const { patterns, patternsSave } = this.props;
		patternsSave(patterns);
	};
	generate = () => {
		const { patterns, schedulesGenerate } = this.props;
		schedulesGenerate(patterns);
	};
	addPattern = (value, date) => {
		const { curCourse, spread, uid, dur, patternAdd, dates } = this.props;
		const ts = moment(date).add(8, 'h').add(value * 20, 'm');
		const dd = spread
			? dates
					.filter((d) => moment(d).weekday() === ts.weekday())
					.map((x) => moment(x).add(8, 'h').add(value * 20, 'm').format())
			: [ ts.format() ];
		if (!isempty(curCourse))
			patternAdd({
				course: curCourse,
				student: uid,
				dates: dd,
				dur: dur * 20
			});
	};
	removePattern = (id) => {
		console.log('==========removePattern================');
		console.log(id);
		console.log('====================================');
		this.props.patternRemove(id);
		// if (id) this.props.patternRemove({ weekday, ts: value, id });
		// else this.props.patternRemoveImmediate({ weekday, ts: value });
	};
	removePatternDate = (value, date, course, id) => {
		const { spread, uid, patternDateRemove, patternRemoveImmediate, patternRemove } = this.props;
		if (spread) {
			if (id) patternRemove({ cid: course._id, uid, id });
			else patternRemoveImmediate({ cid: course._id, uid });
		} else {
			const ts = moment(date).add(8, 'h').add(value * 20, 'm');
			patternDateRemove({
				course,
				student: uid,
				dates: [ ts.format() ]
			});
		}
	};
	calendarsGet = (e, { value }) => {
		const { calendarsGroupsGet } = this.props;
		calendarsGroupsGet(value);
		//weekSet(1);
		//if (patterns.length === 0) patternsGet(uid);
		//calendarGet(value);
	};
	renderWeekDays = () => {
		const wd = this.props.weekdays.map((x, index) => (
			<Label key={`wdlbl${index}`} color={x > 0 ? 'blue' : 'red'} size="large">
				{x}
			</Label>
		));
		return wd;
	};
	renderTables = () => {
		const { curWeek } = this.props;
		const wd = [];
		for (let i = 0; i < 7; i++) {
			wd.push(
				<Pattern
					key={`patt${i}`}
					date={moment(curWeek.ds).add(i, 'd')}
					addPattern={this.addPattern}
					removePattern={this.removePatternDate}
				/>
			);
		}
		return wd;
	};
	render() {
		const {
			subjects,
			curSubject,
			curCourse,
			courses,
			calendars,
			weeks,
			curWeek,
			spread,
			spreadToggle,
			groups,
			group,
			loading,
			dur,
			days
		} = this.props;
		const calendarItems = calendars.map(({ _id, name, selected }) => (
			<List.Item key={_id}>
				<Checkbox label={name} checked={selected ? true : false} onClick={(e, s) => this.toggleCalendar(_id)} />
			</List.Item>
		));
		const weeknItems = weeks.map(({ n, ds }) => (
			<Label
				as="a"
				color={n === curWeek.n ? 'blue' : undefined}
				onClick={(e, s) => this.setCurWeek(n)}
				key={`week${n}`}
				style={{ margin: '1px' }}
			>
				{moment(ds).format('MMM DD')}
			</Label>
		));
		const wd = this.renderWeekDays();
		const patt = this.renderTables();
		return (
			<div className="dashboard">
				<Segment.Group>
					<Segment.Group horizontal>
						<Segment>
							<Select
								label="Groups"
								options={groups}
								placeholder="Groups"
								value={group}
								onChange={this.calendarsGet}
							/>
						</Segment>
						<Segment>
							<List> {calendarItems}</List>
						</Segment>
						<Segment>
							{wd}
							<Label size="large" className="left-spaced">
								Total:
								<Label.Detail>{days}</Label.Detail>
							</Label>
						</Segment>
					</Segment.Group>
					<Segment>
						<Select
							label="Subjects"
							options={subjects}
							placeholder="Subjects"
							value={isempty(curSubject) ? null : curSubject.id}
							onChange={this.setSubject}
						/>
						<Select
							label="Courses"
							options={courses}
							placeholder="Courses"
							value={isempty(curCourse) ? null : curCourse._id}
							onChange={this.setCourse}
							className="left-spaced"
						/>
						<Checkbox
							checked={spread}
							label="Spread"
							toggle
							className="left-spaced"
							onClick={spreadToggle}
						/>
						<Menu compact className="left-spaced">
							<Menu.Item active={dur === 2} color="blue" onClick={(e, s, c) => this.setDuration(2)}>
								40 min
							</Menu.Item>
							<Menu.Item active={dur === 3} color="blue" onClick={(e, s, c) => this.setDuration(3)}>
								1 hour
							</Menu.Item>
							<Menu.Item active={dur === 4} color="blue" onClick={(e, s, c) => this.setDuration(4)}>
								1 h 20 min
							</Menu.Item>
						</Menu>
						<Button
							content="Save"
							icon="save"
							labelPosition="left"
							onClick={this.save}
							positive
							className="left-spaced"
						/>
						<Button
							content="Sched"
							icon="calendar"
							labelPosition="left"
							onClick={this.generate}
							color="blue"
							className="left-spaced"
						/>
					</Segment>
					<Segment>{weeknItems}</Segment>
					{curWeek ? (
						<Segment.Group horizontal compact>
							{patt}
						</Segment.Group>
					) : (
						<Segment placeholder textAlign="center" loading={loading}>
							<Header as="h1" disabled>
								Course Patterns
							</Header>
						</Segment>
					)}
				</Segment.Group>
			</div>
		);
	}
}
Patterns.propTypes = {
	uid: PropTypes.string.isRequired,
	spread: PropTypes.bool.isRequired,
	group: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
	patterns: PropTypes.array.isRequired,
	calendar: PropTypes.object.isRequired,
	calendars: PropTypes.array.isRequired,
	weeks: PropTypes.array.isRequired,
	groups: PropTypes.array.isRequired,
	subjects: PropTypes.array.isRequired,
	dates: PropTypes.array.isRequired,
	courses: PropTypes.array.isRequired,
	curSubject: PropTypes.object.isRequired,
	curCourse: PropTypes.object.isRequired,
	curWeek: PropTypes.object.isRequired,
	dur: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	uid: state.auth.user.id,
	errors: state.patterns.errors,
	patterns: state.patterns.patterns,
	calendar: state.calendar.calendar,
	weeks: state.calendar.weeks,
	curWeek: state.calendar.week,
	calendars: getCalendarsByGroup(state),
	groups: calendarsGroupsGet(state),
	group: state.calendar.group,
	spread: state.patterns.spread,
	days: getCourseDays(state),
	dates: getDatesSelected(state),
	weekdays: calendarDaysInWeeks(state),
	subjects: getSubjects(state),
	courses: getCourses(state),
	curSubject: state.subjects.current,
	curCourse: state.courses.course,
	dur: state.patterns.dur,
	loading: state.patterns.loading,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, {
	...subjectsActions,
	...coursesActions,
	...patternsActions,
	...calendarsActions,
	...schedulesActions
})(Patterns);
