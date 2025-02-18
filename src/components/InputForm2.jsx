import React, { memo } from 'react'

const InputForm2 = ({label,donvi,value,setValue,name,small,invalideFields,setInvalideFields}) => {
    return (
        <div className='pt-4'>
            <label htmlFor='title' className='font-medium'>{label}</label>
            <div className='flex items-center'>
                <input onFocus={() => setInvalideFields([])} value={value} type={name === 'price' || name === 'area' ? 'number' : 'text'} id='title' className={`${!donvi ? 'rounded-md' : 'rounded-tl-md rounded-bl-md'}  p-2 w-full outline-none border-gray-200 border flex-auto`} onChange={(e) => {
                    setValue(prev => ({...prev,[name]: e.target.value}))
                }}/>
                {donvi ? (<span className='px-3 py-2 text-white bg-gray-400 flex flex-none w-[64px] rounded-tr-md rounded-br-md'>{donvi}</span>) : ''}
            </div>
            <p className='opacity-70 text-sm'>{small ? small : ''}</p>
            <small className='text-red-500'>{invalideFields?.find(item => item.name === name)?.message}</small>
        </div>
    )
}

export default memo(InputForm2)