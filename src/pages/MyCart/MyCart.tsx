import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Rate, Tooltip, Layout } from 'antd'
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu'
import s from './myCart.module.scss'
import CardCustom from '../../components/CardCustom/CardCustom'

const { Content, Sider } = Layout;

const MyCart = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Sider>
        <SidebarMenu />
      </Sider>
      <Layout>
        <Content className={s.lighttheme__myCart}>
          <h4 className={s.table__title}>{t('my_cart')}</h4>
          <div className={s.table__content}>
            <CardCustom />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MyCart