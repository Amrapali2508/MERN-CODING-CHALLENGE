import getProduct from '@/services/products'
import React from 'react'
import { DataTable } from './data-table';
import { columns } from './Columns';

export default async function Table() {
    const data = await getProduct();

    return (
        <div>
            <DataTable columns={columns} data={data}/>
        </div>
    )

}