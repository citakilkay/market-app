import React from 'react'
import { useTranslation } from 'react-i18next'

const Products = () => {
    const { t } = useTranslation()
    return (
        <div>{t('product_list')}</div>
    )
}

export default Products