import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
const SItem = ({title, price, image, createdAt}) => {
    const formatTime = (createdAt) => {
        return moment(createdAt).fromNow()
    }
    return (
        <div className='w-full flex items-center gap-2 border-b-2 pb-2'>
            <img 
                className='w-[40px] h-[40px] flex-none object-cover rounded-md'
                src={image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu9Jf6XG6P0RqglM5eQ-dfTR_PfVTl0QktYg&s'} alt="img" />
            <div className='flex flex-auto flex-col justify-between'>
                <h4 className='text-blue-400 font-semibold text-md'>{title?.slice(0,45) + '...'}</h4>
                <div className='text-green-500 flex justify-between w-full'>
                    <span className='font-medium text-sm text-green-500'>{price}</span>
                    <span className=' text-gray-500 text-sm'>{formatTime(createdAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default SItem