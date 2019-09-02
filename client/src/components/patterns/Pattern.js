import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Segment, Label, Table, Header, Icon } from 'semantic-ui-react';
import { getPatternsByDate } from '../../reducers/patterns';
import isempty from '../../utils/isempty';
class Pattern extends Component {
	getGrid = () => {
		const { date, patterns, addPattern, removePattern } = this.props;
		let ts = moment('0900', 'Hmm');
		let pref = '',
			max = 0;
		const tt = [];
		for (let i = 0; i <= 71; i++) {
			if (i % 6 === 0) {
				pref = pref === 'odd' ? 'even' : 'odd';
			}
			const cln = `c${i % 6}-${pref}`;
			let x = patterns.find((x) => x.dates.some((d) => d.includes(ts.format('HH:mm:ss'))));

			let cell = <Table.Cell className={cln} onClick={(e, t, w) => addPattern(i, date)} />;
			if (!isempty(x)) {
				const id = x._id;
				const cid = x.course;
				cell = (
					<Table.Cell rowSpan={x.dur / 10} style={{ backgroundColor: x.color, color: '#FFF' }}>
						<Icon className={`sf-icon-${x.icon}`} />
						{x.name}
						<Label
							size="mini"
							as="a"
							color="red"
							className="left-spaced"
							onClick={(e, t, w, c, d) => removePattern(i, date, cid, id)}
						/>
					</Table.Cell>
				);
				max = x.ts + x.dur;
				x = {};
			} else if (i < max) {
				cell = null;
			} else if (i === max) {
				max = 0;
			}
			tt.push(
				<Table.Row key={`a${i}`} style={{ height: '5px' }}>
					{i % 6 === 0 && (
						<Table.Cell collapsing rowSpan={6} className={cln}>
							{ts.format('HH')}
						</Table.Cell>
					)}
					{cell}
				</Table.Row>
			);

			ts.add(10, 'm');
		}
		return tt;
	};
	render() {
		const { date } = this.props;
		const tt = this.getGrid();
		return (
			<Segment style={{ display: 'flex', alignItems: 'top' }}>
				<Table celled padded compact="very" size="small">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan={2}>
								<Header as="h3">{date.format('ddd, DD')}</Header>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>{tt}</Table.Body>
				</Table>
			</Segment>
		);
	}
}
Pattern.propTypes = {
	addPattern: PropTypes.func.isRequired,
	removePattern: PropTypes.func.isRequired,
	patterns: PropTypes.array.isRequired,
	date: PropTypes.object.isRequired
};
const mapStateToProps = (state, props) => ({
	patterns: getPatternsByDate(state, props)
});
export default connect(mapStateToProps, null)(Pattern);
