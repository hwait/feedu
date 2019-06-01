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
import isempty from '../../utils/isempty';
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
		const { curSubject, loading, subjects } = this.props;
		return (
			<div className="dashboard">
				<Segment.Group horizontal>
					<Segment textAlign="left">
						<SubjectsList setSubject={this.setSubject} subjects={subjects} />
					</Segment>
					<Segment
						placeholder={isempty(curSubject)}
						textAlign={!isempty(curSubject) ? 'left' : 'center'}
						loading={loading}
					>
						{!isempty(curSubject) ? (
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
	subjects: PropTypes.array.isRequired,
	curSubject: PropTypes.object.isRequired,
	curBook: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	isAuthentificated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.books.errors,
	subjects: getSubjectsByClass(state),
	curSubject: state.subjects.current,
	curBook: state.books.current,
	loading: state.books.loading,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, { ...subjectsActions, ...booksActions })(Books);
