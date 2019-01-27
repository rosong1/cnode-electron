import * as React from "react"
import { getTopics } from '@renderer/services'
import { TopicModel } from '@renderer/models'

import Card from '@renderer/containers/Home/components/Card'
interface IProps {}

interface IState {
    topics: TopicModel[]
}

export default class Ask extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            topics: []
        }
    }

    async componentDidMount() {
        const topics = await getTopics({tab: 'ask'})
        const fixImgUrl = (url: string): string => {
            return url.indexOf('http') !== -1
                ? url
                : `https:${url}`
        }
        const data = topics.data.map(item => ({...item, author: {
            ...item.author,
            avatar_url: fixImgUrl(item.author.avatar_url)
        }}))
        this.setState({topics: data})
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
