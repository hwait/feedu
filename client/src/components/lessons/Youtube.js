import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Label, Button, Input, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { actions as lessonActions } from '../../reducers/lesson';

class Youtube extends Component {
	youtubeLoad = () => {
		console.log('youtubeLoad', this.props.index, this.props.youtube.link);
		this.props.youtubeLoad(this.props.index, this.props.youtube.link);
	};
	youtubeRemove = () => {
		console.log('youtubeRemove', this.props.index);
		this.props.youtubeRemove(this.props.index);
	};
	onChange = (e) => {
		this.props.youtubeChange(this.props.index, e.target.value);
	};
	render() {
		const { link, name, dur, loading } = this.props.youtube;
		return (
			<Segment loading={loading}>
				<Form.Field
					value={link}
					control={Input}
					onChange={this.onChange}
					label="Youtube video link"
					placeholder="Search link..."
					action={<Button icon="search" onClick={() => this.youtubeLoad()} color="teal" />}
				/>
				<Label as="a" corner="right" icon="remove" onClick={this.youtubeRemove} color="red" size="tiny" />
				<Segment.Inline>
					{name === '' || (
						<Label horizontal basic>
							{name}
						</Label>
					)}
					{dur === '' || <Label horizontal>{dur} m.</Label>}
				</Segment.Inline>
			</Segment>
		);
	}
}
export default connect(null, { ...lessonActions })(Youtube);
