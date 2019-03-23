import React, { Component } from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as authActions } from '../../reducers/auth';
class Navbar extends Component {
	handleItemClick = (e, { name }) => {
		this.props.changePath(name);
	};

	render() {
		// TODO: Add avatar
		// TODO: Add icons
		console.log('====================================');
		console.log(this.props.path, this.props.isAuthentificated);
		console.log('====================================');
		const { isAuthentificated, path } = this.props;
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
			<Menu.Item
				as={Link}
				key="logout"
				name="logout"
				to="/logout"
				active={path === 'logout'}
				onClick={this.handleItemClick}
			>
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
const mapStateToProps = (state) => ({
	user: state.auth.user,
	path: state.auth.path,
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, { ...authActions })(withRouter(Navbar));
