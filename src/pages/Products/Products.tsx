import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Rate, Tooltip } from 'antd'
import DataTable, { ColumnType } from '../../components/Table/DataTable'
import { ProductsDtoOutput } from '../../services/product/dto/productsDtoOutput'
import productService from '../../services/product/productService'
import s from './products.module.scss'
import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons'

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
                    <Tooltip placement="top" title={rating}>
                        <Rate key={rowData.id} allowHalf disabled defaultValue={rating} />
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
                            <Button onClick={() => {
                            }}><ShoppingOutlined /></Button>
                        </Tooltip>
                        <Tooltip placement='top' title={t('add_to_favorite')}>
                            <Button onClick={() => {
                            }}><HeartOutlined /></Button>
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
        <>
            <div className='light-theme'>
                <h1 className={s.products__title}>{t('product_list')}</h1>
                <div className={s.products__table}>
                    <DataTable columns={columns} data={productsData} />
                </div>
            </div>
        </>

    )
}

export default Products