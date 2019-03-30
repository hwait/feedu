import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { actions as authActions } from './reducers/auth';

import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import Login from './components/auth/Login';
import Lessons from './components/lessons/Lessons';

// Check for token
// if (localStorage.jwtToken) {
// 	// Set auth token header auth
// 	setAuthToken(localStorage.jwtToken);
// 	// Decode token and get user info and exp
// 	const decoded = jwt_decode(localStorage.jwtToken);
// 	// Set user and isAuthenticated
// 	//store.dispatch(setCurrentUser(decoded));

// 	// Check for expired token
// 	const currentTime = Date.now() / 1000;
// 	if (decoded.exp < currentTime) {
// 		// Logout user
// 		store.dispatch(authActions.logout());
// 		// TODO: Clear current Profile

// 		// Redirect to login
// 		window.location.href = '/';
// 	}
// }

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<div className="main-container">
							<Route exact path="/" component={Landing} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/profile" component={Profile} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/lessons" component={Lessons} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
