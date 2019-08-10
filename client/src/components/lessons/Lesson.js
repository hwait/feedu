import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Form, Label, Button, Icon, Input } from 'semantic-ui-react';
import { actions as lessonActions } from '../../reducers/lesson';
import { getNextNmb } from '../../reducers/lessons';
import { getCurrentSubject } from '../../reducers/subjects';
import { getCurrentCourse } from '../../reducers/courses';
import { booksToBindGet } from '../../reducers/books';
import round from '../../utils/round';
import Youtube from './Youtube';
import Paper from './Paper';
import Task from './Task';
import SubjectLabel from '../subjects/SubjectLabel';
class Lesson extends Component {
	componentDidMount() {
		const { lessonId, lessonGet, fc, nextnmb } = this.props;

		if (lessonId !== '') {
			if (lessonId === 'NEW') fc('nmb', nextnmb);
			else if (lessonId !== 'NEW') lessonGet(lessonId);
		} else {
			this.props.history.push('/lessons');
		}
	}
	componentDidUpdate() {
		const { isAuthentificated } = this.props;
		if (!isAuthentificated) {
			this.props.history.push('/');
		}
		//if (errors && errors.success) this.props.history.push('/lessons');
	}
	onChange = (e) => {
		const { name, value } = e.target;
		this.props.fc(name, value);
	};
	copyLesson = () => {
		console.log('lessonCopy');
		const { lessonCopy, lesson } = this.props;
		lessonCopy({ ...lesson, nmb: lesson.nmb * 1 + 1 });
	};
	incLesson = () => {
		console.log('incLesson');
		const { lessonInc, lesson, course } = this.props;
		lessonInc({ cid: course._id, nstart: lesson.nmb });
	};
	save = () => {
		const { lessonSave, lesson, course } = this.props;
		lessonSave({ ...lesson, course: course._id });
	};
	cancel = () => {
		this.props.history.goBack();
	};
	remove = () => {
		console.log('remove');
	};

	paperRemove = (index) => {
		this.props.paperRemove(index);
	};
	paperChange = (index, name, value) => {
		this.props.paperChange(index, name, value);
	};

	render() {
		const { subject, course, loading, youtubeAdd, paperAdd, taskAdd, booksToBind } = this.props;
		const { name, nmb, videos, papers, tasks, link } = this.props.lesson;
		return (
			<div className="dashboard">
				<Segment loading={loading}>
					<Form>
						<Segment.Inline>
							<Form.Group inline>
								<SubjectLabel subject={subject} />
								<Label horizontal size="big">{`${course.name}.`}</Label>
								<Label horizontal size="big">
									{`Урок № ${nmb}.`}
								</Label>
								<Form.Field value={nmb} control={Input} onChange={this.onChange} name="nmb" width={1} />
								<Button
									content="Copy"
									icon="copy"
									onClick={this.copyLesson}
									color="olive"
									floated="right"
								/>
								<Button
									content="Inc"
									icon="plus"
									onClick={this.incLesson}
									color="teal"
									floated="right"
								/>
							</Form.Group>
						</Segment.Inline>
						<Form.TextArea
							className="largetext"
							name="name"
							value={name}
							onChange={this.onChange}
							size="big"
						/>
						<Form.Field
							value={link}
							control={Input}
							onChange={this.onChange}
							name="link"
							width={16}
							label="Link"
						/>
						<Segment>
							<Label attached="top">Youtube</Label>
							<Label attached="top right" onClick={youtubeAdd}>
								<Icon name="add" />
							</Label>
							{videos.map((video, index) => (
								<Youtube key={`vid${index}`} youtube={video} index={index} />
							))}
						</Segment>
						<Segment>
							<Label attached="top">Papers</Label>
							<Label attached="top right" onClick={paperAdd}>
								<Icon name="add" />
							</Label>
							{papers.map((paper, index) => (
								<Paper
									key={`paper${index}`}
									paper={paper}
									index={index}
									books={booksToBind}
									paperRemove={this.paperRemove}
									paperChange={this.paperChange}
									isParagraph={true}
								/>
							))}
						</Segment>
						<Segment>
							<Label attached="top">Tasks</Label>
							<Label attached="top right" onClick={taskAdd}>
								<Icon name="add" />
							</Label>
							{tasks.map((task, index) => (
								<Task key={`task${index}`} task={task} index={index} books={booksToBind} />
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
Lesson.propTypes = {
	subject: PropTypes.object.isRequired,
	course: PropTypes.object.isRequired,
	lesson: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.lesson.errors,
	lesson: state.lesson.lesson,
	lessonId: state.lessons.current,
	subject: getCurrentSubject(state),
	course: getCurrentCourse(state),
	booksToBind: booksToBindGet(state),
	isAuthentificated: state.auth.isAuthentificated
});
export default connect(mapStateToProps, { ...lessonActions })(Lesson);
