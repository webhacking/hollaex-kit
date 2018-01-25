import React from 'react';
import { Field } from 'redux-form';
import InputField from './FormFields/InputField';
import TextAreaField from './FormFields/TextAreaField';
import FileField from './FormFields/FileField';
import DropdownField from './FormFields/DropdownField';
import DateField from './FormFields/DateField';
import DropdownDateField from './FormFields/DropdownDateField';
import CheckField from './FormFields/CheckField';
import EditableInputField from './FormFields/EditableInputField';
import CaptchaField from './FormFields/Captcha';

const renderFields = (fields = {}) => {
	return (
		<div>
			{Object.keys(fields).map((key, index) => {
				const { type, validate = [], ...rest } = fields[key];
				const commonProps = {
					key,
					name: key,
					type,
					validate,
					...rest
				};

				switch (type) {
					case 'captcha':
						return (
							<Field
								component={CaptchaField}
								{...commonProps}
							/>
						);
					case 'hidden':
						return (
							<Field
								component={() => <div className="hidden" />}
								{...commonProps}
							/>
						);
					case 'file':
						return <Field component={FileField} {...commonProps} />;
					case 'select':
					case 'autocomplete':
						return (
							<Field
								component={DropdownField}
								autocomplete={type === 'autocomplete'}
								{...commonProps}
							/>
						);
					case 'date-dropdown':
						return <Field component={DropdownDateField} {...commonProps} />;
					case 'date':
						return <Field component={DateField} {...commonProps} />;
					case 'checkbox':
						return <Field component={CheckField} {...commonProps} />;
					case 'editable':
						return <Field component={EditableInputField} {...commonProps} />;
					case 'textarea':
						return <Field component={TextAreaField} {...commonProps} />;
					case 'text':
					case 'password':
					case 'email':
					default:
						return <Field component={InputField} {...commonProps} />;
				}
			})}
		</div>
	);
};

export default renderFields;
