import React, { FC, useState } from "react";
import { Menu, MenuTheme } from 'antd'
import { MenuProps } from "antd/lib/menu";

// This component will be used for sidebar, header and mobile menu
export interface MenuItem {
    key: string
    text: string
    link?: string
    icon?: React.ReactNode
}

type Props = {
    menuItems: MenuItem[]
    mode: MenuProps['mode']
    selectedKeys: string[]
} & MenuProps;

const Navbar: FC<Props> = ({ menuItems, mode, selectedKeys, ...rest }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('')
    return (
        <Menu mode={mode} selectedKeys={selectedKeys} {...rest} />
    );
};

export default Navbar