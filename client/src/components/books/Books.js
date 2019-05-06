import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Segment, Header, Label, Icon } from 'semantic-ui-react';
import getClasses from '../../utils/getClasses';
import { actions as subjectsActions } from '../../reducers/subjects';
import { actions as booksActions } from '../../reducers/books';
import { getSubjectsByClass } from '../../reducers/subjects';
import SubjectsList from '../subjects/SubjectsList';
import BooksList from './BooksList';

const classes = getClasses();

class Books extends Component {
	componentDidMount() {
		if (this.props.subjects.length === 0) {
			this.props.init();
		}
		if (!this.props.isAuthentificated) {
			this.props.history.push('/');
		}
	}
	getSubjects = (value) => {
		this.props.setFilter(value);
	};
	setBook = (value) => {
		this.props.bookSetCurrent(value);
		this.props.history.push('/book');
	};
	setSubject = (value) => {
		const { filter, booksGet } = this.props;
		booksGet(filter, value);
	};
	addBook = () => {
		this.props.bookNew();
		this.props.history.push('/book');
	};
	render() {
		const { curSubject, filter, loading, subjects } = this.props;
		const classitems = classes.map(({ text, value }) => (
			<Menu.Item active={filter === value} color="red" key={value} onClick={(e, d) => this.getSubjects(value)}>
				{text}
			</Menu.Item>
		));
		return (
			<div className="dashboard">
				<Segment.Group horizontal>
					<Menu compact vertical>
						{classitems}
					</Menu>
					<Segment placeholder={filter === 0} textAlign={filter === 0 ? 'center' : 'left'}>
						{filter > 0 ? (
							<SubjectsList setSubject={this.setSubject} subjects={subjects} />
						) : (
							<Header as="h1" disabled>
								Subjects
							</Header>
						)}
					</Segment>
					<Segment
						placeholder={curSubject === ''}
						textAlign={curSubject ? 'left' : 'center'}
						loading={loading}
					>
						{curSubject ? (
							[
								<BooksList setBook={this.setBook} />,
								<Label as="a" attached="bottom right" onClick={this.addBook} color="blue">
									<Icon name="add" />
								</Label>
							]
						) : (
							<Header as="h1" disabled>
								Books
							</Header>
						)}
					</Segment>
				</Segment.Group>
			</div>
		);
	}
}
Books.propTypes = {
	filter: PropTypes.number.isRequired,
	subjects: PropTypes.array.isRequired,
	curSubject: PropTypes.string.isRequired,
	curBook: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.books.errors,
	subjects: getSubjectsByClass(state),
	filter: state.subjects.filter,
	curSubject: state.subjects.current,
	curBook: state.books.current,
	loading: state.books.loading,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, { ...subjectsActions, ...booksActions })(Books);
