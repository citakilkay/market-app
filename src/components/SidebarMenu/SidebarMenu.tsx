import React, { FC, useState } from "react";
import { Menu } from 'antd'
import s from './sidebarMenu.module.scss'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BarsOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const SidebarMenu = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('/products')
    const navigate = useNavigate()
    const { t } = useTranslation()

    const items = [
        {
            key: '/',
            label: t('product_list'),
            icon: React.createElement(BarsOutlined)
        },
        {
            key: '/my-favorites',
            label: t('my_favorites'),
            icon: React.createElement(HeartOutlined)
        }, {
            key: '/my-cart',
            label: t('my_cart'),
            icon: React.createElement(ShoppingCartOutlined)
        }
    ]
    return (
        <div className={s.lighttheme__sidebar}>
            <Menu theme='dark' mode='inline' items={items} className={s.sidebar__menu} activeKey={selectedMenuItem} onSelect={(e) => { setSelectedMenuItem(e.key); navigate(e.key) }} />
        </div>
    );
};

export default SidebarMenu