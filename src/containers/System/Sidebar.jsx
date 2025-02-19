import React, { useState } from 'react'
import anonavatar from '../../assets/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import menuSidebar from '../../ultis/menuSidebar'
import { NavLink } from 'react-router-dom'
import * as actions from '../../store/actions'
import icons from '../../ultis/icons'

const activeStyle = 'w-full flex gap-2 items-center pl-2 rounded-md hover:bg-gray-300 hover:text-orange-500 text-blue-500 py-2 font-bold bg-gray-300'
const notActiveStyle = 'w-full flex gap-2 items-center pl-2 rounded-md hover:bg-gray-300 hover:text-orange-500 text-blue-500 py-2'
const {IoLogOutOutline} = icons 

const Sidebar = () => {
    const dispatch = useDispatch()
    const { currentData } = useSelector(state => state.user)
    const [isShowId,setIsShowId] = useState(false)
    return (
        <div className='md:w-[256px] flex-none p-4'>
            <div className='flex flex-row md:flex-col gap-4 md:gap-0'>
                <div className='flex flex-col gap-4'>
                    <div className='md:flex-row flex'>
                        <img src={currentData.avatar ? currentData.avatar : anonavatar} alt="avatar" width={47} height={40} className='rounded-[50%] flex-none shadow-md mr-2 object-cover'/>
                        <div className='flex flex-col flex-auto justify-center'>
                            <span className='font-semibold text-xs md:text-base'>{currentData?.name}</span>
                            <span className='text-xs md:text-base'>{currentData?.phone}</span>
                        </div>
                    </div>
                    <span className='text-xs md:text-base'>Mã thành viên: <span className='font-semibold cursor-pointer text-xs md:text-base hover:text-orange-500' onClick={() => setIsShowId(!isShowId)}>{isShowId ? currentData?.id : `${currentData?.id?.slice(1,10)}...`}</span></span>
                </div>
                <div className='flex-row md:flex-col flex ml-10 md:ml-0'>
                    {menuSidebar.map((item,index) => (
                        <div key={index} className=" border-b border-gray-200 flex gap-2 items-center w-[100px] md:w-full ml-1 md:ml-0:"><NavLink className={({isActive}) => isActive ? activeStyle : notActiveStyle} to={item.path} key={item.id}><span className='text-xs md:text-base'>{item.icon}</span><span className='text-xs md:text-base'>{item.text}</span></NavLink></div>
                    ))}
                </div>
                <span className={`${notActiveStyle} cursor-pointer`} onClick={() => dispatch(actions.logout())}><IoLogOutOutline /> Thoát</span>
            </div>
        </div>
    )
}

export default Sidebar