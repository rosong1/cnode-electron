import * as React from "react";
import "./index.less"
import {classNames} from '@renderer/util/index'
import {fixImgUrl} from '@renderer/util/index'

interface CommentListProps {
    dataSource: CommentItem[];
}

interface CommentItem {
    author: {avatar_url: string, loginname: string}; // 作者信息
    content: string; // html内容
    create_at: string; // 评论时间
    id: string;
    is_uped: boolean; // 是否点赞
    reply_id: null | string;
    ups: any[]; // 点赞id
}
const findHtmlImgUrl = (htmlStr: string): string => {
    const reg = /[\s\n\t]*src=\"([^\"]+)\"/g
    if (!reg.test(htmlStr)) return htmlStr;
    return htmlStr.replace(reg, (full, imgUrl) => ` src="${fixImgUrl(imgUrl)}"`)
}
export default class CommentList extends React.Component<CommentListProps, {}> {
    constructor(props) {
        super(props);
    }
    renderCommentItem(data: CommentItem, idx: number): React.ReactNode {
        return (
            <div className={`commentlist-item ${classNames({uped: data.is_uped})}`} key={data.id}>
                <div className="commentlist-content">
                    <div className="top">
                        <div className="left">
                            <img className="avatar" src={data.author.avatar_url} alt="用户头像" />
                            <strong className="author-name">{data.author.loginname}</strong>
                            <span className="anchor">{idx + 1}楼·19 天前</span>
                            <span className="tag tag-highlight">作者</span>
                        </div>
                        {data.ups.length ? <div className="right">👍 {data.ups.length}</div> : null}
                        </div>
                    <div className="bottom" dangerouslySetInnerHTML={{__html: findHtmlImgUrl(data.content)}}/>
                </div>
            </div>
        )
    }
    render() {
        const {dataSource = []} = this.props
        if (!dataSource || !dataSource.length) return null

        return <div className="commentlist">
            <div className="commentlist-header">
                {dataSource.length} 回复
            </div>
            {dataSource.map(this.renderCommentItem)}
        </div>;
    }
}
