import { Select } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../redux/stores'
import s from './languageSelect.module.scss'

const LanguageSelect = () => {
    const { t, i18n } = useTranslation()
    const { common } = useAppSelector(state => state)

    const languages = [{ value: 'en', label: t('english') }, { value: 'tr', label: t('turkish') }]

    const handleChangeLanguage = (value: any) => {
        i18n.changeLanguage(value)
    }
    return (
        <div className={common.darkmode ? s.darktheme__languageselect : s.lighttheme__languageselect}>
            <Select
                className={s.dropdown__content}
                options={languages}
                value={i18n.language}
                onChange={handleChangeLanguage}
            />
        </div>
    )
}

export default LanguageSelect