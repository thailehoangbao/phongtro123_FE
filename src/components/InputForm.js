import React from 'react'

const InputForm = ({text, value, setValue, type, invalidFields, setInvalidFields}) => {
    return (
        <div>
            <label className='text-sm'>{text}</label>
            <input type={text == "MẬT KHẨU" ? 'password' : 'text'} className='outline-none bg-slate-200 p-2 rounded-md w-full' 
                value={value}
                onChange={(e) => setValue(prev => ({...prev, [type]: e.target.value})) }
                onFocus={() => setInvalidFields([])}
            />
            {invalidFields.length > 0 && invalidFields.some(i => i.name === type) && <small className='text-red-500 italic'>{invalidFields.find(i => i.name === type)?.message}</small>}
        </div>
    )
}

export default InputForm