import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class BooksList extends Component {
	render() {
		const { books, setBook, current } = this.props;
		console.log('====================================');
		console.log(books);
		console.log('====================================');
		const items = books.map(({ _id, author, name }) => {
			return (
				<List.Item
					as="a"
					active={current === _id}
					key={_id}
					onClick={(e, d) => setBook(_id)}
				>{`${author}. ${name}`}</List.Item>
			);
		});
		return (
			<List selection verticalAlign="middle" size="large">
				{items}
			</List>
		);
	}
}
const mapStateToProps = (state) => ({
	books: state.books.books,
	current: state.books.current
});
BooksList.propTypes = {
	books: PropTypes.array.isRequired,
	current: PropTypes.string.isRequired
};
export default connect(mapStateToProps, null)(BooksList);
