import * as React from "react";
import { Link } from 'react-router-dom';


interface NotFoundViewProps {}

interface NotFoundViewState {}

export default class NotFound extends React.Component<NotFoundViewProps, NotFoundViewState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div><Link to="/">找不到对应页面</Link></div>;
    }
}
