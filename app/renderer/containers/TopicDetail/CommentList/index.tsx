import * as React from "react";
import "./index.less"
import {classNames} from '@renderer/util/index'

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
    ups: Array<any>; // 点赞id
}

export default class CommentList extends React.Component<CommentListProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const {dataSource = []} = this.props
        if (!dataSource || !dataSource.length) return null

        return <div className="commentlist">
            <div className="commentlist-header">
                {dataSource.length} 回复
            </div>
            <div className={`commentlist-item ${classNames({uped: true})}`}>
                <div className="avatar-wrapper">
                    <img src={''} alt="用户头像" />
                </div>
                <div className="commentlist-content">
                    <div className="top">
                        <div className="left">
                            <span className="author-name">lovevfp</span>
                            <span className="anchor">6楼·19天前</span>
                            <span className="tag">作者</span>
                        </div>
                        <div className="right">点赞 6</div>
                        
                    </div>
                    <div className="bottom"></div>
                </div>
            </div>
        </div>;
    }
}
