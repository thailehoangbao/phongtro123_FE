import React from 'react'
import { ItemSidebar, Province, RelatedPost } from '../../components'
import { List, Pagination } from './index'
import { useSelector } from 'react-redux'
const HomePage = () => {
    const { categories,areas,prices } = useSelector((state) => state.app);
    
    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='p-2 md:p-0'>
                <h1 className='font-bold md:text-lg text-base'>Kênh thông tin phòng trọ số 1 Việt Nam</h1>
                <p className='md:text-lg text-sm'>Kênh thông tin phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ ỡ ghép nhanh hiệu quả với 100.000 tin đăng và 2.500.000 lượt xem mỗi tháng.</p>
            </div>
            <Province />
            <div className='w-full flex gap-4'>
                <div className='w-[70%]'>
                    <List />
                    <Pagination />
                </div>
                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <ItemSidebar categories={categories.response} title="Danh sách cho thuê"/>
                    <ItemSidebar prices={prices} title="Xem theo giá"/>
                    <ItemSidebar areas={areas} title="Xem theo diện tích"/>
                    <RelatedPost />
                </div>
            </div>
        </div>
    )
}

export default HomePage