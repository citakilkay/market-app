import React, { FC, ReactNode } from 'react'
import s from './card.module.scss'
import { Avatar, Button, Card, CardProps, Tooltip } from 'antd';
import { CloseSquareFilled, HeartFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../redux/stores';

const { Meta } = Card;
export interface CustomCardProps extends CardProps {
    data: {
        id: number
        title: string
        description?: string
        contentImgPath: string
        avatarImgPath?: string
    }
}
const CardCustom: FC<CustomCardProps> = ({ data, ...rest }) => {
    const { t } = useTranslation()
    const { common } = useAppSelector(state => state)
    return (
        <Card {...rest}
            className={common.darkmode ? s.darktheme__card : s.lighttheme__card}
            key={data.id}
            cover={
                <div className={s.card__cover} style={{ backgroundImage: `url(${data.contentImgPath})` }}>
                </div>
            }
        >
            <Meta
                avatar={data.avatarImgPath ? <Avatar src={data.avatarImgPath} /> : null}
                title={<div className={s.card__title}>{data.title}</div>}
                description={<div className={s.card__description}>
                    {data.description}
                </div>} />
        </Card >
    )
}

export default CardCustom