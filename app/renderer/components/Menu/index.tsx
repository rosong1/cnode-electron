import * as React from "react";
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import menuConfig from '@renderer/config/menu';

const SubMenu = Menu.SubMenu;
import "./index.less"

interface MenuViewProps { }

interface MenuViewState { }

export default class MenuView extends React.Component<MenuViewProps, MenuViewState> {
    constructor(props) {
        super(props);
    }

    private renderMenu = (menu) => {
        const renderItem = (item) => {
            const hasChildRoutes = item.routes && item.routes.length > 0
            const ItemBody = (item) => <span>{item.icon && <Icon type={item.icon} />}<span>{item.name}</span></span>
            const _MenuItem = (item) => <Menu.Item key={item.path}><Link to={item.path}>{ItemBody(item)}</Link></Menu.Item>
            return hasChildRoutes
                ? (
                    <SubMenu key={item.path} title={ItemBody(item)}>
                        {item.routes.map(_MenuItem)}
                    </SubMenu>
                    )
                : (_MenuItem(item))
        }
        return menu.map(renderItem)
    }

    render() {
        const hashPath = window.location.hash.split("#")[1]
        const selectedKey = hashPath === "/" ? menuConfig[0].routes[0].path : hashPath
        return (<div className="cnode-menu-wrapper">
            {/* <div className="avatar-wrapper" style={{ color: "#fff" }}>这是一个头像</div> */}
            <Menu
                defaultSelectedKeys={[selectedKey]}
                defaultOpenKeys={[menuConfig[0].path]}
                mode="inline"
                theme="dark"
            >
                {this.renderMenu(menuConfig)}
            </Menu>
        </div>)
    }
}
