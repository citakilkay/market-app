import React, { FC, ReactNode } from 'react'
import s from './card.module.scss'
import { Avatar, Button, Card, CardProps, Tooltip } from 'antd';
import { CloseSquareFilled, HeartFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

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
    return (
        <Card {...rest}
            className={s.lighttheme__card}
            key={data.id}
            cover={
                <div className={s.card__cover} style={{ backgroundImage: `url(${data.contentImgPath})` }}>
                </div>
            }
        >
            <Meta
                avatar={data.avatarImgPath ? <Avatar src={data.avatarImgPath} /> : null}
                title={data.title}
                description={data.description} />
        </Card >
    )
}

export default CardCustom