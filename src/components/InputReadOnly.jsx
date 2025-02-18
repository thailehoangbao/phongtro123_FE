import React, { memo } from 'react'

const InputReadOnly = ({label,nameDistrict,nameProvince,info}) => {
    return (
        <div className='pt-4'>
            <div className='flex flex-col gap-2'>
                <label className='font-medium' htmlFor="exactly-address">{label}</label>
                <input 
                        type="text" 
                        id='exactly-address' 
                        disabled 
                        value={`${info ? info : `${nameDistrict ? nameDistrict : ''}${nameDistrict ? ',' : ''} ${nameProvince?nameProvince :''}`}`}
                        className='bg-slate-200 rounded-md p-2 w-full outline-none border-gray-300' />
            </div>
        </div>
    )
}

export default memo(InputReadOnly)