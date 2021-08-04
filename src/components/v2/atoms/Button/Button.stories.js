import React from 'react';
import Button from './Button';

export default {
  title: 'atoms/Button',
  component: Button,
};

const Template = args => <Button {...args} />;

export const BasicButton = Template.bind({});
BasicButton.args = {
  children: '버튼명',
};

export const CustomTypeButton = Template.bind({});
CustomTypeButton.args = {
  children: '커스텀',
  style:{width:300, height: 40, background: 'green' }
};

export const RegistTypeButton = Template.bind({});
RegistTypeButton.args = {
  type: 'regist',
};

export const MoreTypeButton = Template.bind({});
MoreTypeButton.args = {
  type: 'more',
};

export const SaveTypeButton = Template.bind({});
SaveTypeButton.args = {
  type: 'save',
};

export const DeleteTypeButton = Template.bind({});
DeleteTypeButton.args = {
  type: 'delete',
};

export const ListTypeButton = Template.bind({});
ListTypeButton.args = {
  type: 'list',
};

export const TableDeleteTypeButton = Template.bind({});
TableDeleteTypeButton.args = {
  type: 'tableDelete',
};

export const TableEditTypeButton = Template.bind({});
TableEditTypeButton.args = {
  type: 'tableEdit',
};

export const AddTypeButton = Template.bind({});
AddTypeButton.args = {
  type: 'add',
};

export const TableDownloadTypeButton = Template.bind({});
TableDownloadTypeButton.args = {
  type: 'tableDownload',
};

export const DownloadTypeButton = Template.bind({});
DownloadTypeButton.args = {
  type: 'Download',
};

