import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Rate, Tooltip, Layout } from 'antd'
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu'
import s from './myCart.module.scss'
import CardCustom, { CustomCardProps } from '../../components/CardCustom/CardCustom'
import { useAppDispatch, useAppSelector } from '../../redux/stores'
import { removeFromMyCart } from '../../features/myCart/myCart.slice'
import { addToMyFavorites, removeFromMyFavorites } from '../../features/myFavorites/myFavorites.slice'
import productService from '../../services/product/productService'
import { ProductDtoOutput } from '../../services/product/dto/productDtoOutput'
import { CloseSquareFilled, HeartFilled } from '@ant-design/icons'

const { Content, Sider } = Layout;

const MyCart = () => {
  const [productsInMyCart, setProductsInMyCart] = useState<ProductDtoOutput[]>([])
  const [dataOfProductCards, setDataOfProductCards] = useState<CustomCardProps[]>([])

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const myCart = useAppSelector(state => state.myCart)

  const getProductsInMyCart = async () => {
    const result = await productService.getProductByIds(myCart.productIds)
    setProductsInMyCart(result)
    result.map((product) => {
      dataOfProductCards.push({
        data: { title: product.title, contentImgPath: product.thumbnail, description: product.description, id: product.id },
        actions: [<Tooltip placement="top" title={t('remove_from_cart')}>
          <Button type="text" danger onClick={() => { handleRemoveFromMyCart(product.id) }}>
            <CloseSquareFilled />
          </Button>
        </Tooltip>,
        <Tooltip placement="top" title={t('add_to_favorite')}>
          <Button type="text" onClick={() => { handleAddToMyFavorites(product.id) }}>
            <HeartFilled />
          </Button>
        </Tooltip>]
      }) // #TODO add price to description
    })
  }

  const handleRemoveFromMyCart = (id: number) => {
    dispatch(removeFromMyCart(id))
  }

  const handleAddToMyFavorites = (id: number) => {
    dispatch(addToMyFavorites(id))
  }

  const handleRemoveFromMyFavorites = (id: number) => {
    dispatch(removeFromMyFavorites(id))
  }

  useEffect(() => {
    getProductsInMyCart()
  }, [myCart])

  return (
    <Layout>
      <Sider>
        <SidebarMenu />
      </Sider>
      <Layout>
        <Content className={s.lighttheme__mycart}>
          <h4 className={s.mycart__title}>{t('my_cart')}</h4>
          <div className={s.mycart__content}>
            {
              dataOfProductCards.map(dataOfProductCard =>
                <CardCustom {...dataOfProductCard} />)
            }
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MyCart

//reducers: manages state and returns the newly updated state
// actions: actions have 2 properties type: which is a unique identifier and payload which has data
//dispatch: dispatch is used to send actions to update the data