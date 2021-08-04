import React from 'react';
import Table from './Table';

export default {
  title: 'atoms/Table',
  component: Table,
};

const columns = [
  { title: 'NO', field: 'no' },
  { title: '공지여부', field: 'a' },
  { title: '권한', field: 'b' },
  { title: '제목', field: 'c' },
  { title: '첨부', field: 'd' },
  { title: '작성일', field: 'e' },
  { title: '수정', field: 'f' },
];

const rows = [
  { no: 1, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 2, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
  { no: 3, a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' },
];

const Template = args => <Table {...args} />;

export const BasicTable = Template.bind({});
BasicTable.args = {
  columns,
  data: rows,
};
