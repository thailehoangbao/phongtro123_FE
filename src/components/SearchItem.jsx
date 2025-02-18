import React, { memo } from 'react'

const SearchItem = ({IconBefore, IconAfter, text, color,width}) => {
    return (
        <div className={`bg-white p-2 rounded-md ${color} text-sm py-2 px-4 ${width} flex justify-between items-center`}>
            <div className='flex items-center gap-1 flex-auto'>
                {IconBefore && <IconBefore />}
                {text}
            </div>
            {IconAfter && <IconAfter />}
        </div>
    )
}

export default memo(SearchItem)