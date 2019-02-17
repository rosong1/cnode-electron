import * as React from "react";
import { getTopicsDetail } from '@renderer/services'
import "./index.less"
import Tag, {isHighLightTag, getTagName} from "@renderer/components/Tag"
import BackBtn from "@renderer/containers/TopicDetail/BackBtn"
import CommentList from "./CommentList"

import {resetScroll} from '@renderer/util/global'
import {fixImgUrl} from '@renderer/util/index'


interface TopicDetailProps {
    match: any;
}

interface TopicDetailState {
    data: any;
}

const addProtol = (str: string): string => {
    const reg = /\/\/static.cnodejs.org/g
    return reg.test(str) ? str.replace(reg, ($1) => `http:${$1}`) : str
}

export default class TopicDetail extends React.Component<TopicDetailProps, TopicDetailState> {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                replies: [],
            }
        }
    }
    async componentDidMount() {
        resetScroll()
        const { topicId } = this.props.match.params
        const {data = {} } = await getTopicsDetail(topicId)
        const detailData = {...data, author: {
            ...data.author,
            avatar_url: fixImgUrl(data.author.avatar_url)
        }}
        this.setState({ data: detailData })
    }

    render() {
        const {replies} = this.state.data
        return <div className="topic-detail-wrapper" >
                <BackBtn />

            <div className="topic-detail-title">
                <Tag name={getTagName(this.state.data)} isHighLight={isHighLightTag(this.state.data)}></Tag>
                <h3>{this.state.data.title}</h3>
            </div>
            <div 
                className="topic-detail-content" 
                dangerouslySetInnerHTML={{ 
                    __html: this.state.data && addProtol(this.state.data.content) }}>
            </div>
            <CommentList dataSource={replies}></CommentList>
        </div>;
    }
}
