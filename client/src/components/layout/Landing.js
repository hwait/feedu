import React, { Component } from 'react';
import { Form, Grid, Button, Header, Icon, Segment, Divider } from 'semantic-ui-react';

class Landing extends Component {
	render() {
		return (
			<div class="landing">
				<div class="dark-overlay landing-inner">
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
									<Form>
										<Form.Input icon="user" iconPosition="left" placeholder="Username" />
										<Form.Input
											icon="lock"
											iconPosition="left"
											placeholder="Password"
											type="password"
										/>

										<Button content="Sign In" icon="sign in" labelPosition="left" primary />
									</Form>
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
