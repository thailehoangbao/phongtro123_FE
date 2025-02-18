import React from 'react'
import { text } from '../ultis/dataContact'
import { Button } from '../components'
const Contact = () => {
  return (
    <div className='border border-red-500 text-center flex flex-col justify-center item-center bg-white rounded-md shadow-md p-4 w-4/5'>
      <img src={text.image} className='w-full h-[200px]' alt="thumbnail" />
      <p className='py-2'>{text.content}</p>
      <div className='flex justify-between items-center'>
        {text.contacts.map((item,index) => (
            <div className='flex flex-col' key={index}>
              <span className='font-medium text-lg text-orange-500'>{item.name}</span>
              <span className='text-blue-500 font-semibold'>Phone: {item.phone}</span>
              <span className='text-blue-500 font-semibold'>Zalo: {item.zalo}</span>
            </div>
        ))}
      </div>
      <div className='flex justify-center py-4'>
        <Button text={'Gửi liên hệ'} bgColor={'bg-blue-600'} textColor={'text-white px-6'}/>
      </div>
    </div>
  )
}

export default Contact