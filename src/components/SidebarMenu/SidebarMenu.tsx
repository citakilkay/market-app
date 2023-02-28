import React, { FC, useState } from "react";
import { Menu, MenuProps, Tag } from 'antd'
import s from './sidebarMenu.module.scss'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BarsOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/stores";

const SidebarMenu = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('/products')
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { myCart, myFavorites, common } = useAppSelector(state => state)

    const items: MenuProps['items'] = [
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
            label: <div>
                <span>
                    {t('my_cart')}
                </span>
                <Tag className={s.sidebar__tag} color="warning">${myCart.cartTotalPrice}</Tag>
            </div>,
            icon: React.createElement(ShoppingCartOutlined)
        }
    ]
    return (
        <div className={common.darkmode ? s.darktheme__sidebar : s.lighttheme__sidebar}>
            <Menu inlineCollapsed={false} theme='dark' mode='inline' items={items} className={s.sidebar__menu} activeKey={selectedMenuItem} onSelect={(e) => { setSelectedMenuItem(e.key); navigate(e.key) }} />
        </div>
    );
};

export default SidebarMenu