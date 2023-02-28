import { Menu, Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import { toggleDarkmode } from '../../redux/features/common/common.slice'
import { useAppDispatch, useAppSelector } from '../../redux/stores'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import s from './headerMenu.module.scss'

const HeaderMenu = () => {
    const { t, i18n } = useTranslation()
    const dispatch = useAppDispatch()
    const { common } = useAppSelector(state => state)
    const items = [
        {
            key: '1',
            label: <LanguageSelect />
        },
        {
            key: '2',
            label: <Switch defaultChecked onChange={() => { dispatch(toggleDarkmode()) }} />

        }
    ]
    return (
        <div className={common.darkmode ? s.darktheme__headermenu : s.lighttheme__headermenu}>
            <LanguageSelect />
            {t('select_darkMode')}: <Switch defaultChecked={common.darkmode} onChange={() => { dispatch(toggleDarkmode()) }} />
        </div>

    )
}

export default HeaderMenu