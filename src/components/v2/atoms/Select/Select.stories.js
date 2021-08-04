import React from 'react';
import Select from './Select';

export default {
  title: 'atoms/Select',
  component: Select,
};

const data = [
  { label: 'first', value: 1 },
  { label: 'two', value: 2 },
  { label: 'three', value: 3 },
];

const data2 = [
  { label: 'first2', value: 1 },
  { label: 'two2', value: 2, disabled: true },
  { label: 'three2', value: 3, disabled: true },
];

const Template = args => <Select {...args} options={data} />;

export const BasicSelect = Template.bind({});
BasicSelect.args = {
  options: data,
};

export const DisabledSelect = Template.bind({});
DisabledSelect.args = {
  options: data,
  disabled: true,
};

export const OnChangeSelect = Template.bind({});
OnChangeSelect.args = {
  options: data,
  onChange(e) {
    console.log('e', e);
  },
};

export const DisabledSelect2 = () => {
  return <Select options={data2} />;
};
