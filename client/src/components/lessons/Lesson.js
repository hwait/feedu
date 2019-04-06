import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Form, Label, Button, Icon } from 'semantic-ui-react';
import { actions as lessonActions } from '../../reducers/lesson';
import { getCurentSubject } from '../../reducers/subjects';
import Youtube from './Youtube';

class Lesson extends Component {
	componentDidMount() {
		const { lessonId, lessonGet } = this.props;
		if (lessonId !== '') {
			lessonGet(lessonId);
		} else {
			this.props.history.push('/lessons');
		}
	}
	onChange = (e) => {
		const { name, value } = e.target;
		this.props.fc(name, value);
	};
	copyLesson = () => {
		console.log('copyLesson');
	};
	addPaper = () => {
		console.log('addPaper');
	};
	addTask = () => {
		console.log('addTask');
	};
	save = () => {
		console.log('save');
	};
	cancel = () => {
		this.props.history.goBack();
	};
	remove = () => {
		console.log('remove');
	};
	render() {
		const { subject, toggleExtended, errors, loading, youtubeAdd } = this.props;
		const { classn, isextended, name, nmb, videos, papers, tasks } = this.props.lesson;
		if (errors) console.log(errors, papers, tasks);
		return (
			<div className="dashboard">
				<Segment loading={loading}>
					<Form>
						<Segment.Inline>
							<Label horizontal size="big">{`${subject.name} ${classn} класс.`}</Label>
							<Label horizontal size="big">
								{`Урок № ${nmb}.`}
							</Label>
							<Button
								content="Copy"
								icon="copy"
								onClick={this.copyLesson}
								color="olive"
								floated="right"
							/>
							<Button
								content={isextended ? 'Дополнительное' : 'Обычное'}
								onClick={toggleExtended}
								color={isextended ? 'orange' : 'grey'}
								floated="right"
							/>
						</Segment.Inline>
						<Form.TextArea
							className="largetext"
							name="name"
							value={name}
							onChange={this.onChange}
							size="big"
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
							<Label attached="top right" onClick={this.addPaper}>
								<Icon name="add" />
							</Label>
						</Segment>
						<Segment>
							<Label attached="top">Tasks</Label>
							<Label attached="top right" onClick={this.addTask}>
								<Icon name="add" />
							</Label>
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
	subject: PropTypes.string.isRequired,
	lesson: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	errors: state.lesson.errors,
	lesson: state.lesson.lesson,
	lessonId: state.lessons.current,
	subject: getCurentSubject(state)
});
export default connect(mapStateToProps, { ...lessonActions })(Lesson);
