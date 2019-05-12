import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Segment, Header, Select } from 'semantic-ui-react';
import { actions as subjectsActions, getSubjectsByUser } from '../../reducers/subjects';
import { actions as patternsActions } from '../../reducers/patterns';
import { actions as calendarsActions, calendarsGet } from '../../reducers/calendar';
import SubjectsClassesList from '../subjects/SubjectsClassesList';
import Pattern from './Pattern';
import calendar from '../../reducers/calendar';
import isempty from '../../utils/isempty';
class Patterns extends Component {
	componentDidMount() {
		if (this.props.subjects.length === 0) {
			this.props.init();
		}
		if (this.props.calendars.length === 0) {
			this.props.calendarsGet();
		}
		if (!this.props.isAuthentificated) {
			this.props.history.push('/');
		}
	}
	getSubjects = (value) => {
		this.props.setFilter(value);
	};
	setSubjectClass = (sid, cn) => {
		console.log('===========setSubjectClass================');
		console.log(sid, cn);
		console.log('====================================');
		const { setFilter, setCurrent } = this.props;
		setFilter(cn);
		setCurrent(sid);
	};
	setCurrentPattern = (value) => {
		console.log('============setCurrentPattern=================');
		console.log(value);
		console.log('====================================');
	};
	addPattern = (value) => {
		console.log('============addPattern=================');
		console.log(value);
		console.log('====================================');
	};
	removePattern = (value) => {
		console.log('============removePattern=================');
		console.log(value);
		console.log('====================================');
	};
	calendarGet = (e, { value }) => {
		this.props.calendarGet(value);
	};
	render() {
		const { curSubject, subjects, calendars, calendar, loading, setCurrent } = this.props;
		console.log('====================================');
		console.log(subjects);
		console.log('====================================');
		// const classitems = classes.map(({ text, value }) => (
		// 	<Menu.Item active={filter === value} color="red" key={value} onClick={(e, d) => this.getSubjects(value)}>
		// 		{text}
		// 	</Menu.Item>
		// ));
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
					</Segment>

					<SubjectsClassesList
						setSubjectClass={this.setSubjectClass}
						setSubject={setCurrent}
						subjects={subjects}
					/>
					<Segment
						placeholder={isempty(curSubject)}
						textAlign={isempty(curSubject) ? 'left' : 'center'}
						loading={loading}
					>
						{isempty(curSubject) ? (
							<Header as="h1" disabled>
								Books curSubject
							</Header>
						) : (
							<Pattern />
						)}
					</Segment>
				</Segment.Group>
			</div>
		);
	}
}
Patterns.propTypes = {
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
})(Patterns);
