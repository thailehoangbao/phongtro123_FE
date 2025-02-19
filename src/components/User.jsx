import React from 'react'
import avatar from "../assets/avatar.png";

import { useSelector } from 'react-redux';
const User = () => {
    const { currentData } = useSelector(state => state.user);
    return (
        <div className='flex items-center'>
            <img src={currentData?.avatar || avatar} alt="avatar" className='w-[40px] h-[40px] rounded-[50%] object-cover mr-2 shadow-md'/>
            <div className='flex flex-col'>
                <span className='text-xs md:text-lg'>Xin chào! <span className='font-semibold'>{currentData?.name}</span></span>
                <div className='flex items-center'><span className='text-xs md:text-lg'>Mã tài khoản: </span><span className='w-20 font-semibold inline-block whitespace-nowrap overflow-hidden text-ellipsis text-xs md:text-lg'>{currentData?.id}</span></div>
            </div>
        </div>
    )
}

export default User