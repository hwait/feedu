import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
//import Login from './components/auth/Login';
import Lessons from './components/lessons/Lessons';
import Lesson from './components/lessons/Lesson';
import Books from './components/books/Books';
import Book from './components/books/Book';
import Calendar from './components/calendar/Calendar';
import Patterns from './components/patterns/Patterns';
import Schedules from './components/schedules/Schedules';
import Course from './components/courses/Course';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<div className="main-container">
							<Route exact path="/" component={Schedules} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/profile" component={Profile} />
							<Route exact path="/login" component={Landing} />
							<Route exact path="/books" component={Books} />
							<Route exact path="/book" component={Book} />
							<Route exact path="/dashboard" component={Schedules} />
							<Route exact path="/patterns" component={Patterns} />
							<Route exact path="/calendar" component={Calendar} />
							<Route exact path="/lessons" component={Lessons} />
							<Route exact path="/lesson" component={Lesson} />
							<Route exact path="/course" component={Course} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
