import React, { memo } from 'react'



const Button = ({text,textColor,bgColor,IconAfter,onClick,fullWidth,IconBefore}) => {
    
    return (
        <button
            type='button'
            className={`md:py-2 md:px-4 ${textColor} ${fullWidth && 'w-full'} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
            onClick={onClick}
        >
            <span>{IconBefore && <IconBefore />}</span>
            <span>{text}</span>
            <span>{IconAfter && <IconAfter />}</span>
        </button>
    )
}

export default memo(Button)