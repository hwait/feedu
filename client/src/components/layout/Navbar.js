import React, { Component } from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as authActions } from '../../reducers/auth';
import PropTypes from 'prop-types';
class Navbar extends Component {
	handleItemClick = (e, { name }) => {
		this.props.changePath(name);
	};

	render() {
		// TODO: Add avatar
		// TODO: Add icons
		// TODO: Mark active menu based on path (set path in auth reducer)
		const { isAuthentificated, path, logout } = this.props;
		const linkHome = (
			<Menu.Item
				as={Link}
				key="home"
				name="home"
				to="/"
				active={path === 'home'}
				onClick={this.handleItemClick}
			/>
		);
		const linkSignup = (
			<Menu.Item
				as={Link}
				key="register"
				name="register"
				to="/register"
				active={path === 'register'}
				onClick={this.handleItemClick}
			>
				Sign Up
			</Menu.Item>
		);
		const linkProfile = (
			<Menu.Item
				as={Link}
				key="profile"
				name="profile"
				to="/profile"
				active={path === 'profile'}
				onClick={this.handleItemClick}
			>
				Profile
			</Menu.Item>
		);
		const linkLogout = (
			<Menu.Item as={Link} key="logout" name="logout" to="/" onClick={logout}>
				Logout
			</Menu.Item>
		);
		const menuItems = isAuthentificated ? [ linkHome, linkProfile, linkLogout ] : [ linkHome, linkSignup ];
		return (
			<Sidebar as={Menu} icon="labeled" inverted vertical visible width="thin">
				{menuItems}
			</Sidebar>
		);
	}
}
Navbar.propTypes = {
	changePath: PropTypes.func.isRequired,
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
