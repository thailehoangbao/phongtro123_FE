import React, { memo } from 'react'

const InputArea = ({label,setValue,value,name,invalideFields,setInvalideFields}) => {
    return (
        <div className='pt-4'>
            <label htmlFor='desc' className='font-medium'>{label}</label>
            <textarea onFocus={() => setInvalideFields([])} value={value} id='desc' cols={30} rows={10} className='rounded-md p-2 w-full outline-none border-gray-200 border'  onChange={(e) => {
                setValue(prev => ({...prev, [name]: e.target.value}))
            }}/>
            <small className='text-red-500'>{invalideFields?.find(item => item.name === name)?.message}</small>
        </div>
    )
}

export default memo(InputArea)