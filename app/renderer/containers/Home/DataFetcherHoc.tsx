import * as React from "react";
import { getTopics } from '@renderer/services'
import { TopicModel } from '@renderer/models'
import {fixImgUrl} from '@renderer/util/index'

interface HomeState {
    topics: TopicModel[]
}
const dataFetcherHoc = (tab = '') => {
    return (WrapComponent) => class dataFetcherHoc extends React.Component<any, HomeState> {
        constructor(props) {
            super(props)
            this.state = {
                topics: []
            }
        }

        async componentDidMount() {
            const topics = tab ? await getTopics({tab}) : await getTopics()
            const data = topics.data.map(item => ({...item, author: {
                ...item.author,
                avatar_url: fixImgUrl(item.author.avatar_url)
            }}))
            this.setState({topics: data})
        }

        render() {
            return (<WrapComponent topics={this.state.topics}/>)
        }
    } 
}

export default dataFetcherHoc