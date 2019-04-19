import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as calendarActions } from '../../reducers/calendar';
import { Segment, Form, Label, Grid, Button, Input } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/ru';
import Month from './Month';
import { getStats } from '../../reducers/calendar';
const months = moment.months().map((x, index) => ({ key: index, value: index, text: x }));
// TODO: Make name field, buttons
// TODO: Save named and load from list

class Calendar extends Component {
	componentDidMount() {
		const { calendars, calendarsGet } = this.props;
		if (calendars.length === 0) calendarsGet();
	}
	startSet = (e, { value }) => {
		this.props.startSet(value);
	};
	calendarSet = (e, { value }) => {
		this.props.calendarGet(value);
	};
	onChange = (e) => {
		const { name, value } = e.target;
		this.props.fc(name, value);
	};
	weekendToggle = (value) => {
		const { weekendToggle } = this.props;
		weekendToggle(value);
	};
	save = () => {
		const { calendarSave, calendar } = this.props;
		calendarSave(calendar);
	};
	cancel = () => {
		this.props.history.goBack();
	};
	remove = () => {
		console.log('remove');
	};
	render() {
		const { days, errors, loading, calendars, current } = this.props;
		const { start, weekends, name } = this.props.calendar;
		const selections = calendars.map(({ _id, name }) => ({ key: _id, value: _id, text: name }));
		const workWeeks = weekends.length < 7 ? Math.round(days / (7 - weekends.length)) : 0;
		const workRate = Math.round(days / 365 * 100);
		let dt = moment({ year: 2019, month: start, day: 1 });
		const mm = [];
		for (let i = 0; i < 12; i++) {
			mm.push(
				<Grid.Column key={`month${i}`}>
					<Month
						initialDate={dt.format('YYYY-MM-DD')}
						handleChange={this.handleChange}
						toggleMonth={this.toggleMonth}
					/>
				</Grid.Column>
			);
			dt.add(1, 'month');
		}
		return (
			<div className="dashboard">
				<Segment loading={loading}>
					<Segment.Inline>
						<Label.Group size="huge">
							<Label>Дней: {days}</Label>
							<Label>Недель: {workWeeks}</Label>
							<Label>Доля учебных дней: {workRate}%</Label>
						</Label.Group>
					</Segment.Inline>
					<Form>
						<Form.Select
							fluid
							label="Имеющиеся календари"
							options={selections}
							placeholder="Выберите календарь или начните заполнять новый"
							value={current}
							onChange={this.calendarSet}
							width={5}
						/>
						<Form.Field
							value={name}
							control={Input}
							onChange={this.onChange}
							name="name"
							label="Title"
							placeholder="Title"
							size="big"
						/>
						<Form.Group inline>
							<Form.Select
								fluid
								label="Начало учебного года"
								options={months}
								placeholder="Type"
								value={start}
								onChange={this.startSet}
								width={5}
							/>
							<Form.Checkbox
								label="ПН"
								checked={weekends.includes(1)}
								onChange={(e) => this.weekendToggle(1)}
							/>
							<Form.Checkbox
								label="ВТ"
								checked={weekends.includes(2)}
								onChange={(e) => this.weekendToggle(2)}
							/>
							<Form.Checkbox
								label="СР"
								checked={weekends.includes(3)}
								onChange={(e) => this.weekendToggle(3)}
							/>
							<Form.Checkbox
								label="ЧТ"
								checked={weekends.includes(4)}
								onChange={(e) => this.weekendToggle(4)}
							/>
							<Form.Checkbox
								label="ПТ"
								checked={weekends.includes(5)}
								onChange={(e) => this.weekendToggle(5)}
							/>
							<Form.Checkbox
								label="СБ"
								checked={weekends.includes(6)}
								onChange={(e) => this.weekendToggle(6)}
							/>
							<Form.Checkbox
								label="ВС"
								checked={weekends.includes(7)}
								onChange={(e) => this.weekendToggle(7)}
							/>
						</Form.Group>
						<Grid stackable padded columns={4}>
							{mm}
						</Grid>
						<Segment>
							<Button content="Save" icon="save" labelPosition="left" onClick={this.save} positive />
							<Button content="Cancel" icon="ban" labelPosition="left" primary onClick={this.cancel} />
							<Button
								content="Remove"
								icon="remove"
								labelPosition="left"
								onClick={this.remove}
								negative
								floated="right"
							/>
						</Segment>
					</Form>
				</Segment>
			</div>
		);
	}
}
Calendar.propTypes = {
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	current: PropTypes.string.isRequired,
	calendar: PropTypes.object.isRequired,
	calendars: PropTypes.array.isRequired,
	days: PropTypes.number.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.calendar.errors,
	loading: state.calendar.loading,
	current: state.calendar.current,
	calendar: state.calendar.calendar,
	calendars: state.calendar.calendars,
	days: getStats(state.calendar.calendar.dates)
});
export default connect(mapStateToProps, { ...calendarActions })(Calendar);
