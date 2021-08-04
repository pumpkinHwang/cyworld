import { requestAsync } from '../../../utils/rest';

/** @ ==>  _ 로 치환 */
const serviceName = 'unishop@category';

const loadApi = async (params = {}) => await requestAsync(`LOAD_${serviceName.toUpperCase()}`, params);

const createApi = async params => await requestAsync(`INSERT_${serviceName.toUpperCase()}`, params);

const updateApi = async params => await requestAsync(`UPDATE_${serviceName.toUpperCase()}`, params);

const deleteApi = async params => await requestAsync(`DELETE_${serviceName.toUpperCase()}`, params);

const queryApi = async props => {
  const { gb, params } = props;
  let query;

  if(gb === 'deleteChk') {
    query = { sql : `select * 
                       from unishop_category 
                      where 1=1 
                        and upId= '${params.upId}' 
                        and type = '${params.type}'
                        and delYn = 'N'`
            };  
  } else if(gb === 'saveChk') {
    query = { sql : `select *
                       from unishop_category
                      where type = '${params.type}'
                        and category = '${params.category}'
                        and delYn = 'N'`

    }
  } else if(gb === 'load') {
    query = { sql : `select *
                       from unishop_category
                      where type = '${params.type}'
                        and delYn = 'N'
                      order by orderId, id`
    };
  } else if(gb === 'deleteFAQChk') {
    query = { sql : `select * 
                       from unishop_faq
                      where category = '${params.category}'
                        and delYn = 'N'`
    }
  } else if (gb === '1depthLoad') {
    query = {
      sql: `select * 
              from unishop_category
            where type = 'P'
              and delYn = 'N'
              and upId = ''
              order by orderId, id`,
    };
  }

  try {
    return await requestAsync(`QUERY_SQL`, query);
  } catch (err) {}
};

const service = {
  load: loadApi,
  create: createApi,
  update: updateApi,
  delete: deleteApi,
  query: queryApi
};

export default service;
