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
    ups: any[]; // 点赞id
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
                
                <div className="commentlist-content">
                    <div className="top">
                        <div className="left">
                            <img className="avatar" src={'https://avatars1.githubusercontent.com/u/34055216?v=4&s=120'} alt="用户头像" />
                            <strong className="author-name">lovevfp</strong>
                            <span className="anchor">6楼·19 天前</span>
                            <span className="tag tag-highlight">作者</span>
                        </div>
                        <div className="right">👍 6</div>
                        
                    </div>
                    <div className="bottom"><p>基本测试一定要有，更重要的是代码本身的质量，我的习惯是尽量每个函数写得语义清晰，比较关键的函数的旁边都附带针对该函数的测试函数。有两个作用：1）测试；2）给人看，对应函数怎么用。</p></div>
                </div>
            </div>
        </div>;
    }
}
