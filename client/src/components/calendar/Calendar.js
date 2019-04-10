import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as calendarActions } from '../../reducers/calendar';
import { Segment, Form, Label, Grid } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/ru';
import Month from './Month';
import { getStats } from '../../reducers/calendar';
const months = moment.months().map((x, index) => ({ key: index, value: index, text: x }));
// TODO: Make name field, buttons
// TODO: Save named and load from list

class Calendar extends Component {
	startSet = (e, { value }) => {
		console.log('startSet ', value);
		this.props.startSet(value);
	};
	weekendToggle = (value) => {
		const { weekendToggle } = this.props;
		weekendToggle(value);
	};
	render() {
		const { days, start, loading, weekends } = this.props;
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
					</Form>
				</Segment>
			</div>
		);
	}
}
Calendar.propTypes = {
	dates: PropTypes.array.isRequired,
	weekends: PropTypes.array.isRequired,
	start: PropTypes.number.isRequired,
	days: PropTypes.number.isRequired
};
const mapStateToProps = (state) => ({
	dates: state.calendar.dates,
	weekends: state.calendar.weekends,
	start: state.calendar.start,
	days: getStats(state.calendar.dates)
});
export default connect(mapStateToProps, { ...calendarActions })(Calendar);
