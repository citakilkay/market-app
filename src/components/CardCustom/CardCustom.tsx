import React, { FC, ReactNode } from 'react'
import s from './card.module.scss'
import { Avatar, Button, Card, CardProps, Tooltip } from 'antd';
import { CloseSquareFilled, HeartFilled, SettingOutlined, ShoppingFilled } from '@ant-design/icons';
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
        <div className={s.lighttheme_card}>
            <Card {...rest}
                key={data.id}
                style={{ width: 300 }}
                cover={
                    <img
                        src={data.contentImgPath}
                    />
                }
                actions={[
                    <Tooltip placement="top" title={t('remove_from_cart')}>
                        <Button type="text" danger>
                            <CloseSquareFilled key='remove_from_cart' />
                        </Button>
                    </Tooltip>,
                    <Tooltip placement="top" title={t('add_to_favorite')}>
                        <Button type="text">
                            <HeartFilled key='add_to_favorite' />
                        </Button>
                    </Tooltip>
                ]}
            >
                <Meta
                    avatar={data.avatarImgPath ? <Avatar src={data.avatarImgPath} /> : null}
                    title={data.title}
                    description={data.description}
                />
            </Card >
        </div >
    )
}

export default CardCustom