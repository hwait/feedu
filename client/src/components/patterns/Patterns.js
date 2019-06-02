import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Segment, Header, Select, Label, Button, Table } from 'semantic-ui-react';
import { actions as subjectsActions, getSubjects } from '../../reducers/subjects';
import { actions as coursesActions, getCourses } from '../../reducers/courses';
import { actions as patternsActions, getCourseDays } from '../../reducers/patterns';
import { actions as calendarsActions, calendarsGet, calendarDaysInWeeks } from '../../reducers/calendar';
import CoursesList from '../courses/CoursesList';
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
	save = () => {
		const { patterns, patternsSave } = this.props;
		patternsSave(patterns);
	};
	addPattern = (value, weekday) => {
		const { curCourse, calendar, weekdays, uid, dur, patternAdd } = this.props;
		if (!isempty(curCourse))
			patternAdd({
				course: curCourse._id,
				calendar: calendar._id,
				student: uid,
				weekday,
				ts: value,
				dur,
				days: weekdays[weekday]
			});
	};
	removePattern = (value, weekday, id) => {
		if (id) this.props.patternRemove({ weekday, ts: value, id });
		else this.props.patternRemoveImmediate({ weekday, ts: value });
	};
	calendarGet = (e, { value }) => {
		this.props.calendarGet(value);
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
		const { weekdays, calendar } = this.props;
		const wn = moment.weekdays(true);
		const wd = weekdays.map(
			(x, index) =>
				x > 0 ? (
					<Pattern
						key={`patt${index}`}
						weekday={index}
						calendar={calendar ? calendar._id : null}
						addPattern={this.addPattern}
						removePattern={this.removePattern}
						name={wn[index]}
					/>
				) : null
		);
		return wd;
	};
	render() {
		const {
			subjects,
			curSubject,
			curCourse,
			courses,
			calendars,
			calendar,
			loading,
			courseChoose,
			dur,
			days
		} = this.props;
		const subjItems = subjects.map(({ id, name }) => ({ key: id, text: name, value: id }));
		const wd = this.renderWeekDays();
		const patt = this.renderTables();
		return (
			<div className="dashboard">
				<Segment.Group>
					<Segment>
						<Select
							label="Calendars"
							options={calendars}
							placeholder="Calendars"
							value={calendar ? calendar._id : null}
							onChange={this.calendarGet}
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
							<Menu.Item active={dur === 5} color="blue" onClick={(e, s, c) => this.setDuration(5)}>
								1 h 40 min
							</Menu.Item>
							<Menu.Item active={dur === 6} color="blue" onClick={(e, s, c) => this.setDuration(6)}>
								2 hours
							</Menu.Item>
						</Menu>
						{wd}
					</Segment>
					<Segment>
						<Select
							label="Subjects"
							options={subjItems}
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
						<Label size="large" className="left-spaced">
							Total:
							<Label.Detail>{days}</Label.Detail>
						</Label>
						<Button
							content="Save"
							icon="save"
							labelPosition="left"
							onClick={this.save}
							positive
							className="left-spaced"
						/>
					</Segment>

					{calendar._id ? (
						<Segment.Group horizontal compact>
							<Table celled compact="very">
								<Table.Body>
									<Table.Row>{patt}</Table.Row>
								</Table.Body>
							</Table>
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
	errors: PropTypes.object.isRequired,
	patterns: PropTypes.array.isRequired,
	calendar: PropTypes.object.isRequired,
	calendars: PropTypes.array.isRequired,
	subjects: PropTypes.array.isRequired,
	courses: PropTypes.array.isRequired,
	curSubject: PropTypes.object.isRequired,
	curCourse: PropTypes.object.isRequired,
	dur: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	uid: state.auth.user.id,
	errors: state.patterns.errors,
	patterns: state.patterns.patterns,
	calendar: state.calendar.calendar,
	calendars: calendarsGet(state),
	days: getCourseDays(state),
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
	...calendarsActions
})(Patterns);
