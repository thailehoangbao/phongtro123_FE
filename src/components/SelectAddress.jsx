import React, { memo } from 'react'

const SelectAddress = ({label,options,getDistrictFromProvice,type,setNameDistrict,invalideFields,setInvalideFields,value}) => {
    return (
        <div className='flex flex-col gap-2 flex-1 w-full'>
            <label className='font-medium' htmlFor="select-address" >{label}</label>
            <select name="" id="select-address" value={value} className='outline-none shadow-md border-gray-200 p-2 rounded-md' onChange={type ==='province' ? getDistrictFromProvice : setNameDistrict} onFocus={() => setInvalideFields([])}>
                <option value="">{`--Chọn ${label}--`}</option>
                {options?.map((item) => {
                    return (
                        <option key={item.code} value={item.code} >{item.name}</option>
                    )
                })}
            </select>
            <small className='text-red-500'>{invalideFields?.find(item => item.name === type)?.message}</small>
        </div>
    )
}

export default memo(SelectAddress)