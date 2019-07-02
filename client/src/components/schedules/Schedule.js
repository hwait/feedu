import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Segment, Table, Header, Icon } from 'semantic-ui-react';
class Schedule extends Component {
	sublists = (l, i, icon, text) => {
		return (
			<Table.Row key={`${icon}${i}`}>
				{i === 0 && (
					<Table.Cell rowSpan={l} textAlign="right" colSpan={2}>
						<Icon name={icon} size="big" />
					</Table.Cell>
				)}
				<Table.Cell>{text}</Table.Cell>
			</Table.Row>
		);
	};

	schedule = (schedule, i, date) => {
		const { lesson, ts, dur } = schedule;
		const from = moment(ts);
		const { name, nmb, link, course } = lesson;
		const vl = lesson.videos.length;
		const pl = lesson.papers.length;
		const tl = lesson.tasks.length;
		const videos = lesson.videos.map((x, index) => {
			return this.sublists(vl, index, 'youtube', `${x.link} (${x.dur} мин.)`);
		});
		const papers = lesson.papers.map((x, index) => {
			return this.sublists(pl, index, 'book', `[${x.paragraph}] ${x.book.author} ${x.book.name}`);
		});
		const tasks = lesson.tasks.map((x, index) => {
			return this.sublists(tl, index, 'task', `#[${x.nmb}] ${x.book.author} ${x.book.name}`);
		});
		return (
			<Table compact="very" size="small" key={`lesson${date}${i}`}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell rowSpan={2} textAlign="center" width={1}>
							<Header as="h2">{i + 1}</Header>
						</Table.HeaderCell>
						<Table.HeaderCell width={2}>
							<Header as="h3">{from.format('HH:mm')}</Header>
						</Table.HeaderCell>
						<Table.HeaderCell width={14}>{course.sname}</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell width={1}>{`${dur} мин.`}</Table.HeaderCell>
						<Table.HeaderCell width={14}>{`${nmb}. ${name}`}</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{link && (
						<Table.Row>
							<Table.Cell colSpan={3}>
								<a href={link} target="_blank" rel="noopener noreferrer">
									{link}
								</a>
							</Table.Cell>
						</Table.Row>
					)}
					{pl > 0 && papers}
					{vl > 0 && videos}
					{tl > 0 && tasks}
				</Table.Body>
			</Table>
		);
	};
	render() {
		const { schedules, date } = this.props;
		const scheduleItems = schedules.map((x, index) => this.schedule(x, index, date));
		return (
			<Segment>
				<Header as="h1">{moment(date).format('DD MMMM, dddd')}</Header>
				{scheduleItems}
			</Segment>
		);
	}
}
Schedule.propTypes = {
	schedules: PropTypes.array.isRequired,
	date: PropTypes.string.isRequired
};
export default Schedule;
