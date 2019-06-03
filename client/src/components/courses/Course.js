import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as courseActions, getCourses, getStats, getExtendedCourse } from '../../reducers/courses';
import { actions as subjectsActions, getSubjects } from '../../reducers/subjects';
import { Segment, Form, Label, Grid, Button, Input, Select, Icon } from 'semantic-ui-react';
import isempty from '../../utils/isempty';
import SubjectLabel from '../subjects/SubjectLabel';
import { actions as booksActions, booksToBindGet } from '../../reducers/books';
import Paper from '../lessons/Paper';

class Course extends Component {
	componentDidMount() {
		const { subjects, courses, coursesGet, init } = this.props;
		if (subjects.length === 0) init();
		if (courses.length === 0) coursesGet();
	}
	componentDidUpdate() {
		const { errors, courseCancel } = this.props;
		if (errors && errors.success) courseCancel();
	}
	setSubject = (e, { value }) => {
		const { setCurrent, coursesGet, booksGet } = this.props;
		setCurrent(value);
		booksGet(value);
		coursesGet(value);
	};
	setCourse = (e, { value }) => {
		const { courseGet } = this.props;
		courseGet(value);
	};
	onChange = (e) => {
		const { name, value } = e.target;
		this.props.fc(name, value);
	};

	save = () => {
		const { courseSave, curCourse, curSubject } = this.props;
		console.log('====================================');
		console.log(curCourse.books, curCourse.books.map(({ book }) => book));
		console.log('====================================');
		courseSave({
			...curCourse,
			subjects: [ curSubject.id ],
			books: curCourse.books.map(({ book }) => book)
		});
	};
	cancel = () => {
		this.props.courseCancel();
		//this.props.history.goBack();
	};
	remove = () => {
		console.log('remove');
	};
	paperRemove = (index) => {
		this.props.paperRemove(index);
	};
	paperChange = (index, name, value) => {
		this.props.paperChange(index, value);
	};
	render() {
		const { subjects, curSubject, curCourse, courses, loading, paperAdd, booksToBind } = this.props;
		const { name, sname, description, link, lessonsn, books } = this.props.curCourse;

		return (
			<div className="dashboard">
				<Segment loading={loading}>
					<Form>
						<Form.Group>
							<SubjectLabel subject={curSubject} />
							<Select
								label="Subjects"
								options={subjects}
								placeholder="Subjects"
								value={isempty(curSubject) ? null : curSubject.id}
								onChange={this.setSubject}
							/>
							<Select
								label="Courses"
								options={courses}
								placeholder="Courses"
								value={isempty(curCourse) ? null : curCourse._id}
								onChange={this.setCourse}
								className="left-spaced"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Field
								value={name}
								control={Input}
								onChange={this.onChange}
								name="name"
								label="Title"
								placeholder="Title"
								size="big"
								width={10}
							/>

							<Form.Field
								value={sname}
								control={Input}
								onChange={this.onChange}
								name="sname"
								label="Short"
								placeholder="Short"
								size="big"
								width={6}
							/>
						</Form.Group>
						<Form.TextArea
							className="largetext"
							name="description"
							value={description}
							placeholder="Description"
							onChange={this.onChange}
							size="big"
						/>
						<Form.Group>
							<Form.Field
								name="lessonsn"
								value={lessonsn}
								control={Input}
								label="Lessons"
								placeholder="Lessons"
								onChange={this.onChange}
								width={2}
							/>
							<Form.Field
								name="link"
								value={link}
								control={Input}
								label="Link"
								placeholder="Link"
								onChange={this.onChange}
								width={14}
							/>
						</Form.Group>
						<Segment>
							<Label attached="top">Books</Label>
							<Label attached="top right" onClick={paperAdd}>
								<Icon name="add" />
							</Label>
							{books.map((paper, index) => (
								<Paper
									key={`paper${index}`}
									paper={paper}
									index={index}
									books={booksToBind}
									paperRemove={this.paperRemove}
									paperChange={this.paperChange}
								/>
							))}
						</Segment>
						<Segment>
							<Button content="Save" icon="save" labelPosition="left" onClick={this.save} positive />
							<Button content="Cancel" icon="ban" labelPosition="left" primary onClick={this.cancel} />
							<Button
								content="Remove"
								icon="remove"
								labelPosition="left"
								onClick={this.remove}
								negative
								floated="right"
							/>
						</Segment>
					</Form>
				</Segment>
			</div>
		);
	}
}
Course.propTypes = {
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	subjects: PropTypes.array.isRequired,
	courses: PropTypes.array.isRequired,
	curSubject: PropTypes.object.isRequired,
	curCourse: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.courses.errors,
	loading: state.courses.loading,
	subjects: getSubjects(state),
	courses: getCourses(state),
	curSubject: state.subjects.current,
	curCourse: getExtendedCourse(state),
	booksToBind: booksToBindGet(state)
});
export default connect(mapStateToProps, { ...subjectsActions, ...courseActions, ...booksActions })(Course);
