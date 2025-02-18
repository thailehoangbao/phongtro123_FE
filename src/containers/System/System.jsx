import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultis/constant'
import { Header,Sidebar } from './'

const System = () => {
    const {isLoggedIn} = useSelector(state => state.auth)
    if(!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true}/>
    return (
        <div className='w-full flex flex-col items-center h-screen overflow-hidden'>
            <Header />
            <div className='flex w-full h-screen'>
                <Sidebar />
                <div className='flex-auto bg-white shadow-md p-4 overflow-y-scroll'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default System