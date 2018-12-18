import * as React from "react";
import { getTopicsDetail } from '@renderer/services'
import "./index.less"
import Tag from "@renderer/components/Tag"
import {resetScroll} from '@renderer/util/global'


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
            data: {}
        }
    }
    async componentDidMount() {
        resetScroll()
        const { topicId } = this.props.match.params
        const res = await getTopicsDetail(topicId)
        this.setState({ data: res.data })
    }

    render() {
        console.error("this.state.data ", this.state.data)
        return <div className="topic-detail-wrapper" >
            <div className="topic-detail-title">
                <Tag name="置顶" isHighLight={true}></Tag>
                <h3>{this.state.data.title}</h3>
            </div>
            <div 
                className="topic-detail-content" 
                dangerouslySetInnerHTML={{ 
                    __html: this.state.data && addProtol(this.state.data.content) }}>
            </div>
        </div>;
    }
}
