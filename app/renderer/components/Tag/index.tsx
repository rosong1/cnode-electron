import './index.less'
import * as React from "react";
import * as classNames from 'classnames';

const Tag = ({ name = "", isHighLight = false }) => {
    return (<div className={classNames({
        "tag": true,
        "tag-highlight": isHighLight
    })}>{name}</div>)
}

export default Tag