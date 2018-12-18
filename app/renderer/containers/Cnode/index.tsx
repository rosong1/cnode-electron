import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import MenuView from '../../components/Menu'
import GoTopBtn from '../../components/GoTopBtn'
import routes from '@renderer/config/routes'
import { Route } from 'react-router-dom';

import "./index.less"
import "./cnode.less"
export interface CnodeProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STOURE_TODO]: TodoStore;
}

export interface CnodeState {
}

export default class Cnode extends React.Component<CnodeProps, CnodeState> {
  constructor(props: CnodeProps, context: any) {
    super(props, context);
  }
  private renderRoutes = (routes) => {
    const flat = (routes) => routes.reduce((prev, next) => (
      next.routes && next.routes.length > 0
        ? prev.concat(next, flat(next.routes))
        : prev.concat(next)
    ), [])
    const flatRoutes = flat(routes)
    
    return flatRoutes.map(item => {
        return <Route
          key={item.path}
          path={item.path}
          component={item.component}
          exact={item.exact}
        />
    })
  }

  render() {
    return (
      <div className="cnode-wrapper">
        <MenuView />
        <div className="cnode-routes-wrapper">
          {this.renderRoutes(routes)}
        </div>
        <GoTopBtn />
      </div>
    )
  }
}