import React from 'react';
import Search from './Search';

export default {
  title: 'atoms/Search',
  component: Search,
};

const Template = args => <Search {...args} />;

export const BasicSearch = Template.bind({});
BasicSearch.args = {};

export const DisabledSearch = Template.bind({});
DisabledSearch.args = {
  disabled: true,
};

export const EventSearch = Template.bind({});
EventSearch.args = {
  onChange(e) {
    console.log('onChange', e);
  },
  onSearch(e) {
    console.log('onSearch', e);
  },
  onReset(e) {
    console.log('onReset', e);
  },
};
