import * as React from "react";
import './card.less'
import { TopicModel } from "@renderer/models";
import { withRouter } from "react-router-dom";
import Tag, {isHighLightTag, getTagName} from "@renderer/components/Tag"

interface CardProps {
    history?: any;
    dataSource: TopicModel;
}

interface CardState {}

interface TimeType {
    type: string,
    time: number
}

const getTimeTip = (d: Date): string => {
    const tipMap = {
        second: (n) => `${n}秒前`,
        minute: (n) => `${n}分钟前`,
        hour: (n) => `${n}小时前`,
        day: (n) => `${n}天前`,
        month: (n) => `${n}月前`,
        year: (n) => `${n}年前`,
    }

    const getTimeType = (d: Date): TimeType => {
        const now = new Date()

        let time = 1

        if ((time = now.getTime() - d.getTime()) <= 0) {
            return { type: 'second', time: 1 }
        } else if ((time = now.getFullYear() - d.getFullYear()) >= 1) {
            return { type: 'year', time }
        } else if ((time = now.getMonth() - d.getMonth()) >= 1) {
            return { type: 'month', time }
        } else if ((time = now.getDate() - d.getDate()) >= 1) {
            return { type: 'day', time }
        } else if ((time = now.getHours() - d.getHours()) >= 1) {
            return { type: 'hour', time }
        } else if ((time = now.getMinutes() - d.getMinutes()) >= 1) {
            return { type: 'minute', time }
        } else {
            return { type: 'second', time }
        }
    }

    const { type, time } = getTimeType(d)
    const tip = tipMap[type](time)
    return tip
}

@withRouter
export default class Card extends React.Component<CardProps, CardState> {
    constructor(props) {
        super(props);
    }

    render() {
        const {dataSource} = this.props
        return (
            <div className="cnode-card" onClick={e => {
                this.props.history.push(`/topic/${dataSource.id}`)
            }}>
                <div className="cnode-card-top">
                    <div className="avatar-wrapper">
                        <img src={dataSource.author && dataSource.author.avatar_url} alt="用户头像" />
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">{dataSource.title}</h4>
                    </div>
                    <Tag 
                        name={getTagName(dataSource)}
                        isHighLight={isHighLightTag(dataSource)}
                    ></Tag>
                </div>
        
                <div className="cnode-card-bottom">
                    <div className="card-btm-item">浏览量：{dataSource.visit_count}</div>
                    <div className="card-btm-item">回复量：{dataSource.reply_count}</div>
                    <div className="card-btm-item">{getTimeTip(new Date(dataSource.last_reply_at))}</div>
                </div>
            </div>
        )
    }
}
