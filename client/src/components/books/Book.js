import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Form, Button, Input } from 'semantic-ui-react';
import { actions as bookActions } from '../../reducers/book';
import { getCurrentSubject } from '../../reducers/subjects';
import { booksToBindGet } from '../../reducers/books';
import SubjectLabel from '../subjects/SubjectLabel';
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
		if (bookId === '') this.props.history.push('/books');
		else if (bookId !== 'NEW') bookGet(bookId);
	}
	componentDidUpdate() {
		const { errors } = this.props;
		if (errors && errors.success) this.props.history.push('/books');
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
		const { bookSave, book, subject } = this.props;
		bookSave({ ...book, subject: subject.id });
	};
	cancel = () => {
		this.props.history.goBack();
	};
	remove = () => {
		console.log('remove');
	};
	render() {
		const { subject, errors, loading, booksToBind } = this.props;
		const { name, author, type, year, binded } = this.props.book;
		if (errors) console.log(errors);

		//TODO: Not refresh after history.push here
		return (
			<div className="dashboard">
				<Segment loading={loading}>
					<Form>
						<Form.Group widths="equal">
							<SubjectLabel subject={subject} />
							<Form.Field
								value={author}
								control={Input}
								onChange={this.onChange}
								name="author"
								placeholder="Author"
								size="big"
							/>
						</Form.Group>
						<Form.TextArea
							className="largetext"
							name="name"
							value={name}
							placeholder="Title"
							onChange={this.onChange}
							size="big"
						/>
						<Form.Group>
							<Form.Field
								name="year"
								value={year}
								control={Input}
								label="Year"
								placeholder="Year"
								onChange={this.onChange}
								width={2}
							/>
							<Form.Select
								fluid
								label="Type"
								options={types}
								placeholder="Type"
								value={type}
								onChange={this.setType}
								width={4}
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
	subject: PropTypes.object.isRequired,
	book: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.book.errors,
	book: state.book.book,
	bookId: state.books.current,
	subject: getCurrentSubject(state),
	booksToBind: booksToBindGet(state)
});
export default connect(mapStateToProps, { ...bookActions })(Book);
