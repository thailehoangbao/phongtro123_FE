import React, { useEffect } from 'react'
import { SItem } from './index'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../store/actions'
const RelatedPost = () => {
    const dispatch = useDispatch()
    const { newPosts } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(action.getNewPosts())
    },[])
    return (
        <div className='w-full bg-white rounded-md md:p-4 p-1'>
            <h3 className='font-semibold md:text-lg mb-4 text-sm'>Tin mới đăng</h3>
            <div className='w-full flex flex-col gap-2'>
                {newPosts?.map((item,index) => (
                    <SItem key={index} title={item?.title} createdAt={item.createdAt} price={item?.attributes?.price} image={JSON.parse(item?.images?.image)[0]}/>
                ))}
            </div>
        </div>
    )
}

export default RelatedPost