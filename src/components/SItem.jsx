import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
const SItem = ({title, price, image, createdAt}) => {
    const formatTime = (createdAt) => {
        return moment(createdAt).fromNow()
    }
    return (
        <div className='w-full md:flex md:items-center md:gap-2 border-b-2 pb-4 bg-orange-100 p-2 rounded-md md:rounded-none shadow-sm md:shadow-none md:bg-white'>
            <img 
                className='md:w-[60px] md:h-[60px] flex-none object-cover rounded-md w-[50px] h-[50px] ml-4 md:ml-0 mb-2 md:mb-0'
                src={image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu9Jf6XG6P0RqglM5eQ-dfTR_PfVTl0QktYg&s'} alt="img" />
            <div className='flex flex-auto flex-col justify-between'>
                <h4 className='text-blue-400 font-semibold md:text-lg text-xs '>{title?.slice(0,45) + '...'}</h4>
                <div className='text-green-500 flex justify-between w-full'>
                    <span className='font-medium text-green-500 text-xs md:text-sm '>{price}</span>
                    <span className=' text-gray-500 md:text-sm text-xs'>{formatTime(createdAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default SItem