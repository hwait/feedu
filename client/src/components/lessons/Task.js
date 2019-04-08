import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Label, Icon, Input } from 'semantic-ui-react';
import { actions as lessonActions } from '../../reducers/lesson';

class Task extends Component {
	taskRemove = () => {
		console.log('taskRemove', this.props.index);
		this.props.taskRemove(this.props.index);
	};
	onChange = (e) => {
		const { name, value } = e.target;
		this.props.taskChange(this.props.index, name, value);
	};
	setBinding = (e, { value }) => {
		this.props.taskChange(this.props.index, 'book', value);
	};
	setDifficulty = (e, { value }) => {
		this.props.taskChange(this.props.index, 'difficulty', value);
	};
	render() {
		const { book, nmb, loading, difficulty } = this.props.task;
		return (
			<Segment loading={loading}>
				<Label as="a" corner="right" icon="remove" onClick={this.taskRemove} color="red" size="tiny" />
				<Form.Group>
					<Form.Select
						fluid
						options={this.props.books}
						placeholder="Select Book"
						value={book}
						onChange={this.setBinding}
					/>
					<Form.Field value={nmb} control={Input} onChange={this.onChange} name="nmb" width={2} />
					<Form.Group inline>
						<Icon name="bicycle" size="large" />
						<Form.Radio value={0} checked={difficulty === 0} onChange={this.setDifficulty} color="red" />
						<Icon name="car" size="large" />
						<Form.Radio value={1} checked={difficulty === 1} onChange={this.setDifficulty} />
						<Icon name="plane" size="large" />
						<Form.Radio value={2} checked={difficulty === 2} onChange={this.setDifficulty} />
					</Form.Group>
				</Form.Group>
			</Segment>
		);
	}
}

export default connect(null, { ...lessonActions })(Task);
