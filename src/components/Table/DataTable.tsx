import React, { FC } from 'react'
import { Table, TableProps } from 'antd';
import s from './table.module.scss'

export type ColumnType = {
    key: string;
    title: string;
    dataIndex?: string;
    width?: string | number;
    [key: string]: any;
};

type DataTableProps = {
    columns: ColumnType[];
    data: any[];
} & TableProps<any>;

const DataTable: FC<DataTableProps> = ({ columns, data, ...rest }) => {
    return (
        <div className={s.lighttheme__datatable}>
            <Table
                dataSource={data}
                columns={columns}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '30'],
                }}>

            </Table>
        </div>
    )
}

export default DataTable