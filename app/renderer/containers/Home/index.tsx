import * as React from "react";
import { getTopics } from '@renderer/services'
import { TopicModel } from '@renderer/models'

import Card from './Card'
interface HomeProps {}

interface HomeState {
    topics: TopicModel[]
}

export default class Home extends React.Component<HomeProps, HomeState> {
    constructor(props) {
        super(props);
        this.state = {
            topics: []
        }
    }

    async componentDidMount() {
        const topics = await getTopics()
        this.setState({topics: topics.data})
    }

    private renderCardList = (topics: TopicModel[]) => {
        return topics.length > 0 
            ? topics.map(topic => <Card key={topic.id} dataSource={topic}></Card>)
            : []
    }

    render() {
        return (<div className="home-wrapper">
            {this.renderCardList(this.state.topics)}
        </div>)
    }
}
