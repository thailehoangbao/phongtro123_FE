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
        <div className='w-[256px] flex-none p-4'>
            <div >
                <div className='flex flex-col gap-4'>
                    <div className='flex'>
                        <img src={currentData.avatar ? currentData.avatar : anonavatar} alt="avatar" width={47} height={40} className='rounded-[50%] flex-none shadow-md mr-2 object-cover'/>
                        <div className='flex flex-col flex-auto justify-center'>
                            <span className='font-semibold'>{currentData?.name}</span>
                            <span className='text-sm'>{currentData?.phone}</span>
                        </div>
                    </div>
                    <span>Mã thành viên: <span className='font-semibold cursor-pointer hover:text-orange-500' onClick={() => setIsShowId(!isShowId)}>{isShowId ? currentData?.id : `${currentData?.id?.slice(1,10)}...`}</span></span>
                </div>
                {menuSidebar.map((item,index) => (
                    <div key={index} className=" border-b border-gray-200 flex gap-2 items-center"><NavLink className={({isActive}) => isActive ? activeStyle : notActiveStyle} to={item.path} key={item.id}><span>{item.icon}</span><span>{item.text}</span></NavLink></div>
                ))}
                <span className={`${notActiveStyle} cursor-pointer`} onClick={() => dispatch(actions.logout())}><IoLogOutOutline /> Thoát</span>
            </div>
        </div>
    )
}

export default Sidebar