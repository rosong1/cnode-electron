import * as React from "react";
import { TopicModel } from '@renderer/models'

import Card from '@renderer/containers/Home/components/Card'
interface IProps {
    topics: TopicModel[]
}

interface IState {
}

export default class HomeView extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    private renderCardList = (): React.ReactNode => {
        const topics: TopicModel[] = this.props.topics;
        if (!Array.isArray(topics)) return null;

        return topics.length > 0 
            ? topics.map(topic => <Card key={topic.id} dataSource={topic}></Card>)
            : []
    }

    render() {
        return (<div className="home-wrapper">
            {this.renderCardList()}
        </div>)
    }
}
