import React, { useEffect, useState } from 'react'
import { ItemSidebar, Province, RelatedPost } from '../../components'
import { List, Pagination } from './index'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { formatVietnameseToString } from "../../ultis/Common/fomatVietNameseToString";

const Rental = () => {
    const { areas,prices,categories } = useSelector((state) => state.app);
    const [categoryCode, setCategoryCode] = useState('')
    const [categoryCurrent,setCategoryCurrent] = useState({})
    const location = useLocation()

    useEffect(() => {
        const category = categories?.response?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
        setCategoryCurrent(category)
        if (category) {
            setCategoryCode(category.code)
        }
    },[location])

    return (
        <div className='w-full flex flex-col gap-3'>
            <div className=''>
                <h1 className='font-bold text-lg'>{categoryCurrent?.header}</h1>
                <p>{categoryCurrent?.subheader}</p>
            </div>
            <Province />
            <div className='w-full flex gap-4'>
                <div className='w-[70%]'>
                    <List categoryCode={categoryCode}/>
                    <Pagination />
                </div>
                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <ItemSidebar prices={prices} title="Xem theo giá"/>
                    <ItemSidebar areas={areas} title="Xem theo diện tích"/>
                    <RelatedPost />
                </div>
            </div>
        </div>
    )
}

export default Rental