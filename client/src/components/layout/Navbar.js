import React, { Component } from 'react';
import { Menu, Sidebar, Icon, Image } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as authActions } from '../../reducers/auth';
import PropTypes from 'prop-types';
class Navbar extends Component {
	handleItemClick = (e, { name }) => {
		this.props.pathChange(name);
	};

	render() {
		const { isAuthentificated, path, logout, user } = this.props;
		const linkHome = (
			<Menu.Item
				as={Link}
				key="home"
				name="home"
				to="/"
				active={path === 'home'}
				onClick={this.handleItemClick}
				className="menu-item"
			>
				<Icon name="home" />
				Home
			</Menu.Item>
		);
		const linkDashboard = (
			<Menu.Item
				className="menu-item"
				as={Link}
				key="dashboard"
				name="home"
				to="/"
				active={path === 'home'}
				onClick={this.handleItemClick}
			>
				<Icon name="lab" />
				Board
			</Menu.Item>
		);
		const linkLessons = (
			<Menu.Item
				as={Link}
				key="lessons"
				name="lessons"
				to="/lessons"
				active={path === 'lessons'}
				onClick={this.handleItemClick}
				className="menu-item"
			>
				<Icon name="flipboard" />
				Lessons
			</Menu.Item>
		);
		const linkSignup = (
			<Menu.Item
				className="menu-item"
				as={Link}
				key="register"
				name="register"
				to="/register"
				active={path === 'register'}
				onClick={this.handleItemClick}
			>
				<Icon name="signup" />
				Sign Up
			</Menu.Item>
		);
		const linkProfile = (
			<Menu.Item
				className="menu-item"
				as={Link}
				key="profile"
				name="profile"
				to="/profile"
				active={path === 'profile'}
				onClick={this.handleItemClick}
			>
				<Image className="menu-avatar" src={user.avatar} circular centered />
				Profile
			</Menu.Item>
		);
		const linkLogout = (
			<Menu.Item as={Link} key="logout" name="logout" to="/" onClick={logout} className="menu-item">
				<Icon name="log out" />
				Logout
			</Menu.Item>
		);
		const menuItems = isAuthentificated
			? [ linkDashboard, linkLessons, linkProfile, linkLogout ]
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
