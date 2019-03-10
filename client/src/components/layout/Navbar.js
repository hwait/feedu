import React, { Component } from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
	state = { activeItem: 'home' };

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

		return (
			<Sidebar as={Menu} icon="labeled" inverted vertical visible width="thin">
				<Menu.Item as={Link} name="home" to="/" active={activeItem === 'home'} onClick={this.handleItemClick} />
				<Menu.Item
					as={Link}
					name="login"
					to="/"
					active={activeItem === 'login'}
					onClick={this.handleItemClick}
				/>
				<Menu.Item
					as={Link}
					name="register"
					to="/register"
					active={activeItem === 'register'}
					onClick={this.handleItemClick}
				>
					Sign Up
				</Menu.Item>
			</Sidebar>
		);
	}
}

export default Navbar;
