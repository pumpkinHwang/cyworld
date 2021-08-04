import React from 'react';
import Switch from './Switch';

export default {
  title: 'atoms/Switch',
  component: Switch,
};

const Template = args => <Switch {...args} />;

export const BasicSwitch = Template.bind({});
BasicSwitch.args = {
};

export const DisabledSwitch = Template.bind({});
DisabledSwitch.args = {
};

