import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as calendarActions } from '../../reducers/calendar';
import { DateInput } from 'semantic-ui-calendar-react';
import { getMarks } from '../../reducers/calendar';
import 'moment/locale/ru';
class Month extends Component {
	handleChange = (event, { value }) => {
		this.props.dateToggle(value);
	};
	toggleMonth = () => {
		const { monthToggle, initialDate } = this.props;
		monthToggle(initialDate);
	};
	render() {
		const { dates, initialDate } = this.props;
		return (
			<DateInput
				inline
				dateFormat="YYYY-MM-DD"
				initialDate={initialDate}
				marked={dates}
				value={''}
				markColor="yellow"
				name="date"
				onChange={this.handleChange}
				enableHeader={false}
				onHeaderClick={this.toggleMonth}
				localization="ru"
				pickerWidth="80px"
				pickerStyle={{ fontSize: '90%' }}
			/>
		);
	}
}
Month.propTypes = {
	dates: PropTypes.array.isRequired
};
const mapStateToProps = (state, ownProps) => ({
	dates: getMarks(state.calendar.calendar.dates, ownProps.initialDate)
});
export default connect(mapStateToProps, { ...calendarActions })(Month);
