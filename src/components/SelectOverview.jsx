import React from 'react'

const SelectOverview = ({label,type,options,value,setValue,invalideFields,setInvalideFields}) => {
    return (
        <div className='flex flex-col gap-2 flex-1 w-[50%]'>
            <label className='font-medium' htmlFor="select-overview" >{label}</label>
            <select onFocus={() => setInvalideFields([])} defaultValue={value} name="" id="select-overview" className='outline-none shadow-md border-gray-200 p-2 rounded-md' onChange={(e) => {
                setValue(prev => ({
                    ...prev,
                    [type]: options.find(item => item.value === e.target.value)?.code
                }))
            }}>
                <option value="">{`--Chọn ${label}--`}</option>
                {options?.map((item) => {
                    return (
                        <option key={item.code}>{item.value}</option>
                    )
                })}
            </select>
            <small className='text-red-500'>{invalideFields?.find(item => item.name === type)?.message}</small>
        </div>
    )
}

export default SelectOverview