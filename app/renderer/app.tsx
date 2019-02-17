import * as React from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { TodoApp } from './containers/TodoApp';
import Cnode from './containers/Cnode';
import NotFound from './containers/NotFound';

class Root extends React.Component<any, any> {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools />;
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
        {/* {this.renderDevTool()} */}
      </div>
    );
  }
}

export const App = hot(module)(({ history }) => (
  <Root>
    <HashRouter history={history}>
      <Switch>

        <Route path="/" component={Cnode} />
        <Redirect from="/" to="/home/all"/>

        {/* <Route path="/todo" component={TodoApp} /> */}
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  </Root>
))
