import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Rate, Tooltip, Layout } from 'antd'
import DataTable, { ColumnType } from '../../components/Table/DataTable'
import { ProductsDtoOutput } from '../../services/product/dto/productsDtoOutput'
import productService from '../../services/product/productService'
import s from './myFavorites.module.scss'
import { ShoppingFilled, CloseSquareFilled } from '@ant-design/icons'
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu'
import { ProductDtoOutput } from '../../services/product/dto/productDtoOutput'

const { Content, Sider } = Layout;

const MyFavorites = () => {
  const [productsData, setProductsData] = useState<ProductDtoOutput[]>([])
  const { t } = useTranslation()
  const columns: ColumnType[] = [
    {
      key: 'title',
      title: t('title'),
      dataIndex: 'title',
      width: '15%',
    },
    {
      key: 'description',
      title: t('description'),
      dataIndex: 'description',
      width: '30%',
    },
    {
      key: 'price',
      title: t('price'),
      dataIndex: 'price',
      width: '10%',
      render: (price: number, rowData: any) => {
        return (
          <>
            <span className=''>${price}</span>
          </>
        )
      }
    },
    {
      key: 'rating',
      title: t('rating'),
      dataIndex: 'rating',
      width: '15%',
      render: (rating: number, rowData: any) => {
        return (
          <Tooltip key={rowData.id} placement="top" title={rating}>
            <span>
              <Rate key={rowData.id} allowHalf disabled defaultValue={rating} />
            </span>
          </Tooltip>
        )
      }
    },
    {
      key: 'stock',
      title: t('stock'),
      dataIndex: 'stock',
      width: '5%',
    },
    {
      key: 'brand',
      title: t('brand'),
      dataIndex: 'brand',
      width: '10%',
    },
    {
      key: 'action',
      title: t('action'),
      width: '15%',
      render: (rowData: any) => {
        return (
          <>
            <Tooltip placement="top" title={t('add_to_cart')}>
              <Button size='middle' icon={React.createElement(ShoppingFilled)} className={s.table__button} onClick={() => {
              }}></Button>
            </Tooltip>
            <Tooltip placement='top' title={t('remove_from_favorite')}>
              <Button danger size='middle' icon={React.createElement(CloseSquareFilled)} className={s.table__button} onClick={() => {
              }}></Button>
            </Tooltip>
          </>
        )
      }
    },
  ]

  useEffect(() => {
    productService.getAll().then((result: ProductsDtoOutput) => {
      setProductsData(result.products)
    })
  }, [])
  return (
    <Layout className='lighttheme'>
      <Sider className='sider__content'>
        <SidebarMenu />
      </Sider>
      <Layout>
        <Content className={s.lighttheme__myfavorites}>
          <h4 className={s.table__title}>{t('my_favorites')}</h4>
          <div className={s.table__content}>
            <DataTable columns={columns} data={productsData} />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MyFavorites