import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Label, Button, Input } from 'semantic-ui-react';
import { actions as lessonActions } from '../../reducers/lesson';
import { booksToBindGet } from '../../reducers/books';

class Paper extends Component {
	paperRemove = () => {
		console.log('paperRemove', this.props.index);
		this.props.paperRemove(this.props.index);
	};
	onChange = (e) => {
		this.props.paperChange(this.props.index, e.target.value);
	};
	render() {
		const { _id, paragraph, booksToBind, loading } = this.props.paper;
		return (
			<Segment loading={loading}>
				<Form.Group>
					<Form.Select
						fluid
						label="Book"
						options={booksToBind}
						placeholder="Select Book"
						value={_id}
						onChange={this.setBinding}
					/>
					<Form.Field
						value={paragraph}
						control={Input}
						onChange={this.onChange}
						name="paragraph"
						size="big"
						width={2}
					/>
				</Form.Group>
			</Segment>
		);
	}
}
const mapStateToProps = (state) => ({
	booksToBind: booksToBindGet(state)
});
export default connect(mapStateToProps, { ...lessonActions })(Paper);
