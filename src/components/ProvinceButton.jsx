import React from 'react'

const ProvinceButton = ({name,image}) => {
    return (
        <div className='bg-white shadow-md rounded-md text-blue-500 overflow-hidden cursor-pointer hover:text-orange-600'>
            <img 
                src={image} 
                alt={name} 
                className='w-[190px] h-[110px] object-cover rounded-t-md'
            />
            <p className='text-center font-semibold text-sm pt-2 pb-2'>{name}</p>
        </div>
    )
}

export default ProvinceButton