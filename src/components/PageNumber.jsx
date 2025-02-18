import React, { memo } from 'react'
import { useNavigate, createSearchParams, useSearchParams, useLocation } from 'react-router-dom'

const notActive = 'w-[46px] h-[48px] text-black bg-white hover:bg-gray-300 hover:text-white rounded-md mx-1'
const active = 'w-[46px] h-[48px] text-white bg-[#e13427] hover:text-white rounded-md mx-1'

const PageNumber = ({currentPage,text,icon,setCurrentPage}) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const location = useLocation()
    let entries = searchParams.entries()
    const append = (entries) => {
        let params = []
        searchParams.append('page',+text)
        for(let entry of entries) {
            params.push(entry)
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if(Object.keys(searchParamsObject)?.some(item => item === i[0] && item!== 'page')) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]],i[1]]
            } else {
                searchParamsObject = {...searchParamsObject,[i[0]]:[i[1]]}
            }
        })
        return searchParamsObject
    }

    const handleChangePage = () => {
        if(!(text === '...')) {
            setCurrentPage(text)

            navigate({
                pathname: location.pathname,
                search: createSearchParams(append(entries)).toString()
            })
        }
    }
    return (
        <button className={text == currentPage ? active : notActive}
                onClick={handleChangePage}
        >
            {icon || text}
        </button>
    )
}

export default memo(PageNumber)