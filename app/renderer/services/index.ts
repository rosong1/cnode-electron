import { apiGet, apiPost } from './config'

/**
 * @desc 主题首页
 */
export const getTopics = (params: object = {}): Promise<any> => apiGet(`/topics`, params)

/**
 * @desc 主题详情
 */
export const getTopicsDetail = (id: string, params: object = {}): Promise<any> => apiGet(`/topic/${id}`, params)

/**
 * @desc 新建主题
 */
export const createTopics = (params: object = {}): Promise<any> => apiPost(`/topics`, params)

/**
 * @desc 编辑主题
 */
export const emitTopics = (params: object = {}): Promise<any> => apiPost(`/topics/update`, params)

/**
 * @desc 收藏主题
 */
export const collectTopics = (params: object = {}): Promise<any> => apiPost(`/topic_collect/collect`, params)

/**
 * @desc 取消主题收藏
 */
export const cancelCollect = (params: object = {}): Promise<any> => apiPost(`/topic_collect/de_collect`, params)

/**
 * @desc 新建评论
 */
export const createReply = (topic_id: string, params: object = {}): Promise<any> => apiPost(`/topic/${topic_id}/replies`, params)

/**
 * @desc 点赞某评论
 */
export const upReply = (reply_id: string, params: object = {}): Promise<any> => apiPost(`/reply/${reply_id}/ups`, params)

/**
 * @desc 用户详情
 */
export const getUserInfo = (name: string): Promise<any> => apiGet(`/user/${name}`)

/**
 * @desc 验证 accessToken 的正确性
 */
export const validAccesstoken = (accesstoken: string): Promise<any> => apiPost(`/accesstoken`, { accesstoken })

/**
 * @desc 获取未读消息数
 */
export const getUnReadMsg = (accesstoken: string): Promise<any> => apiGet(`/message/count`, { accesstoken })

/**
 * @desc 获取已读消息数
 */
export const getReadedMsg = (accesstoken: string, mdrender: string = 'false'): Promise<any> => apiGet(`/messages`, { accesstoken, mdrender })

/**
 * @desc 标记全部已读
 */
export const markAllMsg = (accesstoken: string): Promise<any> => apiPost(`/message/mark_all`, { accesstoken })

/**
 * @desc 标记单个消息已读
 */
export const markMsg = (accesstoken: string, msg_id: string): Promise<any> => apiPost(`/message/mark_one/${msg_id}`, { accesstoken })
