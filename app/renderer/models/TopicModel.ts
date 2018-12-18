// import { observable } from 'mobx';

interface Iauthor {
  avatar_url: string,
  loginname: string,
}

export class TopicModel {
  readonly author: Iauthor;
  readonly author_id: string;
  readonly content: string;
  readonly create_at: string;
  readonly good: boolean;
  readonly id: string;
  readonly last_reply_at: string;
  readonly reply_count: number;
  readonly tab: string;
  readonly title: string;
  readonly top: boolean;
  readonly visit_count: number;

  constructor(props) {
  }
}

export default TopicModel;
