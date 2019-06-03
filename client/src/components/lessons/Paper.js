import React, { Component } from 'react';
import { Segment, Form, Label, Input } from 'semantic-ui-react';

class Paper extends Component {
	paperRemove = () => {
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
		const { books, paper, isParagraph } = this.props;
		const { book, paragraph, loading } = paper;
		console.log('====================================');
		console.log(book, paper, books);
		console.log('====================================');
		return (
			<Segment loading={loading}>
				<Label as="a" corner="right" icon="remove" onClick={this.paperRemove} color="red" size="tiny" />
				<Form.Group>
					<Form.Select
						fluid
						label="Book"
						options={books}
						placeholder="Select Book"
						value={book}
						onChange={this.setBinding}
					/>

					{isParagraph && (
						<Form.Field
							value={paragraph}
							control={Input}
							onChange={this.onChange}
							name="paragraph"
							label="Paragraph"
							width={2}
						/>
					)}
				</Form.Group>
			</Segment>
		);
	}
}

export default Paper;
