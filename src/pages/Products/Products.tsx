import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Rate, Tooltip, Layout, message } from 'antd'
import DataTable, { ColumnType } from '../../components/Table/DataTable'
import { ProductsDtoOutput } from '../../services/product/dto/productsDtoOutput'
import productService from '../../services/product/productService'
import s from './products.module.scss'
import { HeartFilled, ShoppingFilled } from '@ant-design/icons'
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu'
import { ProductDtoOutput } from '../../services/product/dto/productDtoOutput'
import { useAppDispatch, useAppSelector } from '../../redux/stores'
import { addToMyFavorites, removeFromMyFavorites } from '../../redux/features/myFavorites/myFavorites.slice'
import { addToMyCart, removeFromMyCart } from '../../redux/features/myCart/myCart.slice'

const { Header, Content, Sider } = Layout;

const Products = () => {
    const [productsData, setProductsData] = useState<ProductDtoOutput[]>([])
    const { t } = useTranslation()

    const { myCart, myFavorites } = useAppSelector(state => state)

    const dispatch = useAppDispatch()
    const handleAddToMyCart = (id: number, price: number) => {
        dispatch(addToMyCart({ id, price }))
        message.open({
            type: 'success',
            content: t('added_to_cart')
        })
    }

    const handleRemoveFromMyCart = (id: number, price: number) => {
        dispatch(removeFromMyCart({ id, price }))
        message.open({
            type: 'success',
            content: t('removed_from_cart')
        })
    }

    const handleAddToMyFavorites = (id: number) => {
        dispatch(addToMyFavorites(id))
        message.open({
            type: 'success',
            content: t('added_to_my_favorites')
        })
    }

    const handleRemoveFromMyFavorites = (id: number) => {
        dispatch(removeFromMyFavorites(id))
        message.open({
            type: 'success',
            content: t('removed_from_my_favorites')
        })
    }

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
                        <Tooltip placement="top" title={myCart.productIds.includes(rowData.id) ? t('remove_from_cart') : t('add_to_cart')}>
                            <Button size='middle' icon={React.createElement(ShoppingFilled)} className={s.table__button} onClick={() => {
                                myCart.productIds.includes(rowData.id) ? handleRemoveFromMyCart(rowData.id, rowData.price) : handleAddToMyCart(rowData.id, rowData.price)
                            }}></Button>
                        </Tooltip>
                        <Tooltip placement='top' title={myFavorites.productIds.includes(rowData.id) ? t('remove_from_my_favorites') : t('add_to_my_favorites')}>
                            <Button danger size='middle' icon={React.createElement(HeartFilled)} className={s.table__button} onClick={() => {
                                myFavorites.productIds.includes(rowData.id) ? handleRemoveFromMyFavorites(rowData.id) : handleAddToMyFavorites(rowData.id)
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
                <Content className={s.lighttheme__products}>
                    <h4 className={s.table__title}>{t('product_list')}</h4>
                    <div className={s.table__content}>
                        <DataTable columns={columns} data={productsData} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Products