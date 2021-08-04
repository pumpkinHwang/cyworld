/* eslint-disable no-return-await */
import _ from 'lodash'
import { requestAsync } from '../../../utils/rest'

/** @ ==>  _ 로 치환 */
const serviceName = 'unishop@notice'

const loadApi = async (params = {}) =>
    await requestAsync(`LOAD_${serviceName.toUpperCase()}`, params)

const createApi = async params =>
    await requestAsync(`INSERT_${serviceName.toUpperCase()}`, params)

const updateApi = async params =>
    await requestAsync(`UPDATE_${serviceName.toUpperCase()}`, params)

const deleteApi = async params =>
    await requestAsync(`DELETE_${serviceName.toUpperCase()}`, params)

const queryApi = async props => {
    const { type, params } = props
    let query
    console.log('type', type)
    console.log('params', params)
    if (type === 'load') {
        query = {
            sql: `select * from unishop_notice
      where del_yn = 'n'
      and visible_yn = 'y'
      ${
          params.title
              ? `and replace(title,' ','') like replace('%${params.title}%',' ','')`
              : ''
      }
      ${
          params.permission === '2'
              ? 'and (permission = 2 or permission = 0)'
              : params.permission && params.permission === '1'
              ? `and (permission = 1 or permission = 0)`
              : ``
      }
      order by top_yn desc, create_dt desc`
        }
    } else if (type === 'orderChange') {
        query = {
            sql: `update unishop_youtube set
      youtube_order = case
      when id = ${params[0].id} then ${params[0].youtube_order}
      when id = ${params[1].id} then ${params[1].youtube_order}
      end
      where
      id in(${params[0].id}, ${params[1].id})`
        }
    } else if (type === 'del') {
        query = {
            sql: `update unishop_notice set
      del_yn = "y"
      where
      id = ${params.id}`
        }
    } else if (type === 'detail') {
        query = {
            sql: `select
      a.*
      , b.original_file_name as attach_original_file_name
      , b.s3_url as s3_url
      from
      unishop_notice a
      left join unishop_file b on a.attach_id = b.bitly
      left join unishop_file c on a.image_id = c.bitly
      where
      a.id = ${params.id}`
        }
    } else if (type === 'insert') {
        query = {
            sql: `insert into unishop_notice
      (title
        , context
        , visible_yn
        , top_yn
        , del_yn
        , permission
        , create_dt
        , update_dt
        , attach_id
        , image_id
        )
      values
      ('${params.title}'
      , '${params.context}'
      , '${params.visibleYn}'
      , '${params.topYn}'
      , 'n'
      , '${params.permission}'
      , sysdate()
      , sysdate()
      , ${
          !_.isEmpty(params.attachParams)
              ? `'${params.attachParams.bitly}'`
              : ''
      }
      , ${!_.isEmpty(params.imageParams) ? `'${params.imageParams.bitly}'` : ''}
      )`
        }
    } else if (type === 'update') {
        query = {
            sql: `update unishop_notice
      set
      title = '${params.title}'
      ,context = '${params.context}'
      ,visible_yn = '${params.visibleYn}'
      ,top_yn = '${params.topYn}'
      ,permission = '${params.permission}'
      ,update_dt = sysdate()
      ${
          params.attachParams
              ? `,attach_id = '${params.attachParams.bitly || ''}'`
              : ''
      }
      ${
          params.imageParams
              ? `,image_id = '${params.imageParams.bitly || ''}'`
              : ''
      }
      where
      id = ${params.id}`
        }
    } else if (type === 'updateTopYn') {
        query = {
            sql: `update unishop_notice
      set
      top_yn = '${params.topYn}'
      ,update_dt = sysdate()
      where
      id = ${params.id}`
        }
    } else if (type === 'fileInsert') {
        query = {
            sql: `update unishop_notice
      set
      title = '${params.title}'
      ,context = '${params.context}'
      ,visible_yn = '${params.visibleYn}'
      ,top_yn = '${params.topYn}'
      ,update_dt = sysdate()
      where
      id = ${params.id}`
        }
    } else if (type === 'homeLoad') {
        query = {
            sql: `select * from unishop_notice
      where del_yn = 'n'
        and visible_yn = 'y'
        and permission in ('0','${params.permission}')
      order by top_yn desc,create_dt desc`
        }
    }

    try {
        return await requestAsync('QUERY_SQL', query)
    } catch (err) {}
}
const service = {
    load: loadApi,
    create: createApi,
    update: updateApi,
    delete: deleteApi,
    query: queryApi
}

export default service
