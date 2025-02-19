import React, { memo } from 'react'
import icons from '../ultis/icons'
import { Link } from 'react-router-dom'
import {formatVietnameseToString} from '../ultis/Common/fomatVietNameseToString'
import { useNavigate,useLocation,createSearchParams } from 'react-router-dom'

const {GrNext} = icons
const ItemSidebar = ({categories,title,prices,areas}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleFilterPostPrice = (code) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                priceCode: code,
            }).toString()
        })
    }

    const handleFilterPostArea = (code) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                areaCode: code,
            }).toString()
        })
    }
    return (
        <div className='p-4 rounded-md bg-white w-full'>
            <h3 className='font-semibold mb-3 text-sm text-center md:text-lg'>{title}</h3>
            <div className='flex'>
                <div className='flex flex-col items-start justify-center w-full gap-1'>
                        {categories?.map((item,index) => (
                            <Link to={formatVietnameseToString(item.value)} className='flex items-center justify-between w-full hover:text-orange-600 border-b-2 pb-2 border-dashed' key={index}>
                                <div className='flex items-center '>
                                    <GrNext size={14} color='#888' className='pt-1 '/>
                                    <p className='text-sm md:text-base text-center'>{item.value}</p>
                                </div>
                            </Link>
                        ))}

                        {prices?.map((item,index) => (
                            <div
                                onClick={() => handleFilterPostPrice(item.code)}
                                className='flex items-center justify-between w-full hover:text-orange-600 border-b-2 pb-2 border-dashed cursor-pointer' key={index}>
                                <div className='flex items-center '>
                                    <GrNext size={14} color='#888' className='pt-1 '/>
                                    <p className='text-sm md:text-base text-center'>{item.value}</p>
                                </div>
                            </div>
                        ))}

                        {areas?.map((item,index) => (
                            <div 
                                onClick={() => handleFilterPostArea(item.code)}
                                className='flex items-center justify-between w-full hover:text-orange-600 border-b-2 pb-2 border-dashed cursor-pointer' key={index}>
                                <div className='flex items-center '>
                                    <GrNext size={14} color='#888' className='pt-1 '/>
                                    <p className='text-sm md:text-base text-center'>{item.value}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default memo(ItemSidebar)