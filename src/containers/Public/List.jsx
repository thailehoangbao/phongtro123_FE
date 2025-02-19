import React, {useEffect, useRef} from 'react'
import { Button, Items } from '../../components'
import { getPostsLimit} from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
const List = ({categoryCode}) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)
    const listRef = useRef()
    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry)
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if(Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]],i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject,[i[0]]:[i[1]]}
            }
        })
        if(categoryCode) searchParamsObject.categoryCode = categoryCode
        dispatch(getPostsLimit(searchParamsObject))
        listRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
    },[searchParams,categoryCode])
    return (
        <div ref={listRef} className='w-full rounded-md pt-2 pb-2 bg-white shadow-md'>
            <div className='flex items-center justify-between my-3 px-6'>
                <h4 className='text-md font-semibold text-sm md:text-lg'>Danh sách tin đăng</h4>
                <span className='text-sm'>Cập nhật: 20/2/2022</span>
            </div>
            <div className='flex items-center gap-2 my-2 px-6'>
                <span className='text-xs ml-1 md:text-lg md:ml-0'>Sắp xếp: </span>
                <Button text='Mặc định' bgColor='bg-gray-200 text-xs md:text-lg'/>
                <Button text='Mới nhất' bgColor='bg-gray-200 text-xs md:text-lg'/>
            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map((item) => {
                    return (
                        <Items item={item} key={item.id}/>
                    )
                })}
            </div>
            
        </div>
    )
}

export default List