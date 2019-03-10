import React, { Component } from 'react';
import Login from '../auth/Login';
import { Grid, Button, Header, Divider } from 'semantic-ui-react';

class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner">
					<div>
						<Grid columns="equal" stackable textAlign="center" relaxed>
							<Grid.Row>
								<Grid.Column>
									<Header as="h1" inverted>
										Hi, Viziteur!
									</Header>
								</Grid.Column>
							</Grid.Row>

							<Grid.Row verticalAlign="middle">
								<Divider vertical inverted>
									Or
								</Divider>
								<Grid.Column>
									<Login />
								</Grid.Column>
								<Grid.Column textAlign="left">
									<Button
										content="Sign Up"
										icon="signup"
										labelPosition="left"
										color="teal"
										size="big"
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
