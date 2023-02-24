import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Rate, Tooltip, Layout } from 'antd'
import DataTable, { ColumnType } from '../../components/Table/DataTable'
import { ProductsDtoOutput } from '../../services/product/dto/productsDtoOutput'
import productService from '../../services/product/productService'
import s from './products.module.scss'
import { HeartFilled, ShoppingFilled } from '@ant-design/icons'
import Navbar from '../../components/Navbar/Navbar'

const { Header, Content, Sider } = Layout;

const Products = () => {
    const [productsData, setProductsData] = useState<any[]>([])
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
            key: 'price', //#TODO discount percentage
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
            title: t('rating'), // #TODO rating yıldız ile göster
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
                        <Tooltip key={Math.floor(Math.random() * 99999)} placement="top" title={t('add_to_cart')}>
                            <Button key={Math.floor(Math.random() * 1000)} size='large' icon={React.createElement(ShoppingFilled)} className={s.table__button} onClick={() => {
                            }}></Button>
                        </Tooltip>
                        <Tooltip key={Math.floor(Math.random() * 9999)} placement='top' title={t('add_to_favorite')}>
                            <Button key={Math.floor(Math.random() * 10000)} danger size='large' icon={React.createElement(HeartFilled)} className={s.table__button} onClick={() => {
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
        <Layout className={s.lighttheme__products}>
            <h4 className={s.table__title}>{t('product_list')}</h4>
            <div className={s.table__content}>
                <DataTable columns={columns} data={productsData} />
            </div>
            <Sider width={200} style={{
                background: "#aaa",
            }}>
                <Navbar mode='inline' menuItems={[]} selectedKeys={[]} />
            </Sider>
        </Layout>
    )
}

export default Products