import { requestAsync } from '../../../utils/rest';
import _ from 'lodash';

/** @ ==>  _ 로 치환 */
const serviceName = 'unishop@faq';

const loadApi = async (params = {}) => await requestAsync(`LOAD_${serviceName.toUpperCase()}`, params);

const createApi = async params => await requestAsync(`INSERT_${serviceName.toUpperCase()}`, params);

const updateApi = async params => await requestAsync(`UPDATE_${serviceName.toUpperCase()}`, params);

const deleteApi = async params => await requestAsync(`DELETE_${serviceName.toUpperCase()}`, params);

const queryApi = async props => {
  const { type, params } = props;
  console.log('params', params);
  let query;
  if (type === 'load') {
    query = {
      sql: `select faq.* 
                 , ctg.category category_name
                 , file.original_file_name
                 , file.s3_url
              from unishop_faq faq
             inner join unishop_category ctg
                on faq.category = ctg.id
	             and ctg.type = 'F'
              left join unishop_file file
                on faq.attachId = file.bitly
             where faq.delYn = 'N'
               and ctg.delYn = 'N'
               and faq.useYn = 'Y'
               and faq.permission in ('0','${params.permission}')
              ${params.title ? `and replace(faq.title,' ','') like replace('%${params.title}%',' ','')` : ''}
              ${params.category ? `and faq.category = ${params.category}` : ''}
              order by faq.id desc`,
    };
  } else if (type === 'del') {
    query = {
      sql: `update unishop_faq 
               set delYn = 'Y'
                 , updatedBy = '${params.updatedBy}'
                 , updatedAt = sysdate()
             where id = ${params.id}`,
    };
  } else if (type === 'detail') {
    query = {
      sql: `select faq.* 
                 , file.original_file_name as attach_original_file_name 
              from unishop_faq faq
              left join unishop_file file
                on faq.attachId = file.bitly
             where faq.id = ${params.id}`,
    };
  } else if (type === 'insert') {
    query = {
      sql: `insert into unishop_faq (title, category, contents, permission, createdBy, createdAt, useYn, attachId)
                             values ('${params.title}', ${params.category},'${params.contents}', ${params.permission}
                                   , '${params.createdBy}', sysdate(), '${params.useYn}', ${!_.isEmpty(params.attachParams) ? `'${params.attachParams.bitly}'` : ''})`,
    };
  } else if (type === 'update') {
    query = {
      sql: `update unishop_faq 
               set title = '${params.title}'
                 , category = '${params.category}'
                 , contents = '${params.contents}'
                 , permission = '${params.permission}'
                 , useYn = '${params.useYn}'
                 , updatedBy = '${params.updatedBy}'
                 , updatedAt = sysdate()
                 ${!_.isEmpty(params.attachParams) ? `,attachId = '${params.attachParams.bitly || ''}'` : ''}
             where id = ${params.id}`,
    };
  }

  try {
    return await requestAsync('QUERY_SQL', query);
  } catch (err) {}
};
const service = {
  load: loadApi,
  create: createApi,
  update: updateApi,
  delete: deleteApi,
  query: queryApi,
};

export default service;
