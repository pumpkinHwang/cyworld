import React, { useEffect, useState } from 'react'
import { Menu, Switch, Divider } from 'antd'
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined
} from '@ant-design/icons'

import './Menu.css'
const { SubMenu } = Menu

const CustomMenu = props => {
    const [mode, setMode] = React.useState('inline')
    const [theme, setTheme] = React.useState('dark')

    const changeMode = value => {
        setMode(value ? 'vertical' : 'inline')
    }

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light')
    }

    return (
        <Menu
            style={{ width: '250px', backgroundColor: '#374250' }}
            defaultSelectedKeys={['sidebar_menu_home']}
            defaultOpenKeys={['']}
            mode={mode}
            theme={theme}>
            {props.menu.map((item, index) => {
                if (item.children && item.children.length > 0) {
                    return (
                        <SubMenu
                            key={'sidebar_menu_' + item.name}
                            title={item.label}
                            style={{
                                backgroundColor: '#374250',
                                margin: 0,
                                padding: 0,
                                width: '250px'
                            }}>
                            {item.children.map((_item, _index) => {
                                const _key =
                                    'sidebar_submenu_' +
                                    item.name +
                                    '_' +
                                    _item.name

                                if (
                                    _item.children &&
                                    _item.children.length > 0
                                ) {
                                    return (
                                        <SubMenu key={_key} title={_item.label}>
                                            {_item.children.map(__item => {
                                                const key =
                                                    _key + '_' + __item.label
                                                return (
                                                    <Menu.Item
                                                        key={key}
                                                        onClick={() =>
                                                            props.onClick(
                                                                __item
                                                            )
                                                        }>
                                                        {__item.label}
                                                    </Menu.Item>
                                                )
                                            })}
                                        </SubMenu>
                                    )
                                }

                                return (
                                    <Menu.Item
                                        key={_key}
                                        onClick={() => props.onClick(_item)}>
                                        {_item.label}
                                    </Menu.Item>
                                )
                            })}
                        </SubMenu>
                    )
                }

                return (
                    <Menu.Item
                        key={'sidebar_menu_' + item.name}
                        style={{
                            backgroundColor: '#374250',
                            margin: 0
                        }}
                        onClick={() => props.onClick(item)}>
                        {item.label}
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}

export default CustomMenu
