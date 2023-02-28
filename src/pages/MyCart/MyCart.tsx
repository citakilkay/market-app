import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Rate, Tooltip, Layout, message, Select } from 'antd'
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu'
import s from './myCart.module.scss'
import CardCustom, { CustomCardProps } from '../../components/CardCustom/CardCustom'
import { useAppDispatch, useAppSelector } from '../../redux/stores'
import { removeFromMyCart } from '../../redux/features/myCart/myCart.slice'
import { addToMyFavorites, removeFromMyFavorites } from '../../redux/features/myFavorites/myFavorites.slice'
import productService from '../../services/product/productService'
import { ProductDtoOutput } from '../../services/product/dto/productDtoOutput'
import { CloseSquareFilled, HeartFilled } from '@ant-design/icons'
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect'
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'

const { Header, Content, Sider } = Layout;

const MyCart = () => {

  const [productsInMyCart, setProductsInMyCart] = useState<ProductDtoOutput[]>([])
  const [propsOfProductCards, setPropsOfProductCards] = useState<CustomCardProps[]>([])

  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const { myCart, myFavorites, common } = useAppSelector(state => state)

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

  const getProductsInMyCart = async () => {
    const result = await productService.getAll()
    const productsArray = result.products.filter(i => myCart.productIds.includes(i.id))
    setProductsInMyCart(productsArray)
    const productsCardPropsArray = result.products.filter(i => myCart.productIds.includes(i.id)).map((product) => {
      return {
        data: { title: product.title, contentImgPath: product.thumbnail, description: product.description, id: product.id },
        actions: [<Tooltip placement="top" title={t('remove_from_cart')} key='remove_from_cart' >
          <Button type="text" danger onClick={() => { handleRemoveFromMyCart(product.id, product.price) }}>
            <CloseSquareFilled />
          </Button>
        </Tooltip >,
        <Tooltip placement="top" title={myFavorites.productIds.includes(product.id) ? t('remove_from_my_favorites') : t('add_to_my_favorites')} key='addRemoveFavorite'>
          <Button type="text" onClick={() => { myFavorites.productIds.includes(product.id) ? handleRemoveFromMyFavorites(product.id) : handleAddToMyFavorites(product.id) }}>
            <HeartFilled />
          </Button>
        </Tooltip>]
      }
      // #TODO add price to description
    })
    setPropsOfProductCards(productsCardPropsArray)
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
        <Content className={common.darkmode ? s.darktheme__mycart : s.lighttheme__mycart}>
          <Header className={s.mycart__header}>
            <HeaderMenu />
          </Header>
          <h4 className={s.mycart__title}>{t('my_cart')}</h4>
          <div className={s.mycart__content}>
            {
              propsOfProductCards.map(propOfProductCard =>
                <CardCustom {...propOfProductCard} />)
            }
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MyCart