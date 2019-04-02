import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Form, Label, Button, Input } from 'semantic-ui-react';
import { actions as bookActions } from '../../reducers/book';
import { getSubjectName } from '../../reducers/subjects';
import { booksToBindGet } from '../../reducers/books';

const types = [
	{ key: 0, text: 'Text book', value: 0 },
	{ key: 1, text: 'Task book', value: 1 },
	{ key: 2, text: 'Work book', value: 2 },
	{ key: 3, text: 'Audio book', value: 3 },
	{ key: 4, text: 'Check book', value: 4 },
	{ key: 5, text: 'Solutions book', value: 5 }
];
class Book extends Component {
	componentDidMount() {
		const { bookId, bookGet } = this.props;
		if (bookId !== '') {
			bookGet(bookId);
		} else {
			this.props.history.push('/books');
		}
	}
	onChange = (e) => {
		const { name, value } = e.target;
		this.props.fc(name, value);
	};
	setType = (e, { value }) => {
		this.props.fc('type', value);
	};
	setBinding = (e, { value }) => {
		this.props.fc('binded', value);
	};
	save = () => {
		console.log('save');
	};
	cancel = () => {
		this.props.history.goBack();
	};
	remove = () => {
		console.log('remove');
	};
	render() {
		const { subject, errors, loading, booksToBind } = this.props;
		const { name, author, classfrom, classto, type, year, binded } = this.props.book;
		if (errors) console.log(errors);
		const hdr =
			classfrom === classto ? `${subject} ${classfrom} класс.` : `${subject} ${classfrom}-${classto} классы.`;
		//TODO: Make two fields for classfrom and classto
		//TODO: Binding list (get task/text books except current)
		//TODO: Probably more then one binded book
		//TODO: Binding field should be wider
		return (
			<div className="dashboard">
				<Segment loading={loading}>
					<Form>
						<Label horizontal size="big">
							{hdr}
						</Label>
						<Form.Field
							value={author}
							control={Input}
							onChange={this.onChange}
							label="Author"
							name="author"
							placeholder="Author"
							size="big"
						/>
						<Form.TextArea
							className="largetext"
							name="name"
							value={name}
							onChange={this.onChange}
							size="big"
						/>
						<Form.Group widths="equal">
							<Form.Field
								name="year"
								value={year}
								control={Input}
								label="Year"
								placeholder="Year"
								onChange={this.onChange}
							/>
							<Form.Select
								fluid
								label="Type"
								options={types}
								placeholder="Type"
								value={type}
								onChange={this.setType}
							/>
							<Form.Select
								fluid
								label="Binding"
								options={booksToBind}
								placeholder="Binding"
								value={binded}
								onChange={this.setBinding}
							/>
						</Form.Group>
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
Book.propTypes = {
	subject: PropTypes.string.isRequired,
	book: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.book.errors,
	book: state.book.book,
	bookId: state.books.current,
	subject: getSubjectName(state),
	booksToBind: booksToBindGet(state)
});
export default connect(mapStateToProps, { ...bookActions })(Book);
