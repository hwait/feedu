import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Segment, Header, Select, Label } from 'semantic-ui-react';
import { actions as subjectsActions, getSubjectsByUser } from '../../reducers/subjects';
import { actions as patternsActions } from '../../reducers/patterns';
import { actions as calendarsActions, calendarsGet, calendarDaysInWeeks } from '../../reducers/calendar';
import SubjectsClassesList from '../subjects/SubjectsClassesList';
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
	getSubjects = (value) => {
		this.props.setFilter(value);
	};
	setSubjectClass = (sid, cn) => {
		const { setFilter, setCurrent } = this.props;
		setFilter(cn);
		setCurrent(sid);
	};
	setDuration = (dur) => {
		this.props.patternDuration(dur);
	};
	save = () => {
		const { patterns, patternsSave } = this.props;
		console.log('===========save====================');
		console.log(patterns);
		console.log('====================================');
		patternsSave(patterns);
	};
	addPattern = (value, weekday) => {
		const { curSubject, calendar, classn, uid, dur, patternAdd } = this.props;
		if (!isempty(curSubject) && classn > 0)
			patternAdd({
				subject: curSubject.id,
				calendar: calendar._id,
				cn: classn,
				student: uid,
				weekday,
				ts: value,
				dur
			});
	};
	removePattern = (value, weekday, id) => {
		console.log('==========removePattern===============');
		console.log(value, weekday, id);
		console.log('====================================');
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
		const { subjects, calendars, calendar, loading, setCurrent, dur } = this.props;
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

					<SubjectsClassesList
						setSubjectClass={this.setSubjectClass}
						save={this.save}
						setSubject={setCurrent}
						subjects={subjects}
					/>

					{calendar._id ? (
						<Segment.Group horizontal>{patt}</Segment.Group>
					) : (
						<Segment placeholder textAlign="center" loading={loading}>
							<Header as="h1" disabled>
								Books curSubject
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
	subjects: PropTypes.array.isRequired,
	patterns: PropTypes.array.isRequired,
	calendars: PropTypes.array.isRequired,
	calendar: PropTypes.object.isRequired,
	curSubject: PropTypes.object.isRequired,
	classn: PropTypes.number.isRequired,
	dur: PropTypes.number.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	uid: state.auth.user.id,
	errors: state.patterns.errors,
	patterns: state.patterns.patterns,
	calendar: state.calendar.calendar,
	calendars: calendarsGet(state),
	weekdays: calendarDaysInWeeks(state),
	subjects: getSubjectsByUser(state),
	curSubject: state.subjects.current,
	classn: state.subjects.filter,
	loading: state.patterns.loading,
	dur: state.patterns.dur,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, {
	...subjectsActions,
	...patternsActions,
	...calendarsActions
})(Patterns);
