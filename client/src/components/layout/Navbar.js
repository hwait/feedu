import React, { Component } from 'react';
import { Menu, Sidebar, Icon, Image } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as authActions } from '../../reducers/auth';
import PropTypes from 'prop-types';
class Navbar extends Component {
	handleItemClick = (e, { name }) => {
		const { pathChange, logout } = this.props;
		name === 'logout' ? logout() : pathChange(name);
	};
	getItem = (name, title, path, icon) => {
		return (
			<Menu.Item
				as={Link}
				key={name}
				name={name}
				to={name === 'home' ? '/' : `/${name}`}
				active={path === name}
				onClick={this.handleItemClick}
				className="menu-item"
				color="blue"
			>
				{icon === '' ? (
					<Image className="menu-avatar" src={this.props.user.avatar} circular centered />
				) : (
					<Icon name={icon} />
				)}
				{title}
			</Menu.Item>
		);
	};

	render() {
		const { isAuthentificated, path } = this.props;
		const linkHome = this.getItem('home', 'Home', path, 'home');
		const linkDashboard = this.getItem('dashboard', 'Board', path, 'lab');
		const linkCalendar = this.getItem('calendar', 'Calendar', path, 'calendar');
		const linkPatterns = this.getItem('patterns', 'Pattern', path, 'th');

		const linkLessons = this.getItem('lessons', 'Lesson', path, 'flipboard');
		const linkBooks = this.getItem('books', 'Books', path, 'book');
		const linkSignup = this.getItem('register', 'Sign Up', path, 'signup');
		const linkProfile = this.getItem('profile', 'profile', path, '');
		const linkCourse = this.getItem('course', 'Course', path, 'paw');
		const linkLogout = this.getItem('logout', 'Logout', path, 'log out');

		const menuItems = isAuthentificated
			? [ linkDashboard, linkBooks, linkCourse, linkLessons, linkPatterns, linkCalendar, linkProfile, linkLogout ]
			: [ linkHome, linkSignup ];
		return (
			<Sidebar as={Menu} icon="labeled" inverted vertical visible width="very thin">
				{menuItems}
			</Sidebar>
		);
	}
}
Navbar.propTypes = {
	pathChange: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	isAuthentificated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	path: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
	user: state.auth.user,
	path: state.auth.path,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, { ...authActions })(withRouter(Navbar));
