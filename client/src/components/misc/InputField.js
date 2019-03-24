import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';

class InputField extends Component {
	getInputField = () => {
		const { name, label, icon, value, errors, noLabel, onChange, type } = this.props;
		const isError = errors.hasOwnProperty(name);
		const props = noLabel ? {} : { label };
		const input = (
			<Form.Input
				key={name}
				name={name}
				{...props}
				icon={icon}
				type={type}
				iconPosition="left"
				placeholder={label}
				value={value}
				onChange={onChange}
				error={isError}
			/>
		);
		if (isError) return [ input, <Message key={`msg${name}`} error content={errors[name]} /> ];
		else return input;
	};
	render() {
		return this.getInputField();
	}
}

export default InputField;
