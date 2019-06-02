import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Label, Input } from 'semantic-ui-react';
import { actions as lessonActions } from '../../reducers/lesson';

class Paper extends Component {
	paperRemove = () => {
		console.log('paperRemove', this.props.index);
		this.props.paperRemove(this.props.index);
	};
	onChange = (e) => {
		const { name, value } = e.target;
		this.props.paperChange(this.props.index, name, value);
	};
	setBinding = (e, { value }) => {
		this.props.paperChange(this.props.index, 'book', value);
	};
	render() {
		const { book, paragraph, loading } = this.props.paper;
		return (
			<Segment loading={loading}>
				<Label as="a" corner="right" icon="remove" onClick={this.paperRemove} color="red" size="tiny" />
				<Form.Group>
					<Form.Select
						fluid
						label="Book"
						options={this.props.books}
						placeholder="Select Book"
						value={book}
						onChange={this.setBinding}
					/>
					<Form.Field
						value={paragraph}
						control={Input}
						onChange={this.onChange}
						name="paragraph"
						label="Paragraph"
						width={2}
					/>
				</Form.Group>
			</Segment>
		);
	}
}

export default connect(null, { ...lessonActions })(Paper);
