import './index.less'
import * as React from "react";
import * as classNames from 'classnames';
import { TopicModel } from "@renderer/models";

export const isHighLightTag = (props: TopicModel): boolean => props.good || props.top

export const getTagName = (props: TopicModel): string => {
    const TOP = "置顶"
    const GOOD = "精华"
    const ASK = "问答"
    const SHARE = "分享"

    const normalMap = {
        ask: ASK,
        share: SHARE
    }

    if (props.top) return TOP
    if (props.good) return GOOD

    return normalMap[props.tab] || ''
}
const Tag = ({ name = "", isHighLight = false }) => {
    return (<div className={classNames({
        "tag": true,
        "tag-highlight": isHighLight
    })}>{name}</div>)
}

export default Tag