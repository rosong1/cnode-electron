import * as React from "react";
import { withRouter } from "react-router-dom";
import "./index.less"

interface BackBtnProps {
    history?: any;
}


@withRouter
export default class BackBtn extends React.Component<BackBtnProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="back-btn" onClick={() => this.props.history.goBack()}>◀</div>;
    }
}
