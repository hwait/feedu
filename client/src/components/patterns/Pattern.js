import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Segment, Label, Table, Header } from 'semantic-ui-react';
import { getPatternsByCalendar } from '../../reducers/patterns';
import isempty from '../../utils/isempty';
class Pattern extends Component {
	getGrid = () => {
		const { weekday, patterns, addPattern, removePattern } = this.props;
		let ts = moment('0800', 'Hmm');
		let pref = '',
			max = 0;
		const tt = [];
		for (let i = 0; i <= 41; i++) {
			if (i % 3 === 0) {
				pref = pref === 'odd' ? 'even' : 'odd';
			}
			const cln = `c${i % 3}-${pref}`;
			let x = patterns.find((x) => x.ts === i);

			let cell = <Table.Cell className={cln} onClick={(e, t, w) => addPattern(i, weekday)} />;
			if (!isempty(x)) {
				const id = x._id;
				cell = (
					<Table.Cell rowSpan={x.dur} style={{ backgroundColor: x.color, color: '#FFF' }}>
						{x.name}
						<Label
							size="mini"
							as="a"
							color="red"
							className="left-spaced"
							onClick={(e, t, w, d) => removePattern(i, weekday, id)}
						>
							X
						</Label>
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
					{i % 3 === 0 && (
						<Table.Cell collapsing rowSpan={3} className={cln}>
							{ts.format('HH')}
						</Table.Cell>
					)}
					{cell}
				</Table.Row>
			);

			ts.add(20, 'm');
		}
		return tt;
	};
	render() {
		const { name } = this.props;
		const tt = this.getGrid();
		return (
			<Table.Cell width={2}>
				<Table celled padded compact="very" size="small">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan={2}>
								<Header as="h3">{name}</Header>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>{tt}</Table.Body>
				</Table>
			</Table.Cell>
		);
	}
}
Pattern.propTypes = {
	addPattern: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	calendar: PropTypes.string.isRequired,
	removePattern: PropTypes.func.isRequired,
	patterns: PropTypes.array.isRequired,
	weekday: PropTypes.number.isRequired
};
const mapStateToProps = (state, props) => ({
	patterns: getPatternsByCalendar(state, props)
});
export default connect(mapStateToProps, null)(Pattern);
