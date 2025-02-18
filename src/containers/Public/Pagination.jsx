import React, { useEffect, useState } from 'react'
import { PageNumber } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../ultis/icons'
import { useSearchParams } from 'react-router-dom'


const { GrNext,GrPrevious } = icons

const Pagination = () => {
    const { count, posts } = useSelector(state => state.post)
    const [arrPage,setArrPage] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [isHideEnd,setIsHideEnd] = useState(false)
    const [isHideStart,setIsHideStart] = useState(false)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        let page = searchParams.get('page')
        page && +page !== currentPage && setCurrentPage(+page)
        !page && setCurrentPage(1)
    },[searchParams])

    useEffect(() => {
        let maxPage  = Math.ceil(count/ process.env.REACT_APP_LIMIT_POSTS)
        if(posts.length == 0) {
            maxPage = currentPage
        }
        let end = (+currentPage + 1) > maxPage ?  maxPage : (+currentPage + 1)
        let start = (+currentPage - 1) < 1 ? 1 : (+currentPage - 1)
        let temp = []
        for(let i = start; i <= end; i++) {
            temp.push(i)
        }       
        setArrPage(temp)
        currentPage >= (maxPage-1) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)
        
    },[count,posts,currentPage])
    return (
        <div className='flex justify-center my-5 items-center'>
            {!isHideStart && <PageNumber  setCurrentPage={setCurrentPage} text={1}/>}
            {!isHideStart && <PageNumber text={'...'} setCurrentPage={setCurrentPage}/>}
            {arrPage?.length > 0 && arrPage?.map((item,index)=> (
                <PageNumber text={item} key={index} currentPage={currentPage || 1} setCurrentPage={setCurrentPage}/>
            ))}
            {!isHideEnd && <PageNumber text={'...'} setCurrentPage={setCurrentPage}/>}
            {!isHideEnd && <PageNumber icon={<GrNext className='ml-2 hover:text-orange-500 cursor-pointer'/>} setCurrentPage={setCurrentPage} text={Math.floor(count/ posts.length)}/>}
        </div>
    )
}

export default Pagination