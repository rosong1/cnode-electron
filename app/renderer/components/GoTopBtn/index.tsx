import './index.less'
import * as React from "react";
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class GoTopBtn extends React.Component<any, {opacity: number}> {
    // 透明度
    @observable public opacity = 0
    // 视图高度
    public clientHeight: number = 0
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.clientHeight = document.documentElement.clientHeight;
        window.addEventListener('scroll', this.scrollEvent)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollEvent)
    }
    scrollEvent = (e) => {
        return window.requestAnimationFrame(() => 
            this.opacity = Number((window.scrollY / this.clientHeight).toFixed(2))
        )
    }
    private toTop = () => {
        window.scrollTo(0, 0);
    }
    render() {
        return (<div style={{opacity: this.opacity}} className="goback-btn" onClick={this.toTop}>
            回到顶部
        </div>)
    }
}

export default GoTopBtn